import { Label } from './label'
import { Switch } from './switch'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Label className="text-sm text-foreground font-normal">{label}</Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  )
}
