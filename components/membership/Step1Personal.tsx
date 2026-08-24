'use client';

import React, { useRef, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, RefreshCw } from 'lucide-react';

const step1Schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  selfieDataUrl: z.string().min(1, 'Selfie is required')
});

type Step1Data = z.infer<typeof step1Schema>;

interface Step1Props {
  onNext: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
}

export default function Step1Personal({ onNext, defaultValues }: Step1Props) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selfieDataUrl = watch('selfieDataUrl');

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOpen(true);
      }
    } catch (err) {
      console.error("Error accessing camera", err);
      alert("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraOpen(false);
    }
  };

  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Compress to webp < 250kb approximation by using 0.7 quality
        const dataUrl = canvas.toDataURL('image/webp', 0.7);
        setValue('selfieDataUrl', dataUrl, { shouldValidate: true });
        stopCamera();
      }
    }
  };

  const retakeSelfie = () => {
    setValue('selfieDataUrl', '', { shouldValidate: true });
    startCamera();
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name *</label>
        <input 
          type="text" 
          {...register('fullName')} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
        <input 
          type="date" 
          {...register('dob')} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
        />
        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
        <div className="flex gap-4">
          {['Male', 'Female', 'Other'].map(g => (
            <label key={g} className="inline-flex items-center">
              <input 
                type="radio" 
                value={g} 
                {...register('gender')} 
                className="text-[#1E3A8A] focus:ring-[#1E3A8A]"
              />
              <span className="ml-2 text-sm text-gray-700">{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email (Optional)</label>
        <input 
          type="email" 
          {...register('email')} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Selfie *</label>
        <input type="hidden" {...register('selfieDataUrl')} />
        
        {!selfieDataUrl && !isCameraOpen && (
          <button 
            type="button" 
            onClick={startCamera}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
          >
            <Camera className="w-4 h-4" /> Take Selfie
          </button>
        )}

        {isCameraOpen && (
          <div className="space-y-4">
            <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm rounded-lg shadow-md border" />
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={takeSelfie}
                className="bg-[#1E3A8A] text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors"
              >
                Capture
              </button>
              <button 
                type="button" 
                onClick={stopCamera}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {selfieDataUrl && (
          <div className="space-y-4">
            <img src={selfieDataUrl} alt="Selfie" className="w-full max-w-sm rounded-lg shadow-md border" />
            <button 
              type="button" 
              onClick={retakeSelfie}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Retake
            </button>
          </div>
        )}
        {errors.selfieDataUrl && <p className="text-red-500 text-xs mt-1">{errors.selfieDataUrl.message}</p>}
        
        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          type="submit" 
          className="bg-[#1E3A8A] text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  );
}
