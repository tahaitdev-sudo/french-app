'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { QUIZ_BY_ID } from '@/lib/data';
import Fr from '@/components/Fr';
import QuizEngine from '@/components/quiz/QuizEngine';

export default function QuizRunnerPage() {
  const { id } = useParams();
  const [runKey, setRunKey] = useState(0);
  const quiz = QUIZ_BY_ID[id];

  if (!quiz) {
    return (
      <div className="card space-y-3 text-center">
        <h1 className="text-xl font-bold">الاختبار غير موجود</h1>
        <Link href="/quiz" className="btn btn-primary">
          العودة إلى الاختبارات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
        <Link
          href="/quiz"
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
        >
          <ArrowRight className="h-4 w-4" />
          الاختبارات
        </Link>
        <h1 className="font-bold">
          <Fr>{quiz.title}</Fr>
        </h1>
      </div>

      {/* key : relance un nouvel essai avec un état propre */}
      <QuizEngine key={`${quiz.id}-${runKey}`} quiz={quiz} onRetry={() => setRunKey((k) => k + 1)} />
    </div>
  );
}
