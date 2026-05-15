import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatMoney } from '../../utils/money';
import { Text, PriceText, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { Flame } from 'lucide-react';

interface ProductCampaignItemProps {
  product: Product;
  campaignLabel?: string;
  className?: string;
}

export const ProductCampaignItem: React.FC<ProductCampaignItemProps> = ({ 
  product, 
  campaignLabel = "Flash Sale",
  className 
}) => {
  return (
    <Link 
      to={`/app/products/${product.slug}`}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-rose-500/80 to-primary/80 rounded-3xl p-0.5 group shadow-md hover:shadow-primary-light/30 transition-all",
        className
      )}
    >
      {/* Gloss Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <div className="bg-surface rounded-[2.4rem] overflow-hidden">
        <div className="aspect-[4/5] relative">
          <img 
            src={product.images?.[0]} 
            alt={product.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Campaign Ribbon */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-primary-light text-bg-base rounded-full shadow-lg">
            <Flame size={14} className="fill-current animate-pulse" />
            <CaptionText weight={600} className="text-[10px] tracking-widest uppercase">{campaignLabel}</CaptionText>
          </div>
        </div>
        
        <div className="p-5 space-y-3">
          <div className="space-y-1">
            <Text className="text-[8px] font-medium text-text-disabled uppercase tracking-tight">{product.brand}</Text>
            <Text className="text-[16px] leading-[20px] text-text-primary font-bold line-clamp-1">{product.name}</Text>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <PriceText size="md" color="primary">{formatMoney(product.salePrice || product.price)}</PriceText>
              <CaptionText className="line-through">{formatMoney(product.price)}</CaptionText>
            </div>
            
            <div className="text-right">
              <CaptionText weight={600} color="muted" className="mb-1 block uppercase">Đã bán</CaptionText>
              <div className="h-1.5 w-20 bg-surface-soft rounded-full overflow-hidden">
                <div className="h-full bg-primary-light w-[75%] rounded-full animate-pulse-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
