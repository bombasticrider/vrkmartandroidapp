const fs = require('fs');
const path = require('path');

const JSON_FILE = 'D:/Downloads/VRK_Mart_Consolidated_Catalog/master_products.json';
const PRODUCTS_DATA_FILE = path.join(__dirname, '../lib/productsData.ts');

const json = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));

// Group variants by clean title
const productsMap = new Map();

for (const item of json) {
  const rawName = item['Product Full Name'] || item['Product English Title'] || 'Product';
  const cleanTitle = item['Product English Title'] || rawName.replace(/\(.*?\)/g, '').trim();
  const regionalName = item['Regional / Local Name'] || '';
  const fullName = regionalName ? `${cleanTitle} (${regionalName})` : cleanTitle;

  const category = item['Subcategory'] || item['Category'] || 'Fresh Vegetables';
  const category_slug = 'fruits-veg';
  const brand = 'Fresh Produce';
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
console.log(`Prepared ${uniqueProducts.length} unique fruits-veg products.`);

// Let's read the current file and find where ALL_PRODUCTS ends
let content = fs.readFileSync(PRODUCTS_DATA_FILE, 'utf8');

// If fruits-veg are not yet in ALL_PRODUCTS, insert them before `export function getProductsByCategory`
const helperIndex = content.indexOf('// Helper to filter products by category slug');
if (helperIndex !== -1) {
  const beforeHelper = content.substring(0, helperIndex);
  // Find the last `];` before the helper
  const lastArrayEnd = beforeHelper.lastIndexOf('];');
  if (lastArrayEnd !== -1) {
    const startPart = content.substring(0, lastArrayEnd);
    
    const formattedProducts = uniqueProducts.map(p => `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    category: ${JSON.stringify(p.category)},
    category_slug: "fruits-veg",
    brand: ${JSON.stringify(p.brand)},
    image_url: ${JSON.stringify(p.image_url)},
    variants: ${JSON.stringify(p.variants, null, 6).replace(/\n/g, '\n    ')},
  },`).join('\n');

    const updatedHelper = `// Helper to filter products by category slug
export function getProductsByCategory(categorySlug: string): (ProductCardProduct & { category_slug: string })[] {
  const normalized = categorySlug.toLowerCase();
  
  if (normalized === 'fruits-veg' || normalized === 'fruits-vegetables') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'fruits-veg');
  }
  if (normalized === 'grocery' || normalized === 'groceries') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'grocery');
  }
  if (normalized === 'dairy') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'dairy');
  }
  if (normalized === 'packaged-food') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'packaged-food');
  }
  if (normalized === 'home-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'home-care');
  }
  if (normalized === 'personal-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'personal-care');
  }
  if (normalized === 'oral-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'oral-care');
  }
  if (normalized === 'hair-care') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'hair-care');
  }
  if (normalized === 'bath-body') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'bath-body');
  }
  if (normalized === 'wellness') {
    return ALL_PRODUCTS.filter(p => p.category_slug === 'wellness');
  }

  // Fallback match
  const matches = ALL_PRODUCTS.filter(p => 
    p.category_slug === normalized || (p.category || '').toLowerCase().includes(normalized)
  );
  return matches.length > 0 ? matches : ALL_PRODUCTS.slice(0, 8);
}
`;

    const newContent = `${startPart}
  // ==========================================
  // FRUITS & VEGETABLES (CONSOLIDATED CATALOG - ${uniqueProducts.length} PRODUCTS)
  // ==========================================
${formattedProducts}
];

${updatedHelper}`;

    fs.writeFileSync(PRODUCTS_DATA_FILE, newContent);
    console.log(`✅ Successfully updated lib/productsData.ts! Total products in catalog: over ${77 + uniqueProducts.length}`);
  }
}
