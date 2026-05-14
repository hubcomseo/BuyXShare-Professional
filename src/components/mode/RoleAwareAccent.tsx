import React from 'react';
import { useAppMode } from '../../hooks/useAppMode';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface RoleAwareAccentProps {
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'glow';
}

export const RoleAwareAccent: React.FC<RoleAwareAccentProps> = ({ className, position = 'top' }) => {
  const { isPartner } = useAppMode();
  
  const baseClasses = "absolute z-0 pointer-events-none";
  let positionClasses = "";
  
  switch(position) {
    case 'top':
      positionClasses = "top-0 left-0 right-0 h-1";
      break;
    case 'bottom':
      positionClasses = "bottom-0 left-0 right-0 h-1";
      break;
    case 'left':
      positionClasses = "top-0 bottom-0 left-0 w-1";
      break;
    case 'right':
      positionClasses = "top-0 bottom-0 right-0 w-1";
      break;
    case 'glow':
      positionClasses = "inset-0 blur-xl opacity-20";
      break;
  }

  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={cn(
        baseClasses,
        positionClasses,
        isPartner ? "bg-partner-primary" : "bg-customer-primary",
        className
      )}
    />
  );
};
