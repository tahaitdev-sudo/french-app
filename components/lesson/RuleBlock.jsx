import { Lightbulb } from 'lucide-react';
import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';
import { fixBidi } from '@/lib/bidi';

export default function RuleBlock({ rule }) {
  return (
    <article className="card space-y-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
          <Lightbulb className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <h3 className="text-lg font-bold">{rule.title}</h3>
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">{fixBidi(rule.body)}</p>
        </div>
      </div>

      {rule.examples?.length > 0 && (
        <ul className="space-y-2">
          {rule.examples.map((ex) => (
            <li
              key={ex.fr}
              className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
            >
              <div className="min-w-0">
                <Fr className="font-semibold">{ex.fr}</Fr>
                <p className="text-sm text-slate-500 dark:text-slate-400">{ex.ar}</p>
              </div>
              <SpeakButton text={ex.fr} size="sm" />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
