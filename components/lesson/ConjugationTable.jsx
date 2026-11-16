import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';

export default function ConjugationTable({ tense }) {
  return (
    <section className="card overflow-hidden !p-0">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/50">
        <h3 className="text-lg font-bold">
          <Fr>{tense.title}</Fr>
        </h3>
        {tense.meaning && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{tense.meaning}</p>
        )}
      </div>

      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {tense.rows.map(([pronoun, form]) => {
          const glue = pronoun.endsWith("'") ? '' : ' ';
          return (
            <li key={`${pronoun}-${form}`} className="flex items-center justify-between gap-3 px-5 py-2.5">
              <Fr className="text-base">
                <span className="text-slate-500 dark:text-slate-400">
                  {pronoun}
                  {glue}
                </span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300">{form}</span>
              </Fr>
              <SpeakButton text={`${pronoun}${glue}${form}`} size="sm" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
