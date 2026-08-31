import { z } from 'zod';
import { createServerClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const reqSchema = z.object({
  mobile: z.string().length(10).regex(/^\d+$/),
});

const verifySchema = z.object({
  mobile: z.string().length(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mobile } = reqSchema.parse(body);

    // Audit log OTP request in Supabase
    try {
      const supabase = createServerClient();
      await (supabase.from('otp_verifications') as any).insert({
        mobile,
        otp_hash: 'FIREBASE_AUTH',
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        verified: false,
      });
    } catch (dbErr) {
      console.warn('Supabase OTP audit log warning:', dbErr);
    }

    return Response.json({
      success: true,
      message: 'OTP initiated via Firebase Auth',
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message || 'Invalid mobile number' },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const data = {
      mobile: searchParams.get('mobile'),
    };

    const { mobile } = verifySchema.parse(data);

    // Check membership in live Supabase members table
    let isMember = false;
    let memberData = null;

    try {
      const supabase = createServerClient();
      const { data: member } = await (supabase.from('members') as any)
        .select('id, vrk_id, full_name, mobile, permanent_address, temporary_address, membership_status, created_at')
        .eq('mobile', mobile.trim())
        .maybeSingle();

      if (member && member.membership_status === 'ACTIVE') {
        isMember = true;
        memberData = member;
      }
    } catch (supabaseErr) {
      console.warn('Supabase member check warning:', supabaseErr);
    }

    return Response.json({
      verified: true,
      isMember,
      memberData,
    });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message || 'Invalid parameters' },
      { status: 400 }
    );
  }
}
