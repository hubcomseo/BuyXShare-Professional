import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ScreenTitle, CaptionText, LabelText, TypographyColor } from '../ui/Typography';
import { Bell, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconButton } from '../ui';

export interface MobileLargeHeaderProps {
  title: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  avatar?: string;
  background?: string;
  titleColor?: TypographyColor;
  showModeBadge?: boolean;
  isScrolled?: boolean;
  mode?: 'customer' | 'partner';
}

export const MobileLargeHeader: React.FC<MobileLargeHeaderProps> = ({
  title,
  leftSlot,
  rightSlot,
  avatar,
  background,
  titleColor = 'dark',
  showModeBadge = true,
  isScrolled = false,
  mode = 'customer',
}) => {
  const navigate = useNavigate();

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
      isScrolled 
        ? "bg-white/78 backdrop-blur-[18px]" 
        : background || "bg-transparent",
      !isScrolled && (mode === 'customer' 
        ? "customer-theme-gradient" 
        : "partner-theme-gradient")
    )}>
      <div className="absolute inset-0 z-[-1] opacity-0 transition-opacity duration-500" style={{ opacity: isScrolled ? 1 : 0 }}>
         {/* Glass fallback */}
         <div className={cn(
           "absolute inset-0 bg-white/94",
           "backdrop-blur-[18px]"
         )} />
      </div>
      <div className="px-4 flex flex-col relative z-10 max-w-[1200px] mx-auto w-full pt-[env(safe-area-inset-top)]">
        <div className={cn(
          "flex items-center justify-between transition-all duration-300",
          isScrolled ? "h-[56px]" : "h-[76px]"
        )}>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 min-w-0">
                {leftSlot && <div className="mr-0.5">{leftSlot}</div>}
                <div className="flex flex-col min-w-0">
                  <ScreenTitle
                    color={titleColor}
                    className={cn(
                      "truncate shrink tracking-tighter transition-all duration-300 leading-[1.1]",
                      isScrolled ? "text-lg font-bold" : "text-2xl font-black"
                    )}
                  >
                    {title}
                  </ScreenTitle>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center shrink-0 min-w-[70px] pl-2 gap-1.5">
            {rightSlot || (
              <>
                <div className="relative">
                  <IconButton 
                    icon={<Bell size={isScrolled ? 18 : 20} />} 
                    variant="ghost"
                    size="md"
                    label="Thông báo"
                    className={cn(
                      "w-9 h-9",
                      titleColor === 'white' && "text-white"
                    )}
                  />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface shrink-0"></span>
                </div>
                <IconButton 
                  onClick={() => navigate('/app/profile')}
                  icon={<User size={isScrolled ? 18 : 20} />}
                  variant="ghost"
                  size="md"
                  label="Cá nhân"
                  className={cn(
                    "w-9 h-9",
                    titleColor === 'white' && "text-white"
                  )}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
