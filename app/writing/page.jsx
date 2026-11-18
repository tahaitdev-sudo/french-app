'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  PenLine,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  WRITING_BY_ID,
  WRITING_TASKS,
  WRITING_XP,
  analyze,
  countWords,
} from '@/lib/writing-data';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';
import Xp from '@/components/Xp';

const DRAFT_KEY = (id) => `fr-writing-draft-${id}`;

const loadDraft = (id) => {
  try {
    return localStorage.getItem(DRAFT_KEY(id)) || '';
  } catch {
    return '';
  }
};

const saveDraft = (id, text) => {
  try {
    localStorage.setItem(DRAFT_KEY(id), text);
  } catch {
    /* stockage indisponible */
  }
};

const SELF_CHECK = [
  'هل تتفق الأفعال مع الفاعل (je parle / nous parlons)؟',
  'هل اخترت الزمن المناسب (passé composé للحدث، imparfait للوصف)؟',
  'هل اتفقت الصفات مع الأسماء في الجنس والعدد؟',
  'هل كتبت علامات التشكيل (é, è, à, ç) بشكل صحيح؟',
  'هل الأسلوب مناسب: tu مع الأصدقاء وvous في الرسائل الرسمية؟',
  'هل الجمل مترابطة وفيها أدوات ربط؟',
];

export default function WritingPage() {
  const { writings, completeWriting } = useProgress();

  const [phase, setPhase] = useState('list'); // list | write | review
  const [taskId, setTaskId] = useState(null);
  const [text, setText] = useState('');
  const [report, setReport] = useState(null);
  const [earned, setEarned] = useState(false);

  const task = taskId ? WRITING_BY_ID[taskId] : null;
  const words = countWords(text);

  const open = (id) => {
    setTaskId(id);
    setText(loadDraft(id));
    setReport(null);
    setEarned(false);
    setPhase('write');
  };

  const onChange = (value) => {
    setText(value);
    saveDraft(taskId, value);
  };

  const submit = () => {
    const result = analyze(task, text);
    setReport(result);

    // XP une seule fois, et seulement si la longueur minimale est atteinte
    if (!writings?.[task.id] && result.words >= task.min) {
      completeWriting(task.id, result.words);
      setEarned(true);
    }
    setPhase('review');
  };

  /* ------------------------------ liste ------------------------------ */
  if (phase === 'list') {
    return (
      <div className="space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">التدرّب على الكتابة</h1>
          <p className="text-slate-500 dark:text-slate-400">
            اكتب نصاً قصيراً بالفرنسية، ثم قارنه بنموذج إجابة وبقائمة تلميحات.
          </p>
        </header>

        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="leading-relaxed">
            التطبيق لا يصحّح نصك. التلميحات الآلية تبحث فقط عن كلمات وعبارات متوقعة وعن عدد الكلمات،
            ولا تفحص القواعد ولا الإملاء. الأفضل أن يراجع كتابتك معلم أو متحدث أصلي. المهام أصلية
            وليست من اختبار رسمي.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {WRITING_TASKS.map((t) => {
            const done = writings?.[t.id];
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => open(t.id)}
                className="card group flex flex-col gap-3 text-start transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                    <PenLine className="h-5 w-5" />
                  </span>
                  {done ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      مكتمل
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                      <Xp value={WRITING_XP} plus />
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold">{t.title}</h2>
                <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <Fr className="rounded-full bg-slate-200 px-2.5 py-1 font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {t.level}
                  </Fr>
                  <span>
                    <span dir="ltr" className="inline-block">
                      {t.min}–{t.max}
                    </span>{' '}
                    كلمة
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ----------------------------- مراجعة ------------------------------ */
  if (phase === 'review' && task && report) {
    const lengthMsg = {
      short: `نصك أقصر من المطلوب (${report.words} كلمة، والحد الأدنى ${task.min}).`,
      ok: `عدد الكلمات مناسب (${report.words}).`,
      long: `نصك أطول من المطلوب (${report.words} كلمة، والحد الأقصى ${task.max}).`,
    }[report.lengthStatus];

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-extrabold">{task.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">مراجعة نصك</p>
        </header>

        {earned && (
          <p className="animate-pop rounded-xl border border-emerald-300 bg-emerald-50 p-3 font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
            أحسنت! حصلت على <Xp value={WRITING_XP} plus />
          </p>
        )}

        <section className="card space-y-4">
          <p
            className={`flex items-center gap-2 font-semibold ${
              report.lengthStatus === 'ok'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {report.lengthStatus === 'ok' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            {lengthMsg}
          </p>

          <ul className="space-y-2">
            {report.checks.map((c) => (
              <li key={c.label} className="flex items-start gap-2 text-sm">
                {c.ok ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
                )}
                <span>{c.label}</span>
              </li>
            ))}
          </ul>

          {report.missingAccents && (
            <p className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
              لم أجد أي علامة تشكيل في نصك (é, è, à, ç). تأكد أنك لم تنسَها.
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400">
            ✓ تعني أنني وجدت كلمة متوقعة فقط، و✗ لا تعني بالضرورة أنك أخطأت: قد تكون عبّرت بكلمات
            أخرى.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">نصك</h2>
          <p
            dir="ltr"
            lang="fr"
            className="card whitespace-pre-wrap text-left leading-relaxed"
          >
            {text}
          </p>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">نموذج إجابة</h2>
            <SpeakButton text={task.model} size="sm" label="استمع إلى النموذج" />
          </div>
          <p
            dir="ltr"
            lang="fr"
            className="card whitespace-pre-wrap border-emerald-200 bg-emerald-50/50 text-left leading-relaxed dark:border-emerald-900 dark:bg-emerald-950/30"
          >
            {task.model}
          </p>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {task.notes.map((n) => (
              <li key={n}>• {n}</li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            النموذج مثال واحد، وليس الإجابة الوحيدة الصحيحة.
          </p>
        </section>

        <section className="card space-y-3">
          <h2 className="font-bold">قيّم نصك بنفسك</h2>
          <ul className="space-y-2 text-sm">
            {SELF_CHECK.map((q) => (
              <li key={q} className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 shrink-0 rounded border border-slate-300 dark:border-slate-600" />
                {q}
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={() => setPhase('write')} className="btn btn-primary">
            <PenLine className="h-4 w-4" />
            عدّل نصك
          </button>
          <button type="button" onClick={() => setPhase('list')} className="btn btn-secondary">
            مهمة أخرى
          </button>
        </div>
      </div>
    );
  }

  /* ------------------------------ كتابة ------------------------------ */
  if (!task) return null;

  const countTone =
    words === 0
      ? 'text-slate-400'
      : words < task.min || words > task.max
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-emerald-600 dark:text-emerald-400';

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <button
        type="button"
        onClick={() => setPhase('list')}
        className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        <ArrowRight className="h-4 w-4" />
        كل المهام
      </button>

      <header className="space-y-2">
        <div className="flex items-center gap-2">
          <Fr className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {task.level}
          </Fr>
          <h1 className="text-2xl font-extrabold">{task.title}</h1>
        </div>
        <p dir="ltr" lang="fr" className="card text-left font-semibold leading-relaxed">
          {task.prompt}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{task.instructions}</p>
      </header>

      <details className="card !p-4">
        <summary className="cursor-pointer font-semibold">عبارات مفيدة</summary>
        <ul className="mt-3 space-y-2">
          {task.phrases.map((p) => (
            <li
              key={p.fr}
              className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
            >
              <div className="min-w-0">
                <Fr className="text-sm font-semibold">{p.fr}</Fr>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.ar}</p>
              </div>
              <SpeakButton text={p.fr} size="sm" />
            </li>
          ))}
        </ul>
      </details>

      <div className="space-y-2">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          rows={12}
          lang="fr"
          dir="ltr"
          autoCapitalize="sentences"
          spellCheck
          placeholder="Écrivez votre texte ici…"
          aria-label="اكتب نصك بالفرنسية"
          className="w-full resize-y rounded-xl border-2 border-slate-300 bg-white p-4 text-left text-lg leading-relaxed outline-none transition focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900"
        />
        <div className="flex items-center justify-between text-sm">
          <span className={`font-semibold tabular-nums ${countTone}`}>
            <span dir="ltr" className="inline-block">
              {words} / {task.min}–{task.max}
            </span>{' '}
            كلمة
          </span>
          <span className="text-xs text-slate-400">تُحفظ المسودة تلقائياً في متصفحك</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button type="button" onClick={submit} disabled={words < 10} className="btn btn-primary">
          تحقق وأرني النموذج
        </button>
        {text && (
          <button type="button" onClick={() => onChange('')} className="btn btn-secondary">
            <RotateCcw className="h-4 w-4" />
            امسح النص
          </button>
        )}
      </div>
      {words > 0 && words < 10 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">اكتب 10 كلمات على الأقل.</p>
      )}
    </div>
  );
}
