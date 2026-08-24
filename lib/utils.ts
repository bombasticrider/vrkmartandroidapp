import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pincode validator: only 560xxx Bengaluru pincodes are serviceable
export function isBengaluruPincode(pincode: string): boolean {
  return /^560\d{3}$/.test(pincode);
}

// Format currency: 1500 -> '₹1,500'
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}

// Compress image via Canvas API to WebP < 250KB
export async function compressImage(file: File, maxSizeKB: number = 250): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Scale down if too large
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height *= MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width *= MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        let quality = 0.9;
        const attemptCompression = () => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob failed'));
              return;
            }
            if (blob.size / 1024 > maxSizeKB && quality > 0.1) {
              quality -= 0.1;
              attemptCompression();
            } else {
              resolve(blob);
            }
          }, 'image/webp', quality);
        };
        attemptCompression();
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}

// Format VRK ID: 1 -> 'VRK-00000001'
export function formatVrkId(serial: number): string {
  return `VRK-${serial.toString().padStart(8, '0')}`;
}

// Format order number: 1 -> 'ORD-00000001'
export function formatOrderNumber(serial: number): string {
  return `ORD-${serial.toString().padStart(8, '0')}`;
}

// Mask Aadhaar: '1234-5678-9012' or '123456789012' -> 'XXXX-XXXX-9012'
export function maskAadhaar(aadhaar: string): string {
  const clean = aadhaar.replace(/\D/g, '');
  if (clean.length !== 12) return aadhaar;
  return `XXXX-XXXX-${clean.slice(-4)}`;
}

// Mask PAN: 'ABCDE1234F' -> 'ABCDE****F'
export function maskPan(pan: string): string {
  if (pan.length !== 10) return pan;
  return `${pan.slice(0, 5)}****${pan.slice(-1)}`;
}

// Generate random 6-digit OTP
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Sleep helper
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Delivery fee calculator: free above ₹500, else ₹40
export function calculateDeliveryFee(subtotal: number): number {
  return subtotal >= 500 ? 0 : 40;
}
