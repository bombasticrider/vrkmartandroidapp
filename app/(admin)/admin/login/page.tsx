'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Lock, Mail, Phone, AlertCircle, Loader2, KeyRound, ShieldCheck } from 'lucide-react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';

declare global {
  interface Window {
    adminRecaptchaVerifier?: RecaptchaVerifier;
    adminConfirmationResult?: ConfirmationResult;
  }
}

export default function AdminLoginPage() {
  const [loginMethod, setLoginMethod] = useState<'OTP' | 'PASSWORD'>('OTP');

  // Mobile OTP State (Firebase)
  const [mobile, setMobile] = useState('8008445388');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Email/Password State
  const [email, setEmail] = useState('admin@vrkmart.in');
  const [password, setPassword] = useState('admin123');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Setup invisible reCAPTCHA on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        if (!window.adminRecaptchaVerifier) {
          window.adminRecaptchaVerifier = new RecaptchaVerifier(firebaseAuth, 'admin-recaptcha-container', {
            size: 'invisible',
            callback: () => {
              console.log('Admin Firebase reCAPTCHA verified');
            },
          });
        }
      } catch (err) {
        console.error('Firebase Recaptcha init error:', err);
      }
    }

    return () => {
      if (window.adminRecaptchaVerifier) {
        try {
          window.adminRecaptchaVerifier.clear();
        } catch (_) {}
        window.adminRecaptchaVerifier = undefined;
      }
    };
  }, []);

  const handleSendFirebaseOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = mobile.replace(/\D/g, '').trim();
    if (clean.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!window.adminRecaptchaVerifier) {
        window.adminRecaptchaVerifier = new RecaptchaVerifier(firebaseAuth, 'admin-recaptcha-container', {
          size: 'invisible',
        });
      }

      const formattedPhone = `+91${clean}`;
      const confirmation = await signInWithPhoneNumber(
        firebaseAuth,
        formattedPhone,
        window.adminRecaptchaVerifier
      );

      window.adminConfirmationResult = confirmation;
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (err: any) {
      console.error('Firebase SMS dispatch error:', err);
      setError(err.message || 'Failed to dispatch Firebase OTP SMS. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyFirebaseOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const confirmObj = confirmationResult || window.adminConfirmationResult;
      if (!confirmObj) {
        throw new Error('OTP session expired. Please request a new OTP.');
      }

      // 1. Confirm code with Firebase Auth
      await confirmObj.confirm(otp);

      // 2. Authorize staff role with backend session
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = data.redirectUrl || '/admin/dashboard';
      } else {
        setError(data.message || 'Unauthorized staff access.');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP code. Please check and re-enter.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.location.href = data.redirectUrl || '/admin/dashboard';
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      {/* Invisible reCAPTCHA container for Firebase Phone Auth */}
      <div id="admin-recaptcha-container"></div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        {/* Brand Logo & Heading */}
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="w-36 h-12 relative mb-2">
            <Image
              src="/icons/header-logo.png"
              alt="VRK Mart"
              fill
              priority
              className="object-contain"
            />
          </div>
          <h1 className="text-xl font-extrabold text-[#1E3A8A]">Staff &amp; Admin Portal</h1>
          <p className="text-gray-500 text-xs mt-0.5">Powered by Google Firebase Phone Auth</p>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setLoginMethod('OTP');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              loginMethod === 'OTP'
                ? 'bg-white text-[#1E3A8A] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            📱 Firebase OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMethod('PASSWORD');
              setError('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              loginMethod === 'PASSWORD'
                ? 'bg-white text-[#1E3A8A] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            🔑 Master Password
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl mb-5 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* ── METHOD 1: FIREBASE MOBILE OTP LOGIN ── */}
        {loginMethod === 'OTP' && (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendFirebaseOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Authorized Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="8008445388"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none text-sm transition-all font-semibold"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Super Admin: <span className="font-bold text-gray-600">8008445388</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-98 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Send Firebase SMS OTP</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyFirebaseOtp} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-gray-700">Enter 6-Digit SMS OTP</label>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-[#1E3A8A] font-bold hover:underline"
                    >
                      Change Number
                    </button>
                  </div>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none text-base tracking-widest text-center font-black transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#10B981] hover:bg-emerald-600 active:scale-98 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify &amp; Enter Portal</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        {/* ── METHOD 2: MASTER PASSWORD LOGIN ── */}
        {loginMethod === 'PASSWORD' && (
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vrkmart.in"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:border-transparent outline-none text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-98 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Sign In as Admin</span>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
