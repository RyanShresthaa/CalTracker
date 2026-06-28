import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  House, ForkKnife, Drop, Scales, Lightning, ChartLine,
  Gear, SignOut, List, X, Bell, Moon, Sun, UserCircle,
  FirstAid, BookOpen
} from 'phosphor-react';
import { useAuthStore, useThemeStore } from '../../store/authStore';
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
  const { darkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 flex flex-col
        bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <FirstAid size={18} weight="bold" className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">CalTracker</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden btn-ghost p-1">
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-slate-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200
                ${isActive
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}
              `}
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                  {label}
                </>
              )}
            </NavLink>
          ))}

          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
            >
              <UserCircle size={20} />
              Admin Panel
            </NavLink>
          )}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700 space-y-1">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
              text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <SignOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden btn-ghost p-2"
          >
            <List size={22} />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative btn-ghost p-2">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="hidden lg:flex btn-ghost p-2"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto animate-in">
            <Outlet />
          </div>
        </main>
      </div>
      <InstallPWA />
    </div>
  );
}
