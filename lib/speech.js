'use client';

import { useEffect, useState } from 'react';

// Web Speech API — SpeechSynthesis (intégré au navigateur)

export const isSpeechSupported = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

export function getFrenchVoices() {
  if (!isSpeechSupported()) return [];
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang && v.lang.toLowerCase().startsWith('fr'));
}

// Retire ce qui se lit mal à voix haute : "allé(e)" -> "allé", "il / elle" -> "il, elle"
function cleanForSpeech(text) {
  return text
    .replace(/\([^)]*\)/g, '')
    .replace(/\s*\/\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function speak(text, { rate = 0.9, voiceURI, onStart, onEnd, onError } = {}) {
  if (!isSpeechSupported()) return false;

  const synth = window.speechSynthesis;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(cleanForSpeech(text));
  utterance.lang = 'fr-FR';
  utterance.rate = rate;
  utterance.pitch = 1;

  const voices = getFrenchVoices();
  const voice = voiceURI
    ? voices.find((v) => v.voiceURI === voiceURI)
    : voices.find((v) => v.lang === 'fr-FR') || voices[0];
  if (voice) utterance.voice = voice;

  utterance.onstart = onStart || null;
  utterance.onend = onEnd || null;
  utterance.onerror = onError || null;

  synth.speak(utterance);
  return true;
}

export function stopSpeaking() {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}

// Les voix se chargent de façon asynchrone dans certains navigateurs.
export function useFrenchVoices() {
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!isSpeechSupported()) return undefined;
    const synth = window.speechSynthesis;
    const load = () => setVoices(getFrenchVoices());
    load();
    synth.addEventListener('voiceschanged', load);
    return () => synth.removeEventListener('voiceschanged', load);
  }, []);

  return voices;
}
