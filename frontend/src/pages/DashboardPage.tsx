import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Zap } from 'lucide-react'
import { useDashboard } from '../lib/hooks'
import { useThemeColors } from '../lib/theme'
import { useThemeStore } from '../store/authStore'
import PageHeader from '../components/ui/PageHeader'
import { format, parse } from 'date-fns'
import CalorieProgressRing from '../components/ui/CalorieProgressRing'
import MacroBar from '../components/ui/MacroBar'
import { Card, CardContent } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'

const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
}

function logFoodName(log: any): string {
  return log.food?.name || log.customFood?.name || log.recipe?.name || 'Unknown food'
}

function formatChartDay(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEE')
}

function formatChartDayLong(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEE MMM d')
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-48" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Skeleton className="h-64 lg:col-span-8" />
        <Skeleton className="h-64 lg:col-span-4" />
        <Skeleton className="h-40 lg:col-span-4" />
        <Skeleton className="h-40 lg:col-span-4" />
        <Skeleton className="h-40 lg:col-span-4" />
        <Skeleton className="h-52 lg:col-span-12" />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard()
  const theme = useThemeColors()
  const darkMode = useThemeStore((s) => s.darkMode)

  if (isLoading) return <DashboardSkeleton />
  if (!data) {
    return (
      <Card>
        <CardContent className="text-center py-12 text-muted">Failed to load dashboard</CardContent>
      </Card>
    )
  }

  const { calories, macros, water, streak, weeklyData, activities, meals, user: profileUser } = data
  const mealsByType = meals ?? { breakfast: [], lunch: [], dinner: [], snacks: [] }
  const waterPct = water.goal > 0 ? (water.consumed / water.goal) * 100 : 0
  const isLossGoal = profileUser?.goal === 'lose_weight'
  const hasExerciseBonus = (calories.exerciseBonus ?? 0) > 0

  const today = format(new Date(), 'EEEE, MMMM d')
  const allLogs = (['breakfast', 'lunch', 'dinner', 'snacks'] as const).flatMap(
    (meal) => (mealsByType[meal] ?? []).map((log: any) => ({ ...log, mealType: meal })),
  )

  return (
    <div className="space-y-6 pb-8">
      <PageHeader title="Dashboard" subtitle={today} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <Card className="lg:col-span-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <CalorieProgressRing
                consumed={calories.consumed}
                goal={calories.goal}
                remaining={calories.remaining}
              />
              <div className="flex-1 w-full grid grid-cols-2 gap-6">
                <div>
                  <p className="label-caps mb-2">Daily budget</p>
                  <p className="text-2xl font-semibold tabular-nums text-foreground tabular-nums">
                    {calories.goal.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted mt-1">kcal</p>
                  {hasExerciseBonus && (
                    <p className="text-xs text-muted mt-2">
                      {calories.baseGoal?.toLocaleString() ?? calories.goal} base + {calories.exerciseBonus} exercise
                    </p>
                  )}
                </div>
                <div>
                  <p className="label-caps mb-2">Consumed</p>
                  <p className="text-2xl font-semibold tabular-nums text-foreground tabular-nums">
                    {Math.round(calories.consumed).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted mt-1">kcal today</p>
                </div>
                <div>
                  <p className="label-caps mb-2">Burned</p>
                  <p className="text-xl font-semibold tabular-nums text-foreground tabular-nums">
                    {Math.round(calories.burned).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {hasExerciseBonus ? 'added to budget' : isLossGoal ? 'creates deficit' : 'log activity'}
                  </p>
                </div>
                <div>
                  <p className="label-caps mb-2">Streak</p>
                  <p className="text-xl font-semibold tabular-nums text-foreground tabular-nums">
                    {streak > 0 ? streak : '—'}
                  </p>
                  <p className="text-xs text-muted mt-1">{streak > 0 ? 'days logging' : 'start today'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 flex flex-col">
          <CardContent className="pt-6 flex flex-col flex-1">
            <p className="label-caps mb-4">Today&apos;s macros</p>
            <div className="space-y-5 flex-1">
              <MacroBar label="Protein" consumed={macros.protein.consumed} goal={macros.protein.goal} color={theme.macroProtein} />
              <MacroBar label="Carbs" consumed={macros.carbs.consumed} goal={macros.carbs.goal} color={theme.macroCarbs} />
              <MacroBar label="Fat" consumed={macros.fat.consumed} goal={macros.fat.goal} color={theme.macroFat} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="label-caps">Water</p>
              <Link to="/water" className="label-caps link-accent">Log</Link>
            </div>
            <p className="text-2xl font-semibold tabular-nums text-foreground tabular-nums">
              {water.consumed}
              <span className="text-sm text-muted ml-2">/ {water.goal} ml</span>
            </p>
            <div className="macro-line mt-4">
              <div className="macro-fill bg-foreground" style={{ width: `${Math.min(waterPct, 100)}%`, height: '100%' }} />
            </div>
            <p className="text-xs text-muted mt-3">{Math.max(0, water.goal - water.consumed)} ml remaining</p>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="label-caps">Today&apos;s log</p>
              <Link to="/food-log" className="label-caps link-accent">Add</Link>
            </div>
            {allLogs.length === 0 ? (
              <p className="text-sm text-muted py-8 text-center">Nothing logged yet</p>
            ) : (
              <div>
                {allLogs.slice(0, 5).map((log: any) => (
                  <div key={log.id} className="divider-row flex items-center gap-3 py-2.5">
                    <span className="text-[10px] text-muted w-8 shrink-0 uppercase">
                      {MEAL_LABELS[log.mealType]?.slice(0, 3) ?? '—'}
                    </span>
                    <span className="flex-1 text-sm text-foreground truncate">{logFoodName(log)}</span>
                    <span className="text-sm text-foreground tabular-nums shrink-0">
                      {Math.round(log.calories)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="label-caps">Activities</p>
              <Link to="/activity" className="label-caps link-accent">Log</Link>
            </div>
            {activities.length === 0 ? (
              <div className="py-8 text-center">
                <Zap className="h-[22px] w-[22px] text-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm text-muted">No activities yet</p>
              </div>
            ) : (
              <div>
                {activities.slice(0, 5).map((a: any) => (
                  <div key={a.id} className="divider-row flex items-center justify-between py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm text-foreground truncate">{a.name}</p>
                      <p className="text-xs text-muted font-mono">{a.duration} min</p>
                    </div>
                    <span className="text-sm text-muted-foreground tabular-nums shrink-0 ml-2">−{a.caloriesBurned}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-12">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <p className="label-caps">Weekly calories</p>
              <Link to="/progress" className="label-caps link-accent">View all</Link>
            </div>
            <ResponsiveContainer width="100%" height={220} key={darkMode ? 'dark' : 'light'}>
              <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatChartDay}
                  tick={{ fontSize: 10, fill: theme.chartTick, fontFamily: 'Inter' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: theme.chartTick, fontFamily: 'Inter' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    background: theme.chartTooltipBg,
                    border: `1px solid ${theme.chartTooltipBorder}`,
                    borderRadius: 8,
                    color: theme.chartTooltipText,
                    fontFamily: 'Inter',
                  }}
                  labelFormatter={formatChartDayLong}
                  formatter={(value: number) => [`${value} kcal`, 'Calories']}
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke={theme.accent}
                  fill={theme.accent}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  name="Calories"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
