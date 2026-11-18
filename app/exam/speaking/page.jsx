'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, Mic, Square } from 'lucide-react';
import { EO_CONFIG } from '@/lib/expression-config';
import { SPEAKING_TASKS } from '@/lib/speaking-data';
import { pickFresh } from '@/lib/rotation';
import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// Une tâche de chaque type (1, 2, 3), en évitant les sujets déjà vus
const pick = () =>
  [1, 2, 3]
    .slice(0, EO_CONFIG.tasks)
    .map((type) => pickFresh(SPEAKING_TASKS.filter((t) => t.type === type), 1, `eo-t${type}`)[0]);

export default function SpeakingPage() {
  const [tasks, setTasks] = useState(null); // tiré après le montage (évite l'écart serveur/client)
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState('prep'); // prep | recording | done
  const [left, setLeft] = useState(EO_CONFIG.prepSeconds);
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState('');
  const [finished, setFinished] = useState(false);
  const recRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const task = tasks?.[index];
  const maxSeconds = EO_CONFIG.speakSeconds[index] ?? 180;

  const stopStream = () => streamRef.current?.getTracks().forEach((t) => t.stop());

  const stopRecording = () => {
    if (recRef.current && recRef.current.state !== 'inactive') recRef.current.stop();
  };

  const startRecording = async () => {
    setError('');
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
        setError('متصفحك لا يدعم التسجيل الصوتي.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || 'audio/webm' });
        setAudioUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return URL.createObjectURL(blob);
        });
        stopStream();
        setStage('done');
      };
      recRef.current = rec;
      rec.start();
      setLeft(maxSeconds);
      setStage('recording');
    } catch {
      setError('لم أتمكن من الوصول إلى الميكروفون. اسمح للموقع باستعماله من إعدادات المتصفح.');
    }
  };

  // Compte à rebours : préparation puis enregistrement
  useEffect(() => {
    if (stage === 'done') return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          if (stage === 'prep') setTimeout(startRecording, 0);
          else setTimeout(stopRecording, 0);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, index]);

  useEffect(
    () => () => {
      stopRecording();
      stopStream();
    },
    [],
  );

  useEffect(() => {
    setTasks((t) => t ?? pick());
  }, []);

  const next = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    if (index + 1 >= tasks.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setStage('prep');
    setLeft(EO_CONFIG.prepSeconds);
  };

  const restart = () => {
    setTasks(pick());
    setIndex(0);
    setStage('prep');
    setLeft(EO_CONFIG.prepSeconds);
    setFinished(false);
  };

  if (!tasks) return null;

  if (finished) {
    return (
      <div className="mx-auto max-w-2xl space-y-5">
        <h1 className="text-2xl font-extrabold">انتهى التدرّب الشفهي</h1>
        <p className="text-slate-600 dark:text-slate-300">
          لا يوجد تصحيح آلي لنطقك. الأفضل أن تسمع تسجيلاتك وتقارنها بالنماذج، أو تعرضها على معلم أو
          متحدث أصلي.
        </p>
        <button type="button" onClick={restart} className="btn btn-primary">
          أعد بمواضيع جديدة
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Link href="/exam" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-indigo-600">
        <ArrowRight className="h-4 w-4" />
        محاكاة TCF IRN
      </Link>
      <h1 className="text-2xl font-extrabold">
        محاكاة التعبير الشفهي · {index + 1}/{tasks.length}
      </h1>

      <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="leading-relaxed">
          الامتحان الرسمي: 10 دقائق و3 أسئلة مع ممتحن. أما توزيع الوقت بين الأسئلة فتقريبي. التسجيل يبقى
          على جهازك ولا يُرفع.
        </p>
      </div>

      <section className="card space-y-3">
        <Fr className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-bold dark:bg-slate-800">
          {task.level}
        </Fr>
        <h2 className="font-bold">{task.title}</h2>
        <p dir="ltr" lang="fr" className="text-left font-semibold leading-relaxed">
          {task.prompt}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{task.instructions}</p>
      </section>

      {stage === 'prep' && (
        <div className="card space-y-3 text-center">
          <p className="text-sm text-slate-500">وقت التحضير</p>
          <p dir="ltr" className="text-4xl font-extrabold tabular-nums">{fmt(left)}</p>
          <button type="button" onClick={startRecording} className="btn btn-primary">
            <Mic className="h-4 w-4" />
            ابدأ التسجيل الآن
          </button>
        </div>
      )}

      {stage === 'recording' && (
        <div className="card space-y-3 text-center">
          <p className="inline-flex items-center gap-2 font-bold text-rose-600">
            <span className="h-3 w-3 animate-pulse rounded-full bg-rose-600" />
            يتم التسجيل
          </p>
          <p dir="ltr" className="text-4xl font-extrabold tabular-nums">{fmt(left)}</p>
          <button type="button" onClick={stopRecording} className="btn btn-primary">
            <Square className="h-4 w-4" />
            إنهاء التسجيل
          </button>
        </div>
      )}

      {error && <p className="rounded-xl bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-950 dark:text-rose-200">{error}</p>}

      {stage === 'done' && (
        <section className="card space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold">تسجيلك</h3>
            {audioUrl && <audio controls src={audioUrl} className="w-full" />}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">نموذج إجابة</h3>
              <SpeakButton text={task.model} size="sm" />
            </div>
            <p dir="ltr" lang="fr" className="rounded-xl bg-emerald-50 p-3 text-left leading-relaxed dark:bg-emerald-950/30">
              {task.model}
            </p>
          </div>
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
            {task.tips.map((t) => (
              <li key={t}>• {t}</li>
            ))}
          </ul>
          <button type="button" onClick={next} className="btn btn-primary w-full">
            {index + 1 >= tasks.length ? 'إنهاء' : 'المهمة التالية'}
          </button>
        </section>
      )}
    </div>
  );
}
