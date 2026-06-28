import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Scale, Plus, Trash, TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useWeight, useAddWeight, useDeleteWeight } from '../lib/hooks'
import { useThemeColors } from '../lib/theme'
import PageHeader from '../components/ui/PageHeader'
import PeriodTabs from '../components/ui/PeriodTabs'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'
import { toast } from 'sonner'
import { format } from 'date-fns'

export default function WeightPage() {
  const { user } = useAuthStore()
  const theme = useThemeColors()
  const [period, setPeriod] = useState(30)
  const [weight, setWeight] = useState('')
  const [note, setNote] = useState('')

  const { data, isLoading } = useWeight(period)
  const addWeightMutation = useAddWeight()
  const deleteWeightMutation = useDeleteWeight()

  const logs = data?.logs ?? []
  const currentWeight = data?.currentWeight ?? null
  const goalWeight = data?.goalWeight ?? null

  const addWeight = () => {
    const w = parseFloat(weight)
    if (!w || w < 30 || w > 300) { toast.error('Enter a valid weight (30–300 kg)'); return }
    addWeightMutation.mutate(
      { weight: w, note: note || undefined },
      { onSuccess: () => { setWeight(''); setNote('') } },
    )
  }

  const bmi = currentWeight && user?.height ? currentWeight / ((user.height / 100) ** 2) : null
  const bmiRounded = bmi ? Math.round(bmi * 10) / 10 : null
  const weightChange = logs.length >= 2 ? logs[logs.length - 1].weight - logs[0].weight : null
  const goalProgress = currentWeight && goalWeight && user?.currentWeight
    ? ((user.currentWeight - currentWeight) / (user.currentWeight - goalWeight)) * 100 : null

  const chartData = logs.map((l: any) => ({ date: l.logDate, weight: l.weight }))
  const adding = addWeightMutation.isPending

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weight"
        subtitle="Monitor your weight and progress toward your goal"
        action={<PeriodTabs value={period} options={[7, 30, 90]} onChange={setPeriod} />}
      />

      {isLoading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40" />)}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Scale className="h-[22px] w-[22px] text-foreground mx-auto mb-2" />
                <p className="stat-value">{currentWeight ?? '—'}<span className="text-sm text-muted ml-1">kg</span></p>
                <p className="label-caps mt-2">Current</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="stat-value">{goalWeight ?? '—'}<span className="text-sm text-muted ml-1">kg</span></p>
                <p className="label-caps mt-2">Goal</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <p className="stat-value">{bmiRounded ?? '—'}</p>
                <p className="label-caps mt-2">BMI</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                {weightChange !== null ? (
                  <>
                    <div className="flex items-center justify-center gap-1">
                      {weightChange < 0 ? <TrendingDown className="h-[18px] w-[18px] text-accent" /> :
                        weightChange > 0 ? <TrendingUp className="h-[18px] w-[18px] text-destructive" /> :
                        <Minus className="h-[18px] w-[18px] text-muted" />}
                      <p className="stat-value">
                        {weightChange > 0 ? '+' : ''}{Math.round(weightChange * 10) / 10}
                      </p>
                    </div>
                    <p className="label-caps mt-2">Change ({period}d)</p>
                  </>
                ) : (
                  <>
                    <p className="stat-value">—</p>
                    <p className="label-caps mt-2">Change</p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {goalProgress !== null && goalWeight && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="label-caps">Goal progress</span>
                  <span className="text-sm text-foreground">{Math.min(Math.round(goalProgress), 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min(Math.max(goalProgress, 0), 100)}%` }} />
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-base font-semibold">Weight trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {chartData.length < 2 ? (
                <div className="empty-state">
                  <Scale className="h-8 w-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Log at least 2 entries to see your trend</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.chartGrid} />
                    <XAxis dataKey="date" tickFormatter={(d) => format(new Date(d), 'MMM d')} tick={{ fontSize: 10, fill: theme.chartTick, fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: theme.chartTick, fontFamily: 'Inter' }} domain={['auto', 'auto']} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: theme.chartTooltipBg,
                        border: `1px solid ${theme.chartTooltipBorder}`,
                        borderRadius: 0,
                        color: theme.chartTooltipText,
                      }}
                      labelFormatter={(d) => format(new Date(d), 'MMM d, yyyy')}
                      formatter={(v: number) => [`${v} kg`, 'Weight']}
                    />
                    {goalWeight && (
                      <ReferenceLine y={goalWeight} stroke={theme.muted} strokeDasharray="4 4" label={{ value: 'Goal', fill: theme.muted, fontSize: 10 }} />
                    )}
                    <Line type="monotone" dataKey="weight" stroke={theme.accent} strokeWidth={2} dot={{ fill: theme.accent, r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-base font-semibold">Log weight</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-[140px]">
                  <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted" />
                  <Input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight in kg"
                    className="pl-10"
                    step="0.1"
                    min={30}
                    max={300}
                  />
                </div>
                <Input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note (optional)"
                  className="flex-1 min-w-[140px]"
                />
                <Button type="button" onClick={addWeight} disabled={adding} className="shrink-0">
                  <Plus className="h-[18px] w-[18px]" /> {adding ? 'Saving…' : 'Log'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-base font-semibold">History</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {logs.length === 0 ? (
                <div className="empty-state"><p className="text-sm">No weight entries yet</p></div>
              ) : (
                <div className="space-y-2">
                  {[...logs].reverse().map((log: any) => (
                    <div key={log.id} className="list-row">
                      <div>
                        <p className="text-sm font-medium text-foreground">{log.weight} kg</p>
                        <p className="text-xs text-muted font-mono">
                          {format(new Date(log.logDate), 'MMM d, yyyy')}
                          {log.note && ` · ${log.note}`}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteWeightMutation.mutate(log.id)}
                        className="h-8 w-8 text-muted hover:text-destructive"
                      >
                        <Trash className="h-[15px] w-[15px]" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
