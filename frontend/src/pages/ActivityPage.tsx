import { useState } from 'react';
import { Plus, Trash, Lightning, X, Fire } from 'phosphor-react';
import { useAuthStore } from '../store/authStore';
import { useActivities, useAddActivity, useDeleteActivity } from '../lib/hooks';
import { GYM_MUSCLE_GROUPS, calcTotalVolume, muscleGroupLabel } from '../lib/gymTracking';
import toast from 'react-hot-toast';
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">Log Activity</h3>
          <button onClick={onClose} className="btn-ghost p-1"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Activity type picker */}
          {!actType ? (
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Choose Activity</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {ACTIVITY_TYPES.map(act => (
                  <button key={act.id} onClick={() => selectActivity(act)}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700
                      hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                    <span className="text-2xl">{act.emoji}</span>
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button onClick={() => setActType(null)} className="btn-ghost text-xs py-1 px-2">← Back</button>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{actType.emoji}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{actType.label}</span>
                </div>
              </div>

              {/* Exercise name */}
              {actType.type === 'strength' ? (
                <>
                  <div>
                    <label className="label">Muscle group</label>
                    <div className="grid grid-cols-3 gap-2">
                      {GYM_MUSCLE_GROUPS.map(group => (
                        <button
                          key={group.id}
                          type="button"
                          onClick={() => selectMuscleGroup(group.id)}
                          className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 text-xs font-medium transition-all
                            ${gym.muscleGroup === group.id
                              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'}`}
                        >
                          <span className="text-lg">{group.emoji}</span>
                          {group.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label">Exercise</label>
                    <select
                      value={gym.gymPreset}
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '__custom__') {
                          setGym(g => ({ ...g, gymPreset: value, name: '' }));
                        } else {
                          setGym(g => ({ ...g, gymPreset: value, name: value }));
                        }
                      }}
                      className="input"
                    >
                      {activeGroup.exercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                      <option value="__custom__">Custom exercise…</option>
                    </select>
                    {gym.gymPreset === '__custom__' && (
                      <input
                        type="text"
                        value={gym.name}
                        placeholder={`e.g. Custom ${activeGroup.label.toLowerCase()} exercise`}
                        className="input mt-2"
                        onChange={e => setGym(g => ({ ...g, name: e.target.value }))}
                        autoFocus
                      />
                    )}
                  </div>

                  <div>
                    <label className="label">Duration (minutes) *</label>
                    <input type="number" value={gym.duration} onChange={e => setGym(g => ({ ...g, duration: e.target.value }))}
                      placeholder="e.g. 45" className="input" min={1} />
                  </div>

                  <div>
                    <label className="label">Sets *</label>
                    <input type="number" value={gym.sets} onChange={e => setGym(g => ({ ...g, sets: e.target.value }))}
                      placeholder="e.g. 4" className="input" min={1} />
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 space-y-3">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">First set</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="label text-xs">Starting weight (kg)</label>
                        <input type="number" step="0.5" value={gym.startWeight}
                          onChange={e => setGym(g => ({ ...g, startWeight: e.target.value, totalVolume: '' }))}
                          placeholder="e.g. 40" className="input" />
                      </div>
                      <div>
                        <label className="label text-xs">Starting reps</label>
                        <input type="number" value={gym.startReps}
                          onChange={e => setGym(g => ({ ...g, startReps: e.target.value, totalVolume: '' }))}
                          placeholder="e.g. 12" className="input" min={1} />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 space-y-3">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Last set</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="label text-xs">Finishing weight (kg)</label>
                        <input type="number" step="0.5" value={gym.endWeight}
                          onChange={e => setGym(g => ({ ...g, endWeight: e.target.value, totalVolume: '' }))}
                          placeholder="Same as start if unchanged" className="input" />
                      </div>
                      <div>
                        <label className="label text-xs">Finishing reps</label>
                        <input type="number" value={gym.endReps}
                          onChange={e => setGym(g => ({ ...g, endReps: e.target.value, totalVolume: '' }))}
                          placeholder="Same as start if unchanged" className="input" min={1} />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">Leave blank if your last set matches the first</p>
                  </div>

                  <div>
                    <label className="label">Total volume (weight × reps, all sets)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={gym.totalVolume || (autoVolume > 0 ? String(autoVolume) : '')}
                      onChange={e => setGym(g => ({ ...g, totalVolume: e.target.value }))}
                      placeholder={autoVolume > 0 ? String(autoVolume) : 'Auto-calculated from sets'}
                      className="input"
                    />
                    {autoVolume > 0 && (
                      <p className="text-[11px] text-slate-400 mt-1">
                        Estimated: {autoVolume} kg·reps across {gym.sets || '?'} sets (edit to override)
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Notes (optional)</label>
                    <input type="text" value={gym.notes} onChange={e => setGym(g => ({ ...g, notes: e.target.value }))}
                      placeholder="How did it feel?" className="input" />
                  </div>
                </>
              ) : actType.id === 'custom' ? (
                <div>
                  <label className="label">Activity Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Morning workout" className="input" />
                </div>
              ) : null}

              {actType.type !== 'strength' && (
              <>
              {/* Duration */}
              <div>
                <label className="label">Duration (minutes) *</label>
                <input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 45" className="input" min={1} />
              </div>

              {/* Cardio-specific */}
              {(actType.type === 'cardio' || actType.type === 'sport') && actType.id !== 'yoga' && actType.id !== 'dancing' && (
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="label text-xs">Distance (km)</label>
                    <input type="number" step="0.1" value={form.distance} onChange={e => setForm({ ...form, distance: e.target.value })} placeholder="e.g. 5" className="input" /></div>
                  <div><label className="label text-xs">Speed (km/h)</label>
                    <input type="number" step="0.1" value={form.speed} onChange={e => setForm({ ...form, speed: e.target.value })} placeholder="e.g. 10" className="input" /></div>
                </div>
              )}

              {/* Swimming stroke */}
              {actType.id === 'swimming' && (
                <div><label className="label">Stroke</label>
                  <select value={form.stroke} onChange={e => setForm({ ...form, stroke: e.target.value })} className="input">
                    <option value="">Select stroke...</option>
                    {SWIM_STROKES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              <div><label className="label">Notes (optional)</label>
                <input type="text" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                  placeholder="How did it feel?" className="input" /></div>
              </>
              )}

              {/* Estimated calories */}
              {estimatedCals > 0 && (
                <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <Fire size={18} className="text-orange-500" />
                  <span className="text-sm text-orange-700 dark:text-orange-400">
                    Estimated calories burned: <strong>{estimatedCals} kcal</strong>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {actType && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button onClick={handleSubmit} className="btn-primary w-full py-3">Log Activity</button>
          </div>
        )}
      </div>
    </div>
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

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Activity</h1>
          <p className="text-slate-500">Track your workouts and exercises</p>
        </div>
        <div className="flex gap-3">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input w-auto" />
          <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Log Activity
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-orange-600">{Math.round(totalCalsBurned)}</p>
          <p className="text-sm text-slate-500 mt-1">Calories Burned</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-indigo-600">{totalDuration}</p>
          <p className="text-sm text-slate-500 mt-1">Minutes Active</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-emerald-600">{activities.length}</p>
          <p className="text-sm text-slate-500 mt-1">Activities</p>
        </div>
      </div>

      {/* Activity list */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Today's Workouts</h3>
        </div>
        {isLoading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}</div>
        ) : activities.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
            <Lightning size={36} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">No activities logged yet</p>
            <button onClick={() => setShowModal(true)}
              className="mt-3 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              Log your first activity
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((act: any) => (
              <div key={act.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                <span className="text-2xl">{getActivityEmoji(act.activityType)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-slate-900 dark:text-white">{act.name}</p>
                    {act.muscleGroup && (
                      <span className="badge bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {muscleGroupLabel(act.muscleGroup)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-500 mt-0.5">
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
                <div className="text-right shrink-0">
                  <p className="font-bold text-orange-500">{Math.round(act.caloriesBurned)} kcal</p>
                  <button onClick={() => handleDelete(act.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors mt-1">
                    <Trash size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MET info */}
      <div className="card bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800">
        <div className="flex items-start gap-3">
          <Fire size={20} className="text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-orange-800 dark:text-orange-300 text-sm">Calorie Calculation</p>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              Calories burned use MET values with your body weight and duration. Each workout adds to your daily calorie budget on the dashboard — so a run or walk earns you extra kcal to eat while staying on track.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
