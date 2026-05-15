import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductPrice } from './ProductPrice';

interface ProductDetailRelatedItemProps {
  product: Product;
  className?: string;
}

export const ProductDetailRelatedItem: React.FC<ProductDetailRelatedItemProps> = ({ product, className }) => {
  return (
    <Link 
      to={`/app/products/${product.slug}`}
      className={cn("w-32 sm:w-36 flex-shrink-0 space-y-2 group", className)}
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-surface-soft border border-border-subtle shadow-sm transition-all group-hover:shadow-md">
        <img 
          src={product.images?.[0]} 
          alt={product.name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <div className="space-y-1 px-0.5">
        <Text 
          className="line-clamp-2 leading-[17px] group-hover:text-customer-primary transition-colors text-[14px] font-semibold text-text-primary"
        >
          {product.name}
        </Text>
        <ProductPrice price={product.price} salePrice={product.salePrice} size="mini" />
      </div>
    </Link>
  );
};
