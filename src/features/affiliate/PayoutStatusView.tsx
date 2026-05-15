import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Wallet, Clock, CheckCircle2, AlertCircle, ChevronRight, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatMoney } from '../../utils/money';
import { Button, IconButton } from '../../components/ui';
import { CommissionStatusBadge } from '../../components/ui';
import { PayoutSummaryCard } from '../../components/partner/PayoutSummaryCard';
import { PageContainer } from '../../components/layout';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../lib/i18n';

export const PayoutStatusView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { data: payouts = [] } = useQuery({
    queryKey: ['partnerPayouts'],
    queryFn: () => fetch('/api/partner/payouts').then(res => res.json())
  });

  const { data: stats } = useQuery({
    queryKey: ['partnerStats'],
    queryFn: () => fetch('/api/partner/stats').then(res => res.json())
  });

  const requestPayoutMutation = useMutation({
    mutationFn: () => fetch('/api/partner/payouts/request', { method: 'POST' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partnerPayouts'] });
    }
  });

  return (
    <PageContainer
      variant="mobile"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="space-y-8 px-4"
    >
      <MobileLargeHeader
        title="Ví Đối Tác"
        leftSlot={
          <IconButton 
            icon={<ChevronLeft size={22} strokeWidth={2.5} />} 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            size="md"
            label="Back" 
          />
        }
      />

      {/* Main Balance Card - Refined */}
      <div className="relative z-10 transition-transform active:scale-[0.98] duration-300 px-1">
         <PayoutSummaryCard 
           balance={stats?.confirmed || 0}
           minThreshold={50000}
           onRequestPayout={() => requestPayoutMutation.mutate()}
           isRequesting={requestPayoutMutation.isPending}
         />
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 pt-2">
         <div className="bg-white border border-border-subtle p-6 rounded-[2rem] flex flex-col justify-between h-32 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-amber-500/10 transition-colors"></div>
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner relative z-10">
               <Clock size={20} strokeWidth={2.5} />
            </div>
            <div className="space-y-1 relative z-10">
               <Text weight={800} className="text-[10px] tracking-[1px] uppercase italic text-text-disabled">Chờ duyệt</Text>
               <SectionTitle variant="h3" color="dark" className="font-black italic text-2xl tracking-tighter m-0">{formatMoney(stats?.pending || 0)}</SectionTitle>
            </div>
         </div>
         <div className="bg-white border border-border-subtle p-6 rounded-[2rem] flex flex-col justify-between h-32 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-customer-primary/5 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-customer-primary/10 transition-colors"></div>
            <div className="w-10 h-10 bg-customer-soft text-customer-primary rounded-2xl flex items-center justify-center shadow-inner relative z-10">
               <ArrowUpRight size={20} strokeWidth={2.5} />
            </div>
            <div className="space-y-1 relative z-10">
               <Text weight={800} className="text-[10px] tracking-[1px] uppercase italic text-text-disabled">Tổng thu nhập</Text>
               <SectionTitle variant="h3" color="dark" className="font-black italic text-2xl tracking-tighter m-0">{formatMoney(stats?.total || 0)}</SectionTitle>
            </div>
         </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-5 px-1 pt-4">
        <div className="flex items-center justify-between px-1 border-b border-border-subtle pb-4">
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-partner-soft text-partner-primary flex items-center justify-center shrink-0 shadow-inner">
                 <Wallet size={16} strokeWidth={2.5} />
              </div>
              <SectionTitle variant="h3" className="font-black italic uppercase tracking-tighter text-base m-0">Lịch sử rút tiền</SectionTitle>
           </div>
           <Badge variant="partner" size="sm" className="font-bold tracking-tighter italic">
              {payouts.length} Giao dịch
           </Badge>
        </div>
        
        <div className="space-y-3">
           {payouts.map((p: any) => (
             <motion.div 
               whileTap={{ scale: 0.98 }}
               key={p.id} 
               className="bg-white border border-border-subtle p-5 rounded-[2rem] flex items-center justify-between group transition-all shadow-sm hover:shadow-md"
             >
                <div className="flex items-center gap-4">
                   <div className={cn(
                      "w-12 h-12 rounded-[1.25rem] flex items-center justify-center border shadow-inner transition-colors",
                      p.status === 'paid' 
                         ? 'bg-emerald-50 text-emerald-600 border-emerald-500/10' 
                         : 'bg-amber-50 text-amber-600 border-amber-500/10'
                   )}>
                      {p.status === 'paid' ? <CheckCircle2 size={24} strokeWidth={2.5} /> : <Clock size={24} strokeWidth={2.5} />}
                   </div>
                   <div className="space-y-1">
                      <CaptionText weight={800} className="text-[10px] uppercase italic tracking-[2px] text-text-disabled leading-none">{p.month}</CaptionText>
                      <PriceText size="md" className="font-black italic text-xl tracking-tighter text-text-primary leading-none">{formatMoney(p.amount)}</PriceText>
                   </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                   <CommissionStatusBadge status={p.status} size="sm" type="short" />
                   <CaptionText weight={700} className="text-[9px] text-text-disabled uppercase font-mono tracking-tighter">{new Date(p.createdAt).toLocaleDateString('vi-VN')}</CaptionText>
                </div>
             </motion.div>
           ))}

           {payouts.length === 0 && (
              <div className="py-20 text-center bg-bg-soft rounded-[2.5rem] border border-dashed border-border-strong/30 space-y-6">
                 <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mx-auto text-text-disabled shadow-sm shrink-0">
                    <Wallet size={28} strokeWidth={1.5} />
                 </div>
                 <div className="space-y-2">
                    <Text weight={800} className="text-text-primary uppercase italic text-sm tracking-tight">{t('logistics_no_results')}</Text>
                    <CaptionText weight={600} className="text-text-disabled">Chưa có giao dịch rút tiền nào</CaptionText>
                 </div>
              </div>
           )}
        </div>
      </div>

      {/* Policy Mini Card */}
      <div className="bg-bg-soft p-6 rounded-[2rem] border border-border-subtle flex items-start gap-4 shadow-inner">
         <div className="w-8 h-8 bg-white border border-border-subtle flex items-center justify-center text-text-disabled rounded-xl shrink-0">
            <AlertCircle size={18} strokeWidth={2.5} />
         </div>
         <CaptionText weight={600} className="leading-relaxed text-text-secondary text-xs">
            Yêu cầu rút tiền được xử lý tự động vào ngày 15 hàng tháng cho số dư &gt; <span className="text-text-primary font-bold">50.000₫</span>.
         </CaptionText>
      </div>
      </PageContainer>
  );
};
