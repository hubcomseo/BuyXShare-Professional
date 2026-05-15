import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';
import { ButtonVariant } from './Button';

export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg';

export interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: IconButtonSize;
  icon: React.ReactNode;
  label: string; // Enforce accessibility
}

const sizeStyles: Record<IconButtonSize, string> = {
  xs: 'w-[28px] h-[28px]',
  sm: 'w-[34px] h-[34px]',
  md: 'w-[42px] h-[42px]',
  lg: 'w-[48px] h-[48px]',
  'icon-xs': 'w-[28px] h-[28px]',
  'icon-sm': 'w-[34px] h-[34px]',
  'icon-md': 'w-[40px] h-[40px]',
  'icon-lg': 'w-[44px] h-[44px]',
};

const iconSizes: Record<IconButtonSize, number> = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 24,
  'icon-xs': 14,
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
    
    // Radius is 8px for icon buttons
    const borderRadius = (size === 'lg' || size === 'icon-lg') ? 'rounded-2xl' : 'rounded-xl';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: cn(
        appMode === 'customer' 
          ? 'bg-customer-primary text-white shadow-sm shadow-customer-primary/20 active:bg-customer-strong' 
          : 'bg-partner-primary text-white shadow-sm shadow-partner-primary/20 active:bg-partner-strong',
        'border-none'
      ),
      buy: 'bg-buy-primary text-white active:bg-buy-strong shadow-sm shadow-buy-primary/20 border-none',
      secondary: 'bg-white text-text-primary border border-border-default shadow-sm active:bg-surface-soft',
      ghost: 'bg-transparent text-text-primary hover:bg-surface-soft active:bg-surface-soft active:text-text-primary',
      danger: 'bg-sale text-white active:opacity-90 shadow-sm shadow-sale/20 border-none',
      'danger-soft': 'bg-sale/10 text-sale active:bg-sale/20',
      'soft-customer': 'bg-customer-soft text-customer-primary active:bg-customer-primary/20',
      'soft-partner': 'bg-partner-soft text-partner-primary active:bg-partner-primary/20',
      reward: 'bg-reward-soft text-reward-text active:opacity-80',
      sale: 'bg-sale-soft text-sale-text active:opacity-80',
      outline: 'bg-transparent text-text-primary border border-border-default active:bg-surface-soft',
      link: cn(
        'bg-transparent hover:underline p-0 h-auto rounded-none border-none shadow-none',
        appMode === 'customer' ? 'text-customer-primary' : 'text-partner-primary'
      ),
      partner: 'bg-partner-primary text-white active:bg-partner-strong shadow-sm shadow-partner-primary/20',
      customer: 'bg-customer-primary text-white active:bg-customer-strong shadow-sm shadow-customer-primary/20',
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
