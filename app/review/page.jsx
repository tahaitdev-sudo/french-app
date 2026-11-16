'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, PartyPopper, RotateCcw } from 'lucide-react';
import { QUIZZES } from '@/lib/data';
import { useProgress } from '@/components/ProgressProvider';
import QuizEngine from '@/components/quiz/QuizEngine';

export default function ReviewPage() {
  const { mistakes, ready } = useProgress();
  const [session, setSession] = useState(null);

  // Questions ratées, retrouvées dans tous les quiz
  const pending = QUIZZES.flatMap((quiz) =>
    quiz.questions.map((q) => ({ ...q, quizId: quiz.id })),
  ).filter((q) => q.id in mistakes);

  // La liste est figée au démarrage : corriger une erreur la retire de `mistakes`,
  // ce qui ne doit pas raccourcir la série en cours.
  const start = () =>
    setSession({
      id: 'review',
      title: 'Révision',
      titleAr: 'مراجعة الأخطاء',
      questions: pending,
    });

  if (session) {
    return (
      <div className="space-y-5">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
          >
            <ArrowRight className="h-4 w-4" />
            الاختبارات
          </Link>
        </div>
        <QuizEngine quiz={session} review onRetry={() => setSession(null)} />
      </div>
    );
  }

  if (!ready) return <div className="card min-h-[200px]" aria-hidden="true" />;

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold sm:text-3xl">مراجعة الأخطاء</h1>
        <p className="text-slate-500 dark:text-slate-400">
          الأسئلة التي أخطأت فيها تُحفظ هنا. أجب عنها بشكل صحيح لتُزال من القائمة.
        </p>
      </header>

      {pending.length === 0 ? (
        <div className="card space-y-4 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <PartyPopper className="h-8 w-8" />
          </span>
          <h2 className="text-lg font-bold">لا توجد أخطاء للمراجعة</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            أخطاؤك في الاختبارات ستظهر هنا تلقائياً.
          </p>
          <Link href="/quiz" className="btn btn-primary">
            جرّب اختباراً
          </Link>
        </div>
      ) : (
        <div className="card space-y-4">
          <p className="text-4xl font-extrabold tabular-nums">
            {pending.length}
            <span className="ms-2 text-base font-semibold text-slate-500 dark:text-slate-400">
              {pending.length === 1 ? 'سؤال للمراجعة' : 'أسئلة للمراجعة'}
            </span>
          </p>
          <button type="button" onClick={start} className="btn btn-primary w-full">
            <RotateCcw className="h-4 w-4" />
            ابدأ المراجعة
          </button>
        </div>
      )}
    </div>
  );
}
