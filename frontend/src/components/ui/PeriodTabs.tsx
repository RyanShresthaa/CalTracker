import { Tabs, TabsList, TabsTrigger } from './tabs'

interface PeriodTabsProps {
  value: number
  options: number[]
  onChange: (value: number) => void
  suffix?: string
}

export default function PeriodTabs({ value, options, onChange, suffix = 'd' }: PeriodTabsProps) {
  return (
    <Tabs value={String(value)} onValueChange={(v) => onChange(Number(v))}>
      <TabsList className="h-8">
        {options.map((d) => (
          <TabsTrigger key={d} value={String(d)} className="text-xs px-2.5">
            {d}{suffix}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
