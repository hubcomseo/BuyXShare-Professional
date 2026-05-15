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
  const [isScrolled, setIsScrolled] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

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
    { name: 'Flash Sale', icon: Zap, color: 'text-sale-text', bg: 'bg-sale-soft' },
    { name: t('ticket'), icon: Gift, color: 'text-reward-text', bg: 'bg-reward-soft' },
    { name: t('home_group_buy'), icon: Layers, color: 'text-customer-primary', bg: 'bg-customer-soft' },
    { name: t('home_featured'), icon: Sparkles, color: 'text-reward-primary', bg: 'bg-reward-soft/50' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <PageContainer 
      variant="mobile" 
      headerVariant="large"
      withHeaderOffset 
      withBottomTabs
      className="space-y-0 max-w-4xl"
    >
      <MobileLargeHeader 
        title="BuyXShare"
        showModeBadge={false}
        isScrolled={isScrolled}
        mode={mode === 'partner' ? 'partner' : 'customer'}
      />

      <div className="space-y-3 pb-0">
          {/* Search Bar - Refined */}
          <motion.div variants={itemVariants} className="relative z-10">
             <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors duration-300 text-text-muted transition-colors group-focus-within:text-customer-primary">
                  <Search size={18} />
                </div>
                
                <input 
                  type="text" 
                  readOnly
                  placeholder={t('home_search_placeholder')} 
                  className="w-full h-[44px] pl-11 pr-11 bg-white border border-[#E2E8F0] rounded-[14px] font-semibold transition-all duration-300 focus:outline-none outline-none text-text-primary placeholder:text-text-muted/50 shadow-[0_2px_4px_rgba(0,0,0,0.02)] text-[14px] cursor-pointer"
                  onClick={() => navigate('/app/search')}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                   <IconButton 
                     icon={<TrendingUp size={18} />} 
                     variant="ghost" 
                     size="sm" 
                     label={t('home_trending_label')}
                     className="text-text-muted h-9 w-9"
                   />
                </div>
             </div>
          </motion.div>
        
          {/* Hero Slider - Modern Banner approach */}
          <motion.div variants={itemVariants} className="col-span-2 w-full mb-3">
            <div className="relative">
              <div 
                ref={sliderRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar mx-[-1rem] px-4 pb-0"
              >
                {/* Slide 1: Create Partner Account CTA */}
                <div className="min-w-[90%] snap-center" onClick={() => setMode('partner')}>
                  <div className="bg-partner-primary rounded-[28px] p-5 text-white relative overflow-hidden h-[160px] flex flex-col justify-between border-none shadow-xl shadow-partner-primary/20 group cursor-pointer active:scale-[0.98] transition-transform">
                    <div className="flex justify-between items-start relative z-10">
                      <div className="bg-white/20 rounded-full px-3 py-1 border border-white/10 backdrop-blur-md flex items-center justify-center">
                        <CaptionText color="white" weight={800} className="uppercase tracking-widest text-[10px]">{t('home_partner_cta')}</CaptionText>
                      </div>
                      <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                        <Briefcase size={20} className="text-white" />
                      </div>
                    </div>
                    
                    <div className="relative z-10">
                      <Heading level={3} color="white" className="leading-none tracking-tight mb-2 font-black uppercase text-2xl italic">
                        {t('home_become_partner')}
                      </Heading>
                      <div className="flex items-center gap-1.5 text-white font-bold text-sm bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                        {t('home_join_partner')} <ArrowUpRight size={16} strokeWidth={3} />
                      </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-[40px] mix-blend-overlay" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-partner-strong/50 rounded-full blur-[60px]" />
                  </div>
                </div>

                {/* Slide 2: Image + Text */}
                <div className="min-w-[90%] snap-center">
                  <div className="bg-bg-soft rounded-[28px] relative overflow-hidden h-[160px] flex flex-col justify-end border border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
                    <img 
                      src="/images/1.jpg" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      alt="Product promotion"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="relative z-10 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="partner" size="xs" className="px-2.5 py-0.5 bg-partner-primary/90 text-white border-none backdrop-blur-md font-bold uppercase tracking-wider text-[9px]">
                          Cơ hội thu nhập
                        </Badge>
                      </div>
                      <CardTitle color="white" className="leading-tight tracking-tight text-lg line-clamp-2 font-black drop-shadow-md uppercase italic">
                        {t('home_commission_teaser')}
                      </CardTitle>
                    </div>
                  </div>
                </div>

                {/* Slide 3: Commerce Deal */}
                <div className="min-w-[90%] snap-center">
                  <div className="rounded-[28px] relative overflow-hidden h-[160px] group border border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-br from-indigo-900 to-indigo-600">
                    <img 
                      src="/images/2.jpg" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105" 
                      alt="Shopping deals"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                    
                    <div className="absolute top-4 left-5 flex flex-col gap-1.5 text-left">
                      <div className="flex items-center gap-2">
                        <Badge variant="sale" size="xs" className="w-fit border-none px-2.5 py-0.5">
                          {t('flash_deal_today')}
                        </Badge>
                      </div>
                      <SectionTitle color="white" className="leading-none font-black tracking-tighter text-left text-3xl italic uppercase drop-shadow-lg">
                        {t('discount_up_to_40')}
                      </SectionTitle>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/10">
                         <Ticket size={16} className="text-reward-primary" strokeWidth={3} />
                         <CaptionText weight={800} color="white" className="text-[10px] uppercase tracking-wider">{t('get_dexspace_ticket')}</CaptionText>
                      </div>
                      <Button 
                        variant="secondary"
                        size="xs"
                        className="px-5 shadow-xl uppercase tracking-tighter"
                      >
                         {t('buy_now')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Refined Navigation Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center gap-1 px-2.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                {[0, 1, 2].map((idx) => (
                  <div 
                    key={idx} 
                    onClick={() => scrollToSlide(idx)}
                    className={cn(
                      "h-1 rounded-full transition-all duration-300 cursor-pointer shadow-sm",
                      activeSlide === idx ? "w-4 bg-white" : "w-1 bg-white/40 hover:bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-4 mt-0">
          <CategoryMenu />
        </div>

        {/* Partner Commission Section - Compact */}
        {mode === 'partner' && (
          <motion.div variants={itemVariants} className="mb-6 px-0">
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-[24px] relative overflow-hidden group shadow-sm">
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-partner-soft text-partner-primary rounded-2xl flex items-center justify-center border border-partner-primary/10 transition-transform group-hover:scale-105 duration-300">
                      <TrendingUp size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                         <CaptionText weight={800} className="text-text-muted uppercase tracking-widest text-[9px]">{t('home_rank_label')}</CaptionText>
                         <Badge variant="partner" size="xs" className="scale-75 origin-left">
                            PLATINUM
                         </Badge>
                      </div>
                      <CardTitle className="text-text-primary text-[16px] font-black underline decoration-partner-primary decoration-4 underline-offset-4 truncate tracking-tight uppercase italic">{t('home_commission_title')}</CardTitle>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <div className="px-4 py-2.5 bg-bg-soft rounded-2xl border border-border-default/50">
                        <CaptionText weight={800} className="text-text-disabled uppercase tracking-widest mb-1 leading-none text-[8px]">{t('home_next_payout')}</CaptionText>
                        <Text variant="body-sm" weight={700} className="tracking-tighter truncate text-text-primary uppercase text-[11px]">{t('home_next_payout_date')}</Text>
                     </div>
                     <div className="px-4 py-2.5 bg-[#D1FAE5]/30 rounded-2xl border border-[#00B879]/10">
                        <CaptionText weight={800} className="text-partner-primary uppercase tracking-widest mb-1 leading-none text-[8px]">{t('home_bonus')}</CaptionText>
                        <Text variant="body-sm" weight={700} className="text-partner-primary tracking-tighter truncate uppercase text-[11px]">{t('home_boost')}</Text>
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
          action={{ label: t('view_more'), onClick: () => navigate('/app/categories') }}
          noPadding
          headerClassName="px-0 mb-2.5"
        >
          <ProductList products={products} isLoading={isLoading} />
        </Section>
      </PageContainer>
  );
};

