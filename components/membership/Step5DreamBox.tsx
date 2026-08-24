'use client';

import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';

export interface Step5Data {
  dreamSelection: 'personal' | 'none';
  dreamText?: string;
}

interface Step5Props {
  onNext: (data: Step5Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step5Data>;
}

export default function Step5DreamBox({ onNext, onBack, defaultValues }: Step5Props) {
  const [selection, setSelection] = useState<'personal' | 'none'>(defaultValues?.dreamSelection || 'personal');
  const [dreamText, setDreamText] = useState(defaultValues?.dreamText || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selection === 'personal' && !dreamText.trim()) {
      setError('Please share your dream or select "No Dream".');
      return;
    }
    if (selection === 'personal' && dreamText.length > 500) {
      setError('Dream description must be under 500 characters.');
      return;
    }
    setError('');
    onNext({ dreamSelection: selection, dreamText: selection === 'personal' ? dreamText : '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-[#1E3A8A] flex items-center justify-center gap-2">
          VRK Mart Dream Box <Star className="w-6 h-6 text-[#F59E0B] fill-current" />
        </h2>
        <p className="text-gray-600">Share your dream or aspiration with the VRK Mart community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Dream Card */}
        <div 
          className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 relative
            ${selection === 'personal' ? 'border-[#1E3A8A] bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
          onClick={() => setSelection('personal')}
        >
          {selection === 'personal' && (
            <div className="absolute top-4 right-4 text-[#1E3A8A]">
              <Sparkles className="w-5 h-5" />
            </div>
          )}
          <h3 className={`text-lg font-semibold mb-3 ${selection === 'personal' ? 'text-[#1E3A8A]' : 'text-gray-700'}`}>
            My Dream 🌟
          </h3>
          <p className="text-sm text-gray-500 mb-4">I want to share my aspiration with the community.</p>
          
          {selection === 'personal' && (
            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              <textarea
                value={dreamText}
                onChange={(e) => {
                  setDreamText(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Type your dream here... (max 500 characters)"
                className="w-full h-32 p-3 rounded-md border border-blue-200 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] resize-none text-sm"
                maxLength={500}
              />
              <div className="text-xs text-right text-gray-500 mt-1">
                {dreamText.length}/500
              </div>
            </div>
          )}
        </div>

        {/* No Dream Card */}
        <div 
          className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 flex flex-col items-center justify-center min-h-[200px]
            ${selection === 'none' ? 'border-[#1E3A8A] bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-300'}`}
          onClick={() => {
            setSelection('none');
            setError('');
          }}
        >
          <h3 className={`text-lg font-semibold mb-2 ${selection === 'none' ? 'text-[#1E3A8A]' : 'text-gray-700'}`}>
            No Dream
          </h3>
          <p className="text-sm text-gray-500 text-center">I prefer not to share at this time.</p>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}

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
