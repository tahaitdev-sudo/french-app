'use client';

import { useEffect } from 'react';
import { LESSONS, QUIZZES } from '@/lib/data';

const STATIC_ROUTES = [
  '/',
  '/lessons',
  '/quiz',
  '/listening',
  '/pronunciation',
  '/review',
  '/placement',
  '/exam',
  '/exam/writing',
  '/exam/speaking',
  '/civic',
  '/writing',
  '/plan',
  '/flashcards',
];

const ALL_URLS = [
  ...STATIC_ROUTES,
  ...LESSONS.map((l) => `/lessons/${l.id}`),
  ...QUIZZES.map((q) => `/quiz/${q.id}`),
];

// Enregistré uniquement en production : en développement, un cache gênerait le rechargement à chaud.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    const register = async () => {
      try {
        await navigator.serviceWorker.register('/sw.js');
        const reg = await navigator.serviceWorker.ready;
        reg.active?.postMessage({ type: 'CACHE_URLS', urls: ALL_URLS });
      } catch {
        /* échec silencieux : l'application fonctionne sans service worker */
      }
    };

    if (document.readyState === 'complete') register();
    else window.addEventListener('load', register, { once: true });
  }, []);

  return null;
}
