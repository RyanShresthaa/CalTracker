import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  House, ForkKnife, Drop, Scales, Lightning, ChartLine,
  Gear, SignOut, List, X, UserCircle, BookOpen,
} from 'phosphor-react';
import { useAuthStore } from '../../store/authStore';
import InstallPWA from '../InstallPWA';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: House, label: 'Dashboard' },
  { to: '/food-log', icon: ForkKnife, label: 'Food Log' },
  { to: '/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/water', icon: Drop, label: 'Water' },
  { to: '/weight', icon: Scales, label: 'Weight' },
  { to: '/activity', icon: Lightning, label: 'Activity' },
  { to: '/progress', icon: ChartLine, label: 'Progress' },
  { to: '/settings', icon: Gear, label: 'Settings' },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-56 flex flex-col
        bg-surface border-r border-border
        transform transition-transform duration-300 ease-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-14 px-5 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-bg">CT</span>
            </div>
            <span className="font-mono text-sm tracking-wider text-text-primary uppercase">CalTracker</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden btn-ghost p-1">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 py-4 border-b border-border">
          <p className="font-medium text-sm text-text-primary truncate">{user?.name}</p>
          <p className="text-xs text-muted truncate font-mono">{user?.email}</p>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-px overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-200
                ${isActive
                  ? 'bg-hover text-accent border-l-2 border-accent'
                  : 'text-muted hover:bg-hover hover:text-text-primary border-l-2 border-transparent'}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                  <span className="label-caps !text-[10px]">{label}</span>
                </>
              )}
            </NavLink>
          ))}

          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-coral hover:bg-hover transition-colors border-l-2 border-transparent"
            >
              <UserCircle size={18} />
              <span className="label-caps !text-[10px]">Admin</span>
            </NavLink>
          )}
        </nav>

        <div className="px-2 py-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:bg-hover hover:text-coral transition-colors"
          >
            <SignOut size={18} />
            <span className="label-caps !text-[10px]">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-surface border-b border-border flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden btn-ghost p-2 -ml-2"
          >
            <List size={22} />
          </button>

          <div className="hidden lg:block ml-1">
            <p className="label-caps text-muted">{user?.name?.split(' ')[0]}</p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      <InstallPWA />
    </div>
  );
}
