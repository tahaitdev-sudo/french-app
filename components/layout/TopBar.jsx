'use client';

import { Flame, Zap } from 'lucide-react';
import Fr from '@/components/Fr';
import Xp from '@/components/Xp';
import ThemeToggle from '@/components/ThemeToggle';
import { useProgress } from '@/components/ProgressProvider';
import { Logo } from './Sidebar';

function Chip({ children, className }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold tabular-nums ${className}`}
    >
      {children}
    </span>
  );
}

export default function TopBar() {
  const { level, xp, currentStreak } = useProgress();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="hidden text-sm font-semibold text-slate-500 dark:text-slate-400 lg:block">
          المستوى الحالي: <Fr className="font-bold text-indigo-600 dark:text-indigo-400">{level.code}</Fr>
        </div>

        <div className="flex items-center gap-2">
          <Chip className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            <Zap className="h-4 w-4" />
            <Xp value={xp} />
          </Chip>
          <Chip className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
            <Flame className="h-4 w-4" />
            {currentStreak}
          </Chip>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
