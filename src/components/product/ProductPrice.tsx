import React from 'react';
import { formatMoney } from '../../utils/money';
import { PriceText, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';

interface ProductPriceProps {
  price: number;
  salePrice?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
  prominent?: boolean;
}

export const ProductPrice: React.FC<ProductPriceProps> = ({ 
  price, 
  salePrice, 
  size = 'md',
  className,
  color,
  prominent = false
}) => {
  const hasSale = salePrice && salePrice < price;
  const currentPrice = hasSale ? salePrice : price;

  return (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      {hasSale && (
        <CaptionText className="line-through opacity-40 leading-none">
          {formatMoney(price)}
        </CaptionText>
      )}
      <PriceText 
        size={size === 'xs' ? 'sm' : size === 'lg' ? 'md' : size} 
        className={cn("leading-none", color)}
      >
        {formatMoney(currentPrice)}
      </PriceText>
    </div>
  );
};
