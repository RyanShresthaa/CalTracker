import { useState } from 'react';
import {
  Dumbbell, Plus, Trash2, CheckCircle2, XCircle, Target, TrendingUp,
  AlertCircle, Trophy, Clock, ChevronDown, ChevronUp,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import { GYM_MUSCLE_GROUPS, muscleGroupLabel, summarizeExerciseSets, summarizeSession } from '../lib/gymTracking';
import {
  useWorkoutInsights,
  useWorkoutHistory,
  useActiveWorkout,
  useStartWorkout,
  useAddWorkoutExercise,
  useAddWorkoutSet,
  useDeleteWorkoutSet,
  useCompleteWorkout,
  useCancelWorkout,
  useMyExercises,
} from '../lib/hooks';
import { useInView } from '../lib/useInView';
import MyExercises, { exerciseSelectOptions, type MyExercise } from '../components/GymExercisePicker';

const STATUS_COLORS: Record<string, string> = {
  neglected: 'text-destructive',
  undertrained: 'text-amber-500',
  balanced: 'text-muted-foreground',
  strong: 'text-emerald-600',
};

function MuscleBalanceCard({ insights, isLoading }: { insights: any; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-4 border-b border-border">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-full mt-2" />
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8" />)}
        </CardContent>
      </Card>
    );
  }

  if (!insights?.muscleGroups?.length) return null;

  return (
    <Card>
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Training Balance
        </CardTitle>
        <p className="text-xs text-muted mt-1">{insights.summary}</p>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        {insights.muscleGroups.map((m: any) => (
          <div key={m.id}>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium capitalize">{muscleGroupLabel(m.id)}</span>
              <span className={STATUS_COLORS[m.status] ?? 'text-muted'}>
                {m.volumeScore}% vol · {m.sessions} sessions
              </span>
            </div>
            <Progress value={m.balanceScore} className="h-1.5" />
          </div>
        ))}

        {insights.focusAreas?.length > 0 && (
          <div className="mt-4 p-3 border border-border bg-background space-y-2">
            <p className="label-caps flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5" />
              What to work on more
            </p>
            {insights.focusAreas.map((f: any) => (
              <div key={f.muscleGroup} className="flex items-start gap-2 text-xs">
                <Badge variant={f.priority === 'high' ? 'destructive' : 'default'} className="capitalize shrink-0">
                  {muscleGroupLabel(f.muscleGroup)}
                </Badge>
                <span className="text-muted">{f.reason}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function AddExerciseModal({
  onClose,
  onAdd,
  suggestedGroup,
  myExercises,
}: {
  onClose: () => void;
  onAdd: (name: string, muscleGroup: string) => void;
  suggestedGroup?: string;
  myExercises: MyExercise[];
}) {
  const [muscleGroup, setMuscleGroup] = useState(suggestedGroup || 'chest');
  const [preset, setPreset] = useState('');
  const [customName, setCustomName] = useState('');

  const group = GYM_MUSCLE_GROUPS.find(g => g.id === muscleGroup) ?? GYM_MUSCLE_GROUPS[0];
  const exerciseOptions = exerciseSelectOptions(group.id, group.exercises, myExercises);
  const name = preset === '__custom__' ? customName.trim() : (preset || group.exercises[0]);

  const pickExercise = (ex: MyExercise) => {
    const targetGroup = GYM_MUSCLE_GROUPS.find(g => g.id === ex.muscleGroup) ?? group;
    setMuscleGroup(ex.muscleGroup);
    const inPresets = targetGroup.exercises.some(e => e === ex.name);
    if (inPresets) {
      setPreset(ex.name);
      setCustomName('');
    } else {
      setPreset('__custom__');
      setCustomName(ex.name);
    }
  };

  const handleAdd = () => {
    if (!name) return;
    onAdd(name, muscleGroup);
    onClose();
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <MyExercises
            exercises={myExercises}
            onSelect={(ex) => {
              pickExercise(ex);
              onAdd(ex.name, ex.muscleGroup);
              onClose();
            }}
          />

          <div>
            <Label>Muscle group</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {GYM_MUSCLE_GROUPS.map(g => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => {
                    setMuscleGroup(g.id);
                    setPreset(g.exercises[0]);
                    setCustomName('');
                  }}
                  className={muscleGroup === g.id ? 'option-card-selected' : 'option-card'}
                >
                  <span className="text-lg">{g.emoji}</span>
                  <span className="text-[10px] font-medium">{g.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Exercise</Label>
            <Select
              value={preset || group.exercises[0]}
              onValueChange={(v) => {
                setPreset(v);
                if (v !== '__custom__') setCustomName('');
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
            {preset === '__custom__' && (
              <Input
                className="mt-2"
                placeholder="Exercise name"
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                autoFocus
              />
            )}
          </div>

          <Button type="button" onClick={handleAdd} className="w-full" disabled={!name}>
            Add to session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SetsTable({
  sets,
  onDeleteSet,
  exerciseId,
}: {
  sets: { id: string; setNumber: number; weight: number; reps: number }[];
  onDeleteSet?: (exerciseId: string, setId: string) => void;
  exerciseId?: string;
}) {
  if (!sets.length) return null;

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="grid grid-cols-[2.5rem_1fr_1fr_1fr_auto] gap-2 px-3 py-2 bg-muted/50 text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
        <span>Set</span>
        <span>Weight</span>
        <span>Reps</span>
        <span className="text-right">Vol.</span>
        {onDeleteSet && <span />}
      </div>
      {sets.map(s => (
        <div
          key={s.id}
          className="grid grid-cols-[2.5rem_1fr_1fr_1fr_auto] gap-2 px-3 py-2.5 border-t border-border text-sm items-center"
        >
          <span className="text-muted-foreground tabular-nums">{s.setNumber}</span>
          <span className="font-medium tabular-nums">{s.weight} kg</span>
          <span className="font-medium tabular-nums">{s.reps}</span>
          <span className="text-right text-muted-foreground tabular-nums text-xs">
            {(s.weight * s.reps).toFixed(0)}
          </span>
          {onDeleteSet && exerciseId && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => onDeleteSet(exerciseId, s.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function ExerciseStats({ sets }: { sets: { weight: number; reps: number }[] }) {
  const stats = summarizeExerciseSets(sets);
  if (!stats.setCount) return null;

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      <span><span className="text-foreground font-medium">{stats.setCount}</span> sets</span>
      <span><span className="text-foreground font-medium">{stats.totalReps}</span> reps</span>
      <span>max <span className="text-foreground font-medium">{stats.maxWeight} kg</span></span>
      {stats.topSet && (
        <span>best set <span className="text-foreground font-medium">{stats.topSet.weight}×{stats.topSet.reps}</span></span>
      )}
      <span>volume <span className="text-foreground font-medium">{stats.volume}</span> kg·reps</span>
    </div>
  );
}

function SessionHistoryDetail({ session }: { session: any }) {
  const summary = summarizeSession(session.exercises ?? []);

  return (
    <div className="mt-3 space-y-3 border-t border-border pt-3">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>{summary.exerciseCount} exercises</span>
        <span>{summary.totalSets} sets</span>
        <span>{summary.totalReps} reps</span>
        {summary.maxWeight > 0 && <span>heaviest {summary.maxWeight} kg</span>}
        <span>{summary.totalVolume} kg·reps total</span>
      </div>
      {(session.exercises ?? []).map((ex: any) => {
        const sets = ex.sets ?? [];
        const stats = summarizeExerciseSets(sets);
        return (
          <div key={ex.id} className="rounded-lg border border-border p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">{ex.name}</p>
                <Badge variant="secondary" className="mt-1 text-[10px]">{muscleGroupLabel(ex.muscleGroup)}</Badge>
              </div>
              <p className="text-sm font-semibold tabular-nums text-foreground shrink-0">{stats.volume}</p>
            </div>
            {sets.length > 0 ? (
              <SetsTable sets={sets} />
            ) : (
              <p className="text-xs text-muted-foreground">No sets logged</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ExerciseCard({
  exercise,
  onAddSet,
  onDeleteSet,
}: {
  exercise: any;
  onAddSet: (exerciseId: string, weight: number, reps: number) => void;
  onDeleteSet: (exerciseId: string, setId: string) => void;
}) {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const progress = exercise.progress;

  const handleLogSet = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (!w || !r) return;
    onAddSet(exercise.id, w, r);
    setWeight('');
    setReps('');
  };

  const suggestWeight = progress?.lastTopSet?.weight;
  const suggestReps = progress?.lastTopSet?.reps;
  const setStats = summarizeExerciseSets(exercise.sets ?? []);

  return (
    <div className="border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-foreground">{exercise.name}</p>
            <Badge variant="default">{muscleGroupLabel(exercise.muscleGroup)}</Badge>
            {progress?.isPR && (
              <Badge className="bg-emerald-600/15 text-emerald-600 border-emerald-600/30">
                <Trophy className="h-3 w-3 mr-1" /> PR
              </Badge>
            )}
          </div>
          {progress?.lastVolume > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Last session: {progress.lastVolume} kg·reps
              {progress.lastTopSet && ` (top: ${progress.lastTopSet.weight} kg × ${progress.lastTopSet.reps})`}
            </p>
          )}
          {setStats.setCount > 0 && (
            <div className="mt-2">
              <ExerciseStats sets={exercise.sets} />
            </div>
          )}
        </div>
      </div>

      {progress?.targetVolume > 0 && (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted">Progress vs last (+5%)</span>
            <span className="font-mono">{progress.progressPercent}%</span>
          </div>
          <Progress value={progress.progressPercent} />
          {progress.remainingVolume > 0 && (
            <p className="text-xs text-muted mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {progress.remainingVolume} kg·reps more to beat last session
            </p>
          )}
        </div>
      )}

      {progress?.suggestion && (
        <p className="text-xs text-accent-foreground bg-accent px-2 py-1.5 rounded">
          {progress.suggestion}
        </p>
      )}

      {exercise.sets?.length > 0 && (
        <SetsTable
          sets={exercise.sets}
          exerciseId={exercise.id}
          onDeleteSet={onDeleteSet}
        />
      )}

      <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
        <div>
          <Label className="text-xs">Weight (kg)</Label>
          <Input
            type="number"
            step="0.5"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            placeholder={suggestWeight ? String(suggestWeight) : '40'}
            className="mt-1"
          />
        </div>
        <div>
          <Label className="text-xs">Reps</Label>
          <Input
            type="number"
            value={reps}
            onChange={e => setReps(e.target.value)}
            placeholder={suggestReps ? String(suggestReps) : '10'}
            className="mt-1"
            onKeyDown={e => e.key === 'Enter' && handleLogSet()}
          />
        </div>
        <Button type="button" size="sm" onClick={handleLogSet} className="h-9">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function SessionHistoryList({
  sessions,
  expandedSessionId,
  onToggle,
  defaultExpanded = false,
}: {
  sessions: any[];
  expandedSessionId: string | null;
  onToggle: (id: string | null) => void;
  defaultExpanded?: boolean;
}) {
  if (!sessions.length) return null;

  return (
    <div className="space-y-2">
      {sessions.map((s: any) => {
        const isExpanded = expandedSessionId === s.id || (defaultExpanded && sessions.length === 1);
        const summary = summarizeSession(s.exercises ?? []);
        return (
          <div key={s.id} className="rounded-lg border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => onToggle(isExpanded ? null : s.id)}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-muted/40 transition-colors"
            >
              <Dumbbell className="h-4 w-4 text-foreground shrink-0 opacity-70" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-medium truncate text-foreground">{s.name || 'Gym Session'}</p>
                  <Badge variant={s.source === 'activity' ? 'secondary' : 'default'} className="text-[10px]">
                    {s.source === 'activity' ? 'Activity' : 'Workout'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {s.completedAt && format(new Date(s.completedAt), 'MMM d, yyyy · h:mm a')}
                  {' · '}{summary.exerciseCount} exercises
                  {' · '}{summary.totalSets} sets
                  {' · '}{summary.totalReps} reps
                  {' · '}{Math.round(s.totalVolume ?? summary.totalVolume)} kg·reps
                  {s.durationMin ? ` · ${Math.round(s.durationMin)} min` : ''}
                </p>
              </div>
              {isExpanded
                ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
            </button>
            {isExpanded && (
              <div className="px-3 pb-3">
                <SessionHistoryDetail session={s} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function WorkoutPage() {
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  const { data: activeSession, isLoading: sessionLoading } = useActiveWorkout();
  const deferSecondary = !sessionLoading;
  const { data: history, isLoading: historyLoading } = useWorkoutHistory(deferSecondary);
  const [insightsRef, insightsInView] = useInView();
  const { data: insights, isLoading: insightsLoading } = useWorkoutInsights(
    28,
    deferSecondary && insightsInView,
  );
  const { data: myExercises = [] } = useMyExercises(showAddExercise);
  const startWorkout = useStartWorkout();
  const addExercise = useAddWorkoutExercise();
  const addSet = useAddWorkoutSet();
  const deleteSet = useDeleteWorkoutSet();
  const completeWorkout = useCompleteWorkout();
  const cancelWorkout = useCancelWorkout();

  const suggestedGroup = insights?.focusAreas?.[0]?.muscleGroup;
  const activeSummary = activeSession?.exercises
    ? summarizeSession(activeSession.exercises)
    : null;
  const todaySessions = history?.todaySessions ?? [];
  const recentSessions = history?.recentSessions ?? [];

  const handleStart = () => {
    startWorkout.mutate(sessionName || undefined);
    setSessionName('');
  };

  const handleAddExercise = (name: string, muscleGroup: string) => {
    if (!activeSession?.id) return;
    addExercise.mutate({ sessionId: activeSession.id, name, muscleGroup });
  };

  const handleAddSet = (exerciseId: string, weight: number, reps: number) => {
    if (!activeSession?.id) return;
    addSet.mutate({ sessionId: activeSession.id, exerciseId, weight, reps });
  };

  const handleDeleteSet = (exerciseId: string, setId: string) => {
    if (!activeSession?.id) return;
    deleteSet.mutate({ sessionId: activeSession.id, exerciseId, setId });
  };

  if (sessionLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showAddExercise && activeSession && (
        <AddExerciseModal
          onClose={() => setShowAddExercise(false)}
          onAdd={handleAddExercise}
          suggestedGroup={suggestedGroup}
          myExercises={myExercises}
        />
      )}

      <PageHeader
        title="Workout"
        subtitle="Track sets live, beat your last session, balance muscle groups"
        action={
          !activeSession ? (
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="Session name (optional)"
                value={sessionName}
                onChange={e => setSessionName(e.target.value)}
                className="w-40 hidden sm:block"
              />
              <Button type="button" onClick={handleStart} disabled={startWorkout.isPending}>
                <Dumbbell className="h-4 w-4" />
                Start Workout
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddExercise(true)}>
                <Plus className="h-4 w-4" /> Exercise
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={() => completeWorkout.mutate({ sessionId: activeSession.id })}
                disabled={completeWorkout.isPending || !activeSession.exercises?.length}
              >
                <CheckCircle2 className="h-4 w-4" /> Finish
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted hover:text-destructive"
                onClick={() => cancelWorkout.mutate(activeSession.id)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          )
        }
      />

      {/* Active session */}
      {activeSession && (
        <Card className="border-border">
          <CardHeader className="pb-4 border-b border-border">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-foreground" />
                  {activeSession.name || 'Active Session'}
                </CardTitle>
                <p className="text-xs text-muted flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  Started {formatDistanceToNow(new Date(activeSession.startedAt), { addSuffix: true })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold tabular-nums text-foreground">{activeSession.totalVolume ?? 0}</p>
                <p className="text-[10px] text-muted-foreground">session volume (kg·reps)</p>
              </div>
            </div>

            {activeSummary && activeSummary.totalSets > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span>{activeSummary.exerciseCount} exercises</span>
                <span>{activeSummary.totalSets} sets logged</span>
                <span>{activeSummary.totalReps} total reps</span>
                {activeSummary.maxWeight > 0 && (
                  <span>heaviest lift {activeSummary.maxWeight} kg</span>
                )}
              </div>
            )}

            {activeSession.targetVolume > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted">Session target (beat last totals +5%)</span>
                  <span className="tabular-nums text-foreground">
                    {activeSession.totalVolume} / {activeSession.targetVolume} kg·reps
                  </span>
                </div>
                <Progress value={activeSession.sessionProgressPercent ?? 0} className="h-2" />
                {(activeSession.remainingVolume ?? 0) > 0 && (
                  <p className="text-xs text-muted mt-1.5">
                    {activeSession.remainingVolume} kg·reps left to hit your progressive overload goal this session
                  </p>
                )}
                {(activeSession.remainingVolume ?? 0) === 0 && activeSession.totalVolume > 0 && (
                  <p className="text-xs text-emerald-600 mt-1.5 font-medium">
                    Session target reached — you&apos;re lifting more than last time!
                  </p>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {!activeSession.exercises?.length ? (
              <div className="empty-state py-8">
                <Dumbbell className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm">Add your first exercise to start logging sets</p>
                {suggestedGroup && (
                  <p className="text-xs text-muted mt-1">
                    Tip: {muscleGroupLabel(suggestedGroup)} is undertrained — good place to start
                  </p>
                )}
                <Button type="button" variant="link" onClick={() => setShowAddExercise(true)} className="mt-3">
                  Add exercise
                </Button>
              </div>
            ) : (
              activeSession.exercises.map((ex: any) => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  onAddSet={handleAddSet}
                  onDeleteSet={handleDeleteSet}
                />
              ))
            )}
          </CardContent>
        </Card>
      )}

      {historyLoading ? (
        <Skeleton className="h-40" />
      ) : todaySessions.length > 0 && (
        <Card>
          <CardHeader className="pb-4 border-b border-border">
            <CardTitle className="text-base font-semibold">Today&apos;s workout</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Includes gym logged in Activity and finished Workout sessions
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <SessionHistoryList
              sessions={todaySessions}
              expandedSessionId={expandedSessionId}
              onToggle={setExpandedSessionId}
              defaultExpanded
            />
          </CardContent>
        </Card>
      )}

      <div ref={insightsRef} className="grid lg:grid-cols-2 gap-6">
        <MuscleBalanceCard insights={insights} isLoading={insightsLoading} />

        {/* Stats + recent */}
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {insightsLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-20" />)
            ) : (
              <>
                <Card className="text-center">
                  <CardContent className="pt-5 pb-4">
                    <p className="stat-value text-xl">{insights?.totals?.sessions ?? 0}</p>
                    <p className="label-caps mt-1 text-[9px]">Sessions (28d)</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-5 pb-4">
                    <p className="stat-value text-xl">{Math.round(insights?.totals?.volume ?? 0)}</p>
                    <p className="label-caps mt-1 text-[9px]">Total Volume</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="pt-5 pb-4">
                    <p className="stat-value text-xl">{insights?.totals?.exercises ?? 0}</p>
                    <p className="label-caps mt-1 text-[9px]">Exercises</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-base font-semibold">
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {historyLoading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12" />)}
                </div>
              ) : !recentSessions.length ? (
                <div className="empty-state py-6">
                  <p className="text-sm text-muted">No completed workouts yet</p>
                  <p className="text-xs text-muted mt-1">Log gym in Activity or start a Workout session</p>
                </div>
              ) : (
                <SessionHistoryList
                  sessions={recentSessions}
                  expandedSessionId={expandedSessionId}
                  onToggle={setExpandedSessionId}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {!activeSession && (
        <div className="callout">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="label-caps mb-2">How it works</p>
              <p className="text-xs text-muted leading-relaxed">
                Start a workout, log each set as you go, and the app compares your volume to your last session.
                Aim to beat it by ~5% for progressive overload. Muscle balance shows which groups you&apos;ve
                been neglecting so you know what to prioritize. Finishing a workout also logs calories to your dashboard.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
