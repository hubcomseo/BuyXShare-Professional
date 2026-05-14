import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';

export type FABVariant = 'primary' | 'accent' | 'secondary' | 'danger';

export interface FloatingActionButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: FABVariant;
  icon: React.ReactNode;
  label: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  variant = 'primary',
  icon,
  label,
  className = '',
  ...props
}) => {
  const { appMode } = useStore();

  const variantStyles: Record<FABVariant, string> = {
    primary: appMode === 'customer' 
      ? 'bg-customer-strong text-white shadow-customer-strong/40' 
      : 'bg-partner-primary text-bg-base shadow-partner-primary/40',
    accent: 'bg-partner-primary text-bg-base shadow-partner-primary/40',
    secondary: 'bg-surface-elevated text-text-primary shadow-black/40 border border-border-subtle',
    danger: 'bg-error text-white shadow-error/40',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      title={label}
      className={cn(
        'fixed bottom-6 right-6 z-40 w-[56px] h-[56px] rounded-[16px] flex items-center justify-center shadow-lg transition-all',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
    </motion.button>
  );
};
