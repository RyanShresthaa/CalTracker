import { Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { AuthRequest } from '../middleware/auth';
import { calculateCaloriesBurned } from '../utils/calculations';
import {
  MUSCLE_GROUPS,
  buildMuscleInsights,
  exerciseVolume,
  sessionExerciseProgress,
  type MuscleGroupId,
} from '../utils/workoutAnalytics';
import { getUserExerciseLibrary } from '../utils/exerciseLibrary';
import {
  mergeSessionHistory,
  serializeUnifiedSession,
  WORKOUT_SESSION_NOTE_PREFIX,
} from '../utils/sessionHistory';
import { todayBounds, localDateKey } from '../utils/dates';

const sessionInclude = {
  exercises: {
    orderBy: { sortOrder: 'asc' as const },
    include: { sets: { orderBy: { setNumber: 'asc' as const } } },
  },
};

async function getLastExercisePerformance(userId: string, exerciseName: string) {
  const normalized = exerciseName.trim().toLowerCase();

  const lastWorkoutExercise = await prisma.workoutExercise.findFirst({
    where: {
      name: { equals: exerciseName, mode: 'insensitive' },
      session: { userId, status: 'completed' },
    },
    orderBy: { session: { completedAt: 'desc' } },
    include: { sets: { orderBy: { setNumber: 'asc' } } },
  });

  if (lastWorkoutExercise?.sets.length) {
    return {
      source: 'workout' as const,
      sets: lastWorkoutExercise.sets.map(s => ({ weight: s.weight, reps: s.reps })),
      volume: exerciseVolume(lastWorkoutExercise.sets),
      date: lastWorkoutExercise.sessionId,
    };
  }

  const lastActivity = await prisma.activityLog.findFirst({
    where: {
      userId,
      activityType: 'gym',
      name: { equals: exerciseName, mode: 'insensitive' },
    },
    orderBy: { logDate: 'desc' },
  });

  if (lastActivity?.startWeight && lastActivity.startReps && lastActivity.sets) {
    const sets = Array.from({ length: lastActivity.sets }, (_, i) => {
      const t = lastActivity.sets! > 1 ? i / (lastActivity.sets! - 1) : 0;
      const weight = (lastActivity.startWeight ?? 0) + t * ((lastActivity.endWeight ?? lastActivity.startWeight ?? 0) - (lastActivity.startWeight ?? 0));
      const reps = Math.round((lastActivity.startReps ?? 0) + t * ((lastActivity.endReps ?? lastActivity.startReps ?? 0) - (lastActivity.startReps ?? 0)));
      return { weight: Math.round(weight * 10) / 10, reps };
    });
    return { source: 'activity' as const, sets, volume: lastActivity.totalVolume ?? exerciseVolume(sets), date: lastActivity.logDate };
  }

  void normalized;
  return null;
}

function activityToSets(act: {
  sets: number | null;
  startWeight: number | null;
  startReps: number | null;
  endWeight: number | null;
  endReps: number | null;
}) {
  if (!act.startWeight || !act.startReps || !act.sets) return null;
  return Array.from({ length: act.sets }, (_, i) => {
    const t = act.sets! > 1 ? i / (act.sets! - 1) : 0;
    const weight =
      (act.startWeight ?? 0) +
      t * ((act.endWeight ?? act.startWeight ?? 0) - (act.startWeight ?? 0));
    const reps = Math.round(
      (act.startReps ?? 0) + t * ((act.endReps ?? act.startReps ?? 0) - (act.startReps ?? 0)),
    );
    return { weight: Math.round(weight * 10) / 10, reps };
  });
}

/** Batch last-performance lookup — one round-trip instead of N per exercise. */
async function getLastPerformanceMap(userId: string, exerciseNames: string[]) {
  const map = new Map<string, { sets: { weight: number; reps: number }[] }>();
  if (!exerciseNames.length) return map;

  const targets = new Set(exerciseNames.map(n => n.trim().toLowerCase()));

  const [recentWorkoutExercises, recentGymActivities] = await Promise.all([
    prisma.workoutExercise.findMany({
      where: { session: { userId, status: 'completed' } },
      orderBy: { session: { completedAt: 'desc' } },
      take: 120,
      include: { sets: { orderBy: { setNumber: 'asc' } } },
    }),
    prisma.activityLog.findMany({
      where: { userId, activityType: 'gym' },
      orderBy: { logDate: 'desc' },
      take: 60,
    }),
  ]);

  for (const ex of recentWorkoutExercises) {
    const key = ex.name.trim().toLowerCase();
    if (!targets.has(key) || map.has(key) || !ex.sets.length) continue;
    map.set(key, { sets: ex.sets.map(s => ({ weight: s.weight, reps: s.reps })) });
  }

  for (const act of recentGymActivities) {
    const key = act.name.trim().toLowerCase();
    if (!targets.has(key) || map.has(key)) continue;
    const sets = activityToSets(act);
    if (sets) map.set(key, { sets });
  }

  return map;
}

async function fetchSessionHistory(userId: string) {
  const [completedWorkoutSessions, allGymActivitiesForHistory] = await Promise.all([
    prisma.workoutSession.findMany({
      where: { userId, status: 'completed' },
      orderBy: { completedAt: 'desc' },
      take: 15,
      include: sessionInclude,
    }),
    prisma.activityLog.findMany({
      where: { userId, activityType: 'gym' },
      orderBy: { logDate: 'desc' },
      take: 50,
    }),
  ]);

  const recentSessions = mergeSessionHistory(
    completedWorkoutSessions as any,
    allGymActivitiesForHistory,
    10,
  );

  const { start: todayStart, end: todayEnd } = todayBounds();
  const todaySessions = mergeSessionHistory(
    completedWorkoutSessions.filter(s => {
      const d = s.completedAt ?? s.startedAt;
      return d >= todayStart && d < todayEnd;
    }) as any,
    allGymActivitiesForHistory.filter(a => a.logDate >= todayStart && a.logDate < todayEnd),
    5,
  ).filter(s => localDateKey(new Date(s.completedAt)) === localDateKey(todayStart));

  return {
    recentSessions: recentSessions.map(serializeUnifiedSession),
    todaySessions: todaySessions.map(serializeUnifiedSession),
  };
}

function enrichSession(session: Awaited<ReturnType<typeof prisma.workoutSession.findFirst>> & { exercises: any[] }) {
  return {
    ...session,
    exercises: session.exercises.map((ex: any) => {
      const sets = ex.sets.map((s: any) => ({ weight: s.weight, reps: s.reps }));
      return {
        ...ex,
        volume: exerciseVolume(sets),
        progress: sessionExerciseProgress(sets, null),
      };
    }),
    totalVolume: session.exercises.reduce(
      (sum: number, ex: any) => sum + exerciseVolume(ex.sets.map((s: any) => ({ weight: s.weight, reps: s.reps }))),
      0,
    ),
  };
}

export const getWorkoutInsights = async (req: AuthRequest, res: Response) => {
  try {
    const { period = '28' } = req.query as { period?: string };
    const periodDays = parseInt(period, 10) || 28;
    const from = new Date();
    from.setDate(from.getDate() - periodDays);

    const user = await prisma.user.findUnique({ where: { id: req.userId } });

    const [workoutSessions, gymActivities] = await Promise.all([
      prisma.workoutSession.findMany({
        where: { userId: req.userId, status: 'completed', completedAt: { gte: from } },
        include: { exercises: { include: { sets: true } } },
      }),
      prisma.activityLog.findMany({
        where: { userId: req.userId, activityType: 'gym', logDate: { gte: from } },
      }),
    ]);

    const muscleMap = new Map<MuscleGroupId, { sessions: Set<string>; exercises: number; volume: number; lastTrained: Date | null }>();
    for (const id of MUSCLE_GROUPS) {
      muscleMap.set(id, { sessions: new Set(), exercises: 0, volume: 0, lastTrained: null });
    }

    for (const session of workoutSessions) {
      const sessionKey = session.id;
      const sessionDate = session.completedAt ?? session.startedAt;
      for (const ex of session.exercises) {
        const group = ex.muscleGroup as MuscleGroupId;
        if (!muscleMap.has(group)) continue;
        const stat = muscleMap.get(group)!;
        stat.sessions.add(sessionKey);
        stat.exercises += 1;
        const vol = exerciseVolume(ex.sets);
        stat.volume += vol;
        if (!stat.lastTrained || sessionDate > stat.lastTrained) stat.lastTrained = sessionDate;
      }
    }

    for (const act of gymActivities) {
      const group = act.muscleGroup as MuscleGroupId | null;
      if (!group || !muscleMap.has(group)) continue;
      const stat = muscleMap.get(group)!;
      stat.sessions.add(`act-${act.id}`);
      stat.exercises += 1;
      stat.volume += act.totalVolume ?? 0;
      if (!stat.lastTrained || act.logDate > stat.lastTrained) stat.lastTrained = act.logDate;
    }

    const muscleStats = MUSCLE_GROUPS.map(id => {
      const s = muscleMap.get(id)!;
      return {
        id,
        sessions: s.sessions.size,
        exercises: s.exercises,
        volume: Math.round(s.volume * 10) / 10,
        lastTrained: s.lastTrained,
      };
    });

    const insights = buildMuscleInsights(muscleStats, user?.gymDaysPerWeek ?? 3, periodDays);

    const totalVolume = muscleStats.reduce((s, m) => s + m.volume, 0);
    const totalSessions = new Set([
      ...workoutSessions.map(s => s.id),
      ...gymActivities.map(a => `act-${a.id}`),
    ]).size;

    return res.json({
      ...insights,
      totals: {
        sessions: totalSessions,
        volume: Math.round(totalVolume * 10) / 10,
        exercises: muscleStats.reduce((s, m) => s + m.exercises, 0),
      },
    });
  } catch (error) {
    console.error('getWorkoutInsights error:', error);
    return res.status(500).json({ error: 'Failed to fetch workout insights' });
  }
};

export const getWorkoutHistory = async (req: AuthRequest, res: Response) => {
  try {
    const data = await fetchSessionHistory(req.userId!);
    return res.json(data);
  } catch (error) {
    console.error('getWorkoutHistory error:', error);
    return res.status(500).json({ error: 'Failed to fetch workout history' });
  }
};

export const getActiveWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.workoutSession.findFirst({
      where: { userId: req.userId, status: 'active' },
      include: sessionInclude,
    });

    if (!session) return res.json(null);

    const perfMap = await getLastPerformanceMap(
      req.userId!,
      session.exercises.map(ex => ex.name),
    );

    const exercises = session.exercises.map((ex) => {
      const sets = ex.sets.map(s => ({ weight: s.weight, reps: s.reps }));
      const last = perfMap.get(ex.name.trim().toLowerCase());
      return {
        ...ex,
        volume: exerciseVolume(sets),
        progress: sessionExerciseProgress(sets, last?.sets ?? null),
        lastPerformance: last ? { sets: last.sets } : null,
      };
    });

    const totalVolume = exercises.reduce((sum, ex) => sum + ex.volume, 0);
    const targetVolume = exercises.reduce((sum, ex) => sum + ex.progress.targetVolume, 0);
    const remainingVolume = Math.max(0, Math.round((targetVolume - totalVolume) * 10) / 10);

    return res.json({
      ...session,
      exercises,
      totalVolume: Math.round(totalVolume * 10) / 10,
      targetVolume: Math.round(targetVolume * 10) / 10,
      remainingVolume,
      sessionProgressPercent: targetVolume > 0
        ? Math.min(100, Math.round((totalVolume / targetVolume) * 100))
        : totalVolume > 0 ? 100 : 0,
    });
  } catch (error) {
    console.error('getActiveWorkout error:', error);
    return res.status(500).json({ error: 'Failed to fetch active workout' });
  }
};

export const startWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = z.object({ name: z.string().optional() }).parse(req.body);

    const existing = await prisma.workoutSession.findFirst({
      where: { userId: req.userId, status: 'active' },
    });
    if (existing) {
      return res.status(400).json({ error: 'You already have an active workout. Finish or cancel it first.' });
    }

    const session = await prisma.workoutSession.create({
      data: { userId: req.userId!, name: name || 'Gym Session' },
      include: sessionInclude,
    });

    return res.status(201).json({ ...session, exercises: [], totalVolume: 0, targetVolume: 0, remainingVolume: 0, sessionProgressPercent: 0 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to start workout' });
  }
};

export const addWorkoutExercise = async (req: AuthRequest, res: Response) => {
  try {
    const data = z.object({
      name: z.string().min(1),
      muscleGroup: z.enum(MUSCLE_GROUPS as unknown as [string, ...string[]]),
    }).parse(req.body);

    const session = await prisma.workoutSession.findFirst({
      where: { id: req.params.sessionId, userId: req.userId, status: 'active' },
      include: { exercises: true },
    });
    if (!session) return res.status(404).json({ error: 'Active workout not found' });

    const exercise = await prisma.workoutExercise.create({
      data: {
        sessionId: session.id,
        name: data.name,
        muscleGroup: data.muscleGroup,
        sortOrder: session.exercises.length,
      },
      include: { sets: true },
    });

    const last = await getLastExercisePerformance(req.userId!, data.name);

    return res.status(201).json({
      ...exercise,
      volume: 0,
      progress: sessionExerciseProgress([], last?.sets ?? null),
      lastPerformance: last,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to add exercise' });
  }
};

export const addWorkoutSet = async (req: AuthRequest, res: Response) => {
  try {
    const data = z.object({
      weight: z.number().positive(),
      reps: z.number().int().positive(),
    }).parse(req.body);

    const exercise = await prisma.workoutExercise.findFirst({
      where: {
        id: req.params.exerciseId,
        sessionId: req.params.sessionId,
        session: { userId: req.userId, status: 'active' },
      },
      include: { sets: true },
    });
    if (!exercise) return res.status(404).json({ error: 'Exercise not found' });

    const set = await prisma.workoutSet.create({
      data: {
        exerciseId: exercise.id,
        setNumber: exercise.sets.length + 1,
        weight: data.weight,
        reps: data.reps,
      },
    });

    const allSets = [...exercise.sets, set].map(s => ({ weight: s.weight, reps: s.reps }));
    const last = await getLastExercisePerformance(req.userId!, exercise.name);

    return res.status(201).json({
      set,
      exercise: {
        id: exercise.id,
        volume: exerciseVolume(allSets),
        progress: sessionExerciseProgress(allSets, last?.sets ?? null),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to log set' });
  }
};

export const deleteWorkoutSet = async (req: AuthRequest, res: Response) => {
  try {
    const set = await prisma.workoutSet.findFirst({
      where: {
        id: req.params.setId,
        exerciseId: req.params.exerciseId,
        exercise: {
          sessionId: req.params.sessionId,
          session: { userId: req.userId, status: 'active' },
        },
      },
      include: { exercise: { include: { sets: true } } },
    });
    if (!set) return res.status(404).json({ error: 'Set not found' });

    await prisma.workoutSet.delete({ where: { id: set.id } });

    const remaining = set.exercise.sets.filter(s => s.id !== set.id);
    for (let i = 0; i < remaining.length; i++) {
      await prisma.workoutSet.update({
        where: { id: remaining[i].id },
        data: { setNumber: i + 1 },
      });
    }

    const allSets = remaining.map(s => ({ weight: s.weight, reps: s.reps }));
    const last = await getLastExercisePerformance(req.userId!, set.exercise.name);

    return res.json({
      exercise: {
        id: set.exercise.id,
        sets: remaining,
        volume: exerciseVolume(allSets),
        progress: sessionExerciseProgress(allSets, last?.sets ?? null),
      },
    });
  } catch {
    return res.status(500).json({ error: 'Failed to delete set' });
  }
};

export const completeWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const data = z.object({
      durationMin: z.number().positive().optional(),
      notes: z.string().optional(),
    }).parse(req.body);

    const session = await prisma.workoutSession.findFirst({
      where: { id: req.params.sessionId, userId: req.userId, status: 'active' },
      include: sessionInclude,
    });
    if (!session) return res.status(404).json({ error: 'Active workout not found' });
    if (session.exercises.length === 0) {
      return res.status(400).json({ error: 'Add at least one exercise before finishing' });
    }

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    const durationMin = data.durationMin ?? Math.max(
      1,
      Math.round((Date.now() - session.startedAt.getTime()) / 60000),
    );

    const completed = await prisma.workoutSession.update({
      where: { id: session.id },
      data: {
        status: 'completed',
        completedAt: new Date(),
        durationMin,
        notes: data.notes,
      },
      include: sessionInclude,
    });

    for (const ex of session.exercises) {
      if (ex.sets.length === 0) continue;
      const sets = ex.sets;
      const startWeight = sets[0].weight;
      const startReps = sets[0].reps;
      const endWeight = sets[sets.length - 1].weight;
      const endReps = sets[sets.length - 1].reps;
      const totalVolume = exerciseVolume(sets);

      const caloriesBurned = user?.currentWeight
        ? calculateCaloriesBurned('gym', durationMin / session.exercises.length, user.currentWeight)
        : 0;

      await prisma.activityLog.create({
        data: {
          userId: req.userId!,
          activityType: 'gym',
          name: ex.name,
          muscleGroup: ex.muscleGroup,
          duration: Math.round(durationMin / session.exercises.length),
          caloriesBurned,
          sets: sets.length,
          reps: startReps,
          weightUsed: startWeight,
          startWeight,
          startReps,
          endWeight,
          endReps,
          totalVolume,
          notes: [
            data.notes,
            `${WORKOUT_SESSION_NOTE_PREFIX}${session.id}`,
          ].filter(Boolean).join(' | '),
          logDate: new Date(),
        },
      });
    }

    return res.json(enrichSession(completed as any));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    return res.status(500).json({ error: 'Failed to complete workout' });
  }
};

export const cancelWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const session = await prisma.workoutSession.findFirst({
      where: { id: req.params.sessionId, userId: req.userId, status: 'active' },
    });
    if (!session) return res.status(404).json({ error: 'Active workout not found' });

    await prisma.workoutSession.update({
      where: { id: session.id },
      data: { status: 'cancelled', completedAt: new Date() },
    });

    return res.json({ message: 'Workout cancelled' });
  } catch {
    return res.status(500).json({ error: 'Failed to cancel workout' });
  }
};

export const getMyExercises = async (req: AuthRequest, res: Response) => {
  try {
    const exercises = await getUserExerciseLibrary(req.userId!);
    return res.json(exercises.map(ex => ({
      ...ex,
      lastUsed: ex.lastUsed.toISOString(),
    })));
  } catch (error) {
    console.error('getMyExercises error:', error);
    return res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};

export const getExerciseHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.query as { name?: string };
    if (!name?.trim()) return res.status(400).json({ error: 'Exercise name required' });

    const last = await getLastExercisePerformance(req.userId!, name);
    return res.json(last);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch exercise history' });
  }
};
