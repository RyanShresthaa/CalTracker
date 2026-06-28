import prisma from '../lib/prisma';
import { fetchUsdaFoodById } from './usdaFoodService';
import { fetchOffProductByBarcode } from './openFoodFactsService';
import { normalizeFoodServing } from './servingUnits';

type ExternalSource = 'usda' | 'off';

interface FoodImportData {
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
  externalSource: ExternalSource;
  externalId: string;
}

export async function findCachedExternalFood(source: ExternalSource, externalId: string) {
  return prisma.food.findFirst({
    where: { externalSource: source, externalId },
  });
}

export async function importExternalFood(source: ExternalSource, externalId: string) {
  const cached = await findCachedExternalFood(source, externalId);
  if (cached) return normalizeFoodServing(cached);

  const external = source === 'usda'
    ? await fetchUsdaFoodById(externalId)
    : await fetchOffProductByBarcode(externalId);

  if (!external) {
    throw new Error('Food not found in external database');
  }

  const data: FoodImportData = {
    name: external.name,
    category: external.category,
    servingSize: external.servingSize,
    servingUnit: external.servingUnit,
    calories: external.calories,
    protein: external.protein,
    carbs: external.carbs,
    fat: external.fat,
    fiber: external.fiber,
    sugar: external.sugar,
    sodium: external.sodium,
    barcode: external.barcode,
    externalSource: source,
    externalId,
  };

  if (data.barcode) {
    const byBarcode = await prisma.food.findUnique({ where: { barcode: data.barcode } });
    if (byBarcode) return normalizeFoodServing(byBarcode);
  }

  return prisma.food.create({ data });
}

export async function resolveExternalSearchResults<T extends { externalSource?: string; externalId?: string }>(
  items: T[],
): Promise<(T | Awaited<ReturnType<typeof findCachedExternalFood>>)[]> {
  const externalItems = items.filter(item => item.externalSource && item.externalId);
  if (!externalItems.length) return items;

  const cached = await prisma.food.findMany({
    where: {
      OR: externalItems.map(item => ({
        externalSource: item.externalSource!,
        externalId: item.externalId!,
      })),
    },
  });
  const cacheByKey = new Map(
    cached.map(food => [`${food.externalSource}:${food.externalId}`, food]),
  );

  return items.map(item => {
    if (!item.externalSource || !item.externalId) return item;
    const hit = cacheByKey.get(`${item.externalSource}:${item.externalId}`);
    if (!hit) return item;
    return normalizeFoodServing({ ...hit, source: item.externalSource, isExternal: false });
  });
}
