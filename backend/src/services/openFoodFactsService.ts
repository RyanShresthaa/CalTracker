import { parseOffNutrients, roundNutrients } from './foodNutrients';
import { fetchWithTimeout } from '../utils/fetchWithTimeout';
import { inferOffServing } from './servingUnits';

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
  externalSource: 'off';
  externalId: string;
  source: 'off';
  isExternal: true;
}

const BASE = 'https://world.openfoodfacts.org';
const OFF_USER_AGENT = 'CalTracker/1.0 (https://github.com/calorie-tracker)';

function offCategory(product: Record<string, unknown>): string {
  const tags = product.categories_tags as string[] | undefined;
  if (tags?.length) {
    const tag = tags[0].replace(/^en:/, '').replace(/-/g, ' ');
    return tag.charAt(0).toUpperCase() + tag.slice(1);
  }
  const categories = product.categories as string | undefined;
  if (categories) return categories.split(',')[0].trim();
  return 'Packaged';
}

function parseServingSize(product: Record<string, unknown>, name: string): { servingSize: number; servingUnit: string } {
  return inferOffServing(name, product);
}

function toExternalFood(product: Record<string, unknown>, barcode: string): ExternalFoodResult | null {
  const name = String(product.product_name ?? product.generic_name ?? '').trim();
  if (!name) return null;

  const nutriments = (product.nutriments ?? {}) as Record<string, number | undefined>;
  const per100 = roundNutrients(parseOffNutrients(nutriments));
  const serving = parseServingSize(product, name);
  const ratio = serving.servingUnit === 'g' ? serving.servingSize / 100 : 1;

  const scaled = serving.servingUnit === 'g'
    ? {
        calories: per100.calories * ratio,
        protein: per100.protein * ratio,
        carbs: per100.carbs * ratio,
        fat: per100.fat * ratio,
        fiber: per100.fiber * ratio,
        sugar: per100.sugar * ratio,
        sodium: per100.sodium * ratio,
      }
    : {
        calories: nutriments['energy-kcal_serving'] ?? nutriments['energy-kcal'] ?? per100.calories,
        protein: nutriments.proteins_serving ?? nutriments.proteins ?? per100.protein,
        carbs: nutriments.carbohydrates_serving ?? nutriments.carbohydrates ?? per100.carbs,
        fat: nutriments.fat_serving ?? nutriments.fat ?? per100.fat,
        fiber: nutriments.fiber_serving ?? nutriments.fiber ?? per100.fiber,
        sugar: nutriments.sugars_serving ?? nutriments.sugars ?? per100.sugar,
        sodium: (nutriments.sodium_serving ?? nutriments.sodium ?? per100.sodium / 1000) * 1000,
      };

  if (scaled.calories <= 0 && scaled.protein <= 0 && scaled.carbs <= 0 && scaled.fat <= 0) {
    return null;
  }

  return {
    name,
    category: offCategory(product),
    servingSize: serving.servingSize,
    servingUnit: serving.servingUnit,
    calories: Math.round(scaled.calories * 10) / 10,
    protein: Math.round(scaled.protein * 10) / 10,
    carbs: Math.round(scaled.carbs * 10) / 10,
    fat: Math.round(scaled.fat * 10) / 10,
    fiber: Math.round(scaled.fiber * 10) / 10,
    sugar: Math.round(scaled.sugar * 10) / 10,
    sodium: Math.round(scaled.sodium * 10) / 10,
    barcode,
    externalSource: 'off',
    externalId: barcode,
    source: 'off',
    isExternal: true,
  };
}

export async function searchOffFoods(query: string, limit = 8): Promise<ExternalFoodResult[]> {
  const url = new URL(`${BASE}/cgi/search.pl`);
  url.searchParams.set('search_terms', query);
  url.searchParams.set('search_simple', '1');
  url.searchParams.set('action', 'process');
  url.searchParams.set('json', '1');
  url.searchParams.set('page_size', String(limit));
  url.searchParams.set('fields', 'code,product_name,generic_name,categories,categories_tags,nutriments,serving_size,product_quantity,product_quantity_unit');

  try {
    const res = await fetchWithTimeout(url, { headers: { 'User-Agent': OFF_USER_AGENT } }, 3500);
    if (!res.ok) return [];

    const data = await res.json() as { products?: Record<string, unknown>[] };
    return (data.products ?? [])
      .map(product => toExternalFood(product, String(product.code ?? '')))
      .filter((item): item is ExternalFoodResult => Boolean(item));
  } catch (error) {
    console.warn('Open Food Facts search failed:', error);
    return [];
  }
}

export async function fetchOffProductByBarcode(barcode: string): Promise<ExternalFoodResult | null> {
  try {
  const res = await fetchWithTimeout(`${BASE}/api/v2/product/${encodeURIComponent(barcode)}`, {
    headers: { 'User-Agent': OFF_USER_AGENT },
  }, 5000);
  if (!res.ok) return null;

  const data = await res.json() as { product?: Record<string, unknown>; status?: number };
  if (!data.product || data.status === 0) return null;
  return toExternalFood(data.product, barcode);
  } catch (error) {
    console.warn('Open Food Facts barcode lookup failed:', error);
    return null;
  }
}
