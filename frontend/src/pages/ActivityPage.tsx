import { useState } from 'react';
import { Plus, Trash, Zap, Flame } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useActivities, useAddActivity, useDeleteActivity, useMyExercises } from '../lib/hooks';
import { GYM_MUSCLE_GROUPS, calcTotalVolume, muscleGroupLabel } from '../lib/gymTracking';
import MyExercises, { exerciseSelectOptions, type MyExercise } from '../components/GymExercisePicker';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Badge } from '../components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';

const ACTIVITY_TYPES = [
  { id: 'gym', label: 'Gym', emoji: '🏋️', type: 'strength' },
  { id: 'running', label: 'Running', emoji: '🏃', type: 'cardio' },
  { id: 'walking', label: 'Walking', emoji: '🚶', type: 'cardio' },
  { id: 'cycling', label: 'Cycling', emoji: '🚴', type: 'cardio' },
  { id: 'swimming', label: 'Swimming', emoji: '🏊', type: 'cardio' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘', type: 'cardio' },
  { id: 'football', label: 'Football', emoji: '⚽', type: 'sport' },
  { id: 'basketball', label: 'Basketball', emoji: '🏀', type: 'sport' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾', type: 'cardio' },
  { id: 'skipping', label: 'Skipping', emoji: '🪢', type: 'cardio' },
  { id: 'dancing', label: 'Dancing', emoji: '💃', type: 'cardio' },
  { id: 'custom', label: 'Custom', emoji: '⚡', type: 'custom' },
];

const SWIM_STROKES = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Mixed'];

const EMPTY_GYM = {
  muscleGroup: 'chest' as string,
  gymPreset: '',
  name: '',
  duration: '',
  sets: '',
  startWeight: '',
  startReps: '',
  endWeight: '',
  endReps: '',
  totalVolume: '',
  notes: '',
};

const MET: Record<string, number> = {
  walking: 3.5, running: 9.8, cycling: 6.8, swimming: 6.0, gym: 5.0,
  yoga: 3.0, hiking: 5.3, dancing: 5.0, football: 7.0, basketball: 6.5,
  skipping: 12.0, custom: 5.0,
};

function LogActivityModal({ onClose, onAdd, userWeight }: any) {
  const [actType, setActType] = useState<any>(null);
  const [gym, setGym] = useState({ ...EMPTY_GYM });
  const [form, setForm] = useState<any>({ name: '', duration: '', sets: '', reps: '', weightUsed: '', distance: '', speed: '', stroke: '', notes: '' });
  const { data: myExercises = [] } = useMyExercises();

  const applyMyExercise = (ex: MyExercise) => {
    const group = GYM_MUSCLE_GROUPS.find(g => g.id === ex.muscleGroup);
    const inPresets = group?.exercises.some(e => e === ex.name) ?? false;
    setGym({
      ...EMPTY_GYM,
      muscleGroup: ex.muscleGroup,
      gymPreset: inPresets ? ex.name : '__custom__',
      name: ex.name,
      sets: ex.lastSets != null ? String(ex.lastSets) : '',
      startWeight: ex.lastStartWeight != null ? String(ex.lastStartWeight) : '',
      startReps: ex.lastStartReps != null ? String(ex.lastStartReps) : '',
      endWeight: ex.lastEndWeight != null ? String(ex.lastEndWeight) : '',
      endReps: ex.lastEndReps != null ? String(ex.lastEndReps) : '',
    });
  };

  const estimatedCals = actType && (actType.type === 'strength' ? gym.duration : form.duration) && userWeight
    ? Math.round((MET[actType.id] || 5) * userWeight * parseInt(actType.type === 'strength' ? gym.duration : form.duration) / 60) : 0;

  const autoVolume = actType?.type === 'strength' && gym.sets && gym.startWeight && gym.startReps
    ? calcTotalVolume(
      parseInt(gym.sets),
      parseFloat(gym.startWeight),
      parseInt(gym.startReps),
      parseFloat(gym.endWeight || gym.startWeight),
      parseInt(gym.endReps || gym.startReps),
    )
    : 0;

  const activeGroup = GYM_MUSCLE_GROUPS.find(g => g.id === gym.muscleGroup) ?? GYM_MUSCLE_GROUPS[0];
  const exerciseOptions = exerciseSelectOptions(activeGroup.id, activeGroup.exercises, myExercises);

  const selectActivity = (act: typeof ACTIVITY_TYPES[number]) => {
    setActType(act);
    if (act.type === 'strength') {
      const first = GYM_MUSCLE_GROUPS[0];
      setGym({
        ...EMPTY_GYM,
        muscleGroup: first.id,
        gymPreset: first.exercises[0],
        name: first.exercises[0],
      });
    } else {
      setForm((f: typeof form) => ({ ...f, name: act.id === 'custom' ? '' : act.label }));
    }
  };

  const selectMuscleGroup = (groupId: string) => {
    const group = GYM_MUSCLE_GROUPS.find(g => g.id === groupId) ?? GYM_MUSCLE_GROUPS[0];
    setGym(g => ({
      ...g,
      muscleGroup: group.id,
      gymPreset: group.exercises[0],
      name: group.exercises[0],
    }));
  };

  const handleSubmit = async () => {
    if (!actType) return;

    if (actType.type === 'strength') {
      const name = gym.name?.trim();
      if (!gym.muscleGroup) { toast.error('Select a muscle group'); return; }
      if (!name) { toast.error('Please enter an exercise name'); return; }
      if (!gym.duration) { toast.error('Enter workout duration'); return; }
      if (!gym.sets || !gym.startWeight || !gym.startReps) {
        toast.error('Enter sets and your first-set weight & reps');
        return;
      }

      const sets = parseInt(gym.sets);
      const startWeight = parseFloat(gym.startWeight);
      const startReps = parseInt(gym.startReps);
      const endWeight = parseFloat(gym.endWeight || gym.startWeight);
      const endReps = parseInt(gym.endReps || gym.startReps);
      const totalVolume = gym.totalVolume
        ? parseFloat(gym.totalVolume)
        : calcTotalVolume(sets, startWeight, startReps, endWeight, endReps);

      await onAdd({
        activityType: actType.id,
        name,
        muscleGroup: gym.muscleGroup,
        duration: parseFloat(gym.duration),
        sets,
        reps: startReps,
        weightUsed: startWeight,
        startWeight,
        startReps,
        endWeight,
        endReps,
        totalVolume,
        notes: gym.notes || undefined,
      });
      onClose();
      return;
    }

    const name = form.name?.trim();
    if (!form.duration) {
      toast.error('Please fill in required fields'); return;
    }
    if (!name) {
      toast.error('Please enter an activity name');
      return;
    }
    const payload: any = {
      activityType: actType.id,
      name,
      duration: parseFloat(form.duration),
      notes: form.notes || undefined,
    };
    if (actType.type === 'cardio' || actType.type === 'sport') {
      if (form.distance) payload.distance = parseFloat(form.distance);
      if (form.speed) payload.speed = parseFloat(form.speed);
      if (form.stroke) payload.stroke = form.stroke;
    }
    await onAdd(payload);
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle>Log Activity</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Activity type picker */}
          {!actType ? (
            <div>
              <p className="label-caps mb-3">Choose Activity</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ACTIVITY_TYPES.map(act => (
                  <button key={act.id} type="button" onClick={() => selectActivity(act)} className="quick-action">
                    <span className="text-xl">{act.emoji}</span>
                    <span className="text-xs font-medium text-foreground">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setActType(null)}>← Back</Button>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{actType.emoji}</span>
                  <span className="font-semibold text-foreground">{actType.label}</span>
                </div>
              </div>

              {/* Exercise name */}
              {actType.type === 'strength' ? (
                <>
                  <MyExercises
                    exercises={myExercises}
                    onSelect={applyMyExercise}
                  />

                  <div>
                    <Label>Muscle group</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {GYM_MUSCLE_GROUPS.map(group => (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => selectMuscleGroup(group.id)}
                          className={`flex flex-col items-center gap-1 text-xs font-medium ${
                            gym.muscleGroup === group.id ? 'option-card-selected' : 'option-card'
                          }`}
                        >
                          <span className="text-lg">{group.emoji}</span>
                          {group.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Exercise</Label>
                    <Select
                      value={gym.gymPreset}
                      onValueChange={(value) => {
                        if (value === '__custom__') {
                          setGym(g => ({ ...g, gymPreset: value, name: '' }));
                        } else {
                          setGym(g => ({ ...g, gymPreset: value, name: value }));
                        }
                      }}
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {exerciseOptions.map(ex => <SelectItem key={ex} value={ex}>{ex}</SelectItem>)}
                        <SelectItem value="__custom__">Custom exercise…</SelectItem>
                      </SelectContent>
                    </Select>
                    {gym.gymPreset === '__custom__' && (
                      <Input
                        type="text"
                        value={gym.name}
                        placeholder={`e.g. Custom ${activeGroup.label.toLowerCase()} exercise`}
                        className="mt-2"
                        onChange={e => setGym(g => ({ ...g, name: e.target.value }))}
                        autoFocus
                      />
                    )}
                  </div>

                  <div>
                    <Label>Duration (minutes) *</Label>
                    <Input type="number" value={gym.duration} onChange={e => setGym(g => ({ ...g, duration: e.target.value }))}
                      placeholder="e.g. 45" className="mt-1.5" min={1} />
                  </div>

                  <div>
                    <Label>Sets *</Label>
                    <Input type="number" value={gym.sets} onChange={e => setGym(g => ({ ...g, sets: e.target.value }))}
                      placeholder="e.g. 4" className="mt-1.5" min={1} />
                  </div>

                  <div className="p-3 border border-border bg-background space-y-3">
                    <p className="label-caps">First set</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Starting weight (kg)</Label>
                        <Input type="number" step="0.5" value={gym.startWeight}
                          onChange={e => setGym(g => ({ ...g, startWeight: e.target.value, totalVolume: '' }))}
                          placeholder="e.g. 40" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-xs">Starting reps</Label>
                        <Input type="number" value={gym.startReps}
                          onChange={e => setGym(g => ({ ...g, startReps: e.target.value, totalVolume: '' }))}
                          placeholder="e.g. 12" className="mt-1.5" min={1} />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-border bg-background space-y-3">
                    <p className="label-caps">Last set</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Finishing weight (kg)</Label>
                        <Input type="number" step="0.5" value={gym.endWeight}
                          onChange={e => setGym(g => ({ ...g, endWeight: e.target.value, totalVolume: '' }))}
                          placeholder="Same as start if unchanged" className="mt-1.5" />
                      </div>
                      <div>
                        <Label className="text-xs">Finishing reps</Label>
                        <Input type="number" value={gym.endReps}
                          onChange={e => setGym(g => ({ ...g, endReps: e.target.value, totalVolume: '' }))}
                          placeholder="Same as start if unchanged" className="mt-1.5" min={1} />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted">Leave blank if your last set matches the first</p>
                  </div>

                  <div>
                    <Label>Total volume (weight × reps, all sets)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={gym.totalVolume || (autoVolume > 0 ? String(autoVolume) : '')}
                      onChange={e => setGym(g => ({ ...g, totalVolume: e.target.value }))}
                      placeholder={autoVolume > 0 ? String(autoVolume) : 'Auto-calculated from sets'}
                      className="mt-1.5"
                    />
                    {autoVolume > 0 && (
                      <p className="text-[11px] text-muted mt-1">
                        Estimated: {autoVolume} kg·reps across {gym.sets || '?'} sets (edit to override)
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Notes (optional)</Label>
                    <Input type="text" value={gym.notes} onChange={e => setGym(g => ({ ...g, notes: e.target.value }))}
                      placeholder="How did it feel?" className="mt-1.5" />
                  </div>
                </>
              ) : actType.id === 'custom' ? (
                <div>
                  <Label>Activity Name *</Label>
                  <Input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Morning workout" className="mt-1.5" />
                </div>
              ) : null}

              {actType.type !== 'strength' && (
              <>
              <div>
                <Label>Duration (minutes) *</Label>
                <Input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 45" className="mt-1.5" min={1} />
              </div>

              {(actType.type === 'cardio' || actType.type === 'sport') && actType.id !== 'yoga' && actType.id !== 'dancing' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Distance (km)</Label>
                    <Input type="number" step="0.1" value={form.distance} onChange={e => setForm({ ...form, distance: e.target.value })} placeholder="e.g. 5" className="mt-1.5" />
                  </div>
                  <div>
                    <Label className="text-xs">Speed (km/h)</Label>
                    <Input type="number" step="0.1" value={form.speed} onChange={e => setForm({ ...form, speed: e.target.value })} placeholder="e.g. 10" className="mt-1.5" />
                  </div>
                </div>
              )}

              {actType.id === 'swimming' && (
                <div>
                  <Label>Stroke</Label>
                  <Select value={form.stroke} onValueChange={(v) => setForm({ ...form, stroke: v })}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select stroke..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SWIM_STROKES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label>Notes (optional)</Label>
                <Input type="text" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="How did it feel?" className="mt-1.5" />
              </div>
              </>
              )}

              {estimatedCals > 0 && (
                <div className="callout">
                  <div className="flex items-center gap-2">
                    <Flame className="h-[18px] w-[18px] text-destructive shrink-0" />
                    <span className="text-sm text-foreground">
                      Estimated calories burned: <strong>{estimatedCals} kcal</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {actType && (
          <div className="p-4 border-t border-border">
            <Button type="button" onClick={handleSubmit} className="w-full py-3">Log Activity</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function ActivityPage() {
  const { user } = useAuthStore();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useActivities(date);
  const addActivityMutation = useAddActivity(date);
  const deleteActivityMutation = useDeleteActivity();

  const activities = data?.logs ?? [];
  const totalCalsBurned = data?.totalCaloriesBurned ?? 0;
  const totalDuration = data?.totalDuration ?? 0;

  const handleAdd = (formData: any) => {
    addActivityMutation.mutate(formData, {
      onSuccess: () => setShowModal(false),
    });
  };

  const handleDelete = (id: string) => deleteActivityMutation.mutate(id);

  const getActivityEmoji = (type: string) => ACTIVITY_TYPES.find(a => a.id === type)?.emoji || '⚡';

  return (
    <div className="space-y-6">
      {showModal && (
        <LogActivityModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
          userWeight={user?.currentWeight || 70}
        />
      )}

      <PageHeader
        title="Activity"
        subtitle="Track workouts and exercises"
        action={
          <div className="flex gap-3">
            <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-auto" />
            <Button type="button" onClick={() => setShowModal(true)}>
              <Plus className="h-[18px] w-[18px]" /> Log Activity
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="stat-value">{Math.round(totalCalsBurned)}</p>
            <p className="label-caps mt-2">Calories Burned</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="stat-value">{totalDuration}</p>
            <p className="label-caps mt-2">Minutes Active</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="stat-value">{activities.length}</p>
            <p className="label-caps mt-2">Activities</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4 border-b border-border">
          <CardTitle className="text-base font-semibold">Today&apos;s Workouts</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
        {isLoading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}</div>
        ) : activities.length === 0 ? (
          <div className="empty-state">
            <Zap className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No activities logged yet</p>
            <Button type="button" variant="link" onClick={() => setShowModal(true)} className="link-accent mt-3 text-sm font-medium p-0 h-auto">
              Log your first activity
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((act: any) => (
              <div key={act.id} className="list-row gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-xl shrink-0">{getActivityEmoji(act.activityType)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-foreground">{act.name}</p>
                      {act.muscleGroup && (
                        <Badge variant="default">
                          {muscleGroupLabel(act.muscleGroup)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted mt-0.5">
                      <span>{act.duration} min</span>
                      {act.startWeight != null && act.startReps != null && (
                        <span>Start: {act.startWeight} kg × {act.startReps}</span>
                      )}
                      {act.endWeight != null && act.endReps != null && (
                        <span>Finish: {act.endWeight} kg × {act.endReps}</span>
                      )}
                      {act.sets && !act.startWeight && <span>{act.sets} sets × {act.reps} reps</span>}
                      {act.totalVolume != null && <span>Volume: {act.totalVolume} kg·reps</span>}
                      {act.weightUsed && !act.startWeight && <span>{act.weightUsed} kg</span>}
                      {act.distance && <span>{act.distance} km</span>}
                      {act.speed && <span>{act.speed} km/h</span>}
                      {act.stroke && <span>{act.stroke}</span>}
                      {act.notes && <span>· {act.notes}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-muted-foreground">{Math.round(act.caloriesBurned)} kcal</p>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleDelete(act.id)} className="h-8 w-8 text-muted hover:text-destructive mt-1">
                    <Trash className="h-[15px] w-[15px]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        </CardContent>
      </Card>

      <div className="callout">
        <div className="flex items-start gap-3">
          <Flame className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <p className="label-caps mb-2">Calorie Calculation</p>
            <p className="text-xs text-muted leading-relaxed">
              Calories burned use MET values with your body weight and duration. Each workout adds to your daily calorie budget on the dashboard — so a run or walk earns you extra kcal to eat while staying on track.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
