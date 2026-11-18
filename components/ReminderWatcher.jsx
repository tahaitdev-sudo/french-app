'use client';

import { useEffect, useRef } from 'react';
import { useProgress } from '@/components/ProgressProvider';
import {
  isNotificationSupported,
  loadReminder,
  minutesOf,
  saveReminder,
  showReminder,
  todayKey,
} from '@/lib/reminder';

// Vérifie régulièrement si le rappel du jour doit être envoyé.
// Fonctionne tant que l'application est ouverte (même dans un onglet en arrière-plan).
export default function ReminderWatcher() {
  const { ready, todayXp, currentStreak } = useProgress();
  const latest = useRef({ todayXp, currentStreak });

  useEffect(() => {
    latest.current = { todayXp, currentStreak };
  }, [todayXp, currentStreak]);

  useEffect(() => {
    if (!ready || !isNotificationSupported()) return undefined;

    const tick = () => {
      const settings = loadReminder();
      if (!settings.enabled || Notification.permission !== 'granted') return;

      const today = todayKey();
      if (settings.lastNotified === today) return;

      const now = new Date();
      if (now.getHours() * 60 + now.getMinutes() < minutesOf(settings.time)) return;

      // Déjà étudié aujourd'hui : inutile de rappeler
      if (latest.current.todayXp > 0) {
        saveReminder({ ...settings, lastNotified: today });
        return;
      }

      showReminder(latest.current.currentStreak);
      saveReminder({ ...settings, lastNotified: today });
    };

    tick();
    const id = setInterval(tick, 30000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [ready]);

  return null;
}
