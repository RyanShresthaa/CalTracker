import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

/** Refreshes the user profile from the API when a session token exists. */
export default function AuthBootstrap() {
  const token = useAuthStore((s) => s.token);
  const refreshUser = useAuthStore((s) => s.refreshUser);

  useEffect(() => {
    if (token) {
      refreshUser();
    }
  }, [token, refreshUser]);

  return null;
}
