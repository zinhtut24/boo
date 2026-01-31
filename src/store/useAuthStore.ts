import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: (userData) => set({ isLoggedIn: true, user: userData }),
      logout: () => set({ isLoggedIn: false, user: null }),
    }),
    { name: 'auth-storage' } // Browser မှာ အမြဲမှတ်ထားပေးမှာပါ
  )
);