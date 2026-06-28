// Mifflin-St Jeor Equation
export function calculateBMR(
  weight: number, // kg
  height: number, // cm
  age: number,
  sex: string,
): number {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
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

/** TDEE = BMR × activity multiplier (maintenance calories) */
export function calculateTDEE(bmr: number, activityLevel: string): number {
  return bmr * getActivityMultiplier(activityLevel);
}

const KCAL_PER_KG = 7700;
const LOSS_SLOW = 250;
const LOSS_MODERATE = 500;
const LOSS_AGGRESSIVE = 750;
const GAIN_LEAN = 250;
const GAIN_MODERATE = 300;
const GAIN_FAST = 500;
const MIN_CALORIES_FEMALE = 1200;
const MIN_CALORIES_MALE = 1500;
const MIN_GOAL_BMI = 18.5;
const MAX_GOAL_BMI = 35;
const MAX_LOSS_RATE = 0.01; // 1% body weight / week
const MAX_GAIN_RATE = 0.005; // 0.5% body weight / week

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

export function calculateBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function validateGoalWeightBmi(
  goalWeight: number,
  height: number,
): { valid: boolean; message: string; bmi: number } {
  const bmi = calculateBMI(goalWeight, height);
  if (bmi < MIN_GOAL_BMI) {
    return {
      valid: false,
      bmi,
      message: `Goal weight gives a BMI of ${bmi}, which is below the healthy minimum of ${MIN_GOAL_BMI}. Please choose a higher target weight.`,
    };
  }
  if (bmi > MAX_GOAL_BMI) {
    return {
      valid: false,
      bmi,
      message: `Goal weight gives a BMI of ${bmi}, which exceeds the recommended maximum target of ${MAX_GOAL_BMI}. Please choose a lower target weight.`,
    };
  }
  return { valid: true, bmi, message: 'Goal weight is within a healthy BMI range.' };
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
  const maxWeekly = direction === 'lose_weight'
    ? currentWeight * MAX_LOSS_RATE
    : currentWeight * MAX_GAIN_RATE;
  const safeWeekly = Math.min(weeklyChange, maxWeekly);
  const daily = Math.round((safeWeekly * KCAL_PER_KG) / 7);

  if (direction === 'lose_weight') {
    return -Math.min(Math.max(daily, LOSS_SLOW), LOSS_AGGRESSIVE);
  }
  return Math.min(Math.max(daily, GAIN_LEAN), GAIN_FAST);
}

function minimumCalories(sex: string): number {
  return sex === 'male' ? MIN_CALORIES_MALE : MIN_CALORIES_FEMALE;
}

/** Daily calorie target from TDEE and goal (Mifflin-St Jeor standard flow). */
export function calculateGoalCalories(
  tdee: number,
  goalType: 'lose_weight' | 'maintain_weight' | 'gain_weight',
  sex: string,
  options?: {
    currentWeight?: number;
    goalWeight?: number;
    goalDate?: Date | string | null;
  },
): number {
  if (goalType === 'maintain_weight') {
    return Math.round(tdee);
  }

  let adjustment = goalType === 'lose_weight' ? -LOSS_MODERATE : GAIN_LEAN;

  if (
    options?.currentWeight != null &&
    options?.goalWeight != null &&
    options?.goalDate
  ) {
    const fromTimeline = timelineDailyAdjustment(
      options.currentWeight,
      options.goalWeight,
      options.goalDate,
      goalType,
    );
    if (fromTimeline != null) adjustment = fromTimeline;
  }

  let target = Math.round(tdee + adjustment);

  if (goalType === 'lose_weight') {
    target = Math.max(minimumCalories(sex), target);
  }

  return target;
}

export interface CalorieBudget {
  bmr: number;
  /** @deprecated Use maintenanceCalories (TDEE) */
  sedentaryTdee: number;
  /** @deprecated No longer used — activity is in TDEE multiplier */
  neatBonus: number;
  /** @deprecated No longer used in calorie budget */
  estimatedExercise: number;
  /** BMR × activity multiplier */
  maintenanceCalories: number;
  baseGoal: number;
  exerciseBonus: number;
  dailyBudget: number;
}

/** @deprecated Structured exercise is no longer subtracted from activity level */
export function usesStructuredExerciseModel(_input: CalorieGoalInput): boolean {
  return false;
}

/** @deprecated Kept for activity logging MET estimates */
export function estimateStructuredExerciseDaily(
  weightKg: number,
  gymDaysPerWeek: number,
  dailyWalkKm: number,
  gymMinutes = 55,
): number {
  const gymPerSession = calculateCaloriesBurned('gym', gymMinutes, weightKg);
  const gymDailyAvg = (Math.min(Math.max(gymDaysPerWeek, 0), 7) / 7) * gymPerSession;
  const walkMinutes = Math.max(0, dailyWalkKm) * 12;
  const walkDaily = walkMinutes > 0
    ? calculateCaloriesBurned('walking', walkMinutes, weightKg)
    : 0;
  return Math.round(gymDailyAvg + walkDaily);
}

/**
 * Calorie budget using standard Mifflin-St Jeor + activity multiplier:
 * BMR → TDEE → goal adjustment (maintain / −500 cut / +250 lean bulk).
 */
export function resolveCalorieBudget(
  input: CalorieGoalInput,
  _exerciseBurnedToday = 0,
): CalorieBudget | null {
  const { age, sex, height, currentWeight, activityLevel } = input;
  if (!age || !sex || !height || !currentWeight || !activityLevel) return null;

  const weight = Number(currentWeight);
  const bmr = calculateBMR(weight, Number(height), Number(age), sex);
  const tdee = calculateTDEE(bmr, activityLevel);

  const goalType = effectiveGoal(
    weight,
    input.goalWeight != null ? Number(input.goalWeight) : null,
    input.goal,
  );

  const baseGoal = calculateGoalCalories(tdee, goalType, sex, {
    currentWeight: weight,
    goalWeight: input.goalWeight != null ? Number(input.goalWeight) : undefined,
    goalDate: input.goalDate,
  });

  return {
    bmr: Math.round(bmr),
    sedentaryTdee: Math.round(bmr * 1.2),
    neatBonus: 0,
    estimatedExercise: 0,
    maintenanceCalories: Math.round(tdee),
    baseGoal,
    exerciseBonus: 0,
    dailyBudget: baseGoal,
  };
}

export function resolveDailyCalorieGoal(
  input: CalorieGoalInput,
  exerciseBurnedToday = 0,
): number | null {
  return resolveCalorieBudget(input, exerciseBurnedToday)?.dailyBudget ?? null;
}

export function calculateCalorieTargets(tdee: number) {
  const maintenance = Math.round(tdee);
  return {
    maintenance,
    fatLossSlow: Math.round(tdee - LOSS_SLOW),
    fatLoss: Math.round(tdee - LOSS_MODERATE),
    musclGain: Math.round(tdee + GAIN_MODERATE),
    aggressiveFatLoss: Math.round(tdee - LOSS_AGGRESSIVE),
    leanBulk: Math.round(tdee + GAIN_LEAN),
    bulking: Math.round(tdee + GAIN_FAST),
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

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export function estimateBodyFat(bmi: number, age: number, sex: string): number {
  if (sex === 'male') {
    return 1.2 * bmi + 0.23 * age - 16.2;
  }
  return 1.2 * bmi + 0.23 * age - 5.4;
}

export function isGoalRealistic(
  currentWeight: number,
  goalWeight: number,
  goalDate: Date,
  height: number,
  direction: 'lose_weight' | 'gain_weight',
): { realistic: boolean; message: string } {
  const bmiCheck = validateGoalWeightBmi(goalWeight, height);
  if (!bmiCheck.valid) {
    return { realistic: false, message: bmiCheck.message };
  }

  const today = new Date();
  const weeksAvailable = (goalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7);

  if (weeksAvailable <= 0) {
    return { realistic: false, message: 'Goal date must be in the future.' };
  }

  const weightDiff = Math.abs(currentWeight - goalWeight);
  const weeklyChange = weightDiff / weeksAvailable;

  const maxSafeWeekly = direction === 'lose_weight'
    ? currentWeight * MAX_LOSS_RATE
    : currentWeight * MAX_GAIN_RATE;

  if (weeklyChange > maxSafeWeekly) {
    const pct = direction === 'lose_weight' ? '1%' : '0.5%';
    return {
      realistic: false,
      message: `Your goal requires ${weeklyChange.toFixed(2)} kg/week, which exceeds the safe limit of ~${maxSafeWeekly.toFixed(2)} kg/week (max ${pct} of body weight). Please extend your timeline or adjust your goal.`,
    };
  }

  return { realistic: true, message: 'Goal is achievable!' };
}

// MET-based calorie calculation for logged activities
export function calculateCaloriesBurned(
  activity: string,
  duration: number, // minutes
  weight: number, // kg
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
