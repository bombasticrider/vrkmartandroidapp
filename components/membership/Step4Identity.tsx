'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertTriangle } from 'lucide-react';

export interface Step4Data {
  docs: File[];
}

interface Step4Props {
  onNext: (data: Step4Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step4Data>;
}

const ALLOWED_TYPES = ['Masked Aadhaar', 'PAN Card', 'Voter ID', 'Driving Licence'];

export default function Step4Identity({ onNext, onBack, defaultValues }: Step4Props) {
  const [files, setFiles] = useState<{file: File, type: string, preview?: string}[]>([]);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedType, setSelectedType] = useState<string>(ALLOWED_TYPES[0]);

  const compressImage = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/')) return file;
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: 'image/webp' }));
            } else {
              resolve(file);
            }
          }, 'image/webp', 0.7);
        };
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (files.some(f => f.type === selectedType)) {
        setError(`You have already uploaded a ${selectedType}`);
        return;
      }
      
      if (files.length >= 2) {
        setError('You can only upload 2 documents.');
        return;
      }

      setError('');
      const compressedFile = await compressImage(file);
      
      let preview: string | undefined;
      if (compressedFile.type.startsWith('image/')) {
        preview = URL.createObjectURL(compressedFile);
      }

      setFiles(prev => [...prev, { file: compressedFile, type: selectedType, preview }]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      if (newFiles[index].preview) URL.revokeObjectURL(newFiles[index].preview!);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length !== 2) {
      setError('Please upload exactly 2 different document types.');
      return;
    }
    onNext({ docs: files.map(f => f.file) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 flex items-start">
        <AlertTriangle className="w-5 h-5 text-[#F59E0B] mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-yellow-800">
          <strong>Important Instructions:</strong>
          <ul className="list-disc ml-5 mt-1">
            <li>Please upload exactly <strong>2 different</strong> document types.</li>
            <li>If uploading Aadhaar, please <strong>mask/blur the middle 8 digits</strong> before uploading for security.</li>
            <li>Supported formats: JPG, PNG, PDF. Max size ~2MB.</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Document Type to Upload</label>
          <div className="flex gap-2 mb-4">
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
            >
              {ALLOWED_TYPES.map(type => (
                <option key={type} value={type} disabled={files.some(f => f.type === type)}>
                  {type}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={files.length >= 2 || files.some(f => f.type === selectedType)}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Upload className="w-4 h-4" /> Browse
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/jpeg,image/png,application/pdf" 
              className="hidden" 
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {files.map((fileObj, index) => (
            <div key={index} className="border rounded-lg p-3 relative flex flex-col items-center justify-center bg-gray-50 min-h-[150px]">
              <button 
                type="button" 
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-[#1E3A8A] mb-2 px-2 py-1 bg-blue-50 rounded-full">{fileObj.type}</span>
              {fileObj.preview ? (
                <img src={fileObj.preview} alt={fileObj.type} className="max-h-24 object-contain rounded" />
              ) : (
                <FileText className="w-12 h-12 text-gray-400" />
              )}
              <span className="text-xs text-gray-500 mt-2 truncate w-full text-center" title={fileObj.file.name}>
                {fileObj.file.name}
              </span>
            </div>
          ))}
          
          {Array.from({ length: Math.max(0, 2 - files.length) }).map((_, i) => (
            <div key={`empty-${i}`} className="border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center bg-gray-50 min-h-[150px] text-gray-400">
              <Upload className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-sm">Document {files.length + i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors">
          Back
        </button>
        <button type="submit" className="bg-[#1E3A8A] text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition-colors">
          Next
        </button>
      </div>
    </form>
  );
}
