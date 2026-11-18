'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Layers, RotateCcw, X } from 'lucide-react';
import { LEVELS } from '@/lib/levels';
import {
  NEW_PER_DAY,
  buildQueue,
  grade,
  initialSrs,
  loadSrs,
  saveSrs,
  srsStats,
} from '@/lib/srs';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';
import ProgressBar from '@/components/ProgressBar';

export default function FlashcardsPage() {
  const { addXp, level } = useProgress();
  const [srs, setSrs] = useState(initialSrs);
  const [loaded, setLoaded] = useState(false);
  const [upTo, setUpTo] = useState('B2'); // niveaux inclus : A1 jusqu'à ce niveau
  const [queue, setQueue] = useState(null); // null = écran d'accueil
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const failed = useRef(new Set());

  useEffect(() => {
    setSrs(loadSrs());
    setLoaded(true);
  }, []);

  const levels = useMemo(() => {
    const codes = LEVELS.map((l) => l.code);
    return codes.slice(0, codes.indexOf(upTo) + 1);
  }, [upTo]);

  const stats = useMemo(() => srsStats(srs, levels), [srs, levels]);

  const start = () => {
    const { due, newCards } = buildQueue(srs, levels);
    const q = [...due, ...newCards];
    failed.current = new Set();
    setQueue(q);
    setTotal(q.length);
    setDone(0);
    setFlipped(false);
  };

  const answer = (correct) => {
    const card = queue[0];
    const wasFailed = failed.current.has(card.id);
    const next = grade(srs, card.id, correct, wasFailed);
    setSrs(next);
    saveSrs(next);

    if (correct) {
      addXp(1);
      setDone((d) => d + 1);
      setQueue((q) => q.slice(1));
    } else {
      failed.current.add(card.id);
      // la carte revient plus tard dans la même session
      setQueue((q) => [...q.slice(1), card]);
    }
    setFlipped(false);
  };

  if (!loaded) return null;

  /* ---------------------------- session ---------------------------- */
  if (queue && queue.length > 0) {
    const card = queue[0];
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <button
          type="button"
          onClick={() => setQueue(null)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600"
        >
          <ArrowRight className="h-4 w-4" />
          إنهاء الجلسة
        </button>
        <ProgressBar value={total ? done / total : 0} label="تقدم الجلسة" />
        <p className="text-sm text-slate-500" dir="ltr">
          {done} / {total}
        </p>

        <div className="card space-y-5 text-center">
          <Fr className="text-xs font-bold text-slate-500">{card.level}</Fr>
          <p dir="ltr" lang="fr" className="text-3xl font-extrabold leading-snug">
            {card.fr}
          </p>
          <div className="flex justify-center">
            <SpeakButton text={card.fr.replace(/→.*$/, '').replace(/\/.*$/, '')} />
          </div>

          {flipped ? (
            <div className="space-y-4">
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-300">{card.ar}</p>
              <p className="text-xs text-slate-500">من درس: {card.lessonTitle}</p>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => answer(false)} className="btn btn-secondary">
                  <X className="h-4 w-4 text-rose-500" />
                  لم أعرفها
                </button>
                <button type="button" onClick={() => answer(true)} className="btn btn-primary">
                  <Check className="h-4 w-4" />
                  عرفتها
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => setFlipped(true)} className="btn btn-primary w-full">
              أظهر المعنى
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ---------------------------- accueil ---------------------------- */
  const finished = queue && queue.length === 0;
  const canStart = stats.due + stats.newAvailable > 0;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          <Layers className="h-6 w-6" />
        </span>
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">بطاقات المفردات</h1>
          <p className="text-slate-500 dark:text-slate-400">
            مراجعة بالتكرار المتباعد: ما تعرفه يعود بعد أيام أطول، وما تنساه يعود قريباً.
          </p>
        </div>
      </header>

      {finished && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
          أحسنت! أنهيت جلسة اليوم. عد غداً لمراجعة ما تبقى.
        </div>
      )}

      <div className="card space-y-3">
        <h2 className="font-bold">المستويات المشمولة</h2>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setUpTo(l.code)}
              className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
                upTo === l.code
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              A1 ← {l.code}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          مستواك الحالي: <Fr>{level.code}</Fr>. اختر أعلى مستوى تريد مفرداته.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="card !p-3">
          <p className="text-2xl font-extrabold">{stats.due}</p>
          <p className="text-xs text-slate-500">للمراجعة اليوم</p>
        </div>
        <div className="card !p-3">
          <p className="text-2xl font-extrabold">{stats.newAvailable}</p>
          <p className="text-xs text-slate-500">جديدة اليوم (حد {NEW_PER_DAY})</p>
        </div>
        <div className="card !p-3">
          <p className="text-2xl font-extrabold">{stats.learned}</p>
          <p className="text-xs text-slate-500">محفوظة جيداً</p>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">
        إجمالي البطاقات في هذه المستويات: {stats.total}، ولم تبدأ منها {stats.newTotal}.
      </p>

      <button type="button" onClick={start} disabled={!canStart} className="btn btn-primary w-full disabled:opacity-50">
        <RotateCcw className="h-4 w-4" />
        {canStart ? 'ابدأ الجلسة' : 'لا توجد بطاقات اليوم'}
      </button>

      <Link href="/" className="btn btn-secondary">
        العودة للرئيسية
      </Link>
    </div>
  );
}
