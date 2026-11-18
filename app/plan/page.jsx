'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { CalendarCheck, Check, Circle, Target } from 'lucide-react';
import { LESSONS, QUIZZES, QUIZ_BY_ID } from '@/lib/data';
import { PASS_RATIO } from '@/lib/mastery';
import { dateKey, loadSrs, srsStats } from '@/lib/srs';
import { useProgress } from '@/components/ProgressProvider';
import ProgressBar from '@/components/ProgressBar';
import Fr from '@/components/Fr';

const TARGET_LEVELS = ['A1', 'A2', 'B1', 'B2'];
const planKey = () => `fr-plan-${dateKey()}`;

export default function PlanPage() {
  const { ready, level, completedLessons, quizResults, mistakesCount, examResults } = useProgress();
  const [checked, setChecked] = useState({});
  const [due, setDue] = useState(0);

  useEffect(() => {
    try {
      setChecked(JSON.parse(localStorage.getItem(planKey()) || '{}'));
    } catch {
      setChecked({});
    }
    setDue(srsStats(loadSrs(), TARGET_LEVELS).due);
  }, []);

  const toggle = (id) =>
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(planKey(), JSON.stringify(next));
      } catch {
        /* stockage indisponible */
      }
      return next;
    });

  const plan = useMemo(() => {
    const levelsInfo = Object.fromEntries((level.all || []).map((l) => [l.code, l]));
    const skipped = (code) => levelsInfo[code]?.skipped;

    // Prochaine leçon non terminée (A1 → B2), en ignorant les niveaux validés par le test de niveau
    const nextLesson = LESSONS.find(
      (l) =>
        TARGET_LEVELS.includes(l.level) &&
        !skipped(l.level) &&
        !completedLessons.includes(l.id),
    );

    // Premier quiz d'une leçon terminée qui n'est pas encore réussi
    const needsQuiz = QUIZZES.find((qz) => {
      if (!TARGET_LEVELS.includes(qz.level) || skipped(qz.level)) return false;
      const lessonDone = LESSONS.some((l) => l.quizId === qz.id && completedLessons.includes(l.id));
      if (!lessonDone) return false;
      const r = quizResults[qz.id];
      return !r || r.best / r.total < PASS_RATIO;
    });

    const items = [];
    if (nextLesson) {
      items.push({
        id: 'lesson',
        title: `درس: ${nextLesson.titleAr}`,
        hint: `مستوى ${nextLesson.level}`,
        href: `/lessons/${nextLesson.id}`,
      });
    }
    if (needsQuiz) {
      items.push({
        id: 'quiz',
        title: `اختبار: ${needsQuiz.titleAr}`,
        hint: 'لم تجتز 70٪ بعد',
        href: `/quiz/${needsQuiz.id}`,
      });
    }
    items.push({
      id: 'cards',
      title: 'مراجعة بطاقات المفردات',
      hint: due > 0 ? `${due} بطاقة مستحقة اليوم` : 'ابدأ بطاقات جديدة',
      href: '/flashcards',
    });
    if (mistakesCount > 0) {
      items.push({
        id: 'mistakes',
        title: 'مراجعة أخطائك',
        hint: `${mistakesCount} سؤالاً`,
        href: '/review',
      });
    }
    items.push({ id: 'listening', title: 'تمرين إملاء واستماع', hint: '5 جمل', href: '/listening' });
    items.push({ id: 'writing', title: 'مهمة تعبير كتابي', hint: 'نصٌّ واحد', href: '/writing' });
    return items;
  }, [level, completedLessons, quizResults, mistakesCount, due]);

  // Estimation de la préparation au B2 (indicative)
  const readiness = useMemo(() => {
    const levels = (level.all || []).filter((l) => TARGET_LEVELS.includes(l.code));
    const mastery = levels.length ? levels.reduce((a, l) => a + l.ratio, 0) / levels.length : 0;
    const scores = ['co', 'ce']
      .map((k) => examResults?.[k])
      .map((r) => (r && r.total ? r.best / r.total : 0));
    const exam = (scores[0] + scores[1]) / 2;
    const pct = Math.round((0.6 * mastery + 0.4 * exam) * 100);
    return { mastery, exam, pct, levels, scores };
  }, [level, examResults]);

  if (!ready) return null;

  const doneCount = plan.filter((p) => checked[p.id]).length;
  const status =
    readiness.pct >= 75
      ? 'اقتربت: جرّب محاكاة كاملة (فهم + كتابة + شفهي) وقِس نتيجتك.'
      : readiness.pct >= 40
        ? 'في الطريق: واصل الدروس والاختبارات واجعل الاستماع يومياً.'
        : 'في البداية: ركّز على إنهاء دروس A1 وA2 أولاً.';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header className="flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
          <CalendarCheck className="h-6 w-6" />
        </span>
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold sm:text-3xl">خطة اليوم</h1>
          <p className="text-slate-500 dark:text-slate-400">
            مهام مقترحة حسب تقدمك، هدفها الوصول إلى <Fr>B2</Fr>. علّم ما أنجزته.
          </p>
        </div>
      </header>

      <section className="card space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">مهام اليوم</h2>
          <span className="text-sm text-slate-500" dir="ltr">
            {doneCount} / {plan.length}
          </span>
        </div>
        <ProgressBar value={plan.length ? doneCount / plan.length : 0} label="تقدم مهام اليوم" />
        <ul className="space-y-2">
          {plan.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700"
            >
              <button
                type="button"
                onClick={() => toggle(p.id)}
                aria-label={checked[p.id] ? 'إلغاء التعليم' : 'علّم كمنجز'}
                className="shrink-0 text-indigo-600"
              >
                {checked[p.id] ? <Check className="h-6 w-6" /> : <Circle className="h-6 w-6 text-slate-400" />}
              </button>
              <Link href={p.href} className="min-w-0 flex-1">
                <p className={`font-semibold ${checked[p.id] ? 'text-slate-400 line-through' : ''}`}>{p.title}</p>
                <p className="text-xs text-slate-500">{p.hint}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="card space-y-3">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" />
          <h2 className="font-bold">الجاهزية التقديرية لـ B2</h2>
          <span className="ms-auto text-xl font-extrabold" dir="ltr">
            {readiness.pct}%
          </span>
        </div>
        <ProgressBar value={readiness.pct / 100} label="الجاهزية" />
        <p className="text-sm">{status}</p>
        <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
          {readiness.levels.map((l) => (
            <li key={l.code} className="flex items-center justify-between">
              <Fr>{l.code}</Fr>
              <span dir="ltr">{Math.round(l.ratio * 100)}%</span>
            </li>
          ))}
          <li className="flex items-center justify-between">
            <span>أفضل نتيجة في محاكاة الفهم</span>
            <span dir="ltr">{Math.round(readiness.exam * 100)}%</span>
          </li>
        </ul>
        <p className="text-xs text-slate-500">
          تقدير بسيط: 60٪ من إتقان الدروس والاختبارات و40٪ من نتائج محاكاة الفهم المسموع والمقروء. ولا
          يشمل الكتابة والشفهي. لا يعوّض الامتحان الحقيقي ولا رأي معلم.
        </p>
      </section>
    </div>
  );
}
