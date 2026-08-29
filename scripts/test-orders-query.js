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

async function verify() {
  const { data: orders } = await supabase.from('orders').select('*').eq('member_mobile', '8008445388').order('created_at', { ascending: false });
  const ids = orders.map(o => o.id);
  const { data: items } = await supabase.from('order_items').select('*').in('order_id', ids);

  console.log('Orders found for 8008445388:', orders.length);
  orders.forEach(o => {
    const oItems = items.filter(i => i.order_id === o.id);
    console.log(o.order_number, 'Items count:', oItems.length, '->', oItems.map(i => i.product_name).join(', '));
  });
}
verify();
