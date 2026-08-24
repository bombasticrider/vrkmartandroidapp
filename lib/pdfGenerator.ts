import jsPDF from 'jspdf';

export interface MemberPdfData {
  vrkId: string;
  fullName: string;
  mobile: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  permanentAddress?: any;
  nominees?: any[];
  dreamBox?: string;
  organizerCode?: string;
  signatureDataUrl?: string; // Base64 data URL for the signature
  photoDataUrl?: string; // Base64 data URL for selfie
}

export function generateMembershipPdf(memberData: MemberPdfData): Blob {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(24);
  doc.setTextColor(30, 58, 138); // Navy blue
  doc.text('VRK Mart', 105, 20, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Membership Agreement', 105, 30, { align: 'center' });
  
  // VRK ID (Large, bold)
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(memberData.vrkId, 105, 45, { align: 'center' });
  
  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleDateString();
  doc.text(`Date: ${dateStr}`, 20, 55);
  doc.text(`Organizer Code: ${memberData.organizerCode || 'N/A'}`, 140, 55);
  
  // Photo placeholder / image
  doc.setDrawColor(0);
  doc.rect(150, 70, 40, 45);
  if (memberData.photoDataUrl) {
    try {
      doc.addImage(memberData.photoDataUrl, 'JPEG', 150, 70, 40, 45);
    } catch (e) {
      doc.text('Photo', 170, 92, { align: 'center' });
    }
  } else {
    doc.text('Photo', 170, 92, { align: 'center' });
  }

  // Personal Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Personal Details', 20, 70);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  let yPos = 80;
  doc.text(`Full Name: ${memberData.fullName}`, 20, yPos);
  yPos += 8;
  doc.text(`Mobile: ${memberData.mobile}`, 20, yPos);
  yPos += 8;
  doc.text(`Date of Birth: ${memberData.dateOfBirth || 'N/A'}`, 20, yPos);
  yPos += 8;
  doc.text(`Gender: ${memberData.gender || 'N/A'}`, 20, yPos);
  yPos += 8;
  doc.text(`Email: ${memberData.email || 'N/A'}`, 20, yPos);
  
  // Address
  yPos += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Permanent Address', 20, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 8;
  if (memberData.permanentAddress) {
    const addr = memberData.permanentAddress;
    doc.text(`${addr.line1}, ${addr.line2 || ''}`, 20, yPos);
    yPos += 8;
    doc.text(`${addr.city}, ${addr.state} - ${addr.pincode}`, 20, yPos);
  } else {
    doc.text('N/A', 20, yPos);
  }

  // Nominees
  yPos += 15;
  doc.setFont('helvetica', 'bold');
  doc.text('Nominees', 20, yPos);
  doc.setFont('helvetica', 'normal');
  yPos += 8;
  if (memberData.nominees && memberData.nominees.length > 0) {
    memberData.nominees.forEach((nom, idx) => {
      doc.text(`${idx + 1}. ${nom.name} (${nom.relation}) - ${nom.mobile}`, 20, yPos);
      yPos += 8;
    });
  } else {
    doc.text('N/A', 20, yPos);
  }

  // Dream Box
  yPos += 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Dream Box Status:', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(memberData.dreamBox || 'No Dream', 70, yPos);

  // Terms and Signature
  yPos += 20;
  doc.setFontSize(9);
  const termsText = "By signing below, I agree to the terms and conditions of VRK Mart lifetime membership. I confirm that all information provided is accurate and true to the best of my knowledge.";
  const splitTerms = doc.splitTextToSize(termsText, 170);
  doc.text(splitTerms, 20, yPos);
  
  yPos += 25;
  
  // Signature Area
  doc.rect(20, yPos, 60, 25);
  if (memberData.signatureDataUrl) {
    try {
      doc.addImage(memberData.signatureDataUrl, 'PNG', 20, yPos, 60, 25);
    } catch (e) {
      doc.text('Signature', 50, yPos + 15, { align: 'center' });
    }
  } else {
    doc.text('Signature', 50, yPos + 15, { align: 'center' });
  }
  
  // QR Code placeholder
  doc.rect(140, yPos, 30, 30);
  doc.text('QR Code', 155, yPos + 15, { align: 'center' });

  return doc.output('blob');
}
