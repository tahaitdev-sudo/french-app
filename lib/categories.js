import { BookOpen, Languages, Repeat } from 'lucide-react';

// Les classes Tailwind sont écrites en entier pour que le JIT les détecte.
export const CATEGORIES = {
  vocabulary: {
    label: 'المفردات',
    Icon: Languages,
    badge: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
    iconBox: 'bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300',
  },
  grammar: {
    label: 'القواعد',
    Icon: BookOpen,
    badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
    iconBox: 'bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300',
  },
  conjugation: {
    label: 'تصريف الأفعال',
    Icon: Repeat,
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
    iconBox: 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300',
  },
};
