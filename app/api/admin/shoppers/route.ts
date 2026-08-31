import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';
import { getAuthenticatedStaff } from '@/lib/session';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const staff = await getAuthenticatedStaff(req);
    if (!staff) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createServerClient();

    // 1. Fetch all orders to aggregate shopper stats
    const { data: orders, error: ordersErr } = await (supabase.from('orders') as any)
      .select('id, member_mobile, member_name, total_amount, status, created_at')
      .order('created_at', { ascending: false });

    // 2. Fetch all members to check who is already a paid ₹1,000 member
    const { data: members } = await (supabase.from('members') as any)
      .select('id, vrk_id, mobile, full_name, membership_status, created_at');

    const membersMap = new Map<string, any>();
    (members || []).forEach((m: any) => {
      if (m.mobile) {
        membersMap.set(m.mobile.trim(), m);
      }
    });

    // 3. Fetch OTP verification audit records for fresh leads
    const { data: otps } = await (supabase.from('otp_verifications') as any)
      .select('mobile, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    const shoppersMap = new Map<string, {
      mobile: string;
      name: string;
      totalOrders: number;
      totalSpent: number;
      isMember: boolean;
      vrkId?: string;
      lastActive: string;
    }>();

    // Aggregate from orders
    (orders || []).forEach((o: any) => {
      const mob = (o.member_mobile || '').trim();
      if (!mob) return;

      const member = membersMap.get(mob);
      const isMember = member && member.membership_status === 'ACTIVE';

      if (!shoppersMap.has(mob)) {
        shoppersMap.set(mob, {
          mobile: mob,
          name: o.member_name || member?.full_name || 'Valued Customer',
          totalOrders: 0,
          totalSpent: 0,
          isMember: Boolean(isMember),
          vrkId: member?.vrk_id,
          lastActive: o.created_at,
        });
      }

      const shopper = shoppersMap.get(mob)!;
      shopper.totalOrders += 1;
      if (o.status === 'DELIVERED') {
        shopper.totalSpent += Number(o.total_amount) || 0;
      }
    });

    // Add OTP leads who haven't ordered yet
    (otps || []).forEach((otp: any) => {
      const mob = (otp.mobile || '').trim();
      if (!mob) return;

      if (!shoppersMap.has(mob)) {
        const member = membersMap.get(mob);
        const isMember = member && member.membership_status === 'ACTIVE';

        shoppersMap.set(mob, {
          mobile: mob,
          name: member?.full_name || 'Lead (OTP Verified)',
          totalOrders: 0,
          totalSpent: 0,
          isMember: Boolean(isMember),
          vrkId: member?.vrk_id,
          lastActive: otp.created_at,
        });
      }
    });

    const shoppersList = Array.from(shoppersMap.values());

    return NextResponse.json({
      success: true,
      shoppers: shoppersList,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
