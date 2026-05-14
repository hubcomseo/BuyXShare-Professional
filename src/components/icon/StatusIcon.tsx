import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, Info, LucideIcon } from 'lucide-react';
import { AppIcon, AppIconSize } from './AppIcon';
import { IconContainer } from './IconContainer';
import { cn } from '../../lib/utils';

export type StatusType = 'success' | 'error' | 'warning' | 'info';

interface StatusIconProps {
  status: StatusType;
  size?: AppIconSize;
  className?: string;
  withContainer?: boolean;
}

const statusConfig: Record<StatusType, { icon: LucideIcon, color: any, bg: any }> = {
  success: { icon: CheckCircle2, color: 'success', bg: 'success' },
  error: { icon: XCircle, color: 'error', bg: 'error' },
  warning: { icon: AlertCircle, color: 'warning', bg: 'warning' },
  info: { icon: Info, color: 'info', bg: 'info' }
};

export const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 'md', className, withContainer }) => {
  const config = statusConfig[status];

  if (withContainer) {
    const containerSizeMap: Record<AppIconSize, any> = {
      xs: 'sm',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
      empty: 'empty'
    };
    
    return (
      <IconContainer 
        variant="soft" 
        color={config.bg} 
        size={containerSizeMap[size]} 
        className={className}
      >
        <AppIcon icon={config.icon} color={config.color} size={size} />
      </IconContainer>
    );
  }

  return <AppIcon icon={config.icon} color={config.color} size={size} className={className} />;
};
