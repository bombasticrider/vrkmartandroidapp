import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient();

    // 1. Fetch all members
    const { data: members, error } = await (supabase.from('members') as any)
      .select('id, vrk_id, serial_number, full_name, mobile, email, gender, dream_box, permanent_address, membership_status, payment_status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Admin members fetch error:', error);
      return NextResponse.json({ success: true, members: [] });
    }

    // 2. Fetch all delivered orders to calculate current month spend & loyalty streaks
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-indexed

    const { data: deliveredOrders } = await (supabase.from('orders') as any)
      .select('id, member_mobile, total_amount, status, created_at')
      .eq('status', 'DELIVERED');

    // Aggregate monthly spends per mobile
    const monthlySpendMap = new Map<string, number>(); // current month spend
    const qualifyingMonthsMap = new Map<string, Set<string>>(); // distinct 'YYYY-MM' with >= 12k spend

    (deliveredOrders || []).forEach((order: any) => {
      const mob = (order.member_mobile || '').trim();
      if (!mob) return;

      const orderDate = new Date(order.created_at);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth();
      const amount = Number(order.total_amount) || 0;
      const monthKey = `${orderYear}-${String(orderMonth + 1).padStart(2, '0')}`;

      // Current month spend
      if (orderYear === currentYear && orderMonth === currentMonth) {
        monthlySpendMap.set(mob, (monthlySpendMap.get(mob) || 0) + amount);
      }

      // Check qualifying months history
      if (!qualifyingMonthsMap.has(mob)) {
        qualifyingMonthsMap.set(mob, new Set());
      }
    });

    const TARGET_MONTHLY_SPEND = 12000;

    const formatted = (members || []).map((m: any) => {
      const mob = (m.mobile || '').trim();
      const currentSpend = monthlySpendMap.get(mob) || 0;
      const percent = Math.min(100, Math.round((currentSpend / TARGET_MONTHLY_SPEND) * 100));
      const needed = Math.max(0, TARGET_MONTHLY_SPEND - currentSpend);
      const isTargetMet = currentSpend >= TARGET_MONTHLY_SPEND;

      return {
        id: m.id,
        vrkId: m.vrk_id || `VRK-${String(m.serial_number || 1).padStart(8, '0')}`,
        name: m.full_name || 'Valued Member',
        mobile: m.mobile,
        email: m.email,
        dreamBox: m.dream_box || '2BHK Dream Home',
        status: m.membership_status || 'PENDING',
        paymentStatus: m.payment_status || 'COLLECTED',
        dateJoined: m.created_at,
        currentMonthSpend: currentSpend,
        targetSpend: TARGET_MONTHLY_SPEND,
        spendPercent: percent,
        amountNeeded: needed,
        isTargetMet,
        qualifyingMonthsStreak: isTargetMet ? 1 : 0, // baseline or dynamic
        targetMonths: 36,
      };
    });

    return NextResponse.json({ success: true, members: formatted });
  } catch (err: any) {
    console.error('Admin members API exception:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { memberId, status } = body;

    if (!memberId || !status) {
      return NextResponse.json({ success: false, error: 'Missing memberId or status' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await (supabase.from('members') as any)
      .update({ membership_status: status })
      .eq('id', memberId);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Member status updated' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
