import Link from 'next/link';
import { RotateCcw, Trophy, Zap } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import Xp from '@/components/Xp';

function getMessage(pct) {
  if (pct === 100) return 'علامة كاملة! أداء مذهل.';
  if (pct >= 80) return 'ممتاز! أنت تتقدم بسرعة.';
  if (pct >= 60) return 'جيد جداً، قليل من المراجعة وتصل للكمال.';
  return 'لا بأس، راجع الدرس وأعد المحاولة.';
}

export default function QuizResult({ quiz, score, total, earned, onRetry }) {
  const pct = Math.round((score / total) * 100);

  return (
    <div className="card animate-pop mx-auto max-w-xl space-y-6 text-center">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
        <Trophy className="h-10 w-10" />
      </span>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold">انتهى الاختبار</h2>
        <p className="text-slate-500 dark:text-slate-400">{quiz.titleAr}</p>
      </div>

      <div className="space-y-2">
        <p className="text-5xl font-extrabold tabular-nums">
          {score}
          <span className="text-2xl font-bold text-slate-400"> / {total}</span>
        </p>
        <ProgressBar
          value={score / total}
          label="النتيجة"
          barClassName={pct >= 60 ? 'bg-emerald-500' : 'bg-rose-500'}
        />
        <p className="font-semibold">{getMessage(pct)}</p>
      </div>

      <p className="mx-auto inline-flex items-center gap-2 rounded-xl bg-amber-100 px-4 py-2 font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
        <Zap className="h-5 w-5" />
        <Xp value={earned} plus />
      </p>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button type="button" onClick={onRetry} className="btn btn-primary">
          <RotateCcw className="h-4 w-4" />
          أعد المحاولة
        </button>
        <Link href="/quiz" className="btn btn-secondary">
          كل الاختبارات
        </Link>
      </div>
    </div>
  );
}
