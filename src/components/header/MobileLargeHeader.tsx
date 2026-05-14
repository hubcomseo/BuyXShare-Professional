import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenTitle, LabelText, TypographyColor } from '../ui/Typography';
import { Bell, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface MobileLargeHeaderProps {
  title: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  avatar?: string;
  background?: string;
  titleColor?: TypographyColor;
  showModeBadge?: boolean; // Kept for backwards compatibility
}

export const MobileLargeHeader: React.FC<MobileLargeHeaderProps> = ({
  title,
  leftSlot,
  rightSlot,
  avatar,
  background = 'bg-transparent border-none',
  titleColor = 'dark',
  showModeBadge = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`w-full ${background} pt-[calc(env(safe-area-inset-top)+12px)] relative transition-all duration-300`}>
      <div className="px-5 py-3 flex flex-col relative z-10 max-w-[1200px] mx-auto w-full">
        <div className="flex items-center justify-between min-h-[40px]">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2 min-w-0">
                {leftSlot && <div className="mr-1">{leftSlot}</div>}
                <ScreenTitle
                  color={titleColor}
                  className="truncate shrink tracking-tight"
                >
                  {title}
                </ScreenTitle>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center shrink-0 min-w-[80px] pl-2 gap-2">
            <button className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center bg-transparent border-none hover:bg-surface-elevated transition-colors relative active:scale-95",
              titleColor === 'white' ? "text-white" : "text-text-primary"
            )}>
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-bg-base shrink-0"></span>
            </button>
            <button 
              onClick={() => navigate('/app/profile')}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center bg-transparent border-none hover:bg-surface-elevated transition-colors relative active:scale-95",
                titleColor === 'white' ? "text-white" : "text-text-primary"
              )}
            >
              <User size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
