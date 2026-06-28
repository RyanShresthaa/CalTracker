import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Barcode, Check, Plus } from 'lucide-react';
import {
  useFoodSearch, useBarcodeLookup, useFoodLogs, useAddFoodLog, useDeleteFoodLog,
  useDashboard,
} from '../lib/hooks';
import {
  countToGrams, formatLoggedAmount, formatServingLabel, gramsToCount, isCountableFood, pluralizeUnit, quantityLabel,
} from '../lib/foodUnits';
import FoodLogEntry from '../components/ui/FoodLogEntry';
import MacroBar from '../components/ui/MacroBar';
import CalorieProgressRing from '../components/ui/CalorieProgressRing';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useThemeColors } from '../lib/theme';

const MEALS = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'snacks', label: 'Snacks' },
];

function foodKey(food: any) {
  if (food?.isRecipe) return `recipe-${food.id}`;
  return food?.id ?? `${food?.externalSource}-${food?.externalId}`;
}

function sourceBadge(source?: string) {
  switch (source) {
    case 'usda': return { label: 'USDA', className: 'border-accent/30 text-accent' };
    case 'off': return { label: 'OFF', className: 'border-border text-muted' };
    case 'custom': return { label: 'Custom', className: 'border-border text-muted' };
    case 'recipe': return { label: 'Recipe', className: 'border-border text-muted' };
    default: return null;
  }
}

function FoodSearchModal({ meal, onClose, onAdd, onMealChange }: any) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [barcodeResults, setBarcodeResults] = useState<any[] | null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [amount, setAmount] = useState(100);
  const [count, setCount] = useState(1);
  const [barcode, setBarcode] = useState('');

  const { data: searchResults = [], isFetching: searchFetching, isError: searchError } = useFoodSearch(debouncedQuery, true);
  const barcodeMutation = useBarcodeLookup();

  const results = barcodeResults ?? searchResults;
  const loading = (searchFetching && results.length === 0) || barcodeMutation.isPending;

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setBarcodeResults(null);
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (searchError) toast.error('Search failed');
  }, [searchError]);

  const selectFood = (food: any) => {
    setSelected(food);
    if (isCountableFood(food)) {
      setCount(1);
      setAmount(food.servingSize);
    } else {
      setAmount(food.servingUnit === 'ml' ? food.servingSize : food.servingSize);
      setCount(1);
    }
  };

  const updateCount = (value: number) => {
    if (!selected || value <= 0) return;
    setCount(value);
    setAmount(countToGrams(value, selected.servingSize));
  };

  const updateAmount = (value: number) => {
    if (!selected || value <= 0) return;
    setAmount(value);
    if (isCountableFood(selected)) {
      setCount(gramsToCount(value, selected.servingSize));
    }
  };

  const lookupBarcode = () => {
    const code = barcode.trim();
    if (!code) return;
    barcodeMutation.mutate(code, {
      onSuccess: (food) => {
        selectFood(food);
        setBarcodeResults([food]);
        setQuery(food.name);
        toast.success('Product found');
      },
      onError: () => toast.error('Barcode not found in Open Food Facts'),
    });
  };

  const calcNutrition = (food: any, amt: number) => {
    const ratio = amt / food.servingSize;
    return {
      calories: Math.round(food.calories * ratio),
      protein: Math.round(food.protein * ratio * 10) / 10,
      carbs: Math.round(food.carbs * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
    };
  };

  const handleAdd = () => {
    if (!selected) return;
    const food = selected;
    const qty = amount;
    const label = formatLoggedAmount(amount, selected);
    const name = selected.name;
    onClose();
    onAdd(food, qty, meal)
      .then(() => toast.success(`Added ${label} — ${name}`))
      .catch((err: any) => toast.error(err.response?.data?.error || 'Failed to add food'));
  };

  const nutrition = selected ? calcNutrition(selected, amount) : null;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 sm:max-w-lg">
        <DialogHeader className="p-4 border-b border-border flex-row items-center justify-between space-y-0">
          <div className="flex items-center gap-3">
            <span className="label-caps">Add to</span>
            <Select value={meal} onValueChange={onMealChange}>
              <SelectTrigger className="w-auto py-1.5 h-8 text-sm font-mono">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEALS.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogTitle className="sr-only">Add food</DialogTitle>
        </DialogHeader>

        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted" />
            <Input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search USDA & Open Food Facts…" className="pl-10" autoFocus />
            {searchFetching && query && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">Searching…</span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Barcode className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted" />
              <Input
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && lookupBarcode()}
                placeholder="Barcode"
                className="pl-10 text-sm"
              />
            </div>
            <Button type="button" onClick={lookupBarcode} variant="outline" size="sm" className="shrink-0">
              Lookup
            </Button>
          </div>
          <p className="text-xs text-muted">USDA FoodData Central & Open Food Facts</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-4 space-y-2">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-14" />)}
            </div>
          )}
          {!loading && results.length === 0 && query && (
            <div className="text-center py-12 text-muted">
              <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
          {!loading && results.length === 0 && !query && (
            <div className="text-center py-12 text-muted">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Search or scan a barcode</p>
              <p className="text-xs mt-1">
                Or create a <Link to="/recipes" className="link-accent">recipe</Link>
              </p>
            </div>
          )}
          {!loading && results.length > 0 && !query && (
            <p className="label-caps px-4 pt-3 pb-2">Your recipes & custom foods</p>
          )}
          {results.map((food: any) => {
            const badge = sourceBadge(food.source ?? food.externalSource);
            const isSelected = selected && foodKey(selected) === foodKey(food);
            return (
            <button key={foodKey(food)} onClick={() => selectFood(food)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors row-hover
                ${isSelected ? 'bg-foreground/5 border-l-2 border-foreground' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-foreground text-sm truncate">{food.name}</p>
                  {badge && <Badge variant="outline" className={badge.className}>{badge.label}</Badge>}
                </div>
                <p className="text-xs text-muted mt-0.5 font-mono">
                  {formatServingLabel(food)} · {Math.round(food.calories)} kcal · P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                </p>
              </div>
              {isSelected && <Check className="h-[18px] w-[18px] text-foreground ml-2 shrink-0" />}
            </button>
          );})}
        </div>

        {selected && (
          <div className="p-4 border-t border-border space-y-3">
            <div className={`grid gap-3 ${isCountableFood(selected) ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {isCountableFood(selected) && (
                <div>
                  <Label>{quantityLabel(selected.servingUnit || 'piece')}</Label>
                  <Input
                    type="number"
                    value={count}
                    min={0.25}
                    step={0.25}
                    onChange={e => updateCount(Number(e.target.value))}
                    className="text-center text-lg mt-1.5"
                  />
                </div>
              )}
              <div>
                <Label>
                  {selected.servingUnit === 'ml' ? 'Amount (ml)' : 'Weight (g)'}
                </Label>
                <Input
                  type="number"
                  value={amount}
                  min={1}
                  step={isCountableFood(selected) ? selected.servingSize : 1}
                  onChange={e => updateAmount(Number(e.target.value))}
                  className="text-center text-lg mt-1.5"
                />
              </div>
            </div>
            <div>
              <p className="label mb-2">Quick add</p>
              <div className="flex flex-wrap gap-1">
                {(isCountableFood(selected)
                  ? [1, 2, 3, 4].map(v => ({ value: v, label: `${v} ${pluralizeUnit(selected.servingUnit, v)}` }))
                  : selected.servingUnit === 'ml'
                    ? [120, 240, 355, 500].map(v => ({ value: v, label: `${v}ml` }))
                    : [50, 100, 150, 200].map(v => ({ value: v, label: `${v}g` }))
                ).map(({ value, label }) => (
                  <button
                    key={label}
                    onClick={() => (isCountableFood(selected) ? updateCount(value) : updateAmount(value))}
                    className={`px-2.5 py-1 text-xs transition-colors border
                      ${(isCountableFood(selected) ? count === value : amount === value)
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border row-hover'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {nutrition && (
              <div className="grid grid-cols-4 gap-2 text-center border border-border p-3">
                <div><p className="text-lg text-foreground">{nutrition.calories}</p><p className="label-caps mt-1">kcal</p></div>
                <div><p className="text-lg text-foreground">{nutrition.protein}g</p><p className="label-caps mt-1">Protein</p></div>
                <div><p className="text-lg text-foreground">{nutrition.carbs}g</p><p className="label-caps mt-1">Carbs</p></div>
                <div><p className="text-lg text-foreground">{nutrition.fat}g</p><p className="label-caps mt-1">Fat</p></div>
              </div>
            )}
            <Button onClick={handleAdd} className="w-full py-3">
              Add to {MEALS.find(m => m.id === meal)?.label}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MealSection({ meal, logs, onDelete, onAddFood }: any) {
  const total = logs.reduce((acc: any, l: any) => ({
    calories: acc.calories + l.calories,
    protein: acc.protein + l.protein,
    carbs: acc.carbs + l.carbs,
    fat: acc.fat + l.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="label-caps text-foreground">{meal.label}</h3>
        <div className="flex items-center gap-2 shrink-0">
          {logs.length > 0 && (
            <span className="text-xs text-foreground tabular-nums hidden sm:inline">
              {Math.round(total.calories)} kcal
            </span>
          )}
          <Button type="button" variant="outline" size="sm" onClick={() => onAddFood(meal.id)}>
            <Plus className="h-4 w-4" />
            Log food
          </Button>
        </div>
      </div>

      {logs.length === 0 ? (
        <p className="text-sm text-muted-foreground py-2">Nothing logged yet.</p>
      ) : (
        <div>
          {logs.map((log: any) => (
            <FoodLogEntry key={log.id} log={log} onDelete={onDelete} />
          ))}
          <div className="flex justify-between pt-3 mt-1 border-t border-border text-xs text-muted-foreground">
            <span>{Math.round(total.calories)} kcal total</span>
            <span>P {Math.round(total.protein)}g · C {Math.round(total.carbs)}g · F {Math.round(total.fat)}g</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FoodLogPage() {
  const theme = useThemeColors();
  const [modal, setModal] = useState<string | null>(null);
  const [modalMeal, setModalMeal] = useState('lunch');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const { data: logsData, isLoading } = useFoodLogs(date);
  const { data: dashboardData } = useDashboard();
  const addFoodLog = useAddFoodLog(date);
  const deleteFoodLog = useDeleteFoodLog();

  const handleAdd = async (food: any, amount: number, meal: string) => {
    await addFoodLog.mutateAsync({ food, amount, meal });
  };

  const handleDelete = (id: string) => deleteFoodLog.mutate(id);

  const openModal = (meal = 'lunch') => {
    setModalMeal(meal);
    setModal(meal);
  };

  const byMeal = logsData?.byMeal ?? { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const totals = logsData?.totals ?? { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const calorieGoal = dashboardData?.calories?.goal ?? 2000;
  const macroGoals = dashboardData?.macros ?? {
    protein: { goal: 150 },
    carbs: { goal: 250 },
    fat: { goal: 65 },
  };
  const remaining = calorieGoal - totals.calories;

  return (
    <div className="space-y-6">
      {modal && (
        <FoodSearchModal
          meal={modalMeal}
          onClose={() => setModal(null)}
          onAdd={handleAdd}
          onMealChange={setModalMeal}
        />
      )}

      <PageHeader
        title="Food Log"
        subtitle={format(new Date(date), 'EEEE, MMMM d')}
        action={
          <Input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="w-auto text-sm" />
        }
      />

      <Card>
        <CardContent className="pt-6 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
        <CalorieProgressRing
          consumed={totals.calories}
          goal={calorieGoal}
          remaining={remaining}
          size={160}
        />
        <div className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="label-caps mb-1">Calories</p>
              <p className="text-xl font-semibold tabular-nums text-foreground tabular-nums">
                {Math.round(totals.calories)}
              </p>
            </div>
            <div>
              <p className="label-caps mb-1">Remaining</p>
              <p className={`text-2xl font-semibold tabular-nums ${remaining < 0 ? 'text-destructive' : 'text-foreground'}`}>
                {remaining < 0 ? `−${Math.abs(Math.round(remaining)).toLocaleString()}` : Math.round(remaining).toLocaleString()}
              </p>
              {remaining < 0 && <p className="label-caps text-destructive mt-1">over</p>}
            </div>
          </div>
          <MacroBar label="Protein" consumed={totals.protein} goal={macroGoals.protein.goal} color={theme.macroProtein} />
          <MacroBar label="Carbs" consumed={totals.carbs} goal={macroGoals.carbs.goal} color={theme.macroCarbs} />
          <MacroBar label="Fat" consumed={totals.fat} goal={macroGoals.fat.goal} color={theme.macroFat} />
        </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-6 space-y-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16" />)}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {MEALS.map((meal) => (
              <MealSection
                key={meal.id}
                meal={meal}
                logs={byMeal?.[meal.id] || []}
                onDelete={handleDelete}
                onAddFood={openModal}
              />
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="text-center">
        <CardContent className="py-4">
        <p className="text-sm text-muted-foreground">
          Can&apos;t find a food?{' '}
          <Link to="/recipes" className="link-accent">Create a recipe</Link>
          {' '}with auto-calculated nutrition.
        </p>
        </CardContent>
      </Card>

    </div>
  );
}
