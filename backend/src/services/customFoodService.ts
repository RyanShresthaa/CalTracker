import prisma from '../lib/prisma';

export interface ManualFoodInput {
  name: string;
  caloriesPer100?: number;
  proteinPer100?: number;
  carbsPer100?: number;
  fatPer100?: number;
  fiberPer100?: number;
}

export async function upsertManualCustomFood(userId: string, input: ManualFoodInput): Promise<string> {
  const name = input.name.trim();
  const data = {
    category: 'custom',
    servingSize: 100,
    servingUnit: 'g',
    calories: input.caloriesPer100 ?? 0,
    protein: input.proteinPer100 ?? 0,
    carbs: input.carbsPer100 ?? 0,
    fat: input.fatPer100 ?? 0,
    fiber: input.fiberPer100 ?? 0,
    sugar: 0,
    sodium: 0,
  };

  const existing = await prisma.customFood.findFirst({
    where: { userId, name: { equals: name, mode: 'insensitive' } },
  });

  if (existing) {
    await prisma.customFood.update({ where: { id: existing.id }, data });
    return existing.id;
  }

  const created = await prisma.customFood.create({
    data: { userId, name, ...data },
  });
  return created.id;
}

/** Link legacy manual recipe ingredients to custom foods so they appear in food search */
export async function syncManualRecipeIngredients(userId: string) {
  const orphans = await prisma.recipeIngredient.findMany({
    where: {
      recipe: { userId },
      foodId: null,
      customFoodId: null,
    },
  });

  for (const ing of orphans) {
    const ratio = ing.amount > 0 ? 100 / ing.amount : 0;
    const customFoodId = await upsertManualCustomFood(userId, {
      name: ing.name,
      caloriesPer100: ing.calories * ratio,
      proteinPer100: ing.protein * ratio,
      carbsPer100: ing.carbs * ratio,
      fatPer100: ing.fat * ratio,
      fiberPer100: ing.fiber * ratio,
    });
    await prisma.recipeIngredient.update({
      where: { id: ing.id },
      data: { customFoodId },
    });
  }
}

export function mapRecipeToSearchItem(recipe: {
  id: string;
  name: string;
  description?: string | null;
  servings: number;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  _count?: { ingredients: number };
}) {
  return {
    id: recipe.id,
    name: recipe.name,
    description: recipe.description,
    category: 'My Recipe',
    servingSize: recipe.servingSize,
    servingUnit: recipe.servingUnit || 'serving',
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    servings: recipe.servings,
    isRecipe: true,
    source: 'recipe' as const,
    ingredientCount: recipe._count?.ingredients,
  };
}
