import { queryClient } from './queryClient';

export const queryKeys = {
  dashboard: ['dashboard'] as const,
  foodLogs: (date?: string) => ['foodLogs', date] as const,
  foods: {
    search: (q: string) => ['foods', 'search', q] as const,
  },
  water: (date?: string) => ['water', date ?? 'today'] as const,
  weight: (period: number) => ['weight', period] as const,
  activities: (date?: string) => ['activities', date ?? 'today'] as const,
  activitiesHistory: (period: number) => ['activities', 'history', period] as const,
  workouts: {
    insights: (period: number) => ['workouts', 'insights', period] as const,
    history: ['workouts', 'history'] as const,
    active: ['workouts', 'active'] as const,
    myExercises: ['workouts', 'myExercises'] as const,
  },
  settings: ['settings'] as const,
  admin: {
    stats: ['admin', 'stats'] as const,
    users: (page: number, q: string) => ['admin', 'users', page, q] as const,
    foods: (page: number, q: string) => ['admin', 'foods', page, q] as const,
  },
  recipes: (q?: string) => ['recipes', q ?? ''] as const,
};

export function invalidateTrackerQueries() {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: queryKeys.dashboard }),
    queryClient.invalidateQueries({ queryKey: ['foodLogs'] }),
    queryClient.invalidateQueries({ queryKey: ['water'] }),
    queryClient.invalidateQueries({ queryKey: ['weight'] }),
    queryClient.invalidateQueries({ queryKey: ['activities'] }),
    queryClient.invalidateQueries({ queryKey: ['workouts'] }),
    queryClient.invalidateQueries({ queryKey: ['recipes'] }),
    queryClient.invalidateQueries({ queryKey: ['foods'] }),
  ]);
}
