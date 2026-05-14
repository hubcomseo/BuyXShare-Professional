import React from 'react';
import { Text, PriceText, CaptionText } from '../ui/Typography';
import { formatMoney } from '../../utils/money';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';

interface ProductCheckoutItemProps {
  image: string;
  name: string;
  price: number;
  variant?: string;
  shippingFee?: number;
  total?: number;
  className?: string;
  isGrouped?: boolean;
}

export const ProductCheckoutItem: React.FC<ProductCheckoutItemProps> = ({
  image,
  name,
  price,
  variant,
  shippingFee,
  total,
  className,
  isGrouped = false
}) => {
  const finalTotal = total ?? (price + (shippingFee ?? 0));

  const content = (
    <div className={cn("flex gap-3 items-center", className)}>
      <ProductImage 
        src={image} 
        alt={name} 
        className="w-14 h-14 rounded-xl shrink-0" 
      />
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <Text 
          variant="body-sm" 
          weight={600} 
          className="leading-tight text-text-primary line-clamp-2"
        >
          {name}
        </Text>
        {variant && (
          <CaptionText color="muted" className="mt-0.5 line-clamp-1">{variant}</CaptionText>
        )}
        
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-border-subtle">
          <ProductPrice price={price} size="xs" color="text-text-primary/60" />
          
          <div className="text-right">
            {shippingFee !== undefined && (
              <CaptionText color="muted" className="block text-[10px] leading-none mb-0.5">
                Ship: {shippingFee === 0 ? 'Miễn phí' : `+${formatMoney(shippingFee)}`}
              </CaptionText>
            )}
            <PriceText size="sm" className="leading-none text-text-primary">
              {formatMoney(finalTotal)}
            </PriceText>
          </div>
        </div>
      </div>
    </div>
  );

  if (isGrouped) {
    return (
      <div className={cn("p-3 bg-surface rounded-2xl border border-border-subtle shadow-sm", className)}>
        {content}
      </div>
    );
  }

  return content;
};
