import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  dashboardAPI,
  foodLogsAPI,
  foodsAPI,
  waterAPI,
  weightAPI,
  activitiesAPI,
  userAPI,
  adminAPI,
  recipesAPI,
} from './api';
import { queryKeys, invalidateTrackerQueries } from './queryKeys';

const emptyFoodLogs = {
  byMeal: { breakfast: [], lunch: [], dinner: [], snacks: [] },
  totals: { calories: 0, protein: 0, carbs: 0, fat: 0 },
};

export function useDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => dashboardAPI.get().then(r => r.data),
  });
}

export function useFoodLogs(date: string) {
  return useQuery({
    queryKey: queryKeys.foodLogs(date),
    queryFn: () => foodLogsAPI.get(date).then(r => r.data),
    placeholderData: emptyFoodLogs,
  });
}

export function useFoodSearch(query: string, includeMyItems = false) {
  const trimmed = query.trim();
  return useQuery({
    queryKey: queryKeys.foods.search(includeMyItems && !trimmed ? '__my__' : trimmed),
    queryFn: () => foodsAPI.search({ q: trimmed, limit: 20 }).then(r => r.data.foods),
    enabled: trimmed.length > 0 || includeMyItems,
    staleTime: 2 * 60 * 1000,
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
  });
}

export function useWaterGoal() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => userAPI.getSettings().then(r => r.data),
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

export function useWeight(period: number) {
  return useQuery({
    queryKey: queryKeys.weight(period),
    queryFn: () => weightAPI.get(period).then(r => r.data),
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
  });
}

export function useActivitiesHistory(period: number) {
  return useQuery({
    queryKey: queryKeys.activitiesHistory(period),
    queryFn: () => activitiesAPI.getHistory(period).then(r => r.data),
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

export function useSettings() {
  return useQuery({
    queryKey: queryKeys.settings,
    queryFn: () => userAPI.getSettings().then(r => r.data),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => userAPI.updateProfile(data).then(r => r.data),
    onSuccess: () => {
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
    mutationFn: (data: any) => userAPI.updateSettings(data),
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

export function useProgressData() {
  const dashboard = useDashboard();
  const weight = useWeight(30);
  const activities = useActivitiesHistory(30);

  return {
    isLoading: dashboard.isLoading || weight.isLoading || activities.isLoading,
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
