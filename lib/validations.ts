import { z } from 'zod';
import { isBengaluruPincode } from './utils';

export const pincodeSchema = z.string().length(6).refine((val) => isBengaluruPincode(val), {
  message: "Service is only available in Bengaluru (560xxx pincodes)",
});

export const mobileSchema = z.string().regex(/^[6-9]\d{9}$/, {
  message: "Please enter a valid 10-digit Indian mobile number",
});

export const otpSchema = z.string().length(6, { message: "OTP must be exactly 6 digits" });

export const addressSchema = z.object({
  line1: z.string().min(3, "Address line 1 is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: pincodeSchema,
});

export const step1Schema = z.object({
  full_name: z.string().min(2, "Name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(['Male', 'Female', 'Other']),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
});

export const step2Schema = z.object({
  permanent_address: addressSchema,
  temporary_address: addressSchema.optional(),
  same_as_permanent: z.boolean().default(true),
});

export const step3Schema = z.object({
  nominees: z.array(z.object({
    name: z.string().min(2, "Nominee name is required"),
    relation: z.string().min(2, "Relation is required"),
    mobile: mobileSchema,
  })).min(1, "At least one nominee is required").max(3, "Maximum 3 nominees allowed"),
  family_welfare: z.string().optional(),
});

export const step4Schema = z.object({
  identity_proofs: z.array(z.object({
    type: z.enum(['Aadhaar', 'PAN', 'Voter ID', 'Passport', 'Driving License']),
    storage_path: z.string(),
  })).min(1, "At least one identity proof is required"),
});

export const step5Schema = z.object({
  dream_box: z.enum(['My Dream', 'No Dream']),
  dream_description: z.string().optional(),
  organizer_code: z.string().optional(),
});

export const step6Schema = z.object({
  signature_path: z.string().min(1, "Signature is required"),
  selfie_path: z.string().min(1, "Selfie is required"),
});

export const memberRegistrationSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
  ...step4Schema.shape,
  ...step5Schema.shape,
  ...step6Schema.shape,
  mobile: mobileSchema,
});

export const orderCreateSchema = z.object({
  member_mobile: mobileSchema,
  delivery_address: addressSchema,
  items: z.array(z.object({
    product_id: z.string().uuid(),
    product_name: z.string(),
    pack_size: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
  })).min(1, "Order must have at least one item"),
  notes: z.string().optional(),
});

export const productVariantSchema = z.object({
  pack_size: z.string(),
  price: z.number().positive(),
  mrp: z.number().positive(),
  sku: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  category_id: z.string().uuid(),
  brand: z.string().optional(),
  variants: z.array(productVariantSchema).min(1),
  image_url: z.string().url().optional(),
  is_active: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
});
