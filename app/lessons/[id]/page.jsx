'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardCheck, Sparkles } from 'lucide-react';
import { LESSONS } from '@/lib/data';
import { CATEGORIES } from '@/lib/categories';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';
import Xp from '@/components/Xp';
import { fixBidi } from '@/lib/bidi';
import VocabList from '@/components/lesson/VocabList';
import RuleBlock from '@/components/lesson/RuleBlock';
import ConjugationTable from '@/components/lesson/ConjugationTable';

export default function LessonPage() {
  const { id } = useParams();
  const { completedLessons, completeLesson } = useProgress();
  // On retient l'id du leçon pour ne pas afficher le message sur les autres leçons
  const [earnedId, setEarnedId] = useState(null);

  const index = LESSONS.findIndex((l) => l.id === id);
  const lesson = LESSONS[index];

  if (!lesson) {
    return (
      <div className="card space-y-3 text-center">
        <h1 className="text-xl font-bold">الدرس غير موجود</h1>
        <Link href="/lessons" className="btn btn-primary">
          العودة إلى الدروس
        </Link>
      </div>
    );
  }

  const cat = CATEGORIES[lesson.category];
  const completed = completedLessons.includes(lesson.id);
  const justEarned = earnedId === lesson.id;
  const prev = LESSONS[index - 1];
  const next = LESSONS[index + 1];

  const handleComplete = () => {
    if (completed) return;
    completeLesson(lesson.id, lesson.xp);
    setEarnedId(lesson.id);
  };

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-500 dark:text-slate-400" aria-label="مسار التنقل">
        <Link href="/lessons" className="hover:underline">
          الدروس
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-slate-700 dark:text-slate-200">{lesson.titleAr}</span>
      </nav>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cat.badge}`}>
            {cat.label}
          </span>
          <Fr className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {lesson.level}
          </Fr>
        </div>
        <h1 className="text-3xl font-extrabold">
          <Fr>{lesson.title}</Fr>
        </h1>
        <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
          {fixBidi(lesson.titleAr)}
        </p>
        <p className="max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300">
          {fixBidi(lesson.intro)}
        </p>
      </header>

      {lesson.vocab && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold">المفردات</h2>
          <VocabList items={lesson.vocab} />
        </section>
      )}

      {lesson.conjugation && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold">جداول التصريف</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {lesson.conjugation.map((tense) => (
              <ConjugationTable key={tense.title} tense={tense} />
            ))}
          </div>
        </section>
      )}

      {lesson.rules && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold">القواعد والأمثلة</h2>
          <div className="space-y-4">
            {lesson.rules.map((rule) => (
              <RuleBlock key={rule.title} rule={rule} />
            ))}
          </div>
        </section>
      )}

      <section className="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {completed ? (
          <p className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            {justEarned ? (
              <span>
                أحسنت! حصلت على <Xp value={lesson.xp} plus />
              </span>
            ) : (
              'أكملت هذا الدرس'
            )}
          </p>
        ) : (
          <p className="text-slate-600 dark:text-slate-300">
            أنهيت القراءة؟ أكمل الدرس لتحصل على <Xp value={lesson.xp} />.
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {!completed && (
            <button type="button" onClick={handleComplete} className="btn btn-primary">
              <Sparkles className="h-4 w-4" />
              أكملت الدرس
            </button>
          )}
          <Link href={`/quiz/${lesson.quizId}`} className="btn btn-secondary">
            <ClipboardCheck className="h-4 w-4" />
            اختبر نفسك
          </Link>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3">
        {prev ? (
          <Link href={`/lessons/${prev.id}`} className="btn btn-secondary">
            <ArrowRight className="h-4 w-4" />
            السابق
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/lessons/${next.id}`} className="btn btn-secondary">
            التالي
            <ArrowLeft className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
