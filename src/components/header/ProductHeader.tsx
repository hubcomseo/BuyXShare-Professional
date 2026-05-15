import React from 'react';
import { ChevronLeft, Share2, Heart } from 'lucide-react';
import { HeaderActionButton } from './MobileTopBar';
import { Text } from '../ui/Typography';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';

export interface ProductHeaderProps {
  title: string;
  brand?: string;
  showBack?: boolean;
  onBack?: () => void;
  onShare?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
  title,
  brand,
  showBack = true,
  onBack,
  onShare,
  onFavorite,
  isFavorite = false,
}) => {
  const { appMode } = useStore();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-[60] transition-all duration-500",
      isScrolled ? "bg-white/78 backdrop-blur-[18px]" : "bg-transparent"
    )}>
      <div className="flex items-center justify-between h-[56px] px-4 pt-[env(safe-area-inset-top)]">
        {/* Left Area */}
        <div className="w-[40px] shrink-0 flex items-center justify-start">
          {showBack && (
            <HeaderActionButton 
              icon={<ChevronLeft size={22} strokeWidth={2} />} 
              onClick={onBack} 
              className={cn("transition-colors", !isScrolled && "bg-black/10 backdrop-blur-md border border-white/10 text-white hover:bg-black/20")}
            />
          )}
        </div>

        {/* Center Area */}
        <div className={cn(
          "flex-1 min-w-0 flex flex-col items-center justify-center px-2 transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-0"
        )}>
          <Text 
            weight={700}
            className="truncate w-full text-center text-[15px] font-black italic uppercase tracking-tight"
          >
            {title}
          </Text>
        </div>

        {/* Right Area */}
        <div className="shrink-0 flex items-center justify-end gap-2" style={{ minWidth: '40px' }}>
          {onShare && (
            <HeaderActionButton 
              icon={<Share2 size={18} />} 
              onClick={onShare} 
              className={cn("transition-colors", !isScrolled && "bg-black/10 backdrop-blur-md border border-white/10 text-white hover:bg-black/20")}
            />
          )}
          {onFavorite && (
            <HeaderActionButton 
              icon={<Heart size={18} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />} 
              onClick={onFavorite} 
              className={cn("transition-colors", !isScrolled && "bg-black/10 backdrop-blur-md border border-white/10 text-white hover:bg-black/20")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
