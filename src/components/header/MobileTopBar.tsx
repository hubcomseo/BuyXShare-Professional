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
  background = 'bg-white/78 backdrop-blur-[18px]',
}) => {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
      background
    )}>
      <div className="flex items-center justify-between h-[56px] px-4 pt-[env(safe-area-inset-top)]">
        {/* Left Area - 44px fixed width for touch target */}
        <div className="w-[44px] shrink-0 flex items-center justify-start">
          {showBack ? (
            <HeaderActionButton 
              icon={<ChevronLeft size={24} strokeWidth={2} />} 
              onClick={onBack} 
              label="Quay lại"
            />
          ) : (
            leftSlot || null
          )}
        </div>

        {/* Center Area - Flexible */}
        <div className="flex-1 min-w-0 flex justify-center px-2">
          <HeaderTitle title={title} />
        </div>

        {/* Right Area - Action icons */}
        <div className="shrink-0 flex items-center justify-end min-w-[44px]">
          {rightSlot || (
            <div className="flex items-center gap-1">
              <div className="relative">
                <IconButton 
                  icon={<Bell size={20} />} 
                  variant="ghost"
                  size="md"
                  label="Thông báo"
                  className="w-10 h-10"
                />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-surface shrink-0"></span>
              </div>
              <IconButton 
                icon={<User size={20} />} 
                variant="ghost"
                size="md"
                label="Cá nhân"
                onClick={() => navigate('/app/profile')}
                className="w-10 h-10"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
