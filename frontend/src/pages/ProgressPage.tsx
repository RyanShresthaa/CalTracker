import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { ChartLine } from 'phosphor-react';
import { useProgressData } from '../lib/hooks';
import { format, subDays, parse } from 'date-fns';

const CHART_COLORS = {
  calories: '#6366f1',
  protein: '#3b82f6',
  carbs: '#22c55e',
  fat: '#f59e0b',
  water: '#06b6d4',
  weight: '#8b5cf6',
  burned: '#f97316',
};

function ChartCard({ title, children, period, onPeriodChange }: any) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        {onPeriodChange && (
          <div className="flex gap-1">
            {[7, 30].map(d => (
              <button key={d} onClick={() => onPeriodChange(d)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors
                  ${period === d ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
                {d}d
              </button>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 text-slate-400">
      <ChartLine size={36} className="mb-2 opacity-40" />
      <p className="text-sm">No {label} data yet</p>
    </div>
  );
}

function formatChartDay(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEE');
}

function formatChartDayLong(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEEE, MMM d');
}

export default function ProgressPage() {
  const [period, setPeriod] = useState(7);
  const { isLoading, weeklyData, weightLogs, activityData } = useProgressData();
  const hasWeeklyCalories = weeklyData.some((d: { calories: number }) => d.calories > 0);

  const weightChartData = weightLogs.map((l: any) => ({
    date: l.logDate,
    weight: l.weight,
  }));

  const activityChartData = (() => {
    const map: Record<string, { date: string; calories: number; duration: number }> = {};
    for (let i = 0; i < 30; i++) {
      const d = format(subDays(new Date(), i), 'yyyy-MM-dd');
      map[d] = { date: d, calories: 0, duration: 0 };
    }
    for (const act of activityData) {
      const d = format(new Date(act.logDate), 'yyyy-MM-dd');
      if (map[d]) {
        map[d].calories += act.caloriesBurned;
        map[d].duration += act.duration;
      }
    }
    return Object.values(map).reverse();
  })();

  const tooltipStyle = { background: 'var(--bg-card)', border: 'none', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-72 rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Progress</h1>
        <p className="text-slate-500">Visualize your health journey</p>
      </div>

      {/* Weekly calorie summary */}
      <ChartCard title="Weekly Calories Consumed" period={period} onPeriodChange={setPeriod}>
        {hasWeeklyCalories ? (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.calories} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={CHART_COLORS.calories} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="date" tickFormatter={formatChartDay} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={formatChartDayLong} />
              <Area type="monotone" dataKey="calories" stroke={CHART_COLORS.calories} fill="url(#calGrad)" strokeWidth={2} name="Calories (kcal)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : <EmptyChart label="calorie" />}
      </ChartCard>

      {/* Macro breakdown */}
      <ChartCard title="Weekly Macros">
        {hasWeeklyCalories ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="date" tickFormatter={formatChartDay} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={formatChartDayLong} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="protein" fill={CHART_COLORS.protein} name="Protein (g)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="carbs" fill={CHART_COLORS.carbs} name="Carbs (g)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="fat" fill={CHART_COLORS.fat} name="Fat (g)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <EmptyChart label="macro" />}
      </ChartCard>

      {/* Weight trend */}
      <ChartCard title="Weight Trend (30 days)">
        {weightChartData.length < 2 ? <EmptyChart label="weight" /> : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weightChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={d => format(new Date(d), 'MMM d, yyyy')} formatter={(v: any) => [`${v} kg`, 'Weight']} />
              <Line type="monotone" dataKey="weight" stroke={CHART_COLORS.weight} strokeWidth={2.5} dot={{ fill: CHART_COLORS.weight, r: 4 }} name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Activity calories burned */}
      <ChartCard title="Calories Burned (30 days)">
        {activityChartData.every(d => d.calories === 0) ? <EmptyChart label="activity" /> : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={activityChartData.slice(-14)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={d => format(new Date(d), 'MMM d, yyyy')} />
              <Bar dataKey="calories" fill={CHART_COLORS.burned} name="Calories Burned" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      {/* Workout duration */}
      <ChartCard title="Workout Duration (30 days)">
        {activityChartData.every(d => d.duration === 0) ? <EmptyChart label="workout" /> : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityChartData.slice(-14)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="durGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
              <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={d => format(new Date(d), 'MMM d, yyyy')} formatter={(v: any) => [`${v} min`, 'Duration']} />
              <Area type="monotone" dataKey="duration" stroke="#22c55e" fill="url(#durGrad)" strokeWidth={2} name="Duration (min)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
