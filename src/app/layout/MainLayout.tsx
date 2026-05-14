import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAppZone = location.pathname.startsWith('/app');

  return (
    <div className={`min-h-screen bg-bg-base font-sans text-text-primary ${isAppZone ? 'md:max-w-3xl lg:max-w-[90%] xl:max-w-6xl md:mx-auto md:shadow-2xl md:border-x border-border-subtle' : 'w-full'}`}>
      {children}
    </div>
  );
};
