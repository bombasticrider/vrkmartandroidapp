import { createServerClient } from './supabaseServer';

export type StaffRole = 'SUPER_ADMIN' | 'ADMIN' | 'SALES' | 'CATEGORY_MANAGER' | 'DELIVERY';

export interface StaffUser {
  id?: string;
  mobile: string;
  name: string;
  email?: string;
  role: StaffRole;
  is_active: boolean;
  created_by?: string;
  created_at?: string;
}

// Master Permanent Super Admins (Always guaranteed full access)
export const PERMANENT_SUPER_ADMINS: StaffUser[] = [
  {
    id: 'super-admin-dev',
    mobile: '8008445388',
    name: 'Developer / Super Admin',
    email: 'admin@vrkmart.in',
    role: 'SUPER_ADMIN',
    is_active: true,
    created_by: 'SYSTEM',
  },
];

// Role-to-Nav tabs mapping
export const ROLE_PERMISSIONS: Record<StaffRole, string[]> = {
  SUPER_ADMIN: ['dashboard', 'products', 'orders', 'shoppers', 'members', 'team'],
  ADMIN: ['dashboard', 'products', 'orders', 'shoppers', 'members', 'team'],
  SALES: ['shoppers', 'members'],
  CATEGORY_MANAGER: ['products'],
  DELIVERY: ['orders'],
};

// Default landing page after login for each role
export const ROLE_DEFAULT_ROUTES: Record<StaffRole, string> = {
  SUPER_ADMIN: '/admin/dashboard',
  ADMIN: '/admin/dashboard',
  SALES: '/admin/members',
  CATEGORY_MANAGER: '/admin/products',
  DELIVERY: '/admin/orders',
};

/**
 * Get staff user details by mobile number (checks permanent list first, then Supabase)
 */
export async function getStaffUserByMobile(mobile: string): Promise<StaffUser | null> {
  const cleanMobile = mobile.replace(/\D/g, '').trim();

  // 1. Check permanent super admins
  const perm = PERMANENT_SUPER_ADMINS.find((u) => u.mobile === cleanMobile);
  if (perm) return perm;

  // 2. Query Supabase staff_users table
  try {
    const supabase = createServerClient();
    const { data, error } = await (supabase.from('staff_users') as any)
      .select('*')
      .eq('mobile', cleanMobile)
      .maybeSingle();

    if (error || !data) return null;

    return {
      id: data.id,
      mobile: data.mobile,
      name: data.name,
      email: data.email,
      role: data.role as StaffRole,
      is_active: Boolean(data.is_active),
      created_by: data.created_by,
      created_at: data.created_at,
    };
  } catch (err) {
    console.warn('Supabase staff_users lookup error:', err);
    return null;
  }
}

/**
 * Fetch all staff users (for Super Admin management interface)
 */
export async function getAllStaffUsers(): Promise<StaffUser[]> {
  const list: StaffUser[] = [...PERMANENT_SUPER_ADMINS];

  try {
    const supabase = createServerClient();
    const { data, error } = await (supabase.from('staff_users') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      data.forEach((item: any) => {
        // Prevent duplicate permanent admin display
        if (!list.some((u) => u.mobile === item.mobile)) {
          list.push({
            id: item.id,
            mobile: item.mobile,
            name: item.name,
            email: item.email,
            role: item.role as StaffRole,
            is_active: Boolean(item.is_active),
            created_by: item.created_by,
            created_at: item.created_at,
          });
        }
      });
    }
  } catch (err) {
    console.warn('Could not fetch DB staff_users:', err);
  }

  return list;
}

/**
 * Upsert or invite a new staff user
 */
export async function upsertStaffUser(staff: {
  mobile: string;
  name: string;
  email?: string;
  role: StaffRole;
  is_active?: boolean;
  created_by?: string;
}): Promise<{ success: boolean; error?: string }> {
  const cleanMobile = staff.mobile.replace(/\D/g, '').trim();
  if (cleanMobile.length !== 10) {
    return { success: false, error: 'Mobile number must be exactly 10 digits' };
  }

  try {
    const supabase = createServerClient();
    const { error } = await (supabase.from('staff_users') as any).upsert(
      {
        mobile: cleanMobile,
        name: staff.name.trim(),
        email: staff.email?.trim() || null,
        role: staff.role,
        is_active: staff.is_active !== undefined ? staff.is_active : true,
        created_by: staff.created_by || 'SUPER_ADMIN',
      },
      { onConflict: 'mobile' }
    );

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to save staff user' };
  }
}
