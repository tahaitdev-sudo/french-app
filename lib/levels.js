// Niveaux CECRL et règles de points (XP)
// Le niveau est calculé selon la maîtrise du contenu (voir lib/mastery.js), pas selon les XP.

export const XP_PER_CORRECT = 5;
export const PERFECT_BONUS = 10;
export const DAILY_GOAL = 50;

export const LEVELS = [
  { code: 'A1', name: 'مبتدئ' },
  { code: 'A2', name: 'أساسي' },
  { code: 'B1', name: 'متوسط' },
  { code: 'B2', name: 'فوق المتوسط' },
  { code: 'C1', name: 'متقدم' },
  { code: 'C2', name: 'إتقان' },
];
