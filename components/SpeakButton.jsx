'use client';

import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { isSpeechSupported, speak } from '@/lib/speech';

// Bouton d'écoute basé sur SpeechSynthesis (Web Speech API)
export default function SpeakButton({
  text,
  rate = 0.9,
  voiceURI,
  size = 'md',
  label = 'استمع إلى النطق',
  className = '',
}) {
  const [supported, setSupported] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setSupported(isSpeechSupported());
  }, []);

  if (!supported) return null;

  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
  };
  const iconSizes = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-7 w-7' };

  const handleClick = () => {
    speak(text, {
      rate,
      voiceURI,
      onStart: () => setPlaying(true),
      onEnd: () => setPlaying(false),
      onError: () => setPlaying(false),
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`${label}: ${text}`}
      title={label}
      className={`grid shrink-0 place-items-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${sizes[size]} ${
        playing
          ? 'bg-indigo-600 text-white'
          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900'
      } ${className}`}
    >
      <Volume2 className={`${iconSizes[size]} ${playing ? 'animate-pulse' : ''}`} />
    </button>
  );
}
