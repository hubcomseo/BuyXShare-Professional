import React from 'react';
import { cn } from '../../lib/utils';
import { SafeAreaView } from './SafeAreaView';
import { AnimatedBackground } from './AnimatedBackground';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export const AppShell: React.FC<AppShellProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen text-text-primary selection:bg-primary/20 relative overflow-x-hidden", className)}>
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};
