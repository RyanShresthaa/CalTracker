interface MacroBarProps {
  label: string;
  consumed: number;
  goal: number;
  color: string;
}

export default function MacroBar({ label, consumed, goal, color }: MacroBarProps) {
  const pct = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0;

  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="label-caps">{label}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {Math.round(consumed)}g / {goal}g
        </span>
      </div>
      <div className="macro-line">
        <div className="macro-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}
