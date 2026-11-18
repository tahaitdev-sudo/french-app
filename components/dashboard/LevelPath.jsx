import { CheckCircle2 } from 'lucide-react';
import Fr from '@/components/Fr';
import ProgressBar from '@/components/ProgressBar';

// Carte du parcours : A1 → C2 avec la maîtrise de chaque niveau
export default function LevelPath({ levels, currentCode }) {
  return (
    <section aria-label="خريطة المستويات" className="card space-y-4">
      <h2 className="font-bold">خريطة المستويات</h2>

      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {levels.map((lvl) => {
          const current = lvl.code === currentCode;
          return (
            <li
              key={lvl.code}
              aria-current={current ? 'step' : undefined}
              className={`space-y-2 rounded-xl border p-3 ${
                current
                  ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/50'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <Fr className="text-lg font-extrabold">{lvl.code}</Fr>
                {lvl.mastered && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{lvl.name}</p>
              <ProgressBar
                value={lvl.ratio}
                label={`إتقان ${lvl.code}`}
                barClassName={lvl.mastered ? 'bg-emerald-500' : 'bg-indigo-600'}
              />
              <p className="text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-300">
                <span dir="ltr" className="inline-block">
                  {lvl.done}/{lvl.total}
                </span>
                {lvl.skipped && (
                  <span className="ms-1 font-normal text-slate-400">(تجاوز)</span>
                )}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
