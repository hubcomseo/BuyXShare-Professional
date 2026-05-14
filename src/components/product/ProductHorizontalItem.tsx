import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatMoney } from '../../utils/money';
import { Text, PriceText, CaptionText, LabelText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductBadges } from './ProductBadges';
import { IconButton } from '../ui/IconButton';
import { useStore } from '../../store';

interface ProductHorizontalItemProps {
  product: Product;
  variant?: 'customer' | 'partner';
  className?: string;
  showAction?: boolean;
}

export const ProductHorizontalItem: React.FC<ProductHorizontalItemProps> = ({ 
  product, 
  variant = 'customer',
  className,
  showAction = true
}) => {
  const isPartner = variant === 'partner';
  const { user } = useStore();
  const [copied, setCopied] = React.useState(false);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user?.id) {
       const link = `${window.location.origin}/p/${product.slug}?partner=${user.id}`;
       navigator.clipboard.writeText(link);
       setCopied(true);
       setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <Link 
      to={isPartner ? `/app/partner/products/${product.slug}` : `/app/products/${product.slug}`}
      className={cn(
        "flex gap-3 py-3 border-b border-border-subtle/50 last:border-b-0 hover:bg-surface/20 transition-all group", 
        className
      )}
    >
      <div className="relative w-24 h-24 rounded-2xl bg-surface-soft overflow-hidden shrink-0">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {isPartner && (
          <div className="absolute top-2 left-2">
             <ProductBadges commissionRate={product.commissionRate} />
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div>
          {product.brand && (
            <LabelText 
              uppercase 
              className={cn(
                "tracking-widest mb-1 opacity-60",
                isPartner ? "text-partner-primary" : "text-text-muted"
              )}
            >
              {product.brand}
            </LabelText>
          )}
          <Text variant="body-sm" weight={600} className="line-clamp-1 leading-tight mb-2 transition-colors text-text-primary group-hover:text-primary h-5">
            {product.name}
          </Text>
          
           <div className="space-y-1">
            {!isPartner ? (
              <ProductPrice 
                  price={product.price} 
                  salePrice={product.salePrice}
                  size="sm"
                  color="text-primary"
              />
            ) : (
               <div className="flex items-center justify-between mt-2 pt-2 border-t border-border-subtle/30">
                  <div className="flex flex-col">
                    <PriceText size="sm">
                      +{formatMoney((product.salePrice || product.price) * (product.commissionRate / 100))}
                    </PriceText>
                  </div>
                  
                  {showAction && (
                    <IconButton 
                      icon={copied ? <CheckCircle2 size={16} /> : <Copy size={16} />} 
                      variant={copied ? "accent" : "secondary"}
                      size="icon-sm"
                      onClick={copyLink}
                      label="Copy link"
                    />
                  )}
               </div>
            )}
          </div>
        </div>
        
        {showAction && !isPartner && (
          <div className="flex items-center justify-end">
            <ArrowRight size={16} className="text-text-primary/30 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </Link>
  );
};
