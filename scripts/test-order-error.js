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

async function testInsert() {
  // Check order_items for order 6
  const { data: o6Items } = await supabase.from('order_items').select('*').eq('order_id', 'a71f0fad-9c15-40ae-882d-0554f72b8c07');
  console.log('Order 6 items in DB count:', o6Items?.length);
  console.log('Order 6 sample item in DB:', o6Items?.[0]);

  // Check order 5 items in DB
  const { data: o5Items } = await supabase.from('order_items').select('*').eq('order_id', '4436d6ca-6033-4588-b53a-676407e9c7ab');
  console.log('Order 5 items in DB count:', o5Items?.length);

  // Check order 4 items in DB
  const { data: o4Items } = await supabase.from('order_items').select('*').eq('order_id', '5445d3d3-6d78-43c4-acc5-79625c90271d');
  console.log('Order 4 items in DB count:', o4Items?.length);

  // Now test inserting a dummy item with product_id 'VRK-1001'
  const testRes1 = await supabase.from('order_items').insert({
    order_id: '4436d6ca-6033-4588-b53a-676407e9c7ab',
    product_id: 'VRK-1001',
    product_name: 'Test Chilli',
    pack_size: '100 g',
    price: 11,
    quantity: 1,
    line_total: 11
  });
  console.log('Test insert with "VRK-1001" product_id error:', testRes1.error);
}

testInsert();
