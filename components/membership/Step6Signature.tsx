'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

interface Step6Props {
  onSubmit: (signatureBlob: Blob) => void;
  onBack: () => void;
  defaultValues?: Record<string, unknown>;
}

export default function Step6Signature({ onSubmit, onBack }: Step6Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const organizerCode = 'VRK-ORG-101';

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
  }, []);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    setError('');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    setError('');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(organizerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitClick = () => {
    if (!agreed) {
      setError('You must agree to the lifetime membership terms and conditions.');
      return;
    }
    if (!hasDrawn) {
      setError('Please draw your digital signature in the box above.');
      return;
    }
    setError('');

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) {
        onSubmit(blob);
      }
    }, 'image/png');
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Organizer Code Section */}
      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Organizer Referral Code
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={organizerCode}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-[#1E3A8A] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-xs font-semibold shrink-0 shadow-sm transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-gray-500" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Digital Signature Pad */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Draw Your Digital Signature <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={clearSignature}
            className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Clear
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white touch-none">
          <canvas
            ref={canvasRef}
            width={500}
            height={160}
            className="w-full h-[160px] bg-white cursor-crosshair block"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        <p className="text-[11px] text-gray-400 mt-1 text-center">
          Sign inside the box using your finger or mouse
        </p>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1E3A8A] focus:ring-[#1E3A8A]"
          />
          <span className="text-xs text-gray-600 leading-relaxed">
            I hereby declare that the details provided are true and correct. I agree to the{' '}
            <strong className="text-gray-900">VRK Mart Lifetime Membership Terms & Conditions</strong> and understand that the ₹1,000 fee is a one-time lifetime enrollment.
          </span>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs font-semibold border border-red-200">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm transition-colors cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmitClick}
          className="flex-1 bg-[#10B981] hover:bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Proceed to Pay ₹1,000
        </button>
      </div>
    </div>
  );
}
