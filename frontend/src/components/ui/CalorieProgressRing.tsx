import { useEffect, useState } from 'react';

interface CalorieProgressRingProps {
  consumed: number;
  goal: number;
  remaining: number;
  size?: number;
}

export default function CalorieProgressRing({
  consumed,
  goal,
  remaining,
  size = 180,
}: CalorieProgressRingProps) {
  const targetPct = goal > 0 ? Math.min(consumed / goal, 1) : 0;
  const [animatedPct, setAnimatedPct] = useState(0);
  const isOver = remaining < 0;
  const ringColor = isOver ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))';
  const degrees = animatedPct * 360;
  const innerSize = size - 10;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedPct(targetPct));
    return () => cancelAnimationFrame(frame);
  }, [targetPct]);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full transition-[background] duration-500 ease-out"
        style={{
          background: `conic-gradient(${ringColor} ${degrees}deg, hsl(var(--ring-track)) ${degrees}deg)`,
        }}
      />
      <div
        className="absolute flex flex-col items-center justify-center rounded-full bg-card"
        style={{ inset: 5, width: innerSize, height: innerSize }}
      >
        {isOver ? (
          <>
            <span className="text-3xl font-semibold tabular-nums leading-none text-destructive">
              −{Math.abs(Math.round(remaining)).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground mt-1">over</span>
          </>
        ) : (
          <>
            <span className="text-3xl font-semibold tabular-nums leading-none text-foreground">
              {Math.round(remaining).toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground mt-1">kcal left</span>
          </>
        )}
      </div>
    </div>
  );
}
