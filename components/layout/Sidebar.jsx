'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck, GraduationCap, Landmark, Layers, PenLine, RotateCcw, Timer } from 'lucide-react';
import Fr from '@/components/Fr';
import { useProgress } from '@/components/ProgressProvider';
import { NAV_ITEMS, isActivePath } from './navItems';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
        <GraduationCap className="h-5 w-5" />
      </span>
      <span className="leading-tight">
        <Fr className="block text-base font-extrabold">Parlons Français</Fr>
        <span className="block text-xs text-slate-500 dark:text-slate-400">
          تعلّم الفرنسية خطوة بخطوة
        </span>
      </span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { resetProgress, mistakesCount } = useProgress();

  const handleReset = () => {
    if (window.confirm('هل تريد حذف كل تقدمك والبدء من جديد؟')) resetProgress();
  };

  return (
    <aside className="fixed inset-y-0 start-0 z-30 hidden w-64 flex-col border-e border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-900 lg:flex">
      <div className="px-2">
        <Logo />
      </div>

      <nav className="mt-8 flex-1 space-y-1" aria-label="التنقل الرئيسي">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = isActivePath(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}

        <Link
          href="/review"
          aria-current={pathname.startsWith('/review') ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            pathname.startsWith('/review')
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="h-5 w-5" />
          مراجعة الأخطاء
          {mistakesCount > 0 && (
            <span className="ms-auto rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              {mistakesCount}
            </span>
          )}
        </Link>

        <Link
          href="/exam"
          aria-current={pathname.startsWith('/exam') ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            pathname.startsWith('/exam')
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Timer className="h-5 w-5" />
          محاكاة TCF IRN
        </Link>

        <Link
          href="/civic"
          aria-current={pathname.startsWith('/civic') ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            pathname.startsWith('/civic')
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Landmark className="h-5 w-5" />
          الامتحان المدني
        </Link>

        <Link
          href="/writing"
          aria-current={pathname.startsWith('/writing') ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            pathname.startsWith('/writing')
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <PenLine className="h-5 w-5" />
          التعبير الكتابي
        </Link>

        <Link
          href="/plan"
          aria-current={pathname.startsWith('/plan') ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            pathname.startsWith('/plan')
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <CalendarCheck className="h-5 w-5" />
          خطة اليوم
        </Link>

        <Link
          href="/flashcards"
          aria-current={pathname.startsWith('/flashcards') ? 'page' : undefined}
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            pathname.startsWith('/flashcards')
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="h-5 w-5" />
          بطاقات المفردات
        </Link>
      </nav>

      <button
        type="button"
        onClick={handleReset}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-slate-800"
      >
        <RotateCcw className="h-4 w-4" />
        إعادة تعيين التقدم
      </button>
    </aside>
  );
}
