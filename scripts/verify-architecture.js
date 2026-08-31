const f = require('fs');
const content = f.readFileSync('d:/vrk-mart-2/lib/productsData.ts', 'utf8');
const sizeKB = (f.statSync('d:/vrk-mart-2/lib/productsData.ts').size / 1024).toFixed(1);

const slugs = {
  'fruits-veg': (content.match(/category_slug: "fruits-veg"/g) || []).length,
  'grocery': (content.match(/category_slug: 'grocery'/g) || []).length,
  'dairy': (content.match(/category_slug: 'dairy'/g) || []).length,
  'packaged-food': (content.match(/category_slug: 'packaged-food'/g) || []).length,
  'home-care': (content.match(/category_slug: 'home-care'/g) || []).length,
  'personal-care': (content.match(/category_slug: 'personal-care'/g) || []).length,
  'oral-care': (content.match(/category_slug: 'oral-care'/g) || []).length,
  'hair-care': (content.match(/category_slug: 'hair-care'/g) || []).length,
  'bath-body': (content.match(/category_slug: 'bath-body'/g) || []).length,
  'wellness': (content.match(/category_slug: 'wellness'/g) || []).length,
};

const total = Object.values(slugs).reduce((a,b)=>a+b, 0);

console.log('=== productsData.ts VERIFICATION ===');
console.log('File Size:', sizeKB, 'KB (', (sizeKB/1024).toFixed(2), 'MB)');
console.log('--- Products per category ---');
Object.entries(slugs).forEach(([k,v]) => console.log(`  ${k}: ${v}`));
console.log('TOTAL:', total);

// Check if bulk route actually writes to supabase
const bulkRoute = f.readFileSync('d:/vrk-mart-2/app/api/admin/products/bulk/route.ts', 'utf8');
console.log('\n=== BULK UPLOAD API ===');
console.log('Has Supabase upsert:', bulkRoute.includes('supabase') ? 'YES' : 'NO - JUST A STUB!');
console.log('Actual content:\n', bulkRoute);
