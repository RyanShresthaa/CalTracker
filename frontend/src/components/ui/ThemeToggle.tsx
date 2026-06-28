import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const darkMode = useThemeStore((s) => s.darkMode);
  const setDarkMode = useThemeStore((s) => s.setDarkMode);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => setDarkMode(!darkMode)}
      className={cn('gap-2', className)}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline text-xs">
        {darkMode ? 'Light' : 'Dark'}
      </span>
    </Button>
  );
}
