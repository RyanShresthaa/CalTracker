import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, CheckCircle, Warning } from 'phosphor-react';
import { authAPI } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const schema = z.object({
  age: z.coerce.number().int().min(13, 'Min age 13').max(100, 'Max age 100'),
  sex: z.enum(['male', 'female'], { required_error: 'Please select sex' }),
  height: z.coerce.number().min(100, 'Min 100 cm').max(250, 'Max 250 cm'),
  currentWeight: z.coerce.number().min(30, 'Min 30 kg').max(300, 'Max 300 kg'),
  goalWeight: z.coerce.number().min(30, 'Min 30 kg').max(300, 'Max 300 kg'),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'athlete']),
  gymDaysPerWeek: z.coerce.number().int().min(0).max(7),
  dailyWalkKm: z.coerce.number().min(0).max(50),
  gymMinutesPerSession: z.coerce.number().int().min(15).max(180),
  goal: z.enum(['lose_weight', 'maintain_weight', 'gain_weight']),
  goalDate: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const activityOptions = [
  { value: 'sedentary', label: 'Mostly seated', desc: 'Desk job, little walking between tasks', emoji: '🪑' },
  { value: 'lightly_active', label: 'Light daily movement', desc: 'Some walking, errands, standing briefly', emoji: '🚶' },
  { value: 'moderately_active', label: 'On your feet often', desc: 'Retail, teaching, frequent movement at work', emoji: '🏃' },
];

const goalOptions = [
  { value: 'lose_weight', label: 'Lose Weight', desc: 'Burn fat and get leaner', emoji: '🔥', color: 'red' },
  { value: 'maintain_weight', label: 'Maintain Weight', desc: 'Stay at current weight', emoji: '⚖️', color: 'blue' },
  { value: 'gain_weight', label: 'Gain Weight', desc: 'Build muscle and mass', emoji: '💪', color: 'green' },
];

function calcBMR(w: number, h: number, a: number, s: string) {
  const weight = Number(w);
  const height = Number(h);
  const age = Number(a);
  if (s === 'male') return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

function effectiveGoalFromWeights(current?: number, goal?: number, selected?: string) {
  if (selected === 'maintain_weight') return 'maintain_weight';
  if (!current || !goal) return selected || 'maintain_weight';
  const diff = Number(goal) - Number(current);
  if (Math.abs(diff) < 0.5) return 'maintain_weight';
  if (diff < 0) return 'lose_weight';
  return 'gain_weight';
}

const SEDENTARY_MULT = 1.2;
const RECOMP_DEFICIT_PCT = 0.23;
const WALK_MIN_PER_KM = 12;

function calcExerciseBurn(weight: number, gymDays: number, walkKm: number, gymMin: number) {
  const gymSession = Math.round((5 * weight * gymMin) / 60);
  const gymDaily = (Math.min(Math.max(gymDays, 0), 7) / 7) * gymSession;
  const walkMin = Math.max(0, walkKm) * WALK_MIN_PER_KM;
  const walkDaily = walkMin > 0 ? Math.round((3.5 * weight * walkMin) / 60) : 0;
  return Math.round(gymDaily + walkDaily);
}

function jobNeat(bmr: number, level: string, gymDays: number) {
  const mults: Record<string, number> = {
    sedentary: 1.2, lightly_active: 1.375, moderately_active: 1.55, very_active: 1.725, athlete: 1.9,
  };
  let mult = mults[level] || 1.2;
  if (gymDays >= 3) mult = Math.min(mult, 1.375);
  else if (gymDays >= 1) mult = Math.min(mult, 1.55);
  return bmr * Math.max(0, mult - SEDENTARY_MULT);
}

function resolveDailyGoal(input: {
  age?: number; sex?: string; height?: number; currentWeight?: number;
  goalWeight?: number; activityLevel?: string; goal?: string; goalDate?: string;
  gymDaysPerWeek?: number; dailyWalkKm?: number; gymMinutesPerSession?: number;
}) {
  const { age, sex, height, currentWeight, activityLevel } = input;
  if (!age || !sex || !height || !currentWeight || !activityLevel) return null;

  const weight = Number(currentWeight);
  const bmr = calcBMR(weight, Number(height), Number(age), sex);
  const sedentaryTdee = bmr * SEDENTARY_MULT;
  const gymDays = input.gymDaysPerWeek ?? 0;
  const walkKm = input.dailyWalkKm ?? 0;
  const gymMin = input.gymMinutesPerSession ?? 55;
  const structured = gymDays > 0 || walkKm > 0;
  const neatBonus = structured ? jobNeat(bmr, activityLevel, gymDays) : bmr * Math.max(0, (actMult[activityLevel] || SEDENTARY_MULT) - SEDENTARY_MULT);
  const estimatedExercise = structured ? calcExerciseBurn(weight, gymDays, walkKm, gymMin) : 0;
  const maintenance = sedentaryTdee + neatBonus + estimatedExercise;
  const goalType = effectiveGoalFromWeights(weight, input.goalWeight, input.goal);

  let adjustment = 0;
  if (goalType === 'lose_weight') {
    adjustment = structured
      ? -Math.min(750, Math.max(250, Math.round(maintenance * RECOMP_DEFICIT_PCT)))
      : -500;
  } else if (goalType === 'gain_weight') adjustment = 300;

  if (input.goalWeight != null && input.goalDate && goalType !== 'maintain_weight') {
    const weeks = (new Date(input.goalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7);
    if (weeks > 0) {
      const diff = Math.abs(weight - Number(input.goalWeight));
      const weekly = Math.min(diff / weeks, Math.min(weight * 0.01, 1));
      const daily = Math.round((weekly * 7700) / 7);
      const capped = goalType === 'lose_weight'
        ? Math.min(Math.max(daily, 250), 750)
        : Math.min(Math.max(daily, 250), 500);
      adjustment = goalType === 'lose_weight' ? -capped : capped;
    }
  }

  let baseGoal = Math.round(maintenance + adjustment);
  if (goalType === 'lose_weight') baseGoal = Math.max(Math.round(bmr * 1.05), baseGoal);
  return baseGoal;
}

function resolveMaintenance(input: Parameters<typeof resolveDailyGoal>[0]) {
  const { age, sex, height, currentWeight, activityLevel } = input;
  if (!age || !sex || !height || !currentWeight || !activityLevel) return null;
  const weight = Number(currentWeight);
  const bmr = calcBMR(weight, Number(height), Number(age), sex);
  const gymDays = input.gymDaysPerWeek ?? 0;
  const walkKm = input.dailyWalkKm ?? 0;
  const structured = gymDays > 0 || walkKm > 0;
  const neatBonus = structured ? jobNeat(bmr, activityLevel, gymDays) : bmr * Math.max(0, (actMult[activityLevel] || SEDENTARY_MULT) - SEDENTARY_MULT);
  const estimatedExercise = structured ? calcExerciseBurn(weight, gymDays, walkKm, input.gymMinutesPerSession ?? 55) : 0;
  return Math.round(bmr * SEDENTARY_MULT + neatBonus + estimatedExercise);
}
const actMult: Record<string, number> = {
  sedentary: 1.2, lightly_active: 1.375, moderately_active: 1.55, very_active: 1.725, athlete: 1.9
};

export default function CompleteProfilePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [goalError, setGoalError] = useState('');
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const totalSteps = 4;

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      activityLevel: 'sedentary',
      goal: 'maintain_weight',
      gymDaysPerWeek: 0,
      dailyWalkKm: 0,
      gymMinutesPerSession: 55,
    },
  });

  const watched = watch();

  const checkGoalRealism = () => {
    const { currentWeight, goalWeight, goal, goalDate } = watched;
    if (!currentWeight || !goalWeight || !goalDate || goal === 'maintain_weight') {
      setGoalError(''); return true;
    }
    const weeks = (new Date(goalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7);
    if (weeks <= 0) { setGoalError('Goal date must be in the future.'); return false; }
    const diff = Math.abs(currentWeight - goalWeight);
    const weeklyChange = diff / weeks;
    const maxSafe = Math.min(currentWeight * 0.01, 1.0);
    if (weeklyChange > maxSafe) {
      setGoalError(`Your goal requires losing/gaining ${weeklyChange.toFixed(2)} kg/week which is unsafe. Max safe is ${maxSafe.toFixed(2)} kg/week. Please extend your timeline or adjust your goal.`);
      return false;
    }
    setGoalError(''); return true;
  };

  const onSubmit = async (data: FormData) => {
    if (!checkGoalRealism()) return;
    setLoading(true);
    try {
      const res = await authAPI.completeProfile(data);
      setUser(res.data.user);
      toast.success('Profile set up! Let\'s start tracking 🎉');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 3) checkGoalRealism();
    setStep(s => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // Live calorie preview
  const bmr = watched.currentWeight && watched.height && watched.age && watched.sex
    ? calcBMR(watched.currentWeight, watched.height, watched.age, watched.sex) : null;
  const gymDays = Number(watched.gymDaysPerWeek) || 0;
  const walkKm = Number(watched.dailyWalkKm) || 0;
  const structured = gymDays > 0 || walkKm > 0;
  const neatBonus = bmr && watched.activityLevel
    ? (structured ? jobNeat(bmr, watched.activityLevel, gymDays) : bmr * Math.max(0, (actMult[watched.activityLevel] || SEDENTARY_MULT) - SEDENTARY_MULT))
    : null;
  const estimatedExercise = bmr && structured
    ? calcExerciseBurn(Number(watched.currentWeight), gymDays, walkKm, Number(watched.gymMinutesPerSession) || 55)
    : 0;
  const tdee = resolveMaintenance({
    age: Number(watched.age),
    sex: watched.sex,
    height: Number(watched.height),
    currentWeight: Number(watched.currentWeight),
    activityLevel: watched.activityLevel,
    gymDaysPerWeek: gymDays,
    dailyWalkKm: walkKm,
    gymMinutesPerSession: Number(watched.gymMinutesPerSession) || 55,
  });
  const effectiveGoal = effectiveGoalFromWeights(
    watched.currentWeight, watched.goalWeight, watched.goal,
  );
  const dailyGoal = resolveDailyGoal({
    age: Number(watched.age),
    sex: watched.sex,
    height: Number(watched.height),
    currentWeight: Number(watched.currentWeight),
    goalWeight: watched.goalWeight ? Number(watched.goalWeight) : undefined,
    activityLevel: watched.activityLevel,
    goal: watched.goal,
    goalDate: watched.goalDate,
    gymDaysPerWeek: gymDays,
    dailyWalkKm: walkKm,
    gymMinutesPerSession: Number(watched.gymMinutesPerSession) || 55,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card animate-in">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Basic Information</h2>
                  <p className="text-slate-500 mt-1">Tell us about yourself to personalize your experience</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Age</label>
                    <input {...register('age')} type="number" placeholder="e.g. 25" className="input" />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                  </div>
                  <div>
                    <label className="label">Sex</label>
                    <select {...register('sex')} className="input">
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex.message}</p>}
                  </div>
                  <div>
                    <label className="label">Height (cm)</label>
                    <input {...register('height')} type="number" placeholder="e.g. 175" className="input" />
                    {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height.message}</p>}
                  </div>
                  <div>
                    <label className="label">Current Weight (kg)</label>
                    <input {...register('currentWeight')} type="number" step="0.1" placeholder="e.g. 70" className="input" />
                    {errors.currentWeight && <p className="text-red-500 text-xs mt-1">{errors.currentWeight.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Lifestyle + training */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Training & Movement</h2>
                  <p className="text-slate-500 mt-1">We calculate calories from your actual routine — not vague labels like “very active”</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label">Gym / lifting days per week</label>
                    <input {...register('gymDaysPerWeek')} type="number" min={0} max={7} className="input" />
                    <p className="text-[11px] text-slate-400 mt-1">Bro-split, PPL, etc.</p>
                  </div>
                  <div>
                    <label className="label">Typical gym session (min)</label>
                    <input {...register('gymMinutesPerSession')} type="number" min={15} max={180} className="input" />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Daily walk / run (km)</label>
                    <input {...register('dailyWalkKm')} type="number" step="0.1" min={0} className="input" placeholder="e.g. 3.5" />
                    <p className="text-[11px] text-slate-400 mt-1">Average distance you walk or jog each day</p>
                  </div>
                </div>
                <div>
                  <p className="label mb-2">Day job / lifestyle (outside gym)</p>
                  <div className="space-y-3">
                    {activityOptions.map(opt => (
                      <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                        ${watched.activityLevel === opt.value
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'}`}>
                        <input type="radio" {...register('activityLevel')} value={opt.value} className="sr-only" />
                        <span className="text-2xl">{opt.emoji}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{opt.label}</p>
                          <p className="text-sm text-slate-500">{opt.desc}</p>
                        </div>
                        {watched.activityLevel === opt.value && (
                          <CheckCircle size={22} weight="fill" className="text-indigo-500 shrink-0" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Goals</h2>
                  <p className="text-slate-500 mt-1">What do you want to achieve?</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {goalOptions.map(opt => (
                    <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${watched.goal === opt.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'}`}>
                      <input type="radio" {...register('goal')} value={opt.value} className="sr-only" />
                      <span className="text-2xl">{opt.emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 dark:text-white">{opt.label}</p>
                        <p className="text-sm text-slate-500">{opt.desc}</p>
                      </div>
                      {watched.goal === opt.value && <CheckCircle size={22} weight="fill" className="text-indigo-500" />}
                    </label>
                  ))}
                </div>
                {watched.goal !== 'maintain_weight' && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="label">Goal Weight (kg)</label>
                      <input {...register('goalWeight')} type="number" step="0.1" placeholder="e.g. 68" className="input"
                        onChange={e => {
                          register('goalWeight').onChange(e);
                          const gw = parseFloat(e.target.value);
                          const cw = Number(watched.currentWeight);
                          if (cw && gw && Math.abs(gw - cw) >= 0.5) {
                            setValue('goal', gw < cw ? 'lose_weight' : 'gain_weight');
                          }
                        }} />
                      {errors.goalWeight && <p className="text-red-500 text-xs mt-1">{errors.goalWeight.message}</p>}
                      {watched.currentWeight && watched.goalWeight && (
                        <p className="text-[11px] text-slate-400 mt-1">
                          {Number(watched.goalWeight) < Number(watched.currentWeight)
                            ? `Losing ${(Number(watched.currentWeight) - Number(watched.goalWeight)).toFixed(1)} kg`
                            : Number(watched.goalWeight) > Number(watched.currentWeight)
                              ? `Gaining ${(Number(watched.goalWeight) - Number(watched.currentWeight)).toFixed(1)} kg`
                              : 'Maintaining current weight'}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label">Target Date</label>
                      <input {...register('goalDate')} type="date"
                        min={new Date().toISOString().split('T')[0]} className="input" />
                    </div>
                  </div>
                )}
                {goalError && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    <Warning size={18} className="shrink-0 mt-0.5" />
                    <span>{goalError}</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Calorie Plan 🎉</h2>
                  <p className="text-slate-500 mt-1">Here's your personalized daily target</p>
                </div>
                {tdee && (
                  <div className="space-y-4">
                    {dailyGoal != null && (
                      <div className="text-center p-5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wide font-medium mb-1">
                          Your daily calorie target
                        </p>
                        <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{dailyGoal}</p>
                        <p className="text-sm text-slate-500 mt-1">kcal / day · {effectiveGoal.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-slate-400 mt-2">
                          {effectiveGoal === 'lose_weight'
                            ? 'Fixed intake — gym & cardio create your deficit (body recomp friendly)'
                            : '+ logged workouts add extra calories on training days'}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Total burn', cal: Math.round(tdee!), highlight: effectiveGoal === 'maintain_weight' },
                        { label: 'Fat loss / recomp', cal: dailyGoal ?? 0, highlight: effectiveGoal === 'lose_weight' },
                        { label: 'Muscle gain', cal: Math.round(tdee! + 300), highlight: effectiveGoal === 'gain_weight' && !watched.goalDate },
                      ].map(item => (
                        <div key={item.label} className={`text-center p-3 rounded-xl border ${
                          item.highlight
                            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30'
                        }`}>
                          <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{item.cal}</p>
                          <p className="text-xs text-slate-500 mt-1">{item.label}</p>
                          <p className="text-xs text-slate-400">kcal/day</p>
                        </div>
                      ))}
                    </div>
                    {watched.goalDate && dailyGoal != null && (
                      <p className="text-xs text-slate-500 text-center">
                        Target adjusted for your goal date (safe rate, max ~1 kg/week)
                      </p>
                    )}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">BMR</span>
                        <span className="font-medium">{Math.round(bmr!)} kcal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Day job / lifestyle</span>
                        <span className="font-medium">+{Math.round(neatBonus ?? 0)} kcal</span>
                      </div>
                      {estimatedExercise > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Gym + walk/run (avg/day)</span>
                          <span className="font-medium">+{estimatedExercise} kcal</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Total expenditure (avg)</span>
                        <span className="font-medium">{Math.round(tdee!)} kcal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Your Goal</span>
                        <span className="font-medium capitalize">{watched.goal?.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 text-sm text-indigo-700 dark:text-indigo-300">
                      <p className="font-semibold mb-1">📊 Calculated using Mifflin-St Jeor Equation</p>
                      <p className="text-xs opacity-80">Your plan will adjust as you log data. You can change goals anytime in Settings.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button type="button" onClick={prevStep} disabled={step === 1}
                className={`flex items-center gap-2 ${step === 1 ? 'invisible' : 'btn-secondary'}`}>
                <ArrowLeft size={18} /> Back
              </button>
              {step < totalSteps ? (
                <button type="button" onClick={nextStep} className="btn-primary flex items-center gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                  {loading
                    ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <>Start Tracking <ArrowRight size={18} /></>}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
