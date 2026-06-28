import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Barcode, X, Check } from 'phosphor-react';
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
import toast from 'react-hot-toast';
import { format } from 'date-fns';

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
    case 'off': return { label: 'OFF', className: 'border-coral/30 text-coral' };
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
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-surface border border-border w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="label-caps">Add to</span>
            <select
              value={meal}
              onChange={e => onMealChange(e.target.value)}
              className="input w-auto py-1.5 text-sm font-mono"
            >
              {MEALS.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
          <button onClick={onClose} className="btn-ghost p-1"><X size={20} /></button>
        </div>

        <div className="p-4 border-b border-border space-y-3">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search USDA & Open Food Facts…" className="input pl-10" autoFocus />
            {searchFetching && query && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">Searching…</span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Barcode size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && lookupBarcode()}
                placeholder="Barcode"
                className="input pl-10 text-sm"
              />
            </div>
            <button type="button" onClick={lookupBarcode} className="btn-secondary px-3 text-sm shrink-0">
              Lookup
            </button>
          </div>
          <p className="text-xs text-muted">USDA FoodData Central & Open Food Facts</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-4 space-y-2">
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-14" />)}
            </div>
          )}
          {!loading && results.length === 0 && query && (
            <div className="text-center py-12 text-muted">
              <p className="text-sm">No results for &ldquo;{query}&rdquo;</p>
            </div>
          )}
          {!loading && results.length === 0 && !query && (
            <div className="text-center py-12 text-muted">
              <MagnifyingGlass size={32} className="mx-auto mb-2 opacity-30" />
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
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-hover
                ${isSelected ? 'bg-hover border-l-2 border-accent' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-text-primary text-sm truncate">{food.name}</p>
                  {badge && <span className={`badge ${badge.className}`}>{badge.label}</span>}
                </div>
                <p className="text-xs text-muted mt-0.5 font-mono">
                  {formatServingLabel(food)} · {Math.round(food.calories)} kcal · P:{food.protein}g C:{food.carbs}g F:{food.fat}g
                </p>
              </div>
              {isSelected && <Check size={18} weight="bold" className="text-accent ml-2 shrink-0" />}
            </button>
          );})}
        </div>

        {selected && (
          <div className="p-4 border-t border-border space-y-3">
            <div className={`grid gap-3 ${isCountableFood(selected) ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {isCountableFood(selected) && (
                <div>
                  <label className="label">{quantityLabel(selected.servingUnit || 'piece')}</label>
                  <input
                    type="number"
                    value={count}
                    min={0.25}
                    step={0.25}
                    onChange={e => updateCount(Number(e.target.value))}
                    className="input text-center font-mono text-lg"
                  />
                </div>
              )}
              <div>
                <label className="label">
                  {selected.servingUnit === 'ml' ? 'Amount (ml)' : 'Weight (g)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  min={1}
                  step={isCountableFood(selected) ? selected.servingSize : 1}
                  onChange={e => updateAmount(Number(e.target.value))}
                  className="input text-center font-mono text-lg"
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
                    className={`px-2.5 py-1 text-xs font-mono transition-colors border
                      ${(isCountableFood(selected) ? count === value : amount === value)
                        ? 'bg-accent text-bg border-accent'
                        : 'bg-surface text-muted border-border hover:bg-hover'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {nutrition && (
              <div className="grid grid-cols-4 gap-2 text-center border border-border p-3">
                <div><p className="font-mono text-lg text-accent">{nutrition.calories}</p><p className="label-caps mt-1">kcal</p></div>
                <div><p className="font-mono text-lg text-text-primary">{nutrition.protein}g</p><p className="label-caps mt-1">Protein</p></div>
                <div><p className="font-mono text-lg text-text-primary">{nutrition.carbs}g</p><p className="label-caps mt-1">Carbs</p></div>
                <div><p className="font-mono text-lg text-coral">{nutrition.fat}g</p><p className="label-caps mt-1">Fat</p></div>
              </div>
            )}
            <button onClick={handleAdd} className="btn-primary w-full py-3">
              Add to {MEALS.find(m => m.id === meal)?.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MealSection({ meal, logs, onDelete, delay }: any) {
  const total = logs.reduce((acc: any, l: any) => ({
    calories: acc.calories + l.calories,
    protein: acc.protein + l.protein,
    carbs: acc.carbs + l.carbs,
    fat: acc.fat + l.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="card stagger-item" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="label-caps text-text-primary">{meal.label}</h3>
        {logs.length > 0 && (
          <span className="font-mono text-xs text-accent tabular-nums">
            {Math.round(total.calories)} kcal
          </span>
        )}
      </div>

      {logs.length === 0 ? (
        <p className="text-xs text-muted py-4">Nothing logged yet. Add your first meal.</p>
      ) : (
        <div>
          {logs.map((log: any) => (
            <FoodLogEntry key={log.id} log={log} onDelete={onDelete} />
          ))}
          <div className="flex justify-between pt-3 mt-1 border-t border-border text-xs font-mono text-muted">
            <span>{Math.round(total.calories)} kcal total</span>
            <span>P {Math.round(total.protein)}g · C {Math.round(total.carbs)}g · F {Math.round(total.fat)}g</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FoodLogPage() {
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
    <div className="space-y-6 pb-28">
      {modal && (
        <FoodSearchModal
          meal={modalMeal}
          onClose={() => setModal(null)}
          onAdd={handleAdd}
          onMealChange={setModalMeal}
        />
      )}

      <header className="stagger-item flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-mono text-xl font-light tracking-wider text-text-primary uppercase">Food Log</h1>
          <p className="text-sm text-muted mt-1">{format(new Date(date), 'EEEE, MMMM d')}</p>
        </div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="input w-auto font-mono text-sm" />
      </header>

      <div className="card stagger-item grid sm:grid-cols-[auto_1fr] gap-6 items-center" style={{ animationDelay: '60ms' }}>
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
              <p className="font-mono text-2xl font-light tracking-wider text-accent tabular-nums">
                {Math.round(totals.calories)}
              </p>
            </div>
            <div>
              <p className="label-caps mb-1">Remaining</p>
              <p className={`font-mono text-2xl font-light tracking-wider tabular-nums ${remaining < 0 ? 'text-coral' : 'text-text-primary'}`}>
                {remaining < 0 ? `−${Math.abs(Math.round(remaining)).toLocaleString()}` : Math.round(remaining).toLocaleString()}
              </p>
              {remaining < 0 && <p className="label-caps text-coral mt-1">over</p>}
            </div>
          </div>
          <MacroBar label="Protein" consumed={totals.protein} goal={macroGoals.protein.goal} color="#C8F55A" />
          <MacroBar label="Carbs" consumed={totals.carbs} goal={macroGoals.carbs.goal} color="#F0EDE6" />
          <MacroBar label="Fat" consumed={totals.fat} goal={macroGoals.fat.goal} color="#FF6B35" />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-px bg-border">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32" />)}
        </div>
      ) : (
        <div className="space-y-px bg-border">
          {MEALS.map((meal, i) => (
            <MealSection
              key={meal.id}
              meal={meal}
              logs={byMeal?.[meal.id] || []}
              onDelete={handleDelete}
              delay={120 + i * 60}
            />
          ))}
        </div>
      )}

      <div className="card stagger-item text-center py-4" style={{ animationDelay: '360ms' }}>
        <p className="text-sm text-muted">
          Can&apos;t find a food?{' '}
          <Link to="/recipes" className="link-accent">Create a recipe</Link>
          {' '}with auto-calculated nutrition.
        </p>
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button
          type="button"
          onClick={() => openModal(modalMeal)}
          className="btn-pill shadow-[0_4px_24px_rgba(200,245,90,0.25)]"
        >
          Log Food
        </button>
      </div>
    </div>
  );
}
