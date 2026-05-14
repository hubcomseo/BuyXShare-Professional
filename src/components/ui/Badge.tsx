import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeSize = 'xs' | 'sm' | 'md';
export type BadgeVariant = 
  | 'neutral' 
  | 'customer' 
  | 'partner' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'reward' 
  | 'commission'
  | 'outline'
  | 'ghost';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  uppercase?: boolean;
  className?: string;
}

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'h-[20px] px-[6px] text-[10px] leading-[14px]',
  sm: 'h-[24px] px-[8px] text-[11px] leading-[16px]',
  md: 'h-[28px] px-[10px] text-[12px] leading-[18px]',
};

const iconSizes: Record<BadgeSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
};

const variantStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-soft text-text-muted',
  customer: 'bg-customer-soft text-customer-primary',
  partner: 'bg-partner-soft text-partner-primary',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  error: 'bg-error-soft text-error',
  info: 'bg-info-soft text-info',
  reward: 'bg-reward-soft text-accent',
  commission: 'bg-commission-soft text-partner-primary',
  outline: 'border border-border-subtle text-text-primary/70',
  ghost: 'bg-transparent text-text-primary/70',
};

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'neutral', 
  size = 'sm', 
  icon,
  uppercase = false,
  className 
}) => {
  return (
    <span className={cn(
      'inline-flex items-center justify-center rounded-full font-bold tracking-normal transition-all whitespace-nowrap',
      sizeStyles[size],
      variantStyles[variant],
      uppercase && 'uppercase tracking-widest',
      className
    )}>
      {icon && (
        <span className="mr-1 flex items-center justify-center">
          {React.cloneElement(icon as React.ReactElement<any>, { 
            size: iconSizes[size],
            className: cn((icon as React.ReactElement<any>).props.className)
          })}
        </span>
      )}
      {children}
    </span>
  );
};
