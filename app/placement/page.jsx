'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ClipboardList, RotateCcw } from 'lucide-react';
import {
  LESSONS,
  PLACEMENT_LEVELS,
  PLACEMENT_PASS,
  PLACEMENT_QUESTIONS,
} from '@/lib/data';
import { LEVELS } from '@/lib/levels';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';
import ProgressBar from '@/components/ProgressBar';

const LETTERS = ['A', 'B', 'C', 'D'];

// Le niveau de départ est le premier niveau non validé (moins de 3 bonnes réponses sur 4).
// Si tout est validé jusqu'à C1, on commence à C2.
function computeResult(answers) {
  const perLevel = PLACEMENT_LEVELS.map((code) => {
    const qs = PLACEMENT_QUESTIONS.filter((q) => q.level === code);
    const correct = qs.filter((q) => answers[q.id] === q.answer).length;
    return { code, correct, total: qs.length, passed: correct >= PLACEMENT_PASS };
  });

  const firstFail = perLevel.find((l) => !l.passed);
  const level = firstFail ? firstFail.code : 'C2';
  const score = perLevel.reduce((sum, l) => sum + l.correct, 0);
  return { perLevel, level, score, total: PLACEMENT_QUESTIONS.length };
}

export default function PlacementPage() {
  const { setPlacement } = useProgress();
  const [phase, setPhase] = useState('intro'); // intro | test | result
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);

  const total = PLACEMENT_QUESTIONS.length;
  const question = PLACEMENT_QUESTIONS[index];
  const isLast = index + 1 === total;

  const start = () => {
    setIndex(0);
    setAnswers({});
    setSelected(null);
    setResult(null);
    setPhase('test');
  };

  // Aucune correction pendant le test : on enregistre simplement le choix.
  const next = () => {
    if (selected === null) return;
    const updated = { ...answers, [question.id]: selected };
    setAnswers(updated);
    setSelected(null);

    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }

    const res = computeResult(updated);
    setResult(res);
    setPlacement(res.level, res.score, res.total);
    setPhase('result');
  };

  /* ----- accueil ----- */
  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">اختبار تحديد المستوى</h1>
          <p className="text-slate-500 dark:text-slate-400">
            لتبدأ من المستوى المناسب بدل البدء من الصفر.
          </p>
        </header>

        <div className="card space-y-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <ClipboardList className="h-7 w-7" />
          </span>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• {total} سؤالاً متدرجاً من A1 إلى C1 (4 أسئلة لكل مستوى).</li>
            <li>• لن تظهر لك الإجابات الصحيحة أثناء الاختبار.</li>
            <li>• يُعدّ المستوى مجتازاً إذا أجبت عن 3 أسئلة من 4 بشكل صحيح.</li>
            <li>• المستويات التي تسبق مستواك تُحتسب منجزة ولا يلزمك إعادتها.</li>
            <li>• النتيجة تقريبية، ويمكنك إعادة الاختبار في أي وقت.</li>
          </ul>
          <button type="button" onClick={start} className="btn btn-primary w-full">
            ابدأ الاختبار
          </button>
        </div>
      </div>
    );
  }

  /* ----- نتيجة ----- */
  if (phase === 'result' && result) {
    const levelName = LEVELS.find((l) => l.code === result.level)?.name;
    const firstLesson = LESSONS.find((l) => l.level === result.level);

    return (
      <div className="card animate-pop mx-auto max-w-xl space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-slate-500 dark:text-slate-400">مستواك للبدء</p>
          <p className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400">
            <Fr>{result.level}</Fr>
          </p>
          <p className="text-lg font-semibold">{levelName}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span dir="ltr" className="inline-block">
              {result.score}/{result.total}
            </span>{' '}
            إجابة صحيحة
          </p>
        </div>

        <ul className="space-y-3">
          {result.perLevel.map((l) => (
            <li key={l.code} className="flex items-center gap-3">
              <Fr className="w-8 font-bold">{l.code}</Fr>
              <ProgressBar
                value={l.correct / l.total}
                label={`نتيجة ${l.code}`}
                className="flex-1"
                barClassName={l.passed ? 'bg-emerald-500' : 'bg-rose-500'}
              />
              <span dir="ltr" className="w-10 text-sm font-semibold tabular-nums">
                {l.correct}/{l.total}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href={firstLesson ? `/lessons/${firstLesson.id}` : '/lessons'} className="btn btn-primary">
            ابدأ من {result.level}
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <button type="button" onClick={start} className="btn btn-secondary">
            <RotateCcw className="h-4 w-4" />
            أعد الاختبار
          </button>
        </div>
      </div>
    );
  }

  /* ----- أسئلة ----- */
  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <ProgressBar value={index / total} label="تقدم الاختبار" className="flex-1" />
        <span className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
          {index + 1}/{total}
        </span>
      </div>

      <div key={question.id} className="card animate-pop space-y-5">
        <h2 dir="auto" className="text-xl font-bold leading-relaxed">
          {question.prompt}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-start font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selected === i
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                  : 'border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {LETTERS[i]}
              </span>
              <span dir="auto" className="flex-1">
                {option}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button type="button" onClick={next} disabled={selected === null} className="btn btn-primary w-full">
        {isLast ? 'عرض النتيجة' : 'السؤال التالي'}
        <ArrowLeft className="h-4 w-4" />
      </button>
    </div>
  );
}
