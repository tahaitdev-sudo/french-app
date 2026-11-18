'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { EE_CONFIG } from '@/lib/expression-config';
import { analyze, countWords } from '@/lib/writing-data';
import { EE_TASKS, EE_TASK_TYPES } from '@/lib/ee-data';
import { pickFresh } from '@/lib/rotation';
import SpeakButton from '@/components/SpeakButton';

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// Une tâche de chaque type (1, 2, 3), en évitant les sujets déjà vus aux essais précédents
const pick = () =>
  [1, 2, 3].map((type) => pickFresh(EE_TASKS.filter((t) => t.type === type), 1, `ee-t${type}`)[0]);

export default function WritingExamPage() {
  const [phase, setPhase] = useState('intro'); // intro | test | review
  const [tasks, setTasks] = useState([]);
  const [texts, setTexts] = useState({});
  const [remaining, setRemaining] = useState(EE_CONFIG.minutes * 60);
  const doneRef = useRef(false);

  const start = () => {
    setTasks(pick());
    setTexts({});
    setRemaining(EE_CONFIG.minutes * 60);
    doneRef.current = false;
    setPhase('test');
  };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase('review');
  };

  useEffect(() => {
    if (phase !== 'test') return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          setTimeout(finish, 0);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Link href="/exam" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600">
          <ArrowRight className="h-4 w-4" />
          محاكاة TCF IRN
        </Link>
        <h1 className="text-2xl font-extrabold sm:text-3xl">محاكاة التعبير الكتابي</h1>
        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="leading-relaxed">
            المدة ({EE_CONFIG.minutes} دقيقة) وعدد المهام (3) حسب بطاقة TCF IRN في France Compétences. أما
            أطوال النصوص المطلوبة فتقريبية. مواضيعنا أصلية وليست رسمية، والتطبيق لا يصحّح نصك بل يقارنه بنموذج إجابة.
          </p>
        </div>
        <div className="card space-y-2">
          <p>
            ستكتب 3 نصوص خلال مؤقت واحد: (1) وصف شيء في رسالة ردّاً على سؤال، (2) سرد أنشطة اجتماعية
            ومهنية لهدف محدد، (3) إبداء رأيك. في كل محاولة جديدة تحصل على مواضيع لم تمر بك قبل ذلك ما
            أمكن. عند انتهاء الوقت يُسلَّم ما كتبته تلقائياً.
          </p>
        </div>
        <button type="button" onClick={start} className="btn btn-primary w-full">
          ابدأ الاختبار
        </button>
      </div>
    );
  }

  if (phase === 'test') {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="sticky top-2 z-10 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-4 py-2 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
          <span className="inline-flex items-center gap-2 font-bold tabular-nums">
            <Clock className="h-5 w-5" />
            <span dir="ltr" className={remaining < 300 ? 'text-rose-600' : ''}>
              {fmt(remaining)}
            </span>
          </span>
          <button type="button" onClick={finish} className="btn btn-primary !py-1.5">
            تسليم
          </button>
        </div>

        {tasks.map((t, i) => {
          const words = countWords(texts[t.id] || '');
          return (
            <section key={t.id} className="card space-y-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold dark:bg-slate-800">
                  {EE_TASK_TYPES[t.type].label}
                </span>
                <h2 className="font-bold">{t.title}</h2>
              </div>
              <p dir="ltr" lang="fr" className="text-left font-semibold leading-relaxed">
                {t.prompt}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{EE_TASK_TYPES[t.type].desc}. {t.instructions}</p>
              <textarea
                value={texts[t.id] || ''}
                onChange={(e) => setTexts((s) => ({ ...s, [t.id]: e.target.value }))}
                dir="ltr"
                lang="fr"
                rows={8}
                spellCheck={false}
                className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 text-left leading-relaxed focus:border-indigo-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900"
                placeholder="Écrivez ici…"
              />
              <p className="text-sm text-slate-500" dir="ltr">
                {words} / {t.min}–{t.max}
              </p>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-extrabold">مراجعة التعبير الكتابي</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        قارن نصك بالنموذج. التلميحات الآلية تبحث عن كلمات متوقعة وعدد الكلمات فقط، والأفضل أن يراجع
        نصك معلم.
      </p>

      {tasks.map((t, i) => {
        const text = texts[t.id] || '';
        const r = analyze(t, text);
        return (
          <section key={t.id} className="card space-y-4">
            <h2 className="font-bold">
              {EE_TASK_TYPES[t.type].label} · {t.title}
            </h2>
            <p className={r.lengthStatus === 'ok' ? 'text-emerald-600' : 'text-amber-600'}>
              {r.words} كلمة (المطلوب {t.min}–{t.max})
            </p>
            <ul className="space-y-1 text-sm">
              {r.checks.map((c) => (
                <li key={c.label} className="flex items-start gap-2">
                  {c.ok ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  ) : (
                    <XCircle className="mt-0.5 h-4 w-4 text-rose-500" />
                  )}
                  {c.label}
                </li>
              ))}
            </ul>
            <div className="space-y-1">
              <h3 className="text-sm font-bold">نصك</h3>
              <p dir="ltr" lang="fr" className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-left dark:bg-slate-800/60">
                {text || '—'}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold">نموذج إجابة</h3>
                <SpeakButton text={t.model} size="sm" />
              </div>
              <p dir="ltr" lang="fr" className="whitespace-pre-wrap rounded-xl bg-emerald-50 p-3 text-left dark:bg-emerald-950/30">
                {t.model}
              </p>
            </div>
          </section>
        );
      })}

      <button type="button" onClick={() => setPhase('intro')} className="btn btn-primary">
        أعد المحاولة
      </button>
    </div>
  );
}
