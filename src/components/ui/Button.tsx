import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';

export type ButtonVariant = 
  | 'primary'
  | 'buy'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'danger-soft'
  | 'soft-customer'
  | 'soft-partner'
  | 'reward'
  | 'sale'
  | 'outline'
  | 'link'
  | 'partner'
  | 'customer';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  as?: any;
  to?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
  important?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-[30px] px-[10px] text-[12px] leading-[1.2]',
  sm: 'h-[36px] px-[12px] text-[13px] leading-[1.2]',
  md: 'h-[44px] px-[16px] text-[14px] leading-[1.2]',
  lg: 'h-[48px] px-[20px] text-[14px] leading-[1.2]',
  xl: 'h-[52px] px-[24px] text-[15px] leading-[1.2]',
};

const iconSizes: Record<ButtonSize, number> = {
  xs: 14,
  sm: 18,
  md: 20,
  lg: 22,
  xl: 24,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    as: Component = motion.button,
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    leftIcon, 
    rightIcon, 
    loading = false, 
    disabled, 
    className = '', 
    children, 
    important = false,
    ...props 
  }, ref) => {
    const { appMode } = useStore();
    const isDisabled = disabled || loading;
    
    const isLarge = size === 'lg' || size === 'xl';
    const borderRadius = isLarge ? 'rounded-2xl' : 'rounded-xl';
    const fontWeight = 'font-bold';

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
      <Component
        ref={ref}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden shrink-0 h-fit whitespace-nowrap',
          'font-heading antialiased uppercase tracking-wide',
          variant !== 'link' && borderRadius,
          fontWeight,
          variantStyles[variant],
          variant !== 'link' && sizeStyles[size],
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={iconSizes[size]} />
            {isLarge && <span>Đang xử lý...</span>}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            {leftIcon && <span className="flex items-center justify-center shrink-0">{leftIcon}</span>}
            <span className="truncate">{children}</span>
            {rightIcon && <span className="flex items-center justify-center shrink-0">{rightIcon}</span>}
          </div>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
