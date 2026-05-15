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
  className?: string;
  color?: TypographyColor;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ 
  price, 
  salePrice, 
  commission,
  size = 'md',
  variant = 'default',
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

        {/* Optional Commission for Partner view */}
        {commission !== undefined && variant === 'partner' && (
          <PriceText 
            size={getPriceSize()} 
            color="partner"
            className="leading-none"
          >
            +{formatMoney(commission)}
          </PriceText>
        )}
      </div>
    </div>
  );
};
