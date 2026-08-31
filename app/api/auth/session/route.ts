import { NextRequest, NextResponse } from 'next/server';
import { signCustomerToken, getAuthenticatedCustomer } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanMobile = String(body.mobile || '').replace(/\D/g, '').trim();

    if (cleanMobile.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Valid 10-digit mobile number required' },
        { status: 400 }
      );
    }

    // Create signed customer token
    const token = signCustomerToken(cleanMobile);

    const response = NextResponse.json({
      success: true,
      mobile: cleanMobile,
      message: 'Session established',
    });

    const cookieOptions = {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    };

    response.cookies.set('vrk_customer_session', token, cookieOptions);

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const customer = getAuthenticatedCustomer(req);

    if (!customer) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      mobile: customer.mobile,
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.set('vrk_customer_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
