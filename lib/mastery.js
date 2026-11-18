import { LEVELS } from './levels';

// Un quiz est « maîtrisé » quand le meilleur score atteint ce ratio.
export const PASS_RATIO = 0.7;

/**
 * Calcule la maîtrise par niveau.
 * Un niveau est acquis quand toutes ses leçons sont terminées et tous ses quiz réussis.
 * Si un test de placement existe, les niveaux inférieurs au niveau obtenu sont comptés comme acquis.
 */
export function computeMastery({ completedLessons, quizResults }, lessons, quizzes, placementCode = null) {
  const startIdx = placementCode ? Math.max(0, LEVELS.findIndex((l) => l.code === placementCode)) : 0;

  const levels = LEVELS.map((lvl, i) => {
    const ls = lessons.filter((l) => l.level === lvl.code);
    const qs = quizzes.filter((q) => q.level === lvl.code);
    const total = ls.length + qs.length;

    const lessonsDone = ls.filter((l) => completedLessons.includes(l.id)).length;
    const quizzesDone = qs.filter((q) => {
      const r = quizResults[q.id];
      return r && r.best / q.questions.length >= PASS_RATIO;
    }).length;

    const skipped = i < startIdx;
    const done = skipped ? total : lessonsDone + quizzesDone;

    return {
      ...lvl,
      total,
      done,
      skipped,
      ratio: total ? done / total : 1,
      mastered: done >= total,
    };
  });

  const idx = levels.findIndex((l) => !l.mastered);
  const isMax = idx === -1;
  const current = isMax ? levels[levels.length - 1] : levels[idx];

  return {
    levels,
    current,
    next: isMax ? null : levels[idx + 1] ?? null,
    isMax,
    progress: current.ratio,
    remaining: current.total - current.done,
  };
}
