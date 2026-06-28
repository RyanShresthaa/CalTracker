// Mifflin-St Jeor Equation
export function calculateBMR(
  weight: number, // kg
  height: number, // cm
  age: number,
  sex: string
): number {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

export function getActivityMultiplier(activityLevel: string): number {
  const multipliers: Record<string, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    athlete: 1.9,
  };
  return multipliers[activityLevel] || 1.2;
}

export function calculateTDEE(bmr: number, activityLevel: string): number {
  return bmr * getActivityMultiplier(activityLevel);
}

/** ~7700 kcal stored per kg of body fat */
const KCAL_PER_KG = 7700;
const DEFAULT_LOSS_DEFICIT = 500;
const DEFAULT_GAIN_SURPLUS = 300;
const MIN_DAILY_ADJUSTMENT = 250;
const MAX_LOSS_DEFICIT = 750;
const MAX_GAIN_SURPLUS = 500;

const SEDENTARY_MULTIPLIER = 1.2;
const RECOMP_DEFICIT_PCT = 0.23;
const DEFAULT_GYM_MINUTES = 55;
const WALK_MINUTES_PER_KM = 12;

export interface CalorieGoalInput {
  age?: number | null;
  sex?: string | null;
  height?: number | null;
  currentWeight?: number | null;
  goalWeight?: number | null;
  activityLevel?: string | null;
  gymDaysPerWeek?: number | null;
  dailyWalkKm?: number | null;
  gymMinutesPerSession?: number | null;
  goal?: string | null;
  goalDate?: Date | string | null;
}

export function effectiveGoal(
  currentWeight?: number | null,
  goalWeight?: number | null,
  goal?: string | null,
): 'lose_weight' | 'maintain_weight' | 'gain_weight' {
  if (goal === 'maintain_weight') return 'maintain_weight';
  if (currentWeight == null || goalWeight == null) {
    return (goal as 'lose_weight' | 'maintain_weight' | 'gain_weight') || 'maintain_weight';
  }
  const diff = goalWeight - currentWeight;
  if (Math.abs(diff) < 0.5) return 'maintain_weight';
  if (diff < 0) return 'lose_weight';
  return 'gain_weight';
}

function timelineDailyAdjustment(
  currentWeight: number,
  goalWeight: number,
  goalDate: Date | string,
  direction: 'lose_weight' | 'gain_weight',
): number | null {
  const target = new Date(goalDate);
  const weeks = (target.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7);
  if (weeks <= 0) return null;

  const weightDiff = Math.abs(currentWeight - goalWeight);
  if (weightDiff < 0.1) return null;

  const weeklyChange = weightDiff / weeks;
  const maxSafeWeekly = Math.min(currentWeight * 0.01, 1.0);
  const safeWeekly = Math.min(weeklyChange, maxSafeWeekly);
  const daily = Math.round((safeWeekly * KCAL_PER_KG) / 7);

  const capped = direction === 'lose_weight'
    ? Math.min(Math.max(daily, MIN_DAILY_ADJUSTMENT), MAX_LOSS_DEFICIT)
    : Math.min(Math.max(daily, MIN_DAILY_ADJUSTMENT), MAX_GAIN_SURPLUS);

  return direction === 'lose_weight' ? -capped : capped;
}

export interface CalorieBudget {
  bmr: number;
  sedentaryTdee: number;
  /** Extra calories from day-to-day job / walking (not gym or logged cardio) */
  neatBonus: number;
  /** Average daily burn from gym + walk/run habits (MET-based) */
  estimatedExercise: number;
  /** sedentaryTdee + neatBonus + estimatedExercise */
  maintenanceCalories: number;
  /** Eating target from weight goal */
  baseGoal: number;
  /** Logged exercise today — added to budget only for maintain/gain */
  exerciseBonus: number;
  dailyBudget: number;
}

export function usesStructuredExerciseModel(input: CalorieGoalInput): boolean {
  return (input.gymDaysPerWeek ?? 0) > 0 || (input.dailyWalkKm ?? 0) > 0;
}

/** MET-based average daily burn from gym split + daily walk/run */
export function estimateStructuredExerciseDaily(
  weightKg: number,
  gymDaysPerWeek: number,
  dailyWalkKm: number,
  gymMinutes = DEFAULT_GYM_MINUTES,
): number {
  const gymPerSession = calculateCaloriesBurned('gym', gymMinutes, weightKg);
  const gymDailyAvg = (Math.min(Math.max(gymDaysPerWeek, 0), 7) / 7) * gymPerSession;
  const walkMinutes = Math.max(0, dailyWalkKm) * WALK_MINUTES_PER_KM;
  const walkDaily = walkMinutes > 0
    ? calculateCaloriesBurned('walking', walkMinutes, weightKg)
    : 0;
  return Math.round(gymDailyAvg + walkDaily);
}

/** Job / lifestyle NEAT only — structured training is calculated separately */
function jobNeatBonus(bmr: number, activityLevel: string, gymDaysPerWeek: number): number {
  if (gymDaysPerWeek >= 3) {
    const jobMult = Math.min(getActivityMultiplier(activityLevel), 1.375);
    return bmr * Math.max(0, jobMult - SEDENTARY_MULTIPLIER);
  }
  if (gymDaysPerWeek >= 1) {
    const jobMult = Math.min(getActivityMultiplier(activityLevel), 1.55);
    return bmr * Math.max(0, jobMult - SEDENTARY_MULTIPLIER);
  }
  const activityMult = getActivityMultiplier(activityLevel);
  return bmr * Math.max(0, activityMult - SEDENTARY_MULTIPLIER);
}

function recompDeficit(maintenanceCalories: number): number {
  return Math.min(
    MAX_LOSS_DEFICIT,
    Math.max(MIN_DAILY_ADJUSTMENT, Math.round(maintenanceCalories * RECOMP_DEFICIT_PCT)),
  );
}

function goalAdjustment(
  goalType: 'lose_weight' | 'maintain_weight' | 'gain_weight',
  currentWeight: number,
  goalWeight: number | null | undefined,
  goalDate: Date | string | null | undefined,
  structuredModel: boolean,
  maintenanceCalories: number,
): number {
  if (goalType === 'maintain_weight') return 0;

  if (structuredModel && goalType === 'lose_weight') {
    let adjustment = -recompDeficit(maintenanceCalories);
    if (goalWeight != null && goalDate) {
      const fromTimeline = timelineDailyAdjustment(
        currentWeight,
        Number(goalWeight),
        goalDate,
        goalType,
      );
      if (fromTimeline != null) adjustment = fromTimeline;
    }
    return adjustment;
  }

  let adjustment = goalType === 'lose_weight' ? -DEFAULT_LOSS_DEFICIT : DEFAULT_GAIN_SURPLUS;

  if (goalWeight != null && goalDate) {
    const fromTimeline = timelineDailyAdjustment(
      currentWeight,
      Number(goalWeight),
      goalDate,
      goalType,
    );
    if (fromTimeline != null) adjustment = fromTimeline;
  }

  return adjustment;
}

function applyGoalToMaintenance(
  maintenance: number,
  bmr: number,
  adjustment: number,
  goalType: 'lose_weight' | 'maintain_weight' | 'gain_weight',
): number {
  const target = Math.round(maintenance + adjustment);
  if (goalType === 'lose_weight') {
    return Math.max(Math.round(bmr * 1.05), target);
  }
  return target;
}

/**
 * Calorie budget:
 * - Lifestyle (job/daily movement) from activity level — capped when gym days are set
 * - Gym + walk/run from MET formula (gym days, km/day)
 * - Fat loss / recomp: ~23% deficit from true expenditure; fixed intake, training drives deficit
 * - Maintain/gain: logged workouts add eat-back on top of base
 */
export function resolveCalorieBudget(
  input: CalorieGoalInput,
  exerciseBurnedToday = 0,
): CalorieBudget | null {
  const { age, sex, height, currentWeight, activityLevel } = input;
  if (!age || !sex || !height || !currentWeight || !activityLevel) return null;

  const weight = Number(currentWeight);
  const bmr = calculateBMR(weight, Number(height), Number(age), sex);
  const sedentaryTdee = bmr * SEDENTARY_MULTIPLIER;

  const gymDays = input.gymDaysPerWeek ?? 0;
  const walkKm = input.dailyWalkKm ?? 0;
  const gymMin = input.gymMinutesPerSession ?? DEFAULT_GYM_MINUTES;
  const structuredModel = usesStructuredExerciseModel(input);

  const neatBonus = structuredModel
    ? jobNeatBonus(bmr, activityLevel, gymDays)
    : bmr * Math.max(0, getActivityMultiplier(activityLevel) - SEDENTARY_MULTIPLIER);

  const estimatedExercise = structuredModel
    ? estimateStructuredExerciseDaily(weight, gymDays, walkKm, gymMin)
    : 0;

  const maintenanceCalories = sedentaryTdee + neatBonus + estimatedExercise;

  const goalType = effectiveGoal(
    weight,
    input.goalWeight != null ? Number(input.goalWeight) : null,
    input.goal,
  );

  const adjustment = goalAdjustment(
    goalType,
    weight,
    input.goalWeight,
    input.goalDate,
    structuredModel,
    maintenanceCalories,
  );
  const baseGoal = applyGoalToMaintenance(maintenanceCalories, bmr, adjustment, goalType);

  const eatBackExercise = goalType !== 'lose_weight';
  const exerciseBonus = eatBackExercise ? Math.round(Math.max(0, exerciseBurnedToday)) : 0;
  const dailyBudget = baseGoal + exerciseBonus;

  return {
    bmr: Math.round(bmr),
    sedentaryTdee: Math.round(sedentaryTdee),
    neatBonus: Math.round(neatBonus),
    estimatedExercise,
    maintenanceCalories: Math.round(maintenanceCalories),
    baseGoal,
    exerciseBonus,
    dailyBudget,
  };
}

/** Daily eating target including logged exercise (maintain/gain only) */
export function resolveDailyCalorieGoal(
  input: CalorieGoalInput,
  exerciseBurnedToday = 0,
): number | null {
  return resolveCalorieBudget(input, exerciseBurnedToday)?.dailyBudget ?? null;
}

export function calculateCalorieTargets(tdee: number, goal: string) {
  return {
    maintenance: Math.round(tdee),
    fatLoss: Math.round(tdee - 500),
    musclGain: Math.round(tdee + 300),
    aggressiveFatLoss: Math.round(tdee - 750),
    bulking: Math.round(tdee + 500),
  };
}

export function calculateMacros(calories: number, goal: string) {
  let proteinPct = 0.3;
  let fatPct = 0.25;
  let carbsPct = 0.45;

  if (goal === 'lose_weight') {
    proteinPct = 0.35;
    fatPct = 0.25;
    carbsPct = 0.4;
  } else if (goal === 'gain_weight') {
    proteinPct = 0.25;
    fatPct = 0.25;
    carbsPct = 0.5;
  }

  return {
    protein: Math.round((calories * proteinPct) / 4),
    fat: Math.round((calories * fatPct) / 9),
    carbs: Math.round((calories * carbsPct) / 4),
  };
}

export function calculateBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function estimateBodyFat(bmi: number, age: number, sex: string): number {
  if (sex === 'male') {
    return 1.2 * bmi + 0.23 * age - 16.2;
  } else {
    return 1.2 * bmi + 0.23 * age - 5.4;
  }
}

export function isGoalRealistic(
  currentWeight: number,
  goalWeight: number,
  goalDate: Date
): { realistic: boolean; message: string } {
  const today = new Date();
  const weeksAvailable = (goalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7);

  if (weeksAvailable <= 0) {
    return { realistic: false, message: 'Goal date must be in the future.' };
  }

  const weightDiff = Math.abs(currentWeight - goalWeight);
  const weeklyChange = weightDiff / weeksAvailable;

  const maxSafeWeeklyChange = Math.min(currentWeight * 0.01, 1.0);

  if (weeklyChange > maxSafeWeeklyChange) {
    return {
      realistic: false,
      message: `Your goal is not considered safe or realistic. This requires losing/gaining ${weeklyChange.toFixed(2)} kg per week, which exceeds the safe limit of ${maxSafeWeeklyChange.toFixed(2)} kg/week. Please choose a healthier target or extend your timeline.`,
    };
  }

  return { realistic: true, message: 'Goal is achievable!' };
}

// MET-based calorie calculation
export function calculateCaloriesBurned(
  activity: string,
  duration: number, // minutes
  weight: number    // kg
): number {
  const metValues: Record<string, number> = {
    walking: 3.5,
    jogging: 7.0,
    running: 9.8,
    cycling: 6.8,
    swimming: 6.0,
    gym: 5.0,
    yoga: 3.0,
    hiking: 5.3,
    dancing: 5.0,
    football: 7.0,
    basketball: 6.5,
    skipping: 12.0,
    custom: 5.0,
  };

  const met = metValues[activity.toLowerCase()] || 5.0;
  return Math.round((met * weight * duration) / 60);
}
