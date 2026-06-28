export type FoodLike = {
  servingSize: number;
  servingUnit?: string;
};

const WEIGHT_VOLUME_UNITS = new Set(['g', 'ml', 'oz']);

export function isCountableFood(food: FoodLike): boolean {
  const unit = food.servingUnit || 'g';
  return !WEIGHT_VOLUME_UNITS.has(unit);
}

export function pluralizeUnit(unit: string, count: number): string {
  if (count === 1) return unit;
  if (unit === 'egg') return 'eggs';
  if (unit === 'piece') return 'pieces';
  if (unit === 'slice') return 'slices';
  if (unit === 'serving') return 'servings';
  if (unit === 'wafer') return 'wafers';
  if (unit === 'biscuit') return 'biscuits';
  if (unit === 'cookie') return 'cookies';
  if (unit.endsWith('s')) return unit;
  return `${unit}s`;
}

export function quantityLabel(unit: string): string {
  const u = unit || 'g';
  if (u === 'piece') return 'Pieces';
  if (u === 'egg') return 'Quantity (eggs)';
  if (u === 'slice') return 'Slices';
  return `Quantity (${pluralizeUnit(u, 2)})`;
}

export function countToGrams(count: number, servingSize: number): number {
  return Math.round(count * servingSize * 10) / 10;
}

export function gramsToCount(grams: number, servingSize: number): number {
  if (!servingSize) return 0;
  return Math.round((grams / servingSize) * 100) / 100;
}

export function formatServingLabel(food: FoodLike): string {
  const unit = food.servingUnit || 'g';
  if (isCountableFood(food)) {
    return `Per 1 ${unit} (${food.servingSize}g)`;
  }
  return `Per ${food.servingSize}${unit}`;
}

export function formatLoggedAmount(amount: number, food?: FoodLike | null): string {
  if (!food) return `${Math.round(amount)}g`;

  const unit = food.servingUnit || 'g';
  if (isCountableFood(food)) {
    const count = gramsToCount(amount, food.servingSize);
    const countLabel = count === Math.floor(count) ? String(count) : count.toFixed(1);
    return `${countLabel} ${pluralizeUnit(unit, count)} (${Math.round(amount)}g)`;
  }
  if (unit === 'ml') return `${Math.round(amount)}ml`;
  return `${Math.round(amount)}g`;
}
