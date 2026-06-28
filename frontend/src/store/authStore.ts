import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authAPI } from '../lib/api';

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
          const { token, user } = res.data;
          localStorage.setItem('token', token);
          set({ token, user, isLoading: false });
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
        set({ user: null, token: null });
      },

      refreshUser: async () => {
        try {
          const res = await authAPI.getMe();
          set({ user: res.data });
        } catch {
          get().logout();
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
      darkMode: true,
      toggleDarkMode: () => set((s) => {
        const next = !s.darkMode;
        document.documentElement.classList.toggle('dark', next);
        return { darkMode: next };
      }),
      setDarkMode: (val) => {
        document.documentElement.classList.toggle('dark', val);
        set({ darkMode: val });
      },
    }),
    { name: 'theme-storage' }
  )
);
