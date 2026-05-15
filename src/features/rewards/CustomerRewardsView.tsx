import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Ticket, History, Gift, Search, ChevronRight, ShieldCheck, ShoppingBag, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { LabelText, MetricText, SectionTitle, CaptionText } from '../../components/ui/Typography';
import { MobileLargeHeader } from '../../components/header';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { rewardService } from '../../services/reward.service';
import { IconButton, Button, Badge, Input } from '../../components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { JackpotWinnerCard } from '../../components/reward';
import { useAppMode } from '../../hooks/useAppMode';
import { EmptyState } from '../../components/feedback';
import { cn } from '../../lib/utils';
import { RewardTicket } from '../../types/reward';
import { PageContainer } from '../../components/layout';

import { useTranslation } from '../../lib/i18n';

const OrderTicketGroup = ({ orderId, tickets, defaultOpen = false }: { orderId: string, tickets: RewardTicket[], defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const navigate = useNavigate();
  const { language } = useTranslation();
  
  const winningCount = tickets.filter(t => t.status === 'winner').length;
  const isAllPending = tickets.every(t => t.status === 'pending');
  
  return (
    <div className="bg-white border border-border-subtle rounded-[2rem] overflow-hidden shadow-sm hover:border-customer-primary/30 transition-all duration-300">
      <div 
        className={cn("p-5 flex items-center justify-between cursor-pointer transition-colors", isOpen ? "bg-bg-soft/50 border-b border-border-subtle" : "")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-customer-soft flex items-center justify-center text-customer-primary shadow-inner">
            <ShoppingBag size={20} strokeWidth={2.5} />
          </div>
          <div>
            <LabelText weight={800} color="dark" className="tracking-tighter uppercase italic text-xs">ORDER #{orderId.slice(-6)}</LabelText>
            <div className="flex items-center gap-2 mt-0.5">
              <CaptionText weight={600} className="text-text-disabled uppercase text-[10px] tracking-widest">{tickets.length} {language === 'vi' ? 'Vé dự thưởng' : 'Entries'}</CaptionText>
              {winningCount > 0 && (
                <Badge variant="reward" size="xs" className="animate-pulse">
                  {winningCount} {language === 'vi' ? 'Trúng thưởng!' : 'Winners!'}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn("w-8 h-8 rounded-xl bg-bg-soft flex items-center justify-center transition-transform duration-300", isOpen && "rotate-180")}>
            <ChevronDown size={18} className="text-text-disabled" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 bg-bg-soft/20">
              {isAllPending ? (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 mb-4 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={18} strokeWidth={2.5} />
                  <span>
                    {language === 'vi' 
                      ? 'Kỳ quay thưởng chưa diễn ra, vui lòng chờ thông báo.' 
                      : 'Draw has not occurred yet, please wait for notification.'}
                  </span>
                </div>
              ) : null}
              
              <div className="grid grid-cols-2 gap-3">
                {tickets.map(ticket => {
                  const isWinner = ticket.status === 'winner';
                  const isConfirmed = ticket.status === 'confirmed';
                  
                  return (
                    <div 
                      key={ticket.id}
                      onClick={() => navigate(`/app/rewards/${ticket.id}`)}
                      className={cn(
                        "relative flex items-center justify-between p-4 rounded-2xl border text-sm cursor-pointer transition-all active:scale-95",
                        isWinner 
                          ? "bg-reward-soft border-reward-primary/40 text-reward-primary font-black shadow-lg shadow-reward-primary/10" 
                          : isConfirmed
                            ? "bg-white border-border-subtle text-text-primary hover:border-customer-primary/40 shadow-sm"
                            : "bg-white/50 border-border-subtle text-text-disabled opacity-80"
                      )}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Ticket size={16} strokeWidth={isWinner ? 2.5 : 2} className={cn("shrink-0", isWinner ? "text-reward-primary" : "text-text-disabled")} />
                        <span className="truncate tracking-tighter font-mono font-bold">{ticket.ticketCode}</span>
                      </div>
                      <ChevronRight size={14} strokeWidth={2.5} className={isWinner ? "text-reward-primary/50" : "text-text-disabled/50"} />

                      {/* Small shine effect for winner */}
                      {isWinner && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CustomerRewardsView = () => {
  const { user } = useStore();
  const { mode: appMode } = useAppMode();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  
  const { data: rewards = [] } = useQuery({ 
    queryKey: ['rewards', user?.id], 
    queryFn: () => rewardService.getRewards(user?.id || '') 
  });

  const winningTickets = rewards.filter(t => t.status === 'winner');
  const hasWinners = winningTickets.length > 0;

  // Group tickets by Order ID to handle large quantities efficiently
  const groupedTickets = useMemo(() => {
    const groups: Record<string, RewardTicket[]> = {};
    rewards.forEach(ticket => {
      const oid = ticket.orderId || 'unknown';
      if (!groups[oid]) groups[oid] = [];
      groups[oid].push(ticket);
    });
    // Sort by order that has winning tickets first, then by total tickets
    return Object.entries(groups).map(([orderId, tickets]) => ({
      orderId,
      tickets,
      hasWinner: tickets.some(t => t.status === 'winner'),
      count: tickets.length
    })).sort((a, b) => {
      if (a.hasWinner && !b.hasWinner) return -1;
      if (!a.hasWinner && b.hasWinner) return 1;
      return b.count - a.count;
    });
  }, [rewards]);

  return (
    <PageContainer
      variant="mobile"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="space-y-8 pt-2 px-5 pb-20"
    >
      <MobileLargeHeader 
        title={t('nav_perks')}
        showModeBadge={false}
      />

        {/* Focused Ticket Tracking Form */}
        <div className="bg-white rounded-[2rem] p-6 border border-border-subtle shadow-sm space-y-5 relative overflow-hidden">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-customer-soft flex items-center justify-center text-customer-primary shrink-0 shadow-inner">
               <Search size={22} strokeWidth={2.5} />
             </div>
             <div>
               <LabelText weight={800} color="dark" className="uppercase italic tracking-tighter text-sm leading-tight">{t('rewards_order_search_label')}</LabelText>
               <CaptionText className="text-text-disabled font-medium text-[11px] mt-0.5">{t('rewards_order_search_desc')}</CaptionText>
             </div>
           </div>
           
           <form 
             className="relative"
             onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem('search') as HTMLInputElement;
                const query = input.value;
                if (query) navigate(`/p/track/${encodeURIComponent(query)}`);
             }}
           >
              <Input 
                 name="search"
                 type="text"
                 placeholder={t('rewards_order_search_placeholder')}
                 className="pr-14 font-mono focus:shadow-md transition-shadow"
                 rightIcon={
                    <IconButton 
                      type="submit"
                      icon={<ChevronRight size={18} strokeWidth={2.5} />}
                      variant="primary"
                      size="sm"
                      className="h-8 w-8 shrink-0 shadow-lg shadow-customer-primary/20"
                      label={language === 'vi' ? 'Kiểm tra' : 'Check'}
                    />
                 }
              />
           </form>
        </div>

        {/* Jackpot Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-reward-primary rounded-[2.5rem] p-6 text-white shadow-xl shadow-reward-primary/20 relative overflow-hidden flex flex-col justify-between min-h-[200px] active:scale-[0.98] transition-all">
              <div className="w-14 h-14 rounded-[1.5rem] bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg">
                 <Ticket size={28} strokeWidth={2.5} className="text-white -rotate-12" />
              </div>
              
              <div className="mt-4 relative z-10">
                 <LabelText uppercase weight={800} className="text-white/60 mb-1 tracking-[2px] text-[10px] italic">{t('rewards_jackpot_draw')}</LabelText>
                 <MetricText size="lg" color="white" className="leading-none tracking-tighter font-black italic uppercase">42 {t('rewards_next_draw')}</MetricText>
              </div>

              <div className="mt-6 relative z-10">
                 <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '70.8%' }}
                      transition={{ duration: 1.5, ease: "circOut" }}
                      className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" 
                    />
                 </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-full blur-xl" />
           </div>

           <div className="bg-white rounded-[2.5rem] p-6 border border-border-subtle shadow-sm flex flex-col justify-between min-h-[200px] active:scale-[0.98] transition-all">
              <div className="flex -space-x-4">
                 <div className="w-14 h-14 rounded-2xl bg-[#5B63F1] flex items-center justify-center text-white font-black italic text-xl border-4 border-white shadow-lg">A</div>
                 <div className="w-14 h-14 rounded-2xl bg-reward-primary flex items-center justify-center text-white font-black italic text-xl border-4 border-white shadow-lg">B</div>
                 <div className="w-14 h-14 rounded-2xl bg-bg-soft flex items-center justify-center text-text-disabled font-black text-xs border-4 border-white shadow-inner">+4</div>
              </div>

              <div className="mt-auto">
                 <LabelText uppercase weight={800} className="text-text-disabled mb-1 tracking-[2px] text-[10px] italic leading-none">{t('rewards_just_issued')}</LabelText>
                 <div className="flex items-baseline gap-1.5 flex-wrap">
                    <MetricText size="lg" className="leading-none tracking-tighter font-black italic uppercase">7.2K</MetricText>
                    <LabelText uppercase weight={800} className="tracking-widest text-customer-primary text-[10px]">{t('profile_rewards')}</LabelText>
                 </div>
              </div>
           </div>
        </div>

        {/* Compact Winner Notification */}
        {hasWinners && (
           <JackpotWinnerCard 
             id={winningTickets[0].id} 
             ticketCode={winningTickets[0].ticketCode} 
           />
        )}

        {/* Grouped Tickets Section */}
        <div className="space-y-6 pt-4">
           <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                 <div className="w-1.5 h-6 bg-customer-primary rounded-full shadow-sm shadow-customer-primary/30" />
                 <SectionTitle variant="h3" className="m-0 text-xl font-black italic uppercase tracking-tighter">{t('rewards_current_cycle')}</SectionTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[10px] font-black uppercase tracking-widest text-customer-primary px-3 py-1.5 h-auto rounded-full bg-customer-soft hover:bg-customer-soft/80"
                onClick={() => navigate('/app/rewards/rules')}
              >
                {t('rewards_rules')}
              </Button>
           </div>

           <div className="space-y-4">
              {groupedTickets.map((group, index) => (
                 <OrderTicketGroup 
                   key={group.orderId}
                   orderId={group.orderId}
                   tickets={group.tickets}
                   defaultOpen={index === 0 || group.hasWinner} // Open first group or winners by default
                 />
              ))}

              {groupedTickets.length === 0 && (
                 <EmptyState 
                   icon={Gift}
                   title={t('rewards_empty_title')}
                   description={t('rewards_empty_desc')}
                   actionLabel={t('rewards_explore')}
                   onAction={() => navigate('/app')}
                 />
               )}
           </div>
        </div>
      </PageContainer>
  );
};

