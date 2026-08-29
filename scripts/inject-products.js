const fs = require('fs');
const path = require('path');

const JSON_FILE = 'D:/Downloads/VRK_Mart_Consolidated_Catalog/master_products.json';
const PRODUCTS_DATA_FILE = path.join(__dirname, '../lib/productsData.ts');

const json = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

console.log(`Loaded ${json.length} items from master_products.json`);

// Group variants by Product Name
const productsMap = new Map();

for (const item of json) {
  const rawName = item['Product Full Name'] || item['Product English Title'] || 'Product';
  const cleanTitle = item['Product English Title'] || rawName.replace(/\(.*?\)/g, '').trim();
  const regionalName = item['Regional / Local Name'] || '';
  const fullName = regionalName ? `${cleanTitle} (${regionalName})` : cleanTitle;

  const category = item['Subcategory'] || item['Category'] || 'Fresh Vegetables';
  const category_slug = 'fruits-veg';
  const brand = 'Fresh Farm';
  const packSize = item['Pack Size / Weight'] || '1 Unit';
  const price = parseFloat(item['MRP / Today Rate (₹)']) || 0;
  
  let imageFile = item['Local Image File'] || '';
  if (imageFile.startsWith('images/')) {
    imageFile = `/images/products/fruits-veg/${imageFile.replace('images/', '')}`;
  } else if (!imageFile.startsWith('/')) {
    imageFile = `/images/products/fruits-veg/${imageFile}`;
  }

  const key = cleanTitle.toLowerCase();

  if (!productsMap.has(key)) {
    productsMap.set(key, {
      id: item['SKU ID'] || `p-veg-${productsMap.size + 1}`,
      name: fullName,
      category: category,
      category_slug: category_slug,
      brand: brand,
      image_url: imageFile,
      variants: []
    });
  }

  const prod = productsMap.get(key);
  if (!prod.variants.some(v => v.pack_size === packSize)) {
    prod.variants.push({
      pack_size: packSize,
      price: price
    });
  }
}

const uniqueProducts = Array.from(productsMap.values());
console.log(`Grouped into ${uniqueProducts.length} unique parent products with variants.`);

// Let's read current lib/productsData.ts
let content = fs.readFileSync(PRODUCTS_DATA_FILE, 'utf8');

// Check if fruits-veg products are already present
const delimiter = '// ==========================================\n  // FRUITS & VEGETABLES (CONSOLIDATED CATALOG)\n  // ==========================================';

const newProductsCode = `  // ==========================================\n  // FRUITS & VEGETABLES (CONSOLIDATED CATALOG)\n  // ==========================================\n` +
  uniqueProducts.map(p => `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    category: ${JSON.stringify(p.category)},
    category_slug: ${JSON.stringify(p.category_slug)},
    brand: ${JSON.stringify(p.brand)},
    image_url: ${JSON.stringify(p.image_url)},
    variants: ${JSON.stringify(p.variants, null, 6).replace(/\n/g, '\n    ')},
  },`).join('\n');

if (content.includes(delimiter)) {
  const parts = content.split(delimiter);
  const endBracketIndex = parts[1].indexOf('\n];');
  content = parts[0] + newProductsCode + parts[1].substring(endBracketIndex);
} else {
  // Replace the closing array bracket
  content = content.replace(/\n\];\s*$/, `,\n${newProductsCode}\n];\n`);
}

fs.writeFileSync(PRODUCTS_DATA_FILE, content);
console.log(`✅ Successfully injected ${uniqueProducts.length} products into lib/productsData.ts!`);
