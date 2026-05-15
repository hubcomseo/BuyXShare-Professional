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
import { cn } from '../../lib/utils';
import { useTranslation } from '../../lib/i18n';

interface PaymentPortalProps {
  order: any;
  product?: any;
  isLandingPage?: boolean;
}

export const PaymentPortal = ({ order, product, isLandingPage }: PaymentPortalProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t } = useTranslation();
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-sm mx-auto pt-6">
      <div className="text-center space-y-3">
        <Heading color="dark" className="text-3xl font-black italic uppercase tracking-tighter m-0">Quét mã QR</Heading>
        <CaptionText align="center" className="text-text-disabled uppercase tracking-widest text-[10px] bg-bg-soft px-4 py-1.5 rounded-full w-fit mx-auto border border-border-subtle">
           Mã đơn: <span className="text-text-primary font-bold font-mono">{order.orderCode}</span>
        </CaptionText>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-border-subtle p-8 flex flex-col items-center shadow-sm relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-customer-soft/50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-customer-primary/10 transition-colors"></div>
         
         {/* QR Code Container */}
         <div className="bg-bg-soft p-5 rounded-[2rem] border border-border-subtle mb-8 relative shadow-inner">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-border-subtle">
               <QrCode size={200} className="text-slate-900" strokeWidth={1} />
            </div>
            {timeLeft === 0 && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center rounded-[2rem] p-6 text-center space-y-4">
                 <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                    <Info size={24} />
                 </div>
                 <Text weight={800} color="error" className="text-sm uppercase italic leading-none">{t('checkout_error_title')}</Text>
                 <Button size="sm" variant="outline" className="rounded-xl font-bold" onClick={() => setTimeLeft(600)}>Giữ thanh toán</Button>
              </div>
            )}
         </div>

         <div className="text-center w-full space-y-6">
            <div className="flex flex-col items-center gap-1">
               <Text weight={800} className="text-text-disabled uppercase tracking-[3px] text-[10px] italic">Số tiền cần trả</Text>
               <Text weight={900} className="text-4xl font-black italic tracking-tighter text-customer-primary leading-none">{formatMoney(order.total)}</Text>
            </div>
            
            <div className="flex items-center justify-center gap-2 bg-bg-soft px-6 py-3 rounded-2xl border border-border-subtle w-fit mx-auto">
               <div className={cn(
                  "w-2 h-2 rounded-full",
                  timeLeft > 60 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]'
               )} />
               <CaptionText weight={800} className="text-[10px] tracking-widest uppercase italic text-text-primary">
                  Hết hạn sau <span className="font-mono text-xs">{formatTime(timeLeft)}</span>
               </CaptionText>
            </div>
         </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between px-2">
            <Text weight={800} className="text-[10px] tracking-[2px] uppercase italic text-text-disabled">Chuyển khoản thủ công</Text>
            <Smartphone size={14} className="text-text-disabled/40" />
         </div>
         
         <div className="bg-bg-soft rounded-[2rem] p-6 border border-border-subtle space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-border-strong/10 border-dashed">
               <Text weight={700} className="text-text-disabled text-xs uppercase italic tracking-tight">Ngân hàng</Text>
               <div className="flex items-center gap-2.5">
                 <Text weight={800} className="text-sm uppercase italic tracking-tight">Vietcombank</Text>
                 <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center p-1 border border-border-subtle">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Logo_Vietcombank.svg/2560px-Logo_Vietcombank.svg.png" alt="VCB" className="w-full h-full object-contain grayscale" />
                 </div>
               </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-border-strong/10 border-dashed">
               <Text weight={700} className="text-text-disabled text-xs uppercase italic tracking-tight">Chủ tài khoản</Text>
               <Text weight={800} className="text-sm uppercase italic tracking-tight text-text-primary">BUYXSHARE MPTC</Text>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-border-strong/10 border-dashed group">
               <Text weight={700} className="text-text-disabled text-xs uppercase italic tracking-tight">Số tài khoản</Text>
               <div className="flex items-center gap-3">
                 <Text weight={800} className="font-mono text-sm tracking-tighter text-customer-primary">1026458392</Text>
                 <IconButton 
                   onClick={() => handleCopy('1026458392', 'account')}
                   icon={copiedField === 'account' ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <Copy size={16} strokeWidth={2.5} />}
                   size="sm"
                   variant={copiedField === 'account' ? 'customer' : 'ghost'}
                   className={cn(
                      "w-8 h-8 rounded-xl",
                      copiedField === 'account' ? "bg-customer-primary text-white" : "bg-white text-text-disabled hover:text-customer-primary"
                   )}
                   label="Copy Account"
                 />
               </div>
            </div>

            <div className="flex items-center justify-between group">
               <Text weight={700} className="text-text-disabled text-xs uppercase italic tracking-tight">Nội dung</Text>
               <div className="flex items-center gap-3">
                 <Text weight={800} className="font-mono text-sm tracking-tighter text-customer-primary uppercase">{order.orderCode}</Text>
                 <IconButton 
                   onClick={() => handleCopy(order.orderCode, 'content')}
                   icon={copiedField === 'content' ? <CheckCircle2 size={16} strokeWidth={2.5} /> : <Copy size={16} strokeWidth={2.5} />}
                   size="sm"
                   variant={copiedField === 'content' ? 'customer' : 'ghost'}
                   className={cn(
                      "w-8 h-8 rounded-xl",
                      copiedField === 'content' ? "bg-customer-primary text-white" : "bg-white text-text-disabled hover:text-customer-primary"
                   )}
                   label="Copy Content"
                 />
               </div>
            </div>
         </div>
      </div>

      <Button 
         onClick={() => simulateMutation.mutate()}
         loading={simulateMutation.isPending}
         variant="customer"
         size="xl"
         fullWidth
         className="h-16 rounded-[1.25rem] font-black italic tracking-tighter uppercase text-lg shadow-xl shadow-customer-primary/20"
      >
         {simulateMutation.isPending ? 'ĐANG DUYỆT...' : 'TÔI ĐÃ CHUYỂN KHOẢN'}
      </Button>
    </div>
  );
};
