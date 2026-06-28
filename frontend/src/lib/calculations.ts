/** Client-side calorie math — mirrors backend Mifflin-St Jeor standard flow. */

export function calculateBMR(weight: number, height: number, age: number, sex: string): number {
  if (sex === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

export function calculateTDEE(bmr: number, activityLevel: string): number {
  return bmr * (ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.2);
}

export function calculateBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return Math.round((weight / (heightM * heightM)) * 10) / 10;
}

export function effectiveGoal(
  currentWeight?: number,
  goalWeight?: number,
  goal?: string,
): 'lose_weight' | 'maintain_weight' | 'gain_weight' {
  if (goal === 'maintain_weight') return 'maintain_weight';
  if (!currentWeight || !goalWeight) return (goal as 'lose_weight' | 'maintain_weight' | 'gain_weight') || 'maintain_weight';
  const diff = goalWeight - currentWeight;
  if (Math.abs(diff) < 0.5) return 'maintain_weight';
  if (diff < 0) return 'lose_weight';
  return 'gain_weight';
}

const LOSS_MODERATE = 500;
const GAIN_LEAN = 250;
const MIN_CALORIES_FEMALE = 1200;
const MIN_CALORIES_MALE = 1500;
const MIN_GOAL_BMI = 18.5;
const MAX_GOAL_BMI = 35;
const MAX_LOSS_RATE = 0.01;
const MAX_GAIN_RATE = 0.005;
const KCAL_PER_KG = 7700;

export function validateGoalWeightBmi(goalWeight: number, height: number): { valid: boolean; message: string; bmi: number } {
  const bmi = calculateBMI(goalWeight, height);
  if (bmi < MIN_GOAL_BMI) {
    return {
      valid: false,
      bmi,
      message: `Goal weight gives a BMI of ${bmi}, which is below the healthy minimum of ${MIN_GOAL_BMI}.`,
    };
  }
  if (bmi > MAX_GOAL_BMI) {
    return {
      valid: false,
      bmi,
      message: `Goal weight gives a BMI of ${bmi}, which exceeds the recommended maximum of ${MAX_GOAL_BMI}.`,
    };
  }
  return { valid: true, bmi, message: 'OK' };
}

export function calculateGoalCalories(
  tdee: number,
  goalType: 'lose_weight' | 'maintain_weight' | 'gain_weight',
  sex: string,
  options?: {
    currentWeight?: number;
    goalWeight?: number;
    goalDate?: string;
  },
): number {
  if (goalType === 'maintain_weight') return Math.round(tdee);

  let adjustment = goalType === 'lose_weight' ? -LOSS_MODERATE : GAIN_LEAN;

  if (options?.currentWeight != null && options?.goalWeight != null && options?.goalDate) {
    const weeks = (new Date(options.goalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7);
    if (weeks > 0) {
      const diff = Math.abs(options.currentWeight - options.goalWeight);
      const weekly = diff / weeks;
      const maxWeekly = goalType === 'lose_weight'
        ? options.currentWeight * MAX_LOSS_RATE
        : options.currentWeight * MAX_GAIN_RATE;
      const safeWeekly = Math.min(weekly, maxWeekly);
      const daily = Math.round((safeWeekly * KCAL_PER_KG) / 7);
      adjustment = goalType === 'lose_weight'
        ? -Math.min(Math.max(daily, 250), 750)
        : Math.min(Math.max(daily, GAIN_LEAN), 500);
    }
  }

  let target = Math.round(tdee + adjustment);
  if (goalType === 'lose_weight') {
    const floor = sex === 'male' ? MIN_CALORIES_MALE : MIN_CALORIES_FEMALE;
    target = Math.max(floor, target);
  }
  return target;
}

export function calculateCalorieTargets(tdee: number) {
  return {
    maintenance: Math.round(tdee),
    fatLoss: Math.round(tdee - 500),
    leanBulk: Math.round(tdee + 250),
    aggressiveFatLoss: Math.round(tdee - 750),
    bulking: Math.round(tdee + 500),
  };
}

export function checkGoalRealistic(
  currentWeight: number,
  goalWeight: number,
  height: number,
  goalDate: string | undefined,
  goal: string,
): string | null {
  if (goal === 'maintain_weight') return null;

  const bmiCheck = validateGoalWeightBmi(goalWeight, height);
  if (!bmiCheck.valid) return bmiCheck.message;

  if (!goalDate) return null;

  const weeks = (new Date(goalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7);
  if (weeks <= 0) return 'Goal date must be in the future.';

  const direction = goalWeight < currentWeight ? 'lose_weight' : 'gain_weight';
  const diff = Math.abs(currentWeight - goalWeight);
  const weeklyChange = diff / weeks;
  const maxSafe = direction === 'lose_weight'
    ? currentWeight * MAX_LOSS_RATE
    : currentWeight * MAX_GAIN_RATE;

  if (weeklyChange > maxSafe) {
    const pct = direction === 'lose_weight' ? '1%' : '0.5%';
    return `Your goal requires ${weeklyChange.toFixed(2)} kg/week, which exceeds the safe limit of ~${maxSafe.toFixed(2)} kg/week (max ${pct} of body weight). Please extend your timeline or adjust your goal.`;
  }

  return null;
}
