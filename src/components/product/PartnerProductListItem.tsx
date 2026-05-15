import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { Badge, IconButton } from '../ui';
import { Copy, CheckCircle2 } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { Text } from '../ui/Typography';
import { ProductPrice } from './ProductPrice';

interface PartnerProductListItemProps {
  product: Product;
  className?: string;
}

export const PartnerProductListItem: React.FC<PartnerProductListItemProps> = ({ 
  product, 
  className 
}) => {
  const [copied, setCopied] = useState(false);
  const commissionPrice = (product.salePrice || product.price) * (product.commissionRate || 0) / 100;
  
  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/app/products/${product.slug}?ref=user`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={cn(
        "flex gap-3 px-4 py-3 border-b border-border-subtle/40 last:border-b-0 hover:bg-slate-50 transition-all items-center min-h-[90px]", 
        className
      )}
    >
      {/* 1. Product Image left */}
      <Link 
        to={`/app/partner/marketplace/products/${product.slug}`}
        className="relative w-[72px] h-[72px] rounded-xl bg-bg-soft overflow-hidden shrink-0 border border-border-subtle/20"
      >
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name} 
        />
        <div className="absolute top-1 left-1">
          <Badge variant="commission" size="xxs" className="font-black h-3.5 px-1 shadow-sm bg-partner-primary text-white border-none">
            {product.commissionRate}%
          </Badge>
        </div>
      </Link>
      
      {/* Content center */}
      <div className="flex-1 flex flex-col justify-center min-w-0 py-1">
        {/* 1. Brand */}
        {product.brand && (
          <Text className="text-[10px] text-text-disabled uppercase font-bold tracking-wider mb-0.5">
            {product.brand}
          </Text>
        )}
        
        {/* 2. Product Name */}
        <Text className="text-text-primary text-[15px] leading-tight font-bold line-clamp-1 mb-1 font-heading">
          {product.name}
        </Text>
        
        <ProductPrice 
          price={product.price} 
          salePrice={product.salePrice}
          commission={commissionPrice}
          variant="partner"
          size="sm"
        />
      </div>
      
      {/* Action right */}
      <div className="shrink-0 ml-1">
        <IconButton 
          icon={copied ? <CheckCircle2 size={13} /> : <Copy size={13} />} 
          variant="secondary"
          size="icon-xs"
          onClick={copyLink}
          label="Copy affiliate link"
          className="rounded-full shadow-sm w-9 h-9 bg-white text-partner-primary border border-partner-primary/10 hover:bg-slate-50"
        />
      </div>
    </div>
  );
};
