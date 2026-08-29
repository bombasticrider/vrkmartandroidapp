const fs = require('fs');
const path = require('path');

const srcDir = 'D:/Downloads/VRK_Mart_Consolidated_Catalog/images';
const destDir = path.join(__dirname, '../public/images/products/fruits-veg');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.webp'));
console.log(`Copying ${files.length} .webp images to ${destDir}...`);

let copied = 0;
for (const file of files) {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  copied++;
}

console.log(`✅ Successfully copied ${copied} product images to public/images/products/fruits-veg!`);
