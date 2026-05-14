import React from 'react';
import { cn } from '../../lib/utils';
import { ShoppingBag } from 'lucide-react';
import { Text } from '../ui/Typography';

interface CustomerModeIndicatorProps {
  className?: string;
  showLabel?: boolean;
}

export const CustomerModeIndicator: React.FC<CustomerModeIndicatorProps> = ({ className, showLabel = true }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <div className="w-8 h-8 rounded-full bg-customer-subtle flex items-center justify-center border border-customer-primary/20 shrink-0">
          <ShoppingBag size={14} className="text-customer-primary" />
       </div>
       {showLabel && (
         <div className="flex flex-col">
            <Text variant="caption" weight={600} className="text-customer-badge-text text-[10px] uppercase tracking-wider">Chế độ</Text>
            <Text variant="body-sm" weight={600} className="text-white leading-tight">Khách hàng</Text>
         </div>
       )}
    </div>
  );
};
