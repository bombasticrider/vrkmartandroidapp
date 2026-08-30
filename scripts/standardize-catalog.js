const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const PRODUCTS_DATA_FILE = path.join(__dirname, '../lib/productsData.ts');

let content = fs.readFileSync(PRODUCTS_DATA_FILE, 'utf8');

// Extract ALL_PRODUCTS array by slicing between `export const ALL_PRODUCTS` and `export function getProductsByCategory`
const startIdx = content.indexOf('export const ALL_PRODUCTS');
const endIdx = content.indexOf('export function getProductsByCategory');

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate ALL_PRODUCTS bounds');
  process.exit(1);
}

const productsSection = content.substring(startIdx, endIdx);

// Extract CATEGORIES
const catStart = content.indexOf('export const CATEGORIES');
const catEnd = content.indexOf('export const ALL_PRODUCTS');
const categoriesSection = content.substring(catStart, catEnd).trim();

// Use Function constructor to parse ALL_PRODUCTS in isolated context
const evalCode = `
  const obj = ${productsSection.replace('export const ALL_PRODUCTS: (ProductCardProduct & { category_slug: string })[] =', '').replace(/;\s*$/, '')};
  return obj;
`;

const rawProducts = new Function(evalCode)();
console.log(`Parsed ${rawProducts.length} products.`);

let skuCounter = 1;
const standardizedProducts = rawProducts.map((prod) => {
  const formattedSku = String(skuCounter++).padStart(6, '0'); // '000001', '000002', etc.

  const cleanVariants = (prod.variants || []).map((v) => ({
    pack_size: v.pack_size,
    price: 0, // 0 price for Today's Market Price model
  }));

  return {
    id: formattedSku,
    name: prod.name,
    category: prod.category || 'General',
    category_slug: prod.category_slug || 'grocery',
    brand: prod.brand || 'VRK Quality',
    image_url: prod.image_url,
    variants: cleanVariants.length > 0 ? cleanVariants : [{ pack_size: '1 Unit', price: 0 }],
  };
});

const newFileContent = `import { ProductCardProduct } from '@/components/customer/ProductCard';

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

${categoriesSection}

export const ALL_PRODUCTS: (ProductCardProduct & { category_slug: string })[] = [
` + standardizedProducts.map(p => `  {
    id: ${JSON.stringify(p.id)},
    name: ${JSON.stringify(p.name)},
    category: ${JSON.stringify(p.category)},
    category_slug: ${JSON.stringify(p.category_slug)},
    brand: ${JSON.stringify(p.brand)},
    image_url: ${JSON.stringify(p.image_url)},
    variants: ${JSON.stringify(p.variants, null, 6).replace(/\n/g, '\n    ')},
  },`).join('\n') + `
];

// Helper to filter products by category slug
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

fs.writeFileSync(PRODUCTS_DATA_FILE, newFileContent);
console.log(`✅ Successfully updated lib/productsData.ts with ${standardizedProducts.length} standardized products (IDs 000001 - ${String(skuCounter - 1).padStart(6, '0')})!`);

// 2. Generate Master Excel Upload Template
const templateDir = path.join(__dirname, '../public/templates');
if (!fs.existsSync(templateDir)) fs.mkdirSync(templateDir, { recursive: true });

const templateRows = [
  {
    'SKU_ID': '000001',
    'Product_Name': 'Broccoli (Kosugadde)',
    'Category_Slug': 'fruits-veg',
    'Subcategory': 'Exotics',
    'Brand': 'Fresh Produce',
    'Variants': '200 g, 500 g, 1 kg',
    'Image_URL': 'broccoli_kosugadde.webp',
    'Is_Active': 'TRUE'
  },
  {
    'SKU_ID': '000002',
    'Product_Name': 'Aashirvaad Superior MP Shudh Chakki Atta',
    'Category_Slug': 'grocery',
    'Subcategory': 'Atta & Flours',
    'Brand': 'Aashirvaad',
    'Variants': '1 kg, 5 kg, 10 kg',
    'Image_URL': 'aashirvaad_atta.webp',
    'Is_Active': 'TRUE'
  },
  {
    'SKU_ID': '000003',
    'Product_Name': 'Amul Taaza Homogenised Toned Milk',
    'Category_Slug': 'dairy',
    'Subcategory': 'Milk & Curd',
    'Brand': 'Amul',
    'Variants': '500 ml, 1 Litre',
    'Image_URL': 'amul_taaza.webp',
    'Is_Active': 'TRUE'
  },
  {
    'SKU_ID': '000004',
    'Product_Name': 'Surf Excel Quick Wash Detergent Powder',
    'Category_Slug': 'home-care',
    'Subcategory': 'Detergents & Laundry',
    'Brand': 'Surf Excel',
    'Variants': '500 g, 1 kg, 2 kg, 4 kg',
    'Image_URL': 'surf_excel.webp',
    'Is_Active': 'TRUE'
  },
];

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(templateRows);

ws['!cols'] = [
  { wch: 14 }, // SKU_ID
  { wch: 45 }, // Product_Name
  { wch: 18 }, // Category_Slug
  { wch: 25 }, // Subcategory
  { wch: 18 }, // Brand (Optional)
  { wch: 30 }, // Variants
  { wch: 35 }, // Image_URL
  { wch: 12 }, // Is_Active
];

XLSX.utils.book_append_sheet(wb, ws, 'Product_Upload_Template');

// Also create Instructions Sheet
const instructions = [
  { 'Column': 'SKU_ID', 'Required': 'YES', 'Description': '6-digit unique identifier starting from 000001 (e.g. 000001, 000002).' },
  { 'Column': 'Product_Name', 'Required': 'YES', 'Description': 'Full product title (e.g. Broccoli (Kosugadde)).' },
  { 'Column': 'Category_Slug', 'Required': 'YES', 'Description': 'Master category slug: fruits-veg, grocery, dairy, packaged-food, home-care, personal-care, oral-care, hair-care, bath-body, wellness.' },
  { 'Column': 'Subcategory', 'Required': 'YES', 'Description': 'Shelf title (e.g. Exotics, Fresh Vegetables, Atta & Flours). Automatically builds the category sidebar rail.' },
  { 'Column': 'Brand', 'Required': 'OPTIONAL', 'Description': 'Internal brand metadata (hidden from customer frontend).' },
  { 'Column': 'Variants', 'Required': 'YES', 'Description': 'Comma-separated pack sizes (e.g. 200 g, 500 g, 1 kg).' },
  { 'Column': 'Image_URL', 'Required': 'YES', 'Description': '800x800 WebP filename in public images folder, or external CDN link to auto-download.' },
  { 'Column': 'Is_Active', 'Required': 'OPTIONAL', 'Description': 'TRUE or FALSE (defaults to TRUE).' },
];

const wsInstructions = XLSX.utils.json_to_sheet(instructions);
wsInstructions['!cols'] = [{ wch: 18 }, { wch: 12 }, { wch: 80 }];
XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions');

const templatePath = path.join(templateDir, 'VRK_Mart_Product_Upload_Template.xlsx');
XLSX.writeFile(wb, templatePath);
console.log(`✅ Master Product Upload Template saved to: ${templatePath}`);
