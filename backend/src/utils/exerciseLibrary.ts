import prisma from '../lib/prisma';

export type UserExercise = {
  name: string;
  muscleGroup: string;
  lastUsed: Date;
  timesLogged: number;
  lastStartWeight: number | null;
  lastStartReps: number | null;
  lastEndWeight: number | null;
  lastEndReps: number | null;
  lastSets: number | null;
  sources: ('activity' | 'workout')[];
};

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

function upsertExercise(
  map: Map<string, UserExercise>,
  entry: Omit<UserExercise, 'timesLogged' | 'sources'> & {
    timesLogged?: number;
    sources: ('activity' | 'workout')[];
  },
) {
  const key = normalizeName(entry.name);
  const existing = map.get(key);

  if (!existing) {
    map.set(key, {
      ...entry,
      timesLogged: entry.timesLogged ?? 1,
      sources: [...new Set(entry.sources)],
    });
    return;
  }

  existing.timesLogged += 1;
  for (const s of entry.sources) {
    if (!existing.sources.includes(s)) existing.sources.push(s);
  }

  if (entry.lastUsed >= existing.lastUsed) {
    existing.lastUsed = entry.lastUsed;
    existing.muscleGroup = entry.muscleGroup;
    existing.name = entry.name;
    existing.lastStartWeight = entry.lastStartWeight;
    existing.lastStartReps = entry.lastStartReps;
    existing.lastEndWeight = entry.lastEndWeight;
    existing.lastEndReps = entry.lastEndReps;
    existing.lastSets = entry.lastSets;
  }
}

export async function getUserExerciseLibrary(userId: string, limit = 40): Promise<UserExercise[]> {
  const [activities, workoutExercises] = await Promise.all([
    prisma.activityLog.findMany({
      where: {
        userId,
        activityType: 'gym',
        muscleGroup: { not: null },
      },
      orderBy: { logDate: 'desc' },
      select: {
        name: true,
        muscleGroup: true,
        logDate: true,
        startWeight: true,
        startReps: true,
        endWeight: true,
        endReps: true,
        sets: true,
      },
    }),
    prisma.workoutExercise.findMany({
      where: { session: { userId } },
      orderBy: { session: { startedAt: 'desc' } },
      include: {
        sets: { orderBy: { setNumber: 'asc' } },
        session: { select: { startedAt: true, completedAt: true } },
      },
    }),
  ]);

  const map = new Map<string, UserExercise>();

  for (const act of activities) {
    if (!act.muscleGroup) continue;
    upsertExercise(map, {
      name: act.name.trim(),
      muscleGroup: act.muscleGroup,
      lastUsed: act.logDate,
      lastStartWeight: act.startWeight,
      lastStartReps: act.startReps,
      lastEndWeight: act.endWeight,
      lastEndReps: act.endReps,
      lastSets: act.sets,
      sources: ['activity'],
    });
  }

  for (const ex of workoutExercises) {
    const lastUsed = ex.session.completedAt ?? ex.session.startedAt;
    const firstSet = ex.sets[0];
    const lastSet = ex.sets[ex.sets.length - 1];
    upsertExercise(map, {
      name: ex.name.trim(),
      muscleGroup: ex.muscleGroup,
      lastUsed,
      lastStartWeight: firstSet?.weight ?? null,
      lastStartReps: firstSet?.reps ?? null,
      lastEndWeight: lastSet?.weight ?? firstSet?.weight ?? null,
      lastEndReps: lastSet?.reps ?? firstSet?.reps ?? null,
      lastSets: ex.sets.length || null,
      sources: ['workout'],
    });
  }

  return Array.from(map.values())
    .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
    .slice(0, limit)
    .map(ex => ({
      ...ex,
      lastUsed: ex.lastUsed,
    }));
}
