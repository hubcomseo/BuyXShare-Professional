import React from 'react';
import { Badge, ProductStockBadge } from '../ui';
import { TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProductBadgesProps {
  commissionRate?: number;
  stock?: number;
  hot?: boolean;
  sale?: boolean;
  className?: string;
  size?: 'xxs' | 'xs' | 'sm';
}

export const ProductBadges: React.FC<ProductBadgesProps> = ({ 
  commissionRate, 
  stock,
  hot,
  sale,
  className,
  size = 'sm'
}) => {
  const badgeSize = size;
  
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {sale && (
        <Badge variant="sale" size={badgeSize} className="px-1.5 font-black uppercase tracking-tighter">
          SALE
        </Badge>
      )}
      {hot && !sale && (
        <Badge variant="warning" size={badgeSize} uppercase className="font-black italic">
          <TrendingUp size={size === 'xxs' ? 8 : (size === 'xs' ? 10 : 12)} className="mr-0.5" /> HOT
        </Badge>
      )}
      {commissionRate !== undefined && commissionRate > 0 && (
        <Badge variant="commission" size={badgeSize} className="font-black">
          {commissionRate}% HH
        </Badge>
      )}
    </div>
  );
};
