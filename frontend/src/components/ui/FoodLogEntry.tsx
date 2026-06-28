import { Trash } from 'lucide-react'
import { formatLoggedAmount } from '../../lib/foodUnits'
import { Button } from './button'

interface FoodLogEntryProps {
  log: {
    id: string
    calories: number
    protein: number
    carbs: number
    fat: number
    amount: number
    createdAt?: string
    food?: { name: string; servingSize?: number; servingUnit?: string }
    customFood?: { name: string; servingSize?: number; servingUnit?: string }
    recipe?: { name: string; servingSize?: number; servingUnit?: string }
  }
  onDelete: (id: string) => void
}

function logTime(createdAt?: string): string {
  if (!createdAt) return '—'
  try {
    return new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    return '—'
  }
}

export default function FoodLogEntry({ log, onDelete }: FoodLogEntryProps) {
  const food = log.food || log.customFood || log.recipe
  const foodName = food?.name || 'Unknown food'
  const serving = formatLoggedAmount(log.amount, food as Parameters<typeof formatLoggedAmount>[1])

  return (
    <div className="group divider-row row-hover">
      <div className="flex items-center gap-4 py-3 px-1">
        <span className="text-xs text-muted-foreground w-12 shrink-0 tabular-nums">
          {logTime(log.createdAt)}
        </span>
        <div className="flex-1 min-w-0 flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <span className="text-sm text-foreground truncate block">{foodName}</span>
            <span className="text-xs text-muted-foreground">{serving}</span>
          </div>
          <span className="text-sm text-foreground shrink-0 tabular-nums">
            {Math.round(log.calories)} kcal
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onDelete(log.id)}
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            aria-label="Delete entry"
          >
            <Trash className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden max-h-0 group-hover:max-h-12 transition-[max-height] duration-300 ease-out">
        <div className="flex gap-6 pl-16 pb-3 text-xs text-muted-foreground">
          <span>P {Math.round(log.protein)}g</span>
          <span>C {Math.round(log.carbs)}g</span>
          <span>F {Math.round(log.fat)}g</span>
        </div>
      </div>
    </div>
  )
}
