import { BookOpen, ClipboardCheck, Headphones, Home, Volume2 } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/', label: 'الرئيسية', Icon: Home },
  { href: '/lessons', label: 'الدروس', Icon: BookOpen },
  { href: '/quiz', label: 'الاختبارات', Icon: ClipboardCheck },
  { href: '/listening', label: 'الاستماع', Icon: Headphones },
  { href: '/pronunciation', label: 'النطق', Icon: Volume2 },
];

export const isActivePath = (pathname, href) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);
