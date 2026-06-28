import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lightning } from 'phosphor-react';
import { useDashboard } from '../lib/hooks';
import { format, parse } from 'date-fns';
import CalorieProgressRing from '../components/ui/CalorieProgressRing';
import MacroBar from '../components/ui/MacroBar';
import StaggerGrid from '../components/ui/StaggerGrid';

const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
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

function StatBlock({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card p-4">
      <p className="label-caps mb-2">{label}</p>
      <p className="font-mono text-2xl font-light tracking-wider text-text-primary">{value}</p>
      {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="skeleton h-8 w-48" />
      <div className="grid lg:grid-cols-[auto_1fr] gap-4">
        <div className="skeleton h-52 w-52 mx-auto" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-24" />)}
        </div>
      </div>
      <div className="skeleton h-48" />
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) return <Skeleton />;
  if (!data) return <div className="card text-center py-12 text-muted">Failed to load dashboard</div>;

  const { calories, macros, water, streak, weeklyData, activities, meals, user: profileUser } = data;
  const mealsByType = meals ?? { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const waterPct = water.goal > 0 ? (water.consumed / water.goal) * 100 : 0;
  const isLossGoal = profileUser?.goal === 'lose_weight';
  const hasExerciseBonus = (calories.exerciseBonus ?? 0) > 0;

  const today = format(new Date(), 'EEEE, MMMM d');
  const allLogs = (['breakfast', 'lunch', 'dinner', 'snacks'] as const).flatMap(
    meal => (mealsByType[meal] ?? []).map((log: any) => ({ ...log, mealType: meal }))
  );

  const cards = [
    <div key="hero" className="card lg:col-span-2">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <CalorieProgressRing
          consumed={calories.consumed}
          goal={calories.goal}
          remaining={calories.remaining}
        />
        <div className="flex-1 w-full space-y-4">
          <div>
            <p className="label-caps mb-1">Daily budget</p>
            <p className="font-mono text-3xl font-light tracking-wider text-text-primary">
              {calories.goal.toLocaleString()} <span className="text-sm text-muted">kcal</span>
            </p>
            {hasExerciseBonus && (
              <p className="text-xs text-muted mt-1">
                {calories.baseGoal?.toLocaleString() ?? calories.goal} base + {calories.exerciseBonus} exercise
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="label-caps mb-1">Consumed</p>
              <p className="font-mono text-xl font-light tracking-wider text-accent">
                {Math.round(calories.consumed).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="label-caps mb-1">Burned</p>
              <p className="font-mono text-xl font-light tracking-wider text-text-primary">
                {Math.round(calories.burned).toLocaleString()}
              </p>
              <p className="text-xs text-muted mt-0.5">
                {hasExerciseBonus
                  ? 'added to budget'
                  : isLossGoal
                    ? 'creates deficit'
                    : 'log activity to track'}
              </p>
            </div>
          </div>
          {streak > 0 && (
            <p className="text-xs text-muted">{streak} day logging streak</p>
          )}
        </div>
      </div>
    </div>,

    <div key="macros" className="card">
      <p className="label-caps mb-4">Today&apos;s macros</p>
      <div className="space-y-4">
        <MacroBar label="Protein" consumed={macros.protein.consumed} goal={macros.protein.goal} color="#C8F55A" />
        <MacroBar label="Carbs" consumed={macros.carbs.consumed} goal={macros.carbs.goal} color="#F0EDE6" />
        <MacroBar label="Fat" consumed={macros.fat.consumed} goal={macros.fat.goal} color="#FF6B35" />
      </div>
    </div>,

    <div key="water" className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="label-caps">Water</p>
        <Link to="/water" className="label-caps link-accent">Log</Link>
      </div>
      <div className="space-y-3">
        <div className="macro-line">
          <div className="macro-fill bg-accent" style={{ width: `${Math.min(waterPct, 100)}%` }} />
        </div>
        <div className="flex justify-between items-baseline">
          <span className="font-mono text-2xl font-light tracking-wider text-text-primary">
            {water.consumed} <span className="text-sm text-muted">ml</span>
          </span>
          <span className="font-mono text-xs text-muted">/ {water.goal} ml</span>
        </div>
        <p className="text-xs text-muted">
          {Math.max(0, water.goal - water.consumed)} ml remaining
        </p>
      </div>
    </div>,

    <div key="stats" className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border lg:col-span-3">
      <StatBlock
        label="Budget"
        value={calories.goal.toLocaleString()}
        sub={isLossGoal && !hasExerciseBonus ? 'fixed recomp target' : undefined}
      />
      <StatBlock label="Consumed" value={Math.round(calories.consumed).toLocaleString()} />
      <StatBlock label="Burned" value={Math.round(calories.burned).toLocaleString()} />
      <StatBlock
        label="Remaining"
        value={
          calories.remaining < 0
            ? `−${Math.abs(Math.round(calories.remaining)).toLocaleString()}`
            : Math.round(calories.remaining).toLocaleString()
        }
        sub={calories.remaining < 0 ? 'over budget' : undefined}
      />
    </div>,

    <div key="chart" className="card lg:col-span-2">
      <div className="flex items-center justify-between mb-4">
        <p className="label-caps">Weekly calories</p>
        <Link to="/progress" className="label-caps link-accent">View all</Link>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={formatChartDay}
            tick={{ fontSize: 10, fill: '#6B6B6B', fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: '#6B6B6B', fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: 0,
              color: '#F0EDE6',
              fontFamily: 'Inter',
            }}
            labelFormatter={formatChartDayLong}
            formatter={(value: number) => [`${value} kcal`, 'Calories']}
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="#C8F55A"
            fill="#C8F55A"
            fillOpacity={0.12}
            strokeWidth={1.5}
            name="Calories"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>,

    <div key="meals" className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="label-caps">Today&apos;s log</p>
        <Link to="/food-log" className="label-caps link-accent">Add</Link>
      </div>
      {allLogs.length === 0 ? (
        <p className="text-sm text-muted py-6 text-center">
          Nothing logged yet. Add your first meal.
        </p>
      ) : (
        <div>
          {allLogs.slice(0, 8).map((log: any) => (
            <div key={log.id} className="divider-row flex items-center gap-4 py-2.5">
              <span className="font-mono text-xs text-muted w-16 shrink-0 uppercase">
                {MEAL_LABELS[log.mealType]?.slice(0, 3) ?? '—'}
              </span>
              <span className="flex-1 text-sm text-text-primary truncate">{logFoodName(log)}</span>
              <span className="font-mono text-sm text-accent tabular-nums shrink-0">
                {Math.round(log.calories)}
              </span>
            </div>
          ))}
          {allLogs.length > 8 && (
            <p className="text-xs text-muted pt-2">+{allLogs.length - 8} more</p>
          )}
        </div>
      )}
    </div>,

    <div key="activities" className="card">
      <div className="flex items-center justify-between mb-4">
        <p className="label-caps">Activities</p>
        <Link to="/activity" className="label-caps link-accent">Log</Link>
      </div>
      {activities.length === 0 ? (
        <div className="py-6 text-center">
          <Lightning size={24} className="text-border mx-auto mb-2" />
          <p className="text-sm text-muted">No activities logged yet</p>
        </div>
      ) : (
        <div>
          {activities.slice(0, 4).map((a: any) => (
            <div key={a.id} className="divider-row flex items-center justify-between py-2.5">
              <div>
                <p className="text-sm text-text-primary">{a.name}</p>
                <p className="text-xs text-muted font-mono">{a.duration} min</p>
              </div>
              <span className="font-mono text-sm text-coral tabular-nums">−{a.caloriesBurned}</span>
            </div>
          ))}
        </div>
      )}
    </div>,
  ];

  return (
    <div className="space-y-6 pb-8">
      <header className="stagger-item">
        <h1 className="font-mono text-xl font-light tracking-wider text-text-primary uppercase">Dashboard</h1>
        <p className="text-sm text-muted mt-1">{today}</p>
      </header>

      <StaggerGrid className="grid lg:grid-cols-3 gap-px bg-border" delayMs={60}>
        {cards}
      </StaggerGrid>
    </div>
  );
}
