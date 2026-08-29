const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const XLSX = require('xlsx');

const SOURCE_DIR = 'D:/Downloads';
const OUTPUT_DIR = 'D:/Downloads/VRK_Mart_Consolidated_Catalog';
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

const CATEGORY_FILES = [
  { file: 'category_fresh-vegetables.json', subcategory: 'Fresh Vegetables' },
  { file: 'category_fresh-fruits.json', subcategory: 'Fresh Fruits' },
  { file: 'category_exotics.json', subcategory: 'Exotics' },
  { file: 'category_leafs_herbs.json', subcategory: 'Leafs & Herbs' },
  { file: 'category_seasonal.json', subcategory: 'Seasonal' },
];

function sanitizeFilename(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 60);
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return resolve(true);
    }

    // Attempt to get high-res by upgrading Grofers CDN width parameter to 1000
    const highResUrl = url.replace(/w=\d+/, 'w=1000').replace(/q=\d+/, 'q=90');

    const client = highResUrl.startsWith('https') ? https : http;
    const req = client.get(highResUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(destPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });
      } else {
        // Fallback to original URL if high-res failed
        client.get(url, (res2) => {
          if (res2.statusCode === 200) {
            const fileStream2 = fs.createWriteStream(destPath);
            res2.pipe(fileStream2);
            fileStream2.on('finish', () => {
              fileStream2.close();
              resolve(true);
            });
          } else {
            console.error(`Failed to download ${url}: ${res2.statusCode}`);
            resolve(false);
          }
        }).on('error', () => resolve(false));
      }
    });

    req.on('error', (err) => {
      console.error(`Error downloading image: ${err.message}`);
      resolve(false);
    });
  });
}

async function runConsolidation() {
  console.log('========================================================');
  console.log('🚀 VRK MART - 5-CATEGORY CONSOLIDATOR & IMAGE DOWNLOADER');
  console.log('========================================================\n');

  const allItems = [];
  const excelRows = [];
  const downloadTasks = [];
  const seenUrls = new Map();

  let skuCounter = 1001;

  for (const cat of CATEGORY_FILES) {
    const filePath = path.join(SOURCE_DIR, cat.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: ${filePath} not found, skipping.`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`📁 Processing ${cat.file}: ${data.length} products (Category: "${cat.subcategory}")`);

    for (const item of data) {
      const name = item.name || '';
      const unit = item.unit || '1 Unit';
      const mrp = parseFloat(item.mrp || 0) || 0;
      const imageUrl = item.image || '';

      // Extract Clean Title & Kannada/Regional name in brackets if present
      const bracketMatch = name.match(/\((.*?)\)/);
      const regionalName = bracketMatch ? bracketMatch[1] : '';
      const cleanTitle = name.replace(/\(.*?\)/g, '').trim();

      // Determine local image file path
      let localImageName = '';
      if (imageUrl) {
        if (!seenUrls.has(imageUrl)) {
          const ext = imageUrl.includes('.png') ? '.png' : (imageUrl.includes('.webp') ? '.webp' : '.jpg');
          const filename = `${sanitizeFilename(cleanTitle)}_${skuCounter}${ext}`;
          const destPath = path.join(IMAGES_DIR, filename);
          seenUrls.set(imageUrl, filename);
          downloadTasks.push({ url: imageUrl, destPath, name: cleanTitle });
        }
        localImageName = seenUrls.get(imageUrl);
      }

      const row = {
        'SKU ID': `VRK-${skuCounter++}`,
        'Category': cat.subcategory,
        'Main Category': 'Fruits & Vegetables',
        'Main Category Slug': 'fruits-veg',
        'Subcategory': cat.subcategory,
        'Product Full Name': name,
        'Product English Title': cleanTitle,
        'Regional / Local Name': regionalName,
        'Pack Size / Weight': unit,
        'MRP / Today Rate (₹)': mrp,
        'Local Image File': localImageName ? `images/${localImageName}` : '',
        'Source Image URL': imageUrl,
        'Stock Status': 'In Stock',
        'Source Category File': cat.file
      };

      excelRows.push(row);
      allItems.push(item);
    }
  }

  console.log(`\n📊 Total Consolidated Rows: ${excelRows.length}`);
  console.log(`🖼️ Total Unique Images to Download: ${downloadTasks.length}`);

  // Create Excel Workbook
  console.log('\n📝 Generating Consolidated Excel Sheet...');
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelRows);

  ws['!cols'] = [
    { wch: 12 }, // SKU ID
    { wch: 18 }, // Category
    { wch: 20 }, // Main Category
    { wch: 18 }, // Main Category Slug
    { wch: 20 }, // Subcategory
    { wch: 38 }, // Full Name
    { wch: 26 }, // English Title
    { wch: 24 }, // Regional Name
    { wch: 18 }, // Pack Size
    { wch: 20 }, // MRP
    { wch: 35 }, // Local Image File
    { wch: 45 }, // Source Image URL
    { wch: 14 }, // Stock Status
    { wch: 28 }  // Source File
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'All_Consolidated_Products');

  // Also create category-specific individual tabs for quick filtering!
  for (const cat of CATEGORY_FILES) {
    const categoryRows = excelRows.filter(r => r['Subcategory'] === cat.subcategory);
    if (categoryRows.length > 0) {
      const catWs = XLSX.utils.json_to_sheet(categoryRows);
      catWs['!cols'] = ws['!cols'];
      XLSX.utils.book_append_sheet(wb, catWs, cat.subcategory.replace(/[^a-zA-Z0-9 ]/g, ''));
    }
  }

  const excelFilePath = path.join(OUTPUT_DIR, 'VRK_Mart_Master_Catalog.xlsx');
  XLSX.writeFile(wb, excelFilePath);
  console.log(`✅ Excel saved to: ${excelFilePath}`);

  // Save Master JSON as well
  const jsonFilePath = path.join(OUTPUT_DIR, 'master_products.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(excelRows, null, 2));
  console.log(`✅ Master JSON saved to: ${jsonFilePath}`);

  // Bulk Image Download with Batch Concurrency
  console.log('\n⬇️ Starting Bulk Image Downloads (High-Res 1000px)...');
  const CONCURRENCY = 10;
  let downloadedCount = 0;

  for (let i = 0; i < downloadTasks.length; i += CONCURRENCY) {
    const batch = downloadTasks.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (task) => {
      const ok = await downloadImage(task.url, task.destPath);
      if (ok) downloadedCount++;
    }));
    process.stdout.write(`\rProgress: ${downloadedCount}/${downloadTasks.length} images downloaded...`);
  }

  console.log(`\n\n🎉 ALL DONE!`);
  console.log(`📁 Consolidated Folder: ${OUTPUT_DIR}`);
  console.log(`📊 Excel Sheet: ${excelFilePath}`);
  console.log(`🖼️ Images Directory: ${IMAGES_DIR} (${downloadedCount} images downloaded)`);
}

runConsolidation().catch(err => {
  console.error('Fatal error:', err);
});
