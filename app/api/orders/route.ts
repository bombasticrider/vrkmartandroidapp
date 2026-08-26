import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mobile = searchParams.get('mobile');

    if (!mobile) {
      return NextResponse.json(
        { success: false, error: 'Mobile number is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Fetch orders for this mobile number
    const { data: orders, error: ordersError } = await (supabase.from('orders') as any)
      .select('id, order_number, member_name, member_mobile, delivery_address, status, payment_method, payment_status, subtotal, delivery_fee, total_amount, created_at')
      .eq('member_mobile', mobile.trim())
      .order('created_at', { ascending: false });

    if (ordersError) {
      console.error('Supabase orders fetch error:', ordersError);
      return NextResponse.json({ success: true, orders: [] });
    }

    if (!orders || orders.length === 0) {
      return NextResponse.json({ success: true, orders: [] });
    }

    // Fetch order items for all fetched orders
    const orderIds = orders.map((o: any) => o.id);
    const { data: orderItems } = await (supabase.from('order_items') as any)
      .select('id, order_id, product_id, product_name, pack_size, price, quantity, line_total')
      .in('order_id', orderIds);

    const itemsByOrder: Record<string, any[]> = {};
    (orderItems || []).forEach((item: any) => {
      if (!itemsByOrder[item.order_id]) {
        itemsByOrder[item.order_id] = [];
      }
      itemsByOrder[item.order_id].push(item);
    });

    const enrichedOrders = orders.map((order: any) => ({
      ...order,
      items: itemsByOrder[order.id] || [],
    }));

    return NextResponse.json({ success: true, orders: enrichedOrders });
  } catch (error: any) {
    console.error('Orders GET exception:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
