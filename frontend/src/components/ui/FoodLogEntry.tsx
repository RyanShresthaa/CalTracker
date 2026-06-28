import { Trash } from 'phosphor-react';
import { formatLoggedAmount } from '../../lib/foodUnits';

interface FoodLogEntryProps {
  log: {
    id: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    amount: number;
    createdAt?: string;
    food?: { name: string; servingSize?: number; servingUnit?: string };
    customFood?: { name: string; servingSize?: number; servingUnit?: string };
    recipe?: { name: string; servingSize?: number; servingUnit?: string };
  };
  onDelete: (id: string) => void;
}

function logTime(createdAt?: string): string {
  if (!createdAt) return '—';
  try {
    return new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
}

export default function FoodLogEntry({ log, onDelete }: FoodLogEntryProps) {
  const food = log.food || log.customFood || log.recipe;
  const foodName = food?.name || 'Unknown food';
  const serving = formatLoggedAmount(log.amount, food as Parameters<typeof formatLoggedAmount>[1]);

  return (
    <div className="group divider-row hover:bg-hover transition-colors duration-200">
      <div className="flex items-center gap-4 py-3 px-1">
        <span className="font-mono text-xs text-muted w-12 shrink-0 tabular-nums">
          {logTime(log.createdAt)}
        </span>
        <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <span className="text-sm text-text-primary truncate block">{foodName}</span>
            <span className="text-xs text-muted">{serving}</span>
          </div>
          <span className="font-mono text-sm text-accent shrink-0 tabular-nums">
            {Math.round(log.calories)} kcal
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          <button
            type="button"
            onClick={() => onDelete(log.id)}
            className="p-1.5 text-muted hover:text-coral transition-colors"
            aria-label="Delete entry"
          >
            <Trash size={14} />
          </button>
        </div>
      </div>
      <div className="overflow-hidden max-h-0 group-hover:max-h-12 transition-[max-height] duration-300 ease-out">
        <div className="flex gap-6 pl-16 pb-3 text-xs font-mono text-muted">
          <span>P {Math.round(log.protein)}g</span>
          <span>C {Math.round(log.carbs)}g</span>
          <span className="text-coral">F {Math.round(log.fat)}g</span>
        </div>
      </div>
    </div>
  );
}
