import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';
import { getAuthenticatedCustomer, getAuthenticatedStaff } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mobile, fullName, address } = body;

    const cleanName = (fullName || '').trim();
    let targetMobile = (mobile || '').replace(/\D/g, '').trim();

    // ── Security Check: IDOR Protection ──────────────────────────────────────
    const customer = getAuthenticatedCustomer(req);
    const staff = await getAuthenticatedStaff(req);

    if (customer) {
      // Strictly bind profile update to the verified customer session mobile
      targetMobile = customer.mobile;
    } else if (staff) {
      // Staff can update on behalf of customer with provided mobile
      targetMobile = targetMobile;
    } else if (!targetMobile) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!targetMobile || !cleanName) {
      return NextResponse.json(
        { success: false, error: 'Mobile number and full name are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if member/customer record already exists
    const { data: existing } = await (supabase.from('members') as any)
      .select('id, full_name, mobile')
      .eq('mobile', targetMobile)
      .maybeSingle();

    if (existing) {
      // Update name & address
      await (supabase.from('members') as any)
        .update({
          full_name: cleanName,
          permanent_address: address ? { line1: address } : undefined,
        })
        .eq('mobile', targetMobile);
    } else {
      // Create new customer record
      await (supabase.from('members') as any).insert({
        full_name: cleanName,
        mobile: targetMobile,
        permanent_address: address ? { line1: address } : null,
        membership_status: 'PENDING',
        payment_status: 'PENDING',
        delivery_pincode: '560001',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      memberName: cleanName,
      address,
    });
  } catch (error: any) {
    console.error('Customer profile update exception:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
