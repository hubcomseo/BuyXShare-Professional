import React from 'react';
import { cn } from '../../lib/utils';

export type BadgeSize = 'xxs' | 'xs' | 'sm' | 'md';
export type BadgeVariant = 
  | 'neutral' 
  | 'customer' 
  | 'partner' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'info' 
  | 'reward' 
  | 'sale'
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
  xxs: 'h-[16px] px-[4px] text-[9.5px] font-black leading-none',
  xs: 'h-[20px] px-[6px] text-[10.5px] font-bold leading-none',
  sm: 'h-[24px] px-[8px] text-[11.5px] font-bold leading-none',
  md: 'h-[26px] px-[10px] text-[12px] font-bold leading-none',
};

const iconSizes: Record<BadgeSize, number> = {
  xxs: 8,
  xs: 10,
  sm: 12,
  md: 13,
};

const variantStyles: Record<BadgeVariant, string> = {
  neutral: 'bg-bg-soft text-text-muted',
  customer: 'bg-customer-soft text-customer-text',
  partner: 'bg-partner-soft text-partner-text',
  success: 'bg-success-soft text-partner-text',
  warning: 'bg-warning-soft text-warning',
  error: 'bg-error-soft text-error',
  info: 'bg-info-soft text-info',
  reward: 'bg-reward-soft text-reward-text',
  sale: 'bg-sale-soft text-sale-text',
  commission: 'bg-partner-soft text-partner-text',
  outline: 'border border-border-subtle text-text-muted bg-transparent',
  ghost: 'bg-transparent text-text-muted',
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
      'inline-flex items-center justify-center rounded-md font-bold tracking-tight transition-all whitespace-nowrap',
      sizeStyles[size],
      variantStyles[variant],
      size === 'xxs' ? 'rounded-sm' : 'rounded-md',
      uppercase && 'uppercase tracking-wider',
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
