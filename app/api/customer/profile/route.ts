import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mobile, fullName, address } = body;

    if (!mobile || !fullName) {
      return NextResponse.json(
        { success: false, error: 'Mobile number and full name are required' },
        { status: 400 }
      );
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    const cleanName = fullName.trim();
    const supabase = createServerClient();

    // Check if member/customer record already exists
    const { data: existing } = await (supabase.from('members') as any)
      .select('id, full_name, mobile')
      .eq('mobile', cleanMobile)
      .maybeSingle();

    if (existing) {
      // Update name & address
      await (supabase.from('members') as any)
        .update({
          full_name: cleanName,
          permanent_address: address ? { line1: address } : undefined,
        })
        .eq('mobile', cleanMobile);
    } else {
      // Create new customer record
      await (supabase.from('members') as any).insert({
        full_name: cleanName,
        mobile: cleanMobile,
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
