'use client';

import { useEffect, useState } from 'react';
import { Bell, BellOff, Send } from 'lucide-react';
import { useProgress } from '@/components/ProgressProvider';
import {
  REMINDER_DEFAULTS,
  isNotificationSupported,
  loadReminder,
  saveReminder,
  showReminder,
} from '@/lib/reminder';

export default function ReminderCard() {
  const { currentStreak } = useProgress();
  const [settings, setSettings] = useState(REMINDER_DEFAULTS);
  const [supported, setSupported] = useState(true);
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    const ok = isNotificationSupported();
    setSupported(ok);
    if (ok) setPermission(Notification.permission);
    setSettings(loadReminder());
  }, []);

  const update = (patch) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveReminder(next);
  };

  const toggle = async () => {
    if (settings.enabled) {
      update({ enabled: false });
      return;
    }

    let current = Notification.permission;
    if (current === 'default') current = await Notification.requestPermission();
    setPermission(current);

    // lastNotified remis à zéro pour pouvoir tester l'heure du jour même
    if (current === 'granted') update({ enabled: true, lastNotified: null });
  };

  const sendTest = async () => {
    await showReminder(currentStreak);
  };

  const blocked = permission === 'denied';

  return (
    <section className="card space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300">
            {settings.enabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </span>
          <div>
            <h2 className="font-bold">التذكير اليومي</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">للحفاظ على سلسلة أيامك</p>
          </div>
        </div>

        {supported && (
          <button
            type="button"
            role="switch"
            aria-checked={settings.enabled}
            aria-label="تفعيل التذكير اليومي"
            disabled={blocked}
            onClick={toggle}
            className={`relative h-7 w-12 shrink-0 rounded-full transition disabled:opacity-50 ${
              settings.enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                settings.enabled ? 'end-1' : 'start-1'
              }`}
            />
          </button>
        )}
      </div>

      {!supported && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          متصفحك لا يدعم الإشعارات.
        </p>
      )}

      {blocked && (
        <p className="text-sm text-rose-600 dark:text-rose-400">
          الإشعارات محظورة لهذا الموقع. فعّلها من إعدادات المتصفح (رمز القفل بجانب الرابط) ثم أعد
          تحميل الصفحة.
        </p>
      )}

      {supported && !blocked && (
        <>
          <label className="flex items-center justify-between gap-3 text-sm font-semibold">
            وقت التذكير
            <input
              type="time"
              value={settings.time}
              disabled={!settings.enabled}
              onChange={(e) => update({ time: e.target.value || '20:00', lastNotified: null })}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900"
            />
          </label>

          {settings.enabled && permission === 'granted' && (
            <button type="button" onClick={sendTest} className="btn btn-secondary w-full">
              <Send className="h-4 w-4" />
              أرسل إشعاراً تجريبياً
            </button>
          )}

          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            يصلك الإشعار في الوقت المحدد إذا لم تدرس بعد اليوم. يعمل التذكير بينما يكون التطبيق
            مفتوحاً (حتى في تبويب خلفي)، أما الإشعارات والتطبيق مغلق تماماً فتحتاج خادماً مخصصاً.
          </p>
        </>
      )}
    </section>
  );
}
