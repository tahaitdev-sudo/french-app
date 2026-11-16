'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, Volume2, VolumeX, XCircle } from 'lucide-react';
import { PERFECT_BONUS, XP_PER_CORRECT } from '@/lib/levels';
import { playComplete, playCorrect, playWrong } from '@/lib/sounds';
import { useProgress } from '@/components/ProgressProvider';
import ProgressBar from '@/components/ProgressBar';
import SpeakButton from '@/components/SpeakButton';
import MCQQuestion from './MCQQuestion';
import FillBlankQuestion from './FillBlankQuestion';
import QuizResult from './QuizResult';

function Feedback({ question, result }) {
  const ok = result.correct;
  // Phrase complète à écouter pour les exercices à trous
  const sentence = question.type === 'fill' ? question.prompt.replace('___', question.answer) : null;

  return (
    <div
      role="status"
      className={`animate-pop space-y-2 rounded-xl border p-4 ${
        ok
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100'
          : 'border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-100'
      }`}
    >
      <p className="flex items-center gap-2 font-bold">
        {ok ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
        {ok ? `إجابة صحيحة! +${XP_PER_CORRECT} XP` : 'إجابة خاطئة'}
      </p>
      {question.explanation && <p className="text-sm leading-relaxed">{question.explanation}</p>}
      {sentence && (
        <div className="flex items-center gap-2 pt-1">
          <SpeakButton text={sentence} size="sm" />
          <span lang="fr" dir="ltr" className="text-sm font-semibold">
            {sentence}
          </span>
        </div>
      )}
    </div>
  );
}

// review = true : mode « révision des erreurs » (les XP ne comptent pas comme un quiz de plus)
export default function QuizEngine({ quiz, onRetry, review = false }) {
  const { recordQuiz, addXp, recordMistake, resolveMistake } = useProgress();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [finished, setFinished] = useState(null);
  const [soundOn, setSoundOn] = useState(true);

  const total = quiz.questions.length;
  const question = quiz.questions[index];
  const isLast = index + 1 === total;

  const handleAnswer = (correct, given) => {
    if (result) return;
    setResult({ correct, given });
    if (correct) {
      setScore((s) => s + 1);
      resolveMistake(question.id);
    } else {
      recordMistake(question.id, question.quizId ?? quiz.id);
    }
    if (soundOn) (correct ? playCorrect : playWrong)();
  };

  const handleNext = () => {
    if (!isLast) {
      setIndex((i) => i + 1);
      setResult(null);
      return;
    }
    let earned;
    if (review) {
      earned = score * XP_PER_CORRECT + (score === total ? PERFECT_BONUS : 0);
      addXp(earned);
    } else {
      earned = recordQuiz(quiz.id, score, total);
    }
    setFinished({ earned });
    if (soundOn) playComplete();
  };

  if (finished) {
    return (
      <QuizResult
        quiz={quiz}
        score={score}
        total={total}
        earned={finished.earned}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <ProgressBar
          value={(index + (result ? 1 : 0)) / total}
          label="تقدم الاختبار"
          className="flex-1"
        />
        <span className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
          {index + 1}/{total}
        </span>
        <button
          type="button"
          onClick={() => setSoundOn((v) => !v)}
          aria-label={soundOn ? 'إيقاف المؤثرات الصوتية' : 'تشغيل المؤثرات الصوتية'}
          className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </button>
      </div>

      <div key={question.id} className="card animate-pop space-y-5">
        <p className="text-xs font-bold tracking-wide text-indigo-600 dark:text-indigo-400">
          {question.type === 'mcq' ? 'اختر الإجابة الصحيحة' : 'أكمل الفراغ'}
        </p>

        {question.type === 'mcq' && (
          <h2 dir="auto" className="text-xl font-bold leading-relaxed">
            {question.prompt}
          </h2>
        )}

        {question.type === 'mcq' ? (
          <MCQQuestion question={question} result={result} onAnswer={handleAnswer} />
        ) : (
          <FillBlankQuestion question={question} result={result} onAnswer={handleAnswer} />
        )}

        {result && <Feedback question={question} result={result} />}
      </div>

      {result && (
        <button type="button" onClick={handleNext} className="btn btn-primary w-full">
          {isLast ? 'عرض النتيجة' : 'السؤال التالي'}
          <ArrowLeft className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
