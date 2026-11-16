'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { PRONUNCIATION_GROUPS } from '@/lib/data';
import { isSpeechSupported, useFrenchVoices } from '@/lib/speech';
import Fr from '@/components/Fr';
import SpeakButton from '@/components/SpeakButton';

const SPEEDS = [
  { key: 'normal', label: 'عادية', rate: 0.9 },
  { key: 'slow', label: 'بطيئة', rate: 0.6 },
];

export default function PronunciationPage() {
  const voices = useFrenchVoices();
  const [groupId, setGroupId] = useState(PRONUNCIATION_GROUPS[0].id);
  const [speed, setSpeed] = useState('normal');
  const [voiceURI, setVoiceURI] = useState('');
  const [supported, setSupported] = useState(true);

  // Détection côté client uniquement (évite un écart d'hydratation)
  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  const group = PRONUNCIATION_GROUPS.find((g) => g.id === groupId);
  const rate = SPEEDS.find((s) => s.key === speed).rate;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-extrabold sm:text-3xl">النطق والاستماع</h1>
        <p className="text-slate-500 dark:text-slate-400">
          اضغط على زر الصوت واستمع، ثم كرّر الجملة بصوت عالٍ عدة مرات.
        </p>
      </header>

      {!supported && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            متصفحك لا يدعم ميزة النطق (SpeechSynthesis). جرّب Chrome أو Edge أو Safari.
          </p>
        </div>
      )}

      <section className="card flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold">سرعة النطق</p>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800" role="group">
            {SPEEDS.map((s) => (
              <button
                key={s.key}
                type="button"
                aria-pressed={speed === s.key}
                onClick={() => setSpeed(s.key)}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                  speed === s.key
                    ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {voices.length > 1 && (
          <label className="space-y-2 text-sm font-semibold">
            <span className="block">الصوت</span>
            <select
              value={voiceURI}
              onChange={(e) => setVoiceURI(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 sm:w-64"
            >
              <option value="">الصوت الافتراضي</option>
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </label>
        )}
      </section>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="مجموعات النطق">
        {PRONUNCIATION_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            role="tab"
            aria-selected={groupId === g.id}
            onClick={() => setGroupId(g.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              groupId === g.id
                ? 'bg-indigo-600 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {g.titleAr}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {group.items.map((item) => (
          <li key={item.fr} className="card flex items-center justify-between gap-4 !p-4">
            <div className="min-w-0 space-y-1">
              <p className="text-xl font-bold">
                <Fr>{item.fr}</Fr>
              </p>
              {item.ipa && (
                <p className="text-sm text-indigo-600 dark:text-indigo-300">
                  <Fr>{item.ipa}</Fr>
                </p>
              )}
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.ar}</p>
              {item.tip && (
                <p className="flex items-start gap-1.5 pt-1 text-sm text-slate-600 dark:text-slate-300">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
                  {item.tip}
                </p>
              )}
            </div>
            <SpeakButton text={item.fr} rate={rate} voiceURI={voiceURI || undefined} size="lg" />
          </li>
        ))}
      </ul>
    </div>
  );
}
