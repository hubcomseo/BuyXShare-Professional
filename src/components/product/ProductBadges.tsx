import React from 'react';
import { Badge, ProductStockBadge } from '../ui';
import { TrendingUp } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProductBadgesProps {
  commissionRate?: number;
  stock?: number;
  hot?: boolean;
  className?: string;
}

export const ProductBadges: React.FC<ProductBadgesProps> = ({ 
  commissionRate, 
  stock,
  hot,
  className 
}) => {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {hot && (
        <Badge variant="warning" size="xs" uppercase>
          <TrendingUp size={10} className="mr-1" /> HOT
        </Badge>
      )}
      {commissionRate !== undefined && commissionRate > 0 && (
        <Badge variant="commission" size="xs">
          {commissionRate}% <span className="ml-1 hidden sm:inline">Hoa hồng</span>
        </Badge>
      )}
      {stock !== undefined && stock < 10 && stock > 0 && (
        <ProductStockBadge status="low_stock" size="xs" uppercase />
      )}
    </div>
  );
};
