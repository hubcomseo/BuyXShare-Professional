import React from 'react';
import { PriceText, CaptionText, Text } from '../ui/Typography';
import { formatMoney } from '../../utils/money';
import { AppMode } from '../../theme/roleColors';

interface OrderPriceBreakdownProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  commission?: number;
  reconciliationAmount?: number;
  appMode: AppMode;
}

export const OrderPriceBreakdown = ({ subtotal, shipping, discount, total, commission, reconciliationAmount, appMode }: OrderPriceBreakdownProps) => {
  const isPartner = appMode === 'partner';

  return (
    <div className="bg-surface rounded-3xl p-6 border border-border-subtle shadow-sm space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <CaptionText color="medium">Tạm tính</CaptionText>
          <Text variant="body-sm" weight={600} color="dark">{formatMoney(subtotal)}</Text>
        </div>
        <div className="flex justify-between items-center">
          <CaptionText color="medium">Phí vận chuyển</CaptionText>
          <Text variant="body-sm" weight={600} color="dark">{formatMoney(shipping)}</Text>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <CaptionText color="medium">Giảm giá</CaptionText>
            <Text variant="body-sm" weight={600} color="primary">-{formatMoney(discount)}</Text>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border-subtle">
        <div className="flex justify-between items-end">
          <CaptionText color="dark" weight={600}>Tổng cộng</CaptionText>
          <PriceText size="md" color="primary">{formatMoney(total)}</PriceText>
        </div>
      </div>

      {isPartner && commission !== undefined && commission > 0 && (
        <div className="pt-4 border-t border-border-subtle space-y-2">
          <div className="flex justify-between items-center bg-partner-primary/10 p-3 rounded-xl border border-partner-primary/20">
            <CaptionText color="dark" weight={600} className="text-partner-primary uppercase tracking-widest text-[10px]">Hoa hồng của bạn</CaptionText>
            <PriceText size="sm" className="text-partner-primary">{formatMoney(commission)}</PriceText>
          </div>
        </div>
      )}

      {reconciliationAmount !== undefined && reconciliationAmount > 0 && (
         <div className="pt-4 border-t border-border-subtle space-y-2">
          <div className="flex justify-between items-center bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
            <CaptionText color="dark" weight={600} className="text-emerald-600 uppercase tracking-widest text-[10px]">Đối soát thanh toán</CaptionText>
            <PriceText size="sm" className="text-emerald-700">{formatMoney(reconciliationAmount)}</PriceText>
          </div>
         </div>
      )}
    </div>
  );
};
