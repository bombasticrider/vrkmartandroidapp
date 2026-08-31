import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getStaffUserByMobile, ROLE_DEFAULT_ROUTES } from '@/lib/rbac';
import { signAdminToken } from '@/lib/session';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cookieStore = cookies();

    // ── Method 1: Mobile Staff Verification (Post-Firebase Verification) ─────
    if (body.mobile) {
      const cleanMobile = String(body.mobile).replace(/\D/g, '').trim();

      // Check if phone number is an authorized staff/admin user
      const staffUser = await getStaffUserByMobile(cleanMobile);

      if (!staffUser || !staffUser.is_active) {
        return NextResponse.json(
          {
            success: false,
            message: 'Access Denied: Your phone number is not registered as authorized staff.',
          },
          { status: 403 }
        );
      }

      // Generate cryptographically signed HMAC SHA-256 session token
      const token = signAdminToken({
        role: staffUser.role,
        mobile: staffUser.mobile,
        name: staffUser.name,
      });

      const redirectUrl = ROLE_DEFAULT_ROUTES[staffUser.role] || '/admin/dashboard';

      const response = NextResponse.json({
        success: true,
        role: staffUser.role,
        name: staffUser.name,
        redirectUrl,
      });

      const cookieOptions = {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      };

      response.cookies.set('vrk_admin_session', token, cookieOptions);
      response.cookies.set('vrk_staff_role', staffUser.role, { ...cookieOptions, httpOnly: false });
      response.cookies.set('vrk_staff_name', staffUser.name, { ...cookieOptions, httpOnly: false });
      response.cookies.set('vrk_staff_mobile', staffUser.mobile, { ...cookieOptions, httpOnly: false });

      cookieStore.set('vrk_admin_session', token, cookieOptions);
      cookieStore.set('vrk_staff_role', staffUser.role, { ...cookieOptions, httpOnly: false });
      cookieStore.set('vrk_staff_name', staffUser.name, { ...cookieOptions, httpOnly: false });
      cookieStore.set('vrk_staff_mobile', staffUser.mobile, { ...cookieOptions, httpOnly: false });

      return response;
    }

    // ── Method 2: Email + Password Login (Strict Server Secret Verification) ──
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    const configuredEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    const configuredSecret = (process.env.ADMIN_SECRET_KEY || '').trim();

    // Reject if admin credentials are not properly configured in environment
    if (!configuredEmail || !configuredSecret) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password login is disabled. Please use Mobile OTP login.',
        },
        { status: 403 }
      );
    }

    if (email === configuredEmail && password === configuredSecret) {
      const token = signAdminToken({
        role: 'SUPER_ADMIN',
        mobile: '8008445388',
        name: 'Super Admin',
      });

      const response = NextResponse.json({
        success: true,
        role: 'SUPER_ADMIN',
        name: 'Super Admin',
        redirectUrl: '/admin/dashboard',
      });

      const cookieOptions = {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 60 * 60 * 24 * 7,
      };

      response.cookies.set('vrk_admin_session', token, cookieOptions);
      response.cookies.set('vrk_staff_role', 'SUPER_ADMIN', { ...cookieOptions, httpOnly: false });
      response.cookies.set('vrk_staff_name', 'Super Admin', { ...cookieOptions, httpOnly: false });
      response.cookies.set('vrk_staff_mobile', '8008445388', { ...cookieOptions, httpOnly: false });

      cookieStore.set('vrk_admin_session', token, cookieOptions);
      cookieStore.set('vrk_staff_role', 'SUPER_ADMIN', { ...cookieOptions, httpOnly: false });
      cookieStore.set('vrk_staff_name', 'Super Admin', { ...cookieOptions, httpOnly: false });
      cookieStore.set('vrk_staff_mobile', '8008445388', { ...cookieOptions, httpOnly: false });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Invalid credentials. Please enter valid email & password or use Mobile OTP.',
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
