import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, Plus, Trash, PencilSimple, X, Users, ForkKnife, ChartBar, ArrowLeft } from 'phosphor-react';
import { useAuthStore } from '../store/authStore';
import {
  useAdminStats, useAdminUsers, useAdminFoods,
  useDeleteAdminUser, useDeleteAdminFood, useSaveAdminFood,
} from '../lib/hooks';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

type Tab = 'stats' | 'users' | 'foods';

function StatBox({ label, value, color }: any) {
  return (
    <div className={`card text-center border-t-4 ${color}`}>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value?.toLocaleString() ?? '—'}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

function FoodModal({ food, onClose, onSave }: any) {
  const [form, setForm] = useState(food || {
    name: '', category: 'Fruits', servingSize: 100, servingUnit: 'g',
    calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0,
  });
  const [saving, setSaving] = useState(false);

  const CATEGORIES = ['Fruits', 'Vegetables', 'Rice & Grains', 'Bread & Bakery', 'Meat', 'Fish & Seafood',
    'Eggs', 'Dairy', 'Nuts & Seeds', 'Snacks', 'Drinks', 'Fast Food', 'Asian Food', 'Indian Food', 'Nepali Food', 'Legumes', 'Other'];

  const handleSave = async () => {
    if (!form.name || !form.category) { toast.error('Name and category required'); return; }
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Save failed');
    } finally { setSaving(false); }
  };

  const field = (label: string, key: string, type = 'number', step = '0.1') => (
    <div>
      <label className="label text-xs">{label}</label>
      <input type={type} step={step} value={(form as any)[key]}
        onChange={e => setForm({ ...form, [key]: type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
        className="input" />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white">{food ? 'Edit Food' : 'Add Food'}</h3>
          <button onClick={onClose} className="btn-ghost p-1"><X size={20} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">{field('Food Name', 'name', 'text')}</div>
            <div>
              <label className="label text-xs">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="input">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {field('Serving Size', 'servingSize')}
              <div>
                <label className="label text-xs">Unit</label>
                <select value={form.servingUnit} onChange={e => setForm({ ...form, servingUnit: e.target.value })} className="input">
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="egg">egg</option>
                  <option value="piece">piece</option>
                  <option value="slice">slice</option>
                  <option value="oz">oz</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {field('Calories (kcal)', 'calories')}
            {field('Protein (g)', 'protein')}
            {field('Carbs (g)', 'carbs')}
            {field('Fat (g)', 'fat')}
            {field('Fiber (g)', 'fiber')}
            {field('Sugar (g)', 'sugar')}
            {field('Sodium (mg)', 'sodium')}
            {field('Barcode', 'barcode', 'text', undefined)}
          </div>
        </div>
        <div className="p-5 border-t border-slate-200 dark:border-slate-700 flex gap-3 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Save Food'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('stats');
  const [foodPage, setFoodPage] = useState(1);
  const [userPage, setUserPage] = useState(1);
  const [foodQuery, setFoodQuery] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [foodModal, setFoodModal] = useState<any>(null);

  const { data: stats } = useAdminStats();
  const { data: usersData, isLoading: usersLoading } = useAdminUsers(userPage, userQuery, tab === 'users');
  const { data: foodsData, isLoading: foodsLoading } = useAdminFoods(foodPage, foodQuery, tab === 'foods');

  const deleteUserMutation = useDeleteAdminUser();
  const deleteFoodMutation = useDeleteAdminFood();
  const saveFoodMutation = useSaveAdminFood();

  const users = usersData?.users ?? [];
  const userTotal = usersData?.total ?? 0;
  const foods = foodsData?.foods ?? [];
  const foodTotal = foodsData?.total ?? 0;
  const loading = tab === 'users' ? usersLoading : tab === 'foods' ? foodsLoading : false;

  const deleteUser = (id: string) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    deleteUserMutation.mutate(id);
  };

  const deleteFood = (id: string) => {
    if (!confirm('Delete this food?')) return;
    deleteFoodMutation.mutate(id);
  };

  const saveFood = (data: any) => {
    saveFoodMutation.mutate(data, { onSuccess: () => setFoodModal(null) });
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'stats', label: 'Overview', icon: ChartBar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'foods', label: 'Foods', icon: ForkKnife },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 lg:p-8">
      {foodModal !== undefined && foodModal !== null && (
        <FoodModal food={foodModal === 'new' ? null : foodModal} onClose={() => setFoodModal(null)} onSave={saveFood} />
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="btn-ghost flex items-center gap-2 text-sm">
              <ArrowLeft size={18} /> Dashboard
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
              <p className="text-slate-500 text-sm">Logged in as {user?.name}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 w-fit">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${tab === t.id ? 'bg-indigo-500 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                <Icon size={16} /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Stats tab */}
        {tab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatBox label="Total Users" value={stats?.stats?.users} color="border-indigo-500" />
              <StatBox label="Total Foods" value={stats?.stats?.foods} color="border-emerald-500" />
              <StatBox label="Food Logs" value={stats?.stats?.foodLogs} color="border-amber-500" />
              <StatBox label="Activities Logged" value={stats?.stats?.activities} color="border-purple-500" />
            </div>

            <div className="card">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-slate-700">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Profile</th>
                      <th className="pb-3 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {(stats?.recentUsers || []).map((u: any) => (
                      <tr key={u.id}>
                        <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{u.name}</td>
                        <td className="py-3 text-slate-500">{u.email}</td>
                        <td className="py-3">
                          <span className={`badge ${u.profileCompleted ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                            {u.profileCompleted ? 'Complete' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 text-slate-500">{format(new Date(u.createdAt), 'MMM d, yyyy')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users tab */}
        {tab === 'users' && (
          <div className="card space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={userQuery} onChange={e => { setUserQuery(e.target.value); setUserPage(1); }}
                  placeholder="Search users..." className="input pl-9 text-sm" />
              </div>
              <span className="text-sm text-slate-500 shrink-0">{userTotal} users</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Email</th>
                    <th className="pb-3 font-medium">Role</th>
                    <th className="pb-3 font-medium">Profile</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}><td colSpan={6}><div className="skeleton h-10 my-1 rounded" /></td></tr>
                    ))
                  ) : users.map((u: any) => (
                    <tr key={u.id}>
                      <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{u.name}</td>
                      <td className="py-3 text-slate-500">{u.email}</td>
                      <td className="py-3">
                        <span className={`badge ${u.isAdmin ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                          {u.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`badge ${u.profileCompleted ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700'}`}>
                          {u.profileCompleted ? 'Done' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500">{format(new Date(u.createdAt), 'MMM d, yyyy')}</td>
                      <td className="py-3">
                        {!u.isAdmin && (
                          <button onClick={() => deleteUser(u.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                            <Trash size={15} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Page {userPage} · {userTotal} total</span>
              <div className="flex gap-2">
                <button onClick={() => setUserPage(p => Math.max(1, p - 1))} disabled={userPage === 1} className="btn-secondary py-1 px-3 text-xs">Prev</button>
                <button onClick={() => setUserPage(p => p + 1)} disabled={users.length < 20} className="btn-secondary py-1 px-3 text-xs">Next</button>
              </div>
            </div>
          </div>
        )}

        {/* Foods tab */}
        {tab === 'foods' && (
          <div className="card space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={foodQuery} onChange={e => { setFoodQuery(e.target.value); setFoodPage(1); }}
                  placeholder="Search foods..." className="input pl-9 text-sm" />
              </div>
              <span className="text-sm text-slate-500 shrink-0">{foodTotal} foods</span>
              <button onClick={() => setFoodModal('new')} className="btn-primary flex items-center gap-2 shrink-0 text-sm py-2 px-4">
                <Plus size={16} /> Add Food
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200 dark:border-slate-700">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Serving</th>
                    <th className="pb-3 font-medium">Calories</th>
                    <th className="pb-3 font-medium">P/C/F</th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}><td colSpan={6}><div className="skeleton h-10 my-1 rounded" /></td></tr>
                    ))
                  ) : foods.map((f: any) => (
                    <tr key={f.id}>
                      <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{f.name}</td>
                      <td className="py-3 text-slate-500">{f.category}</td>
                      <td className="py-3 text-slate-500">{f.servingSize}{f.servingUnit}</td>
                      <td className="py-3 font-semibold text-indigo-600">{f.calories} kcal</td>
                      <td className="py-3 text-slate-500">{f.protein}g / {f.carbs}g / {f.fat}g</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <button onClick={() => setFoodModal(f)} className="text-slate-400 hover:text-indigo-500 transition-colors p-1">
                            <PencilSimple size={15} />
                          </button>
                          <button onClick={() => deleteFood(f.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                            <Trash size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>Page {foodPage} · {foodTotal} total</span>
              <div className="flex gap-2">
                <button onClick={() => setFoodPage(p => Math.max(1, p - 1))} disabled={foodPage === 1} className="btn-secondary py-1 px-3 text-xs">Prev</button>
                <button onClick={() => setFoodPage(p => p + 1)} disabled={foods.length < 20} className="btn-secondary py-1 px-3 text-xs">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
