import React, { useRef, useState } from 'react';
import { ProductPartnerCard } from '../../components/product/ProductPartnerCard';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  TrendingUp, 
  ArrowUpRight, 
  ShoppingCart, 
  Package, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  MousePointer2,
  Wallet,
  Copy,
  Share2,
  Megaphone,
  Zap,
  ShoppingBag,
  Briefcase,
  History,
  Target,
  Award,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, ScreenTitle, SectionTitle, CardTitle, BodyText, LabelText, CaptionText, PriceText, MetricText, Heading } from '../../components/ui/Typography';
import { useStore } from '../../store';
import { useAppMode } from '../../hooks/useAppMode';
import { affiliateService } from '../../services/affiliate.service';
import { productService } from '../../services/product.service';
import { MobileLargeHeader } from '../../components/header';
import { Badge } from '../../components/ui/Badge';
import { ProductImage } from '../../components/product/ProductImage';
import { AffiliateLinkCard } from '../../components/partner/AffiliateLinkCard';
import { PartnerStatusCard } from '../../components/partner/PartnerStatusCard';
import { formatMoney } from '../../utils/money';
import { Button, IconButton } from '../../components/ui';
import { ProductOrderItem } from '../../components/product/ProductOrderItem';
import { cn } from '../../lib/utils';
import { PageContainer, Section, ContentGrid } from '../../components/layout';
import { ProductGrid } from '../../components/product/ProductGrid';
import { useToast } from '../../components/toast';

import { useTranslation } from '../../lib/i18n';

export const PartnerDashboardView = () => {
  const { user } = useStore();
  const { mode: appMode, setMode: setAppMode } = useAppMode();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t, language } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const { data: stats } = useQuery({ 
    queryKey: ['partnerStats', user?.id], 
    queryFn: () => affiliateService.getStats(user?.id || '') 
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const affiliateLink = `${window.location.origin}/p/dexspace-exclusive?partner=${user?.id}`;

  return (
    <PageContainer
      variant="dashboard"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="space-y-6 relative z-10 px-0 pb-20 pt-0"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-[380px] bg-gradient-to-b from-partner-soft/60 to-transparent pointer-events-none" />
      
      {/* Standardized Header for Partner Hub */}
      <MobileLargeHeader 
        title={t('partner_dashboard')}
        isScrolled={isScrolled}
        showModeBadge={false}
        mode="partner"
      />

      <div className="px-5 space-y-6 relative">
        <div className="mt-2">
             <PartnerStatusCard 
               confirmed={stats?.confirmed || 0}
               pending={stats?.pending || 0}
               paid={stats?.paid || 0}
             />
          </div>

          {/* Quick Actions / Affiliate Bar */}
          <div className="transition-transform active:scale-[0.98] duration-300">
             <AffiliateLinkCard affiliateLink={affiliateLink} />
          </div>

          {/* Performance Bento */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <SectionTitle size="sm" className="flex items-center gap-2 font-black italic uppercase tracking-tighter text-xs m-0">
                <Target size={16} className="text-partner-primary" strokeWidth={2.5} />
                {t('partner_performance_today')}
              </SectionTitle>
              <IconButton 
                icon={<ChevronRight size={16} strokeWidth={2.5} />}
                onClick={() => navigate('/app/partner/stats')}
                variant="ghost"
                size="sm"
                className="rounded-xl bg-partner-soft text-partner-primary"
                label={t('partner_view_stats')}
              />
            </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div 
                onClick={() => navigate('/app/partner/stats')}
                className="bg-white p-6 rounded-[2.5rem] border border-border-subtle shadow-sm flex flex-col justify-between items-start gap-8 cursor-pointer hover:border-partner-primary/30 transition-all hover:shadow-xl hover:shadow-partner-primary/5 active:scale-95 relative overflow-hidden group h-full"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-partner-soft rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-partner-primary/10 transition-colors"></div>
                
                <div className="w-14 h-14 bg-partner-soft text-partner-primary rounded-[1.25rem] border border-partner-primary/10 relative z-10 flex items-center justify-center shadow-inner">
                  <TrendingUp size={28} strokeWidth={2.5} />
                </div>
                <div className="relative z-10 w-full space-y-1">
                  <LabelText weight={800} className="mb-1 tracking-[2px] uppercase italic text-text-disabled text-[9px]">{t('partner_earnings')}</LabelText>
                  <MetricText size="md" color="dark" className="font-black italic text-3xl tracking-tighter leading-none">{formatMoney(stats?.confirmed || 0)}</MetricText>
                </div>
              </div>
            </div>
            
            <div className="grid grid-rows-2 gap-4">
              <div 
                onClick={() => navigate('/app/partner/stats')}
                className="bg-white p-5 rounded-[2rem] border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer hover:border-info/30 transition-all hover:shadow-xl hover:shadow-info/5 active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-info/5 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-info/10 transition-colors"></div>
                <div className="relative z-10 space-y-0.5">
                  <LabelText weight={800} className="mb-0.5 tracking-[1px] uppercase italic text-text-disabled text-[8px]">{t('partner_clicks')}</LabelText>
                  <MetricText size="sm" color="dark" className="font-black italic text-2xl tracking-tighter leading-none">42</MetricText>
                </div>
                <div className="w-10 h-10 bg-info/10 text-info rounded-2xl relative z-10 flex items-center justify-center shadow-inner">
                  <MousePointer2 size={20} strokeWidth={2.5} />
                </div>
              </div>

              <div 
                onClick={() => navigate('/app/partner/stats')}
                className="bg-white p-5 rounded-[2rem] border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/5 active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-emerald-500/10 transition-colors"></div>
                <div className="relative z-10 space-y-0.5">
                  <LabelText weight={800} className="mb-0.5 tracking-[1px] uppercase italic text-text-disabled text-[8px]">{t('profile_orders')}</LabelText>
                  <MetricText size="sm" color="dark" className="font-black italic text-2xl tracking-tighter leading-none">{stats?.ordersCount || 0}</MetricText>
                </div>
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl relative z-10 flex items-center justify-center shadow-inner">
                  <ShoppingCart size={20} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promote Now - Products */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center justify-between px-2">
            <SectionTitle size="sm" className="flex items-center gap-2 font-black italic uppercase tracking-tighter text-base m-0">
              <ShoppingBag size={18} className="text-customer-primary" strokeWidth={2.5} />
              {t('partner_leads')}
            </SectionTitle>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/partner/marketplace')}
              className="text-text-disabled font-black uppercase text-[10px] tracking-widest hover:text-customer-primary italic"
              rightIcon={<ChevronRight size={14} strokeWidth={3} />}
            >
               {t('nav_home')}
            </Button>
          </div>
          
          <ProductGrid>
            {products.slice(0, 4).map(p => (
              <ProductPartnerCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        </div>
      </div>

    </PageContainer>
  );
};

