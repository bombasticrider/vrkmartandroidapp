'use client';

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { Download, Loader2 } from 'lucide-react';

export interface MemberPdfData {
  fullName: string;
  dob: string;
  gender: string;
  mobile: string;
  email?: string;
  permanentAddress: { line1: string; line2?: string; city: string; state: string; pincode: string };
  nominees: { name: string; relation: string; mobile: string }[];
  dreamSelection: string;
  dreamText?: string;
  organizerCode: string;
  signatureDataUrl?: string; // Base64 string of signature
  selfieDataUrl?: string;
}

interface MembershipPdfProps {
  memberData: MemberPdfData;
  vrkId: string;
  className?: string;
}

export default function MembershipPdf({ memberData, vrkId, className = '' }: MembershipPdfProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF({ format: 'a4', unit: 'mm' });
      const pageWidth = doc.internal.pageSize.width;
      
      // Header
      doc.setFillColor(30, 58, 138); // #1E3A8A Navy
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.text('VRK MART', pageWidth / 2, 20, { align: 'center' });
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.text('LIFETIME MEMBERSHIP AGREEMENT', pageWidth / 2, 30, { align: 'center' });

      // Body setup
      doc.setTextColor(0, 0, 0);
      let y = 50;
      const leftCol = 20;

      // VRK ID prominent
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129); // #10B981 Green
      doc.text(`Membership ID: ${vrkId}`, leftCol, y);
      doc.setTextColor(0, 0, 0);
      y += 15;

      // Personal Details Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Personal Details', leftCol, y);
      doc.setLineWidth(0.5);
      doc.line(leftCol, y + 2, pageWidth - 20, y + 2);
      y += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${memberData.fullName}`, leftCol, y);
      doc.text(`DOB: ${memberData.dob}`, leftCol + 100, y);
      y += 8;
      doc.text(`Gender: ${memberData.gender}`, leftCol, y);
      doc.text(`Mobile: ${memberData.mobile}`, leftCol + 100, y);
      y += 8;
      if (memberData.email) doc.text(`Email: ${memberData.email}`, leftCol, y);
      
      // Selfie Profile Pic
      if (memberData.selfieDataUrl) {
        try {
          doc.addImage(memberData.selfieDataUrl, 'WEBP', pageWidth - 50, 45, 30, 40);
        } catch (e) {
          console.warn('Could not add selfie to PDF');
        }
      }
      y += 15;

      // Address Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Permanent Address', leftCol, y);
      doc.line(leftCol, y + 2, pageWidth - 20, y + 2);
      y += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const pAddr = memberData.permanentAddress;
      const addrString = `${pAddr.line1}${pAddr.line2 ? `, ${pAddr.line2}` : ''}, ${pAddr.city}, ${pAddr.state} - ${pAddr.pincode}`;
      const splitAddr = doc.splitTextToSize(addrString, pageWidth - 40);
      doc.text(splitAddr, leftCol, y);
      y += (splitAddr.length * 6) + 5;

      // Nominees Section
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Nominees', leftCol, y);
      doc.line(leftCol, y + 2, pageWidth - 20, y + 2);
      y += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      memberData.nominees.forEach((nom, i) => {
        doc.text(`${i + 1}. ${nom.name} (${nom.relation}) - Ph: ${nom.mobile}`, leftCol, y);
        y += 8;
      });
      y += 5;

      // Dream Box
      if (memberData.dreamSelection === 'personal' && memberData.dreamText) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('VRK Dream Box', leftCol, y);
        doc.line(leftCol, y + 2, pageWidth - 20, y + 2);
        y += 10;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'italic');
        const splitDream = doc.splitTextToSize(`"${memberData.dreamText}"`, pageWidth - 40);
        doc.text(splitDream, leftCol, y);
        y += (splitDream.length * 6) + 10;
      }

      // Organizer & Date
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Organizer Code: ${memberData.organizerCode}`, leftCol, y);
      doc.text(`Date of Joining: ${new Date().toLocaleDateString()}`, leftCol + 100, y);
      y += 20;

      // Terms & Signature
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const terms = 'By signing below, I agree to the VRK Mart lifetime membership terms and conditions. I confirm that all information provided is accurate and true to the best of my knowledge.';
      const splitTerms = doc.splitTextToSize(terms, pageWidth - 40);
      doc.text(splitTerms, leftCol, y);
      y += 15;

      if (memberData.signatureDataUrl) {
        doc.addImage(memberData.signatureDataUrl, 'PNG', leftCol, y, 50, 25);
      }
      doc.setLineWidth(0.2);
      doc.line(leftCol, y + 25, leftCol + 50, y + 25);
      doc.setTextColor(0, 0, 0);
      doc.text('Member Signature', leftCol + 10, y + 30);

      // Save
      doc.save(`VRK_Mart_Membership_${vrkId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className={`flex items-center justify-center gap-2 bg-[#1E3A8A] text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900 transition-colors disabled:bg-blue-400 ${className}`}
    >
      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
      <span>{isGenerating ? 'Generating PDF...' : 'Download Membership Card (PDF)'}</span>
    </button>
  );
}
