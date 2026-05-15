import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppShell } from './AppShell';
import { motion, AnimatePresence } from 'motion/react';

export const ProductPageShell = () => {
  const location = useLocation();

  return (
    <AppShell>
        <div className="w-full max-w-md mx-auto min-h-screen relative shadow-md shadow-black/5 bg-white md:border-x md:border-border-subtle">
          <Outlet />
        </div>
    </AppShell>
  );
};
