import { useState } from 'react';
import { Drop, Plus, Trash, Target } from 'phosphor-react';
import { useWater, useSettings, useAddWater, useDeleteWater } from '../lib/hooks';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const QUICK_AMOUNTS = [
  { label: '+250ml', value: 250, emoji: '🥃' },
  { label: '+500ml', value: 500, emoji: '🥤' },
  { label: '+750ml', value: 750, emoji: '🍶' },
  { label: '+1000ml', value: 1000, emoji: '🫙' },
];

export default function WaterPage() {
  const [custom, setCustom] = useState('');

  const { data, isLoading, isError } = useWater();
  const { data: settings } = useSettings();
  const addWaterMutation = useAddWater();
  const deleteWaterMutation = useDeleteWater();

  const logs = data?.logs ?? [];
  const total = data?.total ?? 0;
  const goal = settings?.waterGoal ?? 2000;
  const adding = addWaterMutation.isPending;

  const addWater = (amount: number) => {
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    addWaterMutation.mutate(amount);
  };

  const deleteLog = (id: string) => deleteWaterMutation.mutate(id);

  const pct = Math.min((total / goal) * 100, 100);
  const remaining = Math.max(0, goal - total);

  if (isError) {
    return <div className="card text-center py-12 text-slate-500">Failed to load water data</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Water Tracker</h1>
        <p className="text-slate-500">Stay hydrated throughout the day</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}</div>
      ) : (
        <>
          <div className="card">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative w-48 h-48 shrink-0">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="16" className="text-slate-200 dark:text-slate-700" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="url(#waterGrad)" strokeWidth="16"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - pct / 100)}`}
                    strokeLinecap="round" className="transition-all duration-700" />
                  <defs>
                    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Drop size={28} weight="fill" className="text-blue-500 mb-1" />
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{Math.round(pct)}%</p>
                  <p className="text-xs text-slate-500">of goal</p>
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{total}</p>
                    <p className="text-xs text-slate-500 mt-1">Consumed (ml)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-700 dark:text-slate-300">{goal}</p>
                    <p className="text-xs text-slate-500 mt-1">Daily Goal (ml)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyan-600">{remaining}</p>
                    <p className="text-xs text-slate-500 mt-1">Remaining (ml)</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {QUICK_AMOUNTS.map(item => (
                    <button key={item.value} onClick={() => addWater(item.value)} disabled={adding}
                      className="flex flex-col items-center gap-1 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20
                        hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95 transition-all">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Custom Amount</h3>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Drop size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="number" value={custom} onChange={e => setCustom(e.target.value)}
                  placeholder="Enter amount in ml" className="input pl-10" min={1} />
              </div>
              <button onClick={() => { addWater(parseInt(custom) || 0); setCustom(''); }} disabled={adding}
                className="btn-primary flex items-center gap-2 shrink-0">
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Today's Log</h3>
              <span className="text-sm text-slate-500">{format(new Date(), 'MMM d, yyyy')}</span>
            </div>
            {logs.length === 0 ? (
              <div className="text-center py-8">
                <Drop size={36} className="text-slate-200 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No water logged yet today. Stay hydrated! 💧</p>
              </div>
            ) : (
              <div className="space-y-2">
                {[...logs].reverse().map((log: any) => (
                  <div key={log.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      <Drop size={16} weight="fill" className="text-blue-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{log.amount} ml</p>
                        <p className="text-xs text-slate-500">{format(new Date(log.logDate), 'h:mm a')}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteLog(log.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                      <Trash size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
            <div className="flex items-start gap-3">
              <Target size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-300 text-sm">Hydration Tip</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  The general recommendation is 8 glasses (2000ml) per day, but varies by weight, activity, and climate.
                  Aim to drink consistently throughout the day rather than all at once.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
