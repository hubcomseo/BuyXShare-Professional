import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Ticket, History, Gift, Search, ChevronRight, ShieldCheck, ShoppingBag, Sparkles, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { LabelText, MetricText, SectionTitle, CaptionText } from '../../components/ui/Typography';
import { MobileLargeHeader } from '../../components/header';
import { useStore } from '../../store';
import { useNavigate } from 'react-router-dom';
import { rewardService } from '../../services/reward.service';
import { IconButton, Button, Badge } from '../../components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { JackpotWinnerCard } from '../../components/reward';
import { useAppMode } from '../../hooks/useAppMode';
import { EmptyState } from '../../components/feedback';
import { cn } from '../../lib/utils';
import { RewardTicket } from '../../types/reward';

import { useTranslation } from '../../lib/i18n';

const OrderTicketGroup = ({ orderId, tickets, defaultOpen = false }: { orderId: string, tickets: RewardTicket[], defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const navigate = useNavigate();
  const { language } = useTranslation();
  
  const winningCount = tickets.filter(t => t.status === 'winner').length;
  const isAllPending = tickets.every(t => t.status === 'pending');
  
  return (
    <div className="bg-surface border border-border-subtle rounded-3xl overflow-hidden shadow-sm hover:border-primary/30 transition-colors">
      <div 
        className={cn("p-4 flex items-center justify-between cursor-pointer", isOpen ? "bg-surface-elevated border-b border-border-subtle" : "")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingBag size={20} />
          </div>
          <div>
            <LabelText weight={600} color="dark" uppercase className="tracking-widest">#{orderId.slice(-6)}</LabelText>
            <div className="flex items-center gap-2 mt-0.5">
              <CaptionText>{tickets.length} {language === 'vi' ? 'Vé dự thưởng' : 'Entries'}</CaptionText>
              {winningCount > 0 && (
                <Badge variant="success" size="xs">
                  {winningCount} {language === 'vi' ? 'Trúng thưởng!' : 'Winners!'}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isOpen ? <ChevronUp size={20} className="text-text-muted" /> : <ChevronDown size={20} className="text-text-muted" />}
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
            <div className="p-4 bg-surface/50">
              {isAllPending ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-warning/10 text-warning text-xs font-medium border border-warning/20 mb-4">
                  <AlertCircle size={16} />
                  {language === 'vi' 
                    ? 'Kỳ quay thưởng chưa diễn ra, vui lòng chờ thông báo.' 
                    : 'Draw has not occurred yet, please wait for notification.'}
                </div>
              ) : null}
              
              <div className="grid grid-cols-2 gap-2">
                {tickets.map(ticket => {
                  const isWinner = ticket.status === 'winner';
                  const isConfirmed = ticket.status === 'confirmed';
                  
                  return (
                    <div 
                      key={ticket.id}
                      onClick={() => navigate(`/app/rewards/${ticket.id}`)}
                      className={cn(
                        "relative flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-all active:scale-95",
                        isWinner 
                          ? "bg-accent/10 border-accent/30 text-accent font-bold shadow-[0_0_15px_rgba(0,217,145,0.15)]" 
                          : isConfirmed
                            ? "bg-surface-elevated border-border-subtle text-text-primary hover:border-primary/40"
                            : "bg-surface border-border-subtle text-text-muted opacity-80"
                      )}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Ticket size={16} className={cn("shrink-0", isWinner ? "text-accent" : "text-text-muted")} />
                        <span className="truncate tracking-tight font-mono">{ticket.ticketCode}</span>
                      </div>
                      <ChevronRight size={14} className={isWinner ? "text-accent/50" : "text-text-muted/50"} />

                      {/* Small shine effect for winner */}
                      {isWinner && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
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
    <div className="min-h-screen flex flex-col pb-32">
      <MobileLargeHeader
        title={t('nav_perks')}
      />

      <div className="px-4 space-y-6 pt-2">
        
        {/* Focused Ticket Tracking Form */}
        <div className="bg-surface rounded-3xl p-5 border border-border-subtle shadow-sm space-y-4 relative overflow-hidden">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
               <Search size={20} />
             </div>
             <div>
               <LabelText weight={600} color="dark">{t('rewards_order_search_label')}</LabelText>
               <CaptionText className="mt-0.5">{t('rewards_order_search_desc')}</CaptionText>
             </div>
           </div>
           
           <form 
             className="relative"
             onSubmit={(e) => {
               e.preventDefault();
               const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
               if (query) navigate(`/p/track?q=${encodeURIComponent(query)}`);
             }}
           >
              <input 
                 name="search"
                 type="text"
                 placeholder={t('rewards_order_search_placeholder')}
                 className="w-full bg-surface-elevated border border-border-subtle rounded-2xl h-14 pl-4 pr-14 text-text-primary placeholder:text-text-muted/50 outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all font-mono text-[14px] shadow-sm"
              />
              <div className="absolute inset-y-2 right-2">
                 <IconButton 
                   type="submit"
                   icon={<ChevronRight size={20} />}
                   variant="primary"
                   size="sm"
                   className="h-10 w-10 shrink-0"
                   label={language === 'vi' ? 'Kiểm tra' : 'Check'}
                 />
              </div>
           </form>
        </div>

        {/* Jackpot Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-accent rounded-[2.5rem] p-6 text-white shadow-lg shadow-accent/20 relative overflow-hidden flex flex-col justify-between min-h-[200px] active:scale-[0.98] transition-transform">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/10">
                 <Ticket size={28} className="text-white -rotate-12" />
              </div>
              
              <div className="mt-4 relative z-10">
                 <LabelText uppercase weight={600} className="opacity-70 mb-1 tracking-widest text-white">{t('rewards_jackpot_draw')}</LabelText>
                 <MetricText size="lg" color="white" className="leading-none tracking-tight">{t('rewards_next_draw')}42</MetricText>
              </div>

              <div className="mt-6 relative z-10">
                 <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '70.8%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.6)]" 
                    />
                 </div>
              </div>

              {/* Decorative circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
           </div>

           <div className="bg-surface rounded-[2.5rem] p-6 border border-border-subtle shadow-sm flex flex-col justify-between min-h-[200px] active:scale-[0.98] transition-transform">
              <div className="flex -space-x-4">
                 <div className="w-14 h-14 rounded-[1.25rem] bg-[#5B63F1] flex items-center justify-center text-white font-black text-xl border-4 border-surface shadow-sm">A</div>
                 <div className="w-14 h-14 rounded-[1.25rem] bg-accent flex items-center justify-center text-white font-black text-xl border-4 border-surface shadow-sm">B</div>
                 <div className="w-14 h-14 rounded-[1.25rem] bg-surface-elevated flex items-center justify-center text-text-muted font-black text-sm border-4 border-surface shadow-sm">+4</div>
              </div>

              <div className="mt-auto">
                 <LabelText uppercase weight={600} className="opacity-60 mb-1 tracking-widest">{t('rewards_just_issued')}</LabelText>
                 <div className="flex items-baseline gap-1.5 flex-wrap">
                    <MetricText size="lg" className="leading-none tracking-tight">7.2K</MetricText>
                    <LabelText uppercase weight={600} color="primary" className="tracking-widest">{t('profile_rewards')}</LabelText>
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
        <div className="space-y-4 pt-2">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-6 bg-primary rounded-full" />
                 <SectionTitle variant="h3" className="m-0 text-lg">{t('rewards_current_cycle')}</SectionTitle>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[12px] font-bold text-primary px-0 hover:bg-transparent"
                onClick={() => navigate('/app/rewards/rules')}
              >
                {t('rewards_rules')}
              </Button>
           </div>

           <div className="space-y-3">
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
      </div>
    </div>
  );
};

