import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Fr from '@/components/Fr';
import { CATEGORIES } from '@/lib/categories';

export default function ModuleCard({ lesson, completed = false }) {
  const cat = CATEGORIES[lesson.category];
  const { Icon } = cat;

  return (
    <Link
      href={`/lessons/${lesson.id}`}
      className="card group flex h-full flex-col gap-4 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:hover:border-indigo-700"
    >
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${cat.iconBox}`}>
          <Icon className="h-5 w-5" />
        </span>

        {completed ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            مكتمل
          </span>
        ) : (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            +{lesson.xp} XP
          </span>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-bold">
          <Fr>{lesson.title}</Fr>
        </h3>
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{lesson.titleAr}</p>
        <p className="line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
          {lesson.description}
        </p>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className={`rounded-full px-2.5 py-1 font-semibold ${cat.badge}`}>{cat.label}</span>
        <Fr className="font-bold text-slate-500 dark:text-slate-400">{lesson.level}</Fr>
      </div>
    </Link>
  );
}
