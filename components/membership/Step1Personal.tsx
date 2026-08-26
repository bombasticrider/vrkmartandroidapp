'use client';

import React, { useRef, useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, RefreshCw, Upload, Sparkles, CheckCircle2 } from 'lucide-react';

const step1Schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  selfieDataUrl: z.string().min(1, 'Please take or upload a selfie for your membership card'),
});

type Step1Data = z.infer<typeof step1Schema>;

interface Step1Props {
  onNext: (data: Step1Data) => void;
  defaultValues?: Partial<Step1Data>;
}

export default function Step1Personal({ onNext, defaultValues }: Step1Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      gender: 'Male',
      ...defaultValues,
    },
  });

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selfieDataUrl = watch('selfieDataUrl');

  // Attach stream to video element when camera is opened
  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch((e) => console.warn('Video play error:', e));
    }
  }, [isCameraOpen, stream]);

  // Clean up media tracks on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    setCameraError('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser. Please use the Upload button.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 640 },
        },
      });

      setStream(mediaStream);
      setIsCameraOpen(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        'Could not access live camera. Please tap "Upload Photo" to select or take a photo with your device camera.'
      );
      // Automatically trigger native device camera file picker as fallback
      fileInputRef.current?.click();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
  };

  const takeSelfie = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/webp', 0.75);
        setValue('selfieDataUrl', dataUrl, { shouldValidate: true });
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/webp', 0.8);
          setValue('selfieDataUrl', compressedDataUrl, { shouldValidate: true });
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const retakeSelfie = () => {
    setValue('selfieDataUrl', '', { shouldValidate: true });
    stopCamera();
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div>
        <h2 className="text-xl font-black text-[#1E3A8A]">Step 1: Personal Details</h2>
        <p className="text-xs text-gray-500 mt-1">
          Enter your official details for the VRK Mart Lifetime Membership Agreement.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="As per Aadhaar / Official ID"
          {...register('fullName')}
          className="mt-1 block w-full rounded-2xl border-2 border-gray-200 focus:border-[#1E3A8A] text-sm p-3.5 outline-none font-semibold text-gray-900 transition-colors"
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          {...register('dob')}
          className="mt-1 block w-full rounded-2xl border-2 border-gray-200 focus:border-[#1E3A8A] text-sm p-3.5 outline-none font-semibold text-gray-900 transition-colors"
        />
        {errors.dob && <p className="text-red-500 text-xs mt-1 font-medium">{errors.dob.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['Male', 'Female', 'Other'].map((g) => (
            <label
              key={g}
              className="flex items-center justify-center p-3 rounded-2xl border-2 border-gray-200 cursor-pointer font-bold text-xs hover:border-[#1E3A8A] transition-colors has-[:checked]:border-[#1E3A8A] has-[:checked]:bg-blue-50/50 has-[:checked]:text-[#1E3A8A]"
            >
              <input type="radio" value={g} {...register('gender')} className="hidden" />
              <span>{g}</span>
            </label>
          ))}
        </div>
        {errors.gender && <p className="text-red-500 text-xs mt-1 font-medium">{errors.gender.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
          Email Address (Optional)
        </label>
        <input
          type="email"
          placeholder="For digital membership card copy"
          {...register('email')}
          className="mt-1 block w-full rounded-2xl border-2 border-gray-200 focus:border-[#1E3A8A] text-sm p-3.5 outline-none font-semibold text-gray-900 transition-colors"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
      </div>

      {/* Selfie / Member Photo Section */}
      <div className="pt-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Member Photo / Selfie <span className="text-red-500">*</span>
        </label>
        <input type="hidden" {...register('selfieDataUrl')} />

        {/* Hidden file input for native camera / gallery upload */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="user"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Initial State: Choose Camera or Upload */}
        {!selfieDataUrl && !isCameraOpen && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={startCamera}
                className="flex flex-col items-center justify-center gap-2 p-5 bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] rounded-2xl border-2 border-dashed border-blue-200 transition-all font-bold text-xs active:scale-95 cursor-pointer"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Camera className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                <span>Take Live Selfie</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 p-5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl border-2 border-dashed border-gray-200 transition-all font-bold text-xs active:scale-95 cursor-pointer"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Upload className="w-5 h-5 text-gray-600" />
                </div>
                <span>Upload Photo</span>
              </button>
            </div>

            {cameraError && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-medium">
                {cameraError}
              </div>
            )}
          </div>
        )}

        {/* Live Camera View */}
        {isCameraOpen && (
          <div className="space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-square max-w-xs mx-auto shadow-md border-2 border-[#1E3A8A]">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={takeSelfie}
                className="bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-4 h-4" /> Capture Photo
              </button>
              <button
                type="button"
                onClick={stopCamera}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-xs px-4 py-3 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Captured Selfie Preview */}
        {selfieDataUrl && (
          <div className="space-y-3">
            <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md">
              <img src={selfieDataUrl} alt="Captured Selfie" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={retakeSelfie}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Photo
              </button>
            </div>
          </div>
        )}

        {errors.selfieDataUrl && (
          <p className="text-red-500 text-xs mt-2 font-semibold">{errors.selfieDataUrl.message}</p>
        )}

        {/* Hidden canvas for image processing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Next: Address Details</span>
          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
        </button>
      </div>
    </form>
  );
}
