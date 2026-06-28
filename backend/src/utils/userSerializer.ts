import { Settings, User } from '@prisma/client';

type UserWithSettings = User & { settings?: Settings | null };

export function toAuthUser(user: UserWithSettings) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    age: user.age,
    sex: user.sex,
    height: user.height,
    currentWeight: user.currentWeight,
    goalWeight: user.goalWeight,
    activityLevel: user.activityLevel,
    gymDaysPerWeek: user.gymDaysPerWeek,
    dailyWalkKm: user.dailyWalkKm,
    gymMinutesPerSession: user.gymMinutesPerSession,
    goal: user.goal,
    goalDate: user.goalDate,
    profileCompleted: user.profileCompleted,
    isAdmin: user.isAdmin,
    settings: user.settings ?? null,
  };
}

export const DEFAULT_SETTINGS = {
  units: 'metric',
  waterGoal: 2000,
  darkMode: false,
  notifWater: true,
  notifMeals: true,
  notifWorkout: true,
  notifWeight: true,
};
