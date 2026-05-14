import React from 'react';
import { Truck, Zap, Store, Check, Info } from 'lucide-react';
import { DeliveryMethod } from '../../../types/order';
import { Card } from '../../../components/ui/Card';
import { Text, CaptionText, PriceText } from '../../../components/ui/Typography';
import { formatMoney } from '../../../utils/money';

interface DeliveryMethodSelectionProps {
  selectedId: DeliveryMethod;
  onSelect: (id: DeliveryMethod) => void;
}

export const DeliveryMethodSelection: React.FC<DeliveryMethodSelectionProps> = ({
  selectedId,
  onSelect
}) => {
  const methods = [
    {
      id: 'standard' as DeliveryMethod,
      name: 'Giao hàng tiêu chuẩn',
      time: '2–5 ngày',
      fee: 25000,
      icon: Truck,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'express' as DeliveryMethod,
      name: 'Giao hàng nhanh',
      time: '1–2 ngày',
      fee: 45000,
      icon: Zap,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'pickup' as DeliveryMethod,
      name: 'Nhận tại điểm bán',
      time: 'Trong ngày',
      fee: 0,
      icon: Store,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {methods.map((method) => {
          const isSelected = method.id === selectedId;
          const Icon = method.icon;
          
          return (
            <Card
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-4 transition-all duration-200 cursor-pointer border-2 flex items-center gap-4 ${
                isSelected 
                  ? 'border-primary shadow-lg shadow-primary/5 bg-primary/5' 
                  : 'border-border-subtle hover:border-text-muted/30 bg-surface'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-primary/20 text-primary-light' : 'bg-surface-soft text-text-muted'}`}>
                <Icon size={24} />
              </div>

              <div className="flex-1 min-w-0">
                <Text weight={600} className="block text-sm">{method.name}</Text>
                <CaptionText color="muted">{method.time}</CaptionText>
              </div>

              <div className="text-right">
                <PriceText size="sm" color={isSelected ? 'primary' : 'dark'}>
                  {method.fee === 0 ? 'Miễn phí' : formatMoney(method.fee)}
                </PriceText>
                <div className={`mt-1 h-5 w-5 ml-auto rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-primary bg-primary' : 'border-border-strong bg-surface'
                }`}>
                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-start gap-2 bg-text-primary/5 p-3 rounded-xl border border-border-subtle">
        <Info size={14} className="text-text-muted mt-0.5" />
        <CaptionText className="leading-relaxed">
          Thời gian giao hàng là dự kiến, có thể thay đổi tùy theo vị trí của bạn và đơn vị vận chuyển.
        </CaptionText>
      </div>
    </div>
  );
};
