import { useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { LineChart as LineChartIcon } from 'lucide-react'
import { useProgressData } from '../lib/hooks'
import { useInView } from '../lib/useInView'
import { useThemeColors } from '../lib/theme'
import PageHeader from '../components/ui/PageHeader'
import PeriodTabs from '../components/ui/PeriodTabs'
import { Card, CardContent } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'
import { format, subDays, parse } from 'date-fns'

function ChartCard({ title, children, period, onPeriodChange }: {
  title: string
  children: React.ReactNode
  period?: number
  onPeriodChange?: (d: number) => void
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="label-caps">{title}</h3>
          {onPeriodChange && period != null && (
            <PeriodTabs value={period} options={[7, 30]} onChange={onPeriodChange} />
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  )
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="empty-state py-12">
      <LineChartIcon className="h-8 w-8 mx-auto mb-3 opacity-40" />
      <p className="text-sm">No {label} data yet</p>
    </div>
  )
}

function formatChartDay(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEE')
}

function formatChartDayLong(dateStr: string): string {
  return format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEEE, MMM d')
}

export default function ProgressPage() {
  const [period, setPeriod] = useState(7)
  const theme = useThemeColors()
  const [activityRef, activityInView] = useInView()
  const {
    isLoading,
    weightLoading,
    activitiesLoading,
    weeklyData,
    weightLogs,
    activityData,
  } = useProgressData({ enableActivities: activityInView })
  const hasWeeklyCalories = weeklyData.some((d: { calories: number }) => d.calories > 0)

  const weightChartData = weightLogs.map((l: any) => ({
    date: l.logDate,
    weight: l.weight,
  }))

  const activityChartData = (() => {
    const map: Record<string, { date: string; calories: number; duration: number }> = {}
    for (let i = 0; i < 30; i++) {
      const d = format(subDays(new Date(), i), 'yyyy-MM-dd')
      map[d] = { date: d, calories: 0, duration: 0 }
    }
    for (const act of activityData) {
      const d = format(new Date(act.logDate), 'yyyy-MM-dd')
      if (map[d]) {
        map[d].calories += act.caloriesBurned
        map[d].duration += act.duration
      }
    }
    return Object.values(map).reverse()
  })()

  const tooltipStyle = {
    background: theme.chartTooltipBg,
    border: `1px solid ${theme.chartTooltipBorder}`,
    borderRadius: 8,
    color: theme.chartTooltipText,
    fontFamily: 'Inter',
  }

  const tickStyle = { fontSize: 10, fill: theme.chartTick, fontFamily: 'Inter' }

  return (
    <div className="space-y-6">
      <PageHeader title="Progress" subtitle="Visualize your health journey over time" />

      {isLoading ? (
        <Skeleton className="h-72" />
      ) : (
        <ChartCard title="Weekly calories" period={period} onPeriodChange={setPeriod}>
          {hasWeeklyCalories ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
                <XAxis dataKey="date" tickFormatter={formatChartDay} tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatChartDayLong} />
                <Area type="monotone" dataKey="calories" stroke={theme.accent} fill={theme.accent} fillOpacity={0.12} strokeWidth={1.5} name="Calories (kcal)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : <EmptyChart label="calorie" />}
        </ChartCard>
      )}

      {isLoading ? (
        <Skeleton className="h-72" />
      ) : (
        <ChartCard title="Weekly macros">
          {hasWeeklyCalories ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
                <XAxis dataKey="date" tickFormatter={formatChartDay} tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={formatChartDayLong} />
                <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Inter' }} />
                <Bar dataKey="protein" fill={theme.macroProtein} name="Protein (g)" radius={0} />
                <Bar dataKey="carbs" fill={theme.macroCarbs} name="Carbs (g)" radius={0} />
                <Bar dataKey="fat" fill={theme.macroFat} name="Fat (g)" radius={0} />
              </BarChart>
            </ResponsiveContainer>
          ) : <EmptyChart label="macro" />}
        </ChartCard>
      )}

      {weightLoading ? (
        <Skeleton className="h-72" />
      ) : (
        <ChartCard title="Weight trend (30 days)">
          {weightChartData.length < 2 ? <EmptyChart label="weight" /> : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weightChartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
                <XAxis dataKey="date" tickFormatter={(d) => format(new Date(d), 'MMM d')} tick={tickStyle} axisLine={false} tickLine={false} />
                <YAxis tick={tickStyle} domain={['auto', 'auto']} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => format(new Date(d), 'MMM d, yyyy')} formatter={(v: number) => [`${v} kg`, 'Weight']} />
                <Line type="monotone" dataKey="weight" stroke={theme.accent} strokeWidth={2} dot={{ fill: theme.accent, r: 3 }} name="Weight (kg)" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      )}

      <div ref={activityRef} className="space-y-6">
      {!activityInView || activitiesLoading ? (
        <>
          <Skeleton className="h-72" />
          <Skeleton className="h-64" />
        </>
      ) : (
        <>
      <ChartCard title="Calories burned (30 days)">
        {activityChartData.every((d) => d.calories === 0) ? <EmptyChart label="activity" /> : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={activityChartData.slice(-14)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
              <XAxis dataKey="date" tickFormatter={(d) => format(new Date(d), 'MMM d')} tick={tickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => format(new Date(d), 'MMM d, yyyy')} />
              <Bar dataKey="calories" fill={theme.accent} name="Calories Burned" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Workout duration (30 days)">
        {activityChartData.every((d) => d.duration === 0) ? <EmptyChart label="workout" /> : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityChartData.slice(-14)} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
              <XAxis dataKey="date" tickFormatter={(d) => format(new Date(d), 'MMM d')} tick={tickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={(d) => format(new Date(d), 'MMM d, yyyy')} formatter={(v: number) => [`${v} min`, 'Duration']} />
              <Area type="monotone" dataKey="duration" stroke={theme.macroCarbs} fill={theme.macroCarbs} fillOpacity={0.12} strokeWidth={1.5} name="Duration (min)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
        </>
      )}
      </div>
    </div>
  )
}
