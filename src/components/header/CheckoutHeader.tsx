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
    <div className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl transition-all duration-300">
      <div className="pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between h-[56px] px-4">
          {/* Left Area */}
          <div className="w-[44px] shrink-0 flex items-center justify-start">
            {showBack && (
              <HeaderActionButton 
                icon={isClose ? <X size={22} strokeWidth={2.5} /> : <ChevronLeft size={22} strokeWidth={2.5} />} 
                onClick={onBack} 
              />
            )}
          </div>

          {/* Center Area */}
          <div className="flex-1 min-w-0 flex flex-col items-center justify-center px-2">
            {stepLabel && (
               <Text 
                as="p"
                className="text-[10px] leading-[14px] font-bold text-customer-primary uppercase tracking-[0.15em] truncate w-full text-center mb-0.5"
              >
                {stepLabel}
              </Text>
            )}
             <Text 
              as="h2"
              className="text-[17px] leading-[22px] font-black text-text-primary truncate w-full text-center tracking-tight"
            >
              {title}
            </Text>
          </div>

          {/* Right Area */}
          <div className="w-[44px] shrink-0 flex items-center justify-end gap-2">
            {rightSlot || null}
          </div>
        </div>
        
        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="w-full h-[3px] bg-bg-soft overflow-hidden">
            <div 
              className="h-full bg-customer-primary transition-all duration-500 ease-out shadow-[0_0_8px_rgba(79,70,229,0.4)]" 
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
