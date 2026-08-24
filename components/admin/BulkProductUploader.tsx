'use client';
import React, { useState } from 'react';
import * as xlsx from 'xlsx';
import { Upload, FileSpreadsheet, Loader2 } from 'lucide-react';

interface ParsedProduct {
  name: string;
  description: string;
  brand: string;
  category_slug: string;
  pack_size_1: string;
  price_1: number;
  mrp_1: number;
  pack_size_2?: string;
  price_2?: number;
  mrp_2?: number;
  image_url?: string;
}

export function BulkProductUploader() {
  const [products, setProducts] = useState<ParsedProduct[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = xlsx.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = xlsx.utils.sheet_to_json<ParsedProduct>(ws);
      setProducts(data);
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!products.length) return;
    setUploading(true);
    setProgress(10);

    try {
      const res = await fetch('/api/admin/products/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });
      
      setProgress(100);
      
      if (res.ok) {
        alert('Products uploaded successfully!');
        setProducts([]);
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading products');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <FileSpreadsheet className="mr-2" /> Bulk Product Upload
      </h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          accept=".xlsx, .xls, .csv" 
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {products.length > 0 && (
        <div className="space-y-4">
          <div className="overflow-x-auto max-h-64 border rounded">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Brand</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Price 1</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.slice(0, 10).map((p, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.brand}</td>
                    <td className="px-4 py-2">{p.category_slug}</td>
                    <td className="px-4 py-2">₹{p.price_1}</td>
                  </tr>
                ))}
                {products.length > 10 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-center text-gray-500 italic">
                      + {products.length - 10} more products
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full bg-[#1E3A8A] text-white px-4 py-2 rounded font-medium hover:bg-blue-900 disabled:opacity-50 flex justify-center items-center"
          >
            {uploading ? (
              <><Loader2 className="animate-spin w-4 h-4 mr-2" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4 mr-2" /> Upload {products.length} Products</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
