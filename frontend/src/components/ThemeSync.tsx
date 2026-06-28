import { useLayoutEffect } from 'react';
import { useThemeStore } from '../store/authStore';
import { applyTheme } from '../lib/themeApply';

/** Keeps DOM theme in lockstep with the store on every render cycle. */
export default function ThemeSync() {
  const darkMode = useThemeStore((s) => s.darkMode);

  useLayoutEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  return null;
}
