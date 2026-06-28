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
