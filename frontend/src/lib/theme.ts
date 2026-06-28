import { useEffect, useState } from 'react';
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

function readThemeColors(): ThemeColors {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    accent: v('--accent'),
    coral: v('--coral'),
    border: v('--border'),
    muted: v('--text-secondary'),
    surface: v('--bg-card'),
    text: v('--text-primary'),
    macroProtein: v('--macro-protein'),
    macroCarbs: v('--macro-carbs'),
    macroFat: v('--macro-fat'),
    ringTrack: v('--ring-track'),
    chartGrid: v('--chart-grid'),
    chartTick: v('--chart-tick'),
    chartTooltipBg: v('--chart-tooltip-bg'),
    chartTooltipBorder: v('--chart-tooltip-border'),
    chartTooltipText: v('--chart-tooltip-text'),
  };
}

export function useThemeColors(): ThemeColors {
  const { darkMode } = useThemeStore();
  const [colors, setColors] = useState(readThemeColors);

  useEffect(() => {
    setColors(readThemeColors());
  }, [darkMode]);

  return colors;
}

export function themeColorMeta(darkMode: boolean): string {
  return darkMode ? '#0f0f0f' : '#fffdf9';
}
