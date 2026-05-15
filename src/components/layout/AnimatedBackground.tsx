import React from 'react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';

export const AnimatedBackground = () => {
  const { appMode } = useStore();
  const isPartner = appMode === 'partner';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background base color */}
      <div className="absolute inset-0 bg-bg-base transition-colors duration-1000" />
      
      {/* Role-based subtle gradient from top - unified standard */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isPartner 
            ? "bg-gradient-to-b from-partner-primary/[0.04] via-bg-base/80 to-bg-base" 
            : "bg-gradient-to-b from-customer-primary/[0.04] via-bg-base/80 to-bg-base"
        )}
      />

      {/* Extreme subtle texture for polish - nearly invisible for ultimate clean look */}
      <div className="absolute inset-0 opacity-[0.005] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
    </div>
  );
};
