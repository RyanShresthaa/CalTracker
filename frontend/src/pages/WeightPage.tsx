import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Scales, Plus, Trash, TrendDown, TrendUp, Minus } from 'phosphor-react';
import { useAuthStore } from '../store/authStore';
import { useWeight, useAddWeight, useDeleteWeight } from '../lib/hooks';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function getBMIColor(bmi: number) {
  if (bmi < 18.5) return 'text-blue-500';
  if (bmi < 25) return 'text-green-500';
  if (bmi < 30) return 'text-amber-500';
  return 'text-red-500';
}
function getBMILabel(bmi: number) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

export default function WeightPage() {
  const { user } = useAuthStore();
  const [period, setPeriod] = useState(30);
  const [weight, setWeight] = useState('');
  const [note, setNote] = useState('');

  const { data, isLoading } = useWeight(period);
  const addWeightMutation = useAddWeight();
  const deleteWeightMutation = useDeleteWeight();

  const logs = data?.logs ?? [];
  const currentWeight = data?.currentWeight ?? null;
  const goalWeight = data?.goalWeight ?? null;

  const addWeight = () => {
    const w = parseFloat(weight);
    if (!w || w < 30 || w > 300) { toast.error('Enter a valid weight (30–300 kg)'); return; }
    addWeightMutation.mutate(
      { weight: w, note: note || undefined },
      { onSuccess: () => { setWeight(''); setNote(''); } },
    );
  };

  const deleteLog = (id: string) => deleteWeightMutation.mutate(id);

  const bmi = currentWeight && user?.height ? currentWeight / ((user.height / 100) ** 2) : null;
  const bmiRounded = bmi ? Math.round(bmi * 10) / 10 : null;

  const weightChange = logs.length >= 2 ? logs[logs.length - 1].weight - logs[0].weight : null;

  const goalProgress = currentWeight && goalWeight && user?.currentWeight
    ? ((user.currentWeight - currentWeight) / (user.currentWeight - goalWeight)) * 100 : null;

  const chartData = logs.map((l: any) => ({
    date: l.logDate,
    weight: l.weight,
  }));

  const adding = addWeightMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Weight Tracker</h1>
          <p className="text-slate-500">Monitor your weight and progress toward your goal</p>
        </div>
        <div className="flex gap-1">
          {[7, 30, 90].map(d => (
            <button key={d} onClick={() => setPeriod(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${period === d ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-40 rounded-2xl" />)}</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card text-center">
              <Scales size={24} className="text-indigo-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{currentWeight ?? '—'} kg</p>
              <p className="text-xs text-slate-500 mt-1">Current Weight</p>
            </div>
            <div className="card text-center">
              <p className="text-2xl font-bold text-purple-600">{goalWeight ?? '—'} kg</p>
              <p className="text-xs text-slate-500 mt-1">Goal Weight</p>
            </div>
            <div className="card text-center">
              {bmiRounded ? (
                <>
                  <p className={`text-2xl font-bold ${getBMIColor(bmiRounded)}`}>{bmiRounded}</p>
                  <p className="text-xs text-slate-500 mt-1">BMI · {getBMILabel(bmiRounded)}</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-slate-400">—</p>
                  <p className="text-xs text-slate-500 mt-1">BMI</p>
                </>
              )}
            </div>
            <div className="card text-center">
              {weightChange !== null ? (
                <>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {weightChange < 0 ? <TrendDown size={20} className="text-green-500" /> :
                      weightChange > 0 ? <TrendUp size={20} className="text-red-500" /> :
                      <Minus size={20} className="text-slate-400" />}
                    <p className={`text-2xl font-bold ${weightChange < 0 ? 'text-green-600' : weightChange > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                      {weightChange > 0 ? '+' : ''}{Math.round(weightChange * 10) / 10} kg
                    </p>
                  </div>
                  <p className="text-xs text-slate-500">Change ({period}d)</p>
                </>
              ) : (
                <>
                  <p className="text-2xl font-bold text-slate-400">—</p>
                  <p className="text-xs text-slate-500 mt-1">Change</p>
                </>
              )}
            </div>
          </div>

          {goalProgress !== null && goalWeight && (
            <div className="card">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-400">Goal Progress</span>
                <span className="font-medium text-indigo-600">{Math.min(Math.round(goalProgress), 100)}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ width: `${Math.min(Math.max(goalProgress, 0), 100)}%` }} />
              </div>
            </div>
          )}

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Weight Trend</h3>
            {chartData.length < 2 ? (
              <div className="text-center py-12 text-slate-400">
                <Scales size={36} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm">Log at least 2 entries to see your trend</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey="date" tickFormatter={d => format(new Date(d), 'MMM d')} tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={['auto', 'auto']} />
                  <Tooltip labelFormatter={d => format(new Date(d), 'MMM d, yyyy')} formatter={(v: any) => [`${v} kg`, 'Weight']} />
                  {goalWeight && <ReferenceLine y={goalWeight} stroke="#8b5cf6" strokeDasharray="4 4" label={{ value: 'Goal', fill: '#8b5cf6', fontSize: 11 }} />}
                  <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Log Weight</h3>
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[140px]">
                <Scales size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)}
                  placeholder="Weight in kg" className="input pl-10" step="0.1" min={30} max={300} />
              </div>
              <input type="text" value={note} onChange={e => setNote(e.target.value)}
                placeholder="Note (optional)" className="input flex-1 min-w-[140px]" />
              <button onClick={addWeight} disabled={adding} className="btn-primary flex items-center gap-2 shrink-0">
                <Plus size={18} /> {adding ? 'Saving...' : 'Log Weight'}
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">History</h3>
            {logs.length === 0 ? (
              <p className="text-center py-8 text-slate-400 text-sm">No weight entries yet</p>
            ) : (
              <div className="space-y-2">
                {[...logs].reverse().map((log: any) => (
                  <div key={log.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{log.weight} kg</p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(log.logDate), 'MMM d, yyyy')}
                        {log.note && ` · ${log.note}`}
                      </p>
                    </div>
                    <button onClick={() => deleteLog(log.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                      <Trash size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
