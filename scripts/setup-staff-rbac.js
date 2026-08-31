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
const supabaseKey = env['SUPABASE_SECRET_KEY'] || env['SUPABASE_SERVICE_ROLE_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStaffTable() {
  console.log('Checking Supabase connection...');

  // Try querying staff_users table
  const { data: existing, error: queryErr } = await supabase.from('staff_users').select('*').limit(1);

  if (queryErr && queryErr.code === '42P01') {
    console.log('Table staff_users does not exist yet. Please create it or we can insert via SQL.');
  } else {
    console.log('staff_users table exists or query returned:', queryErr || existing);
  }

  // Upsert developer 8008445388 as permanent SUPER_ADMIN
  const { data: upsertData, error: upsertErr } = await supabase.from('staff_users').upsert({
    mobile: '8008445388',
    name: 'Developer / Super Admin',
    role: 'SUPER_ADMIN',
    is_active: true,
    created_by: 'SYSTEM',
  }, { onConflict: 'mobile' }).select();

  if (upsertErr) {
    console.log('Upsert error (table might need creation in Supabase SQL editor):', upsertErr);
  } else {
    console.log('✅ Successfully seeded Super Admin (8008445388):', upsertData);
  }
}

setupStaffTable();
