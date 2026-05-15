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
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText, Eyebrow, PromoTitle, SectionAccent } from '../../components/ui/Typography';
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

import { ProductDetailRelatedItem } from '../../components/product/ProductDetailRelatedItem';
import { ProductPrice } from '../../components/product/ProductPrice';

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

  const { data: allProducts = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const relatedProducts = React.useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 6);
  }, [allProducts, product]);

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
      navigate('/app/partner/marketplace');
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
    <PageContainer 
      variant="product" 
      headerVariant="product"
      hasTransparentHero
      withStickyCTA
      className="relative min-h-screen"
    >
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
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <IconButton
                onClick={() => {
                  const newIndex = Math.max(0, activeImage - 1);
                  scrollRef.current?.scrollTo({ left: newIndex * scrollRef.current.offsetWidth, behavior: 'smooth' });
                }}
                icon={<ChevronLeft size={18} />}
                variant="ghost"
                size="sm"
                label="Previous image"
                className={cn('pointer-events-auto rounded-full bg-white/70 backdrop-blur-md border border-white/20 text-text-primary shadow-sm active:scale-95', activeImage === 0 ? 'opacity-0' : 'opacity-100')}
              />
              <IconButton
                onClick={() => {
                  const newIndex = Math.min((product.images?.length || 1) - 1, activeImage + 1);
                  scrollRef.current?.scrollTo({ left: newIndex * scrollRef.current.offsetWidth, behavior: 'smooth' });
                }}
                icon={<ChevronRight size={18} />}
                variant="ghost"
                size="sm"
                label="Next image"
                className={cn('pointer-events-auto rounded-full bg-white/70 backdrop-blur-md border border-white/20 text-text-primary shadow-sm active:scale-95', activeImage === (product.images?.length || 1) - 1 ? 'opacity-0' : 'opacity-100')}
              />
            </div>
          )}
          
          {/* Slider Pagination */}
          {product.images && product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 z-20 bg-black/10 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-white/5 h-4 min-w-[50px]">
              {product.images.map((_: any, i: number) => (
                <motion.button 
                  key={i} 
                  onClick={() => {
                    scrollRef.current?.scrollTo({ left: i * scrollRef.current.offsetWidth, behavior: 'smooth' });
                  }}
                  animate={{ 
                    width: activeImage === i ? 12 : 4,
                    height: 4,
                    backgroundColor: activeImage === i ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)'
                  }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  className="rounded-full"
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
                <Eyebrow color="customer" weight={700}>{product.brand}</Eyebrow>
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-6 h-6 rounded-full border-2 border-surface bg-bg-soft overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" />
                     </div>
                   ))}
                 <div className="w-6 h-6 rounded-full border-2 border-surface bg-customer-soft flex items-center justify-center">
                    <CaptionText weight={800} className="text-customer-text text-[8px]">+2K</CaptionText>
                 </div>
                </div>
             </div>
             
             <div className="flex justify-between items-start gap-4">
                <ScreenTitle color="dark" className="flex-1 font-black text-2xl tracking-tighter leading-none">
                   {product.name}
                </ScreenTitle>
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-xl border border-border-subtle shadow-sm shrink-0 mt-1">
                   <Star size={12} className="text-amber-400 fill-amber-400" />
                   <CaptionText weight={800} color="dark">4.9</CaptionText>
                </div>
             </div>

             <div className="bg-bg-soft/50 p-4 rounded-2xl border border-border-subtle">
                <div className="space-y-1">
                   <Eyebrow weight={800} color="disabled">{t('product_market_price')}</Eyebrow>
                   <ProductPrice 
                      price={product.price} 
                      salePrice={product.salePrice}
                      size="xl"
                   />
                </div>
             </div>
          </motion.div>

          {/* Key Differentiators */}
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
             <div className="bg-white p-4 rounded-2xl border border-border-subtle flex flex-col items-center text-center gap-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-customer-soft text-customer-primary flex items-center justify-center">
                   <Zap size={18} strokeWidth={2.5} />
                </div>
                <CaptionText weight={800} className="text-[10px] text-text-primary">{t('product_express')}</CaptionText>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-border-subtle flex flex-col items-center text-center gap-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                   <ShieldCheck size={18} strokeWidth={2.5} />
                </div>
                <CaptionText weight={800} className="text-[10px] text-text-primary">{t('product_authentic')}</CaptionText>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-border-subtle flex flex-col items-center text-center gap-2 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-reward-soft text-reward-primary flex items-center justify-center">
                   <Ticket size={18} strokeWidth={2.5} />
                </div>
                <CaptionText weight={800} className="text-[10px] text-text-primary">{t('product_rewards')}</CaptionText>
             </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="bg-surface p-5 rounded-3xl border border-border-subtle space-y-3">
             <div className="w-8 h-1 bg-customer-primary rounded-full"></div>
             <PromoTitle>{t('product_essence')}</PromoTitle>
             <BodyText className="text-text-secondary leading-relaxed">
               {t('product_essence_desc')}
             </BodyText>
          </motion.div>

          {/* Partner Specific Info */}
          {appMode === 'partner' && (
             <motion.div 
               variants={itemVariants}
               className="bg-partner-primary p-7 rounded-3xl text-white relative overflow-hidden group shadow-xl shadow-partner-primary/20"
             >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[80px] -ml-24 -mb-24"></div>
                
                <div className="flex flex-col gap-6 relative z-10">
                   <div className="flex justify-between items-start">
                      <div className="space-y-2">
                         <Badge variant="partner" size="sm" className="bg-white/20 text-white border-white/20 backdrop-blur-md px-3 font-black text-[9px] tracking-widest">
                            PRO PARTNER ACCESS
                         </Badge>
                         <PromoTitle color="white" className="text-2xl">{t('product_partner_earnings')}</PromoTitle>
                      </div>
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 text-white">
                         <Megaphone size={20} strokeWidth={2.5} />
                      </div>
                   </div>
  
                   <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/10">
                      <div className="space-y-1">
                         <Eyebrow color="white" weight={800} className="text-white/60">Commission Rate</Eyebrow>
                         <PromoTitle color="white" className="text-3xl">{product.regCommission || 18}%</PromoTitle>
                      </div>
                      <div className="space-y-1 text-right">
                         <Eyebrow color="white" weight={800} className="text-white/60">Net Potential</Eyebrow>
                         <PromoTitle color="white" className="text-2xl">
                            {formatMoney((product.salePrice || product.price) * (product.regCommission || 18) / 100)}
                         </PromoTitle>
                      </div>
                   </div>
  
                   <div className="flex flex-col gap-3">
                      <CaptionText align="center" className="text-white/40 italic text-[10px]">Tap to generate unique tracking link</CaptionText>
                      <Button 
                        onClick={handleCopy}
                        variant={copied ? "soft-partner" : "primary"}
                        size="xl"
                        fullWidth
                        leftIcon={copied ? <CheckCircle2 size={18} /> : <Share2 size={18} strokeWidth={2.5} />}
                        className="shadow-xl"
                      >
                         {copied ? 'LINK COPIED' : 'PROMOTE NOW'}
                      </Button>
                   </div>
                </div>
             </motion.div>
          )}
        </motion.div>
      </motion.section>

      {/* Social Trust Strip */}
      <section className="px-4 py-8 bg-bg-soft relative overflow-hidden">
         <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4 px-2">
            {[
               { icon: ShieldCheck, title: t('product_original'), color: "text-customer-primary", bg: "bg-customer-soft" },
               { icon: Zap, title: t('product_live_tracking'), color: "text-amber-600", bg: "bg-amber-50" },
               { icon: Truck, title: t('product_same_day'), color: "text-blue-600", bg: "bg-blue-50" },
               { icon: Award, title: t('product_nft_ready'), color: "text-reward-primary", bg: "bg-reward-soft" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0 min-w-[130px] bg-white p-5 rounded-3xl border border-border-subtle shadow-sm">
                  <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                    <item.icon size={22} strokeWidth={2.5} />
                  </div>
                  <CaptionText weight={800} className="text-text-primary text-[11px]">{item.title}</CaptionText>
              </div>
            ))}
         </div>
      </section>

      {/* Rewards Ecosystem */}
      <section className="p-4 space-y-6">
         <div className="flex flex-col gap-1 px-2">
            <PromoTitle className="text-2xl">{t('product_rewards_ecosystem')}</PromoTitle>
            <Eyebrow weight={700} color="disabled">{t('product_powered_by')} DEXSPACE PLATFORM</Eyebrow>
         </div>
         
         <div className="grid grid-cols-1 gap-4">
            <motion.div whileHover={{ y: -5 }} className="bg-surface p-7 rounded-[2rem] border border-border-subtle shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-reward-soft rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-reward-primary/10 transition-colors"></div>
               <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-14 h-14 bg-reward-primary text-white rounded-2xl flex items-center justify-center shadow-lg shadow-reward-primary/30">
                     <Gem size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                     <SectionAccent>{t('product_rare_ticket')}</SectionAccent>
                     <BodyText className="text-text-secondary text-sm">
                        {t('product_rare_ticket_desc')}
                     </BodyText>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-border-subtle">
                     <CaptionText className="text-reward-primary font-bold uppercase tracking-widest text-[10px]">{t('product_learn_mechanics')}</CaptionText>
                     <ArrowUpRight size={14} className="text-reward-primary" />
                  </div>
               </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-customer-primary p-7 rounded-[2rem] border border-white/10 shadow-xl shadow-customer-primary/10 relative overflow-hidden group">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mb-16"></div>
               <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center border border-white/20">
                     <Users size={28} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                     <SectionAccent color="white">{t('product_social_synergy')}</SectionAccent>
                     <BodyText color="white" className="text-white/80 text-sm">
                        {t('product_social_synergy_desc')}
                     </BodyText>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/10 opacity-60">
                     <CaptionText color="white" weight={800} className="uppercase tracking-widest text-[10px]">View Multipliers</CaptionText>
                     <ArrowUpRight size={14} className="text-white" />
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* How it Works / Steps */}
      <section className="p-6 bg-white mx-4 rounded-[2rem] shadow-sm border border-border-subtle space-y-10 mb-10">
         <div className="text-center space-y-2">
            <PromoTitle className="text-2xl align-center">{t('product_purchase_journey')}</PromoTitle>
            <div className="w-12 h-1 bg-customer-primary mx-auto rounded-full"></div>
         </div>
         
         <div className="space-y-10">
            {[
              { title: t('product_step_checkout'), desc: t('product_step_checkout_desc'), accent: "bg-customer-primary text-white" },
              { title: t('product_step_verification'), desc: t('product_step_verification_desc'), accent: "bg-bg-soft text-text-primary" },
              { title: t('product_step_nft'), desc: t('product_step_nft_desc'), accent: "bg-customer-primary text-white" },
              { title: t('product_step_victory'), desc: t('product_step_victory_desc'), accent: "bg-reward-primary text-white" }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-6 group">
                 <div className="flex flex-col items-center gap-2">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110", step.accent)}>
                       {i + 1}
                    </div>
                    {i < 3 && <div className="w-0.5 h-10 bg-border-subtle rounded-full"></div>}
                 </div>
                 <div className="space-y-1 pt-1">
                    <Text className="text-base font-black italic tracking-tight">{step.title}</Text>
                    <CaptionText weight={500} className="text-text-secondary leading-snug">{step.desc}</CaptionText>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* Technical FAQ */}
      <section className="p-4 space-y-6">
         <div className="flex items-center justify-between px-3">
            <PromoTitle className="text-2xl">{t('product_protocol_support')}</PromoTitle>
            <div className="px-3 py-1 bg-customer-soft border border-customer-primary/10 rounded-full">
               <Eyebrow color="customer" weight={800}>{t('product_response_time')}</Eyebrow>
            </div>
         </div>
         <div className="space-y-3">
            {faqs.map((faq, i) => (
               <details key={i} className="group bg-surface rounded-2xl border border-border-subtle open:border-customer-primary/30 transition-all duration-300 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none hover:text-customer-primary transition-colors">
                     <Text weight={700} className="uppercase tracking-tight text-sm font-black italic">{faq.q}</Text>
                     <div className="w-8 h-8 rounded-xl bg-bg-soft flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                        <ChevronRight size={16} className="text-text-disabled group-hover:text-customer-primary" />
                     </div>
                  </summary>
                  <div className="px-5 pb-6 border-t border-border-subtle pt-4 animate-in fade-in slide-in-from-top-2 duration-300 bg-bg-soft/30">
                     <BodyText className="text-text-secondary leading-relaxed">{faq.a}</BodyText>
                  </div>
               </details>
            ))}
         </div>
      </section>

      {/* Suggested Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-8 space-y-6">
          <div className="px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={cn("w-1.5 h-6 rounded-full", roleColors.primaryBg)} />
              <SectionAccent className="m-0 text-lg">
                {language === 'vi' ? 'Sản phẩm tương tự' : 'Similar Products'}
              </SectionAccent>
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-4">
            {relatedProducts.map(p => (
              <ProductDetailRelatedItem key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Control Bar */}
      <StickyCTA
        title={formatMoney(product.salePrice || product.price)}
        subtitle={t('product_price_label')}
        primaryAction={appMode === 'partner' ? {
          label: copied ? t('product_copied') : t('product_promote'),
          onClick: handleCopy,
          variant: copied ? 'soft-partner' : 'primary',
          leftIcon: copied ? <CheckCircle2 size={18} /> : <Share2 size={18} />
        } : {
          label: t('product_buy_now'),
          onClick: handleBuyNow,
          variant: 'buy',
          leftIcon: <Zap size={18} fill="currentColor" />
        }}
      />
    </PageContainer>
  );
};
