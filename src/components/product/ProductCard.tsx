import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text, LabelText, CardTitle, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductBadges } from './ProductBadges';
import { Button } from '../ui/Button';
import { ShoppingBag } from 'lucide-react';
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
        "group flex flex-col bg-surface rounded-[2rem] overflow-hidden shadow-sm border border-border-subtle hover:border-primary/30 transition-all active:scale-[0.98]",
        className
      )}
    >
      <div className="relative aspect-square bg-surface-soft overflow-hidden">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          overlay={
            <div className="absolute top-3 left-3">
              <ProductBadges hot={product.price > 1000000} />
            </div>
          }
        />
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="space-y-1">
          {product.brand && (
            <LabelText uppercase className="tracking-widest opacity-60">
              {product.brand}
            </LabelText>
          )}
          <CardTitle 
            size="sm"
            className="line-clamp-1 leading-tight h-5 group-hover:text-primary transition-colors"
          >
            {product.name}
          </CardTitle>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <ProductPrice 
            price={product.price} 
            salePrice={product.salePrice}
            prominent
          />
          
          {showAction && (
            <Button size="sm" variant="accent" className="font-semibold flex-shrink-0">
              {t('buy')}
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};

