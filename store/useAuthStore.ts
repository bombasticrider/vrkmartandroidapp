import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthStore {
  mobile: string | null;
  memberId: string | null;
  vrkId: string | null;
  memberName: string | null;
  isVerified: boolean;
  isMember: boolean;
  memberData: Record<string, unknown> | null;
  setAuth: (data: Partial<AuthStore>) => void;
  logout: () => void;
}

const initialState = {
  mobile: null,
  memberId: null,
  vrkId: null,
  memberName: null,
  isVerified: false,
  isMember: false,
  memberData: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (data) => set((state) => ({ ...state, ...data })),
      logout: () => set(initialState),
    }),
    {
      name: 'vrkmart-auth-storage',
    }
  )
);
