import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export type AppIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'empty';

export interface AppIconProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon;
  size?: AppIconSize;
  color?: 'primary' | 'muted' | 'white' | 'dark' | 'success' | 'warning' | 'error' | 'partner-primary' | 'customer-primary' | 'accent' | 'inherit';
  className?: string;
}

const sizeMap: Record<AppIconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,     // Normal icon (20-22px)
  lg: 24,     // Metric icon (20-24px)
  xl: 32,     // Empty/large icon
  empty: 40   // Empty/large icon (32-48px)
};

const colorMap = {
  primary: 'text-primary',
  muted: 'text-text-muted',
  white: 'text-white',
  dark: 'text-text-primary',
  success: 'text-success',
  warning: 'text-warning-dark',
  error: 'text-error',
  'partner-primary': 'text-partner-primary',
  'customer-primary': 'text-customer-primary',
  accent: 'text-accent',
  inherit: 'text-inherit'
};

export const AppIcon: React.FC<AppIconProps> = ({ 
  icon: Icon, 
  size = 'md', 
  color = 'inherit', 
  className,
  ...props 
}) => {
  return (
    <Icon 
      size={sizeMap[size]} 
      className={cn(colorMap[color], className)} 
      {...props} 
    />
  );
};
