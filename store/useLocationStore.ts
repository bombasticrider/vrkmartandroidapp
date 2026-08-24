import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isBengaluruPincode } from '@/lib/utils';

export interface LocationStore {
  pincode: string | null;
  isBengaluru: boolean;
  isServiceable: boolean;
  hasPincodeSet: boolean;
  setPincode: (pincode: string) => void;
  clearPincode: () => void;
  /** Alias for clearPincode — resets location and reopens the pincode modal */
  resetPincode: () => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      pincode: null,
      isBengaluru: false,
      isServiceable: false,
      hasPincodeSet: false,
      
      setPincode: (pincode: string) => {
        const isBglr = isBengaluruPincode(pincode);
        set({
          pincode,
          isBengaluru: isBglr,
          isServiceable: isBglr,
          hasPincodeSet: true,
        });
      },
      
      clearPincode: () => {
        set({
          pincode: null,
          isBengaluru: false,
          isServiceable: false,
          hasPincodeSet: false,
        });
      },

      resetPincode: () => {
        set({
          pincode: null,
          isBengaluru: false,
          isServiceable: false,
          hasPincodeSet: false,
        });
      },
    }),
    {
      name: 'vrkmart-location-storage',
    }
  )
);
