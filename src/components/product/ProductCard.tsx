import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text, LabelText, CardTitle, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductBadges } from './ProductBadges';
import { Badge, Button } from '../ui';
import { ShoppingBag, Ticket, Star } from 'lucide-react';
import { useTranslation } from '../../lib/i18n';

interface ProductCardProps {
  product: Product;
  className?: string;
  showAction?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  className,
  showAction = false
}) => {
  const { t } = useTranslation();
  return (
    <Link 
      to={`/app/products/${product.slug}`} 
      className={cn(
        "group flex flex-col bg-surface rounded-2xl overflow-hidden shadow-sm border border-border-subtle transition-all active:scale-[0.98] hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square bg-bg-soft overflow-hidden">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          overlay={
            <>
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <ProductBadges hot={product.price > 1000000} sale={!!product.salePrice} size="xxs" />
              </div>
            </>
          }
        />
      </div>
      
      {/* Product Info */}
      <div className="p-3">
        {/* 1. Brand & Rating */}
        <div className="flex items-center justify-between mb-1">
          {product.brand && (
            <Text className="text-[7px] text-text-muted font-medium tracking-tight leading-none">
              {product.brand}
            </Text>
          )}
          <div className="flex items-center gap-0.5">
            <Text className="text-[9px] text-text-muted font-bold leading-none">4.5</Text>
            <Star size={12} strokeWidth={2} className="text-yellow-500" />
          </div>
        </div>
        
        {/* 2. Product Name */}
        <Text 
          className="text-text-primary text-[14px] leading-tight font-bold line-clamp-2 mb-2 group-hover:text-customer-primary transition-colors font-heading"
        >
          {product.name}
        </Text>
        
        {/* 3. Price Area */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
          <ProductPrice 
            price={product.price} 
            salePrice={product.salePrice}
            size="mini"
            className="!gap-0"
          />
        </div>
      </div>
    </Link>
  );
};

