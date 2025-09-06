import { create } from 'zustand';

type Theme = "theme-orange" | "theme-blue" | "theme-green" | "theme-purple" | "theme-dark";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "theme-orange",
  setTheme: (theme) => set({ theme }),
}));
