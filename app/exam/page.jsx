'use client';

import Link from 'next/link';
import { pickFresh } from '@/lib/rotation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Headphones,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { ESTIMATE_RATIO, EXAM_COUNT, EXAM_LEVELS, EXAM_PICK, EXAM_SECTIONS } from '@/lib/exam-data';
import { isSpeechSupported, speak, stopSpeaking } from '@/lib/speech';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';
import ProgressBar from '@/components/ProgressBar';
import SpeakButton from '@/components/SpeakButton';

const LETTERS = ['A', 'B', 'C', 'D'];

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Mélange les options de chaque question et recalcule l'index de la bonne réponse.
const prepare = (questions) =>
  questions.map((qu) => {
    const opts = shuffle(qu.options.map((text, i) => ({ text, ok: i === qu.answer })));
    return { ...qu, options: opts.map((o) => o.text), answer: opts.findIndex((o) => o.ok) };
  });

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function ExamPage() {
  const { recordExam, examResults } = useProgress();

  const [phase, setPhase] = useState('intro'); // intro | test | result
  const [sectionKey, setSectionKey] = useState('co');
  const [mode, setMode] = useState('exam'); // exam : une seule écoute | practice : écoutes illimitées
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [plays, setPlays] = useState({});
  const [speaking, setSpeaking] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const [result, setResult] = useState(null);
  const [supported, setSupported] = useState(true);
  const [confirmFinish, setConfirmFinish] = useState(false);

  // Références pour lire les dernières valeurs depuis le minuteur sans le recréer
  const questionsRef = useRef([]);
  const answersRef = useRef({});
  const sectionRef = useRef('co');

  useEffect(() => {
    setSupported(isSpeechSupported());
    return () => stopSpeaking();
  }, []);

  const section = EXAM_SECTIONS[sectionKey];

  const finish = useCallback(() => {
    stopSpeaking();
    setSpeaking(false);

    const qs = questionsRef.current;
    const ans = answersRef.current;

    const perLevel = EXAM_LEVELS.map((code) => {
      const levelQs = qs.filter((qu) => qu.level === code);
      const correct = levelQs.filter((qu) => ans[qu.id] === qu.answer).length;
      return { code, total: levelQs.length, correct };
    });
    const score = perLevel.reduce((sum, l) => sum + l.correct, 0);

    // Estimation approximative : on monte tant que le palier est réussi à ≥ 60 %
    let estimate = null;
    for (const l of perLevel) {
      if (l.correct / l.total >= ESTIMATE_RATIO) estimate = l.code;
      else break;
    }

    recordExam(sectionRef.current, score, qs.length);
    setResult({ score, total: qs.length, perLevel, estimate });
    setPhase('result');
  }, [recordExam]);

  // Minuteur
  useEffect(() => {
    if (phase !== 'test') return undefined;

    const seconds = EXAM_SECTIONS[sectionRef.current].minutes * 60;
    const endAt = Date.now() + seconds * 1000;
    setRemaining(seconds);

    const id = setInterval(() => {
      const left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        clearInterval(id);
        finish();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [phase, finish]);

  const start = (key) => {
    // 20 questions tirées de la banque, selon la répartition par niveau, dans l'ordre A1 → B2
    const bank = EXAM_SECTIONS[key].questions;
    const drawn = EXAM_LEVELS.flatMap((code) =>
      pickFresh(bank.filter((qu) => qu.level === code), EXAM_PICK[code] ?? 0, `ex-${key}-${code}`),
    );
    const prepared = prepare(drawn);
    sectionRef.current = key;
    questionsRef.current = prepared;
    answersRef.current = {};

    setSectionKey(key);
    setQuestions(prepared);
    setIndex(0);
    setAnswers({});
    setPlays({});
    setResult(null);
    setConfirmFinish(false);
    setSpeaking(false);
    setPhase('test');
  };

  const question = questions[index];
  const total = questions.length;
  const isLast = index + 1 === total;
  const isListening = sectionKey === 'co';
  const answeredCount = Object.keys(answers).length;

  const choose = (i) => {
    const next = { ...answersRef.current, [question.id]: i };
    answersRef.current = next;
    setAnswers(next);
    setConfirmFinish(false);
  };

  const go = (to) => {
    stopSpeaking();
    setSpeaking(false);
    setConfirmFinish(false);
    setIndex(to);
  };

  const tryFinish = () => {
    const unanswered = total - answeredCount;
    if (unanswered > 0 && !confirmFinish) {
      setConfirmFinish(true);
      return;
    }
    finish();
  };

  const maxPlays = mode === 'exam' ? 1 : Infinity;
  const playsUsed = question ? plays[question.id] ?? 0 : 0;

  const play = () => {
    if (!question || playsUsed >= maxPlays || speaking) return;
    setPlays((p) => ({ ...p, [question.id]: playsUsed + 1 }));
    speak(question.text, {
      rate: 0.9,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  /* ------------------------------ intro ------------------------------ */
  if (phase === 'intro') {
    const sections = [
      { key: 'co', Icon: Headphones, tint: 'bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300' },
      { key: 'ce', Icon: BookOpen, tint: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300' },
    ];

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">محاكاة اختبار TCF IRN</h1>
          <p className="text-slate-500 dark:text-slate-400">
            تدرّب على صيغة الاختبار: عدد الأسئلة والمدة نفسها، من A1 إلى B2.
          </p>
        </header>

        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="leading-relaxed">
            هذه أسئلة تدريب أصلية كتبناها على غرار الصيغة، وليست أسئلة رسمية. النتيجة تقدير تقريبي
            لا يعادل شهادة معتمدة، وصوت المتصفح ليس تسجيلاً لمتحدث أصلي. اعتمد في الاختبار الفعلي على
            الجهة المنظِّمة.
          </p>
        </div>

        <fieldset className="card space-y-3">
          <legend className="px-1 text-sm font-bold">وضع فهم المسموع</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { key: 'exam', title: 'وضع الامتحان', desc: 'يُسمع كل مقطع مرة واحدة فقط.' },
              { key: 'practice', title: 'وضع التدريب', desc: 'يمكنك إعادة الاستماع بلا حد.' },
            ].map((m) => (
              <label
                key={m.key}
                className={`cursor-pointer rounded-xl border-2 p-3 transition ${
                  mode === m.key
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="mode"
                  className="sr-only"
                  checked={mode === m.key}
                  onChange={() => setMode(m.key)}
                />
                <span className="block font-bold">{m.title}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ key, Icon, tint }) => {
            const s = EXAM_SECTIONS[key];
            const best = examResults?.[key];
            const blocked = key === 'co' && !supported;
            return (
              <section key={key} className="card flex flex-col gap-4">
                <span className={`grid h-12 w-12 place-items-center rounded-xl ${tint}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div className="space-y-1">
                  <h2 className="text-lg font-bold">{s.label}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <Fr>{s.labelFr}</Fr>
                  </p>
                  <p className="text-sm font-semibold">
                    {EXAM_COUNT} سؤالاً · {s.minutes} دقيقة
                  </p>
                  {best && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      أفضل نتيجة:{' '}
                      <span dir="ltr" className="inline-block font-bold">
                        {best.best}/{best.total}
                      </span>{' '}
                      · المحاولات: {best.attempts}
                    </p>
                  )}
                </div>
                {blocked && (
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    متصفحك لا يدعم النطق، فلا يمكن تشغيل هذا القسم.
                  </p>
                )}
                <button
                  type="button"
                  disabled={blocked}
                  onClick={() => start(key)}
                  className="btn btn-primary mt-auto w-full"
                >
                  ابدأ
                </button>
              </section>
            );
          })}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/exam/writing" className="card transition hover:border-indigo-300">
            <h2 className="font-bold">التعبير الكتابي (محاكاة بمؤقت)</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              ثلاث مهام من A2 إلى B2 بمؤقت واحد، ثم مقارنة بنموذج.
            </p>
          </Link>
          <Link href="/exam/speaking" className="card transition hover:border-indigo-300">
            <h2 className="font-bold">التعبير الشفهي (تسجيل صوتك)</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              تحضير ثم تسجيل بالميكروفون ثم استماع ومقارنة بنموذج.
            </p>
          </Link>
        </div>
      </div>
    );
  }

  /* ----------------------------- résultat ---------------------------- */
  if (phase === 'result' && result) {
    const wrong = questions.filter((qu) => answers[qu.id] !== qu.answer);

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="card animate-pop space-y-6">
          <div className="space-y-2 text-center">
            <p className="text-slate-500 dark:text-slate-400">{section.label}</p>
            <p className="text-5xl font-extrabold tabular-nums">
              {result.score}
              <span className="text-2xl font-bold text-slate-400"> / {result.total}</span>
            </p>
            <p className="font-semibold">
              {result.estimate ? (
                <>
                  تقدير تقريبي لمستواك في هذه المهارة:{' '}
                  <Fr className="text-indigo-600 dark:text-indigo-400">{result.estimate}</Fr>
                </>
              ) : (
                'أقل من A1 في هذه المحاولة، وتحتاج مزيداً من التدريب.'
              )}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              تقدير غير رسمي: نعدّ المستوى مجتازاً إذا أجبت 60٪ فأكثر من أسئلته.
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
                  barClassName={l.correct / l.total >= ESTIMATE_RATIO ? 'bg-emerald-500' : 'bg-rose-500'}
                />
                <span dir="ltr" className="w-10 text-sm font-semibold tabular-nums">
                  {l.correct}/{l.total}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button type="button" onClick={() => start(sectionKey)} className="btn btn-primary">
              <RotateCcw className="h-4 w-4" />
              أعد المحاولة
            </button>
            <button type="button" onClick={() => setPhase('intro')} className="btn btn-secondary">
              العودة للقائمة
            </button>
          </div>
        </div>

        {wrong.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-extrabold">مراجعة الأخطاء ({wrong.length})</h2>
            {wrong.map((qu) => {
              const given = answers[qu.id];
              return (
                <article key={qu.id} className="card space-y-3">
                  <div dir="ltr" lang="fr" className="space-y-2 text-left">
                    <div className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed dark:bg-slate-800/60">
                      <p>{qu.text}</p>
                      {!isListening ? null : <SpeakButton text={qu.text} size="sm" />}
                    </div>
                    <p className="font-semibold">{qu.question}</p>
                  </div>
                  <ul dir="ltr" lang="fr" className="space-y-1 text-left text-sm">
                    <li className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {qu.options[qu.answer]}
                    </li>
                    <li className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                      <XCircle className="h-4 w-4 shrink-0" />
                      {given === undefined ? '— (sans réponse)' : qu.options[given]}
                    </li>
                  </ul>
                </article>
              );
            })}
          </section>
        )}
      </div>
    );
  }

  /* ------------------------------ test ------------------------------- */
  if (!question) return null;

  const lowTime = remaining <= 300;

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <ProgressBar value={answeredCount / total} label="الأسئلة المُجاب عنها" className="flex-1" />
        <span className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
          {index + 1}/{total}
        </span>
        <span
          role="timer"
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-bold tabular-nums ${
            lowTime
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span dir="ltr">{formatTime(remaining)}</span>
        </span>
      </div>

      <div key={question.id} className="card animate-pop space-y-5">
        <div className="flex items-center justify-between gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <span>{section.label}</span>
          <Fr className="rounded-full bg-slate-200 px-2.5 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {question.level}
          </Fr>
        </div>

        {isListening ? (
          <div className="flex flex-col items-center gap-2 rounded-xl bg-slate-50 p-5 dark:bg-slate-800/60">
            <button
              type="button"
              onClick={play}
              disabled={playsUsed >= maxPlays || speaking}
              className="btn btn-primary"
            >
              <Headphones className="h-5 w-5" />
              {speaking ? 'جارٍ التشغيل…' : playsUsed === 0 ? 'استمع' : 'أعد الاستماع'}
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {maxPlays === Infinity
                ? 'وضع التدريب: إعادة الاستماع غير محدودة.'
                : playsUsed >= maxPlays
                  ? 'استُهلكت فرصة الاستماع لهذا السؤال.'
                  : 'لديك استماع واحد فقط لهذا السؤال.'}
            </p>
          </div>
        ) : (
          <p
            dir="ltr"
            lang="fr"
            className="rounded-xl bg-slate-50 p-4 text-left leading-relaxed dark:bg-slate-800/60"
          >
            {question.text}
          </p>
        )}

        <h2 dir="ltr" lang="fr" className="text-left text-lg font-bold">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, i) => (
            <button
              key={option}
              type="button"
              onClick={() => choose(i)}
              aria-pressed={answers[question.id] === i}
              dir="ltr"
              lang="fr"
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                answers[question.id] === i
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                  : 'border-slate-200 bg-white hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900'
              }`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {LETTERS[i]}
              </span>
              <span className="flex-1">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {!isListening && (
        <div className="flex flex-wrap gap-2" aria-label="الانتقال بين الأسئلة">
          {questions.map((qu, i) => (
            <button
              key={qu.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`السؤال ${i + 1}`}
              aria-current={i === index ? 'step' : undefined}
              className={`h-9 w-9 rounded-lg text-sm font-semibold tabular-nums transition ${
                i === index
                  ? 'bg-indigo-600 text-white'
                  : answers[qu.id] !== undefined
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'border border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {confirmFinish && (
        <p
          role="alert"
          className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
        >
          بقيت {total - answeredCount} أسئلة بلا إجابة وستُحتسب خاطئة. اضغط «إنهاء» مرة أخرى للتأكيد.
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        {!isListening && index > 0 ? (
          <button type="button" onClick={() => go(index - 1)} className="btn btn-secondary">
            <ArrowRight className="h-4 w-4" />
            السابق
          </button>
        ) : (
          <span />
        )}

        <div className="flex gap-2">
          {!isLast && (
            <button type="button" onClick={() => go(index + 1)} className="btn btn-primary">
              التالي
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          {(isLast || !isListening) && (
            <button type="button" onClick={tryFinish} className="btn btn-secondary">
              إنهاء الاختبار
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
