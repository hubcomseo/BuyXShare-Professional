import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatMoney } from '../../utils/money';
import { Text, PriceText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';

interface ProductCompactItemProps {
  product: Product;
  className?: string;
}

export const ProductCompactItem: React.FC<ProductCompactItemProps> = ({ product, className }) => {
  return (
    <Link 
      to={`/app/products/${product.slug}`}
      className={cn("flex items-center gap-2 p-2 hover:bg-surface/50 transition-colors rounded-xl", className)}
    >
      <ProductImage 
        src={product.images?.[0]} 
        alt={product.name} 
        className="w-12 h-12 rounded-xl shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Text variant="body-sm" weight={600} className="line-clamp-1 truncate text-text-primary">{product.name}</Text>
        <PriceText size="sm" className="text-primary">{formatMoney(product.salePrice || product.price)}</PriceText>
      </div>
    </Link>
  );
};
