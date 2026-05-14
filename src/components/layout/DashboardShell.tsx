import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell } from './AppShell';
import { motion } from 'motion/react';
import { Sidebar } from 'lucide-react';

export const DashboardShell = () => {
  return (
    <AppShell className="md:flex md:h-screen md:overflow-hidden">
      {/* Example Sidebar for dashboard (Desktop) */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border-subtle bg-surface px-4 py-6">
         <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 bg-partner-primary rounded-lg flex items-center justify-center text-bg-base">
               <Sidebar size={18} />
            </div>
            <span className="font-bold text-lg tracking-tight">Storims</span>
         </div>
         <nav className="flex-1 space-y-1">
            {/* Dashboard nav items can be injected here */}
         </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
         <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-7xl mx-auto p-6" // Dashboard padding: 24px (p-6)
         >
            <Outlet />
         </motion.div>
      </main>
    </AppShell>
  );
};
