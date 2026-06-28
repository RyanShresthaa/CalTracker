import type { ActivityLog, WorkoutSession } from '@prisma/client';
import { exerciseVolume } from './workoutAnalytics';
import { localDateKey } from './dates';

export const WORKOUT_SESSION_NOTE_PREFIX = '__workout_session:';

type ActivityWithGym = Pick<
  ActivityLog,
  | 'id'
  | 'name'
  | 'muscleGroup'
  | 'logDate'
  | 'duration'
  | 'sets'
  | 'reps'
  | 'startWeight'
  | 'startReps'
  | 'endWeight'
  | 'endReps'
  | 'totalVolume'
  | 'notes'
>;

type WorkoutExerciseWithSets = {
  id: string;
  name: string;
  muscleGroup: string;
  sets: { id: string; setNumber: number; weight: number; reps: number }[];
};

type WorkoutSessionWithExercises = WorkoutSession & {
  exercises: WorkoutExerciseWithSets[];
};

export type UnifiedSession = {
  id: string;
  name: string;
  source: 'workout' | 'activity';
  status: 'completed';
  startedAt: Date;
  completedAt: Date;
  durationMin: number | null;
  exercises: {
    id: string;
    name: string;
    muscleGroup: string;
    sets: { id: string; setNumber: number; weight: number; reps: number }[];
    volume: number;
  }[];
  totalVolume: number;
};

export function isWorkoutSyncedActivity(notes?: string | null): boolean {
  return Boolean(notes?.includes(WORKOUT_SESSION_NOTE_PREFIX));
}

export function synthesizeSetsFromActivity(act: ActivityWithGym) {
  if (!act.sets || act.sets <= 0 || act.startWeight == null || act.startReps == null) {
    return [];
  }

  return Array.from({ length: act.sets }, (_, i) => {
    const t = act.sets! > 1 ? i / (act.sets! - 1) : 0;
    const weight = Math.round(
      (act.startWeight! + t * ((act.endWeight ?? act.startWeight!) - act.startWeight!)) * 10,
    ) / 10;
    const reps = Math.round(
      act.startReps! + t * ((act.endReps ?? act.startReps!) - act.startReps!),
    );
    return { weight, reps };
  });
}

export function activityToExercise(act: ActivityWithGym) {
  const synthesized = synthesizeSetsFromActivity(act);
  const sets = synthesized.map((s, i) => ({
    id: `${act.id}-set-${i + 1}`,
    setNumber: i + 1,
    weight: s.weight,
    reps: s.reps,
  }));

  return {
    id: act.id,
    name: act.name,
    muscleGroup: act.muscleGroup ?? 'chest',
    sets,
    volume: act.totalVolume ?? exerciseVolume(synthesized),
  };
}

export function buildActivitySessions(
  activities: ActivityWithGym[],
  options?: { excludeWorkoutSynced?: boolean },
): UnifiedSession[] {
  const excludeSynced = options?.excludeWorkoutSynced !== false;
  const filtered = activities.filter(act => {
    if (!act.muscleGroup) return false;
    if (excludeSynced && isWorkoutSyncedActivity(act.notes)) return false;
    return true;
  });

  const byDay = new Map<string, ActivityWithGym[]>();
  for (const act of filtered) {
    const key = localDateKey(new Date(act.logDate));
    const list = byDay.get(key) ?? [];
    list.push(act);
    byDay.set(key, list);
  }

  const sessions: UnifiedSession[] = [];

  for (const [dayKey, dayActs] of byDay) {
    const exercises = dayActs.map(activityToExercise);
    const totalVolume = Math.round(exercises.reduce((sum, ex) => sum + ex.volume, 0) * 10) / 10;
    const completedAt = dayActs.reduce(
      (latest, act) => (act.logDate > latest ? act.logDate : latest),
      dayActs[0].logDate,
    );
    const startedAt = dayActs.reduce(
      (earliest, act) => (act.logDate < earliest ? act.logDate : earliest),
      dayActs[0].logDate,
    );
    const durationMin = Math.round(dayActs.reduce((sum, act) => sum + act.duration, 0));

    sessions.push({
      id: `activity-day-${dayKey}`,
      name: dayActs.length === 1 ? dayActs[0].name : `Gym — ${dayKey}`,
      source: 'activity',
      status: 'completed',
      startedAt,
      completedAt,
      durationMin,
      exercises,
      totalVolume,
    });
  }

  return sessions;
}

export function workoutSessionToUnified(session: WorkoutSessionWithExercises): UnifiedSession {
  const exercises = session.exercises.map(ex => {
    const sets = ex.sets.map(s => ({
      id: s.id,
      setNumber: s.setNumber,
      weight: s.weight,
      reps: s.reps,
    }));
    return {
      id: ex.id,
      name: ex.name,
      muscleGroup: ex.muscleGroup,
      sets,
      volume: exerciseVolume(sets),
    };
  });

  return {
    id: session.id,
    name: session.name ?? 'Gym Session',
    source: 'workout',
    status: 'completed',
    startedAt: session.startedAt,
    completedAt: session.completedAt ?? session.startedAt,
    durationMin: session.durationMin,
    exercises,
    totalVolume: Math.round(exercises.reduce((sum, ex) => sum + ex.volume, 0) * 10) / 10,
  };
}

export function mergeSessionHistory(
  workoutSessions: WorkoutSessionWithExercises[],
  gymActivities: ActivityWithGym[],
  limit = 10,
): UnifiedSession[] {
  const fromWorkouts = workoutSessions.map(workoutSessionToUnified);
  const fromActivities = buildActivitySessions(gymActivities);

  const merged = [...fromWorkouts, ...fromActivities].sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime(),
  );

  return merged.slice(0, limit);
}

export function serializeUnifiedSession(session: UnifiedSession) {
  return {
    ...session,
    startedAt: session.startedAt.toISOString(),
    completedAt: session.completedAt.toISOString(),
  };
}
