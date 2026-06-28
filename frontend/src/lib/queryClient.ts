import { QueryClient } from '@tanstack/react-query';

/** Shared stale/gc windows — tuned for remote DB (Neon) latency. */
export const CACHE = {
  /** Active workout session — refresh often while logging sets */
  ACTIVE: 15_000,
  /** Tracker pages (food, water, activities for today) */
  TRACKER: 2 * 60_000,
  /** Dashboard, weight charts, workout history */
  DASHBOARD: 5 * 60_000,
  /** Settings, exercise library, muscle insights */
  STABLE: 10 * 60_000,
  /** Food search results */
  SEARCH: 3 * 60_000,
  GC: 30 * 60_000,
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE.TRACKER,
      gcTime: CACHE.GC,
      retry: (failureCount, error) => {
        const status = (error as { response?: { status?: number } })?.response?.status;
        if (status === 401 || status === 403) return false;
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      placeholderData: (prev: unknown) => prev,
    },
  },
});
