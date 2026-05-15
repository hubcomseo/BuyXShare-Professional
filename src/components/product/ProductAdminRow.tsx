import React from 'react';
import { Product } from '../../types/product';
import { formatMoney } from '../../utils/money';
import { Text, CaptionText } from '../ui/Typography';
import { cn } from '../../lib/utils';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { IconButton, CampaignStatusBadge } from '../ui';
import { ProductImage } from './ProductImage';

interface ProductAdminRowProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
  className?: string;
}

export const ProductAdminRow: React.FC<ProductAdminRowProps> = ({ 
  product, 
  onEdit, 
  onDelete,
  onView,
  className 
}) => {
  return (
    <div className={cn("grid grid-cols-12 gap-3 items-center p-3 bg-surface border-b border-border-subtle hover:bg-surface/50 transition-colors", className)}>
      <div className="col-span-1">
        <ProductImage 
          src={product.images?.[0]} 
          alt={product.name} 
          className="w-10 h-10 rounded-lg"
        />
      </div>
      
      <div className="col-span-4 min-w-0">
        <Text className="text-[14px] leading-[17px] font-semibold text-text-primary line-clamp-1">{product.name}</Text>
        <Text className="text-[8px] font-medium text-text-disabled uppercase tracking-tight">{product.brand} • {product.category}</Text>
      </div>
      
      <div className="col-span-2 text-right">
        <Text variant="body-sm" weight={600} className="text-text-primary">{formatMoney(product.salePrice || product.price)}</Text>
        {product.salePrice && <CaptionText className="line-through">{formatMoney(product.price)}</CaptionText>}
      </div>
      
      <div className="col-span-1 text-center">
        <Text variant="body-sm" weight={600}>{product.stock}</Text>
        <CaptionText color="muted">Kho</CaptionText>
      </div>
      
      <div className="col-span-2 text-center">
        <CampaignStatusBadge status={product.status || 'active'} size="xs" />
      </div>
      
      <div className="col-span-2 flex justify-end items-center gap-0.5">
        <IconButton 
          variant="ghost" 
          size="sm" 
          label="View" 
          onClick={() => onView?.(product)}
          icon={<Eye size={16} className="text-text-primary/40" />}
        />
        <IconButton 
          variant="ghost" 
          size="sm" 
          label="Edit" 
          onClick={() => onEdit?.(product)}
          icon={<Edit2 size={16} className="text-customer-strong" />}
        />
        <IconButton 
          variant="ghost" 
          size="sm" 
          label="Delete" 
          onClick={() => onDelete?.(product)}
          icon={<Trash2 size={16} className="text-rose-400" />}
        />
      </div>
    </div>
  );
};
