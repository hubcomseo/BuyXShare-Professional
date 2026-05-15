import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';

import { 
  Search, 
  Ticket, 
  History, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { MobileTopBar } from '../../components/header';
import { PageContainer } from '../../components/layout/PageContainer';
import { Text, SectionTitle, CaptionText } from '../../components/ui/Typography';
import { rewardService } from '../../services/reward.service';
import { TrackRewardResult } from '../../types/reward';
import { 
  Badge, 
  IconButton,
  RewardStatusBadge,
} from '../../components/ui';
import { ProductOrderItem } from '../../components/product/ProductOrderItem';
import { RewardTicketItem } from '../../components/reward';
import { useTranslation } from '../../lib/i18n';

export const RewardTrackingView = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchTerm(initialQuery);
    }
  }, [initialQuery]);

  const { data: resultsRaw, isLoading } = useQuery<TrackRewardResult>({
    queryKey: ['trackEverything', searchTerm],
    queryFn: async () => {
      if (!searchTerm) return { tickets: [], orders: [] };
      return rewardService.trackTicket(searchTerm);
    },
    enabled: !!searchTerm
  });

  const results = resultsRaw || { tickets: [], orders: [] };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchTerm(query.trim());
      navigate(`/p/track?q=${encodeURIComponent(query.trim())}`, { replace: true });
    }
  };

  return (
    <PageContainer
      variant="mobile"
      headerVariant="compact"
      withHeaderOffset
      className="space-y-0"
    >
      <MobileTopBar
        title={t('logistics_tracking')}
        showBack={true}
        onBack={() => navigate(-1)}
      />

      <div className="px-4 sm:px-6 space-y-6 pt-6 pb-24">
        {/* Search Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
           <form onSubmit={handleSearch} className="relative group flex flex-col space-y-2">
              <Text variant="label" weight={600} uppercase className="text-[11px] tracking-widest text-text-muted px-2">{t('logistics_search_desc')}</Text>
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors duration-300 text-text-muted/60 group-focus-within:text-primary">
                   <Search size={20} />
                </div>
                <input 
                   type="text"
                   placeholder={t('logistics_search_placeholder')}
                   className="w-full bg-surface border border-border-subtle hover:border-text-muted/30 rounded-2xl h-14 pl-12 pr-14 text-text-primary placeholder:text-text-muted/40 outline-none focus:border-primary/50 focus:shadow-[0_0_0_4px_rgba(42,133,255,0.1)] transition-all font-mono text-[14px] tracking-wide shadow-sm"
                   value={query}
                   onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute inset-y-2 right-2 flex items-center">
                   <div className="w-px h-6 bg-border-subtle mr-2" />
                   <IconButton 
                     type="submit"
                     icon={<ChevronRight size={20} />}
                     variant="primary"
                     size="sm"
                     className="w-10 h-10 rounded-xl"
                     disabled={!query.trim()}
                     label={t('logistics_track_btn')}
                   />
                </div>
              </div>
           </form>
        </motion.div>

        <div className="space-y-6 mt-4">
          {/* Orders Results */}
          {results.orders?.length > 0 && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="space-y-4"
             >
                <div className="flex items-center gap-3 px-1">
                   <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                     <Package size={16} />
                   </div>
                   <SectionTitle variant="h3" className="uppercase tracking-widest text-sm text-text-primary">{t('logistics_orders_found')} ({results.orders.length})</SectionTitle>
                </div>
                <div className="space-y-3">
                   {results.orders.map((order: any, idx: number) => (
                      <ProductOrderItem
                        key={order.id}
                        role="customer"
                        image={order.productImage || '/images/1.jpg'}
                        name={order.productName || 'Order Item'}
                        amount={order.total}
                        orderCode={order.orderCode}
                        fulfillmentStatus={order.fulfillmentStatus}
                      />
                    ))}
                </div>
             </motion.div>
          )}

          {/* Tickets Results */}
          {results.tickets?.length > 0 && (
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-surface rounded-3xl p-5 border border-border-subtle shadow-sm relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-subtle/50 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shadow-sm">
                         <Ticket size={20} />
                      </div>
                      <div>
                         <CaptionText weight={600} className="uppercase tracking-[0.2em] text-text-muted text-[10px] mb-0.5">{t('logistics_tickets_found')}</CaptionText>
                         <SectionTitle variant="h3" color="dark" className="text-lg">{results.tickets.length} {t('profile_rewards')}</SectionTitle>
                      </div>
                   </div>
                   <RewardStatusBadge status="confirmed" size="sm" className="font-mono" />
                </div>
                
                <div className="space-y-4 relative z-10 w-full pl-2">
                  <div className="absolute left-[23px] top-6 bottom-6 w-px bg-border-subtle/60 z-0 border-l border-dashed border-border-subtle" />
                  
                  {results.tickets.map((t: any, index: number) => {
                    const order = results.orders?.find((o: any) => o.orderCode === t.orderId || o.id === t.orderId);
                    const isPending = order && (order.paymentStatus !== 'paid' || order.fulfillmentStatus !== 'completed');
                    const status = isPending ? 'pending' : (t.status || 'confirmed');
                    
                    return (
                      <RewardTicketItem 
                        key={t.id}
                        id={t.id}
                        status={status}
                        rewardType={t.rewardType}
                        ticketCode={t.ticketCode}
                        sequence={t.sequence}
                        orderId={t.orderId}
                        index={index}
                      />
                    );
                  })}
                </div>
             </motion.div>
          )}

           {/* Empty State */}
           {searchTerm && results.tickets?.length === 0 && results.orders?.length === 0 && !isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 flex flex-col items-center justify-center space-y-4 bg-surface rounded-[2rem] border border-dashed border-border-subtle shadow-sm"
            >
              <div className="w-16 h-16 bg-surface-elevated rounded-2xl flex items-center justify-center text-text-muted/40 shadow-inner border border-border-subtle/50">
                 <History size={24} />
              </div>
              <div className="text-center px-6">
                <Text variant="body-md" weight={600} className="text-text-secondary">{t('logistics_no_results')}</Text>
                <CaptionText className="mt-1 text-text-muted">{t('logistics_check_again')}</CaptionText>
              </div>
            </motion.div>
          )}

          {/* Initial State / Features hint */}
          {!searchTerm && !results.orders?.length && !results.tickets?.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-8"
            >
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-surface rounded-2xl p-4 border border-border-subtle shadow-sm flex flex-col items-center text-center gap-3">
                   <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                     <Package size={20} />
                   </div>
                   <div>
                     <Text variant="body-sm" weight={600}>{t('logistics_initial_orders')}</Text>
                     <CaptionText className="mt-0.5 opacity-60 line-clamp-2">{t('logistics_initial_orders_desc')}</CaptionText>
                   </div>
                 </div>
                 <div className="bg-surface rounded-2xl p-4 border border-border-subtle shadow-sm flex flex-col items-center text-center gap-3">
                   <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                     <ShieldCheck size={20} />
                   </div>
                   <div>
                     <Text variant="body-sm" weight={600}>{t('logistics_initial_tickets')}</Text>
                     <CaptionText className="mt-0.5 opacity-60 line-clamp-2">{t('logistics_initial_tickets_desc')}</CaptionText>
                   </div>
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

