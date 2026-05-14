import React from 'react';
import { Button } from '../ui';
import { MessageSquare } from 'lucide-react';
import { Order } from '../../types/order';
import { RewardTicket } from '../../types/reward';
import { useNavigate } from 'react-router-dom';

interface OrderActionsProps {
  order: Order;
  reward?: RewardTicket;
  onAction?: () => void;
}

export const OrderActions = ({ order, reward, onAction }: OrderActionsProps) => {
  const navigate = useNavigate();

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    if (onAction) onAction();
  };

  if (order.fulfillmentStatus === 'cancelled') {
    return (
      <div className="flex gap-2">
        <Button variant="soft-primary" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/p/${order.productId}`))}>Mua lại</Button>
        <Button variant="ghost" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/app/orders/${order.id}`))}>Chi tiết</Button>
      </div>
    );
  }

  if (order.paymentStatus === 'pending') {
    return (
      <div className="flex gap-2">
        <Button variant="accent" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/app/orders/${order.id}`))}>Thanh toán</Button>
        <Button variant="ghost" size="sm" className="flex-1 text-error" onClick={(e) => handleAction(e, () => console.log('Hủy'))}>Hủy đơn</Button>
      </div>
    );
  }

  if (order.fulfillmentStatus === 'shipped') {
    return (
      <div className="flex gap-2">
        <Button variant="primary" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/app/orders/${order.id}`))}>Theo dõi</Button>
        <Button variant="ghost" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/app/orders/${order.id}`))}>Chi tiết</Button>
      </div>
    );
  }

  if (order.fulfillmentStatus === 'completed') {
     return (
       <div className="flex gap-2">
         {reward && <Button variant="soft-accent" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/app/rewards`))}>Vé thưởng</Button>}
         <Button variant="soft-primary" size="sm" className="flex-1" onClick={(e) => handleAction(e, () => navigate(`/p/${order.productId}`))}>Mua lại</Button>
       </div>
     );
  }

  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="sm" className="flex-1 rounded-xl" onClick={(e) => handleAction(e, () => navigate(`/app/orders/${order.id}`))}>Chi tiết</Button>
      <Button variant="ghost" size="sm" className="flex-1 rounded-xl flex items-center justify-center gap-1" onClick={(e) => handleAction(e, () => console.log('Hỗ trợ'))}>
        <MessageSquare size={14} /> Hỗ trợ
      </Button>
    </div>
  );
};
