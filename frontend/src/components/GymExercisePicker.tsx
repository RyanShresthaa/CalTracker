import { Badge } from '@/components/ui/badge';
import { muscleGroupLabel } from '@/lib/gymTracking';
import { cn } from '@/lib/utils';
import { History } from 'lucide-react';

export type MyExercise = {
  name: string;
  muscleGroup: string;
  lastUsed: string;
  timesLogged: number;
  lastStartWeight: number | null;
  lastStartReps: number | null;
  lastEndWeight: number | null;
  lastEndReps: number | null;
  lastSets: number | null;
  sources: ('activity' | 'workout')[];
};

type MyExercisesProps = {
  exercises: MyExercise[];
  muscleGroup?: string;
  onSelect: (exercise: MyExercise) => void;
  className?: string;
};

export default function MyExercises({ exercises, muscleGroup, onSelect, className }: MyExercisesProps) {
  const filtered = muscleGroup
    ? exercises.filter(ex => ex.muscleGroup === muscleGroup)
    : exercises;

  const list = muscleGroup ? filtered : exercises.slice(0, 12);

  if (list.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
        <History className="h-3.5 w-3.5" />
        Your exercises
        <span className="text-muted-foreground/70">— from Activity & Workout</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {list.map(ex => (
          <button
            key={`${ex.muscleGroup}-${ex.name}`}
            type="button"
            onClick={() => onSelect(ex)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted"
          >
            <span className="font-medium text-foreground">{ex.name}</span>
            {!muscleGroup && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-normal">
                {muscleGroupLabel(ex.muscleGroup)}
              </Badge>
            )}
            {ex.lastStartWeight != null && ex.lastStartReps != null && (
              <span className="text-muted-foreground tabular-nums">
                {ex.lastStartWeight}×{ex.lastStartReps}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function exerciseSelectOptions(
  muscleGroupId: string,
  presetExercises: readonly string[],
  myExercises: MyExercise[],
): string[] {
  const presets = new Set(presetExercises);
  const mine = myExercises
    .filter(ex => ex.muscleGroup === muscleGroupId)
    .map(ex => ex.name)
    .filter(name => !presets.has(name));

  return [...presetExercises, ...mine];
}
