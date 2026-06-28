import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  backTo?: { label: string; href: string };
  heroTitle?: string;
  heroText?: string;
  features?: string[];
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
  backTo,
}: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="hidden w-1/2 flex-col justify-center border-r border-border bg-muted/30 p-12 lg:flex">
        <div className="max-w-sm">
          <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
            <Dumbbell className="h-5 w-5 text-background" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">CalTracker</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Track calories, macros, workouts, and progress in one clean place.
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          {backTo && (
            <Link
              to={backTo.href}
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← {backTo.label}
            </Link>
          )}

          <div className="mb-6 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground">
              <Dumbbell className="h-4 w-4 text-background" strokeWidth={2} />
            </div>
            <span className="text-base font-semibold text-foreground">CalTracker</span>
          </div>

          <Card className="border-border shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
              <div className="mt-6">{children}</div>
              {footer && <div className="mt-6">{footer}</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
