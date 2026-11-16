// Petits signaux sonores générés avec Web Audio (aucun fichier audio requis)

let ctx = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(frequency, startAt, duration, type = 'sine', volume = 0.15) {
  const audio = getContext();
  if (!audio) return;

  const osc = audio.createOscillator();
  const gain = audio.createGain();
  const t0 = audio.currentTime + startAt;

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, t0);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export function playCorrect() {
  tone(523.25, 0, 0.15);
  tone(659.25, 0.12, 0.15);
  tone(783.99, 0.24, 0.25);
}

export function playWrong() {
  tone(220, 0, 0.18, 'sawtooth', 0.08);
  tone(165, 0.16, 0.28, 'sawtooth', 0.08);
}

export function playComplete() {
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, i * 0.12, 0.22));
}
