import { CheckCircle2, XCircle } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// result = null (pas encore répondu) ou { correct, given }
export default function MCQQuestion({ question, result, onAnswer }) {
  const answered = Boolean(result);

  return (
    <div className="space-y-3">
      {question.options.map((option, i) => {
        const isCorrect = i === question.answer;
        const isPicked = result?.given === i;

        let style =
          'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800';
        if (answered) {
          if (isCorrect) {
            style =
              'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100';
          } else if (isPicked) {
            style =
              'animate-shake border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100';
          } else {
            style = 'border-slate-200 bg-white opacity-60 dark:border-slate-800 dark:bg-slate-900';
          }
        }

        return (
          <button
            key={option}
            type="button"
            disabled={answered}
            onClick={() => onAnswer(isCorrect, i)}
            className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-start font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${style}`}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {LETTERS[i]}
            </span>
            <span dir="auto" className="flex-1">
              {option}
            </span>
            {answered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
            {answered && isPicked && !isCorrect && <XCircle className="h-5 w-5 text-rose-600" />}
          </button>
        );
      })}
    </div>
  );
}
