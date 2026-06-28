import { useEffect, useState } from 'react';
import { Moon, Sun, Bell, Lock, User, Target, Drop } from 'phosphor-react';
import { useAuthStore, useThemeStore } from '../store/authStore';
import { useSettings, useUpdateProfile, useChangePassword, useUpdateSettings } from '../lib/hooks';
import toast from 'react-hot-toast';

function Section({ title, children }: any) {
  return (
    <div className="card space-y-4">
      <h3 className="font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { user, setUser } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();

  const [profile, setProfile] = useState({ name: '', age: '', height: '', currentWeight: '', goalWeight: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [settings, setSettings] = useState({ waterGoal: 2000, units: 'metric', notifWater: true, notifMeals: true, notifWorkout: true });

  const { data: settingsData } = useSettings();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const updateSettings = useUpdateSettings();

  const saving = updateProfile.isPending || changePassword.isPending || updateSettings.isPending;

  useEffect(() => {
    if (user) {
      setProfile({ name: user.name || '', age: String(user.age || ''), height: String(user.height || ''), currentWeight: String(user.currentWeight || ''), goalWeight: String(user.goalWeight || '') });
    }
  }, [user]);

  useEffect(() => {
    if (settingsData) {
      setSettings({
        waterGoal: settingsData.waterGoal || 2000,
        units: settingsData.units || 'metric',
        notifWater: settingsData.notifWater ?? true,
        notifMeals: settingsData.notifMeals ?? true,
        notifWorkout: settingsData.notifWorkout ?? true,
      });
    }
  }, [settingsData]);

  const saveProfile = () => {
    updateProfile.mutate(
      { name: profile.name, age: parseInt(profile.age), height: parseFloat(profile.height), currentWeight: parseFloat(profile.currentWeight), goalWeight: parseFloat(profile.goalWeight) },
      { onSuccess: (data) => setUser({ ...user!, ...data }) },
    );
  };

  const savePassword = () => {
    if (passwords.newPassword !== passwords.confirmPassword) { toast.error("Passwords don't match"); return; }
    if (passwords.newPassword.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    changePassword.mutate(
      { currentPassword: passwords.currentPassword, newPassword: passwords.newPassword },
      { onSuccess: () => setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' }) },
    );
  };

  const saveSettings = () => updateSettings.mutate(settings);

  const Toggle = ({ checked, onChange, label }: any) => (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <button onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <Section title={<span className="flex items-center gap-2"><User size={18} /> Profile</span>}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label">Full Name</label>
            <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Age</label>
            <input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: e.target.value })} className="input" min={13} max={100} />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" value={profile.height} onChange={e => setProfile({ ...profile, height: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Current Weight (kg)</label>
            <input type="number" step="0.1" value={profile.currentWeight} onChange={e => setProfile({ ...profile, currentWeight: e.target.value })} className="input" />
          </div>
          <div>
            <label className="label">Goal Weight (kg)</label>
            <input type="number" step="0.1" value={profile.goalWeight} onChange={e => setProfile({ ...profile, goalWeight: e.target.value })} className="input" />
          </div>
        </div>
        <button onClick={saveProfile} disabled={saving} className="btn-primary">Save Profile</button>
      </Section>

      {/* Goals */}
      <Section title={<span className="flex items-center gap-2"><Target size={18} /> Goals & Units</span>}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label flex items-center gap-1"><Drop size={14} /> Daily Water Goal (ml)</label>
            <input type="number" step="100" value={settings.waterGoal}
              onChange={e => setSettings({ ...settings, waterGoal: parseInt(e.target.value) })} className="input" />
          </div>
          <div>
            <label className="label">Units</label>
            <select value={settings.units} onChange={e => setSettings({ ...settings, units: e.target.value })} className="input">
              <option value="metric">Metric (kg, cm)</option>
              <option value="imperial">Imperial (lbs, ft)</option>
            </select>
          </div>
        </div>
        <button onClick={saveSettings} disabled={saving} className="btn-primary">Save Settings</button>
      </Section>

      {/* Appearance */}
      <Section title={<span className="flex items-center gap-2">{darkMode ? <Moon size={18} /> : <Sun size={18} />} Appearance</span>}>
        <Toggle checked={darkMode} onChange={toggleDarkMode} label="Dark Mode" />
      </Section>

      {/* Notifications */}
      <Section title={<span className="flex items-center gap-2"><Bell size={18} /> Notifications</span>}>
        <div className="space-y-3">
          <Toggle checked={settings.notifWater} onChange={(v: boolean) => setSettings({ ...settings, notifWater: v })} label="Water reminders" />
          <Toggle checked={settings.notifMeals} onChange={(v: boolean) => setSettings({ ...settings, notifMeals: v })} label="Meal logging reminders" />
          <Toggle checked={settings.notifWorkout} onChange={(v: boolean) => setSettings({ ...settings, notifWorkout: v })} label="Workout reminders" />
        </div>
        <button onClick={saveSettings} disabled={saving} className="btn-primary">Save Notifications</button>
      </Section>

      {/* Change Password */}
      <Section title={<span className="flex items-center gap-2"><Lock size={18} /> Change Password</span>}>
        <div className="space-y-3">
          <div>
            <label className="label">Current Password</label>
            <input type="password" value={passwords.currentPassword}
              onChange={e => setPasswords({ ...passwords, currentPassword: e.target.value })} className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="label">New Password</label>
            <input type="password" value={passwords.newPassword}
              onChange={e => setPasswords({ ...passwords, newPassword: e.target.value })} className="input" placeholder="Min. 8 characters" />
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input type="password" value={passwords.confirmPassword}
              onChange={e => setPasswords({ ...passwords, confirmPassword: e.target.value })} className="input" placeholder="Repeat new password" />
          </div>
        </div>
        <button onClick={savePassword} disabled={saving} className="btn-primary">Change Password</button>
      </Section>

      {/* Account info */}
      <div className="card bg-slate-50 dark:bg-slate-800/50">
        <p className="text-sm text-slate-500">Logged in as <strong className="text-slate-700 dark:text-slate-300">{user?.email}</strong></p>
        <p className="text-xs text-slate-400 mt-1">Member since · CalorieTracker v1.0</p>
      </div>
    </div>
  );
}
