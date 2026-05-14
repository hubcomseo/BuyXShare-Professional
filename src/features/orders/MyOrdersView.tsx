import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Package, 
  CreditCard, 
  Truck, 
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';

import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { Input } from '../../components/ui';
import { ProductErrorState } from '../../components/product/ProductStates';
import { OrderCard, OrderStatusTabs, OrderEmptyState, TabStatus } from '../../components/order';
import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';
import { rewardService } from '../../services/reward.service';
import { useStore } from '../../store';
import { useAppMode } from '../../hooks/useAppMode';
import { RewardTicket } from '../../types/reward';

import { useTranslation } from '../../lib/i18n';

export const MyOrdersView = () => {
  const { user } = useStore();
  const { mode: appMode } = useAppMode();
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = React.useState<TabStatus>('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: orders = [], isLoading: ordersLoading, isError: ordersError, refetch: refetchOrders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => orderService.getOrders(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const { data: rewards = [] } = useQuery({
    queryKey: ['rewards', user?.id],
    queryFn: () => rewardService.getRewards(user?.id || ''),
    enabled: !!user?.id,
  });

  const productMap = React.useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<string, any>);
  }, [products]);

  const rewardMap = React.useMemo(() => {
    return rewards.reduce((acc, r) => {
      acc[r.orderId] = r;
      return acc;
    }, {} as Record<string, RewardTicket>);
  }, [rewards]);

  const stats = React.useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.paymentStatus === 'pending' && o.fulfillmentStatus !== 'cancelled').length,
      processing: orders.filter(o => o.fulfillmentStatus === 'processing' || o.fulfillmentStatus === 'new').length,
      shipped: orders.filter(o => o.fulfillmentStatus === 'shipped').length,
      completed: orders.filter(o => o.fulfillmentStatus === 'completed').length,
      cancelled: orders.filter(o => o.fulfillmentStatus === 'cancelled').length,
    };
  }, [orders]);

  const tabs = [
    { id: 'all', label: t('profile_all'), count: stats.all, icon: <Package size={14} /> },
    { id: 'pending', label: t('orders_payment'), count: stats.pending, icon: <CreditCard size={14} /> },
    { id: 'processing', label: t('orders_processing'), count: stats.processing, icon: <Clock size={14} /> },
    { id: 'shipped', label: t('orders_shipping'), count: stats.shipped, icon: <Truck size={14} /> },
    { id: 'completed', label: t('orders_done'), count: stats.completed, icon: <CheckCircle2 size={14} /> },
    { id: 'cancelled', label: t('orders_cancelled'), count: stats.cancelled, icon: <XCircle size={14} /> },
  ];

  const filteredOrders = React.useMemo(() => {
    let result = orders;
    if (activeTab !== 'all') {
      result = result.filter(o => o.paymentStatus === activeTab || o.fulfillmentStatus === activeTab);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o => 
        o.orderCode.toLowerCase().includes(q) || 
        productMap[o.productId]?.name.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, activeTab, searchQuery, productMap]);

  if (ordersError) return <ProductErrorState onRetry={refetchOrders} />;

  return (
    <div className="min-h-screen bg-bg-base pb-32">
      <div className="z-30 bg-bg-base/90 backdrop-blur-xl sticky top-0 pb-4 space-y-4">
        <MobileLargeHeader
          title={t('orders_title')}
          background="bg-transparent"
        />

        <div className="px-4">
           <Input 
             type="text" 
             placeholder={t('orders_find_placeholder')} 
             leftIcon={<Search size={20} className="text-text-muted transition-colors focus-within:text-primary" />}
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="h-14 w-full rounded-[2rem] bg-surface/50 border border-border-subtle shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-surface transition-all text-[15px]"
           />
        </div>

        <OrderStatusTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs as any} />
      </div>

      <div className="px-4 pt-2 pb-6 space-y-4">
        {ordersLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface rounded-3xl p-5 animate-pulse space-y-4">
               <div className="h-4 w-1/3 bg-surface-soft rounded" />
               <div className="flex gap-4">
                 <div className="w-16 h-16 bg-surface-soft rounded-2xl" />
                 <div className="flex-1 space-y-2">
                   <div className="h-4 w-full bg-surface-soft rounded" />
                   <div className="h-4 w-1/2 bg-surface-soft rounded" />
                 </div>
               </div>
            </div>
          ))
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map(order => {
            const product = productMap[order.productId];
            const reward = rewardMap[order.id];
            return (
              <OrderCard 
                 key={order.id}
                 order={order} 
                 product={product} 
                 reward={reward} 
                 appMode={appMode} 
              />
            );
          })
        ) : (
          <OrderEmptyState activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
};
