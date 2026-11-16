import { Sparkles } from 'lucide-react';
import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';

export default function WordOfTheDay({ word }) {
  if (!word) return <section className="card min-h-[180px]" aria-hidden="true" />;

  return (
    <section className="card space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-violet-600 dark:text-violet-300">
        <Sparkles className="h-4 w-4" />
        كلمة اليوم
      </div>

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-extrabold">
            <Fr>{word.fr}</Fr>
          </p>
          <p className="text-slate-500 dark:text-slate-400">{word.ar}</p>
        </div>
        <SpeakButton text={word.fr} size="lg" />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
        <div className="min-w-0 text-sm">
          <Fr className="font-semibold">{word.example}</Fr>
          <p className="text-slate-500 dark:text-slate-400">{word.exampleAr}</p>
        </div>
        <SpeakButton text={word.example} size="sm" />
      </div>
    </section>
  );
}
