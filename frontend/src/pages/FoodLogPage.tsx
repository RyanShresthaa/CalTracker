import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlass, Plus, Trash, Barcode, X, Check } from 'phosphor-react';
import {
  useFoodSearch, useBarcodeLookup, useFoodLogs, useAddFoodLog, useDeleteFoodLog,
} from '../lib/hooks';
import {
  countToGrams, formatLoggedAmount, formatServingLabel, gramsToCount, isCountableFood, pluralizeUnit, quantityLabel,
} from '../lib/foodUnits';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const MEALS = [
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙' },
  { id: 'snacks', label: 'Snacks', emoji: '🍎' },
];

function foodKey(food: any) {
  if (food?.isRecipe) return `recipe-${food.id}`;
  return food?.id ?? `${food?.externalSource}-${food?.externalId}`;
}

function sourceBadge(source?: string) {
  switch (source) {
    case 'usda': return { label: 'USDA', className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' };
    case 'off': return { label: 'Open Food Facts', className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' };
    case 'custom': return { label: 'Custom', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' };
    case 'recipe': return { label: 'My Recipe', className: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400' };
    default: return null;
  }
}

function FoodSearchModal({ meal, onClose, onAdd }: any) {
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">Add to {meal}</h3>
          <button onClick={onClose} className="btn-ghost p-1"><X size={20} /></button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 space-y-3">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search USDA & Open Food Facts… (e.g. egg, chicken, momo)" className="input pl-10" autoFocus />
            {searchFetching && query && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">Searching…</span>
            )}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Barcode size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={barcode}
                onChange={e => setBarcode(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && lookupBarcode()}
                placeholder="Or scan / enter barcode"
                className="input pl-10 text-sm"
              />
            </div>
            <button type="button" onClick={lookupBarcode} className="btn-secondary px-3 text-sm shrink-0">
              Lookup
            </button>
          </div>
          <p className="text-xs text-slate-400">Powered by USDA FoodData Central & Open Food Facts (free databases)</p>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="p-4 space-y-2">
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-14 rounded-xl" />)}
            </div>
          )}
          {!loading && results.length === 0 && query && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-sm">Search USDA or Open Food Facts for "{query}"</p>
            </div>
          )}
          {!loading && results.length === 0 && !query && (
            <div className="text-center py-12 text-slate-400">
              <MagnifyingGlass size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No saved recipes or custom foods yet</p>
              <p className="text-xs mt-1">Create a <Link to="/recipes" className="text-indigo-600 hover:underline">recipe</Link> or search USDA / Open Food Facts</p>
            </div>
          )}
          {!loading && results.length > 0 && !query && (
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1 pb-2 uppercase tracking-wide">
              Your recipes & custom foods
            </p>
          )}
          {results.map((food: any) => {
            const badge = sourceBadge(food.source ?? food.externalSource);
            const isSelected = selected && foodKey(selected) === foodKey(food);
            return (
            <button key={foodKey(food)} onClick={() => selectFood(food)}
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50
                ${isSelected ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{food.name}</p>
                  {badge && <span className={`badge ${badge.className}`}>{badge.label}</span>}
                  {food.category && <span className="badge bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400">{food.category}</span>}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{formatServingLabel(food)} · {Math.round(food.calories)} kcal · P:{food.protein}g C:{food.carbs}g F:{food.fat}g</p>
              </div>
              {isSelected && <Check size={18} weight="bold" className="text-indigo-500 ml-2 shrink-0" />}
            </button>
          );})}
        </div>

        {/* Amount selector & Add button */}
        {selected && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
            <div className={`grid gap-3 ${isCountableFood(selected) ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {isCountableFood(selected) && (
                <div>
                  <label className="label text-xs">
                    {quantityLabel(selected.servingUnit || 'piece')}
                  </label>
                  <input
                    type="number"
                    value={count}
                    min={0.25}
                    step={0.25}
                    onChange={e => updateCount(Number(e.target.value))}
                    className="input text-center font-bold text-lg"
                  />
                </div>
              )}
              <div>
                <label className="label text-xs">
                  {selected.servingUnit === 'ml' ? 'Amount (ml)' : 'Weight (g)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  min={1}
                  step={isCountableFood(selected) ? selected.servingSize : 1}
                  onChange={e => updateAmount(Number(e.target.value))}
                  className="input text-center font-bold text-lg"
                />
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Quick add</p>
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
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors
                      ${(isCountableFood(selected) ? count === value : amount === value)
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {nutrition && (
              <div className="grid grid-cols-4 gap-2 text-center bg-slate-50 dark:bg-slate-700/50 rounded-xl p-3">
                <div><p className="text-lg font-bold text-indigo-600">{nutrition.calories}</p><p className="text-xs text-slate-500">kcal</p></div>
                <div><p className="text-lg font-bold text-blue-600">{nutrition.protein}g</p><p className="text-xs text-slate-500">Protein</p></div>
                <div><p className="text-lg font-bold text-green-600">{nutrition.carbs}g</p><p className="text-xs text-slate-500">Carbs</p></div>
                <div><p className="text-lg font-bold text-amber-600">{nutrition.fat}g</p><p className="text-xs text-slate-500">Fat</p></div>
              </div>
            )}
            <button onClick={handleAdd} className="btn-primary w-full py-3">
              Add to {meal}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MealSection({ meal, logs, onDelete, onAddClick }: any) {
  const total = logs.reduce((acc: any, l: any) => ({
    calories: acc.calories + l.calories,
    protein: acc.protein + l.protein,
    carbs: acc.carbs + l.carbs,
    fat: acc.fat + l.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">{meal.emoji}</span>
          <h3 className="font-semibold text-slate-900 dark:text-white">{meal.label}</h3>
          {logs.length > 0 && (
            <span className="badge bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400">
              {Math.round(total.calories)} kcal
            </span>
          )}
        </div>
        <button onClick={() => onAddClick(meal.id)}
          className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
          <Plus size={16} /> Add food
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
          <p className="text-sm text-slate-400">No foods logged for {meal.label.toLowerCase()}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log: any) => {
            const foodName = log.food?.name || log.customFood?.name || log.recipe?.name || 'Unknown food';
            const food = log.food || log.customFood || log.recipe;
            return (
              <div key={log.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{foodName}</p>
                  <p className="text-xs text-slate-500">{formatLoggedAmount(log.amount, food)} · P:{Math.round(log.protein)}g C:{Math.round(log.carbs)}g F:{Math.round(log.fat)}g</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{Math.round(log.calories)} kcal</span>
                  <button onClick={() => onDelete(log.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1">
                    <Trash size={15} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Meal totals */}
          <div className="flex justify-between pt-2 text-xs text-slate-500 font-medium">
            <span>Total: {Math.round(total.calories)} kcal</span>
            <span>P:{Math.round(total.protein)}g C:{Math.round(total.carbs)}g F:{Math.round(total.fat)}g</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FoodLogPage() {
  const [modal, setModal] = useState<string | null>(null);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const { data: logsData, isLoading } = useFoodLogs(date);
  const addFoodLog = useAddFoodLog(date);
  const deleteFoodLog = useDeleteFoodLog();

  const handleAdd = async (food: any, amount: number, meal: string) => {
    await addFoodLog.mutateAsync({ food, amount, meal });
  };

  const handleDelete = (id: string) => deleteFoodLog.mutate(id);

  const byMeal = logsData?.byMeal ?? { breakfast: [], lunch: [], dinner: [], snacks: [] };
  const totals = logsData?.totals ?? { calories: 0, protein: 0, carbs: 0, fat: 0 };

  return (
    <div className="space-y-6">
      {modal && (
        <FoodSearchModal meal={modal} onClose={() => setModal(null)} onAdd={handleAdd} />
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Food Log</h1>
          <p className="text-slate-500">Track your meals and nutrition</p>
        </div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="input w-auto" />
      </div>

      {/* Daily totals */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Calories', value: Math.round(totals.calories), unit: 'kcal', color: 'text-indigo-600' },
          { label: 'Protein', value: Math.round(totals.protein), unit: 'g', color: 'text-blue-600' },
          { label: 'Carbs', value: Math.round(totals.carbs), unit: 'g', color: 'text-green-600' },
          { label: 'Fat', value: Math.round(totals.fat), unit: 'g', color: 'text-amber-600' },
        ].map(item => (
          <div key={item.label} className="card text-center py-3">
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-xs text-slate-500">{item.label} ({item.unit})</p>
          </div>
        ))}
      </div>

      {/* Meal sections */}
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
        </div>
      ) : (
        <div className="space-y-4">
          {MEALS.map(meal => (
            <MealSection
              key={meal.id}
              meal={meal}
              logs={byMeal?.[meal.id] || []}
              onDelete={handleDelete}
              onAddClick={(m: string) => setModal(m)}
            />
          ))}
        </div>
      )}

      {/* Custom food link */}
      <div className="card text-center py-4">
        <p className="text-sm text-slate-500">
          Can't find a food?{' '}
          <Link to="/recipes" className="text-indigo-600 hover:underline font-medium">
            Create a recipe
          </Link>
          {' '}with auto-calculated nutrition from ingredients.
        </p>
      </div>
    </div>
  );
}
