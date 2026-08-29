const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const CATALOG_DIR = 'D:/Downloads/VRK_Mart_Consolidated_Catalog';
const EXCEL_FILE = path.join(CATALOG_DIR, 'VRK_Mart_Master_Catalog.xlsx');
const EXCEL_FILE_V2 = path.join(CATALOG_DIR, 'VRK_Mart_Master_Catalog_WebP.xlsx');
const JSON_FILE = path.join(CATALOG_DIR, 'master_products.json');

function updateExcel() {
  console.log(`📝 Reading Excel file: ${EXCEL_FILE}`);
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

  // Save to WebP version
  XLSX.writeFile(wb, EXCEL_FILE_V2);
  console.log(`✅ Saved updated workbook to: ${EXCEL_FILE_V2}`);

  // Also attempt overwriting original if unlocked
  try {
    XLSX.writeFile(wb, EXCEL_FILE);
    console.log(`✅ Overwritten original workbook: ${EXCEL_FILE}`);
  } catch (err) {
    console.log(`ℹ️ Original Excel file is currently open in Excel, saved as ${EXCEL_FILE_V2}`);
  }

  // Update Master JSON
  if (fs.existsSync(JSON_FILE)) {
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
}

updateExcel();
