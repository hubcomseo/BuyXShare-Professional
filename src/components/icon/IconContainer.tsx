import React from 'react';
import { cn } from '../../lib/utils';

type ContainerVariant = 'soft' | 'solid' | 'outline' | 'ghost';
type ContainerColor = 'primary' | 'customer' | 'partner' | 'success' | 'error' | 'warning' | 'info' | 'surface' | 'neutral' | 'accent';
type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'empty';

interface IconContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: ContainerVariant;
  color?: ContainerColor;
  size?: ContainerSize;
  shape?: 'circle' | 'square' | 'rounded';
  className?: string;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  children,
  variant = 'soft',
  color = 'primary',
  size = 'md',
  shape = 'circle',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',    // For 16px icons
    md: 'w-10 h-10',  // For 20-22px icons (Button spec: 40x40)
    lg: 'w-12 h-12',  // For 24px icons
    xl: 'w-16 h-16',  // For 32px icons
    empty: 'w-24 h-24' // For 40-48px icons
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-xl'
  };

  const getBackgroundColor = () => {
     if (variant === 'soft') {
       const map: Record<string, string> = {
         primary: 'bg-primary/10 text-primary',
         customer: 'bg-customer-subtle text-customer-primary',
         partner: 'bg-partner-subtle text-partner-primary',
         success: 'bg-success/10 text-success',
         error: 'bg-error/10 text-error',
         warning: 'bg-warning/10 text-warning-dark',
         info: 'bg-info/10 text-info',
         surface: 'bg-surface-soft text-text-primary',
         neutral: 'bg-surface/50 text-text-primary rounded-2xl',
         accent: 'bg-accent/10 text-accent'
       };
       return map[color];
     }
     
     if (variant === 'outline') {
       const map: Record<string, string> = {
         primary: 'border border-primary/20 text-primary bg-primary/5',
         customer: 'border border-customer-primary/20 text-customer-primary bg-customer-subtle',
         partner: 'border border-partner-primary/20 text-partner-primary bg-partner-subtle',
         surface: 'border border-border-subtle bg-surface',
         neutral: 'border border-border-subtle bg-surface'
       };
       return map[color] || 'border border-border-subtle';
     }
     
     const mapSolid: Record<string, string> = {
         primary: 'bg-primary text-white shadow-md shadow-primary/20',
         customer: 'bg-customer-primary text-white shadow-md shadow-customer-primary/20',
         partner: 'bg-partner-primary text-bg-base shadow-md shadow-partner-primary/20',
         success: 'bg-success text-white shadow-md',
         error: 'bg-error text-white shadow-md',
         warning: 'bg-warning text-white shadow-md',
         info: 'bg-info text-white shadow-md',
         surface: 'bg-surface text-text-primary shadow-sm border border-border-subtle',
         neutral: 'bg-surface text-text-primary border border-border-subtle shadow-sm',
         accent: 'bg-accent text-white shadow-md shadow-accent/20'
     };
     return mapSolid[color] || 'bg-surface';
  };

  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center shrink-0 transition-colors", 
        sizeClasses[size], 
        shapeClasses[shape], 
        getBackgroundColor(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
