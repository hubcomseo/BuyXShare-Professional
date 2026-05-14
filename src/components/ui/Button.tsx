import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';

export type ButtonVariant = 
  | 'primary'
  | 'accent'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'soft-primary'
  | 'soft-accent'
  | 'outline'
  | 'link';

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
  xs: 'h-[30px] px-[10px] text-[13px] leading-[20px]',
  sm: 'h-[36px] px-[12px] text-[14px] leading-[20px]',
  md: 'h-[44px] px-[16px] text-[14px] leading-[20px]',
  lg: 'h-[52px] px-[20px] text-[14px] leading-[20px]',
  xl: 'h-[56px] px-[24px] text-[15px] leading-[24px]',
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
    const borderRadius = isLarge ? 'rounded-[16px]' : 'rounded-[12px]';
    // 600 only for important CTA or large ones, default 500
    const fontWeight = (important || isLarge) ? 'font-semibold' : 'font-medium';

    const variantStyles: Record<ButtonVariant, string> = {
      primary: cn(
        appMode === 'customer' 
          ? 'bg-customer-strong text-white shadow-customer-strong/20 active:bg-[#4F46E5]' 
          : 'bg-partner-primary text-bg-base shadow-partner-primary/20 active:bg-partner-strong',
        'shadow-md border-none'
      ),
      accent: 'bg-accent text-bg-base active:bg-partner-strong shadow-md shadow-accent/20 border-none',
      secondary: 'bg-surface text-text-secondary border border-border-subtle active:bg-surface-soft',
      ghost: 'bg-transparent text-text-muted active:bg-surface active:text-text-primary',
      danger: 'bg-error text-white active:bg-[#E11D48] shadow-md shadow-error/20 border-none',
      'soft-primary': appMode === 'customer' 
        ? 'bg-customer-soft text-customer-primary active:bg-[#1A1A3A]' 
        : 'bg-partner-soft text-partner-primary active:bg-[#053E2F]',
      'soft-accent': 'bg-accent-soft text-accent active:bg-[#053E2F]',
      outline: 'bg-transparent text-text-secondary border border-border-subtle active:border-customer-strong active:text-text-primary',
      link: 'bg-transparent text-primary hover:underline p-0 h-auto rounded-none border-none shadow-none',
    };

    return (
      <Component
        ref={ref}
        whileTap={isDisabled ? {} : { scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden shrink-0 h-fit whitespace-nowrap',
          'font-sans antialiased',
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
