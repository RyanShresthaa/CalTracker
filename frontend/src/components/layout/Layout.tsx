import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  Home, UtensilsCrossed, Droplets, Scale, Zap, LineChart,
  Settings, LogOut, Menu, UserCircle, BookOpen, Dumbbell,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import ThemeToggle from '@/components/ui/ThemeToggle';
import InstallPWA from '@/components/InstallPWA';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/food-log', icon: UtensilsCrossed, label: 'Food Log' },
  { to: '/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/water', icon: Droplets, label: 'Water' },
  { to: '/weight', icon: Scale, label: 'Weight' },
  { to: '/workout', icon: Dumbbell, label: 'Workout' },
  { to: '/activity', icon: Zap, label: 'Activity' },
  { to: '/progress', icon: LineChart, label: 'Progress' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
        <Dumbbell className="h-4 w-4 text-background" strokeWidth={2} />
      </div>
      <span className="text-[15px] font-semibold tracking-tight text-foreground">CalTracker</span>
    </div>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
    onNavigate?.();
  };

  return (
    <>
      <div className="px-4 py-4">
        <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
        <p className="truncate text-xs text-muted-foreground mt-0.5">{user?.email}</p>
      </div>

      <Separator />

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'nav-active'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" />
            <span>{label}</span>
          </NavLink>
        ))}

        {user?.isAdmin && (
          <NavLink
            to="/admin"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <UserCircle className="h-4 w-4 shrink-0 opacity-70" />
            <span>Admin</span>
          </NavLink>
        )}
      </nav>

      <Separator />

      <div className="p-2">
        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          className="h-9 w-full justify-start gap-3 px-3 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </Button>
      </div>
    </>
  );
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden w-56 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-14 items-center px-4">
          <BrandMark />
        </div>
        <SidebarNav />
      </aside>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="flex w-56 flex-col bg-sidebar p-0 lg:hidden [&>button]:hidden">
          <div className="flex h-14 items-center px-4 border-b border-border">
            <BrandMark />
          </div>
          <SidebarNav onNavigate={() => setSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b border-border bg-background px-4 lg:px-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden -ml-1"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <p className="ml-2 hidden lg:block text-sm text-muted-foreground">
            Hi, <span className="text-foreground font-medium">{user?.name?.split(' ')[0]}</span>
          </p>

          <ThemeToggle className="ml-auto" />
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
      <InstallPWA />
    </div>
  );
}
