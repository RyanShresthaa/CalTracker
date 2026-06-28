export type ServingInfo = { servingSize: number; servingUnit: string };

/** Typical weight of one item (grams) for foods usually eaten whole / by piece */
const PIECE_BY_NAME: Array<{ pattern: RegExp; unit: string; grams: number }> = [
  { pattern: /\bbanana\b/i, unit: 'piece', grams: 118 },
  { pattern: /\bapple\b/i, unit: 'piece', grams: 182 },
  { pattern: /\borange\b/i, unit: 'piece', grams: 131 },
  { pattern: /\bpear\b/i, unit: 'piece', grams: 178 },
  { pattern: /\bmango\b/i, unit: 'piece', grams: 200 },
  { pattern: /\bpeach\b/i, unit: 'piece', grams: 150 },
  { pattern: /\bplum\b/i, unit: 'piece', grams: 66 },
  { pattern: /\bkiwi\b/i, unit: 'piece', grams: 75 },
  { pattern: /\bgrapefruit\b/i, unit: 'piece', grams: 230 },
  { pattern: /\bavocado\b/i, unit: 'piece', grams: 150 },
  { pattern: /\btomato\b/i, unit: 'piece', grams: 123 },
  { pattern: /\bpotato\b/i, unit: 'piece', grams: 173 },
  { pattern: /\bsweet potato\b/i, unit: 'piece', grams: 130 },
  { pattern: /\begg\b/i, unit: 'egg', grams: 50 },
  { pattern: /\bbiscuit/i, unit: 'piece', grams: 30 },
  { pattern: /\bcookie\b|cookies\b/i, unit: 'piece', grams: 30 },
  { pattern: /\bcracker/i, unit: 'piece', grams: 5 },
  { pattern: /\bwafer/i, unit: 'piece', grams: 8 },
  { pattern: /\bdonut|doughnut/i, unit: 'piece', grams: 60 },
  { pattern: /\bmuffin/i, unit: 'piece', grams: 57 },
  { pattern: /\bcupcake/i, unit: 'piece', grams: 50 },
  { pattern: /\bbrownie/i, unit: 'piece', grams: 40 },
  { pattern: /\b(chocolate|candy|protein|granola|energy|snack)\s*bar\b|\bbar\b.*\b(chocolate|protein|granola)\b/i, unit: 'piece', grams: 40 },
  { pattern: /\btortilla\b/i, unit: 'piece', grams: 45 },
  { pattern: /\bpancake/i, unit: 'piece', grams: 38 },
  { pattern: /\bwaffle/i, unit: 'piece', grams: 75 },
  { pattern: /\bbread.*slice|slice.*bread|\btoast\b/i, unit: 'slice', grams: 30 },
  { pattern: /\bsamosa\b/i, unit: 'piece', grams: 50 },
  { pattern: /\bmomo\b|\bdumpling/i, unit: 'piece', grams: 35 },
  { pattern: /\bspring roll/i, unit: 'piece', grams: 40 },
  { pattern: /\bnaan\b|\broti\b|\bchapati\b/i, unit: 'piece', grams: 60 },
];

const COUNTABLE_UNITS = new Set(['piece', 'egg', 'slice', 'serving', 'biscuit', 'wafer', 'cookie']);

const UNIT_ALIASES: Record<string, string> = {
  pieces: 'piece',
  pcs: 'piece',
  pc: 'piece',
  biscuits: 'piece',
  biscuit: 'piece',
  cookies: 'piece',
  cookie: 'piece',
  wafers: 'piece',
  wafer: 'piece',
  crackers: 'piece',
  cracker: 'piece',
  eggs: 'egg',
  slices: 'slice',
  bars: 'piece',
  bar: 'piece',
  serving: 'piece',
  servings: 'piece',
};

export function normalizeUnit(unit: string): string {
  const u = unit.toLowerCase().trim();
  return UNIT_ALIASES[u] ?? u;
}

export function isCountableUnit(unit?: string | null): boolean {
  if (!unit) return false;
  const u = normalizeUnit(unit);
  return COUNTABLE_UNITS.has(u) || u === 'egg' || u === 'slice';
}

export function inferPieceServingFromName(name: string): ServingInfo | null {
  for (const rule of PIECE_BY_NAME) {
    if (rule.pattern.test(name)) {
      return { servingSize: rule.grams, servingUnit: rule.unit };
    }
  }
  return null;
}

/** Parse text like "1 biscuit (15 g)" or "2 pieces (30g)" */
export function parsePieceFromServingText(text: string): ServingInfo | null {
  const normalized = text.trim();
  const gramMatch = normalized.match(/([\d.]+)\s*g\b/i);
  if (!gramMatch) return null;

  const grams = parseFloat(gramMatch[1]);
  if (Number.isNaN(grams) || grams <= 0) return null;

  const countMatch = normalized.match(/^([\d.]+)\s*(piece|pieces|biscuit|biscuits|cookie|cookies|wafer|wafers|cracker|crackers|slice|slices|bar|bars|egg|eggs|serving|servings)\b/i);
  if (countMatch) {
    const count = parseFloat(countMatch[1]);
    const unit = normalizeUnit(countMatch[2]);
    if (count > 0) {
      return { servingSize: Math.round((grams / count) * 10) / 10, servingUnit: unit };
    }
  }

  if (/\b(1\s+)?(piece|biscuit|cookie|wafer|cracker|slice|bar|serving)\b/i.test(normalized)) {
    const unitMatch = normalized.match(/\b(piece|biscuit|cookie|wafer|cracker|slice|bar|serving)\b/i);
    return {
      servingSize: grams,
      servingUnit: unitMatch ? normalizeUnit(unitMatch[1]) : 'piece',
    };
  }

  return null;
}

export function inferUsdaServing(
  name: string,
  portions?: Array<{ gramWeight?: number; modifier?: string; amount?: number }>,
): ServingInfo {
  const fromName = inferPieceServingFromName(name);

  if (portions?.length) {
    const portion = portions.find(p => p.gramWeight && p.gramWeight > 0);
    if (portion?.gramWeight) {
      const modifier = (portion.modifier ?? '').toLowerCase();
      const amount = portion.amount && portion.amount > 0 ? portion.amount : 1;
      const gramsPerItem = portion.gramWeight / amount;

      if (modifier.includes('egg') || (fromName?.servingUnit === 'egg')) {
        return { servingSize: gramsPerItem, servingUnit: 'egg' };
      }
      if (
        modifier.includes('piece') || modifier.includes('medium') || modifier.includes('large')
        || modifier.includes('small') || modifier.includes('whole')
        || fromName
      ) {
        return {
          servingSize: Math.round(gramsPerItem * 10) / 10,
          servingUnit: fromName?.servingUnit ?? 'piece',
        };
      }
      if (modifier.includes('slice') || fromName?.servingUnit === 'slice') {
        return { servingSize: gramsPerItem, servingUnit: 'slice' };
      }
      return { servingSize: gramsPerItem, servingUnit: 'piece' };
    }
  }

  if (fromName) return fromName;
  return { servingSize: 100, servingUnit: 'g' };
}

export function inferOffServing(
  name: string,
  product: Record<string, unknown>,
): ServingInfo {
  const servingText = String(product.serving_size ?? '');
  if (servingText) {
    const fromText = parsePieceFromServingText(servingText);
    if (fromText) return fromText;
  }

  const fromName = inferPieceServingFromName(name);
  if (fromName) return fromName;

  const quantity = product.product_quantity as string | number | undefined;
  const unit = String(product.product_quantity_unit ?? 'g').toLowerCase();
  if (quantity) {
    const size = typeof quantity === 'number' ? quantity : parseFloat(quantity);
    if (!Number.isNaN(size) && size > 0) {
      if (unit === 'ml') return { servingSize: size, servingUnit: 'ml' };
      if (size <= 250 && fromName) return fromName;
      return { servingSize: size, servingUnit: 'g' };
    }
  }

  if (servingText) {
    const match = servingText.match(/([\d.]+)\s*(g|ml|oz)?/i);
    if (match) {
      const size = parseFloat(match[1]);
      const u = (match[2] ?? 'g').toLowerCase();
      if (!Number.isNaN(size) && size > 0) {
        return { servingSize: size, servingUnit: u === 'ml' ? 'ml' : 'g' };
      }
    }
  }

  return { servingSize: 100, servingUnit: 'g' };
}

/** Re-scale per-100g nutrients to a piece/count serving if currently stored as bulk grams */
export function normalizeFoodServing<T extends {
  name: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}>(food: T): T {
  if (isCountableUnit(food.servingUnit)) return food;

  const inferred = inferPieceServingFromName(food.name);
  // Only convert standard per-100g entries; skip foods already stored with custom gram servings
  if (!inferred || food.servingUnit !== 'g' || food.servingSize !== 100) return food;

  const ratio = inferred.servingSize / 100;
  const scale = (v: number) => Math.round(v * ratio * 10) / 10;

  return {
    ...food,
    servingSize: inferred.servingSize,
    servingUnit: inferred.servingUnit,
    calories: scale(food.calories),
    protein: scale(food.protein),
    carbs: scale(food.carbs),
    fat: scale(food.fat),
    fiber: food.fiber != null ? scale(food.fiber) : food.fiber,
    sugar: food.sugar != null ? scale(food.sugar) : food.sugar,
    sodium: food.sodium != null ? scale(food.sodium) : food.sodium,
  };
}
