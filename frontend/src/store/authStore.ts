import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../lib/api';
import { applyTheme, readStoredDarkMode } from '../lib/themeApply';

interface User {
  id: string;
  email: string;
  name: string;
  profileCompleted: boolean;
  isAdmin: boolean;
  age?: number;
  sex?: string;
  height?: number;
  currentWeight?: number;
  goalWeight?: number;
  activityLevel?: string;
  gymDaysPerWeek?: number;
  dailyWalkKm?: number;
  gymMinutesPerSession?: number;
  goal?: string;
  settings?: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      setUser: (user) => set({ user }),
      setToken: (token) => {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
        set({ token });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const res = await authAPI.login({ email, password });
          const { token } = res.data;
          localStorage.setItem('token', token);
          set({ token, isLoading: false });
          await get().refreshUser();
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await authAPI.logout();
        } catch {}
        localStorage.removeItem('token');
        localStorage.removeItem('auth-storage');
        set({ user: null, token: null });
      },

      refreshUser: async () => {
        try {
          const res = await authAPI.getMe();
          set({ user: res.data });
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('auth-storage');
          set({ user: null, token: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);

// Theme store
interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: readStoredDarkMode(),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setDarkMode: (darkMode) => set({ darkMode }),
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({ darkMode: state.darkMode }),
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.darkMode);
      },
    },
  ),
);

useThemeStore.subscribe((state, prev) => {
  if (state.darkMode !== prev.darkMode) {
    applyTheme(state.darkMode);
  }
});

// Sync before first paint (store module load)
applyTheme(readStoredDarkMode());
