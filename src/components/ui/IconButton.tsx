import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';
import { ButtonVariant } from './Button';

export type IconButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg';

export interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: IconButtonSize;
  icon: React.ReactNode;
  label: string; // Enforce accessibility
}

const sizeStyles: Record<IconButtonSize, string> = {
  sm: 'w-[36px] h-[36px]',
  md: 'w-[44px] h-[44px]',
  lg: 'w-[52px] h-[52px]',
  'icon-sm': 'w-[36px] h-[36px]',
  'icon-md': 'w-[40px] h-[40px]',
  'icon-lg': 'w-[44px] h-[44px]',
};

const iconSizes: Record<IconButtonSize, number> = {
  sm: 18,
  md: 20,
  lg: 24,
  'icon-sm': 18,
  'icon-md': 20,
  'icon-lg': 22,
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    variant = 'secondary', 
    size = 'icon-md', 
    icon, 
    label, 
    disabled, 
    className = '', 
    ...props 
  }, ref) => {
    const { appMode } = useStore();
    
    // Radius is 12px for icon buttons
    const borderRadius = 'rounded-[12px]';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: cn(
        appMode === 'customer' 
          ? 'bg-customer-strong text-white shadow-customer-strong/20 active:bg-customer-primary' 
          : 'bg-partner-primary text-bg-base shadow-partner-primary/20 active:bg-partner-strong',
        'shadow-md border-none'
      ),
      accent: 'bg-accent text-bg-base active:bg-partner-strong shadow-md shadow-accent/20 border-none',
      secondary: 'bg-surface text-text-secondary border border-border-subtle active:bg-surface-elevated',
      ghost: 'bg-transparent text-text-muted active:bg-surface active:text-text-primary',
      danger: 'bg-error text-white active:opacity-90 shadow-md shadow-error/20 border-none',
      'soft-primary': appMode === 'customer' 
        ? 'bg-customer-soft text-customer-primary active:bg-customer-soft/80' 
        : 'bg-partner-soft text-partner-primary active:bg-partner-soft/80',
      'soft-accent': 'bg-accent-soft text-accent active:bg-accent-soft/80',
      outline: 'bg-transparent text-text-secondary border border-border-subtle active:border-customer-strong active:text-text-primary',
      link: 'bg-transparent text-customer-strong hover:underline p-0 h-auto rounded-none border-none shadow-none',
    };

    return (
      <motion.button
        ref={ref as any}
        whileTap={disabled ? {} : { scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={disabled}
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed select-none shrink-0',
          borderRadius,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...(props as any)}
      >
        {React.cloneElement(icon as React.ReactElement<any>, { size: iconSizes[size] })}
      </motion.button>
    );
  }
);

IconButton.displayName = 'IconButton';
