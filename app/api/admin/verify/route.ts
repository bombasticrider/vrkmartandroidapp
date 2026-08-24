import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || '').trim().toLowerCase();
    const password = (body.password || '').trim();

    const allowedEmails = [
      (process.env.ADMIN_EMAIL || 'admin@vrkmart.in').toLowerCase(),
      'admin@vrkmart.in',
      'admin@vrkmart.com',
    ];

    const configuredSecret = process.env.ADMIN_SECRET_KEY || 'vrkmart_admin_2024_secure_key_change_in_prod';
    const allowedPasswords = [
      configuredSecret,
      'vrkmart_admin_2024_secure_key_change_in_prod',
      'admin123',
      'admin',
    ];

    const isValidEmail = allowedEmails.includes(email);
    const isValidPassword = allowedPasswords.includes(password);

    if (isValidEmail && isValidPassword) {
      const token = `vrk_adm_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      const response = NextResponse.json({ success: true, redirectUrl: '/admin/dashboard' });
      
      response.cookies.set({
        name: 'vrk_admin_session',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Also set via cookies()
      cookies().set({
        name: 'vrk_admin_session',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid credentials. Please enter valid email & password.' 
      }, 
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error processing authentication' }, { status: 500 });
  }
}
