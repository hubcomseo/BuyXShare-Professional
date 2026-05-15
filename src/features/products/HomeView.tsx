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

import { HomeSlider } from '../../components/banner/HomeSlider';

export const HomeView = () => {
  const navigate = useNavigate();
  const { mode, setMode } = useAppMode();
  const { t, language } = useTranslation();
  
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleWindowScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
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
        
          {/* Hero Slider - Refactored as Component */}
          <motion.div variants={itemVariants} className="col-span-2 w-full mb-3">
            <HomeSlider />
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

