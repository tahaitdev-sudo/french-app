'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Download, Share } from 'lucide-react';

export default function InstallCard() {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setInstalled(Boolean(standalone));
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferred) return;
    deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  };

  return (
    <section className="card space-y-3">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-300">
          <Download className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-bold">ثبّت التطبيق</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            افتحه من شاشتك الرئيسية، ويعمل دون اتصال بالإنترنت.
          </p>
        </div>
      </div>

      {installed ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          التطبيق مثبّت على جهازك
        </p>
      ) : deferred ? (
        <button type="button" onClick={install} className="btn btn-primary">
          <Download className="h-4 w-4" />
          تثبيت الآن
        </button>
      ) : isIos ? (
        <p className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Share className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
          في Safari: اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية».
        </p>
      ) : (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          إن لم يظهر زر التثبيت، افتح قائمة المتصفح واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة
          الرئيسية». التثبيت متاح على الرابط المنشور (https).
        </p>
      )}
    </section>
  );
}
