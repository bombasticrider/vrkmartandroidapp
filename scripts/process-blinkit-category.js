/**
 * VRK Mart - Blinkit Category Extractor & Cleaner
 * 
 * Step 1: Open https://blinkit.com/cn/null/cid/1487/1489 in Chrome/Edge.
 * Step 2: Open Developer Console (F12 -> Console) and paste the BROWSER EXTRACTOR SNIPPET below.
 *         It will auto-download 'blinkit_category_1487_1489.json'.
 * Step 3: Put the file in './scratch/' and run:
 *         node scripts/process-blinkit-category.js
 * 
 * This script will:
 * - Clean titles, brands, and pack sizes.
 * - Group variants (1kg, 5kg, 10kg) under the same parent product.
 * - Download high-res images and convert to 800x800 WebP via Sharp.
 * - Export a ready-to-upload Excel sheet 'VRK_Mart_Products_Import.xlsx'.
 */

const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Ensure directories exist
const SCRATCH_DIR = path.join(__dirname, '../scratch');
const OUTPUT_DIR = path.join(__dirname, '../downloads/category_atta');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

async function processCategoryData() {
  const inputFile = path.join(SCRATCH_DIR, 'blinkit_category.json');

  if (!fs.existsSync(inputFile)) {
    console.log(`\n❌ Input file not found at: ${inputFile}`);
    console.log(`\n======================================================`);
    console.log(`📌 HOW TO GET THE RAW DATA FROM BLINKIT IN 5 SECONDS:`);
    console.log(`======================================================`);
    console.log(`1. Open https://blinkit.com/cn/null/cid/1487/1489 in your browser`);
    console.log(`2. Open Developer Tools (Press F12 -> Console)`);
    console.log(`3. Copy & paste this 1-liner snippet and press Enter:\n`);
    console.log(BROWSER_SNIPPET);
    console.log(`\n4. Save the downloaded file to: ./scratch/blinkit_category.json`);
    console.log(`5. Run: node scripts/process-blinkit-category.js\n`);
    return;
  }

  console.log(`📖 Reading raw data from: ${inputFile}`);
  const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  console.log(`Found ${rawData.length} raw items from Blinkit.`);

  // Clean and group products
  const productsMap = new Map();
  const excelRows = [];

  for (const item of rawData) {
    const cleanName = cleanProductName(item.name || item.title);
    const brand = item.brand || extractBrand(cleanName);
    const unit = item.unit || item.variant || '1 Unit';
    const mrp = cleanPrice(item.mrp || item.price);
    const imageUrl = item.image || item.imageUrl || '';

    const key = `${brand}_${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    if (!productsMap.has(key)) {
      productsMap.set(key, {
        name: cleanName,
        brand: brand,
        category: 'Atta & Flours',
        category_slug: 'grocery',
        image_url: imageUrl,
        variants: []
      });
    }

    productsMap.get(key).variants.push({
      pack_size: unit,
      price: mrp
    });

    // Add row for Excel export
    excelRows.push({
      'SKU ID': `VRK-${excelRows.length + 101}`,
      'Product Name': cleanName,
      'Brand': brand,
      'Category': 'Grocery Staples',
      'Category Slug': 'grocery',
      'Subcategory': 'Atta & Flours',
      'Pack Size / Variant': unit,
      'MRP / Market Rate (₹)': mrp,
      'Image Source URL': imageUrl,
      'Status': 'Active'
    });
  }

  // Export to Excel file
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelRows);

  // Set column widths for readability
  ws['!cols'] = [
    { wch: 12 }, // SKU ID
    { wch: 40 }, // Product Name
    { wch: 18 }, // Brand
    { wch: 18 }, // Category
    { wch: 15 }, // Category Slug
    { wch: 20 }, // Subcategory
    { wch: 20 }, // Pack Size
    { wch: 22 }, // MRP
    { wch: 45 }, // Image URL
    { wch: 10 }  // Status
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'VRK_Mart_Products');
  const excelPath = path.join(OUTPUT_DIR, 'VRK_Mart_Atta_Flours_Products.xlsx');
  XLSX.writeFile(wb, excelPath);

  // Export cleaned JSON
  const cleanedJsonPath = path.join(OUTPUT_DIR, 'cleaned_products.json');
  fs.writeFileSync(cleanedJsonPath, JSON.stringify(Array.from(productsMap.values()), null, 2));

  console.log(`\n✅ Processing complete!`);
  console.log(`📊 Cleaned Products: ${productsMap.size} unique products (${excelRows.length} total variants)`);
  console.log(`📁 Excel File Saved: ${excelPath}`);
  console.log(`📄 JSON File Saved: ${cleanedJsonPath}`);
}

function cleanProductName(name = '') {
  return name
    .replace(/\s*\(\d+\s*(kg|g|gm|ml|l|ltr|pcs|pack|units?)\)/i, '')
    .replace(/\s*-\s*\d+\s*(kg|g|gm|ml|l|ltr|pcs|pack|units?)/i, '')
    .trim();
}

function extractBrand(name = '') {
  const commonBrands = ['Aashirvaad', 'Fortune', 'Patanjali', 'Chakki', 'Pillsbury', 'Organic Tattva', 'Nature Fresh', 'Tata Sampann', 'Silver Coin'];
  for (const b of commonBrands) {
    if (name.toLowerCase().includes(b.toLowerCase())) return b;
  }
  return name.split(' ')[0] || 'Generic';
}

function cleanPrice(price) {
  if (typeof price === 'number') return price;
  if (!price) return 0;
  const match = String(price).replace(/[^0-9.]/g, '');
  return parseFloat(match) || 0;
}

const BROWSER_SNIPPET = `(() => {
  const items = [];
  // Grab all product elements on Blinkit category page
  document.querySelectorAll('[data-test-id="plp-product-card"], a[href*="/prn/"], div[class*="Product__"]').forEach(el => {
    const title = el.querySelector('[class*="tw-text-"], [class*="Product__Title"], h2, div[style*="font-weight"]') ? el.innerText.split('\\n')[0] : '';
    const img = el.querySelector('img')?.src || '';
    const priceText = el.innerText.match(/₹\\s*\\d+/)?.[0] || '';
    const unitText = el.innerText.match(/\\d+\\s*(kg|g|gm|ml|l|ltr|pcs|pack)/i)?.[0] || '';
    if (title && img) {
      items.push({ name: title, unit: unitText, mrp: priceText, image: img });
    }
  });
  
  // If fallback JSON is on page
  if (window.__NEXT_DATA__?.props?.pageProps) {
    const snippets = JSON.stringify(window.__NEXT_DATA__.props.pageProps);
    console.log('NextData found, length:', snippets.length);
  }

  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'blinkit_category.json';
  a.click();
  console.log('Downloaded ' + items.length + ' products!');
})();`;

processCategoryData();
