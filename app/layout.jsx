import './globals.css';
import { Cairo } from 'next/font/google';
import { ProgressProvider } from '@/components/ProgressProvider';
import AppShell from '@/components/layout/AppShell';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import ReminderWatcher from '@/components/ReminderWatcher';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata = {
  title: 'Parlons Français — تعلّم اللغة الفرنسية',
  description: 'تطبيق تفاعلي لتعلّم الفرنسية: دروس، اختبارات، نطق، ونقاط تحفيزية.',
  applicationName: 'Parlons Français',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Parlons Français',
    statusBarStyle: 'default',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
};

// Applique le thème avant le premier rendu pour éviter le « flash » blanc.
const themeScript = `(function(){try{var t=localStorage.getItem('fr-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cairo.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <ProgressProvider>
          <AppShell>{children}</AppShell>
          <ReminderWatcher />
          <ServiceWorkerRegister />
        </ProgressProvider>
      </body>
    </html>
  );
}
