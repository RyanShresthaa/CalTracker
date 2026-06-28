export interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export function calcNutritionFromFood(food: { servingSize: number; calories: number; protein: number; carbs: number; fat: number; fiber?: number; sugar?: number; sodium?: number }, amountGrams: number): NutritionTotals {
  const ratio = amountGrams / food.servingSize;
  return {
    calories: round(food.calories * ratio),
    protein: round(food.protein * ratio),
    carbs: round(food.carbs * ratio),
    fat: round(food.fat * ratio),
    fiber: round((food.fiber || 0) * ratio),
    sugar: round((food.sugar || 0) * ratio),
    sodium: round((food.sodium || 0) * ratio),
  };
}

export function calcNutritionFromPer100(
  per100: { calories: number; protein: number; carbs: number; fat: number; fiber?: number; sugar?: number; sodium?: number },
  amountGrams: number,
): NutritionTotals {
  const ratio = amountGrams / 100;
  return {
    calories: round(per100.calories * ratio),
    protein: round(per100.protein * ratio),
    carbs: round(per100.carbs * ratio),
    fat: round(per100.fat * ratio),
    fiber: round((per100.fiber || 0) * ratio),
    sugar: round((per100.sugar || 0) * ratio),
    sodium: round((per100.sodium || 0) * ratio),
  };
}

export function sumNutrition(items: NutritionTotals[]): NutritionTotals {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
      fiber: acc.fiber + item.fiber,
      sugar: acc.sugar + item.sugar,
      sodium: acc.sodium + item.sodium,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 },
  );
}

export function perServing(totals: NutritionTotals, totalWeight: number, servings: number) {
  const safeServings = servings > 0 ? servings : 1;
  return {
    servingSize: round(totalWeight / safeServings),
    calories: round(totals.calories / safeServings),
    protein: round(totals.protein / safeServings),
    carbs: round(totals.carbs / safeServings),
    fat: round(totals.fat / safeServings),
    fiber: round(totals.fiber / safeServings),
    sugar: round(totals.sugar / safeServings),
    sodium: round(totals.sodium / safeServings),
    totalWeight: round(totalWeight),
  };
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}
