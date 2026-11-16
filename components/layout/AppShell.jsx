'use client';

import MobileNav from './MobileNav';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppShell({ children }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:ms-64">
        <TopBar />
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
