const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envFile = fs.readFileSync('d:/vrk-mart-2/.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let val = match[2] || '';
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    env[match[1]] = val.trim();
  }
});
const supabase = createClient(env['NEXT_PUBLIC_SUPABASE_URL'], env['SUPABASE_SECRET_KEY']);

async function backfill() {
  const order5Id = '4436d6ca-6033-4588-b53a-676407e9c7ab'; // ORD-00000005
  const order4Id = '5445d3d3-6d78-43c4-acc5-79625c90271d'; // ORD-00000004

  // Check if items already exist
  const { data: o5Existing } = await supabase.from('order_items').select('id').eq('order_id', order5Id);
  if (!o5Existing || o5Existing.length === 0) {
    const o5Items = [
      { order_id: order5Id, product_id: null, product_name: 'Green Chilli (Menasinakayi)', pack_size: '100 g', price: 11, quantity: 1, line_total: 11 },
      { order_id: order5Id, product_id: null, product_name: 'Onion (Eerulli)', pack_size: '1 kg', price: 38, quantity: 1, line_total: 38 },
      { order_id: order5Id, product_id: null, product_name: 'Tomato Hybrid (Tomato)', pack_size: '1 kg', price: 35, quantity: 1, line_total: 35 },
      { order_id: order5Id, product_id: null, product_name: 'Potato (Alugadde)', pack_size: '1 kg', price: 40, quantity: 1, line_total: 40 },
      { order_id: order5Id, product_id: null, product_name: 'Yellaki Banana (Yellaki Baale Hannu)', pack_size: '500 g', price: 74, quantity: 1, line_total: 74 },
      { order_id: order5Id, product_id: null, product_name: 'Coriander Bunch (Kottambari Soppu)', pack_size: '100 g', price: 20, quantity: 1, line_total: 20 },
    ];
    const { error: err5 } = await supabase.from('order_items').insert(o5Items);
    console.log('Order 5 backfill:', err5 ? err5.message : 'SUCCESS');
  }

  const { data: o4Existing } = await supabase.from('order_items').select('id').eq('order_id', order4Id);
  if (!o4Existing || o4Existing.length === 0) {
    const o4Items = [
      { order_id: order4Id, product_id: null, product_name: 'Broccoli (Kosugadde)', pack_size: '200 g', price: 40, quantity: 1, line_total: 40 },
      { order_id: order4Id, product_id: null, product_name: 'Button Mushroom Pack', pack_size: '200 g', price: 55, quantity: 1, line_total: 55 },
      { order_id: order4Id, product_id: null, product_name: 'Red Bell Pepper', pack_size: '200 g', price: 45, quantity: 1, line_total: 45 },
      { order_id: order4Id, product_id: null, product_name: 'Mint Leaves (Pudina Soppu)', pack_size: '100 g', price: 15, quantity: 1, line_total: 15 },
      { order_id: order4Id, product_id: null, product_name: 'Tender Coconut', pack_size: '1 pc', price: 50, quantity: 1, line_total: 50 },
      { order_id: order4Id, product_id: null, product_name: 'Ginger (Shunti)', pack_size: '100 g', price: 38, quantity: 1, line_total: 38 },
    ];
    const { error: err4 } = await supabase.from('order_items').insert(o4Items);
    console.log('Order 4 backfill:', err4 ? err4.message : 'SUCCESS');
  }
}

backfill();
