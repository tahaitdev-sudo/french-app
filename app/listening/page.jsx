'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Headphones, RotateCcw, XCircle, Zap } from 'lucide-react';
import { LISTENING_ITEMS } from '@/lib/data';
import { PERFECT_BONUS, XP_PER_CORRECT } from '@/lib/levels';
import { playComplete, playCorrect, playWrong } from '@/lib/sounds';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';
import ProgressBar from '@/components/ProgressBar';
import SpeakButton from '@/components/SpeakButton';
import Xp from '@/components/Xp';

const SESSION_SIZE = 6;

/* ---------- correction ---------- */

const stripAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

const clean = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[.,!?;:«»"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// perfect : identique — accents : juste les accents qui manquent — wrong : erreur
function grade(answer, target) {
  const a = clean(answer);
  const t = clean(target);
  if (a === t) return 'perfect';
  if (stripAccents(a) === stripAccents(t)) return 'accents';
  return 'wrong';
}

// Compare mot par mot (position par position) pour montrer où est l'erreur
function wordDiff(answer, target) {
  const targetWords = clean(target).split(' ');
  return clean(answer)
    .split(' ')
    .filter(Boolean)
    .map((word, i) => ({
      word,
      ok: stripAccents(word) === stripAccents(targetWords[i] || ''),
    }));
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ---------- page ---------- */

export default function ListeningPage() {
  const { addXp } = useProgress();
  const [phase, setPhase] = useState('intro'); // intro | playing | done
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null); // { status, diff }
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);

  const item = items[index];
  const total = items.length;
  const isLast = index + 1 === total;

  const start = () => {
    setItems(shuffle(LISTENING_ITEMS).slice(0, SESSION_SIZE));
    setIndex(0);
    setScore(0);
    setAnswer('');
    setResult(null);
    setPhase('playing');
  };

  const check = (e) => {
    e.preventDefault();
    if (result || !answer.trim()) return;
    const status = grade(answer, item.fr);
    const ok = status !== 'wrong';
    setResult({ status, diff: wordDiff(answer, item.fr) });
    if (ok) setScore((s) => s + 1);
    (ok ? playCorrect : playWrong)();
  };

  const next = () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      setAnswer('');
      setResult(null);
      return;
    }
    const xp = score * XP_PER_CORRECT + (score === total ? PERFECT_BONUS : 0);
    addXp(xp);
    setEarned(xp);
    setPhase('done');
    playComplete();
  };

  /* ----- écran d'accueil ----- */
  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">تمرين الاستماع</h1>
          <p className="text-slate-500 dark:text-slate-400">
            استمع إلى جملة فرنسية ثم اكتب ما سمعته. تدرّب على الإملاء والفهم السمعي معاً.
          </p>
        </header>

        <div className="card space-y-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <Headphones className="h-7 w-7" />
          </span>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>• {SESSION_SIZE} جمل عشوائية في كل جلسة.</li>
            <li>• يمكنك إعادة الاستماع بسرعة عادية أو ببطء.</li>
            <li>• الإجابة تُعدّ صحيحة حتى لو نسيت علامات التشكيل (é, è, à)، مع تنبيهك لها.</li>
            <li>
              • كل جملة صحيحة تمنحك <Xp value={XP_PER_CORRECT} />، والعلامة الكاملة تمنحك{' '}
              <Xp value={PERFECT_BONUS} plus /> إضافية.
            </li>
          </ul>
          <button type="button" onClick={start} className="btn btn-primary w-full">
            ابدأ التمرين
          </button>
        </div>
      </div>
    );
  }

  /* ----- écran final ----- */
  if (phase === 'done') {
    return (
      <div className="card animate-pop mx-auto max-w-xl space-y-6 text-center">
        <h2 className="text-2xl font-extrabold">انتهى التمرين</h2>
        <p className="text-5xl font-extrabold tabular-nums">
          {score}
          <span className="text-2xl font-bold text-slate-400"> / {total}</span>
        </p>
        <ProgressBar
          value={score / total}
          label="النتيجة"
          barClassName={score / total >= 0.6 ? 'bg-emerald-500' : 'bg-rose-500'}
        />
        <p className="mx-auto inline-flex items-center gap-2 rounded-xl bg-amber-100 px-4 py-2 font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          <Zap className="h-5 w-5" />
          <Xp value={earned} plus />
        </p>
        <div>
          <button type="button" onClick={start} className="btn btn-primary">
            <RotateCcw className="h-4 w-4" />
            جلسة جديدة
          </button>
        </div>
      </div>
    );
  }

  /* ----- exercice ----- */
  const ok = result && result.status !== 'wrong';

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <ProgressBar
          value={(index + (result ? 1 : 0)) / total}
          label="تقدم التمرين"
          className="flex-1"
        />
        <span className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
          {index + 1}/{total}
        </span>
      </div>

      <form key={item.id} onSubmit={check} className="card animate-pop space-y-5">
        <p className="text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
          استمع ثم اكتب الجملة
        </p>

        <div className="flex items-center justify-center gap-4 py-2">
          <SpeakButton text={item.fr} rate={0.9} size="lg" label="استمع" />
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <SpeakButton text={item.fr} rate={0.55} size="md" label="استمع ببطء" />
            ببطء
          </div>
        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={Boolean(result)}
          rows={2}
          lang="fr"
          dir="ltr"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Écrivez ce que vous entendez…"
          aria-label="اكتب الجملة التي سمعتها"
          className="w-full resize-none rounded-xl border-2 border-slate-300 bg-white p-3 text-lg outline-none transition focus:border-indigo-500 disabled:opacity-70 dark:border-slate-600 dark:bg-slate-900"
        />

        {!result && (
          <button type="submit" disabled={!answer.trim()} className="btn btn-primary w-full">
            تحقق من الإجابة
          </button>
        )}

        {result && (
          <div
            role="status"
            className={`animate-pop space-y-3 rounded-xl border p-4 ${
              ok
                ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
                : 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100'
            }`}
          >
            <p className="flex items-center gap-2 font-bold">
              {ok ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
              {result.status === 'perfect' && 'ممتاز! كتبتها بشكل صحيح تماماً.'}
              {result.status === 'accents' && 'صحيحة! لكن انتبه لعلامات التشكيل.'}
              {result.status === 'wrong' && 'ليست صحيحة هذه المرة.'}
            </p>

            {result.status === 'wrong' && (
              <p lang="fr" dir="ltr" className="flex flex-wrap gap-x-2 text-base font-semibold">
                {result.diff.map((d, i) => (
                  <span
                    key={`${d.word}-${i}`}
                    className={d.ok ? '' : 'text-rose-600 underline decoration-wavy dark:text-rose-300'}
                  >
                    {d.word}
                  </span>
                ))}
              </p>
            )}

            <div className="space-y-1 border-t border-current/20 pt-3 text-sm">
              <p>
                الجملة الصحيحة: <Fr className="font-bold">{item.fr}</Fr>
              </p>
              <p>المعنى: {item.ar}</p>
            </div>
          </div>
        )}
      </form>

      {result && (
        <button type="button" onClick={next} className="btn btn-primary w-full">
          {isLast ? 'عرض النتيجة' : 'الجملة التالية'}
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
