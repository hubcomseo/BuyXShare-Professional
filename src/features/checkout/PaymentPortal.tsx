import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { 
  QrCode, 
  Copy, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Download,
  Smartphone
} from 'lucide-react';
import { orderService } from '../../services/order.service';
import { formatMoney } from '../../utils/money';
import { Text, Heading, BodyText, CaptionText, PriceText } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Button, IconButton } from '../../components/ui';
import { ErrorState } from '../../components/feedback';
import { useToast } from '../../components/toast';

interface PaymentPortalProps {
  order: any;
  product?: any;
  isLandingPage?: boolean;
}

export const PaymentPortal = ({ order, product, isLandingPage }: PaymentPortalProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const simulateMutation = useMutation({
    mutationFn: () => orderService.simulatePayment(order.id),
    onSuccess: () => {
      showToast({
        title: 'Thanh toán thành công',
        message: 'Đơn hàng của bạn đã được thanh toán',
        variant: 'success'
      });
      navigate(`/p/success/${order.id}`, { state: { orderId: order.id } });
    }
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast({
      title: field === 'account' ? 'Đã sao chép số tài khoản' : 'Đã sao chép nội dung chuyển khoản',
      type: 'copy',
      contentType: field === 'account' ? 'account' : 'content'
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-sm mx-auto">
      <div className="text-center space-y-2">
        <Heading variant="h2" color="dark">Quét mã QR</Heading>
        <CaptionText align="center" color="muted">Mã đơn: <span className="text-text-primary font-medium">{order.orderCode}</span></CaptionText>
      </div>

      <div className="bg-surface rounded-[2rem] border border-border-subtle p-6 flex flex-col items-center">
         {/* QR Code */}
         <div className="bg-white p-4 rounded-xl border border-border-subtle mb-6 relative">
            <QrCode size={200} className="text-slate-900" />
            {timeLeft === 0 && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl">
                 <Text weight={600} color="error" className="mb-2 text-sm">Mã hết hạn</Text>
                 <Button size="sm" onClick={() => setTimeLeft(600)}>Giữ thanh toán</Button>
              </div>
            )}
         </div>

         <div className="text-center w-full space-y-4">
            <PriceText size="md" color="primary">{formatMoney(order.total)}</PriceText>
            
            <div className="flex items-center justify-center gap-1.5 opacity-60">
               <div className={`w-1.5 h-1.5 rounded-full ${timeLeft > 60 ? 'bg-success' : 'bg-error animate-pulse'}`} />
               <CaptionText weight={600} className="text-[11px] tracking-wider uppercase">Hết hạn sau {formatTime(timeLeft)}</CaptionText>
            </div>
         </div>
      </div>

      <div className="space-y-4">
         <Text variant="label" weight={600} uppercase color="muted">Chuyển khoản thủ công</Text>
         <div className="space-y-3 p-1">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle border-dashed">
               <Text variant="body-md">Ngân hàng</Text>
               <div className="flex items-center gap-2">
                 <Text weight={600} className="text-sm">Vietcombank</Text>
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logo_Vietcombank.svg/2560px-Logo_Vietcombank.svg.png" alt="VCB" className="h-4 object-contain grayscale" />
               </div>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border-subtle border-dashed">
               <Text variant="body-md">Chủ TK</Text>
               <Text weight={600} className="text-sm">BUYXSHARE MPTC</Text>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border-subtle border-dashed group">
               <Text variant="body-md">Số TK</Text>
               <div className="flex items-center gap-3">
                 <Text weight={600} className="font-mono text-sm tracking-widest text-primary-light">1026458392</Text>
                 <IconButton 
                   onClick={() => handleCopy('1026458392', 'account')}
                   icon={copiedField === 'account' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                   size="sm"
                   variant={copiedField === 'account' ? 'soft-accent' : 'secondary'}
                   label="Copy Account Number"
                 />
               </div>
            </div>

            <div className="flex items-center justify-between group">
               <Text variant="body-md">Nội dung</Text>
               <div className="flex items-center gap-3">
                 <Text weight={600} className="font-mono text-sm tracking-widest text-primary-light">{order.orderCode}</Text>
                 <IconButton 
                   onClick={() => handleCopy(order.orderCode, 'content')}
                   icon={copiedField === 'content' ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                   size="sm"
                   variant={copiedField === 'content' ? 'soft-accent' : 'secondary'}
                   label="Copy Content"
                 />
               </div>
            </div>
         </div>
      </div>

      <Button 
         onClick={() => simulateMutation.mutate()}
         loading={simulateMutation.isPending}
         variant="accent"
         size="xl"
         fullWidth
         className="mt-6"
      >
         {simulateMutation.isPending ? 'ĐANG DUYỆT...' : 'TÔI ĐÃ CHUYỂN KHOẢN'}
      </Button>
    </div>
  );
};
