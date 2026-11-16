'use client';

import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import Fr from '@/components/Fr';

// Normalisation : minuscules, apostrophes typographiques, espaces multiples
const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

// result = null (pas encore répondu) ou { correct, given }
export default function FillBlankQuestion({ question, result, onAnswer }) {
  const [value, setValue] = useState('');
  const answered = Boolean(result);
  const [before, after = ''] = question.prompt.split('___');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answered || !value.trim()) return;
    const accepted = [question.answer, ...(question.accept || [])].map(normalize);
    onAnswer(accepted.includes(normalize(value)), value.trim());
  };

  let tone =
    'border-slate-300 bg-white focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900';
  if (answered) {
    tone = result.correct
      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100'
      : 'animate-shake border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950 dark:text-rose-100';
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p lang="fr" dir="ltr" className="text-xl font-semibold leading-[3.2rem]">
        {before}
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={answered}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="اكتب الكلمة الناقصة"
          style={{ width: `${Math.max(5, question.answer.length + 3)}ch` }}
          className={`mx-1 inline-block rounded-lg border-2 px-2 py-1 text-center align-middle text-lg font-bold outline-none transition ${tone}`}
        />
        {after}
      </p>

      {question.hint && !answered && (
        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          تلميح: {question.hint}
        </p>
      )}

      {!answered && (
        <button type="submit" disabled={!value.trim()} className="btn btn-primary">
          تحقق من الإجابة
        </button>
      )}

      {answered && !result.correct && (
        <p className="text-sm text-slate-600 dark:text-slate-300">
          الإجابة الصحيحة: <Fr className="font-bold text-emerald-600 dark:text-emerald-400">{question.answer}</Fr>
        </p>
      )}
    </form>
  );
}
