import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';

    // If PhonePe credentials are not configured yet, reject webhook safely
    if (!saltKey) {
      console.warn('PhonePe webhook received but PHONEPE_SALT_KEY is not configured.');
      return NextResponse.json(
        { error: 'Payment gateway webhook not configured' },
        { status: 503 }
      );
    }

    const signature = req.headers.get('x-verify');
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing X-VERIFY signature header' },
        { status: 400 }
      );
    }

    const rawBody = await req.text();

    // Compute expected PhonePe SHA-256 signature
    const calculatedHash = crypto
      .createHash('sha256')
      .update(rawBody + saltKey)
      .digest('hex');

    const expectedSignature = `${calculatedHash}###${saltIndex}`;

    // Constant-time signature comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      console.error('Invalid PhonePe webhook signature detected.');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    // Parse verified payload
    const payload = JSON.parse(rawBody);
    const decodedResponse = payload.response
      ? JSON.parse(Buffer.from(payload.response, 'base64').toString('utf8'))
      : payload;

    const { code, data } = decodedResponse;
    const transactionId = data?.merchantTransactionId;
    const paymentSuccess = code === 'PAYMENT_SUCCESS';

    if (transactionId && paymentSuccess) {
      const supabase = createServerClient();

      // Check if transaction belongs to a Membership
      if (transactionId.startsWith('VRK_MEM_') || transactionId.startsWith('MEM_')) {
        await (supabase.from('members') as any)
          .update({
            payment_status: 'PAID',
            membership_status: 'ACTIVE',
          })
          .eq('payment_reference', transactionId);
      }

      // Check if transaction belongs to an Order
      if (transactionId.startsWith('ORD_') || transactionId.startsWith('VRK_ORD_')) {
        await (supabase.from('orders') as any)
          .update({
            payment_status: 'COLLECTED',
          })
          .eq('order_number', transactionId);
      }
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' }, { status: 200 });
  } catch (error: any) {
    console.error('PhonePe Webhook exception:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}
