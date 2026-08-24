import { createServerClient } from '@/lib/supabaseServer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      memberMobile,
      memberName,
      memberId,
      deliveryAddress,
      items,
      subtotal,
      deliveryFee = 0,
      totalAmount,
      paymentMethod = 'PAY_ON_DELIVERY',
    } = body;

    if (!memberMobile || !items || !Array.isArray(items) || items.length === 0) {
      return Response.json(
        { success: false, error: 'Mobile number and items are required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // 1. Insert into orders table
    const { data: newOrder, error: orderError } = await (supabase.from('orders') as any)
      .insert({
        member_id: memberId || null,
        member_mobile: memberMobile,
        member_name: memberName || 'Valued Customer',
        delivery_address: deliveryAddress || { city: 'Bengaluru', state: 'Karnataka' },
        status: 'PLACED',
        payment_method: paymentMethod,
        payment_status: paymentMethod === 'UPI' ? 'COLLECTED' : 'PENDING',
        subtotal: Number(subtotal) || 0,
        delivery_fee: Number(deliveryFee) || 0,
        total_amount: Number(totalAmount) || 0,
      })
      .select('id, order_number, total_amount, status, created_at')
      .single();

    if (orderError) {
      console.error('Supabase Order Insert Error:', orderError);
      return Response.json(
        { success: false, error: orderError.message },
        { status: 500 }
      );
    }

    // 2. Insert order items
    const orderItemsPayload = items.map((item: any) => ({
      order_id: newOrder.id,
      product_id: item.productId?.startsWith('p-') ? null : item.productId,
      product_name: item.productName || 'Grocery Item',
      pack_size: item.packSize || '1 Unit',
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      line_total: (Number(item.price) || 0) * (Number(item.quantity) || 1),
    }));

    const { error: itemsError } = await (supabase.from('order_items') as any)
      .insert(orderItemsPayload);


    if (itemsError) {
      console.error('Supabase Order Items Insert Error:', itemsError);
    }

    return Response.json({
      success: true,
      orderId: newOrder.id,
      orderNumber: newOrder.order_number,
      totalAmount: newOrder.total_amount,
    });
  } catch (error: any) {
    console.error('Order Create Exception:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
