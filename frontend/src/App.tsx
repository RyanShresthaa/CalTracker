import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore, useThemeStore } from './store/authStore';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import DashboardPage from './pages/DashboardPage';
import FoodLogPage from './pages/FoodLogPage';
import WaterPage from './pages/WaterPage';
import WeightPage from './pages/WeightPage';
import ActivityPage from './pages/ActivityPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import RecipesPage from './pages/RecipesPage';
import AdminPage from './pages/AdminPage';
import Layout from './components/layout/Layout';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (user && !user.profileCompleted) return <Navigate to="/complete-profile" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  if (token && user?.profileCompleted) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  if (!user?.isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export default function App() {
  const { darkMode } = useThemeStore();
  const { token, user } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '!bg-surface !text-text-primary !border !border-border',
          duration: 3000,
          style: { borderRadius: 0, boxShadow: 'none' },
        }}
      />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Profile completion */}
        <Route
          path="/complete-profile"
          element={
            token ? <CompleteProfilePage /> : <Navigate to="/login" replace />
          }
        />

        {/* Protected app routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="food-log" element={<FoodLogPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="water" element={<WaterPage />} />
          <Route path="weight" element={<WeightPage />} />
          <Route path="activity" element={<ActivityPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
