import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Fr from '@/components/Fr';
import ProgressBar from '@/components/ProgressBar';

export default function LevelHero({ level, nextLesson }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -start-10 h-48 w-48 rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 end-1/4 h-32 w-32 rounded-full bg-white/10"
      />

      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-indigo-100">
            <Fr className="font-semibold">Bonjour !</Fr> مرحباً بك مجدداً
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            مستواك الحالي: <Fr>{level.code}</Fr>
            <span className="ms-2 text-xl font-semibold text-indigo-100">— {level.name}</span>
          </h1>

          <div className="max-w-md space-y-2 pt-2">
            <ProgressBar
              value={level.progress}
              label="إتقان محتوى المستوى الحالي"
              trackClassName="bg-white/25"
              barClassName="bg-white"
            />
            <p className="text-sm text-indigo-100">
              {level.isMax ? (
                'أتممت كل دروس واختبارات المستويات المتاحة. أحسنت!'
              ) : (
                <>
                  أنجزت{' '}
                  <span dir="ltr" className="inline-block tabular-nums">
                    {level.done} / {level.total}
                  </span>{' '}
                  من دروس واختبارات <Fr className="font-bold">{level.code}</Fr>. بقي {level.remaining}{' '}
                  للانتقال إلى <Fr className="font-bold">{level.next?.code}</Fr>.
                </>
              )}
            </p>
            <p className="text-xs text-indigo-200">
              الدرس يُحتسب بإكماله، والاختبار بنتيجة 70٪ فأكثر.
            </p>
          </div>
        </div>

        <Link
          href={nextLesson ? `/lessons/${nextLesson.id}` : '/lessons'}
          className="btn bg-white text-indigo-700 shadow-sm hover:bg-indigo-50"
        >
          {nextLesson ? 'متابعة التعلّم' : 'مراجعة الدروس'}
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
