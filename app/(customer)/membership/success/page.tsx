'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { ShieldCheck, Download, ShoppingBag, Star, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';

function SuccessContent() {
  const searchParams = useSearchParams();
  const paramVrkId = searchParams.get('vrkId');
  const { vrkId: storeVrkId, memberName, mobile, memberData } = useAuthStore();

  const activeVrkId = paramVrkId || storeVrkId || 'VRK-00000002';
  const activeName = memberName || (memberData as any)?.full_name || 'Valued Member';
  const activeMobile = mobile || (memberData as any)?.mobile || '9542879615';

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({ format: 'a4', unit: 'mm' });
      const pageWidth = doc.internal.pageSize.width;

      // 1. Navy Top Header Banner
      doc.setFillColor(30, 58, 138); // #1E3A8A
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Title & Branding
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('VRK MART', pageWidth / 2, 18, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text('LIFETIME MEMBERSHIP CERTIFICATE & AGREEMENT', pageWidth / 2, 28, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(245, 158, 11); // Gold
      doc.text('Bengaluru Metropolitan Grocery Welfare Platform', pageWidth / 2, 35, { align: 'center' });

      // 2. ID Highlight Box
      doc.setFillColor(254, 243, 199); // Light Gold #FEF3C7
      doc.roundedRect(18, 48, pageWidth - 36, 22, 3, 3, 'F');

      doc.setTextColor(30, 58, 138);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.text(`LIFETIME MEMBER ID: ${activeVrkId}`, pageWidth / 2, 60, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(16, 185, 129); // Green
      doc.text('STATUS: ACTIVE LIFETIME MEMBER', pageWidth / 2, 66, { align: 'center' });

      // 3. Member Information Section
      let y = 80;
      doc.setTextColor(30, 58, 138);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Member Information', 20, y);
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.5);
      doc.line(20, y + 2, pageWidth - 20, y + 2);
      y += 10;

      doc.setFontSize(10);
      doc.setTextColor(31, 41, 55);
      doc.setFont('helvetica', 'bold');
      doc.text('Full Name:', 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(activeName, 55, y);

      doc.setFont('helvetica', 'bold');
      doc.text('Mobile No:', 120, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`+91 ${activeMobile}`, 150, y);
      y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Date of Joining:', 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), 55, y);

      doc.setFont('helvetica', 'bold');
      doc.text('Service Area:', 120, y);
      doc.setFont('helvetica', 'normal');
      doc.text('Bengaluru Metro (560xxx / 562xxx)', 150, y);
      y += 8;

      doc.setFont('helvetica', 'bold');
      doc.text('Organizer Code:', 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text('VRK-ORG-101', 55, y);
      y += 15;

      // 4. VRK 7 Promises & Benefits Summary
      doc.setTextColor(30, 58, 138);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Your 7 Lifetime Membership Benefits', 20, y);
      doc.line(20, y + 2, pageWidth - 20, y + 2);
      y += 10;

      const benefits = [
        '1. Monthly Grocery Milestones — Gold & Cash milestone rewards at 6, 12, and 24 months.',
        '2. Free Medical Consultation — Access to registered health practitioners & family wellness.',
        '3. Life Cover & Family Welfare — Long-term financial security support for verified nominees.',
        '4. Mobile Recharge & Utility Perks — Priority recharge assistance and household utility benefits.',
        '5. Job & Career Assistance — Exclusive community job referral and employment network.',
        '6. Marriage & Education Support — Support grants for higher education & family marriage.',
        '7. Interest-Free Grihamu 2BHK Housing Scheme — Long-term housing support for eligible members.',
      ];

      doc.setFontSize(9.5);
      doc.setTextColor(55, 65, 81);
      benefits.forEach((benefit) => {
        doc.text(benefit, 22, y);
        y += 7;
      });
      y += 10;

      // 5. Verification & Security Seal Box
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(18, y, pageWidth - 36, 32, 2, 2, 'F');
      doc.setDrawColor(209, 213, 219);
      doc.roundedRect(18, y, pageWidth - 36, 32, 2, 2, 'D');

      doc.setTextColor(107, 114, 128);
      doc.setFontSize(8);
      const disclaimer =
        'This official digital certificate verifies that the cardholder has registered for the VRK Mart Lifetime Membership Program. This certificate entitles the member to lifetime grocery benefits, milestone rewards, and community welfare programs as per terms.';
      const splitDisclaimer = doc.splitTextToSize(disclaimer, pageWidth - 46);
      doc.text(splitDisclaimer, 23, y + 8);

      doc.setTextColor(30, 58, 138);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('VRK MART WELFARE TRUST &bull; BENGALURU', pageWidth / 2, y + 26, { align: 'center' });

      // Save PDF
      doc.save(`VRK_Mart_Membership_${activeVrkId}.pdf`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      alert('Could not download PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 max-w-lg mx-auto space-y-6">
      {/* Success Celebration Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Gold Header */}
        <div className="bg-gradient-to-br from-[#F59E0B] via-[#f7b731] to-[#e67e22] p-8 text-white relative">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-2xl font-black mb-1">Welcome to VRK Mart!</h1>
          <p className="text-yellow-100 font-bold text-xs uppercase tracking-wider">
            Your Lifetime Membership is Active
          </p>
        </div>

        {/* Member ID Digital Card */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Digital VIP Card */}
          <div className="relative bg-gradient-to-br from-[#1E3A8A] via-[#162d6e] to-[#0f172a] text-white p-6 rounded-2xl shadow-xl text-left border border-blue-400/20 overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B] block">
                  Official Membership Card
                </span>
                <span className="text-lg font-black tracking-wide">VRK MART</span>
              </div>
              <div className="w-9 h-9 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <Star className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
              </div>
            </div>

            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold text-blue-200 block">Member Name</span>
              <span className="text-base font-extrabold tracking-wide">{activeName}</span>
            </div>

            <div className="flex justify-between items-end pt-3 border-t border-white/10">
              <div>
                <span className="text-[9px] uppercase font-bold text-blue-200 block">Lifetime VRK ID</span>
                <span className="text-xl font-black text-[#F59E0B] tracking-wider">{activeVrkId}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] uppercase font-bold text-blue-200 block">Service Zone</span>
                <span className="text-xs font-bold text-emerald-400">Bengaluru Metro</span>
              </div>
            </div>

            {/* Ambient Watermark */}
            <div className="absolute right-2 bottom-1 opacity-10 font-black text-6xl select-none pointer-events-none">
              VRK
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full bg-[#1E3A8A] hover:bg-blue-900 active:scale-95 text-white py-4 rounded-2xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Certificate...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Membership Card (PDF)</span>
                </>
              )}
            </button>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-emerald-600 active:scale-95 text-white py-4 rounded-2xl font-extrabold text-sm shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Start Shopping Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MembershipSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#1E3A8A] animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
