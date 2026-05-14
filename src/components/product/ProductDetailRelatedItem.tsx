import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatMoney } from '../../utils/money';
import { Text, PriceText } from '../ui/Typography';
import { cn } from '../../lib/utils';

interface ProductDetailRelatedItemProps {
  product: Product;
  className?: string;
}

export const ProductDetailRelatedItem: React.FC<ProductDetailRelatedItemProps> = ({ product, className }) => {
  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn("w-32 sm:w-40 flex-shrink-0 space-y-2 group", className)}
    >
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-surface-soft border border-border-subtle shadow-sm transition-all group-hover:shadow-md">
        <img 
          src={product.images?.[0]} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90" 
        />
      </div>
      <div className="space-y-0.5 px-1">
        <Text variant="body-sm" weight={600} color="dark" className="line-clamp-2 leading-tight group-hover:text-primary-light transition-colors">
          {product.name}
        </Text>
        <PriceText size="sm">{formatMoney(product.salePrice || product.price)}</PriceText>
      </div>
    </Link>
  );
};
