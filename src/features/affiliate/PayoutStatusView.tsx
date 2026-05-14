import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Wallet, Clock, CheckCircle2, AlertCircle, ChevronRight, ArrowUpRight, ChevronLeft } from 'lucide-react';
import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatMoney } from '../../utils/money';
import { Button, IconButton } from '../../components/ui';
import { CommissionStatusBadge } from '../../components/ui';
import { PayoutSummaryCard } from '../../components/partner/PayoutSummaryCard';

export const PayoutStatusView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    <div className="space-y-8 pb-32">
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

      <div className="px-4 space-y-8">

      {/* Main Balance Card - Refined */}
      <PayoutSummaryCard 
        balance={stats?.confirmed || 0}
        minThreshold={50000}
        onRequestPayout={() => requestPayoutMutation.mutate()}
        isRequesting={requestPayoutMutation.isPending}
      />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
         <div className="bg-surface border border-border-subtle p-4 rounded-2xl flex flex-col justify-between h-24 shadow-sm">
            <CaptionText weight={600}>Chờ duyệt</CaptionText>
            <div className="flex items-center justify-between">
               <SectionTitle variant="h3" color="dark">{formatMoney(stats?.pending || 0)}</SectionTitle>
               <Clock size={14} className="text-warning" />
            </div>
         </div>
         <div className="bg-surface border border-border-subtle p-4 rounded-2xl flex flex-col justify-between h-24 shadow-sm">
            <CaptionText weight={600}>Tổng thu nhập</CaptionText>
            <div className="flex items-center justify-between">
               <SectionTitle variant="h3" color="dark">{formatMoney(stats?.total || 0)}</SectionTitle>
               <ArrowUpRight size={14} className="text-primary-light" />
            </div>
         </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
           <SectionTitle variant="h3" color="dark">Lịch sử rút tiền</SectionTitle>
           <Badge variant="neutral" size="xs">
              {payouts.length} giao dịch
           </Badge>
        </div>
        
        <div className="space-y-2">
           {payouts.map((p: any) => (
             <div key={p.id} className="bg-surface border border-border-subtle p-4 rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-border-subtle/30 ${p.status === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                      {p.status === 'paid' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                   </div>
                   <div>
                      <CaptionText weight={600} className="mb-1">{p.month}</CaptionText>
                      <PriceText size="md" color="dark">{formatMoney(p.amount)}</PriceText>
                   </div>
                </div>
                <div className="text-right">
                   <CommissionStatusBadge status={p.status} size="xs" type="short" />
                   <CaptionText weight={600} className="mt-1 opacity-40">{new Date(p.createdAt).toLocaleDateString('vi-VN')}</CaptionText>
                </div>
             </div>
           ))}

           {payouts.length === 0 && (
              <div className="py-12 text-center bg-surface-soft rounded-3xl border border-dashed border-border-subtle space-y-3">
                 <div className="w-12 h-12 bg-surface-elevated rounded-full flex items-center justify-center mx-auto text-text-muted/20 shadow-sm">
                    <Wallet size={20} />
                 </div>
                 <CaptionText weight={600} align="center">No activities yet</CaptionText>
              </div>
           )}
        </div>
      </div>

      {/* Policy Mini Card */}
      <div className="bg-surface-soft p-4 rounded-2xl border border-border-subtle flex items-start gap-3">
         <AlertCircle size={16} className="text-text-muted shrink-0 mt-0.5" />
         <CaptionText weight={500} className="leading-relaxed">
            Payouts are processed automatically every 15th for balances &gt; 50k.
         </CaptionText>
      </div>
      </div>
    </div>
  );
};
