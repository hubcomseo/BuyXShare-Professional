import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { 
  ChevronRight, 
  MapPin,
  Search, 
  ShoppingBag,
  Info,
  ArrowRight,
  Ticket,
  Package,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { CheckoutHeader } from '../../components/header';
import { useStore } from '../../store';
import { Text, Heading, SectionTitle, BodyText, LabelText, CaptionText, PriceText, HelperText } from '../../components/ui/Typography';
import { productService } from '../../services/product.service';
import { orderService } from '../../services/order.service';
import { formatMoney } from '../../utils/money';
import { Card } from '../../components/ui/Card';
import { PaymentPortal } from './PaymentPortal';
import { Button, StickyCTA, Input, Textarea } from '../../components/ui';
import { ProductCheckoutItem } from '../../components/product/ProductCheckoutItem';
import { AddressSelection } from './components/AddressSelection';
import { DeliveryMethodSelection } from './components/DeliveryMethodSelection';
import { PaymentMethodSelection } from './components/PaymentMethodSelection';
import { Address } from '../../types/user';
import { DeliveryMethod, PaymentMethod } from '../../types/order';
import { PageContainer, Section } from '../../components/layout';
import { useToast } from '../../components/toast';
import { useTranslation } from '../../lib/i18n';

export const CheckoutView = ({ isLandingPage }: { isLandingPage?: boolean }) => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { user } = useStore();
  const { showToast } = useToast();
  const { t } = useTranslation();
  
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(user?.addresses?.find(a => a.isDefault) || user?.addresses?.[0] || null);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('qr');
  const [note, setNote] = useState('');

  const { data: product } = useQuery({ 
    queryKey: ['product', slug || id], 
    queryFn: () => slug ? productService.getProductBySlug(slug) : productService.getProductById(id || '') 
  });

  const orderMutation = useMutation({
    mutationFn: (newOrderData: any) => {
      const partnerId = sessionStorage.getItem('affiliate_partner_id');
      return orderService.createOrder({ 
        productId: product?.id || '',
        checkoutInfo: {
          name: selectedAddress?.recipientName || '',
          phone: selectedAddress?.phone || '',
          address: selectedAddress?.fullAddress || '',
          note: note || undefined
        },
        deliveryMethod,
        paymentMethod,
        partnerId: partnerId || undefined 
      }, user?.id || 'u1');
    },
    onSuccess: (data) => {
      showToast({
        title: t('checkout_success_title'),
        variant: 'success'
      });
      if (paymentMethod === 'cod') {
        navigate(`/p/success/${data.id}`, { state: { orderId: data.id } });
      } else {
        setActiveOrder(data);
      }
      sessionStorage.removeItem('affiliate_partner_id');
    },
    onError: () => {
      showToast({
        title: t('checkout_error_title'),
        message: t('checkout_error_message'),
        variant: 'error'
      });
    }
  });

  const totals = useMemo(() => {
    if (!product) return { subtotal: 0, shipping: 0, total: 0 };
    const subtotal = product.salePrice || product.price;
    const shipping = deliveryMethod === 'standard' ? 25000 : deliveryMethod === 'express' ? 45000 : 0;
    return {
      subtotal,
      shipping,
      total: subtotal + shipping
    };
  }, [product, deliveryMethod]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    recipientName: user?.name || '',
    phone: user?.phone || '',
    fullAddress: ''
  });

  const handleAddNewAddress = () => {
    if (!newAddress.recipientName || !newAddress.phone || !newAddress.fullAddress) return;
    
    const addr: Address = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: (user?.addresses?.length || 0) === 0
    };
    
    setSelectedAddress(addr);
    setShowAddressForm(false);
    showToast({
      title: t('profile_addresses'),
      variant: 'success'
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedAddress) return;
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      setStep(3);
      window.scrollTo(0, 0);
    } else {
      orderMutation.mutate({});
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep((s) => (s - 1) as any);
      window.scrollTo(0, 0);
    }
  };

  if (!product) return null;

  if (activeOrder) {
    return (
      <div className="min-h-screen bg-bg-base">
        <CheckoutHeader
          title={t('checkout_qr_title')}
          onBack={() => setActiveOrder(null)}
        />
        <div className="p-4 pt-0">
           <PaymentPortal order={activeOrder} product={product} isLandingPage={isLandingPage} />
         </div>
      </div>
    );
  }

  const progress = step / 3;
  const titles = [t('checkout_step_1'), t('checkout_step_2'), t('checkout_step_3')];

  return (
    <div className="relative min-h-screen">
      <CheckoutHeader
        title={showAddressForm ? t('checkout_add_address') : titles[step - 1]}
        stepLabel={showAddressForm ? undefined : `${t('checkout_step_label')} ${step}/3`}
        progress={showAddressForm ? undefined : progress}
        onBack={showAddressForm ? () => setShowAddressForm(false) : handleBack}
      />

      <PageContainer variant="mobile" className="space-y-6 pb-40 relative z-0 mt-4">
        {showAddressForm ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <Input
                label={t('checkout_full_name')}
                value={newAddress.recipientName}
                onChange={e => setNewAddress({...newAddress, recipientName: e.target.value})}
                placeholder={t('checkout_full_name_placeholder')}
              />
              <Input
                label={t('checkout_phone')}
                value={newAddress.phone}
                onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
                placeholder={t('checkout_phone_placeholder')}
              />
              <Textarea
                label={t('checkout_address')}
                value={newAddress.fullAddress}
                onChange={e => setNewAddress({...newAddress, fullAddress: e.target.value})}
                placeholder={t('checkout_address_placeholder')}
                rows={3}
              />
            </div>
            <Button onClick={handleAddNewAddress} fullWidth size="xl">{t('checkout_save_address')}</Button>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="py-2">
                   <Text variant="label" weight={600} uppercase color="muted" className="mb-3">{t('checkout_product')}</Text>
                   <ProductCheckoutItem 
                      image={product.images?.[0]}
                      name={product.name}
                      price={totals.subtotal}
                      isGrouped={false}
                   />
                </div>

                <div>
                   <Text variant="label" weight={600} uppercase color="muted" className="mb-3">{t('checkout_ship_to')}</Text>
                   <AddressSelection 
                     addresses={user?.addresses || []}
                     selectedId={selectedAddress?.id}
                     onSelect={setSelectedAddress}
                     onAddNew={() => setShowAddressForm(true)}
                     onEdit={() => {}}
                   />
                   
                   <div className="mt-4">
                      <Textarea
                         value={note}
                         onChange={(e) => setNote(e.target.value)}
                         placeholder={t('checkout_note_placeholder')}
                         rows={2}
                      />
                   </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div>
                   <Text variant="label" weight={600} uppercase color="muted" className="mb-3">{t('checkout_delivery_method')}</Text>
                   <DeliveryMethodSelection 
                     selectedId={deliveryMethod}
                     onSelect={setDeliveryMethod}
                   />
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div>
                   <Text variant="label" weight={600} uppercase color="muted" className="mb-3">{t('checkout_payment_method')}</Text>
                   <PaymentMethodSelection 
                     selectedId={paymentMethod}
                     onSelect={setPaymentMethod}
                   />
                 </div>

                <div className="pt-4 border-t border-border-subtle">
                   <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                        <Ticket size={20} />
                      </div>
                      <div className="flex-1">
                        <Text variant="label" weight={600} color="primary" uppercase className="tracking-wider">{t('checkout_reward_gift')}</Text>
                        <Text variant="body-md" weight={600} className="mt-0.5">{t('checkout_reward_ticket')}</Text>
                      </div>
                   </div>

                   <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <Text color="muted">{t('checkout_subtotal')}</Text>
                        <Text weight={600}>{formatMoney(totals.subtotal)}</Text>
                      </div>
                      <div className="flex justify-between text-sm">
                        <Text color="muted">{t('checkout_shipping_fee')}</Text>
                        <Text weight={600}>{totals.shipping === 0 ? t('checkout_free') : `+${formatMoney(totals.shipping)}`}</Text>
                      </div>
                   </div>
                   <div className="flex justify-between items-end pt-3 border-t border-border-dashed border-border-subtle">
                      <Text weight={600}>{t('checkout_total')}</Text>
                      <PriceText size="md">{formatMoney(totals.total)}</PriceText>
                   </div>
                </div>
              </div>
            )}
          </>
        )}
      </PageContainer>

      {!showAddressForm && (
        <StickyCTA 
          primaryAction={{
            label: step === 3 ? t('checkout_order_now') : t('checkout_continue'),
            onClick: handleNext,
            loading: orderMutation.isPending,
            variant: step === 3 ? 'accent' : 'primary',
            rightIcon: step < 3 ? <ArrowRight size={20} /> : <CheckCircle2 size={20} />,
            disabled: step === 1 && !selectedAddress
          }}
        />
      )}
    </div>
  );
};
