'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  MapPin,
  Crosshair,
  CheckCircle2,
  AlertTriangle,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLocationStore } from '@/store/useLocationStore';
import { isBengaluruPincode } from '@/lib/utils';
import { getPincodeFromCoordinates } from '@/lib/location';

export default function PincodeModal() {
  const {
    hasPincodeSet,
    pincode: savedPincode,
    areaName: savedArea,
    setLocation,
    isModalOpen,
    closeModal,
  } = useLocationStore();

  const [mounted, setMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [detectingGps, setDetectingGps] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'warning'>('idle');
  const [detectedArea, setDetectedArea] = useState('');
  const [detectedPin, setDetectedPin] = useState('');
  const [gpsError, setGpsError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if modal should show
  const showModal = mounted && (!hasPincodeSet || isModalOpen);

  if (!showModal) return null;

  // 1-Tap GPS Auto-Detection (Swiggy / Blinkit style)
  const handleDetectLocation = () => {
    setGpsError('');
    setDetectingGps(true);

    if (!('geolocation' in navigator)) {
      setGpsError('Geolocation is not supported by your browser.');
      setDetectingGps(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const locationData = await getPincodeFromCoordinates(lat, lng);

          if (locationData && locationData.pincode) {
            const isBglr = isBengaluruPincode(locationData.pincode);
            setDetectedPin(locationData.pincode);
            setDetectedArea(locationData.areaName);

            if (isBglr) {
              setStatus('success');
              setTimeout(() => {
                setLocation(locationData.pincode, locationData.areaName);
                setStatus('idle');
              }, 1400);
            } else {
              setStatus('warning');
            }
          } else {
            setGpsError('Could not determine pincode. Please enter 6 digits below.');
          }
        } catch (err) {
          console.error('GPS parsing error:', err);
          setGpsError('Location service busy. Please type your pincode.');
        } finally {
          setDetectingGps(false);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsError('Location permission denied. Please enter your 6-digit pincode.');
        } else {
          setGpsError('GPS signal unavailable. Please enter your 6-digit pincode.');
        }
        setDetectingGps(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  // Manual 6-digit pincode check
  const handleManualCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.length !== 6) return;

    const isBglr = isBengaluruPincode(inputValue);
    setDetectedPin(inputValue);
    setDetectedArea(isBglr ? 'Bengaluru' : 'Outside Bengaluru');

    if (isBglr) {
      setStatus('success');
      setTimeout(() => {
        setLocation(inputValue, 'Bengaluru Area');
        setStatus('idle');
      }, 1200);
    } else {
      setStatus('warning');
    }
  };

  const handleContinueBrowsing = () => {
    setLocation(detectedPin || inputValue || '000000', 'Outside Bengaluru');
    setStatus('idle');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative border border-gray-100 flex flex-col items-center text-center">
        {/* Dismiss Button (if pincode is already set) */}
        {hasPincodeSet && (
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Logo */}
        <div className="w-28 h-10 relative mb-4">
          <Image
            src="/icons/header-logo.png"
            alt="VRK Mart Logo"
            fill
            className="object-contain"
          />
        </div>

        {/* IDLE STATE */}
        {status === 'idle' && (
          <div className="w-full space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E3A8A]">
                Select Delivery Location
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">
                We deliver across <strong>Bengaluru Urban &amp; Rural</strong> (All 560xxx &amp; 562xxx pincodes)
              </p>
            </div>

            {/* 1-Tap Auto-Detect GPS Button */}
            <button
              onClick={handleDetectLocation}
              disabled={detectingGps}
              className="w-full bg-gradient-to-r from-[#10B981] to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 active:scale-98 text-white py-4 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
            >
              {detectingGps ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Detecting GPS Location...</span>
                </>
              ) : (
                <>
                  <Crosshair className="w-5 h-5" />
                  <span>Use My Current Location</span>
                </>
              )}
            </button>

            {gpsError && (
              <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 font-medium text-left">
                ⚠️ {gpsError}
              </p>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Or enter pincode
              </span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* Manual Form */}
            <form onSubmit={handleManualCheck} className="space-y-3">
              <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#1E3A8A] transition-colors">
                <span className="bg-gray-50 px-4 py-3.5 text-gray-500 font-bold text-sm border-r border-gray-200">
                  📍 PIN
                </span>
                <input
                  type="tel"
                  maxLength={6}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 560034 or 562114"
                  className="w-full px-4 py-3.5 text-base font-bold tracking-widest text-gray-900 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={inputValue.length !== 6}
                className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-98 text-white py-3.5 rounded-2xl font-bold text-sm shadow transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Check Serviceability
              </button>
            </form>
          </div>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
          <div className="w-full flex flex-col items-center py-4 space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-emerald-600">
                We Deliver to Your Area! 🎉
              </h3>
              <p className="text-xs font-bold text-gray-700 mt-1">
                📍 {detectedArea} ({detectedPin})
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Free delivery on orders above ₹500 across Bengaluru
              </p>
            </div>
          </div>
        )}

        {/* WARNING STATE (Outside Bengaluru) */}
        {status === 'warning' && (
          <div className="w-full flex flex-col items-center py-2 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-gray-900">
                View-Only Browsing Mode
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Pincode <strong>{detectedPin}</strong> is outside our current Bengaluru delivery zone (560xxx &amp; 562xxx).
              </p>
              <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-2 font-medium">
                You can browse products and benefits, but checkout will be disabled.
              </p>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={handleContinueBrowsing}
                className="w-full bg-[#1E3A8A] text-white py-3 rounded-2xl font-bold text-sm shadow hover:bg-blue-900 transition-all cursor-pointer"
              >
                Continue Browsing Products
              </button>
              <button
                onClick={() => {
                  setStatus('idle');
                  setInputValue('');
                }}
                className="text-xs text-gray-500 font-semibold hover:underline cursor-pointer"
              >
                Change or enter another pincode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
