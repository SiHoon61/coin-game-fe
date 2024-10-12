import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  isAuth: boolean;
  setIsAuth: (value: boolean) => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuth: false,
      setIsAuth: (value) =>
        set({
          isAuth: value,
        }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export { useAuthStore };
