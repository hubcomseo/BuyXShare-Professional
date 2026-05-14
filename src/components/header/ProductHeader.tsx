import React from 'react';
import { ChevronLeft, Share2, Heart } from 'lucide-react';
import { HeaderActionButton } from './MobileTopBar';
import { SectionTitle } from '../ui/Typography';
import { useStore } from '../../store';

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

  return (
    <div className="w-full bg-transparent pt-[calc(env(safe-area-inset-top)+16px)] transition-all duration-300">
      <div className="flex items-center justify-between h-[56px] px-4">
        {/* Left Area */}
        <div className="w-[40px] shrink-0 flex items-center justify-start">
          {showBack && (
            <HeaderActionButton 
              icon={<ChevronLeft size={22} strokeWidth={2} />} 
              onClick={onBack} 
            />
          )}
        </div>

        {/* Center Area */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center px-2">
          <SectionTitle 
            size="sm"
            className="truncate w-full text-center"
          >
            {title}
          </SectionTitle>
        </div>

        {/* Right Area */}
        <div className="shrink-0 flex items-center justify-end gap-2" style={{ minWidth: '40px' }}>
          {onFavorite && (
            <HeaderActionButton 
              icon={<Heart size={20} className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-text-primary/60'} />} 
              onClick={onFavorite} 
            />
          )}
          {onShare && (
            <HeaderActionButton 
              icon={<Share2 size={20} className="text-text-primary/60" />} 
              onClick={onShare} 
            />
          )}
        </div>
      </div>
    </div>
  );
};
