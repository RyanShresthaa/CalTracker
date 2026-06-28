export const GYM_MUSCLE_GROUPS = [
  {
    id: 'chest',
    label: 'Chest',
    emoji: '🫁',
    exercises: ['Bench Press', 'Incline Bench Press', 'Dumbbell Fly', 'Cable Crossover', 'Push-ups', 'Chest Dip'],
  },
  {
    id: 'back',
    label: 'Back',
    emoji: '🔙',
    exercises: ['Deadlift', 'Barbell Row', 'Lat Pulldown', 'Pull-ups', 'Seated Cable Row', 'T-Bar Row'],
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    emoji: '💪',
    exercises: ['Shoulder Press', 'Lateral Raise', 'Front Raise', 'Arnold Press', 'Face Pull', 'Shrugs'],
  },
  {
    id: 'biceps',
    label: 'Biceps',
    emoji: '💪',
    exercises: ['Barbell Curl', 'Dumbbell Curl', 'Hammer Curl', 'Preacher Curl', 'Cable Curl', 'Chin-ups'],
  },
  {
    id: 'triceps',
    label: 'Triceps',
    emoji: '🦾',
    exercises: ['Tricep Pushdown', 'Skull Crusher', 'Tricep Dips', 'Overhead Extension', 'Close-Grip Bench', 'Kickback'],
  },
  {
    id: 'legs',
    label: 'Legs',
    emoji: '🦵',
    exercises: ['Squat', 'Leg Press', 'Romanian Deadlift', 'Leg Curl', 'Leg Extension', 'Lunges', 'Calf Raise'],
  },
] as const;

export type MuscleGroupId = typeof GYM_MUSCLE_GROUPS[number]['id'];

export function calcTotalVolume(
  sets: number,
  startWeight: number,
  startReps: number,
  endWeight: number,
  endReps: number,
): number {
  if (sets <= 0 || startWeight <= 0 || startReps <= 0) return 0;
  if (sets === 1) return Math.round(startWeight * startReps * 10) / 10;

  let volume = 0;
  for (let i = 0; i < sets; i++) {
    const t = i / (sets - 1);
    const weight = startWeight + t * (endWeight - startWeight);
    const reps = startReps + t * (endReps - startReps);
    volume += weight * reps;
  }
  return Math.round(volume * 10) / 10;
}

export function muscleGroupLabel(id?: string | null) {
  return GYM_MUSCLE_GROUPS.find(g => g.id === id)?.label ?? id;
}

export function exerciseVolumeFromSets(sets: { weight: number; reps: number }[]): number {
  return Math.round(sets.reduce((sum, s) => sum + s.weight * s.reps, 0) * 10) / 10;
}

export function summarizeExerciseSets(sets: { weight: number; reps: number }[]) {
  if (!sets.length) {
    return { setCount: 0, totalReps: 0, maxWeight: 0, volume: 0, topSet: null as { weight: number; reps: number } | null };
  }
  const totalReps = sets.reduce((sum, s) => sum + s.reps, 0);
  const maxWeight = Math.max(...sets.map(s => s.weight));
  const topSet = sets.reduce(
    (best, s) => (s.weight * s.reps > best.weight * best.reps ? s : best),
    sets[0],
  );
  return {
    setCount: sets.length,
    totalReps,
    maxWeight,
    volume: exerciseVolumeFromSets(sets),
    topSet,
  };
}

export function summarizeSession(exercises: { sets?: { weight: number; reps: number }[] }[]) {
  let totalSets = 0;
  let totalReps = 0;
  let totalVolume = 0;
  let maxWeight = 0;

  for (const ex of exercises) {
    const sets = ex.sets ?? [];
    const stats = summarizeExerciseSets(sets);
    totalSets += stats.setCount;
    totalReps += stats.totalReps;
    totalVolume += stats.volume;
    maxWeight = Math.max(maxWeight, stats.maxWeight);
  }

  return {
    exerciseCount: exercises.length,
    totalSets,
    totalReps,
    totalVolume: Math.round(totalVolume * 10) / 10,
    maxWeight,
  };
}
