import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { StaffRole, StaffUser, getStaffUserByMobile } from './rbac';

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.ADMIN_SECRET_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  'vrk_mart_secure_session_signing_secret_key_2026';

interface AdminTokenPayload {
  role: StaffRole;
  mobile: string;
  name: string;
  exp: number; // Unix timestamp in seconds
}

interface CustomerTokenPayload {
  mobile: string;
  exp: number;
}

/**
 * Creates a cryptographically signed HMAC SHA-256 session token
 */
function createSignedToken(data: object): string {
  const payloadBase64 = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verifies and decodes a signed HMAC SHA-256 token with timing-safe check
 */
function verifySignedToken<T extends { exp: number }>(token: string): T | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadBase64, signature] = parts;
  if (!payloadBase64 || !signature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  // Constant-time signature comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8')) as T;
    const nowInSeconds = Math.floor(Date.now() / 1000);

    // Expiration check
    if (payload.exp && payload.exp < nowInSeconds) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// ── Admin / Staff Sessions ───────────────────────────────────────────────────

export function signAdminToken(user: { role: StaffRole; mobile: string; name: string }): string {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  return createSignedToken({
    role: user.role,
    mobile: user.mobile,
    name: user.name,
    exp,
  });
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  return verifySignedToken<AdminTokenPayload>(token);
}

export async function getAuthenticatedStaff(req?: Request | NextRequest): Promise<StaffUser | null> {
  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get('vrk_admin_session')?.value;
    } catch {
      // Outside request context
    }
  }

  if (!token) return null;

  const payload = verifyAdminToken(token);
  if (!payload) return null;

  // Verify staff active status from DB/whitelist
  const staff = await getStaffUserByMobile(payload.mobile);
  if (!staff || !staff.is_active) return null;

  return staff;
}

// ── Customer Sessions ────────────────────────────────────────────────────────

export function signCustomerToken(mobile: string): string {
  const cleanMobile = mobile.replace(/\D/g, '').trim();
  const exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days
  return createSignedToken({
    mobile: cleanMobile,
    exp,
  });
}

export function verifyCustomerToken(token: string): CustomerTokenPayload | null {
  return verifySignedToken<CustomerTokenPayload>(token);
}

export function getAuthenticatedCustomer(req?: Request | NextRequest): { mobile: string } | null {
  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get('vrk_customer_session')?.value;
    } catch {
      // Outside request context
    }
  }

  if (!token) return null;

  const payload = verifyCustomerToken(token);
  if (!payload || !payload.mobile) return null;

  return { mobile: payload.mobile };
}
