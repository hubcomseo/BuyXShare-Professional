import React from 'react';
import { QrCode, Banknote, Check, ShieldCheck, AlertCircle } from 'lucide-react';
import { PaymentMethod } from '../../../types/order';
import { Card } from '../../../components/ui/Card';
import { Text, CaptionText, BodyText } from '../../../components/ui/Typography';

interface PaymentMethodSelectionProps {
  selectedId: PaymentMethod;
  onSelect: (id: PaymentMethod) => void;
}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  selectedId,
  onSelect
}) => {
  const methods = [
    {
      id: 'qr' as PaymentMethod,
      name: 'Chuyển khoản bằng QR',
      description: 'Quét mã QR để thanh toán nhanh và xác nhận tự động.',
      icon: QrCode,
      badges: ['Nhanh chóng', 'Tự động']
    },
    {
      id: 'cod' as PaymentMethod,
      name: 'Thanh toán khi nhận hàng (COD)',
      description: 'Thanh toán cho nhân viên giao hàng khi đơn được giao đến bạn.',
      icon: Banknote,
      badges: ['An toàn']
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
              className={`p-5 transition-all duration-200 cursor-pointer border-2 flex gap-4 ${
                isSelected 
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/10 bg-indigo-500/5' 
                  : 'border-border-subtle hover:border-text-muted/30 bg-surface'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-surface-soft text-text-muted'}`}>
                <Icon size={26} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Text weight={600} className="block text-[15px]">{method.name}</Text>
                  {isSelected && <Check size={16} className="text-indigo-400" strokeWidth={3} />}
                </div>
                <BodyText className="text-[13px] leading-snug">{method.description}</BodyText>
                
                {method.id === 'cod' && isSelected && (
                  <div className="mt-3 flex items-start gap-2 bg-warning/10 p-2.5 rounded-lg border border-warning/20">
                     <AlertCircle size={14} className="text-warning mt-0.5" />
                     <CaptionText color="warning" weight={600} className="leading-tight normal-case italic">
                        Lưu ý: Vé thưởng sẽ được xác nhận sau khi đơn hàng được giao thành công và đối soát.
                     </CaptionText>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-text-muted py-2 opacity-60">
        <ShieldCheck size={14} />
        <CaptionText weight={600}>Thanh toán bảo mật 256-bit SSL</CaptionText>
      </div>
    </div>
  );
};
