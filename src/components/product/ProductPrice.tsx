import React from 'react';
import { formatMoney } from '../../utils/money';
import { PriceText, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';

interface ProductPriceProps {
  price: number;
  salePrice?: number;
  commission?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'partner' | 'customer';
  layout?: 'vertical' | 'horizontal';
  className?: string;
  color?: TypographyColor;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ 
  price, 
  salePrice, 
  commission,
  size = 'md',
  variant = 'default',
  layout = 'vertical',
  className,
  color,
}) => {
  const hasSale = salePrice !== undefined && salePrice < price;
  const currentPrice = hasSale ? salePrice : price;

  const getPriceSize = () => {
    if (size === 'xl') return 'lg';
    if (size === 'lg') return 'md';
    if (size === 'md') return 'md';
    if (size === 'sm') return 'sm';
    return 'xs';
  };

  const currentPriceColor = color || (hasSale ? 'sale' : 'dark');

  if (variant === 'partner') {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", className)}>
        {/* Commission (partner earnings) - Prominent focus */}
        {commission !== undefined && (
          <PriceText 
            size={getPriceSize()} 
            color="partner"
            className="leading-none"
          >
            HH {commission}%
          </PriceText>
        )}

        <span className="text-text-disabled opacity-30 text-[10px]">/</span>

        {/* Selling Price (what the customer pays) - Consistent style but NOT bold */}
        <PriceText 
          size="xs" 
          color="muted" 
          className="opacity-40 tracking-normal"
          weight={400}
        >
          {formatMoney(currentPrice)}
        </PriceText>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      {/* Old Price */}
      {hasSale && (
        <CaptionText className="line-through text-text-disabled font-medium opacity-60">
          {formatMoney(price)}
        </CaptionText>
      )}

      <div className="flex items-baseline gap-2">
        {/* Main Price */}
        <PriceText 
          size={getPriceSize()} 
          color={currentPriceColor}
          className="leading-none"
        >
          {formatMoney(currentPrice)}
        </PriceText>

        {/* Optional Commission for other views (legacy fallback but shouldn't hit with variant='partner' above) */}
        {commission !== undefined && (
          <PriceText 
            size={getPriceSize()} 
            color="partner"
            className="leading-none ml-1"
          >
            +{formatMoney(commission)}
          </PriceText>
        )}
      </div>
    </div>
  );
};
