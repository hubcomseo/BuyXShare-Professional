import React from 'react';
import { motion } from 'motion/react';
import { Text, CaptionText, PriceText } from '../ui/Typography';
import { PaymentStatusBadge, FulfillmentStatusBadge, RewardStatusBadge } from '../ui';
import { formatMoney } from '../../utils/money';
import { Order } from '../../types/order';
import { RewardTicket } from '../../types/reward';
import { Product } from '../../types/product';
import { AppMode } from '../../theme/roleColors';
import { useNavigate } from 'react-router-dom';
import { OrderActions } from './OrderActions';

interface OrderCardProps {
  order: Order;
  product?: Product;
  reward?: RewardTicket;
  appMode: AppMode;
  onAction?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, product, reward, appMode, onAction }) => {
  const navigate = useNavigate();
  // commission calculate based on role
  const isPartner = appMode === 'partner';
  const commission = product ? (product.salePrice || product.price) * ((product.commissionRate || 0) / 100) : 0;

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => navigate(`/app/orders/${order.id}`)}
      className="bg-surface rounded-2xl border border-border-subtle shadow-sm overflow-hidden group hover:border-customer-primary/30 transition-all cursor-pointer relative"
    >
      {/* Header section */}
      <div className="flex justify-between items-center p-4 border-b border-border-subtle bg-bg-soft/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-customer-soft flex items-center justify-center text-customer-primary">
            <span className="text-xs font-black">#{order.orderCode.slice(-4)}</span>
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary uppercase tracking-tight">{order.orderCode}</div>
            <div className="text-[11px] text-text-muted font-medium mt-0.5">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
          </div>
        </div>
        <FulfillmentStatusBadge status={order.fulfillmentStatus} size="sm" />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-bg-soft border border-border-subtle shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
            <img src={product?.images?.[0]} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
            <Text variant="body-md" weight={600} className="line-clamp-2 text-text-primary leading-tight">{product?.name}</Text>
            
            <div className="flex items-center gap-2">
               <PaymentStatusBadge status={order.paymentStatus} size="sm" />
               {reward && <RewardStatusBadge status={reward.status} size="sm" />}
            </div>
            
            <div className="flex items-end justify-between pt-1">
              <div className="flex flex-col">
                 <CaptionText className="text-text-muted mb-0.5 font-bold uppercase text-[9px] tracking-wide">Tổng thanh toán</CaptionText>
                 <PriceText size="md" color="dark">{formatMoney(order.total)}</PriceText>
              </div>
              {isPartner && commission > 0 && (
                 <div className="text-right bg-partner-soft px-3 py-1.5 rounded-xl border border-partner-border">
                   <CaptionText className="text-partner-text font-bold block uppercase text-[9px] tracking-wider mb-0.5">Hoa hồng</CaptionText>
                   <div className="text-partner-text font-bold text-sm tracking-tight">{formatMoney(commission)}</div>
                 </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle" onClick={(e) => e.stopPropagation()}>
          <OrderActions order={order} reward={reward} onAction={onAction} />
        </div>
      </div>
    </motion.div>
  );
};
