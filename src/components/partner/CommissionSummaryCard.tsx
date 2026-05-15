import React from 'react';
import { CardTitle, CaptionText } from '../ui/Typography';
import { Clock, CheckCircle2 } from 'lucide-react';
import { formatMoney } from '../../utils/money';

interface CommissionSummaryCardProps {
  pending: number;
  paid: number;
}

export const CommissionSummaryCard = ({ pending, paid }: CommissionSummaryCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-surface p-4 rounded-xl border border-border-subtle shadow-sm">
         <div className="flex items-center gap-1.5 mb-1.5">
            <Clock size={12} className="text-warning" />
            <CaptionText color="muted" className="uppercase tracking-widest">Chờ duyệt</CaptionText>
         </div>
         <CardTitle color="dark" weight={600}>{formatMoney(pending)}</CardTitle>
      </div>
      <div className="bg-surface p-4 rounded-xl border border-border-subtle shadow-sm">
         <div className="flex items-center gap-1.5 mb-1.5">
            <CheckCircle2 size={12} className="text-partner-primary" />
            <CaptionText color="muted" className="uppercase tracking-widest">Đã thanh toán</CaptionText>
         </div>
         <CardTitle color="dark" weight={600}>{formatMoney(paid)}</CardTitle>
      </div>
    </div>
  );
};
