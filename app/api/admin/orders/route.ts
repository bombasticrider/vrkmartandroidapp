import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const supabase = createServerClient();

    const { data: orders, error } = await (supabase.from('orders') as any)
      .select('id, order_number, member_name, member_mobile, delivery_address, status, payment_method, payment_status, subtotal, delivery_fee, total_amount, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Admin orders fetch error:', error);
      return NextResponse.json({ success: true, orders: [] });
    }

    if (!orders || orders.length === 0) {
      return NextResponse.json({ success: true, orders: [] });
    }

    // Fetch items
    const orderIds = orders.map((o: any) => o.id);
    const { data: orderItems } = await (supabase.from('order_items') as any)
      .select('id, order_id, product_name, pack_size, price, quantity, line_total')
      .in('order_id', orderIds);

    const itemsMap: Record<string, any[]> = {};
    (orderItems || []).forEach((item: any) => {
      if (!itemsMap[item.order_id]) itemsMap[item.order_id] = [];
      itemsMap[item.order_id].push({
        id: item.id,
        name: item.product_name,
        packSize: item.pack_size,
        price: Number(item.price),
        quantity: Number(item.quantity),
      });
    });

    const formatted = orders.map((o: any) => ({
      id: o.id,
      orderNumber: o.order_number || `ORD-${o.id.slice(0, 8).toUpperCase()}`,
      date: o.created_at,
      memberName: o.member_name || 'Customer',
      memberMobile: o.member_mobile,
      deliveryAddress: o.delivery_address,
      items: itemsMap[o.id] || [],
      total: Number(o.total_amount) || Number(o.subtotal) || 0,
      status: o.status || 'PLACED',
      paymentStatus: o.payment_status || 'PENDING',
    }));

    return NextResponse.json({ success: true, orders: formatted });
  } catch (err: any) {
    console.error('Admin orders API exception:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return NextResponse.json({ success: false, error: 'Missing orderId or status' }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await (supabase.from('orders') as any)
      .update({ status })
      .eq('id', orderId);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Order status updated' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
