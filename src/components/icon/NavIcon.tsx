import React from 'react';
import { LucideIcon } from 'lucide-react';
import { AppIcon } from './AppIcon';
import { cn } from '../../lib/utils';

interface NavIconProps {
  icon: LucideIcon;
  isActive?: boolean;
  isPartner?: boolean;
  className?: string;
}

export const NavIcon: React.FC<NavIconProps> = ({ icon, isActive, isPartner, className }) => {
  return (
    <AppIcon 
      icon={icon}
      size="md" // strictly 20px
      strokeWidth={2}
      className={cn(
        "transition-transform duration-300",
        isActive 
          ? (isPartner ? 'text-partner-primary' : 'text-customer-primary') 
          : 'text-text-muted group-hover:text-text-primary',
        isActive && "md:hidden",
        className
      )}
    />
  );
};
