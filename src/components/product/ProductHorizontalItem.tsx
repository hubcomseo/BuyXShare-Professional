import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { formatMoney } from '../../utils/money';
import { Text, PriceText, CaptionText, LabelText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ArrowRight, Copy, CheckCircle2, Ticket, ChevronRight } from 'lucide-react';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { ProductBadges } from './ProductBadges';
import { Badge, IconButton } from '../ui';
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

  const commissionPrice = (product.salePrice || product.price) * (product.commissionRate / 100);
  
  return (
    <Link 
      to={isPartner ? `/app/partner/marketplace/products/${product.slug}` : `/app/products/${product.slug}`}
      className={cn(
        "flex gap-3 px-4 py-3 border-b border-border-subtle/40 last:border-b-0 hover:bg-slate-50 transition-all group items-center", 
        isPartner ? "min-h-[90px]" : "min-h-[105px]",
        className
      )}
    >
      <div className={cn(
        "relative rounded-xl bg-bg-soft overflow-hidden shrink-0 border border-border-subtle/20",
        isPartner ? "w-[72px] h-[72px]" : "w-[84px] h-[84px]"
      )}>
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name} 
        />
        {isPartner && (
          <div className="absolute top-1 left-1">
             <Badge variant="commission" size="xxs" className="font-black h-3.5 px-1 shadow-sm">
               {product.commissionRate}%
             </Badge>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex-1">
          {product.brand && !isPartner && (
            <CaptionText 
              uppercase 
              className="tracking-tight mb-0.5 text-text-disabled text-[8px] font-medium block truncate"
            >
              {product.brand}
            </CaptionText>
          )}
          <Text 
            className={cn(
              "line-clamp-2 leading-[17px] mb-1 font-semibold",
              isPartner ? "text-text-primary text-[14px]" : "text-text-primary text-[14px]"
            )}
          >
            {product.name}
          </Text>
          
          <div className="flex items-center gap-2">
            {!isPartner ? (
              <div className="flex items-center gap-2">
                <ProductPrice 
                  price={product.price} 
                  salePrice={product.salePrice}
                  size="mini"
                  className="!gap-0"
                />
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text className="text-partner-primary font-bold italic text-[14px] leading-none">
                    +{formatMoney(commissionPrice)}
                  </Text>
                  <Text className="text-[#64748B] text-[10px] font-medium font-sans leading-none">
                    {formatMoney(product.salePrice || product.price)}
                  </Text>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showAction && (
        <div className="flex items-center shrink-0 ml-1">
          {isPartner ? (
            <IconButton 
              icon={copied ? <CheckCircle2 size={13} /> : <Copy size={13} />} 
              variant={copied ? "soft-partner" : "primary"}
              size="icon-xs"
              onClick={copyLink}
              label="Copy link"
              className="rounded-lg shadow-sm w-8 h-8 !bg-white !text-partner-primary border border-partner-primary/10"
            />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center text-text-disabled opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              <ChevronRight size={18} strokeWidth={2.5} />
            </div>
          )}
        </div>
      )}
    </Link>
  );
};
