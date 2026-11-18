'use client';

import Link from 'next/link';
import { ArrowLeft, RotateCcw, Star } from 'lucide-react';
import { QUIZZES } from '@/lib/data';
import { CATEGORIES } from '@/lib/categories';
import { useProgress } from '@/components/ProgressProvider';
import Fr from '@/components/Fr';

export default function QuizHubPage() {
  const { quizResults, mistakesCount } = useProgress();

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold sm:text-3xl">الاختبارات التفاعلية</h1>
        <p className="text-slate-500 dark:text-slate-400">
          أسئلة اختيار من متعدد وإكمال الفراغ، مع تصحيح فوري وشرح لكل إجابة.
        </p>
      </header>

      <Link
        href="/review"
        className="card flex items-center justify-between gap-4 border-rose-200 bg-rose-50 transition hover:border-rose-300 dark:border-rose-900 dark:bg-rose-950/40"
      >
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-200">
            <RotateCcw className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">مراجعة الأخطاء</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {mistakesCount > 0
                ? `لديك ${mistakesCount} ${mistakesCount === 1 ? 'سؤال' : 'أسئلة'} للمراجعة`
                : 'لا توجد أخطاء محفوظة حالياً'}
            </p>
          </div>
        </div>
        <ArrowLeft className="h-5 w-5 text-rose-500" />
      </Link>

      <Link
        href="/exam"
        className="card flex items-center justify-between gap-4 border-sky-200 bg-sky-50 transition hover:border-sky-300 dark:border-sky-900 dark:bg-sky-950/40"
      >
        <div>
          <h2 className="font-bold">محاكاة اختبار TCF IRN</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            20 سؤالاً للفهم المسموع (15 د) و20 للفهم المقروء (20 د)، ثم الكتابة والشفهي.
          </p>
        </div>
        <ArrowLeft className="h-5 w-5 shrink-0 text-sky-500" />
      </Link>


      <Link
        href="/civic"
        className="card flex items-center justify-between gap-4 border-emerald-200 bg-emerald-50 transition hover:border-emerald-300 dark:border-emerald-900 dark:bg-emerald-950/40"
      >
        <div>
          <h2 className="font-bold">الامتحان المدني</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">40 سؤالاً عن المبادئ والمؤسسات والتاريخ والحياة في فرنسا.</p>
        </div>
        <ArrowLeft className="h-5 w-5 shrink-0 text-emerald-500" />
      </Link>

      <Link
        href="/writing"
        className="card flex items-center justify-between gap-4 border-violet-200 bg-violet-50 transition hover:border-violet-300 dark:border-violet-900 dark:bg-violet-950/40"
      >
        <div>
          <h2 className="font-bold">التعبير الكتابي</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">ثمانية مواضيع من A1 إلى B2 مع تحليل تلقائي ونموذج إجابة.</p>
        </div>
        <ArrowLeft className="h-5 w-5 shrink-0 text-violet-500" />
      </Link>

      <div className="grid gap-4 sm:grid-cols-2">
        {QUIZZES.map((quiz) => {
          const cat = CATEGORIES[quiz.category];
          const { Icon } = cat;
          const res = quizResults[quiz.id];
          const total = quiz.questions.length;

          return (
            <Link
              key={quiz.id}
              href={`/quiz/${quiz.id}`}
              className="card group flex flex-col gap-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-700"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`grid h-11 w-11 place-items-center rounded-xl ${cat.iconBox}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <Fr className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {quiz.level}
                </Fr>
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-bold">
                  <Fr>{quiz.title}</Fr>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {quiz.titleAr} · {total} أسئلة
                </p>
              </div>

              <div className="flex items-center justify-between text-sm">
                {res ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                    <Star className="h-4 w-4" />
                    أفضل نتيجة: {res.best}/{total}
                  </span>
                ) : (
                  <span className="text-slate-400">لم تجرّبه بعد</span>
                )}
                <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                  ابدأ
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
