import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  CheckCircle2, 
  Ticket, 
  ChevronRight, 
  ShieldCheck,
  Share2, 
  Search, 
  PartyPopper,
  Info,
  Gift,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Package
} from 'lucide-react';
import { CheckoutHeader } from '../../components/header';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { orderService } from '../../services/order.service';
import { rewardService } from '../../services/reward.service';
import { TrackRewardResult } from '../../types/reward';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { OrderTimeline } from '../../components/order/OrderTimeline';
import { Button } from '../../components/ui';
import { ProductCheckoutItem } from '../../components/product/ProductCheckoutItem';
import { productService } from '../../services/product.service';
import { formatMoney } from '../../utils/money';
import { useStore } from '../../store';
import { motion } from 'motion/react';
import { RewardTicketItem } from '../../components/reward';
import { useTranslation } from '../../lib/i18n';

export const SuccessView = () => {
  const { orderId: paramOrderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = paramOrderId || location.state?.orderId;
  const isWebZone = location.pathname.startsWith('/p');

  const { appMode } = useStore();
  const { t } = useTranslation();

  const { data: order } = useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: async () => {
      // For demo or testing
      if (orderId?.startsWith('demo-')) {
        return {
          id: orderId,
          orderCode: orderId === 'demo-1' ? 'BXDS-9901' : 'BXDS-8824',
          productName: orderId === 'demo-1' ? 'iPhone 15 Pro Max 256GB' : 'iPad Pro M2 11-inch',
          total: orderId === 'demo-1' ? 32990000 : 21490000,
          createdAt: new Date().toISOString(),
          paymentStatus: 'paid',
          paymentMethod: 'qr',
          fulfillmentStatus: orderId === 'demo-1' ? 'completed' : 'shipped',
          reconciliationStatus: orderId === 'demo-1' ? 'reconciled' : 'pending',
          customerName: 'Lê Hoàng An',
          customerAddress: '123 Đường Song Hành, Quận 2, TP. HCM'
        };
      }
      const res = await fetch(`/api/orders`);
      const orders = await res.json();
      return orders.find((o: any) => o.id === orderId);
    },
    enabled: !!orderId
  });

  const { data: product } = useQuery({
    queryKey: ['product', order?.productId],
    queryFn: () => productService.getProductById(order?.productId || ''),
    enabled: !!order?.productId
  });

  const { data: results = { tickets: [], orders: [] } } = useQuery<TrackRewardResult>({
    queryKey: ['orderTickets', orderId],
    queryFn: async () => {
      if (!orderId) return { tickets: [], orders: [] };
      return rewardService.trackTicket(orderId);
    },
    enabled: !!orderId
  });

  const ticket = results.tickets?.[0];

  const handleContinue = () => {
    if (appMode === 'partner') {
      navigate('/app/partner/dashboard');
    } else {
      navigate('/app/home');
    }
  };

  const handleTrack = () => {
    navigate('/p/track');
  };

  const isCOD = order?.paymentMethod === 'cod';

  return (
    <div className="min-h-screen bg-bg-base flex flex-col pb-20">
      <CheckoutHeader
        title={t('checkout_success_title')}
        showBack={false}
      />
      
      <div className="flex-1 flex flex-col p-4 w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center space-y-3 pt-6 pb-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center text-success mb-2">
             <CheckCircle2 size={32} />
          </div>
          
          <Heading variant="h2" color="dark">
             {isCOD ? t('success_order_received') : t('success_payment_completed')}
          </Heading>
          <Text color="muted">{t('success_order_code_label')}: <span className="text-text-primary font-bold">{order?.orderCode || '...'}</span></Text>
        </div>

        {/* Reward Ticket */}
        {results.tickets?.length > 0 && (
          <div className="w-full space-y-3 mb-8 animate-in slide-in-from-bottom-5 fade-in duration-700 delay-300">
             <Text variant="label" weight={600} uppercase color="primary" className="tracking-wider flex items-center gap-2">
                <Ticket size={16} />
                {isCOD ? t('success_ticket_pending') : t('success_ticket_reward')}
             </Text>

             <div className="grid gap-3">
                {results.tickets.map((t: any, index: number) => (
                   <RewardTicketItem 
                     key={t.id}
                     id={t.id}
                     status={isCOD ? 'pending' : t.status || 'confirmed'}
                     rewardType={t.rewardType}
                     ticketCode={t.ticketCode}
                     sequence={t.sequence}
                     orderId={t.orderId}
                     index={index}
                   />
                ))}
             </div>
             <Text variant="body-sm" color="muted" className="mt-2">
                {isCOD ? t('success_ticket_pending_desc') : t('success_ticket_active_desc')}
             </Text>
          </div>
        )}

        {/* Order Details */}
        <div className="w-full space-y-4 mb-8">
          <Text variant="label" weight={600} uppercase color="muted">{t('checkout_step_1')}</Text>
          
          <div className="space-y-4 p-1">
             <div className="flex gap-4 pb-4 border-b border-border-subtle border-dashed">
                <MapPin size={20} className="text-text-muted shrink-0" />
                <div>
                   <Text weight={600} className="mb-1">{order?.customerName}</Text>
                   <Text variant="body-md" color="muted">{order?.customerAddress}</Text>
                </div>
             </div>

             {product && (
                <div className="pb-4 border-b border-border-subtle border-dashed">
                   <ProductCheckoutItem 
                     image={product.images?.[0]}
                     name={product.name}
                     price={order?.subtotal || product.salePrice || product.price}
                     shippingFee={order?.shippingFee}
                     total={order?.total}
                     isGrouped={false}
                   />
                </div>
             )}
             
             <div className="flex justify-between items-center text-sm">
                <Text color="muted">{t('success_payment_method_label')}</Text>
                <Text weight={600}>{isCOD ? t('success_payment_cod') : t('success_payment_transfer')}</Text>
             </div>
          </div>
        </div>

        <div className="mt-auto pt-6 space-y-3">
          <Button 
            onClick={handleContinue}
            size="xl"
            fullWidth
          >
            {t('success_back_home')}
          </Button>
          
          <Button 
            onClick={handleTrack}
            variant="secondary"
            size="md"
            fullWidth
            leftIcon={<Package size={18} />}
          >
            {t('success_track_order')}
          </Button>
        </div>
      </div>
    </div>
  );
};
