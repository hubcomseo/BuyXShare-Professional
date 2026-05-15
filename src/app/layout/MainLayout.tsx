import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAppZone = location.pathname.startsWith('/app');

  return (
    <div className={cn(
      "min-h-screen font-sans text-text-primary transition-all duration-700",
      isAppZone ? 'md:max-w-3xl lg:max-w-[90%] xl:max-w-6xl md:mx-auto md:shadow-2xl md:border-x border-border-subtle' : 'w-full'
    )}>
      {children}
    </div>
  );
};
