export const MUSCLE_GROUPS = ['chest', 'back', 'shoulder', 'biceps', 'triceps', 'legs'] as const;
export type MuscleGroupId = (typeof MUSCLE_GROUPS)[number];

export function setVolume(weight: number, reps: number): number {
  return Math.round(weight * reps * 10) / 10;
}

export function exerciseVolume(sets: { weight: number; reps: number }[]): number {
  return Math.round(sets.reduce((sum, s) => sum + s.weight * s.reps, 0) * 10) / 10;
}

export function progressiveOverloadTarget(lastVolume: number): number {
  if (lastVolume <= 0) return 0;
  return Math.round(lastVolume * 1.05 * 10) / 10;
}

type MuscleStats = {
  id: MuscleGroupId;
  sessions: number;
  exercises: number;
  volume: number;
  lastTrained: Date | null;
};

export function buildMuscleInsights(
  muscleStats: MuscleStats[],
  gymDaysPerWeek = 3,
  periodDays = 28,
) {
  const expectedPerGroup = Math.max(1, Math.round((gymDaysPerWeek * periodDays) / 7 / 2));
  const maxVolume = Math.max(...muscleStats.map(m => m.volume), 1);

  const ranked = muscleStats.map(m => {
    const volumeScore = m.volume / maxVolume;
    const frequencyScore = Math.min(m.sessions / expectedPerGroup, 1);
    const balanceScore = (volumeScore + frequencyScore) / 2;
    const daysSince = m.lastTrained
      ? Math.floor((Date.now() - m.lastTrained.getTime()) / (1000 * 60 * 60 * 24))
      : periodDays + 1;

    return {
      ...m,
      volumeScore: Math.round(volumeScore * 100),
      frequencyScore: Math.round(frequencyScore * 100),
      balanceScore: Math.round(balanceScore * 100),
      daysSinceLastTrained: daysSince,
      status:
        balanceScore < 0.35 ? 'neglected' :
        balanceScore < 0.55 ? 'undertrained' :
        balanceScore > 0.85 ? 'strong' : 'balanced',
    };
  });

  const neglected = ranked
    .filter(m => m.status === 'neglected' || m.status === 'undertrained')
    .sort((a, b) => a.balanceScore - b.balanceScore);

  const recommendations = neglected.slice(0, 3).map(m => ({
    muscleGroup: m.id,
    reason:
      m.sessions === 0
        ? `No ${m.id} work in the last ${periodDays} days`
        : m.daysSinceLastTrained > 7
          ? `Last trained ${m.daysSinceLastTrained} days ago — add ${m.id} this week`
          : `Lower volume than other groups — prioritize ${m.id}`,
    priority: m.status === 'neglected' ? 'high' : 'medium',
  }));

  return {
    periodDays,
    expectedSessionsPerGroup: expectedPerGroup,
    muscleGroups: ranked,
    focusAreas: recommendations,
    summary: recommendations.length > 0
      ? `Focus on ${recommendations.map(r => r.muscleGroup).join(', ')} this week`
      : 'Your training balance looks good — keep it up!',
  };
}

export function sessionExerciseProgress(
  currentSets: { weight: number; reps: number }[],
  lastSets: { weight: number; reps: number }[] | null,
) {
  const currentVolume = exerciseVolume(currentSets);
  const lastVolume = lastSets ? exerciseVolume(lastSets) : 0;
  const targetVolume = progressiveOverloadTarget(lastVolume);
  const remaining = Math.max(0, Math.round((targetVolume - currentVolume) * 10) / 10);

  const lastTopSet = lastSets?.length
    ? lastSets.reduce((best, s) => (s.weight * s.reps > best.weight * best.reps ? s : best), lastSets[0])
    : null;

  const currentTopSet = currentSets.length
    ? currentSets.reduce((best, s) => (s.weight * s.reps > best.weight * best.reps ? s : best), currentSets[0])
    : null;

  let suggestion: string | null = null;
  if (!lastTopSet) {
    suggestion = 'First time logging this exercise — establish your baseline today';
  } else if (currentVolume >= targetVolume && targetVolume > 0) {
    suggestion = 'Volume target hit — great progressive overload!';
  } else if (currentTopSet && lastTopSet) {
    if (currentTopSet.weight < lastTopSet.weight) {
      suggestion = `Try ${lastTopSet.weight} kg on your next set (matched last session's top weight)`;
    } else if (currentTopSet.reps < lastTopSet.reps) {
      suggestion = `Aim for ${lastTopSet.reps} reps at ${currentTopSet.weight} kg`;
    } else if (remaining > 0) {
      suggestion = `${remaining} kg·reps more to beat last session (+5%)`;
    }
  } else if (remaining > 0) {
    suggestion = `${remaining} kg·reps more to beat last session (+5%)`;
  }

  return {
    currentVolume,
    lastVolume,
    targetVolume,
    remainingVolume: remaining,
    progressPercent: targetVolume > 0
      ? Math.min(100, Math.round((currentVolume / targetVolume) * 100))
      : currentVolume > 0 ? 100 : 0,
    lastTopSet,
    currentTopSet,
    suggestion,
    isPR: lastVolume > 0 && currentVolume > lastVolume,
  };
}
