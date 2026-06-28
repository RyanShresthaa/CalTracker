import { useState } from 'react'
import { Droplet, Plus, Trash, Target } from 'lucide-react'
import { useWater, useSettings, useAddWater, useDeleteWater } from '../lib/hooks'
import PageHeader from '../components/ui/PageHeader'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Skeleton } from '../components/ui/skeleton'
import { toast } from 'sonner'
import { format } from 'date-fns'

const QUICK_AMOUNTS = [
  { label: '+250ml', value: 250 },
  { label: '+500ml', value: 500 },
  { label: '+750ml', value: 750 },
  { label: '+1000ml', value: 1000 },
]

export default function WaterPage() {
  const [custom, setCustom] = useState('')

  const { data, isLoading, isError } = useWater()
  const { data: settings } = useSettings()
  const addWaterMutation = useAddWater()
  const deleteWaterMutation = useDeleteWater()

  const logs = data?.logs ?? []
  const total = data?.total ?? 0
  const goal = settings?.waterGoal ?? 2000
  const adding = addWaterMutation.isPending

  const addWater = (amount: number) => {
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return }
    addWaterMutation.mutate(amount)
  }

  const pct = Math.min((total / goal) * 100, 100)
  const remaining = Math.max(0, goal - total)

  if (isError) {
    return (
      <Card>
        <CardContent className="text-center py-12 text-muted">Failed to load water data</CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Water" subtitle="Stay hydrated throughout the day" />

      {isLoading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-40" />)}</div>
      ) : (
        <>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="relative w-48 h-48 shrink-0">
                  <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="12" className="text-border" />
                    <circle
                      cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="12"
                      strokeDasharray={`${2 * Math.PI * 80}`}
                      strokeDashoffset={`${2 * Math.PI * 80 * (1 - pct / 100)}`}
                      strokeLinecap="butt"
                      className="text-accent transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Droplet className="h-6 w-6 text-foreground mb-1 fill-current" />
                    <p className="text-2xl font-semibold tabular-nums text-foreground">{Math.round(pct)}%</p>
                    <p className="label-caps mt-1">of goal</p>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="stat-value">{total}</p>
                      <p className="label-caps mt-2">Consumed ml</p>
                    </div>
                    <div className="text-center">
                      <p className="stat-value">{goal}</p>
                      <p className="label-caps mt-2">Goal ml</p>
                    </div>
                    <div className="text-center">
                      <p className="stat-value">{remaining}</p>
                      <p className="label-caps mt-2">Remaining ml</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {QUICK_AMOUNTS.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => addWater(item.value)}
                        disabled={adding}
                        className="quick-action"
                      >
                        <Droplet className="h-[18px] w-[18px] text-foreground" />
                        <span className="text-[10px] font-medium text-foreground">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4 border-b border-border">
              <CardTitle className="text-base font-semibold">Custom amount</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Droplet className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted" />
                  <Input
                    type="number"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="Amount in ml"
                    className="pl-10"
                    min={1}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => { addWater(parseInt(custom) || 0); setCustom('') }}
                  disabled={adding}
                  className="shrink-0"
                >
                  <Plus className="h-[18px] w-[18px]" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="label-caps">Today&apos;s log</h3>
                <span className="text-xs text-muted font-mono">{format(new Date(), 'MMM d, yyyy')}</span>
              </div>
              {logs.length === 0 ? (
                <div className="empty-state">
                  <Droplet className="h-8 w-8 mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No water logged yet today</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...logs].reverse().map((log: any) => (
                    <div key={log.id} className="list-row">
                      <div className="flex items-center gap-3">
                        <Droplet className="h-4 w-4 text-foreground fill-current" />
                        <div>
                          <p className="text-sm font-medium text-foreground">{log.amount} ml</p>
                          <p className="text-xs text-muted font-mono">{format(new Date(log.logDate), 'h:mm a')}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteWaterMutation.mutate(log.id)}
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

          <div className="callout">
            <div className="flex items-start gap-3">
              <Target className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
              <div>
                <p className="label-caps mb-2">Hydration tip</p>
                <p className="text-xs text-muted leading-relaxed">
                  Aim for about 2000 ml daily, adjusted for weight and activity. Sip consistently rather than all at once.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
