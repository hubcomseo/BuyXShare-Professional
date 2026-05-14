import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { ShoppingBag, Briefcase, Search, Sparkles, TrendingUp, Gift, Layers, Zap, Share2, Ticket, ArrowUpRight, Package } from 'lucide-react';
import { Text, Heading, ScreenTitle, SectionTitle, CardTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { productService } from '../../services/product.service';
import { ProductList } from './ProductList';
import { Badge } from '../../components/ui/Badge';
import { MobileLargeHeader } from '../../components/header';
import { useAppMode } from '../../hooks/useAppMode';
import { Button, IconButton } from '../../components/ui';
import { cn } from '../../lib/utils';
import { PageContainer, Section } from '../../components/layout';
import { CategoryMenu } from '../../components/product/CategoryMenu';
import { useTranslation } from '../../lib/i18n';

export const HomeView = () => {
  const navigate = useNavigate();
  const { mode, setMode } = useAppMode();
  const { t, language } = useTranslation();
  
  const [activeSlide, setActiveSlide] = React.useState(1);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.clientWidth;
    const newSlide = Math.round(scrollLeft / itemWidth);
    if (newSlide !== activeSlide) {
      setActiveSlide(newSlide);
    }
  };

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth'
      });
      setActiveSlide(index);
    }
  };

  React.useEffect(() => {
    // Scroll to initial slide (1)
    const initialTimer = setTimeout(() => {
      scrollToSlide(1);
    }, 100);

    // Autoplay logic - 5 seconds interval
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % 3;
        scrollToSlide(next);
        return next;
      });
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const { data: products = [], isLoading } = useQuery({ 
    queryKey: ['products'], 
    queryFn: productService.getProducts 
  });

  const categories = [
    { name: 'Flash Sale', icon: Zap, color: 'text-warning', bg: 'bg-warning/10' },
    { name: t('ticket'), icon: Gift, color: 'text-primary-light', bg: 'bg-primary-light/10' },
    { name: t('home_group_buy'), icon: Layers, color: 'text-primary', bg: 'bg-primary/10' },
    { name: t('home_featured'), icon: Sparkles, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Impressive Custom Header for Home */}
        <MobileLargeHeader 
          title="BuyXShare"
          showModeBadge={false}
        />

      <PageContainer variant="mobile" className="space-y-6 max-w-4xl pt-0">
        {mode === 'partner' && (
           <div className="flex bg-partner-primary/10 border border-partner-primary/20 px-4 py-2.5 rounded-2xl items-center justify-between shadow-sm">
             <CaptionText className="text-partner-primary" weight={600}>{t('home_high_commission')}</CaptionText>
             <LabelText className="text-partner-primary">{t('home_max_reward')}</LabelText>
           </div>
        )}
        {/* Search Bar - Integrated */}
      <motion.div variants={itemVariants} className="relative z-10 flex gap-2">
         <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors duration-300 text-text-muted/40 group-focus-within:text-primary">
              <Search size={20} />
            </div>
            
            <input 
              type="text" 
              placeholder={t('home_search_placeholder')} 
              className="w-full h-14 pl-12 pr-12 bg-surface rounded-[1.25rem] font-medium transition-all duration-300 focus:outline-none ring-1 outline-none text-text-primary placeholder:text-text-muted/60 ring-border-subtle shadow-sm hover:ring-primary/30 focus:ring-primary/50 focus:shadow-md"
              onClick={() => navigate('/app/search')}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
               <IconButton 
                 icon={<TrendingUp size={20} />} 
                 variant="ghost" 
                 size="sm" 
                 label={t('home_trending_label')}
                 className="text-text-muted/50 hover:text-text-primary h-10 w-10 relative z-10"
               />
               {/* Click target helper */}
               <div className="absolute inset-0 bg-transparent cursor-pointer" onClick={() => navigate('/app/search')}></div>
            </div>
         </div>
      </motion.div>

      {/* Hero Slider */}
      <motion.div variants={itemVariants} className="col-span-2 w-full">
        <div className="relative">
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide mx-[-1.25rem] px-5 pb-4 py-1"
          >
            {/* Slide 1: Create Partner Account CTA */}
          <div className="min-w-[90%] md:min-w-full snap-center" onClick={() => setMode('partner')}>
            <div className="bg-gradient-to-br from-partner-primary to-partner-strong rounded-[2rem] p-6 text-white relative overflow-hidden h-[200px] flex flex-col justify-between border-none shadow-xl shadow-partner-primary/20 group cursor-pointer active:scale-[0.98] transition-transform">
              <div className="flex justify-between items-center relative z-10">
                <div className="bg-white/20 rounded-full px-3 py-1 border border-white/10 backdrop-blur-md flex items-center justify-center">
                  <CaptionText color="white" weight={600} className="uppercase tracking-widest">{t('home_partner_cta')}</CaptionText>
                </div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Share2 size={20} className="text-white" />
                </div>
              </div>
              
              <div className="relative z-10 space-y-4">
                <ScreenTitle color="white" className="leading-tight tracking-tight">
                  {t('home_become_partner')}<br/>{t('home_earn_now')}
                </ScreenTitle>
                <Button 
                  size="sm"
                  variant="secondary"
                  className="bg-white text-partner-strong border-none font-bold"
                  rightIcon={<ArrowUpRight size={16} />}
                >
                  {t('home_join_partner')}
                </Button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-[40px] mix-blend-overlay" />
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tl from-white/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Slide 2: Image + Text */}
          <div className="min-w-[90%] md:min-w-full snap-center">
            <div className="bg-surface rounded-[2rem] relative overflow-hidden h-[200px] flex flex-col justify-end border border-border-subtle group shadow-md">
              <img 
                src="/images/1.jpg" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                alt="Partner program"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="relative z-10 p-6 space-y-2">
                <Badge variant="partner" size="sm" className="px-3 py-1 bg-partner-primary/90 text-white border-none backdrop-blur-md mb-2 inline-flex w-fit">
                  {t('home_revealed')}
                </Badge>
                <SectionTitle size="sm" color="white" className="leading-tight tracking-tight">
                  {t('home_commission_teaser')}
                </SectionTitle>
                <div className="flex items-center gap-3">
                   <div className="px-3 py-1 bg-partner-primary text-white rounded-lg">
                      <CaptionText weight={600} color="white" className="uppercase tracking-wider">{t('home_up_to')}</CaptionText>
                   </div>
                   <CaptionText weight={600} color="white" className="opacity-70 uppercase tracking-wider">{t('home_instant_payout')}</CaptionText>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: Image Only */}
          <div className="min-w-[90%] md:min-w-full snap-center">
            <div className="rounded-[2rem] relative overflow-hidden h-[200px] group border border-border-subtle shadow-md bg-surface">
              <img 
                src="/images/2.jpg" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                alt="Shopping deals"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
              <div className="absolute top-5 left-5">
                <div className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-warning shadow-lg border border-white/50">
                   <Zap size={24} className="fill-warning text-warning" />
                </div>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                 <div className="px-5 py-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl text-center">
                    <CaptionText weight={600} color="white" className="uppercase tracking-widest">{t('home_flash_sale_ongoing')}</CaptionText>
                 </div>
              </div>
            </div>
          </div>
          </div>
          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-1.5 px-3 py-1.5 rounded-full bg-black/10 backdrop-blur-md border border-white/10">
            {[0, 1, 2].map((idx) => (
              <div 
                key={idx} 
                onClick={() => scrollToSlide(idx)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300 cursor-pointer",
                  activeSlide === idx ? "w-4 bg-white" : "w-1 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <Section noPadding>
        <CategoryMenu className="py-2" />
      </Section>

      {/* Partner Commission Section */}
      {mode === 'partner' && (
        <motion.div variants={itemVariants}>
          <div className="bg-surface border border-partner-primary/30 p-6 rounded-[2rem] relative overflow-hidden group shadow-lg">
            <div className="absolute top-0 right-0 w-40 h-40 bg-partner-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-partner-primary/20 transition-colors duration-700"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-partner-primary/10 text-partner-primary rounded-2xl flex items-center justify-center border border-partner-primary/20 group-hover:scale-105 transition-transform duration-500">
                    <TrendingUp size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <CaptionText weight={600} className="text-text-muted uppercase tracking-wider text-[10px]">{t('home_rank_label')}</CaptionText>
                       <Badge variant="partner" size="xs">
                          PLATINUM
                       </Badge>
                    </div>
                    <CardTitle className="text-text-primary text-base font-bold">{t('home_commission_title')}</CardTitle>
                  </div>
                </div>
                <div className="flex gap-3">
                   <div className="px-4 py-2 bg-surface-soft rounded-xl border border-border-subtle">
                      <CaptionText weight={600} color="muted" className="uppercase tracking-wider mb-1 leading-none">{t('home_next_payout')}</CaptionText>
                      <CardTitle size="sm" className="tracking-tight">{t('home_next_payout_date')}</CardTitle>
                   </div>
                   <div className="px-4 py-2 bg-partner-primary/10 rounded-xl border border-partner-primary/20">
                      <CaptionText weight={600} color="primary" className="uppercase tracking-wider mb-1 leading-none">{t('home_bonus')}</CaptionText>
                      <CardTitle size="sm" color="primary" className="tracking-tight">{t('home_boost')}</CardTitle>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}


      {/* Featured Items - List Style */}
      <Section 
        title={t('home_for_you')} 
        description={t('home_trending')} 
        action={{ label: t('nav_categories'), onClick: () => navigate('/app/categories') }}
      >
        <ProductList products={products} isLoading={isLoading} />
      </Section>

      </PageContainer>
    </div>
  );
};

