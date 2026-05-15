import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Ticket, 
  Share2, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Trophy,
  Info,
  Gift,
  ExternalLink,
  Zap,
  Package,
  Copy,
  AlertCircle,
  History,
  CheckCircle2
} from 'lucide-react';
import { Text, Heading, CaptionText, MetricText } from '../../components/ui/Typography';
import { MobileTopBar, HeaderActionButton } from '../../components/header';
import { PageContainer } from '../../components/layout/PageContainer';
import { rewardService } from '../../services/reward.service';
import { Badge, RewardStatusBadge } from '../../components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../../components/ui';
import { useTranslation } from '../../lib/i18n';

export const TicketDetailView = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [copied, setCopied] = useState(false);

  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ['ticket', ticketId],
    queryFn: () => rewardService.getTicketById(ticketId || ''),
    enabled: !!ticketId
  });

  const handleCopy = () => {
    if (ticket?.ticketCode) {
      navigator.clipboard.writeText(ticket.ticketCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-12 h-12 bg-primary/20 flex items-center justify-center rounded-2xl animate-spin text-primary">
          <Ticket size={24} />
        </div>
        <CaptionText align="center" className="tracking-widest uppercase animate-pulse">{t('rewards_loading')}</CaptionText>
      </div>
    );
  }

  if (!ticket || isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-2">
          <AlertCircle size={32} />
        </div>
        <Heading variant="h2" align="center" className="mb-2">{t('rewards_not_found')}</Heading>
        <Text variant="body-md" align="center" color="muted" className="mb-6">{t('rewards_expired_or_invalid')}</Text>
        <Button 
          onClick={() => navigate('/app/rewards')}
          variant="primary"
          size="md"
          className="w-full"
        >
          {t('rewards_back_to_rewards')}
        </Button>
      </div>
    );
  }

  const isWinner = ticket.status === 'winner';
  const isExpired = ticket.status === 'expired';
  const isPending = ticket.status === 'pending';
  const isValid = ticket.status === 'confirmed';

  return (
    <PageContainer
      variant="mobile"
      headerVariant="compact"
      withHeaderOffset
      className="space-y-0"
    >
      <MobileTopBar
        title={t('rewards_detail_title')}
        showBack={true}
        onBack={() => navigate(-1)}
        rightSlot={
          <div className="flex items-center gap-1">
            <HeaderActionButton icon={<Copy size={18} />} onClick={handleCopy} />
            <HeaderActionButton icon={<Share2 size={18} />} onClick={() => {}} />
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-24 space-y-8">
        
        {/* MAIN TICKET CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative"
        >
          {/* Outer glow effect for winner */}
          {isWinner && <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-[3rem] -z-10" />}

          <div className={`relative rounded-[2rem] shadow-2xl overflow-hidden group border transition-all duration-500 ${isWinner ? 'border-accent/40 shadow-[0_20px_50px_-15px_rgba(0,217,145,0.3)]' : 'border-border-subtle'}`}>
            {/* Card Content wrapper */}
            <div className="relative bg-surface flex flex-col h-full overflow-hidden">
               
               {/* TOP SECTION */}
               <div className={`relative p-8 pb-10 flex flex-col items-center text-center ${
                 isWinner ? 'bg-accent/5' : 
                 isExpired ? 'bg-red-500/5' : 
                 isValid ? 'bg-primary/5' : 
                 'bg-surface-elevated/20'
               }`}>
                 {/* Internal background glow */}
                 {isWinner && <div className="absolute top-0 right-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20"></div>}
                 {isValid && <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>}
                 
                 {/* Main Icon */}
                 <div className={`w-20 h-20 rounded-t-3xl rounded-b-xl mb-6 flex items-center justify-center border shadow-xl backdrop-blur-md relative z-10 transition-transform hover:scale-105 ${
                    isWinner ? 'bg-gradient-to-br from-accent to-emerald-500 border-accent/30 text-bg-soft shadow-xl shadow-accent/40' : 
                    isExpired ? 'bg-surface border-red-500/20 text-red-500' : 
                    isValid ? 'bg-primary/10 border-primary/20 text-primary shadow-[0_0_20px_rgba(99,102,241,0.2)]' : 
                    'bg-surface-elevated border-border-subtle text-text-muted'
                 }`}>
                    {isWinner ? <Trophy size={40} className="drop-shadow-md" /> : 
                     isExpired ? <Zap size={40} /> : 
                     isValid ? <Ticket size={40} /> : 
                     <Clock size={40} />}
                 </div>

                 <div className="space-y-3 relative z-10 w-full flex flex-col items-center">
                   <Text variant="label" weight={600} className={`tracking-[0.2em] uppercase text-[11px] ${isWinner ? 'text-accent font-black' : isValid ? 'text-primary' : 'text-text-muted'}`}>
                     {isWinner ? t('rewards_jackpot_winner') : isExpired ? t('rewards_invalid_ticket') : isValid ? t('rewards_valid_ticket') : t('loading')}
                   </Text>
                   <Heading variant="h2" className={`text-2xl sm:text-3xl font-black uppercase tracking-tighter w-full max-w-[200px] sm:max-w-xs ${isExpired ? 'line-through opacity-40 decoration-red-500' : 'text-text-primary'}`}>
                     {isWinner ? t('rewards_jackpot') : ticket.rewardType || t('rewards_lottery_ticket')}
                   </Heading>
                 </div>
               </div>

               {/* DIVIDER / CLIP PATH effect */}
               <div className="relative flex items-center h-4 w-full bg-surface z-10">
                 <div className={`absolute -left-3 w-6 h-6 rounded-full bg-bg-base border-r ${isWinner ? 'border-emerald-500/30' : 'border-border-subtle'}`}></div>
                 <div className="flex-1 mx-4 border-t-[3px] border-dotted border-border-subtle opacity-40"></div>
                 <div className={`absolute -right-3 w-6 h-6 rounded-full bg-bg-base border-l ${isWinner ? 'border-accent/30' : 'border-border-subtle'}`}></div>
               </div>

               {/* BOTTOM SECTION */}
               <div className="p-8 pt-10 relative bg-surface z-10">
                  <div className="flex flex-col gap-8">
                    
                    {/* TICKET CODE DISPLAY */}
                    <div className="text-center">
                      <Text variant="label" weight={600} className="text-text-muted mb-3 tracking-[0.15em] text-[10px] uppercase block">{t('rewards_ticket_code')}</Text>
                      
                      <div 
                        onClick={handleCopy}
                        className="group/code relative mx-auto inline-flex items-center justify-center cursor-pointer px-4 py-2"
                      >
                        <div className={`absolute inset-0 bg-primary/5 rounded-2xl scale-110 opacity-0 group-hover/code:opacity-100 transition-all ${isWinner ? 'bg-accent/10' : ''}`} />
                        
                        <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tighter drop-shadow-md relative z-10 ${
                          isWinner ? 'bg-gradient-to-r from-emerald-300 to-accent bg-clip-text text-transparent' : 
                          isExpired ? 'text-text-muted/60' : 'text-text-primary'
                        }`}>
                          {ticket.ticketCode}
                        </span>
                        
                        <AnimatePresence>
                          {copied && (
                            <motion.div 
                              initial={{ opacity: 0, y: 15, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.9 }}
                              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-text-primary text-surface px-4 py-1.5 rounded-[10px] text-[11px] font-black tracking-widest uppercase whitespace-nowrap shadow-xl"
                            >
                              {language === 'vi' ? 'Đã sao chép !' : 'Copied !'}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="h-px bg-border-subtle opacity-50 w-full" />

                    {/* METADATA GRID */}
                    <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                       <div>
                          <Text variant="label" className="text-[10px] text-text-muted/70 mb-1 tracking-widest uppercase font-bold">{t('rewards_issued_date')}</Text>
                          <div className="flex items-center gap-2 text-text-secondary">
                            <Calendar size={14} className={isWinner ? 'text-accent' : isExpired ? 'text-text-muted' : 'text-primary'} />
                            <span className="font-bold text-sm tracking-tight text-text-primary font-mono">{new Date(ticket.issuedAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}</span>
                          </div>
                       </div>
                       <div className="text-right">
                          <Text variant="label" className="text-[10px] text-text-muted/70 mb-1 tracking-widest uppercase font-bold text-right inline-block">{t('rewards_transaction_id')}</Text>
                          <div className="flex items-center gap-2 justify-end text-text-secondary">
                            <span className="font-bold text-sm tracking-tight text-text-primary font-mono">#{ticket.sequence || '---'}</span>
                            <Package size={14} className={isWinner ? 'text-accent' : isExpired ? 'text-text-muted' : 'text-primary'} />
                          </div>
                       </div>
                    </div>

                  </div>
               </div>

            </div>
          </div>
        </motion.div>

        {/* WINNER ACTION BOX */}
        {isWinner && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
             <div className="bg-bg-base p-6 sm:p-8 rounded-3xl border border-accent/40 flex flex-col gap-6 relative overflow-hidden transition-all duration-300 shadow-xl shadow-accent/30 hover:shadow-2xl hover:shadow-accent/50 hover:border-accent/80">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-accent/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="flex justify-between items-center relative z-10">
                     <div className="flex gap-4 items-center">
                        <div className="w-14 h-14 bg-accent/20 text-accent rounded-2xl flex items-center justify-center border border-accent/20 shadow-inner">
                           <Gift size={26} />
                        </div>
                        <div className="space-y-1">
                           <Heading variant="h3" color="white" className="font-black italic tracking-wide text-2xl">{t('rewards_redeem_prize')}</Heading>
                           <Text variant="label" className="text-[10px] text-accent tracking-widest uppercase font-black bg-accent/10 px-2 py-0.5 rounded border border-accent/20 inline-block">{t('rewards_winner_priority')}</Text>
                        </div>
                     </div>
                  </div>
                  
                  <Text variant="body-sm" className="text-text-muted/90 relative z-10 leading-relaxed font-medium">
                     {t('rewards_redeem_desc')}
                  </Text>

                  <Button 
                    fullWidth
                    variant="reward" 
                    size="lg"
                    className="uppercase tracking-[0.2em] font-black h-14 relative z-10 mt-2 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-shadow"
                    onClick={() => {}}
                    rightIcon={<ExternalLink size={18} />}
                  >
                     {t('rewards_verify_now')}
                  </Button>
             </div>
          </motion.div>
        )}

        {/* STATUS LOG */}
        <div className="bg-surface border border-border-subtle rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-primary shadow-sm">
               <History size={18} />
            </div>
            <Heading variant="h3" className="text-[14px] font-black tracking-widest uppercase">{t('rewards_progress')}</Heading>
          </div>

          <div className="pl-5 ml-[19px] space-y-8 border-l-2 border-border-subtle/50 relative mb-4">
            
            {/* Step 1: Issued */}
            <div className="relative">
              <div className="absolute -left-[27px] w-5 h-5 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center z-10">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="-mt-[2px]">
                 <Text variant="body-sm" weight={600} className="uppercase tracking-wider text-[13px] text-text-primary mb-1">{t('rewards_status_issued')}</Text>
                 <Text variant="label" className="text-[11px] text-text-muted font-mono">{new Date(ticket.issuedAt).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}</Text>
              </div>
            </div>

            {/* Step 2: Confirmed/Pending */}
            <div className={`relative ${(!isValid && !isPending && !isWinner && !isExpired) ? 'opacity-40' : ''}`}>
              <div className={`absolute -left-[27px] w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 bg-bg-base ${
                (isValid || isWinner) ? 'border-emerald-500 bg-emerald-500/20' : 
                isPending ? 'border-primary/50 animate-pulse bg-primary/10' : 'border-border-subtle'
              }`}>
                {(isValid || isWinner) && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
              </div>
              <div className="-mt-[2px]">
                 <Text variant="body-sm" weight={600} className={`uppercase tracking-wider text-[13px] mb-1 ${(isValid || isWinner) ? 'text-text-primary' : isPending ? 'text-primary' : 'text-text-muted'}`}>
                   {t('rewards_status_activated')}
                 </Text>
                 <Text variant="label" className="text-[11px] text-text-muted font-mono">
                   {ticket.confirmedAt ? new Date(ticket.confirmedAt).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US') : (isPending ? (language === 'vi' ? 'Đang chờ xử lý đơn hàng...' : 'Awaiting order fulfillment...') : (language === 'vi' ? 'Chờ đồng bộ' : 'Pending sync'))}
                 </Text>
              </div>
            </div>

            {/* Step 3: Result */}
            <div className={`relative ${(!isWinner && !isExpired) ? 'opacity-30' : ''}`}>
               <div className={`absolute -left-[27px] w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 bg-bg-base transition-colors ${
                 isWinner ? 'border-accent bg-accent/20' : 
                 isExpired ? 'border-red-500 bg-red-500/20' : 'border-border-subtle'
               }`}>
                 {isWinner && <Trophy size={10} className="text-accent" />}
                 {isExpired && <AlertCircle size={10} className="text-red-500" />}
               </div>
               <div className="-mt-[2px]">
                 <Text variant="body-sm" weight={600} className={`uppercase tracking-wider text-[13px] mb-1 ${isWinner ? 'text-accent' : isExpired ? 'text-red-500' : 'text-text-muted'}`}>
                   {isWinner ? t('rewards_jackpot_winner') : isExpired ? t('rewards_expired_desc') : t('rewards_status_draw')}
                 </Text>
                 <Text variant="label" className={`text-[11px] font-mono ${isWinner || isExpired ? 'text-text-muted' : 'text-text-muted/50'}`}>
                   {isWinner ? t('rewards_winner_announced') : isExpired ? (language === 'vi' ? 'Đã quá hạn sử dụng mã' : 'Ticket code has expired') : t('rewards_draw_schedule')}
                 </Text>
               </div>
            </div>

          </div>
        </div>

        {/* SECURITY INFO WIDGET */}
        <div className="bg-surface-elevated/30 border border-border-subtle rounded-3xl p-6 flex flex-col sm:flex-row gap-5 items-start">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <ShieldCheck size={24} />
           </div>
           <div>
              <Text variant="body-sm" weight={600} className="mb-2 uppercase tracking-wider text-[13px] text-text-primary">{t('rewards_security_info')}</Text>
              <Text variant="label" className="text-text-muted leading-relaxed font-medium text-[12px] opacity-80">
                {t('rewards_security_desc')}
              </Text>
           </div>
        </div>

        {/* SECURITY FOOTER */}
        <div className="pt-4 pb-12 flex flex-col items-center justify-center text-center opacity-30 mt-auto">
           <Text variant="label" weight={600} className="uppercase tracking-[0.25em] text-[9px] mb-3 font-mono">Secured by DEXSPACE</Text>
           <div className="flex gap-2">
             {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-text-muted" />)}
           </div>
        </div>

      </div>
    </PageContainer>
  );
};

