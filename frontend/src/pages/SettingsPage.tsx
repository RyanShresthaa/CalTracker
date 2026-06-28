import { useEffect, useState } from 'react'
import { Moon, Sun, Bell, Lock, User, Target, Droplet, Flame } from 'lucide-react'
import { useAuthStore, useThemeStore } from '../store/authStore'
import { useSettings, useUpdateProfile, useChangePassword, useUpdateSettings } from '../lib/hooks'
import PageHeader from '../components/ui/PageHeader'
import Toggle from '../components/ui/Toggle'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { toast } from 'sonner'

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-4 border-b border-border">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {children}
      </CardContent>
    </Card>
  )
}

export default function SettingsPage() {
  const { user } = useAuthStore()
  const { darkMode, setDarkMode } = useThemeStore()

  const [profile, setProfile] = useState({ name: '', age: '', height: '', currentWeight: '', goalWeight: '' })
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [settings, setSettings] = useState({
    waterGoal: 2000,
    calorieGoal: '' as string,
    useCustomCalories: false,
    suggestedCalorieGoal: null as number | null,
    units: 'metric',
    notifWater: true,
    notifMeals: true,
    notifWorkout: true,
  })

  const { data: settingsData } = useSettings()
  const updateProfile = useUpdateProfile()
  const changePassword = useChangePassword()
  const updateSettings = useUpdateSettings()

  const saving = updateProfile.isPending || changePassword.isPending || updateSettings.isPending

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        age: String(user.age || ''),
        height: String(user.height || ''),
        currentWeight: String(user.currentWeight || ''),
        goalWeight: String(user.goalWeight || ''),
      })
    }
  }, [user])

  useEffect(() => {
    if (settingsData) {
      setSettings({
        waterGoal: settingsData.waterGoal || 2000,
        calorieGoal: settingsData.calorieGoal != null ? String(settingsData.calorieGoal) : '',
        useCustomCalories: settingsData.calorieGoal != null,
        suggestedCalorieGoal: settingsData.suggestedCalorieGoal ?? null,
        units: settingsData.units || 'metric',
        notifWater: settingsData.notifWater ?? true,
        notifMeals: settingsData.notifMeals ?? true,
        notifWorkout: settingsData.notifWorkout ?? true,
      })
    }
  }, [settingsData])

  const saveProfile = () => {
    const age = parseInt(profile.age, 10)
    const height = parseFloat(profile.height)
    const currentWeight = parseFloat(profile.currentWeight)
    const goalWeight = parseFloat(profile.goalWeight)

    if (!profile.name.trim()) {
      toast.error('Name is required')
      return
    }
    if (Number.isNaN(age) || age < 13 || age > 100) {
      toast.error('Enter a valid age (13–100)')
      return
    }
    if (Number.isNaN(height) || height < 100 || height > 250) {
      toast.error('Enter a valid height (100–250 cm)')
      return
    }
    if (Number.isNaN(currentWeight) || currentWeight < 30 || currentWeight > 300) {
      toast.error('Enter a valid current weight')
      return
    }
    if (Number.isNaN(goalWeight) || goalWeight < 30 || goalWeight > 300) {
      toast.error('Enter a valid goal weight')
      return
    }

    updateProfile.mutate({
      name: profile.name.trim(),
      age,
      height,
      currentWeight,
      goalWeight,
    })
  }

  const savePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) { toast.error("Passwords don't match"); return }
    if (passwords.newPassword.length < 8) { toast.error('Password must be at least 8 characters'); return }
    changePassword.mutate(
      { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword },
      { onSuccess: () => setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }) },
    )
  }

  const saveSettings = () => {
    if (Number.isNaN(settings.waterGoal) || settings.waterGoal < 500 || settings.waterGoal > 10000) {
      toast.error('Water goal must be between 500 and 10,000 ml')
      return
    }

    let calorieGoal: number | null = null
    if (settings.useCustomCalories) {
      const parsed = parseInt(settings.calorieGoal, 10)
      if (Number.isNaN(parsed) || parsed < 800 || parsed > 10000) {
        toast.error('Calorie goal must be between 800 and 10,000 kcal')
        return
      }
      calorieGoal = parsed
    }

    updateSettings.mutate({
      waterGoal: settings.waterGoal,
      units: settings.units,
      calorieGoal,
      notifWater: settings.notifWater,
      notifMeals: settings.notifMeals,
      notifWorkout: settings.notifWorkout,
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" subtitle="Manage your account and preferences" />

      <Section title={<span className="flex items-center gap-2"><User className="h-[18px] w-[18px]" /> Profile</span>}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })} className="mt-1.5" min={13} max={100} />
          </div>
          <div>
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="currentWeight">Current Weight (kg)</Label>
            <Input id="currentWeight" type="number" step="0.1" value={profile.currentWeight} onChange={(e) => setProfile({ ...profile, currentWeight: e.target.value })} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
            <Input id="goalWeight" type="number" step="0.1" value={profile.goalWeight} onChange={(e) => setProfile({ ...profile, goalWeight: e.target.value })} className="mt-1.5" />
          </div>
        </div>
        <Button type="button" onClick={saveProfile} disabled={saving}>Save Profile</Button>
      </Section>

      <Section title={<span className="flex items-center gap-2"><Target className="h-[18px] w-[18px]" /> Goals & Units</span>}>
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-1">
              <Flame className="h-3.5 w-3.5" /> Daily calorie target
            </Label>
            <div className="mt-2 space-y-3">
              <Toggle
                checked={settings.useCustomCalories}
                onChange={(useCustomCalories) => setSettings({
                  ...settings,
                  useCustomCalories,
                  calorieGoal: useCustomCalories
                    ? (settings.calorieGoal || String(settings.suggestedCalorieGoal ?? 2000))
                    : settings.calorieGoal,
                })}
                label="Set a custom calorie goal"
              />
              {settings.useCustomCalories ? (
                <div>
                  <Input
                    id="calorieGoal"
                    type="number"
                    step="50"
                    value={settings.calorieGoal}
                    onChange={(e) => setSettings({ ...settings, calorieGoal: e.target.value })}
                    placeholder="e.g. 2200"
                    className="max-w-xs"
                  />
                  <p className="text-xs text-muted-foreground mt-1.5">kcal per day (800–10,000)</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {settings.suggestedCalorieGoal
                    ? <>Using calculated target: <span className="font-medium text-foreground">{settings.suggestedCalorieGoal} kcal</span> based on your profile</>
                    : 'Complete your profile to get a calculated calorie target, or enable custom goal above.'}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="waterGoal" className="flex items-center gap-1">
                <Droplet className="h-3.5 w-3.5" /> Daily water goal (ml)
              </Label>
              <Input
                id="waterGoal"
                type="number"
                step="100"
                value={settings.waterGoal}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10)
                  setSettings({ ...settings, waterGoal: Number.isNaN(v) ? 0 : v })
                }}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label>Units</Label>
              <Select value={settings.units} onValueChange={(v) => setSettings({ ...settings, units: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <Button type="button" onClick={saveSettings} disabled={saving}>Save Settings</Button>
      </Section>

      <Section title={<span className="flex items-center gap-2">{darkMode ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />} Appearance</span>}>
        <Toggle checked={darkMode} onChange={setDarkMode} label="Dark mode" />
      </Section>

      <Section title={<span className="flex items-center gap-2"><Bell className="h-[18px] w-[18px]" /> Notifications</span>}>
        <div className="space-y-3">
          <Toggle checked={settings.notifWater} onChange={(v) => setSettings({ ...settings, notifWater: v })} label="Water reminders" />
          <Toggle checked={settings.notifMeals} onChange={(v) => setSettings({ ...settings, notifMeals: v })} label="Meal logging reminders" />
          <Toggle checked={settings.notifWorkout} onChange={(v) => setSettings({ ...settings, notifWorkout: v })} label="Workout reminders" />
        </div>
        <Button type="button" onClick={saveSettings} disabled={saving}>Save Notifications</Button>
      </Section>

      <Section title={<span className="flex items-center gap-2"><Lock className="h-[18px] w-[18px]" /> Change Password</span>}>
        <div className="space-y-3">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              className="mt-1.5"
              placeholder="••••••••"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              className="mt-1.5"
              placeholder="Min. 8 characters"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              className="mt-1.5"
              placeholder="Repeat new password"
            />
          </div>
        </div>
        <Button type="button" onClick={savePassword} disabled={saving}>Change Password</Button>
      </Section>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-muted">
            Logged in as <span className="text-foreground font-medium">{user?.email}</span>
          </p>
          <p className="text-xs text-muted mt-1">CalTracker v1.0</p>
        </CardContent>
      </Card>
    </div>
  )
}
