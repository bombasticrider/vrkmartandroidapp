import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory rate limit store for edge middleware (resets on cold start)
const otpRequestCounts = new Map<string, { count: number; windowStart: number }>()

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  // ── Security headers ──────────────────────────────────────────────────────
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=self, microphone=(), geolocation=()')

  // ── Admin route protection ────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const adminSession = request.cookies.get('vrk_admin_session')
    if (!adminSession?.value) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // ── OTP rate limiting: 5 requests per 10 minutes per IP ──────────────────
  if (pathname === '/api/auth/otp' && request.method === 'POST') {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const now = Date.now()
    const windowMs = 10 * 60 * 1000 // 10 minutes
    const limit = 5

    const record = otpRequestCounts.get(ip)
    if (record && now - record.windowStart < windowMs) {
      if (record.count >= limit) {
        return new NextResponse(
          JSON.stringify({ error: 'Too many OTP requests. Please try again later.' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        )
      }
      record.count += 1
    } else {
      otpRequestCounts.set(ip, { count: 1, windowStart: now })
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|icons|images|favicon.ico|manifest.json).*)',
  ],
}
