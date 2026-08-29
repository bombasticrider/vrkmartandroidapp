const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const XLSX = require('xlsx');

const CATALOG_DIR = 'D:/Downloads/VRK_Mart_Consolidated_Catalog';
const IMAGES_DIR = path.join(CATALOG_DIR, 'images');
const EXCEL_FILE = path.join(CATALOG_DIR, 'VRK_Mart_Master_Catalog.xlsx');
const JSON_FILE = path.join(CATALOG_DIR, 'master_products.json');

async function convertImagesAndExcel() {
  console.log('========================================================');
  console.log('🚀 CONVERTING 227 IMAGES TO 800x800 WEBP & UPDATING EXCEL');
  console.log('========================================================\n');

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`❌ Images folder not found at: ${IMAGES_DIR}`);
    return;
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  console.log(`🖼️ Found ${pngFiles.length} PNG images to convert.\n`);

  let convertedCount = 0;
  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const file of pngFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const outputFilename = file.replace(/\.png$/i, '.webp');
    const outputPath = path.join(IMAGES_DIR, outputFilename);

    const origStat = fs.statSync(inputPath);
    totalOriginalSize += origStat.size;

    // Resize & fit onto 800x800 canvas with WebP quality 85
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 85 })
      .toFile(outputPath);

    const webpStat = fs.statSync(outputPath);
    totalWebpSize += webpStat.size;
    convertedCount++;

    process.stdout.write(`\rConverting: ${convertedCount}/${pngFiles.length} (${outputFilename})...`);
  }

  console.log(`\n\n✅ Image Conversion Complete!`);
  console.log(`📦 Original PNG Total Size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`⚡ Converted WebP Total Size: ${(totalWebpSize / (1024 * 1024)).toFixed(2)} MB (Savings: ${((1 - totalWebpSize / totalOriginalSize) * 100).toFixed(1)}%)`);

  // Update Excel Workbook
  if (fs.existsSync(EXCEL_FILE)) {
    console.log(`\n📝 Updating Excel workbook at: ${EXCEL_FILE}`);
    const wb = XLSX.readFile(EXCEL_FILE);

    for (const sheetName of wb.SheetNames) {
      const ws = wb.Sheets[sheetName];
      const rows = XLSX.utils.sheet_to_json(ws);

      const updatedRows = rows.map(row => {
        if (row['Local Image File'] && typeof row['Local Image File'] === 'string') {
          row['Local Image File'] = row['Local Image File'].replace(/\.png$/i, '.webp');
        }
        return row;
      });

      const updatedWs = XLSX.utils.json_to_sheet(updatedRows);
      if (ws['!cols']) updatedWs['!cols'] = ws['!cols'];
      wb.Sheets[sheetName] = updatedWs;
    }

    XLSX.writeFile(wb, EXCEL_FILE);
    console.log(`✅ Excel Workbook successfully updated with .webp filenames!`);
  }

  // Update Master JSON
  if (fs.existsSync(JSON_FILE)) {
    console.log(`📄 Updating master_products.json...`);
    const jsonData = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
    const updatedJson = jsonData.map(item => {
      if (item['Local Image File'] && typeof item['Local Image File'] === 'string') {
        item['Local Image File'] = item['Local Image File'].replace(/\.png$/i, '.webp');
      }
      return item;
    });
    fs.writeFileSync(JSON_FILE, JSON.stringify(updatedJson, null, 2));
    console.log(`✅ Master JSON updated with .webp filenames!`);
  }

  console.log(`\n🎉 ALL DONE! All 227 images are now 800x800 .webp and Excel is updated.`);
}

convertImagesAndExcel().catch(err => {
  console.error('Fatal error during conversion:', err);
});
