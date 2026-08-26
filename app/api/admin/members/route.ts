import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient();

    const { data: members, error } = await (supabase.from('members') as any)
      .select('id, vrk_id, serial_number, full_name, mobile, email, gender, permanent_address, membership_status, payment_status, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Admin members fetch error:', error);
      return NextResponse.json({ success: true, members: [] });
    }

    const formatted = (members || []).map((m: any) => ({
      id: m.id,
      vrkId: m.vrk_id || `VRK-${String(m.serial_number || 1).padStart(8, '0')}`,
      name: m.full_name || 'Valued Member',
      mobile: m.mobile,
      email: m.email,
      status: m.membership_status || 'PENDING',
      paymentStatus: m.payment_status || 'PENDING',
      dateJoined: m.created_at,
    }));

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
