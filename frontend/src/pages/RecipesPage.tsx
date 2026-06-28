import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Trash, Pencil, X, Search, BookOpen, Check,
} from 'lucide-react';
import {
  useRecipes, useCreateRecipe, useUpdateRecipe, useDeleteRecipe, useFoodSearch,
} from '../lib/hooks';
import { foodsAPI } from '../lib/api';
import PageHeader from '../components/ui/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../components/ui/dialog';
import { toast } from 'sonner';

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
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="page-title !text-base">
            {recipe ? 'Edit Recipe' : 'New Recipe'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <Label>Recipe name</Label>
              <Input value={name} onChange={e => setName(e.target.value)} className="mt-1.5" placeholder="e.g. Momo, Dal Bhat, Protein Oats" />
            </div>
            <div className="sm:col-span-2">
              <Label>Description (optional)</Label>
              <Input value={description} onChange={e => setDescription(e.target.value)} className="mt-1.5" placeholder="Notes or cooking tips" />
            </div>
            <div>
              <Label>Servings</Label>
              <Input type="number" min={1} step={1} value={servings} onChange={e => setServings(Number(e.target.value))} className="mt-1.5" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center border border-border p-3">
            <div><p className="text-lg text-accent">{perServing.calories}</p><p className="label-caps mt-1">kcal / serving</p></div>
            <div><p className="text-lg text-foreground">{perServing.protein}g</p><p className="label-caps mt-1">Protein</p></div>
            <div><p className="text-lg text-foreground">{perServing.carbs}g</p><p className="label-caps mt-1">Carbs</p></div>
            <div><p className="text-lg text-foreground">{perServing.fat}g</p><p className="label-caps mt-1">Fat</p></div>
          </div>
          <p className="text-xs text-muted text-center font-mono">
            Total batch: {Math.round(totals.calories)} kcal · {Math.round(totals.weight)}g · {ingredients.length} ingredients
          </p>

          <div>
            <Label>Add ingredients</Label>
            <div className="relative mb-2 mt-1.5">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted" />
              <Input value={query} onChange={e => setQuery(e.target.value)} className="pl-10" placeholder="Search foods (USDA, Open Food Facts, your foods…)" />
            </div>
            {searching && <p className="text-xs text-muted mb-2">Searching…</p>}
            {debouncedQuery && searchResults.length > 0 && (
              <div className="border border-border mb-2 max-h-40 overflow-y-auto">
                {searchResults.filter((f: any) => !f.isRecipe).slice(0, 8).map((food: any) => (
                  <button
                    key={food.id ?? `${food.externalSource}-${food.externalId}`}
                    type="button"
                    onClick={() => addFromSearch(food)}
                    className="w-full text-left px-4 py-3 text-sm row-hover border-b border-border last:border-0 transition-colors"
                  >
                    <span className="font-medium text-foreground">{food.name}</span>
                    <span className="text-xs text-muted ml-2 font-mono">
                      {Math.round(food.calories)} kcal / {food.servingSize}{food.servingUnit || 'g'}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <button type="button" onClick={() => setShowManual(v => !v)} className="text-sm link-accent">
              {showManual ? 'Hide manual entry' : "+ Can't find it? Add ingredient manually"}
            </button>
            {showManual && (
              <div className="mt-2 callout space-y-3">
                <p className="text-xs text-muted leading-relaxed">
                  Can't find it in search? Enter the ingredient yourself. Nutrition values should be{' '}
                  <span className="font-medium text-foreground">per 100g</span>{' '}
                  (from the package label or a nutrition site).
                </p>

                <div>
                  <Label>Ingredient name</Label>
                  <Input
                    value={manual.name}
                    onChange={e => setManual({ ...manual, name: e.target.value })}
                    className="text-sm mt-1.5"
                    placeholder="e.g. Rice flour, olive oil, chicken breast"
                  />
                </div>

                <div>
                  <Label>Amount in this recipe (grams)</Label>
                  <Input
                    type="number"
                    min={1}
                    value={manual.amount}
                    onChange={e => setManual({ ...manual, amount: Number(e.target.value) })}
                    className="text-sm mt-1.5"
                    placeholder="150"
                  />
                  <p className="text-[11px] text-muted mt-1">
                    How many grams of this ingredient you use for the whole batch
                  </p>
                </div>

                <div>
                  <p className="label mb-2">Nutrition per 100g</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Calories (kcal)</Label>
                      <Input
                        type="number"
                        min={0}
                        value={manual.caloriesPer100}
                        onChange={e => setManual({ ...manual, caloriesPer100: Number(e.target.value) })}
                        className="text-sm mt-1.5"
                        placeholder="364"
                      />
                    </div>
                    <div>
                      <Label>Protein (g)</Label>
                      <Input
                        type="number"
                        min={0}
                        step={0.1}
                        value={manual.proteinPer100}
                        onChange={e => setManual({ ...manual, proteinPer100: Number(e.target.value) })}
                        className="text-sm mt-1.5"
                        placeholder="6"
                      />
                    </div>
                    <div>
                      <Label>Carbs (g)</Label>
                      <Input
                        type="number"
                        min={0}
                        step={0.1}
                        value={manual.carbsPer100}
                        onChange={e => setManual({ ...manual, carbsPer100: Number(e.target.value) })}
                        className="text-sm mt-1.5"
                        placeholder="76"
                      />
                    </div>
                    <div>
                      <Label>Fat (g)</Label>
                      <Input
                        type="number"
                        min={0}
                        step={0.1}
                        value={manual.fatPer100}
                        onChange={e => setManual({ ...manual, fatPer100: Number(e.target.value) })}
                        className="text-sm mt-1.5"
                        placeholder="1"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-muted mt-1.5">
                    Example: white rice is ~130 kcal, 2.7g protein, 28g carbs, 0.3g fat per 100g cooked
                  </p>
                </div>

                <Button type="button" onClick={addManual} variant="outline" size="sm" className="w-full">Add ingredient</Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="card-section-title !mb-0 !pb-0 !border-0">Ingredients</h4>
            {ingredients.length === 0 ? (
              <p className="text-sm text-muted text-center py-6">Search and add foods to build your recipe</p>
            ) : ingredients.map(ing => {
              const n = ingredientNutrition(ing);
              return (
                <div key={ing.key} className="list-row gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{ing.name}</p>
                    <p className="text-xs text-muted font-mono">{n.calories} kcal · P:{n.protein}g C:{n.carbs}g F:{n.fat}g</p>
                  </div>
                  <Input type="number" min={1} value={ing.amount} onChange={e => setIngredients(prev => prev.map(x => x.key === ing.key ? { ...x, amount: Number(e.target.value) } : x))}
                    className="w-20 text-center text-sm h-8" />
                  <span className="text-xs text-muted">g</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setIngredients(prev => prev.filter(x => x.key !== ing.key))} className="h-8 w-8 text-muted hover:text-destructive">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-border flex gap-3">
          <Button type="button" onClick={onClose} variant="outline" className="flex-1">Cancel</Button>
          <Button type="button" onClick={save} disabled={saving} className="flex-1">
            {saving ? 'Saving…' : recipe ? 'Update Recipe' : 'Save Recipe'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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

      <PageHeader
        title="My Recipes"
        subtitle="Create recipes — calories are calculated from ingredients"
        action={(
          <Button type="button" onClick={() => setEditor('new')}>
            <Plus className="h-[18px] w-[18px]" /> New Recipe
          </Button>
        )}
      />

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-36" />)}
        </div>
      ) : recipes.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48} className="mx-auto text-muted mb-4 opacity-40" />
          <h3 className="page-title !text-base mb-2">No recipes yet</h3>
          <p className="text-sm text-muted mb-4 max-w-md mx-auto">
            Build your own dishes by combining ingredients. We'll calculate calories, protein, carbs, and fat automatically.
          </p>
          <Button type="button" onClick={() => setEditor('new')}>
            <Plus className="h-[18px] w-[18px]" /> Create your first recipe
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe: any) => (
            <Card key={recipe.id} className="card-hover">
              <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <h3 className="font-medium text-foreground truncate">{recipe.name}</h3>
                  {recipe.description && <p className="text-xs text-muted mt-0.5 line-clamp-2">{recipe.description}</p>}
                </div>
                <Badge variant="default" className="shrink-0">
                  {recipe._count?.ingredients ?? recipe.ingredients?.length ?? 0} items
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center mb-4 border border-border p-2">
                <div><p className="text-sm text-accent">{Math.round(recipe.calories)}</p><p className="label-caps mt-0.5">kcal</p></div>
                <div><p className="text-sm text-foreground">{recipe.protein}g</p><p className="label-caps mt-0.5">P</p></div>
                <div><p className="text-sm text-foreground">{recipe.carbs}g</p><p className="label-caps mt-0.5">C</p></div>
                <div><p className="text-sm text-muted-foreground">{recipe.fat}g</p><p className="label-caps mt-0.5">F</p></div>
              </div>
              <p className="text-xs text-muted mb-3 font-mono">
                Per serving · {Math.round(recipe.servingSize)}g · {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''} total
              </p>
              <div className="flex gap-2">
                <Button type="button" onClick={() => setEditor(recipe)} variant="outline" size="sm" className="flex-1">
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={() => { if (confirm('Delete this recipe?')) deleteRecipe.mutate(recipe.id); }}
                  className="text-muted hover:text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="callout">
        <p className="text-sm text-foreground">
          <strong>Tip:</strong> Saved recipes appear in{' '}
          <Link to="/food-log" className="link-accent">Food Log</Link>
          {' '}when you search — log them by servings just like any other food.
        </p>
      </div>
    </div>
  );
}
