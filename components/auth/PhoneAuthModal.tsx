'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { ShieldCheck, X, ArrowRight, RotateCcw } from 'lucide-react';

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    recaptchaWidgetId?: any;
    confirmationResult?: ConfirmationResult;
  }
}

interface PhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PhoneAuthModal({
  isOpen,
  onClose,
  onSuccess,
}: PhoneAuthModalProps) {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'PHONE' | 'OTP'>('PHONE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setAuth } = useAuthStore();

  // Resend countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const getOrCreateRecaptcha = async (): Promise<RecaptchaVerifier> => {
    if (typeof window === 'undefined') {
      throw new Error('Window is undefined');
    }

    if (window.recaptchaVerifier) {
      try {
        await window.recaptchaVerifier.render();
        return window.recaptchaVerifier;
      } catch (_) {
        try {
          window.recaptchaVerifier.clear();
        } catch (_) {}
        window.recaptchaVerifier = undefined;
      }
    }

    const verifier = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
      'expired-callback': () => {
        setError('reCAPTCHA expired. Please try again.');
      },
    });

    await verifier.render();
    window.recaptchaVerifier = verifier;
    return verifier;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);

    try {
      const verifier = await getOrCreateRecaptcha();
      const formattedPhone = `+91${cleanMobile}`;

      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        formattedPhone,
        verifier
      );

      window.confirmationResult = confirmation;
      setStep('OTP');
      setResendTimer(45);
    } catch (err: any) {
      console.error('Firebase SMS Error Details:', err);

      // Handle common Firebase phone auth errors with clear advice
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid mobile number format.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many SMS requests sent. Please wait a few minutes.');
      } else if (err.code === 'auth/captcha-check-failed' || err.code === 'auth/internal-error') {
        setError(
          'SMS service verification issue. Please check that Phone Auth is enabled in Firebase Console.'
        );
      } else {
        setError(err.message || 'Failed to send SMS OTP.');
      }

      // Reset reCAPTCHA for next attempt
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (_) {}
        window.recaptchaVerifier = undefined;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the full 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      if (window.confirmationResult) {
        await window.confirmationResult.confirm(fullOtp);
      }

      const verifiedMobile = mobile.replace(/\D/g, '');

      // Fetch member profile from Supabase
      const checkRes = await fetch(`/api/auth/otp?mobile=${verifiedMobile}&otp=${fullOtp}`);
      const checkData = await checkRes.json();

      setAuth({
        mobile: verifiedMobile,
        isVerified: true,
        isMember: checkData.isMember || false,
        vrkId: checkData.memberData?.vrk_id || null,
        memberName: checkData.memberData?.full_name || 'Valued Customer',
        memberData: checkData.memberData || null,
      });

      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('OTP Verify Error:', err);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Incorrect OTP code. Please check your SMS and enter the 6 digits.');
      } else {
        setError(err.message || 'OTP verification failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-50 text-[#1E3A8A] rounded-2xl mb-3 shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1E3A8A]">
            {step === 'PHONE' ? 'Sign In to VRK Mart' : 'Verify Mobile OTP'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {step === 'PHONE'
              ? 'Enter your 10-digit mobile number to get an instant SMS OTP'
              : `Enter the 6-digit OTP code sent via SMS to +91 ${mobile}`}
          </p>
        </div>

        {/* Step 1: Phone Number */}
        {step === 'PHONE' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#1E3A8A] transition-colors">
                <span className="bg-gray-50 px-4 py-3.5 text-gray-600 font-bold text-sm border-r border-gray-200">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  autoFocus
                  placeholder="Enter 10-digit number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3.5 text-base font-semibold text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || mobile.length !== 10}
              className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Free SMS OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 text-center">
                Enter 6-Digit OTP
              </label>
              <div className="flex gap-2 justify-center">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-xl font-extrabold text-gray-900 border-2 border-gray-200 rounded-xl focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Verify & Log In'
              )}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
              <button
                type="button"
                onClick={() => setStep('PHONE')}
                className="text-[#1E3A8A] font-semibold hover:underline cursor-pointer"
              >
                Change Number
              </button>
              {resendTimer > 0 ? (
                <span>Resend in {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#1E3A8A] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Resend OTP
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
