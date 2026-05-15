import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { cn } from '../../lib/utils';
import { ProductImage } from './ProductImage';
import { ProductPrice } from './ProductPrice';
import { Badge } from '../ui';
import { Ticket, ChevronRight } from 'lucide-react';
import { formatMoney } from '../../utils/money';
import { Text, CaptionText } from '../ui/Typography';

interface CustomerProductListItemProps {
  product: Product;
  className?: string;
}

export const CustomerProductListItem: React.FC<CustomerProductListItemProps> = ({ 
  product, 
  className 
}) => {
  return (
    <Link 
      to={`/app/products/${product.slug}`}
      className={cn(
        "flex gap-4 px-4 py-3 border-b border-border-subtle/40 last:border-b-0 hover:bg-slate-50 transition-all group items-center min-h-[105px]", 
        className
      )}
    >
      {/* Product Image */}
      <div className="relative w-[84px] h-[84px] rounded-xl bg-bg-soft overflow-hidden shrink-0 border border-border-subtle/20">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name} 
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-center min-w-0 py-1">
        {product.brand && (
          <Text className="text-[10px] text-text-disabled uppercase font-bold tracking-wider mb-0.5" >
            {product.brand}
          </Text>
        )}
        <Text className="line-clamp-2 leading-tight text-text-primary text-[15px] font-bold mb-1 font-heading">
          {product.name}
        </Text>
        
        <ProductPrice 
          price={product.price} 
          salePrice={product.salePrice}
          size="sm"
        />
      </div>
      
      {/* Right Chevron */}
      <div className="w-8 h-8 flex items-center justify-center text-text-disabled opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
        <ChevronRight size={18} strokeWidth={2.5} />
      </div>
    </Link>
  );
};
