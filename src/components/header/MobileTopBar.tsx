import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronLeft, User } from 'lucide-react';
import { Text } from '../ui/Typography';
import { IconButton } from '../ui';
import { cn } from '../../lib/utils';

interface HeaderActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const HeaderActionButton: React.FC<HeaderActionButtonProps> = ({
  icon,
  onClick,
  disabled = false,
  className = '',
  label = 'Action',
}) => {
  return (
    <IconButton
      icon={icon}
      variant="ghost"
      size="md"
      onClick={onClick}
      disabled={disabled}
      label={label}
      className={cn('text-text-primary w-10 h-10', className)}
    />
  );
};

export const HeaderTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden w-full px-2">
      <Text 
        className="text-[16px] leading-[24px] font-bold text-text-primary truncate w-full text-center" 
        as="h2"
      >
        {title}
      </Text>
    </div>
  );
};

export interface MobileTopBarProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  border?: boolean;
  background?: string;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  title,
  showBack = false,
  onBack,
  leftSlot,
  rightSlot,
  border = false,
  background = 'bg-transparent',
}) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full ${background} ${border ? 'border-b border-border-subtle shadow-sm' : ''} pt-[calc(env(safe-area-inset-top)+16px)] transition-all duration-300`}>
      <div className="flex items-center justify-between h-[56px] px-4">
        {/* Left Area - 40px fixed width */}
        <div className="w-[40px] shrink-0 flex items-center justify-start">
          {showBack ? (
            <HeaderActionButton 
              icon={<ChevronLeft size={22} strokeWidth={2} />} 
              onClick={onBack} 
            />
          ) : (
            leftSlot || null
          )}
        </div>

        {/* Center Area - Flexible */}
        <div className="flex-1 min-w-0 flex justify-center">
          <HeaderTitle title={title} />
        </div>

        {/* Right Area - Bell & Profile Icons */}
        <div className="shrink-0 flex items-center justify-end gap-1">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border-none text-text-primary hover:bg-surface-elevated transition-colors relative active:scale-95">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-bg-base shrink-0"></span>
          </button>
          <button 
            onClick={() => navigate('/app/profile')}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent border-none text-text-primary hover:bg-surface-elevated transition-colors relative active:scale-95"
          >
            <User size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};
