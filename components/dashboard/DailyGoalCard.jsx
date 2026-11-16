import { Target } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';

export default function DailyGoalCard({ todayXp, goal }) {
  const done = todayXp >= goal;

  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
            <Target className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-bold">الهدف اليومي</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">اجمع {goal} XP كل يوم</p>
          </div>
        </div>
        <p className="text-lg font-extrabold tabular-nums">
          {Math.min(todayXp, goal)}
          <span className="text-sm font-semibold text-slate-400"> / {goal}</span>
        </p>
      </div>

      <ProgressBar
        value={todayXp / goal}
        label="التقدم اليومي"
        barClassName="bg-emerald-500"
      />

      <p className="text-sm text-slate-600 dark:text-slate-300">
        {done
          ? 'أنجزت هدف اليوم، عمل رائع! استمر للحفاظ على سلسلتك.'
          : todayXp === 0
            ? 'لم تبدأ بعد اليوم. درس واحد أو اختبار سريع يكفي للبداية.'
            : `بقي ${goal - todayXp} XP لإكمال هدف اليوم.`}
      </p>
    </section>
  );
}
