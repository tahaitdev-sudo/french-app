// Rappel quotidien : réglages dans localStorage + affichage de la notification

const KEY = 'fr-reminder-v1';

export const REMINDER_DEFAULTS = { enabled: false, time: '20:00', lastNotified: null };

export const isNotificationSupported = () =>
  typeof window !== 'undefined' && 'Notification' in window;

export function loadReminder() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...REMINDER_DEFAULTS, ...JSON.parse(raw) } : { ...REMINDER_DEFAULTS };
  } catch {
    return { ...REMINDER_DEFAULTS };
  }
}

export function saveReminder(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* stockage indisponible */
  }
}

export function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Minutes écoulées depuis minuit pour une heure "HH:MM"
export function minutesOf(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export async function showReminder(streak = 0) {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return false;

  const title = 'Parlons Français';
  const options = {
    body:
      streak > 0
        ? `سلسلتك ${streak} ${streak === 1 ? 'يوم' : 'أيام'}، لا تدعها تنقطع! خصّص بضع دقائق للتعلّم الآن.`
        : 'حان وقت التعلّم! بضع دقائق اليوم تصنع الفرق.',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    lang: 'ar',
    dir: 'rtl',
    tag: 'daily-reminder',
  };

  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg) {
      await reg.showNotification(title, options);
    } else {
      new Notification(title, options);
    }
    return true;
  } catch {
    return false;
  }
}
