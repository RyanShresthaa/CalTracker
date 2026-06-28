import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Trash, PencilSimple, X, MagnifyingGlass, BookOpen, Check,
} from 'phosphor-react';
import {
  useRecipes, useCreateRecipe, useUpdateRecipe, useDeleteRecipe, useFoodSearch,
} from '../lib/hooks';
import { foodsAPI } from '../lib/api';
import toast from 'react-hot-toast';

type IngredientDraft = {
  key: string;
  name: string;
  foodId?: string;
  customFoodId?: string;
  amount: number;
  servingSize: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  manual?: boolean;
  caloriesPer100?: number;
  proteinPer100?: number;
  carbsPer100?: number;
  fatPer100?: number;
};

function calcFromFood(food: IngredientDraft, amount: number) {
  const ratio = amount / food.servingSize;
  return {
    calories: Math.round(food.calories * ratio * 10) / 10,
    protein: Math.round(food.protein * ratio * 10) / 10,
    carbs: Math.round(food.carbs * ratio * 10) / 10,
    fat: Math.round(food.fat * ratio * 10) / 10,
  };
}

function calcFromManual(ing: IngredientDraft) {
  const ratio = ing.amount / 100;
  return {
    calories: Math.round((ing.caloriesPer100 || 0) * ratio * 10) / 10,
    protein: Math.round((ing.proteinPer100 || 0) * ratio * 10) / 10,
    carbs: Math.round((ing.carbsPer100 || 0) * ratio * 10) / 10,
    fat: Math.round((ing.fatPer100 || 0) * ratio * 10) / 10,
  };
}

function ingredientNutrition(ing: IngredientDraft) {
  return ing.manual ? calcFromManual(ing) : calcFromFood(ing, ing.amount);
}

function toApiIngredient(ing: IngredientDraft) {
  if (ing.manual) {
    return {
      name: ing.name,
      amount: ing.amount,
      caloriesPer100: ing.caloriesPer100 ?? 0,
      proteinPer100: ing.proteinPer100 ?? 0,
      carbsPer100: ing.carbsPer100 ?? 0,
      fatPer100: ing.fatPer100 ?? 0,
    };
  }
  return {
    name: ing.name,
    foodId: ing.foodId,
    customFoodId: ing.customFoodId,
    amount: ing.amount,
  };
}

function RecipeEditor({ recipe, onClose }: { recipe?: any; onClose: () => void }) {
  const [name, setName] = useState(recipe?.name ?? '');
  const [description, setDescription] = useState(recipe?.description ?? '');
  const [servings, setServings] = useState(recipe?.servings ?? 1);
  const [ingredients, setIngredients] = useState<IngredientDraft[]>(() =>
    (recipe?.ingredients ?? []).map((ing: any, i: number) => ({
      key: `${ing.id}-${i}`,
      name: ing.name,
      foodId: ing.foodId ?? undefined,
      customFoodId: ing.customFoodId ?? undefined,
      amount: ing.amount,
      servingSize: ing.food?.servingSize ?? ing.customFood?.servingSize ?? ing.amount,
      calories: ing.food?.calories ?? ing.customFood?.calories ?? (ing.calories / ing.amount) * (ing.food?.servingSize ?? 100),
      protein: ing.food?.protein ?? ing.customFood?.protein ?? 0,
      carbs: ing.food?.carbs ?? ing.customFood?.carbs ?? 0,
      fat: ing.food?.fat ?? ing.customFood?.fat ?? 0,
      manual: !ing.foodId && !ing.customFoodId,
      caloriesPer100: !ing.foodId && !ing.customFoodId ? (ing.calories / ing.amount) * 100 : undefined,
      proteinPer100: !ing.foodId && !ing.customFoodId ? (ing.protein / ing.amount) * 100 : undefined,
      carbsPer100: !ing.foodId && !ing.customFoodId ? (ing.carbs / ing.amount) * 100 : undefined,
      fatPer100: !ing.foodId && !ing.customFoodId ? (ing.fat / ing.amount) * 100 : undefined,
    })),
  );
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [manual, setManual] = useState({
    name: '', amount: 100, caloriesPer100: 0, proteinPer100: 0, carbsPer100: 0, fatPer100: 0,
  });

  const { data: searchResults = [], isLoading: searching } = useFoodSearch(debouncedQuery);
  const createRecipe = useCreateRecipe();
  const updateRecipe = useUpdateRecipe();
  const saving = createRecipe.isPending || updateRecipe.isPending;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  const totals = useMemo(() => ingredients.reduce(
    (acc, ing) => {
      const n = ingredientNutrition(ing);
      return {
        calories: acc.calories + n.calories,
        protein: acc.protein + n.protein,
        carbs: acc.carbs + n.carbs,
        fat: acc.fat + n.fat,
        weight: acc.weight + ing.amount,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, weight: 0 },
  ), [ingredients]);

  const safeServings = servings > 0 ? servings : 1;
  const perServing = {
    calories: Math.round(totals.calories / safeServings),
    protein: Math.round(totals.protein / safeServings * 10) / 10,
    carbs: Math.round(totals.carbs / safeServings * 10) / 10,
    fat: Math.round(totals.fat / safeServings * 10) / 10,
    weight: Math.round(totals.weight / safeServings),
  };

  const addFromSearch = async (food: any) => {
    if (food.isRecipe) {
      toast.error('Cannot add a recipe inside another recipe');
      return;
    }
    let resolved = food;
    if (food.isExternal && food.externalSource && food.externalId) {
      try {
        const res = await foodsAPI.importExternal({
          source: food.externalSource,
          externalId: food.externalId,
        });
        resolved = res.data;
      } catch {
        toast.error('Failed to import food for recipe');
        return;
      }
    }
    setIngredients(prev => [...prev, {
      key: `${resolved.id}-${Date.now()}`,
      name: resolved.name,
      foodId: resolved.isCustom ? undefined : resolved.id,
      customFoodId: resolved.isCustom ? resolved.id : undefined,
      amount: resolved.servingSize,
      servingSize: resolved.servingSize,
      calories: resolved.calories,
      protein: resolved.protein,
      carbs: resolved.carbs,
      fat: resolved.fat,
    }]);
    setQuery('');
    setDebouncedQuery('');
  };

  const addManual = () => {
    if (!manual.name.trim()) { toast.error('Enter ingredient name'); return; }
    setIngredients(prev => [...prev, {
      key: `manual-${Date.now()}`,
      name: manual.name.trim(),
      amount: manual.amount,
      servingSize: 100,
      calories: manual.caloriesPer100,
      protein: manual.proteinPer100,
      carbs: manual.carbsPer100,
      fat: manual.fatPer100,
      manual: true,
      caloriesPer100: manual.caloriesPer100,
      proteinPer100: manual.proteinPer100,
      carbsPer100: manual.carbsPer100,
      fatPer100: manual.fatPer100,
    }]);
    setManual({ name: '', amount: 100, caloriesPer100: 0, proteinPer100: 0, carbsPer100: 0, fatPer100: 0 });
    setShowManual(false);
  };

  const save = () => {
    if (!name.trim()) { toast.error('Recipe name is required'); return; }
    if (ingredients.length === 0) { toast.error('Add at least one ingredient'); return; }
    const payload = {
      name: name.trim(),
      description: description.trim() || undefined,
      servings: safeServings,
      ingredients: ingredients.map(toApiIngredient),
    };
    if (recipe?.id) {
      updateRecipe.mutate({ id: recipe.id, data: payload }, { onSuccess: onClose });
    } else {
      createRecipe.mutate(payload, { onSuccess: onClose });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {recipe ? 'Edit Recipe' : 'New Recipe'}
          </h3>
          <button onClick={onClose} className="btn-ghost p-1"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="label text-xs">Recipe name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="input" placeholder="e.g. Momo, Dal Bhat, Protein Oats" />
            </div>
            <div className="sm:col-span-2">
              <label className="label text-xs">Description (optional)</label>
              <input value={description} onChange={e => setDescription(e.target.value)} className="input" placeholder="Notes or cooking tips" />
            </div>
            <div>
              <label className="label text-xs">Servings</label>
              <input type="number" min={1} step={1} value={servings} onChange={e => setServings(Number(e.target.value))} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3">
            <div><p className="text-lg font-bold text-indigo-600">{perServing.calories}</p><p className="text-xs text-slate-500">kcal / serving</p></div>
            <div><p className="text-lg font-bold text-blue-600">{perServing.protein}g</p><p className="text-xs text-slate-500">Protein</p></div>
            <div><p className="text-lg font-bold text-green-600">{perServing.carbs}g</p><p className="text-xs text-slate-500">Carbs</p></div>
            <div><p className="text-lg font-bold text-amber-600">{perServing.fat}g</p><p className="text-xs text-slate-500">Fat</p></div>
          </div>
          <p className="text-xs text-slate-500 text-center">
            Total batch: {Math.round(totals.calories)} kcal · {Math.round(totals.weight)}g · {ingredients.length} ingredients
          </p>

          <div>
            <label className="label text-xs">Add ingredients</label>
            <div className="relative mb-2">
              <MagnifyingGlass size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={e => setQuery(e.target.value)} className="input pl-10" placeholder="Search foods (USDA, Open Food Facts, your foods…)" />
            </div>
            {searching && <p className="text-xs text-slate-400 mb-2">Searching…</p>}
            {debouncedQuery && searchResults.length > 0 && (
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl mb-2 max-h-40 overflow-y-auto">
                {searchResults.filter((f: any) => !f.isRecipe).slice(0, 8).map((food: any) => (
                  <button key={food.id ?? `${food.externalSource}-${food.externalId}`} onClick={() => addFromSearch(food)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 last:border-0">
                    <span className="font-medium text-slate-800 dark:text-slate-200">{food.name}</span>
                    <span className="text-xs text-slate-500 ml-2">{Math.round(food.calories)} kcal / {food.servingSize}{food.servingUnit || 'g'}</span>
                  </button>
                ))}
              </div>
            )}
            <button onClick={() => setShowManual(v => !v)} className="text-sm text-indigo-600 hover:underline">
              {showManual ? 'Hide manual entry' : "+ Can't find it? Add ingredient manually"}
            </button>
            {showManual && (
              <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Can't find it in search? Enter the ingredient yourself. Nutrition values should be{' '}
                  <span className="font-medium text-slate-600 dark:text-slate-400">per 100g</span>{' '}
                  (from the package label or a nutrition site).
                </p>

                <div>
                  <label className="label text-xs">Ingredient name</label>
                  <input
                    value={manual.name}
                    onChange={e => setManual({ ...manual, name: e.target.value })}
                    className="input text-sm"
                    placeholder="e.g. Rice flour, olive oil, chicken breast"
                  />
                </div>

                <div>
                  <label className="label text-xs">Amount in this recipe (grams)</label>
                  <input
                    type="number"
                    min={1}
                    value={manual.amount}
                    onChange={e => setManual({ ...manual, amount: Number(e.target.value) })}
                    className="input text-sm"
                    placeholder="150"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    How many grams of this ingredient you use for the whole batch
                  </p>
                </div>

                <div>
                  <p className="label text-xs mb-2">Nutrition per 100g</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="label text-[11px] text-slate-500">Calories (kcal)</label>
                      <input
                        type="number"
                        min={0}
                        value={manual.caloriesPer100}
                        onChange={e => setManual({ ...manual, caloriesPer100: Number(e.target.value) })}
                        className="input text-sm"
                        placeholder="364"
                      />
                    </div>
                    <div>
                      <label className="label text-[11px] text-slate-500">Protein (g)</label>
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={manual.proteinPer100}
                        onChange={e => setManual({ ...manual, proteinPer100: Number(e.target.value) })}
                        className="input text-sm"
                        placeholder="6"
                      />
                    </div>
                    <div>
                      <label className="label text-[11px] text-slate-500">Carbs (g)</label>
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={manual.carbsPer100}
                        onChange={e => setManual({ ...manual, carbsPer100: Number(e.target.value) })}
                        className="input text-sm"
                        placeholder="76"
                      />
                    </div>
                    <div>
                      <label className="label text-[11px] text-slate-500">Fat (g)</label>
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={manual.fatPer100}
                        onChange={e => setManual({ ...manual, fatPer100: Number(e.target.value) })}
                        className="input text-sm"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Example: white rice is ~130 kcal, 2.7g protein, 28g carbs, 0.3g fat per 100g cooked
                  </p>
                </div>

                <button onClick={addManual} className="btn-secondary text-sm w-full">Add ingredient</button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ingredients</h4>
            {ingredients.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">Search and add foods to build your recipe</p>
            ) : ingredients.map(ing => {
              const n = ingredientNutrition(ing);
              return (
                <div key={ing.key} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{ing.name}</p>
                    <p className="text-xs text-slate-500">{n.calories} kcal · P:{n.protein}g C:{n.carbs}g F:{n.fat}g</p>
                  </div>
                  <input type="number" min={1} value={ing.amount} onChange={e => setIngredients(prev => prev.map(x => x.key === ing.key ? { ...x, amount: Number(e.target.value) } : x))}
                    className="input w-20 text-center text-sm py-1.5" />
                  <span className="text-xs text-slate-500">g</span>
                  <button onClick={() => setIngredients(prev => prev.filter(x => x.key !== ing.key))} className="text-slate-400 hover:text-red-500 p-1">
                    <Trash size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
          <button onClick={onClose} className="btn-secondary flex-1">Cancel</button>
          <button onClick={save} disabled={saving} className="btn-primary flex-1">
            {saving ? 'Saving…' : recipe ? 'Update Recipe' : 'Save Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecipesPage() {
  const [editor, setEditor] = useState<any>(null);
  const { data: recipes = [], isLoading } = useRecipes();
  const deleteRecipe = useDeleteRecipe();

  return (
    <div className="space-y-6">
      {editor !== null && (
        <RecipeEditor recipe={editor === 'new' ? undefined : editor} onClose={() => setEditor(null)} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Recipes</h1>
          <p className="text-slate-500">Create recipes — calories are calculated from ingredients</p>
        </div>
        <button onClick={() => setEditor('new')} className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Recipe
        </button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-36 rounded-2xl" />)}
        </div>
      ) : recipes.length === 0 ? (
        <div className="card text-center py-16">
          <BookOpen size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">No recipes yet</h3>
          <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
            Build your own dishes by combining ingredients. We'll calculate calories, protein, carbs, and fat automatically.
          </p>
          <button onClick={() => setEditor('new')} className="btn-primary inline-flex items-center gap-2">
            <Plus size={18} /> Create your first recipe
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe: any) => (
            <div key={recipe.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">{recipe.name}</h3>
                  {recipe.description && <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{recipe.description}</p>}
                </div>
                <span className="badge bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 shrink-0">
                  {recipe._count?.ingredients ?? recipe.ingredients?.length ?? 0} items
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center mb-4">
                <div><p className="font-bold text-indigo-600">{Math.round(recipe.calories)}</p><p className="text-[10px] text-slate-500">kcal</p></div>
                <div><p className="font-bold text-blue-600">{recipe.protein}g</p><p className="text-[10px] text-slate-500">P</p></div>
                <div><p className="font-bold text-green-600">{recipe.carbs}g</p><p className="text-[10px] text-slate-500">C</p></div>
                <div><p className="font-bold text-amber-600">{recipe.fat}g</p><p className="text-[10px] text-slate-500">F</p></div>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Per serving · {Math.round(recipe.servingSize)}g · {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''} total
              </p>
              <div className="flex gap-2">
                <button onClick={() => setEditor(recipe)} className="btn-secondary flex-1 text-sm py-2 flex items-center justify-center gap-1">
                  <PencilSimple size={16} /> Edit
                </button>
                <button onClick={() => { if (confirm('Delete this recipe?')) deleteRecipe.mutate(recipe.id); }}
                  className="btn-ghost text-red-500 px-3 py-2">
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800">
        <p className="text-sm text-violet-800 dark:text-violet-300">
          <strong>Tip:</strong> Saved recipes appear in{' '}
          <Link to="/food-log" className="underline font-medium">Food Log</Link>
          {' '}when you search — log them by servings just like any other food.
        </p>
      </div>
    </div>
  );
}
