import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { authAPI } from '../lib/api';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { toast } from 'sonner';
import {
  calculateBMR,
  calculateTDEE,
  calculateGoalCalories,
  calculateCalorieTargets,
  effectiveGoal,
  checkGoalRealistic,
} from '../lib/calculations';

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
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise, desk job', emoji: '🪑' },
  { value: 'lightly_active', label: 'Light', desc: 'Exercise 1–3 days per week', emoji: '🚶' },
  { value: 'moderately_active', label: 'Moderate', desc: 'Exercise 3–5 days per week', emoji: '🏃' },
  { value: 'very_active', label: 'Very Active', desc: 'Exercise 6–7 days per week', emoji: '🏋️' },
  { value: 'athlete', label: 'Athlete', desc: 'Very hard exercise or physical job', emoji: '⚡' },
];

const goalOptions = [
  { value: 'lose_weight', label: 'Lose Weight', desc: 'Burn fat and get leaner', emoji: '🔥' },
  { value: 'maintain_weight', label: 'Maintain Weight', desc: 'Stay at current weight', emoji: '⚖️' },
  { value: 'gain_weight', label: 'Gain Weight', desc: 'Build muscle and mass', emoji: '💪' },
];

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
    const { currentWeight, goalWeight, goal, goalDate, height } = watched;
    if (!currentWeight || !goalWeight || !height || goal === 'maintain_weight') {
      setGoalError('');
      return true;
    }
    const err = checkGoalRealistic(
      Number(currentWeight),
      Number(goalWeight),
      Number(height),
      goalDate,
      goal,
    );
    if (err) {
      setGoalError(err);
      return false;
    }
    setGoalError('');
    return true;
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

  const bmr = watched.currentWeight && watched.height && watched.age && watched.sex
    ? calculateBMR(Number(watched.currentWeight), Number(watched.height), Number(watched.age), watched.sex)
    : null;
  const tdee = bmr && watched.activityLevel
    ? Math.round(calculateTDEE(bmr, watched.activityLevel))
    : null;
  const effectiveGoalType = effectiveGoal(
    watched.currentWeight ? Number(watched.currentWeight) : undefined,
    watched.goalWeight ? Number(watched.goalWeight) : undefined,
    watched.goal,
  );
  const dailyGoal = tdee && watched.sex
    ? calculateGoalCalories(tdee, effectiveGoalType, watched.sex, {
        currentWeight: watched.currentWeight ? Number(watched.currentWeight) : undefined,
        goalWeight: watched.goalWeight ? Number(watched.goalWeight) : undefined,
        goalDate: watched.goalDate,
      })
    : null;
  const targets = tdee ? calculateCalorieTargets(tdee) : null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted mb-2 font-mono">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardContent className="pt-6">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="page-title">Basic Information</h2>
                  <p className="page-subtitle">Tell us about yourself to personalize your experience</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" {...register('age')} type="number" placeholder="e.g. 25" className="mt-1.5" />
                    {errors.age && <p className="text-destructive text-xs mt-1">{errors.age.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="sex">Sex</Label>
                    <select {...register('sex')} id="sex" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors mt-1.5">
                      <option value="">Select...</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.sex && <p className="text-destructive text-xs mt-1">{errors.sex.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input id="height" {...register('height')} type="number" placeholder="e.g. 175" className="mt-1.5" />
                    {errors.height && <p className="text-destructive text-xs mt-1">{errors.height.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                    <Input id="currentWeight" {...register('currentWeight')} type="number" step="0.1" placeholder="e.g. 70" className="mt-1.5" />
                    {errors.currentWeight && <p className="text-destructive text-xs mt-1">{errors.currentWeight.message}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="page-title">Activity Level</h2>
                  <p className="page-subtitle">Used with Mifflin-St Jeor to calculate your maintenance calories (TDEE)</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gymDaysPerWeek">Gym days per week (optional)</Label>
                    <Input id="gymDaysPerWeek" {...register('gymDaysPerWeek')} type="number" min={0} max={7} className="mt-1.5" />
                    <p className="text-[11px] text-muted-foreground mt-1">For workout tracking only</p>
                  </div>
                  <div>
                    <Label htmlFor="gymMinutesPerSession">Typical session (min)</Label>
                    <Input id="gymMinutesPerSession" {...register('gymMinutesPerSession')} type="number" min={15} max={180} className="mt-1.5" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="dailyWalkKm">Daily walk / run (km, optional)</Label>
                    <Input id="dailyWalkKm" {...register('dailyWalkKm')} type="number" step="0.1" min={0} className="mt-1.5" placeholder="e.g. 3.5" />
                  </div>
                </div>
                <div>
                  <p className="label mb-2">How active are you?</p>
                  <div className="space-y-3">
                    {activityOptions.map(opt => (
                      <label
                        key={opt.value}
                        className={`option-card flex items-center gap-4 ${watched.activityLevel === opt.value ? 'option-card-selected' : ''}`}
                      >
                        <input type="radio" {...register('activityLevel')} value={opt.value} className="sr-only" />
                        <span className="text-2xl">{opt.emoji}</span>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{opt.label}</p>
                          <p className="text-sm text-muted">{opt.desc}</p>
                        </div>
                        {watched.activityLevel === opt.value && (
                          <CheckCircle className="h-[22px] w-[22px] text-accent shrink-0" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="page-title">Your Goals</h2>
                  <p className="page-subtitle">What do you want to achieve?</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {goalOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={`option-card flex items-center gap-4 ${watched.goal === opt.value ? 'option-card-selected' : ''}`}
                    >
                      <input type="radio" {...register('goal')} value={opt.value} className="sr-only" />
                      <span className="text-2xl">{opt.emoji}</span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{opt.label}</p>
                        <p className="text-sm text-muted">{opt.desc}</p>
                      </div>
                      {watched.goal === opt.value && <CheckCircle className="h-[22px] w-[22px] text-accent" />}
                    </label>
                  ))}
                </div>
                {watched.goal !== 'maintain_weight' && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                      <Input id="goalWeight" {...register('goalWeight')} type="number" step="0.1" placeholder="e.g. 68" className="mt-1.5"
                        onChange={e => {
                          register('goalWeight').onChange(e);
                          const gw = parseFloat(e.target.value);
                          const cw = Number(watched.currentWeight);
                          if (cw && gw && Math.abs(gw - cw) >= 0.5) {
                            setValue('goal', gw < cw ? 'lose_weight' : 'gain_weight');
                          }
                        }} />
                      {errors.goalWeight && <p className="text-destructive text-xs mt-1">{errors.goalWeight.message}</p>}
                      {watched.currentWeight && watched.goalWeight && (
                        <p className="text-[11px] text-muted mt-1">
                          {Number(watched.goalWeight) < Number(watched.currentWeight)
                            ? `Losing ${(Number(watched.currentWeight) - Number(watched.goalWeight)).toFixed(1)} kg`
                            : Number(watched.goalWeight) > Number(watched.currentWeight)
                              ? `Gaining ${(Number(watched.goalWeight) - Number(watched.currentWeight)).toFixed(1)} kg`
                              : 'Maintaining current weight'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="goalDate">Target Date</Label>
                      <Input id="goalDate" {...register('goalDate')} type="date"
                        min={new Date().toISOString().split('T')[0]} className="mt-1.5" />
                    </div>
                  </div>
                )}
                {goalError && (
                  <div className="callout flex items-start gap-2 text-destructive text-sm">
                    <AlertTriangle className="h-[18px] w-[18px] shrink-0 mt-0.5" />
                    <span>{goalError}</span>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="page-title">Your Calorie Plan</h2>
                  <p className="page-subtitle">Here's your personalized daily target</p>
                </div>
                {tdee && targets && (
                  <div className="space-y-4">
                    {dailyGoal != null && (
                      <div className="text-center callout">
                        <p className="label-caps mb-2">Your daily calorie target</p>
                        <p className="stat-value text-foreground">{dailyGoal}</p>
                        <p className="text-sm text-muted-foreground mt-1">kcal / day · {effectiveGoalType.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {effectiveGoalType === 'lose_weight'
                            ? 'Moderate fat loss: TDEE − 500 kcal (minimum 1,200 women / 1,500 men)'
                            : effectiveGoalType === 'gain_weight'
                              ? 'Lean bulk: TDEE + 250 kcal'
                              : 'Maintenance: eat at your TDEE'}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Maintain', cal: targets.maintenance, highlight: effectiveGoalType === 'maintain_weight' },
                        { label: 'Fat loss', cal: targets.fatLoss, highlight: effectiveGoalType === 'lose_weight' },
                        { label: 'Lean bulk', cal: targets.leanBulk, highlight: effectiveGoalType === 'gain_weight' },
                      ].map(item => (
                        <div
                          key={item.label}
                          className={`text-center p-3 border ${item.highlight ? 'option-card-selected' : 'border-border bg-background'}`}
                        >
                          <p className="text-xl text-foreground">{item.cal}</p>
                          <p className="label-caps mt-1">{item.label}</p>
                          <p className="text-xs text-muted-foreground">kcal/day</p>
                        </div>
                      ))}
                    </div>
                    {watched.goalDate && dailyGoal != null && (
                      <p className="text-xs text-muted-foreground text-center">
                        Target adjusted for your goal date (max ~1% body weight loss or 0.5% gain per week)
                      </p>
                    )}
                    <div className="callout space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">BMR (Mifflin-St Jeor)</span>
                        <span className="text-foreground">{Math.round(bmr!)} kcal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">TDEE (maintenance)</span>
                        <span className="text-foreground">{tdee} kcal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Activity multiplier</span>
                        <span className="text-foreground capitalize">{watched.activityLevel?.replace(/_/g, ' ')}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Your goal</span>
                        <span className="text-foreground capitalize">{watched.goal?.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                    <div className="callout text-sm text-foreground">
                      <p className="font-medium mb-1">Mifflin-St Jeor equation</p>
                      <p className="text-xs text-muted-foreground">BMR × activity level → TDEE. Fat loss −500 kcal, lean bulk +250 kcal. You can change goals anytime in Settings.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button type="button" onClick={prevStep} disabled={step === 1} variant="outline"
                className={step === 1 ? 'invisible' : ''}>
                <ArrowLeft className="h-[18px] w-[18px]" /> Back
              </Button>
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Continue <ArrowRight className="h-[18px] w-[18px]" />
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading
                    ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    : <>Start Tracking <ArrowRight className="h-[18px] w-[18px]" /></>}
                </Button>
              )}
            </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
