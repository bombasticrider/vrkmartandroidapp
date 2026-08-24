'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const addressSchema = z.object({
  line1: z.string().min(5, 'Address line 1 must be at least 5 characters'),
  line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Must be a 6 digit pincode')
});

const step2Schema = z.object({
  permanentAddress: addressSchema,
  sameAsPermanent: z.boolean(),
  temporaryAddress: addressSchema.optional(),
  deliveryPincode: z.string().regex(/^560\d{3}$/, 'Only Bengaluru pincodes (560xxx) are active for delivery')
}).superRefine((data, ctx) => {
  if (!data.sameAsPermanent && !data.temporaryAddress) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Temporary address is required if not same as permanent",
      path: ["temporaryAddress", "line1"],
    });
  }
});

type Step2Data = z.infer<typeof step2Schema>;

interface Step2Props {
  onNext: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step2Data>;
}

export default function Step2Address({ onNext, onBack, defaultValues }: Step2Props) {
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      sameAsPermanent: true,
      ...defaultValues
    }
  });

  const sameAsPermanent = useWatch({ control, name: 'sameAsPermanent' });
  const permanentAddress = useWatch({ control, name: 'permanentAddress' });

  useEffect(() => {
    if (sameAsPermanent && permanentAddress) {
      setValue('temporaryAddress', permanentAddress);
    }
  }, [sameAsPermanent, permanentAddress, setValue]);

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 max-w-xl mx-auto">
      {/* Permanent Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[#1E3A8A] border-b pb-2">Permanent Address</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
          <input type="text" {...register('permanentAddress.line1')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
          {errors.permanentAddress?.line1 && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress.line1.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
          <input type="text" {...register('permanentAddress.line2')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City *</label>
            <input type="text" {...register('permanentAddress.city')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
            {errors.permanentAddress?.city && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress.city.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode *</label>
            <input type="text" maxLength={6} {...register('permanentAddress.pincode')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
            {errors.permanentAddress?.pincode && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress.pincode.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">State *</label>
          <select {...register('permanentAddress.state')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border">
            <option value="">Select State</option>
            {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
          </select>
          {errors.permanentAddress?.state && <p className="text-red-500 text-xs mt-1">{errors.permanentAddress.state.message}</p>}
        </div>
      </div>

      {/* Temporary Address Toggle */}
      <div className="flex items-center">
        <input type="checkbox" id="sameAsPermanent" {...register('sameAsPermanent')} className="h-4 w-4 text-[#1E3A8A] focus:ring-[#1E3A8A] border-gray-300 rounded" />
        <label htmlFor="sameAsPermanent" className="ml-2 block text-sm text-gray-900">
          Temporary address is same as permanent address
        </label>
      </div>

      {/* Temporary Address */}
      {!sameAsPermanent && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[#1E3A8A] border-b pb-2">Temporary Address</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
            <input type="text" {...register('temporaryAddress.line1')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
            {errors.temporaryAddress?.line1 && <p className="text-red-500 text-xs mt-1">{errors.temporaryAddress.line1.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input type="text" {...register('temporaryAddress.line2')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input type="text" {...register('temporaryAddress.city')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
              {errors.temporaryAddress?.city && <p className="text-red-500 text-xs mt-1">{errors.temporaryAddress.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pincode *</label>
              <input type="text" maxLength={6} {...register('temporaryAddress.pincode')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
              {errors.temporaryAddress?.pincode && <p className="text-red-500 text-xs mt-1">{errors.temporaryAddress.pincode.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State *</label>
            <select {...register('temporaryAddress.state')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border">
              <option value="">Select State</option>
              {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
            {errors.temporaryAddress?.state && <p className="text-red-500 text-xs mt-1">{errors.temporaryAddress.state.message}</p>}
          </div>
        </div>
      )}

      {/* Delivery Area */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-md font-medium text-[#1E3A8A] mb-3">Preferred Delivery Area</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Pincode * (Bengaluru only)</label>
          <input type="text" maxLength={6} {...register('deliveryPincode')} placeholder="e.g. 560001" className="mt-1 block w-full sm:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border" />
          {errors.deliveryPincode && <p className="text-red-500 text-xs mt-1">{errors.deliveryPincode.message}</p>}
        </div>
      </div>

      <div className="pt-4 flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-100 text-gray-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors">
          Back
        </button>
        <button type="submit" className="bg-[#1E3A8A] text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-900 transition-colors">
          Next
        </button>
      </div>
    </form>
  );
}
