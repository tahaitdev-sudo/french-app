'use client';

import { useState } from 'react';
import { LESSONS } from '@/lib/data';
import { CATEGORIES } from '@/lib/categories';
import { useProgress } from '@/components/ProgressProvider';
import ModuleCard from '@/components/ModuleCard';

const FILTERS = [
  { key: 'all', label: 'الكل' },
  ...Object.entries(CATEGORIES).map(([key, cat]) => ({ key, label: cat.label })),
];

export default function LessonsPage() {
  const { completedLessons } = useProgress();
  const [filter, setFilter] = useState('all');

  const visible = filter === 'all' ? LESSONS : LESSONS.filter((l) => l.category === filter);

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold sm:text-3xl">الدروس والقواعد</h1>
        <p className="text-slate-500 dark:text-slate-400">
          أكملت {completedLessons.length} من {LESSONS.length} دروس. اختر وحدة وابدأ.
        </p>
      </header>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="تصنيف الدروس">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={filter === key}
            onClick={() => setFilter(key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === key
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((lesson) => (
          <ModuleCard
            key={lesson.id}
            lesson={lesson}
            completed={completedLessons.includes(lesson.id)}
          />
        ))}
      </div>
    </div>
  );
}
