// Niveaux CECRL et règles de points (XP)

export const XP_PER_CORRECT = 5;
export const PERFECT_BONUS = 10;
export const DAILY_GOAL = 50;

export const LEVELS = [
  { code: 'A1', name: 'مبتدئ', min: 0, max: 300 },
  { code: 'A2', name: 'أساسي', min: 300, max: 800 },
  { code: 'B1', name: 'متوسط', min: 800, max: 1600 },
  { code: 'B2', name: 'فوق المتوسط', min: 1600, max: 3000 },
  { code: 'C1', name: 'متقدم', min: 3000, max: 5000 },
];

export function getLevelInfo(xp) {
  const idx = LEVELS.findIndex((l) => xp < l.max);
  const isMax = idx === -1;
  const level = isMax ? LEVELS[LEVELS.length - 1] : LEVELS[idx];
  const span = level.max - level.min;
  const xpInto = isMax ? span : xp - level.min;

  return {
    ...level,
    isMax,
    span,
    xpInto,
    progress: Math.min(1, xpInto / span),
    next: isMax ? null : LEVELS[idx + 1] ?? null,
    xpToNext: isMax ? 0 : level.max - xp,
  };
}
