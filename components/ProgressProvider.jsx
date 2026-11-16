'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DAILY_GOAL,
  PERFECT_BONUS,
  XP_PER_CORRECT,
  getLevelInfo,
} from '@/lib/levels';

const STORAGE_KEY = 'fr-learn-progress-v1';

const initialState = {
  xp: 0,
  streak: 0,
  bestStreak: 0,
  lastActiveDate: null,
  dailyXp: {},
  completedLessons: [],
  quizResults: {},
  mistakes: {}, // { [questionId]: quizId } — questions à réviser
};

/* ---------- helpers (fonctions pures) ---------- */

const dateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dateKey(d);
};

// Ajoute des XP et met à jour la série de jours consécutifs.
function applyXp(state, amount) {
  const today = dateKey();
  let streak = state.streak;

  if (state.lastActiveDate !== today) {
    streak = state.lastActiveDate === yesterdayKey() ? state.streak + 1 : 1;
  }

  const dailyXp = { ...state.dailyXp, [today]: (state.dailyXp[today] || 0) + amount };
  const recentKeys = Object.keys(dailyXp).sort().slice(-14);
  const trimmed = Object.fromEntries(recentKeys.map((k) => [k, dailyXp[k]]));

  return {
    ...state,
    xp: state.xp + amount,
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
    lastActiveDate: today,
    dailyXp: trimmed,
  };
}

/* ---------- contexte ---------- */

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);

  // Chargement depuis localStorage (côté client uniquement)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...JSON.parse(raw) });
    } catch {
      /* données corrompues : on repart de zéro */
    }
    setReady(true);
  }, []);

  // Sauvegarde à chaque changement
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* stockage plein ou désactivé */
    }
  }, [state, ready]);

  const addXp = useCallback((amount) => {
    setState((prev) => applyXp(prev, amount));
  }, []);

  const completeLesson = useCallback((lessonId, xp) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return applyXp(
        { ...prev, completedLessons: [...prev.completedLessons, lessonId] },
        xp,
      );
    });
  }, []);

  // Retourne les XP gagnés pour pouvoir les afficher dans l'écran de résultat.
  const recordQuiz = useCallback((quizId, score, total) => {
    const earned = score * XP_PER_CORRECT + (score === total ? PERFECT_BONUS : 0);

    setState((prev) => {
      const old = prev.quizResults[quizId] || { best: 0, attempts: 0 };
      const next = {
        ...prev,
        quizResults: {
          ...prev.quizResults,
          [quizId]: {
            best: Math.max(old.best, score),
            last: score,
            total,
            attempts: old.attempts + 1,
          },
        },
      };
      return applyXp(next, earned);
    });

    return earned;
  }, []);

  const recordMistake = useCallback((questionId, quizId) => {
    setState((prev) =>
      prev.mistakes[questionId] === quizId
        ? prev
        : { ...prev, mistakes: { ...prev.mistakes, [questionId]: quizId } },
    );
  }, []);

  const resolveMistake = useCallback((questionId) => {
    setState((prev) => {
      if (!(questionId in prev.mistakes)) return prev;
      const rest = { ...prev.mistakes };
      delete rest[questionId];
      return { ...prev, mistakes: rest };
    });
  }, []);

  const resetProgress = useCallback(() => setState(initialState), []);

  const value = useMemo(() => {
    const today = dateKey();
    const streakAlive =
      state.lastActiveDate === today || state.lastActiveDate === yesterdayKey();

    return {
      ...state,
      ready,
      level: getLevelInfo(state.xp),
      currentStreak: streakAlive ? state.streak : 0,
      todayXp: state.dailyXp[today] || 0,
      dailyGoal: DAILY_GOAL,
      mistakesCount: Object.keys(state.mistakes).length,
      addXp,
      completeLesson,
      recordQuiz,
      recordMistake,
      resolveMistake,
      resetProgress,
    };
  }, [
    state,
    ready,
    addXp,
    completeLesson,
    recordQuiz,
    recordMistake,
    resolveMistake,
    resetProgress,
  ]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress doit être utilisé dans <ProgressProvider>');
  return ctx;
}
