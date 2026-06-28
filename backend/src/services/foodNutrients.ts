export interface ParsedNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

function nutrientId(n: Record<string, unknown>): number | undefined {
  const id = n.nutrientId ?? (n.nutrient as { id?: number } | undefined)?.id ?? n.number;
  return typeof id === 'number' ? id : undefined;
}

function nutrientName(n: Record<string, unknown>): string {
  const name = n.nutrientName ?? (n.nutrient as { name?: string } | undefined)?.name ?? n.name;
  return typeof name === 'string' ? name.toLowerCase() : '';
}

function nutrientUnit(n: Record<string, unknown>): string {
  const unit = n.unitName ?? (n.nutrient as { unitName?: string } | undefined)?.unitName;
  return typeof unit === 'string' ? unit : '';
}

function nutrientAmount(n: Record<string, unknown>): number {
  const value = n.value ?? n.amount;
  return typeof value === 'number' ? value : 0;
}

function findNutrient(nutrients: Record<string, unknown>[], ids: number[], nameIncludes: string[]): number {
  for (const n of nutrients) {
    const id = nutrientId(n);
    const name = nutrientName(n);
    if ((id !== undefined && ids.includes(id)) || nameIncludes.some(part => name.includes(part))) {
      return nutrientAmount(n);
    }
  }
  return 0;
}

function parseEnergy(nutrients: Record<string, unknown>[]): number {
  const entries = nutrients.filter(n => {
    const id = nutrientId(n);
    const name = nutrientName(n);
    return id === 1008 || id === 208 || name.includes('energy');
  });

  const kcal = entries.find(n => nutrientUnit(n) === 'kcal');
  if (kcal) return nutrientAmount(kcal);

  const kj = entries.find(n => nutrientUnit(n) === 'kJ');
  if (kj) return Math.round(nutrientAmount(kj) / 4.184);

  return entries.length ? nutrientAmount(entries[0]) : 0;
}

export function parseUsdaNutrients(nutrients: Record<string, unknown>[]): ParsedNutrients {
  return {
    calories: parseEnergy(nutrients),
    protein: findNutrient(nutrients, [1003, 203], ['protein']),
    carbs: findNutrient(nutrients, [1005, 205], ['carbohydrate']),
    fat: findNutrient(nutrients, [1004, 204], ['total lipid', 'fat, total']),
    fiber: findNutrient(nutrients, [1079, 291], ['fiber']),
    sugar: findNutrient(nutrients, [2000, 269], ['sugar']),
    sodium: findNutrient(nutrients, [1093, 307], ['sodium']),
  };
}

export function parseOffNutrients(nutriments: Record<string, number | undefined>): ParsedNutrients {
  const sodiumG = nutriments['sodium_100g'] ?? nutriments['sodium'] ?? 0;
  return {
    calories: nutriments['energy-kcal_100g'] ?? nutriments['energy-kcal'] ?? 0,
    protein: nutriments.proteins_100g ?? nutriments.proteins ?? 0,
    carbs: nutriments.carbohydrates_100g ?? nutriments.carbohydrates ?? 0,
    fat: nutriments.fat_100g ?? nutriments.fat ?? 0,
    fiber: nutriments.fiber_100g ?? nutriments.fiber ?? 0,
    sugar: nutriments.sugars_100g ?? nutriments.sugars ?? 0,
    sodium: sodiumG * 1000,
  };
}

export function roundNutrients(n: ParsedNutrients): ParsedNutrients {
  return {
    calories: Math.round(n.calories * 10) / 10,
    protein: Math.round(n.protein * 10) / 10,
    carbs: Math.round(n.carbs * 10) / 10,
    fat: Math.round(n.fat * 10) / 10,
    fiber: Math.round(n.fiber * 10) / 10,
    sugar: Math.round(n.sugar * 10) / 10,
    sodium: Math.round(n.sodium * 10) / 10,
  };
}
