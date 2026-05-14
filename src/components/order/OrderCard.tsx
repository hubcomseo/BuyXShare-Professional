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
      className="bg-surface rounded-3xl border border-border-subtle shadow-sm overflow-hidden group hover:border-primary/30 transition-all cursor-pointer relative"
    >
      {/* Header section */}
      <div className="flex justify-between items-center p-4 border-b border-border-subtle/50 bg-bg-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="text-xs font-black">#{order.orderCode.slice(-4)}</span>
          </div>
          <div>
            <div className="text-sm font-bold text-text-primary uppercase tracking-wider">{order.orderCode}</div>
            <div className="text-xs text-text-muted mt-0.5">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</div>
          </div>
        </div>
        <FulfillmentStatusBadge status={order.fulfillmentStatus} size="sm" />
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-surface-soft border border-border-subtle shrink-0 shadow-sm relative group-hover:scale-105 transition-transform duration-500">
            <img src={product?.images?.[0]} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center space-y-2">
            <Text variant="body-md" weight={600} className="line-clamp-2 text-text-primary">{product?.name}</Text>
            
            <div className="flex items-center gap-2">
               <PaymentStatusBadge status={order.paymentStatus} size="xs" />
               {reward && <RewardStatusBadge status={reward.status} size="xs" />}
            </div>
            
            <div className="flex items-end justify-between pt-1">
              <div className="flex flex-col">
                 <CaptionText className="text-text-muted mb-0.5 font-medium">1 sản phẩm</CaptionText>
                 <PriceText size="md" color="primary">{formatMoney(order.total)}</PriceText>
              </div>
              {isPartner && commission > 0 && (
                 <div className="text-right bg-partner-primary/10 px-2.5 py-1.5 rounded-xl border border-partner-primary/20">
                   <CaptionText className="text-partner-primary font-bold block uppercase text-[9px] tracking-widest mb-0.5">Hoa hồng</CaptionText>
                   <div className="text-partner-primary font-bold text-sm tracking-tight">{formatMoney(commission)}</div>
                 </div>
              )}
              {appMode === 'admin' && (
                 <div className="text-right bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                   <CaptionText className="text-emerald-600 font-bold block uppercase text-[10px] tracking-widest mb-0.5">Đối soát</CaptionText>
                   <div className="text-emerald-600 font-bold text-base tracking-tight">{formatMoney(order.total * 0.8)}</div>
                 </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle/50" onClick={(e) => e.stopPropagation()}>
          <OrderActions order={order} reward={reward} onAction={onAction} />
        </div>
      </div>
    </motion.div>
  );
};
