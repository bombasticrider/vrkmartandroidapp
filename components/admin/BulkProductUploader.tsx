'use client';
import React, { useState } from 'react';
import * as xlsx from 'xlsx';
import { Upload, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface ParsedProduct {
  id?: string;
  name: string;
  brand: string;
  category: string;
  category_slug: string;
  subcategory?: string;
  pack_size: string;
  price: number;
  mrp?: number;
  image_url?: string;
  status?: string;
}

export function BulkProductUploader() {
  const [products, setProducts] = useState<ParsedProduct[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setUploadSuccess(false);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = xlsx.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawRows = xlsx.utils.sheet_to_json<any>(ws);

        // Normalize column mappings from any standard sheet or VRK Master Catalog
        const normalized: ParsedProduct[] = rawRows.map((r: any, idx: number) => {
          const name =
            r['Product Full Name'] ||
            r['Product English Title'] ||
            r['Product Name'] ||
            r['name'] ||
            r['Title'] ||
            `Product ${idx + 1}`;

          const brand = r['Brand'] || r['brand'] || 'Fresh Produce';
          
          const category =
            r['Category'] ||
            r['Subcategory'] ||
            r['category'] ||
            r['Main Category'] ||
            'Fruits & Vegetables';

          const category_slug =
            r['Main Category Slug'] ||
            r['category_slug'] ||
            (category.toLowerCase().includes('fruit') || category.toLowerCase().includes('veg')
              ? 'fruits-veg'
              : 'grocery');

          const subcategory = r['Subcategory'] || r['Category'] || category;

          const pack_size =
            r['Pack Size / Weight'] ||
            r['Pack Size / Variant'] ||
            r['pack_size'] ||
            r['pack_size_1'] ||
            r['unit'] ||
            '1 Unit';

          const rawPrice =
            r['MRP / Today Rate (₹)'] ||
            r['Price'] ||
            r['price'] ||
            r['price_1'] ||
            r['mrp'] ||
            0;
          const price = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice).replace(/[^0-9.]/g, '')) || 0;

          // Format image URL so it points to the local public folder
          let image_url = r['Local Image File'] || r['Source Image URL'] || r['image_url'] || r['image'] || '';
          if (image_url.startsWith('images/')) {
            image_url = `/images/products/fruits-veg/${image_url.replace('images/', '')}`;
          }

          return {
            id: r['SKU ID'] || `VRK-${idx + 1001}`,
            name,
            brand,
            category,
            category_slug,
            subcategory,
            pack_size,
            price,
            mrp: price,
            image_url,
            status: r['Stock Status'] || r['Status'] || 'Active',
          };
        });

        setProducts(normalized);
      } catch (err) {
        console.error('Error parsing sheet:', err);
        alert('Failed to parse file. Please upload a valid .xlsx or .csv file.');
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!products.length) return;
    setUploading(true);
    setProgress(20);

    try {
      const res = await fetch('/api/admin/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });

      setProgress(100);

      if (res.ok) {
        setUploadSuccess(true);
        alert(`✅ Successfully processed ${products.length} products!`);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading products');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-[#1E3A8A]" />
          Bulk Product Upload
        </h2>
        {fileName && (
          <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
            {fileName} ({products.length} items)
          </span>
        )}
      </div>

      <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-[#1E3A8A] transition-colors bg-gray-50/50">
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={handleFileUpload}
          id="product-file-input"
          className="hidden"
        />
        <label
          htmlFor="product-file-input"
          className="cursor-pointer flex flex-col items-center justify-center space-y-2"
        >
          <Upload className="w-8 h-8 text-[#1E3A8A]" />
          <span className="text-sm font-semibold text-gray-800">
            {fileName ? `File Selected: ${fileName}` : 'Choose Excel / CSV Sheet'}
          </span>
          <span className="text-xs text-gray-500">
            Supports .xlsx, .csv (Auto-maps VRK Master Catalog columns)
          </span>
        </label>
      </div>

      {products.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">
              Previewing {products.length} Products
            </h3>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
              ✓ All Columns Mapped
            </span>
          </div>

          <div className="overflow-x-auto max-h-72 border border-gray-200 rounded-xl shadow-inner">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead className="bg-gray-50 sticky top-0 font-bold text-gray-700">
                <tr>
                  <th className="px-4 py-2.5 text-left">SKU ID</th>
                  <th className="px-4 py-2.5 text-left">Product Name</th>
                  <th className="px-4 py-2.5 text-left">Category</th>
                  <th className="px-4 py-2.5 text-left">Pack Size</th>
                  <th className="px-4 py-2.5 text-right">Today Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {products.slice(0, 15).map((p, i) => (
                  <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-4 py-2 font-mono text-gray-500">{p.id}</td>
                    <td className="px-4 py-2 font-semibold text-gray-900">{p.name}</td>
                    <td className="px-4 py-2 text-gray-600">
                      <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-700">{p.pack_size}</td>
                    <td className="px-4 py-2 text-right font-bold text-emerald-700">
                      ₹{p.price}
                    </td>
                  </tr>
                ))}
                {products.length > 15 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-2 text-center text-gray-500 italic bg-gray-50">
                      + {products.length - 15} more products loaded
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#10B981] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {uploadSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {products.length} Products Processed Successfully!
            </div>
          ) : (
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-98 text-white px-5 py-3 rounded-xl font-bold text-sm shadow transition-all flex justify-center items-center cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4 mr-2" /> Uploading {products.length} Products...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" /> Publish {products.length} Products
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
