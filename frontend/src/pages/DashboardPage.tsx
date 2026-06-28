import { Link } from 'react-router-dom';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { ForkKnife, Drop, Scales, Lightning, Fire, TrendUp, Trophy, ArrowRight } from 'phosphor-react';
import { useDashboard } from '../lib/hooks';
import { format, parse } from 'date-fns';

const MACRO_COLORS = ['#6366f1', '#22c55e', '#f59e0b'];

const MEAL_META: Record<string, { emoji: string; label: string }> = {
  breakfast: { emoji: '🌅', label: 'Breakfast' },
  lunch: { emoji: '☀️', label: 'Lunch' },
  dinner: { emoji: '🌙', label: 'Dinner' },
  snacks: { emoji: '🍎', label: 'Snacks' },
};

function logFoodName(log: any): string {
  return log.food?.name || log.customFood?.name || log.recipe?.name || 'Unknown food';
}

function formatChartDay(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEE');
}

function formatChartDayLong(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEE MMM d');
}

function StatCard({ title, value, sub, icon: Icon, color, progress, to }: any) {
  return (
    <Link to={to || '#'} className="card-hover group block">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{title}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      {progress !== undefined && (
        <div className="mt-3 progress-bar">
          <div className="progress-fill bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${Math.min(progress, 100)}%` }} />
        </div>
      )}
    </Link>
  );
}

function MacroBar({ label, consumed, goal, color }: any) {
  const pct = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <span className="text-slate-500">{Math.round(consumed)}g / {goal}g</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="skeleton h-64 rounded-2xl lg:col-span-2" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <Skeleton />;
  if (!data) return <div className="card text-center py-12 text-slate-500">Failed to load dashboard</div>;

  const { calories, macros, water, streak, weeklyData, activities, meals, user: profileUser } = data;
  const mealsByType = meals ?? { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const calPct = calories.goal > 0 ? (calories.consumed / calories.goal) * 100 : 0;
  const waterPct = water.goal > 0 ? (water.consumed / water.goal) * 100 : 0;
  const isLossGoal = profileUser?.goal === 'lose_weight';
  const hasExerciseBonus = (calories.exerciseBonus ?? 0) > 0;

  const macroPieData = [
    { name: 'Protein', value: macros.protein.consumed * 4 },
    { name: 'Carbs', value: macros.carbs.consumed * 4 },
    { name: 'Fat', value: macros.fat.consumed * 9 },
  ];

  const today = format(new Date(), 'EEEE, MMMM d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400">{today}</p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 rounded-xl">
            <Trophy size={20} weight="fill" className="text-amber-500" />
            <span className="font-bold text-amber-600 dark:text-amber-400">{streak} day streak!</span>
          </div>
        )}
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Budget" value={calories.goal.toLocaleString()}
          sub={hasExerciseBonus
            ? `${calories.baseGoal?.toLocaleString() ?? calories.goal} base + ${calories.exerciseBonus} exercise`
            : isLossGoal
              ? 'fixed recomp target — training creates deficit'
              : 'kcal you can eat today'}
          icon={Fire} color="bg-indigo-500" to="/food-log" />
        <StatCard title="Consumed" value={Math.round(calories.consumed).toLocaleString()}
          sub={`${Math.round(calPct)}% of budget`} icon={ForkKnife}
          color="bg-emerald-500" progress={calPct} to="/food-log" />
        <StatCard title="Burned" value={Math.round(calories.burned).toLocaleString()}
          sub={hasExerciseBonus ? 'added to today\'s budget' : isLossGoal ? 'creates your deficit today' : 'log activity to track burn'}
          icon={Lightning} color="bg-orange-500" to="/activity" />
        <StatCard title="Remaining" value={Math.max(0, calories.remaining).toLocaleString()}
          sub={calories.remaining < 0 ? '⚠️ Over budget' : 'kcal left today'}
          icon={TrendUp} color={calories.remaining < 0 ? 'bg-red-500' : 'bg-purple-500'}
          to="/food-log" />
      </div>

      {/* Macros + Water */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Today's Macros</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[
              { label: 'Protein', consumed: macros.protein.consumed, goal: macros.protein.goal, color: '#6366f1', unit: 'g' },
              { label: 'Carbs', consumed: macros.carbs.consumed, goal: macros.carbs.goal, color: '#22c55e', unit: 'g' },
              { label: 'Fat', consumed: macros.fat.consumed, goal: macros.fat.goal, color: '#f59e0b', unit: 'g' },
            ].map(m => (
              <div key={m.label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: m.color }}>{Math.round(m.consumed)}</div>
                <div className="text-xs text-slate-500">/ {m.goal}g {m.label}</div>
                <div className="mt-2 progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min((m.consumed / m.goal) * 100, 100)}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>
          {/* Pie */}
          <div className="flex items-center gap-4">
            <div className="w-[100px] h-[100px]">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={macroPieData} cx="50%" cy="50%" innerRadius={25} outerRadius={45} dataKey="value" strokeWidth={0}>
                  {macroPieData.map((_, i) => <Cell key={i} fill={MACRO_COLORS[i]} />)}
                </Pie>
              </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5">
              {macroPieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ background: MACRO_COLORS[i] }} />
                  <span className="text-slate-600 dark:text-slate-400">{item.name}: {Math.round(item.value)} kcal</span>
                </div>
              ))}
              <div className="text-xs text-slate-400 pt-1">Total: {Math.round(calories.consumed)} kcal</div>
            </div>
          </div>
        </div>

        {/* Water */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Water Intake</h3>
            <Link to="/water" className="text-xs text-indigo-500 hover:underline">Log</Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-700" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - waterPct / 100)}`}
                  strokeLinecap="round" className="transition-all duration-700" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Drop size={20} weight="fill" className="text-blue-500 mb-0.5" />
                <span className="text-xl font-bold text-slate-900 dark:text-white">{Math.round(waterPct)}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{water.consumed} ml</p>
            <p className="text-sm text-slate-500 mt-1">of {water.goal} ml goal</p>
            <p className="text-xs text-slate-400 mt-0.5">{Math.max(0, water.goal - water.consumed)} ml remaining</p>
          </div>
        </div>
      </div>

      {/* Weekly chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-white">Weekly Calories</h3>
          <Link to="/progress" className="text-xs text-indigo-500 hover:underline">View all →</Link>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="calGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis dataKey="date" tickFormatter={formatChartDay}
              className="text-xs text-slate-500" tick={{ fontSize: 11 }} />
            <YAxis className="text-xs text-slate-500" tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{ background: 'var(--bg-card)', border: 'none', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
              labelFormatter={formatChartDayLong}
              formatter={(value: number) => [`${value} kcal`, 'Calories']}
            />
            <Area type="monotone" dataKey="calories" stroke="#6366f1" fill="url(#calGradient)" strokeWidth={2} name="Calories" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row: Today's meals + activities */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Meals quick view */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Today's Meals</h3>
            <Link to="/food-log" className="text-xs text-indigo-500 hover:underline">Add food →</Link>
          </div>
          <div className="space-y-3">
            {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(meal => {
              const logs = mealsByType[meal] ?? [];
              const totalKcal = logs.reduce((sum: number, l: any) => sum + l.calories, 0);
              const meta = MEAL_META[meal];
              return (
                <div key={meal} className="py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{meta.emoji}</span>
                      <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{meta.label}</span>
                      {logs.length > 0 && (
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {Math.round(totalKcal)} kcal
                        </span>
                      )}
                    </div>
                    <Link to="/food-log" className="text-xs text-indigo-500 hover:underline">+ Add</Link>
                  </div>
                  {logs.length === 0 ? (
                    <p className="text-xs text-slate-400 pl-7">Nothing logged yet</p>
                  ) : (
                    <div className="pl-7 space-y-1">
                      {logs.slice(0, 3).map((log: any) => (
                        <div key={log.id} className="flex items-center justify-between gap-2">
                          <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{logFoodName(log)}</p>
                          <span className="text-xs font-medium text-slate-500 shrink-0">{Math.round(log.calories)} kcal</span>
                        </div>
                      ))}
                      {logs.length > 3 && (
                        <p className="text-xs text-slate-400">+{logs.length - 3} more</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Activities */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">Today's Activities</h3>
            <Link to="/activity" className="text-xs text-indigo-500 hover:underline">Log activity →</Link>
          </div>
          {activities.length === 0 ? (
            <div className="text-center py-6">
              <Lightning size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">No activities logged yet</p>
              <Link to="/activity" className="text-xs text-indigo-500 hover:underline mt-1 inline-block">Log your first workout</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {activities.slice(0, 4).map((a: any) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.duration} min</p>
                  </div>
                  <span className="text-sm font-semibold text-orange-500">-{a.caloriesBurned} kcal</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
