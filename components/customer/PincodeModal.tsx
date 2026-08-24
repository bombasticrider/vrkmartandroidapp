"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useLocationStore } from "@/store/useLocationStore";

export default function PincodeModal() {
  const { hasPincodeSet, setPincode } = useLocationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "warning">("idle");

  useEffect(() => {
    if (!hasPincodeSet) {
      setIsOpen(true);
    }
  }, [hasPincodeSet]);

  if (!isOpen) return null;

  const handleCheck = () => {
    if (inputValue.length !== 6) return;
    
    if (inputValue.startsWith("560")) {
      setStatus("success");
      setTimeout(() => {
        setPincode(inputValue);
        setIsOpen(false);
      }, 1500);
    } else {
      setStatus("warning");
    }
  };

  const handleContinueBrowsing = () => {
    setPincode(inputValue);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl flex flex-col items-center text-center">
        <div className="w-24 h-16 relative mb-4">
          <Image
            src="/icons/logo-blue.png"
            alt="VRK Mart Logo"
            fill
            className="object-contain"
          />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Delivery Pincode</h2>
        <p className="text-gray-500 mb-6 text-sm">We currently serve the Bengaluru metropolitan area</p>

        {status === "idle" && (
          <div className="w-full flex flex-col gap-4">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 560001"
              className="w-full text-center text-2xl tracking-widest font-bold py-3 border-2 border-gray-200 rounded-xl focus:border-[#1E3A8A] focus:outline-none transition-colors"
            />
            <button
              onClick={handleCheck}
              disabled={inputValue.length !== 6}
              className="w-full bg-[#1E3A8A] text-white py-3.5 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Check Serviceability
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="w-full flex flex-col items-center transition-all duration-300">
            <CheckCircle2 className="w-16 h-16 text-[#10B981] mb-4" />
            <p className="text-lg font-semibold text-[#10B981]">Bengaluru — We deliver here! 🎉</p>
          </div>
        )}

        {status === "warning" && (
          <div className="w-full flex flex-col items-center transition-all duration-300">
            <AlertTriangle className="w-16 h-16 text-[#F59E0B] mb-4" />
            <p className="text-lg font-semibold text-[#F59E0B] mb-2">View-Only Mode</p>
            <p className="text-gray-600 mb-6 text-sm">Not in our delivery zone yet</p>
            <button
              onClick={handleContinueBrowsing}
              className="w-full bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] py-3.5 rounded-xl font-semibold text-lg transition-colors"
            >
              Continue Browsing
            </button>
            <button
              onClick={() => {
                setStatus("idle");
                setInputValue("");
              }}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Try another pincode
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
