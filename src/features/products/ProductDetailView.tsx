import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  TrendingUp, 
  Ticket, 
  ShoppingCart, 
  ShieldCheck, 
  Zap, 
  Truck, 
  CheckCircle2, 
  HelpCircle,
  Gem,
  Award,
  Users,
  Star,
  Share2,
  DollarSign,
  Copy,
  Megaphone,
  ArrowUpRight
} from 'lucide-react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { ProductHeader } from '../../components/header';
import { useStore } from '../../store';
import { productService } from '../../services/product.service';
import { formatMoney } from '../../utils/money';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { Button, IconButton, StickyCTA } from '../../components/ui';
import { cn } from '../../lib/utils';
import { getRoleColors } from '../../theme/roleColors';
import { ErrorState, PageLoading } from '../../components/feedback';
import { PageContainer, Section } from '../../components/layout';

import { useTranslation } from '../../lib/i18n';

export const ProductDetailView = ({ isLandingPage }: { isLandingPage?: boolean }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language } = useTranslation();
  const { appMode, user } = useStore();
  const partnerId = searchParams.get('partner');
  const roleColors = getRoleColors(appMode);
  
  const [activeImage, setActiveImage] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveImage(index);
  };

  const { data: product, isLoading, isError } = useQuery({ 
    queryKey: ['product', slug, partnerId], 
    queryFn: () => productService.getProductBySlug(slug || '', partnerId || undefined) 
  });

  const handleCopy = () => {
    const baseUrl = window.location.origin;
    // Share link should use the public landing page route
    const shareUrl = `${baseUrl}/p/${product?.slug}?partner=${user?.id}`;
    
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    if (partnerId) {
      sessionStorage.setItem('affiliate_partner_id', partnerId);
    }
  }, [partnerId]);

  const handleBack = () => {
    if (appMode === 'partner') {
      navigate('/app/partner/products');
    } else {
      navigate('/app/home');
    }
  };

  const handleBuyNow = () => {
    if (isLandingPage) {
      navigate(`/p/${product?.slug}/order${partnerId ? `?partner=${partnerId}` : ''}`);
    } else {
      navigate(`/app/products/${product?.slug}/order`);
    }
  };

  const faqs = language === 'vi' ? [
    { q: "Hàng có chính hãng không?", a: "BuyXShare cam kết 100% sản phẩm từ nhà cung cấp uy tín, có đầy đủ giấy tờ." },
    { q: "Khi nào tôi nhận được vé thưởng?", a: "Sau khi đơn hàng hoàn tất và được đối soát thành công, vé sẽ tự động xuất hiện trong ví của bạn." },
    { q: "Tôi có thể mua nhiều sản phẩm không?", a: "Có, mỗi sản phẩm trong đơn hàng đều mang lại cơ hội nhận vé thưởng riêng biệt." },
  ] : [
    { q: "Is it authentic?", a: "BuyXShare guarantees 100% genuine products from verified suppliers." },
    { q: "When do I get my tickets?", a: "Tickets are automatically credited to your wallet once the order is successfully processed." },
    { q: "Can I buy multiple items?", a: "Yes, every eligible item in your order grants you individual entries." },
  ];

  if (isLoading) {
    return <PageLoading />;
  }

  if (!product || isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg-base p-10 text-center">
        <ErrorState 
          title="Product Not Found"
          description="The link might be broken or the product is no longer available."
          onRetry={handleBack} 
        />
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <PageContainer variant="product" className="relative min-h-screen">
      <ProductHeader
        title={product.name}
        brand={product.brand}
        onBack={handleBack}
        onShare={() => {
          handleCopy();
        }}
      />

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-surface"
      >
        <div className="relative group overflow-hidden">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="aspect-square w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide flex scroll-smooth relative bg-surface"
          >
            {product.images?.map((img: string, i: number) => (
              <div key={i} className="min-w-full h-full snap-center relative">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeImage === i ? 1 : 0.6,
                    scale: activeImage === i ? 1 : 0.98
                  }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-cover" 
                    alt={`${product.name} ${i + 1}`} 
                  />
                </motion.div>
              </div>
            ))}
          </div>

              <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                 <Badge variant="customer" size="sm" uppercase>{t('product_best_seller')}</Badge>
              </div>

          {/* Slider Controls */}
          {product.images && product.images.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 pointer-events-none z-30">
              <IconButton
                onClick={() => {
                  const newIndex = Math.max(0, activeImage - 1);
                  scrollRef.current?.scrollTo({ left: newIndex * scrollRef.current.offsetWidth, behavior: 'smooth' });
                }}
                icon={<ChevronLeft size={20} />}
                variant="secondary"
                size="md"
                label="Previous image"
                className={cn('pointer-events-auto rounded-full transition-all', activeImage === 0 ? 'opacity-0 scale-90' : 'opacity-100 scale-100')}
              />
              <IconButton
                onClick={() => {
                  const newIndex = Math.min((product.images?.length || 1) - 1, activeImage + 1);
                  scrollRef.current?.scrollTo({ left: newIndex * scrollRef.current.offsetWidth, behavior: 'smooth' });
                }}
                icon={<ChevronRight size={20} />}
                variant="secondary"
                size="md"
                label="Next image"
                className={cn('pointer-events-auto rounded-full transition-all', activeImage === (product.images?.length || 1) - 1 ? 'opacity-0 scale-90' : 'opacity-100 scale-100')}
              />
            </div>
          )}
          
          {/* Slider Pagination */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-20 bg-black/5 pb-2 px-4 rounded-full backdrop-blur-md border border-white/20 h-1.5 min-w-[60px]">
              {product.images.map((_: any, i: number) => (
                <motion.button 
                  key={i} 
                  onClick={() => {
                    scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
                  }}
                  animate={{ 
                    width: activeImage === i ? 24 : 6,
                    backgroundColor: activeImage === i ? (appMode === 'partner' ? 'var(--color-partner-primary)' : 'var(--color-customer-strong)') : 'rgba(0, 0, 0, 0.2)'
                  }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  className="h-full rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-4 space-y-6"
        >
          {/* Info Header */}
          <motion.div variants={itemVariants} className="space-y-4">
             <div className="flex items-center justify-between">
                <CaptionText className={roleColors.primary} weight={600}>{product.brand}</CaptionText>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-neutral-surface bg-surface-soft overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                     </div>
                   ))}
                 <div className={`w-6 h-6 rounded-full border-2 border-neutral-surface ${roleColors.primaryBg} flex items-center justify-center`}>
                    <CaptionText weight={600} className={appMode === 'customer' ? 'text-white' : 'text-neutral-surface'}>+{Math.floor(Math.random() * 5 + 1)}K</CaptionText>
                 </div>
                </div>
             </div>
             
             <div className="flex justify-between items-start gap-4">
                <ScreenTitle color="dark" className="flex-1">
                   {product.name}
                </ScreenTitle>
                <div className="flex items-center gap-1 bg-surface px-2 py-1 rounded-lg border border-border-subtle shadow-sm shrink-0 mt-1">
                   <Star size={12} className="text-amber-400 fill-amber-400" />
                   <CaptionText weight={600} color="dark">4.9</CaptionText>
                </div>
             </div>

             <div className="flex items-end gap-4">
                <div className="space-y-1">
                   <CaptionText weight={600} color="muted">{t('product_market_price')}</CaptionText>
                   <div className="flex items-center gap-3">
                      <PriceText color="dark" size="md">
                         {formatMoney(product.salePrice || product.price)}
                      </PriceText>
                      {product.salePrice && (
                        <div className="flex items-center gap-2">
                           <CaptionText color="muted" weight={600} className={`line-through decoration-${roleColors.primaryBg}/30`}>
                              {formatMoney(product.price)}
                           </CaptionText>
                           <Badge variant="customer" size="xs">
                             -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                           </Badge>
                        </div>
                      )}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Key Differentiators */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
             <div className="bg-surface-elevated p-4 rounded-2xl border border-border-subtle flex flex-col items-center text-center gap-2">
                <Zap size={18} className={roleColors.primary} />
                <CaptionText weight={600}>{t('product_express')}</CaptionText>
             </div>
             <div className="bg-surface-elevated p-4 rounded-2xl border border-border-subtle flex flex-col items-center text-center gap-2">
                <ShieldCheck size={18} className="text-[var(--color-success)]" />
                <CaptionText weight={600}>{t('product_authentic')}</CaptionText>
             </div>
             <div className="bg-surface-elevated p-4 rounded-2xl border border-border-subtle flex flex-col items-center text-center gap-2">
                <Ticket size={18} className="text-[var(--color-warning)]" />
                <CaptionText weight={600}>{t('product_rewards')}</CaptionText>
             </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="space-y-3">
             <div className={`w-8 h-1 ${roleColors.primaryBg} rounded-full`}></div>
             <SectionTitle>{t('product_essence')}</SectionTitle>
             <BodyText weight={600}>
               {t('product_essence_desc')}
             </BodyText>
          </motion.div>

          {/* Partner Specific Info */}
          {appMode === 'partner' && (
             <motion.div 
               variants={itemVariants}
               className={`bg-surface-elevated p-8 rounded-3xl text-text-primary relative overflow-hidden group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]`}
             >
                <div className={`absolute top-0 right-0 w-64 h-64 ${roleColors.primaryBg}/10 rounded-full blur-[100px] -mr-32 -mt-32`}></div>
                <div className={`absolute bottom-0 left-0 w-48 h-48 bg-partner-primary/5 rounded-full blur-[80px] -ml-24 -mb-24`}></div>
                
                <div className="flex flex-col gap-8 relative z-10">
                   <div className="flex justify-between items-start">
                      <div className="space-y-4">
                         <Badge variant="partner" size="sm" uppercase>
                            PRO ACCESS
                         </Badge>
                         <SectionTitle variant="h2" color="white">{t('product_partner_earnings')}</SectionTitle>
                      </div>
                      <div className="w-14 h-14 bg-surface-soft backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-border-subtle text-text-primary">
                         <Megaphone size={24} />
                      </div>
                   </div>
 
                   <div className="grid grid-cols-2 gap-8 py-8 border-y border-border-subtle">
                      <div className="space-y-2">
                         <CaptionText color="white" className="opacity-40">Commission Rate</CaptionText>
                         <Heading variant="h2" className={roleColors.primary}>{product.regCommission || 18}%</Heading>
                      </div>
                      <div className="space-y-2 text-right">
                         <CaptionText color="white" className="opacity-40">Net Potential</CaptionText>
                         <Heading variant="h2" color="white">
                            {formatMoney((product.salePrice || product.price) * (product.regCommission || 18) / 100)}
                         </Heading>
                      </div>
                   </div>
 
                   <div className="flex flex-col gap-3">
                      <CaptionText color="white" align="center" className="opacity-30 italic">Generate your unique trackable link below</CaptionText>
                      <Button 
                        onClick={handleCopy}
                        variant={copied ? "primary" : "accent"}
                        size="xl"
                        fullWidth
                        leftIcon={copied ? <CheckCircle2 size={18} /> : <Share2 size={18} />}
                        className="shadow-md"
                      >
                         {copied ? 'LINK SECURED' : 'SHARE UNIQUE LINK'}
                      </Button>
                   </div>
                </div>
             </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Social Trust Strip */}
      <section className="px-4 py-8 bg-bg-base relative overflow-hidden">
         <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-4 px-2">
            {[
               { icon: ShieldCheck, title: t('product_original'), color: roleColors.primary, bg: roleColors.softBg },
               { icon: Zap, title: t('product_live_tracking'), color: "text-amber-500", bg: "bg-amber-500/10" },
               { icon: Truck, title: t('product_same_day'), color: "text-blue-500", bg: "bg-blue-500/10" },
               { icon: Award, title: t('product_nft_ready'), color: roleColors.primary, bg: roleColors.softBg }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0 min-w-[120px] bg-surface p-5 rounded-3xl border border-border-subtle shadow-sm transition-transform hover:translate-y-[-4px]">
                  <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                    <item.icon size={24} />
                  </div>
                  <CaptionText weight={600} color="dark">{item.title}</CaptionText>
              </div>
            ))}
         </div>
      </section>

      {/* Rewards Ecosystem */}
      <section className="p-4 space-y-6">
         <div className="flex flex-col gap-2">
            <SectionTitle>{t('product_rewards_ecosystem')}</SectionTitle>
            <CaptionText weight={600} color="muted">{t('product_powered_by')}</CaptionText>
         </div>
         
         <div className="grid grid-cols-1 gap-6">
            <motion.div whileHover={{ y: -5 }} className="bg-surface p-8 rounded-3xl border border-border-subtle shadow-xl shadow-black/20 relative overflow-hidden group">
               <div className={`absolute top-0 right-0 w-32 h-32 ${roleColors.softBg} rounded-full blur-3xl -mr-16 -mt-16 group-hover:${roleColors.primaryBg}/20 transition-colors`}></div>
               <div className="flex flex-col gap-6 relative z-10">
                  <div className={`w-16 h-16 ${roleColors.primaryBg} ${appMode === 'customer' ? 'text-white' : 'text-neutral-surface'} rounded-2xl flex items-center justify-center shadow-xl shadow-${roleColors.primaryBg}/30`}>
                     <Gem size={32} />
                  </div>
                  <div className="space-y-2">
                     <SectionTitle color="dark" size="md">{t('product_rare_ticket')}</SectionTitle>
                     <BodyText color="medium">{t('product_rare_ticket_desc')}</BodyText>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                     <CaptionText className={roleColors.primary} weight={600}>{t('product_learn_mechanics')}</CaptionText>
                     <ArrowUpRight size={14} className={roleColors.primary} />
                  </div>
               </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-surface-elevated p-8 rounded-3xl border border-border-subtle shadow-sm shadow-md shadow-black/40 relative overflow-hidden group">
               <div className={`absolute bottom-0 right-0 w-32 h-32 ${roleColors.primaryBg}/10 rounded-full blur-3xl -mr-16 -mb-16`}></div>
               <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-16 h-16 bg-surface-soft backdrop-blur-xl text-text-primary rounded-2xl flex items-center justify-center border border-border-subtle">
                     <Users size={32} />
                  </div>
                  <div className="space-y-2">
                     <SectionTitle color="white" className="italic">{t('product_social_synergy')}</SectionTitle>
                     <BodyText color="white">{t('product_social_synergy_desc')}</BodyText>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-border-subtle shadow-sm opacity-30">
                     <CaptionText color="white" weight={600}>View Multipliers</CaptionText>
                     <ArrowUpRight size={14} className="text-white" />
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* How it Works / Steps */}
      <section className="p-6 bg-surface mx-4 rounded-3xl shadow-md shadow-black/10 border border-border-subtle space-y-12 mb-10">
         <div className="text-center space-y-2">
            <SectionTitle size="lg" align="center" className="italic uppercase tracking-tight">{t('product_purchase_journey')}</SectionTitle>
            <div className={`w-12 h-1 ${roleColors.primaryBg} mx-auto rounded-full`}></div>
         </div>
         
         <div className="space-y-12">
            {[
              { title: t('product_step_checkout'), desc: t('product_step_checkout_desc'), accent: roleColors.primaryBg },
              { title: t('product_step_verification'), desc: t('product_step_verification_desc'), accent: "bg-surface-soft" },
              { title: t('product_step_nft'), desc: t('product_step_nft_desc'), accent: roleColors.primaryBg },
              { title: t('product_step_victory'), desc: t('product_step_victory_desc'), accent: "bg-surface-soft" }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-8 group">
                 <div className="flex flex-col items-center gap-3">
                    <div className={`w-12 h-12 ${step.accent} rounded-2xl flex items-center justify-center font-bold ${appMode === 'customer' ? 'text-white' : 'text-neutral-surface'} text-lg shadow-xl shrink-0 z-10 transition-transform group-hover:scale-110 font-heading`}>
                       {i + 1}
                    </div>
                    {i < 3 && <div className="w-1 h-12 bg-border-subtle rounded-full"></div>}
                 </div>
                 <div className="space-y-1 pt-1">
                    <SectionTitle size="md" className="italic">{step.title}</SectionTitle>
                    <CaptionText weight={500}>{step.desc}</CaptionText>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Technical FAQ */}
      <section className="p-4 space-y-6">
         <div className="flex items-center justify-between px-2">
            <SectionTitle variant="h2" className="italic">{t('product_protocol_support')}</SectionTitle>
            <div className="px-3 py-1 bg-surface-elevated border border-border-subtle rounded-lg shadow-sm">
               <CaptionText className={roleColors.primary} weight={600}>{t('product_response_time')}</CaptionText>
            </div>
         </div>
         <div className="space-y-4">
            {faqs.map((faq, i) => (
               <details key={i} className={`group bg-surface rounded-3xl border border-border-subtle open:shadow-md open:border-${roleColors.primaryBg}/30 transition-all duration-500 overflow-hidden`}>
                  <summary className={`flex items-center justify-between p-6 cursor-pointer list-none hover:${roleColors.primary} transition-colors`}>
                     <Text variant="button" color="dark" weight={600} className="uppercase tracking-tight">{faq.q}</Text>
                     <div className="w-8 h-8 rounded-xl bg-surface-elevated flex items-center justify-center group-open:rotate-180 transition-transform duration-500">
                        <ChevronRight size={16} className={`text-text-primary/50 group-hover:${roleColors.primary}`} />
                     </div>
                  </summary>
                  <div className="px-8 pb-8 border-t border-border-subtle pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                     <BodyText color="medium">{faq.a}</BodyText>
                  </div>
               </details>
            ))}
         </div>
      </section>

      {/* Sticky Control Bar */}
      <StickyCTA
        title={formatMoney(product.salePrice || product.price)}
        subtitle={t('product_price_label')}
        primaryAction={appMode === 'partner' ? {
          label: copied ? t('product_copied') : t('product_promote'),
          onClick: handleCopy,
          variant: copied ? 'accent' : 'primary',
          leftIcon: copied ? <CheckCircle2 size={18} /> : <Share2 size={18} />
        } : {
          label: t('product_buy_now'),
          onClick: handleBuyNow,
          variant: 'accent',
          leftIcon: <Zap size={18} fill="currentColor" />
        }}
      />
    </PageContainer>
  );
};
