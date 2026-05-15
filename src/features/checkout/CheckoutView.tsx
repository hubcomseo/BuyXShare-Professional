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
import { cn } from '../../lib/utils';

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
    <PageContainer
      variant="mobile"
      headerVariant="checkout"
      withHeaderOffset
      withStickyCTA
      className="space-y-6 pb-2"
    >
      {/* Step Progress UI upgrade is handled by CheckoutHeader, ensuring it uses current theme */}
      <CheckoutHeader
        title={showAddressForm ? t('checkout_add_address') : titles[step - 1]}
        stepLabel={showAddressForm ? undefined : `${t('checkout_step_label')} ${step}/3`}
        progress={showAddressForm ? undefined : progress}
        onBack={showAddressForm ? () => setShowAddressForm(false) : handleBack}
      />

      {showAddressForm ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 px-1">
            <div className="space-y-5">
              <Input
                label={t('checkout_full_name')}
                value={newAddress.recipientName}
                onChange={e => setNewAddress({...newAddress, recipientName: e.target.value})}
                placeholder={t('checkout_full_name_placeholder')}
                className="font-bold italic focus:shadow-md transition-shadow"
              />
              <Input
                label={t('checkout_phone')}
                value={newAddress.phone}
                onChange={e => setNewAddress({...newAddress, phone: e.target.value})}
                placeholder={t('checkout_phone_placeholder')}
                className="font-bold italic focus:shadow-md transition-shadow"
              />
              <Textarea
                label={t('checkout_address')}
                value={newAddress.fullAddress}
                onChange={e => setNewAddress({...newAddress, fullAddress: e.target.value})}
                placeholder={t('checkout_address_placeholder')}
                rows={4}
                className="bg-bg-soft border-none rounded-[1.25rem] focus:bg-white focus:ring-2 focus:ring-customer-primary/30 font-bold italic transition-all focus:shadow-md"
              />
            </div>
            <Button 
               onClick={handleAddNewAddress} 
               fullWidth 
               size="xl" 
               variant="primary"
               className="shadow-lg shadow-customer-primary/20"
            >
               {t('checkout_save_address')}
            </Button>
          </div>
        ) : (
          <div className="px-1">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                   <div className="flex items-center gap-2 px-1">
                      <ShoppingBag size={18} className="text-customer-primary" strokeWidth={2.5} />
                      <Text variant="label" weight={800} className="text-[10px] tracking-[2px] uppercase italic text-text-disabled">{t('checkout_product')}</Text>
                   </div>
                   <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-border-subtle">
                      <ProductCheckoutItem 
                         image={product.images?.[0]}
                         name={product.name}
                         price={totals.subtotal}
                         isGrouped={false}
                      />
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-2 px-1">
                      <MapPin size={18} className="text-customer-primary" strokeWidth={2.5} />
                      <Text variant="label" weight={800} className="text-[10px] tracking-[2px] uppercase italic text-text-disabled">{t('checkout_ship_to')}</Text>
                   </div>
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
                         className="bg-bg-soft border-none rounded-[1.25rem] focus:bg-white focus:ring-2 focus:ring-customer-primary/30 font-bold italic transition-all focus:shadow-md min-h-[80px]"
                      />
                   </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="space-y-4">
                   <div className="flex items-center gap-2 px-1">
                      <Package size={18} className="text-customer-primary" strokeWidth={2.5} />
                      <Text variant="label" weight={800} className="text-[10px] tracking-[2px] uppercase italic text-text-disabled">{t('checkout_delivery_method')}</Text>
                   </div>
                   <DeliveryMethodSelection 
                     selectedId={deliveryMethod}
                     onSelect={setDeliveryMethod}
                   />
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                 <div className="space-y-4">
                   <div className="flex items-center gap-2 px-1">
                      <CreditCard size={18} className="text-customer-primary" strokeWidth={2.5} />
                      <Text variant="label" weight={800} className="text-[10px] tracking-[2px] uppercase italic text-text-disabled">{t('checkout_payment_method')}</Text>
                   </div>
                   <PaymentMethodSelection 
                     selectedId={paymentMethod}
                     onSelect={setPaymentMethod}
                   />
                 </div>

                <div className="pt-6 border-t border-border-subtle bg-bg-soft -mx-5 px-5 pb-8 space-y-6">
                   <div className="flex items-start gap-4 p-5 bg-reward-soft rounded-3xl border border-reward-primary/10 shadow-inner group">
                      <div className="w-12 h-12 bg-reward-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-reward-primary/30 -rotate-3 group-hover:rotate-0 transition-transform">
                        <Ticket size={24} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 space-y-0.5">
                        <Text variant="label" weight={800} className="text-[9px] uppercase tracking-[2px] italic text-reward-primary leading-none">{t('checkout_reward_gift')}</Text>
                        <Text variant="body-md" weight={800} className="text-text-primary uppercase italic tracking-tighter text-base leading-none">{t('checkout_reward_ticket')}</Text>
                      </div>
                   </div>

                   <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-border-subtle space-y-4">
                      <div className="space-y-2.5">
                         <div className="flex justify-between items-center text-sm">
                           <Text weight={700} className="text-text-disabled uppercase italic tracking-tight text-[11px]">{t('checkout_subtotal')}</Text>
                           <Text weight={800} className="font-mono text-text-primary">{formatMoney(totals.subtotal)}</Text>
                         </div>
                         <div className="flex justify-between items-center text-sm">
                           <Text weight={700} className="text-text-disabled uppercase italic tracking-tight text-[11px]">{t('checkout_shipping_fee')}</Text>
                           <Text weight={800} className={cn("font-mono", totals.shipping === 0 ? "text-customer-primary" : "text-text-primary")}>
                              {totals.shipping === 0 ? t('checkout_free') : `+${formatMoney(totals.shipping)}`}
                           </Text>
                         </div>
                      </div>
                      <div className="pt-4 border-t border-border-dashed border-border-subtle flex justify-between items-center">
                         <Text weight={800} className="text-text-primary uppercase italic tracking-tight text-sm font-black">{t('checkout_total')}</Text>
                         <div className="flex flex-col items-end">
                            <Text weight={900} className="text-3xl font-black italic tracking-tighter text-customer-primary leading-none">
                               {formatMoney(totals.total)}
                            </Text>
                            <CaptionText weight={700} className="text-[9px] text-text-disabled uppercase tracking-widest mt-1">VAT Included</CaptionText>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            )}
          </div>
        )}

      {!showAddressForm && (
        <StickyCTA 
          primaryAction={{
            label: step === 3 ? t('checkout_order_now') : t('checkout_continue'),
            onClick: handleNext,
            loading: orderMutation.isPending,
            variant: step === 3 ? 'buy' : 'primary',
            rightIcon: step < 3 ? <ArrowRight size={20} /> : <CheckCircle2 size={20} />,
            disabled: step === 1 && !selectedAddress
          }}
        />
      )}
    </PageContainer>
  );
};
