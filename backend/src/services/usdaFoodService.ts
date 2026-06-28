import { parseUsdaNutrients, roundNutrients } from './foodNutrients';
import { fetchWithTimeout } from '../utils/fetchWithTimeout';
import { inferUsdaServing } from './servingUnits';

export interface ExternalFoodResult {
  name: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  barcode?: string;
  externalSource: 'usda';
  externalId: string;
  source: 'usda';
  isExternal: true;
}

const BASE = 'https://api.nal.usda.gov/fdc/v1';
const OFF_USER_AGENT = 'CalTracker/1.0 (https://github.com/calorie-tracker)';

function apiKey(): string | null {
  return process.env.USDA_API_KEY || 'DEMO_KEY';
}

function mapUsdaCategory(dataType?: string, category?: unknown): string {
  if (typeof category === 'string' && category.trim()) return category.trim();
  if (category && typeof category === 'object' && 'description' in category) {
    const desc = (category as { description?: string }).description;
    if (typeof desc === 'string' && desc.trim()) return desc.trim();
  }
  if (dataType === 'Branded') return 'Branded';
  if (dataType === 'Foundation') return 'Foundation';
  if (dataType === 'SR Legacy') return 'USDA';
  return 'USDA';
}

function inferServing(food: Record<string, unknown>): { servingSize: number; servingUnit: string } {
  const name = String(food.description ?? '');
  const portions = food.foodPortions as Array<{ gramWeight?: number; modifier?: string; amount?: number }> | undefined;
  return inferUsdaServing(name, portions);
}

function toExternalFood(
  item: Record<string, unknown>,
  nutrients: ReturnType<typeof roundNutrients>,
  serving: { servingSize: number; servingUnit: string },
  barcode?: string,
): ExternalFoodResult {
  const ratio = serving.servingSize / 100;
  return {
    name: String(item.description ?? 'Unknown food'),
    category: mapUsdaCategory(item.dataType as string, item.foodCategory),
    servingSize: serving.servingSize,
    servingUnit: serving.servingUnit,
    calories: Math.round(nutrients.calories * ratio * 10) / 10,
    protein: Math.round(nutrients.protein * ratio * 10) / 10,
    carbs: Math.round(nutrients.carbs * ratio * 10) / 10,
    fat: Math.round(nutrients.fat * ratio * 10) / 10,
    fiber: Math.round(nutrients.fiber * ratio * 10) / 10,
    sugar: Math.round(nutrients.sugar * ratio * 10) / 10,
    sodium: Math.round(nutrients.sodium * ratio * 10) / 10,
    barcode,
    externalSource: 'usda',
    externalId: String(item.fdcId),
    source: 'usda',
    isExternal: true,
  };
}

export async function searchUsdaFoods(query: string, limit = 8): Promise<ExternalFoodResult[]> {
  const key = apiKey();
  if (!key) return [];

  const url = new URL(`${BASE}/foods/search`);
  url.searchParams.set('api_key', key);
  url.searchParams.set('query', query);
  url.searchParams.set('pageSize', String(limit));
  url.searchParams.set('dataType', 'Foundation,SR Legacy,Branded');

  try {
  const res = await fetchWithTimeout(url, { headers: { 'User-Agent': OFF_USER_AGENT } }, 6000);
  if (!res.ok) return [];

  const data = await res.json() as { foods?: Record<string, unknown>[] };
  return (data.foods ?? [])
    .filter(item => item.fdcId && item.description)
    .map(item => {
      const nutrients = roundNutrients(parseUsdaNutrients((item.foodNutrients as Record<string, unknown>[]) ?? []));
      const serving = inferServing(item);
      const barcode = item.gtinUpc ? String(item.gtinUpc) : undefined;
      return toExternalFood(item, nutrients, serving, barcode);
    })
    .filter(item => item.calories > 0 || item.protein > 0 || item.carbs > 0 || item.fat > 0);
  } catch (error) {
    console.warn('USDA search failed:', error);
    return [];
  }
}

export async function fetchUsdaFoodById(fdcId: string): Promise<ExternalFoodResult | null> {
  const key = apiKey();
  if (!key) return null;

  const url = new URL(`${BASE}/food/${fdcId}`);
  url.searchParams.set('api_key', key);

  try {
  const res = await fetchWithTimeout(url, { headers: { 'User-Agent': OFF_USER_AGENT } }, 6000);
  if (!res.ok) return null;

  const item = await res.json() as Record<string, unknown>;
  if (!item.fdcId || !item.description) return null;

  const nutrients = roundNutrients(parseUsdaNutrients((item.foodNutrients as Record<string, unknown>[]) ?? []));
  const serving = inferServing(item);
  const barcode = item.gtinUpc ? String(item.gtinUpc) : undefined;
  return toExternalFood(item, nutrients, serving, barcode);
  } catch (error) {
    console.warn('USDA food fetch failed:', error);
    return null;
  }
}
