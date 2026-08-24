'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/membership/StepIndicator';
import Step1Personal from '@/components/membership/Step1Personal';
import Step2Address from '@/components/membership/Step2Address';
import Step3Nominees from '@/components/membership/Step3Nominees';
import Step4Identity from '@/components/membership/Step4Identity';
import Step5DreamBox from '@/components/membership/Step5DreamBox';
import Step6Signature from '@/components/membership/Step6Signature';
import PaymentModal from '@/components/membership/PaymentModal';
import { useAuthStore } from '@/store/useAuthStore';

const STEP_TITLES = [
  'Personal',
  'Address',
  'Nominees',
  'Identity Proofs',
  'Dream Box',
  'Signature & Pay',
];

export default function MembershipRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({
    organizerCode: 'VRK-ORG-101',
    dreamBox: 'No Dream',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [savedSignatureBlob, setSavedSignatureBlob] = useState<Blob | null>(null);

  const router = useRouter();
  const { setAuth } = useAuthStore();

  const handleStep1 = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2 = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3 = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
  };

  const handleStep4 = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(5);
  };

  const handleStep5 = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(6);
  };

  const handleStep6 = (signatureBlob: Blob) => {
    setSavedSignatureBlob(signatureBlob);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    setIsSubmitting(true);
    setShowPaymentModal(false);

    try {
      // Create member in live Supabase database
      const response = await fetch('/api/membership/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobile: formData.mobile || formData.phone || '9876543210',
          dateOfBirth: formData.dob,
          gender: formData.gender,
          email: formData.email,
          permanentAddress: formData.permanentAddress,
          temporaryAddress: formData.temporaryAddress,
          deliveryPincode: formData.deliveryPincode || '560001',
          nominees: formData.nominees || [],
          familyWelfare: formData.familyWelfare,
          identityProofs: formData.identityProofs || [],
          dreamBox: formData.dreamBox || 'No Dream',
          dreamDescription: formData.dreamDescription,
          organizerCode: formData.organizerCode || 'VRK-ORG-101',
          selfiePath: formData.selfieDataUrl ? 'uploaded' : null,
          signaturePath: savedSignatureBlob ? 'uploaded' : null,
          paymentReference: `PAY_UPI_${Date.now()}`,
        }),
      });

      const res = await response.json();

      if (res.success) {
        setAuth({
          isMember: true,
          isVerified: true,
          vrkId: res.vrkId,
          memberName: res.memberData?.full_name || formData.fullName,
          mobile: res.memberData?.mobile || formData.mobile,
          memberData: res.memberData,
        });

        router.push(`/membership/success?vrkId=${res.vrkId}`);
      } else {
        alert(res.error || 'Registration failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      alert('Failed to complete registration. Please check connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-24">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-[#1E3A8A]">
          Lifetime Membership Registration
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          7 Lifetime Welfare Benefits &bull; Bengaluru Metropolitan Service
        </p>
      </div>

      {/* Step Progress Bar */}
      <StepIndicator currentStep={currentStep} steps={STEP_TITLES} />

      {/* Dynamic Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">
        {currentStep === 1 && (
          <Step1Personal onNext={handleStep1} defaultValues={formData} />
        )}

        {currentStep === 2 && (
          <Step2Address
            onNext={handleStep2}
            onBack={() => setCurrentStep(1)}
            defaultValues={formData}
          />
        )}

        {currentStep === 3 && (
          <Step3Nominees
            onNext={handleStep3}
            onBack={() => setCurrentStep(2)}
            defaultValues={formData}
          />
        )}

        {currentStep === 4 && (
          <Step4Identity
            onNext={handleStep4}
            onBack={() => setCurrentStep(3)}
            defaultValues={formData}
          />
        )}

        {currentStep === 5 && (
          <Step5DreamBox
            onNext={handleStep5}
            onBack={() => setCurrentStep(4)}
            defaultValues={formData}
          />
        )}

        {currentStep === 6 && (
          <Step6Signature
            onSubmit={handleStep6}
            onBack={() => setCurrentStep(5)}
            defaultValues={formData}
          />
        )}
      </div>

      {/* PhonePe Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          merchantOrderId={`VRK-MEM-${Date.now()}`}
          onPaymentComplete={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {/* Submitting Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-[#F59E0B] rounded-full animate-spin mb-4" />
          <p className="font-bold text-base">Activating your Lifetime Membership...</p>
          <p className="text-xs text-gray-300 mt-1">Generating your official VRK ID</p>
        </div>
      )}
    </div>
  );
}
