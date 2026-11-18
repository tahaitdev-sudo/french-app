'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Landmark, Shuffle, ListChecks } from 'lucide-react';
import {
  CIVIC_COUNT,
  CIVIC_PASS_RATIO,
  CIVIC_QUESTIONS,
  CIVIC_THEMES,
  shuffle,
  shuffleQuestion,
} from '@/lib/civic-data';
import QuizEngine from '@/components/quiz/QuizEngine';

const PASS_COUNT = Math.ceil(CIVIC_COUNT * CIVIC_PASS_RATIO);

function buildSession(size) {
  const questions = shuffle(CIVIC_QUESTIONS).slice(0, size).map(shuffleQuestion);
  return {
    id: `civic-${size}`,
    title: 'Examen civique',
    titleAr: size === CIVIC_COUNT ? 'امتحان مدني كامل' : 'تدريب مدني سريع',
    questions,
  };
}

export default function CivicPage() {
  const [session, setSession] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [size, setSize] = useState(CIVIC_COUNT);

  const start = (n) => {
    setSize(n);
    setSession(buildSession(n));
    setRunKey((k) => k + 1);
  };

  if (session) {
    return (
      <div className="space-y-5">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => setSession(null)}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
          >
            <ArrowRight className="h-4 w-4" />
            الامتحان المدني
          </button>
        </div>
        <QuizEngine
          key={runKey}
          quiz={session}
          review
          track={false}
          onRetry={() => start(size)}
        />
        <p className="mx-auto max-w-2xl text-center text-sm text-slate-500 dark:text-slate-400">
          {size === CIVIC_COUNT
            ? `للنجاح تحتاج ${PASS_COUNT} إجابة صحيحة من ${CIVIC_COUNT} (80٪).`
            : 'التدريب السريع: 10 أسئلة عشوائية.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          <Landmark className="h-6 w-6" />
        </span>
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">الامتحان المدني</h1>
          <p className="text-slate-500 dark:text-slate-400">
            تدريب على أسئلة المعرفة بالمجتمع الفرنسي: المبادئ، المؤسسات، التاريخ، الجغرافيا والحياة العملية.
          </p>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => start(CIVIC_COUNT)} className="card space-y-2 text-start transition hover:border-indigo-300">
          <ListChecks className="h-6 w-6 text-indigo-600" />
          <h2 className="font-bold">امتحان كامل ({CIVIC_COUNT} سؤالاً)</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            كل الأسئلة بترتيب عشوائي. النجاح عند {PASS_COUNT} إجابة صحيحة (80٪).
          </p>
        </button>
        <button type="button" onClick={() => start(10)} className="card space-y-2 text-start transition hover:border-indigo-300">
          <Shuffle className="h-6 w-6 text-emerald-600" />
          <h2 className="font-bold">تدريب سريع (10 أسئلة)</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">عشرة أسئلة عشوائية للمراجعة اليومية.</p>
        </button>
      </div>

      <div className="card space-y-2">
        <h2 className="font-bold">المحاور</h2>
        <ul className="flex flex-wrap gap-2 text-sm">
          {Object.values(CIVIC_THEMES).map((t) => (
            <li key={t} className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
        <strong>تنبيه:</strong> هذه أسئلة تدريبية أصلية كتبناها، وليست أسئلة الامتحان الرسمي. تحقق من
        المعلومات في «livret du citoyen» ومن service-public.fr قبل الامتحان.
      </div>

      <Link href="/" className="btn btn-secondary">
        العودة للرئيسية
      </Link>
    </div>
  );
}
