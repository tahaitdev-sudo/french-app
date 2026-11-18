// Répétition espacée (système de Leitner simplifié) pour les cartes de vocabulaire.
// Les cartes sont générées automatiquement à partir du vocabulaire de chaque leçon.

import { LESSONS } from '@/lib/data';

export const SRS_KEY = 'fr-srs-v1';
export const NEW_PER_DAY = 10;
// Intervalle (en jours) avant la prochaine révision, selon la boîte
export const INTERVALS = [0, 1, 3, 7, 14, 30, 60];
export const MAX_BOX = INTERVALS.length - 1;

export const dateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const addDays = (days, from = new Date()) => {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return dateKey(d);
};

// Toutes les cartes disponibles, dans l'ordre des leçons (A1 → C2)
export const ALL_CARDS = LESSONS.flatMap((lesson) =>
  (lesson.vocab || [])
    .map((v, i) => ({
      id: `${lesson.id}:${i}`,
      fr: v.fr,
      ar: v.ar,
      level: lesson.level,
      lessonId: lesson.id,
      lessonTitle: lesson.titleAr,
    }))
    .filter((c) => c.fr && c.ar),
);

export const CARD_BY_ID = Object.fromEntries(ALL_CARDS.map((c) => [c.id, c]));

export const initialSrs = { cards: {}, newToday: { date: null, count: 0 } };

export function loadSrs() {
  try {
    const raw = localStorage.getItem(SRS_KEY);
    if (!raw) return initialSrs;
    const parsed = JSON.parse(raw);
    return { ...initialSrs, ...parsed, cards: parsed.cards || {} };
  } catch {
    return initialSrs;
  }
}

export function saveSrs(state) {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(state));
  } catch {
    /* stockage indisponible */
  }
}

// Statistiques pour l'affichage
export function srsStats(state, levels, today = dateKey()) {
  const pool = ALL_CARDS.filter((c) => levels.includes(c.level));
  let due = 0;
  let learned = 0;
  let newCount = 0;
  for (const c of pool) {
    const s = state.cards[c.id];
    if (!s) newCount++;
    else {
      if (s.due <= today) due++;
      if (s.box >= 4) learned++;
    }
  }
  const newUsed = state.newToday.date === today ? state.newToday.count : 0;
  return {
    total: pool.length,
    due,
    learned,
    newAvailable: Math.min(newCount, Math.max(0, NEW_PER_DAY - newUsed)),
    newTotal: newCount,
  };
}

// File d'une session : cartes à réviser, puis nouvelles cartes (dans la limite du jour)
export function buildQueue(state, levels, today = dateKey()) {
  const pool = ALL_CARDS.filter((c) => levels.includes(c.level));
  const due = pool.filter((c) => state.cards[c.id] && state.cards[c.id].due <= today);
  const newUsed = state.newToday.date === today ? state.newToday.count : 0;
  const newCards = pool
    .filter((c) => !state.cards[c.id])
    .slice(0, Math.max(0, NEW_PER_DAY - newUsed));
  return { due, newCards };
}

// Applique une réponse à une carte. failedBefore : la carte a déjà été ratée dans cette session.
export function grade(state, cardId, correct, failedBefore, today = dateKey()) {
  const prev = state.cards[cardId];
  const isNew = !prev;
  let box;
  if (!correct) box = 0;
  else if (failedBefore) box = 1; // ratée puis retrouvée : on repart de la boîte 1
  else box = Math.min(MAX_BOX, (prev ? prev.box : 0) + 1);

  const card = { box, due: correct ? addDays(INTERVALS[box]) : today, seen: (prev?.seen || 0) + 1 };
  const newToday =
    isNew && state.newToday.date !== today
      ? { date: today, count: 1 }
      : isNew
        ? { date: today, count: state.newToday.count + 1 }
        : state.newToday;

  return { ...state, cards: { ...state.cards, [cardId]: card }, newToday };
}
