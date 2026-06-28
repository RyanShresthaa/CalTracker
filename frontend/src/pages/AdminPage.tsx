import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Trash, Pencil, X, Users, UtensilsCrossed, BarChart3, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import {
  useAdminStats, useAdminUsers, useAdminFoods,
  useDeleteAdminUser, useDeleteAdminFood, useSaveAdminFood,
} from '../lib/hooks';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '../components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';

type Tab = 'stats' | 'users' | 'foods';

function StatBox({ label, value }: { label: string; value?: number }) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <p className="stat-value">{value?.toLocaleString() ?? '—'}</p>
        <p className="label-caps mt-2">{label}</p>
      </CardContent>
    </Card>
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
      <Label>{label}</Label>
      <Input type={type} step={step} value={(form as any)[key]}
        onChange={e => setForm({ ...form, [key]: type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value })}
        className="mt-1.5" />
    </div>
  );

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="page-title !text-base">{food ? 'Edit Food' : 'Add Food'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">{field('Food Name', 'name', 'text')}</div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {field('Serving Size', 'servingSize')}
              <div>
                <Label>Unit</Label>
                <Select value={form.servingUnit} onValueChange={(v) => setForm({ ...form, servingUnit: v })}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="g">g</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="egg">egg</SelectItem>
                    <SelectItem value="piece">piece</SelectItem>
                    <SelectItem value="slice">slice</SelectItem>
                    <SelectItem value="oz">oz</SelectItem>
                  </SelectContent>
                </Select>
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
        <DialogFooter className="gap-3 sm:justify-end">
          <Button type="button" onClick={onClose} variant="outline">Cancel</Button>
          <Button type="button" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Food'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
    { id: 'stats', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'foods', label: 'Foods', icon: UtensilsCrossed },
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {foodModal !== undefined && foodModal !== null && (
        <FoodModal food={foodModal === 'new' ? null : foodModal} onClose={() => setFoodModal(null)} onSave={saveFood} />
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')} className="text-sm -ml-2">
          <ArrowLeft className="h-[18px] w-[18px]" /> Dashboard
        </Button>

        <PageHeader
          title="Admin Panel"
          subtitle={`Logged in as ${user?.name}`}
        />

        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList>
            {tabs.map(t => {
              const Icon = t.icon;
              return (
                <TabsTrigger key={t.id} value={t.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {t.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {tab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatBox label="Total Users" value={stats?.stats?.users} />
              <StatBox label="Total Foods" value={stats?.stats?.foods} />
              <StatBox label="Food Logs" value={stats?.stats?.foodLogs} />
              <StatBox label="Activities Logged" value={stats?.stats?.activities} />
            </div>

            <Card>
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-base font-semibold">Recent Users</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted border-b border-border">
                      <th className="pb-3 font-medium text-xs text-muted-foreground">Name</th>
                      <th className="pb-3 font-medium text-xs text-muted-foreground">Email</th>
                      <th className="pb-3 font-medium text-xs text-muted-foreground">Profile</th>
                      <th className="pb-3 font-medium text-xs text-muted-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(stats?.recentUsers || []).map((u: any) => (
                      <tr key={u.id}>
                        <td className="py-3 font-medium text-foreground">{u.name}</td>
                        <td className="py-3 text-muted">{u.email}</td>
                        <td className="py-3">
                          <Badge variant={u.profileCompleted ? 'default' : 'outline'}>
                            {u.profileCompleted ? 'Complete' : 'Pending'}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted text-xs">{format(new Date(u.createdAt), 'MMM d, yyyy')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'users' && (
          <Card>
            <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <Input value={userQuery} onChange={e => { setUserQuery(e.target.value); setUserPage(1); }}
                  placeholder="Search users..." className="pl-9 text-sm" />
              </div>
              <span className="text-sm text-muted shrink-0 font-mono">{userTotal} users</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted border-b border-border">
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Name</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Email</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Role</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Profile</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Joined</th>
                    <th className="pb-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}><td colSpan={6}><Skeleton className="h-10 my-1" /></td></tr>
                    ))
                  ) : users.map((u: any) => (
                    <tr key={u.id}>
                      <td className="py-3 font-medium text-foreground">{u.name}</td>
                      <td className="py-3 text-muted">{u.email}</td>
                      <td className="py-3">
                        <Badge variant={u.isAdmin ? 'default' : 'outline'}>
                          {u.isAdmin ? 'Admin' : 'User'}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge variant={u.profileCompleted ? 'default' : 'outline'}>
                          {u.profileCompleted ? 'Done' : 'Pending'}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted text-xs">{format(new Date(u.createdAt), 'MMM d, yyyy')}</td>
                      <td className="py-3">
                        {!u.isAdmin && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => deleteUser(u.id)} className="h-8 w-8 text-muted hover:text-destructive">
                            <Trash className="h-[15px] w-[15px]" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="text-xs">Page {userPage} · {userTotal} total</span>
              <div className="flex gap-2">
                <Button type="button" onClick={() => setUserPage(p => Math.max(1, p - 1))} disabled={userPage === 1} variant="outline" size="sm">Prev</Button>
                <Button type="button" onClick={() => setUserPage(p => p + 1)} disabled={users.length < 20} variant="outline" size="sm">Next</Button>
              </div>
            </div>
            </CardContent>
          </Card>
        )}

        {tab === 'foods' && (
          <Card>
            <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                <Input value={foodQuery} onChange={e => { setFoodQuery(e.target.value); setFoodPage(1); }}
                  placeholder="Search foods..." className="pl-9 text-sm" />
              </div>
              <span className="text-sm text-muted shrink-0 font-mono">{foodTotal} foods</span>
              <Button type="button" onClick={() => setFoodModal('new')} size="sm" className="shrink-0">
                <Plus className="h-4 w-4" /> Add Food
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted border-b border-border">
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Name</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Category</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Serving</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">Calories</th>
                    <th className="pb-3 font-medium text-xs text-muted-foreground">P/C/F</th>
                    <th className="pb-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {loading ? (
                    [...Array(5)].map((_, i) => (
                      <tr key={i}><td colSpan={6}><Skeleton className="h-10 my-1" /></td></tr>
                    ))
                  ) : foods.map((f: any) => (
                    <tr key={f.id}>
                      <td className="py-3 font-medium text-foreground">{f.name}</td>
                      <td className="py-3 text-muted">{f.category}</td>
                      <td className="py-3 text-muted text-xs">{f.servingSize}{f.servingUnit}</td>
                      <td className="py-3 text-accent">{f.calories} kcal</td>
                      <td className="py-3 text-muted text-xs">{f.protein}g / {f.carbs}g / {f.fat}g</td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button type="button" variant="ghost" size="icon" onClick={() => setFoodModal(f)} className="h-8 w-8 text-muted hover:text-accent">
                            <Pencil className="h-[15px] w-[15px]" />
                          </Button>
                          <Button type="button" variant="ghost" size="icon" onClick={() => deleteFood(f.id)} className="h-8 w-8 text-muted hover:text-destructive">
                            <Trash className="h-[15px] w-[15px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-sm text-muted">
              <span className="text-xs">Page {foodPage} · {foodTotal} total</span>
              <div className="flex gap-2">
                <Button type="button" onClick={() => setFoodPage(p => Math.max(1, p - 1))} disabled={foodPage === 1} variant="outline" size="sm">Prev</Button>
                <Button type="button" onClick={() => setFoodPage(p => p + 1)} disabled={foods.length < 20} variant="outline" size="sm">Next</Button>
              </div>
            </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
