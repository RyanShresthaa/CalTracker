/** Parse yyyy-MM-dd as local calendar day (not UTC midnight). */
export function parseLogDate(dateStr?: string): Date {
  if (!dateStr) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return new Date();
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

/** yyyy-MM-dd in local timezone (avoids UTC shift from toISOString). */
export function localDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function dayBounds(dateStr?: string): { start: Date; end: Date } {
  const start = parseLogDate(dateStr);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

export function todayBounds(): { start: Date; end: Date } {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}

/** Last N calendar days including today (start at local midnight). */
export function lastNDaysStart(days: number): Date {
  const { start: today } = todayBounds();
  const start = new Date(today);
  start.setDate(start.getDate() - (days - 1));
  return start;
}
