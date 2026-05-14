import React from 'react';
import { ChevronLeft, X } from 'lucide-react';
import { HeaderActionButton } from './MobileTopBar';
import { Text } from '../ui/Typography';

export interface CheckoutHeaderProps {
  title: string;
  stepLabel?: string;
  progress?: number; // 0 to 1
  showBack?: boolean;
  isClose?: boolean;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
}

export const CheckoutHeader: React.FC<CheckoutHeaderProps> = ({
  title,
  stepLabel,
  progress,
  showBack = true,
  isClose = false,
  onBack,
  rightSlot,
}) => {
  return (
    <div className="w-full bg-transparent pt-[calc(env(safe-area-inset-top)+16px)] transition-all duration-300">
      <div className="flex items-center justify-between h-[56px] px-4">
        {/* Left Area */}
        <div className="w-[40px] shrink-0 flex items-center justify-start">
          {showBack && (
            <HeaderActionButton 
              icon={isClose ? <X size={22} strokeWidth={2} /> : <ChevronLeft size={22} strokeWidth={2} />} 
              onClick={onBack} 
            />
          )}
        </div>

        {/* Center Area */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center px-2">
          {stepLabel && (
             <Text 
              as="p"
              className="text-[12px] leading-[18px] font-normal text-text-secondary truncate w-full text-center mt-0.5"
            >
              {stepLabel}
            </Text>
          )}
           <Text 
            as="h2"
            className="text-[16px] leading-[24px] font-semibold text-text-primary truncate w-full text-center"
          >
            {title}
          </Text>
        </div>

        {/* Right Area */}
        <div className="w-[40px] shrink-0 flex items-center justify-end gap-2">
          {rightSlot || null}
        </div>
      </div>
      
      {/* Progress Bar */}
      {progress !== undefined && (
        <div className="w-full h-1 bg-surface-soft overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out rounded-r-full" 
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};
