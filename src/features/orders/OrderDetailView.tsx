import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MobileLargeHeader } from '../../components/header';
import { Text, Heading, CaptionText, PriceText, SectionTitle } from '../../components/ui/Typography';
import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { OrderTimeline } from '../../components/order/OrderTimeline';
import { Button } from '../../components/ui';
import { formatMoney } from '../../utils/money';
import { AlertCircle, Package } from 'lucide-react';
import { PageContainer } from '../../components/layout/PageContainer';
import { ProductCheckoutItem } from '../../components/product/ProductCheckoutItem';

import { CheckoutHeader } from '../../components/header';
import { useTranslation } from '../../lib/i18n';
import { useStore } from '../../store';

export const OrderDetailView = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const t = useTranslation().t;
  const user = useStore((state) => state.user);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => orderService.getOrders(user?.id || ''),
    enabled: !!user?.id
  });

  const order = orders?.find(o => o.id === orderId);

  const { data: product } = useQuery({
    queryKey: ['product', order?.productId],
    queryFn: () => productService.getProductById(order?.productId || ''),
    enabled: !!order?.productId
  });

  if (isLoading) {
    return (
      <PageContainer headerVariant="compact" withHeaderOffset>
        <CheckoutHeader title={t('nav_home')} showBack onBack={() => navigate(-1)} />
        <div className="p-4 space-y-4">
          <div className="h-32 bg-surface animate-pulse rounded-2xl" />
          <div className="h-64 bg-surface animate-pulse rounded-2xl" />
        </div>
      </PageContainer>
    );
  }

  if (!order) {
    return (
      <PageContainer headerVariant="compact" withHeaderOffset>
        <CheckoutHeader title={t('nav_home')} showBack onBack={() => navigate(-1)} />
        <div className="p-8 flex flex-col items-center justify-center text-center mt-20">
          <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mb-4">
            <AlertCircle size={32} />
          </div>
          <Heading variant="h2" className="mb-2">{t('orders_not_found')}</Heading>
          <Text variant="body-md" color="muted">{t('orders_not_found_desc')}</Text>
          <Button variant="primary" className="mt-6" onClick={() => navigate(-1)}>
            {t('common_back')}
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      variant="mobile"
      headerVariant="compact"
      withHeaderOffset
      className="space-y-0"
    >
      <CheckoutHeader title={`${t('orders_title')} #${order.orderCode}`} showBack onBack={() => navigate(-1)} />

      <div className="p-4 space-y-6 pb-20">
        <Card className="p-5">
           <SectionTitle className="mb-4">{t('orders_tracking')}</SectionTitle>
           <OrderTimeline order={order} />
        </Card>

        {product && (
          <Card className="p-5 space-y-4 relative overflow-hidden">
             <SectionTitle className="mb-2">{t('orders_product_info')}</SectionTitle>
             <ProductCheckoutItem 
               name={product.name}
               price={product.salePrice || product.price}
               image={product.images?.[0] || ''}
             />
          </Card>
        )}

        <Card className="p-5 space-y-4">
           <SectionTitle className="mb-2">{t('orders_payment_info')}</SectionTitle>
           <div className="space-y-3">
             <div className="flex justify-between items-center">
               <Text variant="body-md" color="medium">{t('orders_subtotal')}</Text>
               <Text variant="body-md" weight={500} color="dark">{formatMoney(order.subtotal)}</Text>
             </div>
             <div className="flex justify-between items-center">
               <Text variant="body-md" color="medium">{t('orders_shipping_fee')}</Text>
               <Text variant="body-md" weight={500} color="dark">{order.shippingFee === 0 ? t('orders_free') : formatMoney(order.shippingFee)}</Text>
             </div>
             
             <div className="h-px bg-border-subtle w-full" />
             
             <div className="flex justify-between items-center pt-1">
               <Text variant="body-lg" weight={600} color="dark">{t('total')}</Text>
               <PriceText size="md">{formatMoney(order.total)}</PriceText>
             </div>
           </div>
        </Card>

        <Card className="p-5">
           <SectionTitle className="mb-4">{t('orders_shipping_info')}</SectionTitle>
           <div className="bg-surface-soft p-4 rounded-xl border border-border-subtle space-y-2">
              <Text variant="body-md" weight={600} color="dark">{order.customerName}</Text>
              <Text variant="body-md" color="medium">{order.customerPhone}</Text>
              <Text variant="body-md" color="medium" className="leading-relaxed">
                {order.customerAddress}
              </Text>
           </div>
        </Card>
      </div>
    </PageContainer>
  );
};
