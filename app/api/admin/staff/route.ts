import { NextRequest, NextResponse } from 'next/server';
import { getAllStaffUsers, upsertStaffUser, StaffRole } from '@/lib/rbac';
import { createServerClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const staffList = await getAllStaffUsers();
    return NextResponse.json({ success: true, staff: staffList });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, mobile, email, role, is_active } = body;

    if (!name || !mobile || !role) {
      return NextResponse.json(
        { success: false, error: 'Name, 10-digit mobile number, and role are required' },
        { status: 400 }
      );
    }

    const validRoles: StaffRole[] = ['SUPER_ADMIN', 'ADMIN', 'SALES', 'CATEGORY_MANAGER', 'DELIVERY'];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid staff role' }, { status: 400 });
    }

    const result = await upsertStaffUser({
      name,
      mobile,
      email,
      role,
      is_active: is_active !== undefined ? Boolean(is_active) : true,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Staff member updated successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mobile = (searchParams.get('mobile') || '').replace(/\D/g, '');

    if (!mobile) {
      return NextResponse.json({ success: false, error: 'Mobile is required' }, { status: 400 });
    }

    if (mobile === '8008445388') {
      return NextResponse.json(
        { success: false, error: 'Cannot delete the permanent Super Admin' },
        { status: 403 }
      );
    }

    const supabase = createServerClient();
    await (supabase.from('staff_users') as any).delete().eq('mobile', mobile);

    return NextResponse.json({ success: true, message: 'Staff member removed' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
