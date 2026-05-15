import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text, LabelText, CardTitle, PriceText, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductBadges } from './ProductBadges';
import { ProductPrice } from './ProductPrice';
import { Badge, Button, IconButton } from '../ui';
import { Copy, CheckCircle2, Star } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { useStore } from '../../store';

interface ProductPartnerCardProps {
  product: Product;
  className?: string;
}

export const ProductPartnerCard: React.FC<ProductPartnerCardProps> = ({ 
  product, 
  className 
}) => {
  const { user } = useStore();
  const [copied, setCopied] = React.useState(false);
  const commissionPrice = (product.salePrice || product.price) * (product.commissionRate / 100);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user?.id) {
       const link = `${window.location.origin}/p/${product.slug}?partner=${user.id}`;
       navigator.clipboard.writeText(link);
       setCopied(true);
       setTimeout(() => setCopied(false), 2000);
    }
  };

  const productUrl = `/app/partner/marketplace/products/${product.slug}`;

  return (
    <div 
      className={cn(
        "group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-border-subtle transition-all relative active:scale-[0.98]",
        className
      )}
    >
      {/* Product Image */}
      <Link to={productUrl} className="block relative aspect-square bg-slate-100 overflow-hidden">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          overlay={
            <>
              <div className="absolute bottom-2 right-2">
                <IconButton 
                  onClick={copyLink}
                  variant="secondary"
                  size="icon-xs"
                  icon={copied ? <CheckCircle2 size={12} /> : <Copy size={12} />}
                  label="Copy affiliate link"
                  className="shadow-md rounded-full h-8 w-8 bg-white/90 backdrop-blur-sm text-partner-primary border-none hover:bg-white"
                />
              </div>
            </>
          }
        />
      </Link>
      
      {/* Product Info Area */}
      <div className="p-3">
        {/* 1. Brand & Rating */}
        <div className="flex items-center justify-between mb-1">
          {product.brand && (
            <Text className="text-[6.5px] text-text-muted font-medium tracking-tight line-clamp-1 leading-none">
              {product.brand}
            </Text>
          )}
          <div className="flex items-center gap-0.5">
            <Text className="text-[9px] text-text-muted font-bold leading-none">4.5</Text>
            <Star size={12} strokeWidth={2} className="text-yellow-500" />
          </div>
        </div>
        
        {/* 2. Product Name */}
        <Text className="text-text-primary text-[14px] leading-[17px] font-semibold line-clamp-2 mb-1.5">
          {product.name}
        </Text>

        <ProductPrice 
          price={product.price} 
          salePrice={product.salePrice}
          commission={product.commissionRate}
          variant="partner"
          size="sm"
          className="!gap-1"
        />
      </div>
    </div>
  );
};

