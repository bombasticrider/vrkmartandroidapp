'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2 } from 'lucide-react';

const nomineeSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  relation: z.enum(['Spouse', 'Parent', 'Sibling', 'Child', 'Friend', 'Other']),
  mobile: z.string().regex(/^\d{10}$/, 'Must be a 10 digit mobile number')
});

const step3Schema = z.object({
  nominees: z.array(nomineeSchema).min(1, 'At least 1 nominee is required').max(3, 'Maximum 3 nominees allowed'),
  familyWelfare: z.string().optional()
});

export type Step3Data = z.infer<typeof step3Schema>;

interface Step3Props {
  onNext: (data: Step3Data) => void;
  onBack: () => void;
  defaultValues?: Partial<Step3Data>;
}

export default function Step3Nominees({ onNext, onBack, defaultValues }: Step3Props) {
  const { register, control, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: defaultValues || {
      nominees: [{ name: '', relation: 'Spouse', mobile: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nominees'
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-8 max-w-xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-lg font-medium text-[#1E3A8A]">Nominees</h3>
          {fields.length < 3 && (
            <button
              type="button"
              onClick={() => append({ name: '', relation: 'Spouse', mobile: '' })}
              className="flex items-center text-sm text-[#10B981] hover:text-green-700 font-medium"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Nominee
            </button>
          )}
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Nominee {index + 1}</h4>
            
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input 
                  type="text" 
                  {...register(`nominees.${index}.name` as const)} 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
                />
                {errors.nominees?.[index]?.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.nominees[index]?.name?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Relation *</label>
                <select 
                  {...register(`nominees.${index}.relation` as const)} 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
                {errors.nominees?.[index]?.relation && (
                  <p className="text-red-500 text-xs mt-1">{errors.nominees[index]?.relation?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number *</label>
                <input 
                  type="text" 
                  maxLength={10}
                  {...register(`nominees.${index}.mobile` as const)} 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
                />
                {errors.nominees?.[index]?.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.nominees[index]?.mobile?.message}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {errors.nominees && !Array.isArray(errors.nominees) && (
          <p className="text-red-500 text-sm mt-1">{errors.nominees.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E3A8A] border-b pb-2 mb-3">Family Welfare (Optional)</label>
        <p className="text-xs text-gray-500 mb-2">Any specific family needs or support required?</p>
        <textarea
          {...register('familyWelfare')}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-[#1E3A8A] sm:text-sm p-2 border"
          placeholder="E.g., Medical support, educational needs..."
        />
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
