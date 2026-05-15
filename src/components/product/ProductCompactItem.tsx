import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';

interface ProductCompactItemProps {
  product: Product;
  className?: string;
}

export const ProductCompactItem: React.FC<ProductCompactItemProps> = ({ product, className }) => {
  return (
    <Link 
      to={`/app/products/${product.slug}`}
      className={cn("flex items-center gap-3 p-2 hover:bg-surface/50 transition-colors rounded-xl", className)}
    >
      <ProductImage 
        src={product.images?.[0]} 
        alt={product.name} 
        className="w-12 h-12 rounded-xl shrink-0"
      />
      <div className="flex-1 min-w-0">
        <Text 
          className="line-clamp-1 truncate text-text-primary text-[14px] font-semibold leading-[17px] mb-0.5"
        >
          {product.name}
        </Text>
        <ProductPrice price={product.price} salePrice={product.salePrice} size="mini" />
      </div>
    </Link>
  );
};
