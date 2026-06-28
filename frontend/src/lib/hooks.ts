import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '../store/authStore';
import {
  dashboardAPI,
  foodLogsAPI,
  foodsAPI,
  waterAPI,
  weightAPI,
  activitiesAPI,
  workoutsAPI,
  userAPI,
  adminAPI,
  recipesAPI,
} from './api';
import { queryKeys, invalidateTrackerQueries } from './queryKeys';
import { CACHE } from './queryClient';

const emptyFoodLogs = {
  byMeal: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
};

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => dashboardAPI.get().then(r => r.data),
    staleTime: CACHE.DASHBOARD,
  });
}

export function useFoodLogs(date: string) {
  return useQuery({
    queryKey: queryKeys.foodLogs(date),
    queryFn: () => foodLogsAPI.get(date).then(r => r.data),
    staleTime: CACHE.TRACKER,
    placeholderData: emptyFoodLogs,
  });
}

export function useFoodSearch(query: string, includeMyItems = false) {
  const trimmed = query.trim();
  return useQuery({
    queryKey: queryKeys.foods.search(includeMyItems && !trimmed ? '__my__' : trimmed),
    queryFn: () => foodsAPI.search({ q: trimmed, limit: 20 }).then(r => r.data.foods),
    enabled: trimmed.length > 0 || includeMyItems,
    staleTime: CACHE.SEARCH,
    placeholderData: prev => prev,
  });
}

export function useAddFoodLog(date: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ food, amount, meal }: { food: any; amount: number; meal: string }) => {
      let resolved = food;
      if (food.isExternal && food.externalSource && food.externalId) {
        const res = await foodsAPI.importExternal({
          source: food.externalSource,
          externalId: food.externalId,
        });
        resolved = res.data;
      }
      const payload: any = { mealType: meal, amount, logDate: date };
      if (resolved.isRecipe) payload.recipeId = resolved.id;
      else if (resolved.isCustom) payload.customFoodId = resolved.id;
      else payload.foodId = resolved.id;
      return foodLogsAPI.add(payload);
    },
    onSuccess: () => invalidateTrackerQueries(),
  });
}

export function useDeleteFoodLog() {
  return useMutation({
    mutationFn: (id: string) => foodLogsAPI.delete(id),
    onSuccess: () => {
      toast.success('Removed');
      invalidateTrackerQueries();
    },
    onError: () => toast.error('Failed to delete'),
  });
}

export function useBarcodeLookup() {
  return useMutation({
    mutationFn: (barcode: string) => foodsAPI.getByBarcode(barcode).then(r => ({
      ...r.data,
      source: r.data.externalSource ?? 'local',
    })),
  });
}

export function useWater(date?: string) {
  return useQuery({
    queryKey: queryKeys.water(date),
    queryFn: () => waterAPI.get(date).then(r => r.data),
    staleTime: CACHE.TRACKER,
  });
}

export function useWaterGoal() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => userAPI.getSettings().then(r => r.data),
    staleTime: CACHE.STABLE,
    select: data => data?.waterGoal ?? 2000,
  });
}

export function useAddWater() {
  return useMutation({
    mutationFn: (amount: number) => waterAPI.add(amount),
    onSuccess: (_data, amount) => {
      toast.success(`Added ${amount} ml 💧`);
      invalidateTrackerQueries();
    },
    onError: () => toast.error('Failed to log water'),
  });
}

export function useDeleteWater() {
  return useMutation({
    mutationFn: (id: string) => waterAPI.delete(id),
    onSuccess: () => invalidateTrackerQueries(),
    onError: () => toast.error('Failed to delete'),
  });
}

export function useWeight(period: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.weight(period),
    queryFn: () => weightAPI.get(period).then(r => r.data),
    staleTime: CACHE.DASHBOARD,
    enabled: options?.enabled !== false,
  });
}

export function useAddWeight() {
  return useMutation({
    mutationFn: (data: { weight: number; note?: string }) => weightAPI.add(data),
    onSuccess: () => {
      toast.success('Weight logged!');
      invalidateTrackerQueries();
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to log weight'),
  });
}

export function useDeleteWeight() {
  return useMutation({
    mutationFn: (id: string) => weightAPI.delete(id),
    onSuccess: () => {
      toast.success('Removed');
      invalidateTrackerQueries();
    },
    onError: () => toast.error('Failed to delete'),
  });
}

export function useActivities(date: string) {
  return useQuery({
    queryKey: queryKeys.activities(date),
    queryFn: () => activitiesAPI.get(date).then(r => r.data),
    staleTime: CACHE.TRACKER,
  });
}

export function useActivitiesHistory(period: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.activitiesHistory(period),
    queryFn: () => activitiesAPI.getHistory(period).then(r => r.data),
    staleTime: CACHE.DASHBOARD,
    enabled: options?.enabled !== false,
  });
}

export function useAddActivity(date: string) {
  return useMutation({
    mutationFn: (data: any) => activitiesAPI.add({ ...data, logDate: date }),
    onSuccess: (_data, variables) => {
      toast.success(`${variables.name} logged!`);
      invalidateTrackerQueries();
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to log activity'),
  });
}

export function useDeleteActivity() {
  return useMutation({
    mutationFn: (id: string) => activitiesAPI.delete(id),
    onSuccess: () => {
      toast.success('Removed');
      invalidateTrackerQueries();
    },
    onError: () => toast.error('Failed to delete'),
  });
}

export function useWorkoutInsights(period = 28, enabled = true) {
  return useQuery({
    queryKey: queryKeys.workouts.insights(period),
    queryFn: () => workoutsAPI.getInsights(period).then(r => r.data),
    staleTime: CACHE.STABLE,
    enabled,
  });
}

export function useWorkoutHistory(enabled = true) {
  return useQuery({
    queryKey: queryKeys.workouts.history,
    queryFn: () => workoutsAPI.getHistory().then(r => r.data),
    staleTime: CACHE.DASHBOARD,
    enabled,
  });
}

export function useMyExercises(enabled = true) {
  return useQuery({
    queryKey: queryKeys.workouts.myExercises,
    queryFn: () => workoutsAPI.getMyExercises().then(r => r.data),
    staleTime: CACHE.STABLE,
    enabled,
  });
}

export function useActiveWorkout() {
  return useQuery({
    queryKey: queryKeys.workouts.active,
    queryFn: () => workoutsAPI.getActive().then(r => r.data),
    staleTime: CACHE.ACTIVE,
    refetchInterval: (query) => (query.state.data ? 30000 : false),
  });
}

export function useStartWorkout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name?: string) => workoutsAPI.start(name).then(r => r.data),
    onSuccess: () => {
      toast.success('Workout started — let\'s go!');
      qc.invalidateQueries({ queryKey: ['workouts'] });
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to start workout'),
  });
}

export function useAddWorkoutExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, name, muscleGroup }: { sessionId: string; name: string; muscleGroup: string }) =>
      workoutsAPI.addExercise(sessionId, { name, muscleGroup }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workouts'] }),
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to add exercise'),
  });
}

export function useAddWorkoutSet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, exerciseId, weight, reps }: { sessionId: string; exerciseId: string; weight: number; reps: number }) =>
      workoutsAPI.addSet(sessionId, exerciseId, { weight, reps }).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workouts'] }),
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to log set'),
  });
}

export function useDeleteWorkoutSet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, exerciseId, setId }: { sessionId: string; exerciseId: string; setId: string }) =>
      workoutsAPI.deleteSet(sessionId, exerciseId, setId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workouts'] }),
    onError: () => toast.error('Failed to remove set'),
  });
}

export function useCompleteWorkout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ sessionId, durationMin, notes }: { sessionId: string; durationMin?: number; notes?: string }) =>
      workoutsAPI.complete(sessionId, { durationMin, notes }).then(r => r.data),
    onSuccess: () => {
      toast.success('Workout complete — great session!');
      invalidateTrackerQueries();
      qc.invalidateQueries({ queryKey: ['workouts'] });
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to finish workout'),
  });
}

export function useCancelWorkout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => workoutsAPI.cancel(sessionId),
    onSuccess: () => {
      toast.success('Workout cancelled');
      qc.invalidateQueries({ queryKey: ['workouts'] });
    },
    onError: () => toast.error('Failed to cancel workout'),
  });
}

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => userAPI.getSettings().then(r => r.data),
    staleTime: CACHE.STABLE,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userAPI.updateProfile(data).then(r => r.data),
    onSuccess: (data) => {
      const current = useAuthStore.getState().user;
      if (current) {
        useAuthStore.getState().setUser({ ...current, ...data });
      }
      toast.success('Profile updated!');
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to update profile'),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      userAPI.changePassword(data),
    onSuccess: () => toast.success('Password changed!'),
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to change password'),
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userAPI.updateSettings(data).then(r => r.data),
    onSuccess: () => {
      toast.success('Settings saved!');
      qc.invalidateQueries({ queryKey: queryKeys.settings });
      qc.invalidateQueries({ queryKey: queryKeys.dashboard });
    },
    onError: () => toast.error('Failed to save settings'),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: queryKeys.admin.stats,
    queryFn: () => adminAPI.getStats().then(r => r.data),
  });
}

export function useAdminUsers(page: number, q: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.admin.users(page, q),
    queryFn: () => adminAPI.getUsers({ page, limit: 20, q: q || undefined }).then(r => r.data),
    enabled,
  });
}

export function useAdminFoods(page: number, q: string, enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.admin.foods(page, q),
    queryFn: () => adminAPI.getFoods({ page, limit: 20, q: q || undefined }).then(r => r.data),
    enabled,
  });
}

export function useDeleteAdminUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminAPI.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted');
      qc.invalidateQueries({ queryKey: ['admin'] });
    },
    onError: () => toast.error('Failed to delete user'),
  });
}

export function useDeleteAdminFood() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminAPI.deleteFood(id),
    onSuccess: () => {
      toast.success('Food deleted');
      qc.invalidateQueries({ queryKey: ['admin'] });
    },
    onError: () => toast.error('Failed to delete food'),
  });
}

export function useSaveAdminFood() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      data.id ? adminAPI.updateFood(data.id, data) : adminAPI.createFood(data),
    onSuccess: (_data, variables) => {
      toast.success(variables.id ? 'Food updated' : 'Food created');
      qc.invalidateQueries({ queryKey: ['admin'] });
    },
  });
}

export function useProgressData(options?: { enableActivities?: boolean }) {
  const dashboard = useDashboard();
  const weight = useWeight(30, { enabled: dashboard.isSuccess });
  const enableActivities = options?.enableActivities ?? true;
  const activities = useActivitiesHistory(30, {
    enabled: dashboard.isSuccess && enableActivities,
  });

  return {
    dashboard,
    weight,
    activities,
    isLoading: dashboard.isLoading,
    weightLoading: weight.isLoading,
    activitiesLoading: activities.isLoading,
    isError: dashboard.isError || weight.isError || activities.isError,
    weeklyData: dashboard.data?.weeklyData ?? [],
    weightLogs: weight.data?.logs ?? [],
    activityData: activities.data ?? [],
  };
}

export function useRecipes(q?: string) {
  return useQuery({
    queryKey: queryKeys.recipes(q),
    queryFn: () => recipesAPI.list(q).then(r => r.data),
  });
}

export function useRecipe(id: string, enabled = true) {
  return useQuery({
    queryKey: ['recipes', id],
    queryFn: () => recipesAPI.get(id).then(r => r.data),
    enabled: enabled && Boolean(id),
  });
}

export function useCreateRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => recipesAPI.create(data),
    onSuccess: () => {
      toast.success('Recipe saved!');
      qc.invalidateQueries({ queryKey: ['recipes'] });
      qc.invalidateQueries({ queryKey: ['foods'] });
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to save recipe'),
  });
}

export function useUpdateRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => recipesAPI.update(id, data),
    onSuccess: () => {
      toast.success('Recipe updated!');
      qc.invalidateQueries({ queryKey: ['recipes'] });
      qc.invalidateQueries({ queryKey: ['foods'] });
    },
    onError: (err: any) => toast.error(err.response?.data?.error || 'Failed to update recipe'),
  });
}

export function useDeleteRecipe() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => recipesAPI.delete(id),
    onSuccess: () => {
      toast.success('Recipe deleted');
      qc.invalidateQueries({ queryKey: ['recipes'] });
      qc.invalidateQueries({ queryKey: ['foods'] });
    },
    onError: () => toast.error('Failed to delete recipe'),
  });
}
