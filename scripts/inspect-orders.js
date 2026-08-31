const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
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

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SECRET_KEY'] || env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(6);
  console.log('--- RECENT ORDERS ---');
  console.log(orders);

  const { data: items } = await supabase.from('order_items').select('*').order('created_at', { ascending: false }).limit(10);
  console.log('--- ORDER ITEMS ---');
  console.log(items);
}

inspect();
