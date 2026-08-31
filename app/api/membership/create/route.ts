import { createServerClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      mobile,
      dateOfBirth,
      gender,
      email,
      permanentAddress,
      temporaryAddress,
      deliveryPincode,
      nominees,
      familyWelfare,
      identityProofs,
      dreamBox,
      dreamDescription,
      organizerCode,
      signaturePath,
      selfiePath,
      paymentReference,
    } = body;

    if (!fullName || !mobile) {
      return Response.json(
        { success: false, error: 'Full name and mobile number are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Check if mobile already registered
    const { data: existingMember } = await (supabase.from('members') as any)
      .select('id, vrk_id, full_name, mobile, membership_status')
      .eq('mobile', mobile.trim())
      .maybeSingle();

    if (existingMember) {
      return Response.json({
        success: true,
        vrkId: existingMember.vrk_id,
        memberId: existingMember.id,
        memberData: existingMember,
        alreadyRegistered: true,
      });
    }

    // Insert new member record into Supabase members table
    const { data: newMember, error: insertError } = await (supabase.from('members') as any)
      .insert({
        full_name: fullName.trim(),
        mobile: mobile.trim(),
        date_of_birth: dateOfBirth || null,
        gender: gender || null,
        email: email ? email.trim() : null,
        permanent_address: permanentAddress || null,
        temporary_address: temporaryAddress || null,
        delivery_pincode: deliveryPincode || '560001',
        nominees: nominees || [],
        family_welfare: familyWelfare || null,
        identity_proofs: identityProofs || [],
        dream_box: dreamBox || 'No Dream',
        dream_description: dreamDescription || null,
        organizer_code: organizerCode || 'VRK-ORG-101',
        signature_path: signaturePath || null,
        selfie_path: selfiePath || null,
        payment_reference: paymentReference || `INIT_${Date.now()}`,
        payment_status: 'PENDING',
        membership_status: 'PENDING',
      })
      .select('id, vrk_id, full_name, mobile, serial_number, created_at')
      .single();


    if (insertError) {
      console.error('Supabase Member Insert Error:', insertError);
      return Response.json(
        { success: false, error: insertError.message },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      vrkId: newMember.vrk_id,
      memberId: newMember.id,
      memberData: newMember,
    });
  } catch (error: any) {
    console.error('Membership Create Exception:', error);
    return Response.json(
      { success: false, error: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
