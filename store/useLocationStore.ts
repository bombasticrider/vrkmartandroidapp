import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isBengaluruPincode } from '@/lib/utils';

export interface LocationStore {
  pincode: string | null;
  areaName: string | null;
  isBengaluru: boolean;
  isServiceable: boolean;
  hasPincodeSet: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setLocation: (pincode: string, areaName?: string) => void;
  setPincode: (pincode: string) => void;
  clearPincode: () => void;
  /** Resets location and opens the modal */
  resetPincode: () => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      pincode: null,
      areaName: null,
      isBengaluru: false,
      isServiceable: false,
      hasPincodeSet: false,
      isModalOpen: false,

      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),

      setLocation: (pincode: string, areaName?: string) => {
        const isBglr = isBengaluruPincode(pincode);
        set({
          pincode,
          areaName: areaName || (isBglr ? 'Bengaluru' : 'Outside Bengaluru'),
          isBengaluru: isBglr,
          isServiceable: isBglr,
          hasPincodeSet: true,
          isModalOpen: false,
        });
      },

      setPincode: (pincode: string) => {
        const isBglr = isBengaluruPincode(pincode);
        set({
          pincode,
          areaName: isBglr ? 'Bengaluru' : 'Outside Bengaluru',
          isBengaluru: isBglr,
          isServiceable: isBglr,
          hasPincodeSet: true,
          isModalOpen: false,
        });
      },

      clearPincode: () => {
        set({
          pincode: null,
          areaName: null,
          isBengaluru: false,
          isServiceable: false,
          hasPincodeSet: false,
          isModalOpen: true,
        });
      },

      resetPincode: () => {
        set({
          isModalOpen: true,
        });
      },
    }),
    {
      name: 'vrkmart-location-storage',
    }
  )
);
