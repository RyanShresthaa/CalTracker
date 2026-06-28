const STORAGE_KEY = 'theme-storage';

/** Read persisted theme synchronously so first React render matches localStorage. */
export function readStoredDarkMode(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as { state?: { darkMode?: boolean } };
    return parsed.state?.darkMode === true;
  } catch {
    return false;
  }
}

export function themeColorMeta(darkMode: boolean): string {
  return darkMode ? '#0f0f10' : '#fafafa';
}

/** Single source of truth for applying theme to the document. */
export function applyTheme(darkMode: boolean): void {
  const root = document.documentElement;
  const theme = darkMode ? 'dark' : 'light';

  root.dataset.theme = theme;
  root.classList.toggle('dark', darkMode);
  root.style.colorScheme = darkMode ? 'dark' : 'light';

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', themeColorMeta(darkMode));
}
