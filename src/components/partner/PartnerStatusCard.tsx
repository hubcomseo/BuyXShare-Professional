import React from 'react';
import { formatMoney } from '../../utils/money';
import { Wallet, Clock, CheckCircle2 } from 'lucide-react';
import { CaptionText, MetricText, CardTitle } from '../ui';

interface PartnerStatusCardProps {
  confirmed: number;
  pending: number;
  paid: number;
}

export const PartnerStatusCard = ({ confirmed, pending, paid }: PartnerStatusCardProps) => {
  return (
    <div className="relative group">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-partner-primary via-partner-strong to-partner-primary rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-700"></div>
      
      <div className="relative bg-surface rounded-[2rem] p-6 overflow-hidden border border-partner-primary/20 shadow-lg">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-partner-primary/10 via-transparent to-transparent opacity-60"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
             <div className="space-y-3">
               <div className="flex items-center gap-2">
                 <span className="relative flex h-2.5 w-2.5">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-partner-primary opacity-60"></span>
                   <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-partner-primary"></span>
                 </span>
                 <CaptionText weight={600} className="text-text-muted uppercase tracking-widest text-[11px]">KHẢ DỤNG</CaptionText>
               </div>
               <MetricText className="tracking-tighter !font-bold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-primary/70">
                 {formatMoney(confirmed)}
               </MetricText>
             </div>
             <div className="w-14 h-14 bg-partner-primary/10 rounded-2xl border border-partner-primary/20 flex items-center justify-center backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform duration-500">
               <Wallet size={26} strokeWidth={1.5} className="text-partner-primary" />
             </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-5 border-t border-border-subtle">
            <div>
               <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={14} className="text-warning" />
                  <CaptionText color="muted" className="uppercase tracking-wider text-[10px] font-semibold">Chờ duyệt</CaptionText>
               </div>
               <CardTitle weight={600} className="text-text-primary">{formatMoney(pending)}</CardTitle>
            </div>
            <div>
               <div className="flex items-center gap-1.5 mb-2">
                  <CheckCircle2 size={14} className="text-partner-primary" />
                  <CaptionText color="muted" className="uppercase tracking-wider text-[10px] font-semibold">Đã thanh toán</CaptionText>
               </div>
               <CardTitle weight={600} className="text-text-primary">{formatMoney(paid)}</CardTitle>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
