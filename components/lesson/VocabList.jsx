import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';

export default function VocabList({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.fr} className="card flex items-center justify-between gap-3 !p-4">
          <div className="min-w-0">
            <p className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
              <Fr>{item.fr}</Fr>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.ar}</p>
          </div>
          <SpeakButton text={item.fr} />
        </li>
      ))}
    </ul>
  );
}
