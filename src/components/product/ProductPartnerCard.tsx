import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { Text, LabelText, CardTitle, PriceText, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductBadges } from './ProductBadges';
import { ProductPrice } from './ProductPrice';
import { Badge, Button, IconButton } from '../ui';
import { Copy, CheckCircle2 } from 'lucide-react';
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
              <div className="absolute top-2 left-2">
                <Badge variant="commission" size="xxs" className="font-black h-4 px-1.5 shadow-sm bg-partner-primary text-white border-none">
                  {product.commissionRate}%
                </Badge>
              </div>
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
        {/* 1. Brand */}
        {product.brand && (
          <Text className="text-[8px] text-text-disabled uppercase font-medium tracking-tight line-clamp-1 mb-1">
            {product.brand}
          </Text>
        )}
        
        {/* 2. Product Name */}
        <Text className="text-text-primary text-[14px] leading-[17px] font-semibold line-clamp-2 mb-1.5">
          {product.name}
        </Text>

        <ProductPrice 
          price={product.price} 
          salePrice={product.salePrice}
          commission={commissionPrice}
          variant="partner"
          size="sm"
          className="!gap-1"
        />
      </div>
    </div>
  );
};

