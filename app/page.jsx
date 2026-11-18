'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BookOpenCheck, ClipboardCheck, Flame, Headphones, RotateCcw, Trophy, Zap } from 'lucide-react';
import { LESSONS, QUIZZES, WORDS_OF_THE_DAY } from '@/lib/data';
import { useProgress } from '@/components/ProgressProvider';
import LevelHero from '@/components/dashboard/LevelHero';
import StatCard from '@/components/dashboard/StatCard';
import DailyGoalCard from '@/components/dashboard/DailyGoalCard';
import WordOfTheDay from '@/components/dashboard/WordOfTheDay';
import ModuleCard from '@/components/ModuleCard';
import LevelPath from '@/components/dashboard/LevelPath';
import ReminderCard from '@/components/ReminderCard';
import Xp from '@/components/Xp';
import InstallCard from '@/components/InstallCard';

export default function DashboardPage() {
  const {
    xp,
    level,
    currentStreak,
    todayXp,
    dailyGoal,
    completedLessons,
    quizResults,
    mistakesCount,
    placement,
    ready,
  } = useProgress();
  const [word, setWord] = useState(null);

  // Calculé côté client pour éviter un écart serveur/client à minuit
  useEffect(() => {
    const day = Math.floor(Date.now() / 86400000);
    setWord(WORDS_OF_THE_DAY[day % WORDS_OF_THE_DAY.length]);
  }, []);

  const nextLesson = LESSONS.find((l) => !completedLessons.includes(l.id));
  const quizzesTaken = Object.keys(quizResults).length;

  return (
    <div className="space-y-6">
      <LevelHero level={level} nextLesson={nextLesson} />

      {ready && (
        <Link
          href="/placement"
          className="card flex items-center justify-between gap-4 border-indigo-200 bg-indigo-50 transition hover:border-indigo-300 dark:border-indigo-900 dark:bg-indigo-950/40"
        >
          <div>
            <h2 className="font-bold">
              {placement ? 'أعد اختبار تحديد المستوى' : 'لا تعرف مستواك؟ حدّده في 5 دقائق'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {placement ? (
                <>
                  نتيجتك السابقة: <span dir="ltr" className="inline-block font-bold">{placement.level}</span>{' '}
                  ({placement.score}/{placement.total} إجابة صحيحة).
                </>
              ) : (
                '20 سؤالاً من A1 إلى C1، وتبدأ بعدها من المستوى المناسب لك.'
              )}
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
            ابدأ
          </span>
        </Link>
      )}

      <Link
        href="/exam"
        className="card flex items-center justify-between gap-4 transition hover:border-indigo-300 dark:hover:border-indigo-700"
      >
        <div>
          <h2 className="font-bold">تحضير للجنسية؟ جرّب محاكاة TCF IRN</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            فهم مسموع ومقروء بنفس عدد الأسئلة والمدة، مع تقدير تقريبي للمستوى.
          </p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-indigo-600 dark:text-indigo-300">
          ابدأ
        </span>
      </Link>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/plan"
          className="card border-indigo-300 bg-indigo-50 transition hover:border-indigo-400 dark:border-indigo-800 dark:bg-indigo-950/40"
        >
          <h2 className="font-bold">خطة اليوم</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            مهام يومية مرتبة حسب تقدمك، وتقدير لجاهزيتك لـ B2.
          </p>
        </Link>
        <Link
          href="/flashcards"
          className="card transition hover:border-indigo-300 dark:hover:border-indigo-700"
        >
          <h2 className="font-bold">بطاقات المفردات</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            مراجعة المفردات بالتكرار المتباعد لتثبّتها في الذاكرة.
          </p>
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/civic"
          className="card transition hover:border-indigo-300 dark:hover:border-indigo-700"
        >
          <h2 className="font-bold">الامتحان المدني</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            40 سؤالاً تدريبياً عن فرنسا ومؤسساتها وتاريخها.
          </p>
        </Link>
        <Link
          href="/writing"
          className="card transition hover:border-indigo-300 dark:hover:border-indigo-700"
        >
          <h2 className="font-bold">التعبير الكتابي</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            اكتب نصاً واحصل على تحليل فوري ونموذج إجابة.
          </p>
        </Link>
      </div>

      <LevelPath levels={level.all} currentCode={level.code} />

      <section aria-label="إحصائياتك" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          Icon={Zap}
          label="مجموع النقاط"
          value={<Xp value={xp} />}
          tint="bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300"
        />
        <StatCard
          Icon={Flame}
          label="أيام متتالية"
          value={currentStreak}
          tint="bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-300"
        />
        <StatCard
          Icon={BookOpenCheck}
          label="دروس مكتملة"
          value={`${completedLessons.length}/${LESSONS.length}`}
          tint="bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300"
        />
        <StatCard
          Icon={ClipboardCheck}
          label="اختبارات مُجرَّبة"
          value={`${quizzesTaken}/${QUIZZES.length}`}
          tint="bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300"
        />
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <DailyGoalCard todayXp={todayXp} goal={dailyGoal} />
        <WordOfTheDay word={word} />
      </div>

      {mistakesCount > 0 && (
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
                لديك {mistakesCount} {mistakesCount === 1 ? 'سؤال' : 'أسئلة'} تحتاج مراجعة.
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold text-rose-600 dark:text-rose-300">راجع الآن</span>
        </Link>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">الوحدات التعليمية</h2>
          <Link
            href="/lessons"
            className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
          >
            عرض الكل
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LESSONS.slice(0, 6).map((lesson) => (
            <ModuleCard
              key={lesson.id}
              lesson={lesson}
              completed={completedLessons.includes(lesson.id)}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <ReminderCard />
        <InstallCard />
      </div>

      <section className="card flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">جاهز للتحدي؟</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              كل إجابة صحيحة تمنحك <Xp value={5} />، والعلامة الكاملة تمنحك مكافأة إضافية.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/quiz" className="btn btn-primary">
            ابدأ اختباراً
          </Link>
          <Link href="/listening" className="btn btn-secondary">
            <Headphones className="h-4 w-4" />
            تمرين استماع
          </Link>
        </div>
      </section>
    </div>
  );
}
