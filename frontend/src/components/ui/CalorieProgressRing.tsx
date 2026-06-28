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
  size = 200,
}: CalorieProgressRingProps) {
  const targetPct = goal > 0 ? Math.min(consumed / goal, 1) : 0;
  const [animatedPct, setAnimatedPct] = useState(0);
  const isOver = remaining < 0;
  const ringColor = isOver ? 'var(--coral)' : 'var(--accent)';
  const degrees = animatedPct * 360;
  const innerSize = size - 12;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedPct(targetPct));
    return () => cancelAnimationFrame(frame);
  }, [targetPct]);

  return (
    <div
      className="relative shrink-0 animate-ring-pulse"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full transition-[background] duration-[600ms] ease-out"
        style={{
          background: `conic-gradient(${ringColor} ${degrees}deg, var(--ring-track) ${degrees}deg)`,
        }}
      />
      <div
        className="absolute flex flex-col items-center justify-center bg-bg rounded-full"
        style={{
          inset: 6,
          width: innerSize,
          height: innerSize,
        }}
      >
        {isOver ? (
          <>
            <span className="font-mono font-light text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-coral leading-none">
              −{Math.abs(Math.round(remaining)).toLocaleString()}
            </span>
            <span className="label-caps mt-2 text-coral">over</span>
          </>
        ) : (
          <>
            <span className="font-mono font-light text-[clamp(2rem,5vw,3.5rem)] tracking-wider text-accent leading-none">
              {Math.round(remaining).toLocaleString()}
            </span>
            <span className="label-caps mt-2">left</span>
          </>
        )}
      </div>
    </div>
  );
}
