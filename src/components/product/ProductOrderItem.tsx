import React from 'react';
import { 
  Badge, 
  PaymentStatusBadge, 
  FulfillmentStatusBadge, 
  CommissionStatusBadge, 
  RewardStatusBadge, 
  ReconciliationStatusBadge 
} from '../ui';
import { Text, PriceText, CaptionText } from '../ui/Typography';
import { formatMoney } from '../../utils/money';
import { cn } from '../../lib/utils';
import { Package, User, Store } from 'lucide-react';
import { ProductImage } from './ProductImage';

export type OrderRole = 'customer' | 'partner' | 'supplier' | 'admin';

interface ProductOrderItemProps {
  image?: string;
  name: string;
  brand?: string;
  amount: number;
  orderCode?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  commissionStatus?: string;
  commissionAmount?: number;
  reconciliationStatus?: string;
  rewardStatus?: string;
  role: OrderRole;
  supplierName?: string;
  partnerName?: string;
  customerPhoneMasked?: string;
  className?: string;
  onClick?: () => void;
}

export const ProductOrderItem: React.FC<ProductOrderItemProps> = ({
  image,
  name,
  brand,
  amount,
  orderCode,
  paymentStatus,
  fulfillmentStatus,
  commissionStatus,
  commissionAmount,
  reconciliationStatus,
  rewardStatus,
  role,
  supplierName,
  partnerName,
  customerPhoneMasked,
  className,
  onClick,
}) => {
  const renderRoleContent = () => {
    switch (role) {
      case 'customer':
        return (
          <div className="flex flex-col gap-1.5">
             <div className="flex justify-between items-center">
                <PriceText size="sm" className="text-text-primary">{formatMoney(amount)}</PriceText>
                <div className="flex gap-1">
                   {paymentStatus && <PaymentStatusBadge status={paymentStatus} size="xs" type="short" />}
                   {fulfillmentStatus && <FulfillmentStatusBadge status={fulfillmentStatus} size="xs" type="short" />}
                </div>
             </div>
             {rewardStatus && (
               <div className="flex items-center gap-2 pt-1 border-t border-border-subtle">
                  <CaptionText color="muted">Vé thưởng:</CaptionText>
                  <RewardStatusBadge status={rewardStatus} size="xs" />
               </div>
             )}
          </div>
        );
      case 'partner':
        return (
          <div className="space-y-1">
            <div className="flex justify-between items-center">
               <PriceText size="sm" className="text-text-primary">{formatMoney(amount)}</PriceText>
               <div className="text-right">
                  <PriceText size="sm" className="text-partner-primary">+{formatMoney(commissionAmount || 0)}</PriceText>
                  <CaptionText color="muted">Hoa hồng</CaptionText>
               </div>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-border-subtle gap-2">
               {commissionStatus && <CommissionStatusBadge status={commissionStatus} size="xs" type="short" />}
               {customerPhoneMasked && (
                 <div className="flex items-center gap-1 text-text-primary/40">
                    <User size={10} />
                    <CaptionText>{customerPhoneMasked}</CaptionText>
                 </div>
               )}
            </div>
          </div>
        );
      case 'supplier':
        return (
          <div className="space-y-1">
            <div className="flex justify-between items-end">
               <div className="flex gap-1">
                  {paymentStatus && <PaymentStatusBadge status={paymentStatus} size="xs" type="short" />}
                  {fulfillmentStatus && <FulfillmentStatusBadge status={fulfillmentStatus} size="xs" type="short" />}
               </div>
               <PriceText size="sm" className="text-text-primary">{formatMoney(amount)}</PriceText>
            </div>
            {reconciliationStatus && (
               <div className="pt-1 border-t border-border-subtle">
                  <ReconciliationStatusBadge status={reconciliationStatus} size="xs" type="short" />
               </div>
            )}
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-1.5">
            <div className="flex flex-wrap gap-1 mb-1">
               {supplierName && (
                 <Badge variant="neutral" size="xs" className="flex items-center gap-1 normal-case px-2 border-border-subtle">
                    <Store size={10} /> {supplierName}
                 </Badge>
               )}
               {partnerName && (
                 <Badge variant="neutral" size="xs" className="flex items-center gap-1 normal-case px-2 border-border-subtle text-partner-primary">
                    <User size={10} /> {partnerName}
                 </Badge>
               )}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border-subtle">
               <div className="space-y-1">
                  <CaptionText color="muted">Thanh toán</CaptionText>
                  <div className="flex flex-wrap gap-1">
                     {paymentStatus && <PaymentStatusBadge status={paymentStatus} size="xs" type="short" />}
                     {reconciliationStatus && <ReconciliationStatusBadge status={reconciliationStatus} size="xs" type="short" />}
                  </div>
               </div>
               <div className="space-y-1">
                  <CaptionText color="muted">Vận hành</CaptionText>
                  <div className="flex flex-wrap gap-1">
                     {fulfillmentStatus && <FulfillmentStatusBadge status={fulfillmentStatus} size="xs" type="short" />}
                     {commissionStatus && <CommissionStatusBadge status={commissionStatus} size="xs" type="short" />}
                  </div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        "py-3 flex gap-3 transition-all duration-200 group border-b border-border-subtle last:border-0",
        onClick && "cursor-pointer hover:bg-surface/50",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl shrink-0">
        {image ? (
          <ProductImage 
            src={image} 
            alt={name} 
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full rounded-xl bg-surface flex items-center justify-center border border-border-subtle text-text-primary/20">
            <Package size={20} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div className="space-y-0.5">
          {orderCode && <CaptionText color="primary" weight={600} className="block text-[10px] leading-none mb-1">#{orderCode}</CaptionText>}
          <Text className="text-[14px] leading-[17px] font-semibold text-text-primary line-clamp-2">
            {name}
          </Text>
          {brand && <Text className="text-[8px] font-medium text-text-disabled uppercase tracking-tight line-clamp-1">{brand}</Text>}
        </div>
        
        <div className="mt-2 pt-2 border-t border-border-subtle">
           {renderRoleContent()}
        </div>
      </div>
    </div>
  );
};
