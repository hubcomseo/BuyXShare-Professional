import React from 'react';
import { Card } from '../ui/Card';
import { SectionTitle, CaptionText } from '../ui/Typography';
import { ShoppingBag } from 'lucide-react';
import { formatMoney } from '../../utils/money';

interface OrderSummaryCardProps {
  orderCode: string;
  total: number;
}

export const OrderSummaryCard = ({ orderCode, total }: OrderSummaryCardProps) => {
  return (
    <Card className="p-4 bg-surface rounded-2xl border border-border-subtle flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <ShoppingBag size={20} />
         </div>
         <div>
            <CaptionText color="muted">Mã đơn hàng</CaptionText>
            <SectionTitle variant="h3" className="uppercase">#{orderCode}</SectionTitle>
         </div>
      </div>
      <div className="text-right">
         <CaptionText color="muted">Tổng cộng</CaptionText>
         <SectionTitle variant="h3" color="primary">{formatMoney(total)}</SectionTitle>
      </div>
    </Card>
  );
};
