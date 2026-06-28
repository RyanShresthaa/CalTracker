import { useMemo } from 'react';
import { useThemeStore } from '../store/authStore';

export interface ThemeColors {
  accent: string;
  coral: string;
  border: string;
  muted: string;
  surface: string;
  text: string;
  macroProtein: string;
  macroCarbs: string;
  macroFat: string;
  ringTrack: string;
  chartGrid: string;
  chartTick: string;
  chartTooltipBg: string;
  chartTooltipBorder: string;
  chartTooltipText: string;
}

function hslVar(name: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v ? `hsl(${v})` : '';
}

function readThemeColors(): ThemeColors {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    accent: hslVar('--primary'),
    coral: hslVar('--destructive'),
    border: hslVar('--border'),
    muted: hslVar('--muted-foreground'),
    surface: hslVar('--card'),
    text: hslVar('--foreground'),
    macroProtein: hslVar('--macro-protein'),
    macroCarbs: hslVar('--macro-carbs'),
    macroFat: hslVar('--macro-fat'),
    ringTrack: hslVar('--ring-track'),
    chartGrid: hslVar('--chart-grid'),
    chartTick: hslVar('--chart-tick'),
    chartTooltipBg: hslVar('--chart-tooltip-bg'),
    chartTooltipBorder: hslVar('--chart-tooltip-border'),
    chartTooltipText: hslVar('--chart-tooltip-text'),
  };
}

export function useThemeColors(): ThemeColors {
  const darkMode = useThemeStore((s) => s.darkMode);
  return useMemo(() => readThemeColors(), [darkMode]);
}

export { applyTheme, readStoredDarkMode, themeColorMeta } from './themeApply';
