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
import { useToast } from '../../components/toast';

import { useTranslation } from '../../lib/i18n';

export const PartnerDashboardView = () => {
  const { user } = useStore();
  const { mode: appMode, setMode: setAppMode } = useAppMode();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { t, language } = useTranslation();
  
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
    <div className="space-y-6 pb-24 min-h-screen relative">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-partner-primary/20 via-partner-primary/5 to-transparent pointer-events-none" />
      
      {/* Standardized Header for Partner Hub */}
      <MobileLargeHeader 
        title={t('partner_dashboard')}
        titleColor="white"
        showModeBadge={false}
      />

      <PageContainer variant="dashboard" className="space-y-8 pt-0 relative z-10 px-4">
        
        {/* Elite Available Balance Card */}
        <div className="relative mt-6">
           <PartnerStatusCard 
             confirmed={stats?.confirmed || 0}
             pending={stats?.pending || 0}
             paid={stats?.paid || 0}
           />
        </div>

        {/* Quick Actions / Affiliate Bar */}
        <AffiliateLinkCard affiliateLink={affiliateLink} />

        {/* Performance Bento */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <SectionTitle size="sm" className="flex items-center gap-2 uppercase italic tracking-tight">
              <Target size={18} className="text-partner-primary" />
              {t('partner_performance_today')}
            </SectionTitle>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/partner/stats')}
              className="text-partner-primary group"
              rightIcon={<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            >
              {t('partner_details')}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-3">
              <div 
                onClick={() => navigate('/app/partner/stats')}
                className="bg-surface p-5 rounded-[2rem] border border-border-subtle shadow-sm flex flex-col justify-between items-start gap-6 cursor-pointer hover:border-partner-primary/30 transition-colors active:scale-95 relative overflow-hidden group h-full"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-partner-primary/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-partner-primary/20 transition-colors"></div>
                
                <div className="p-3.5 bg-partner-primary/10 text-partner-primary rounded-2xl relative z-10">
                  <TrendingUp size={24} />
                </div>
                <div className="relative z-10 w-full">
                  <LabelText uppercase className="mb-1 tracking-widest font-semibold">{t('partner_earnings')}</LabelText>
                  <MetricText size="sm" color="dark">{formatMoney(stats?.confirmed || 0)}</MetricText>
                </div>
              </div>
            </div>
            
            <div className="grid grid-rows-2 gap-3">
              <div 
                onClick={() => navigate('/app/partner/stats')}
                className="bg-surface p-5 rounded-3xl border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer hover:border-info/30 transition-colors active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-info/10 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-info/20 transition-colors"></div>
                <div className="relative z-10">
                  <LabelText uppercase className="mb-1 tracking-widest font-semibold">{t('partner_clicks')}</LabelText>
                  <MetricText size="sm" color="dark">42</MetricText>
                </div>
                <div className="p-3 bg-info/10 text-info rounded-xl relative z-10">
                  <MousePointer2 size={18} />
                </div>
              </div>

              <div 
                onClick={() => navigate('/app/partner/stats')}
                className="bg-surface p-5 rounded-3xl border border-border-subtle shadow-sm flex items-center justify-between cursor-pointer hover:border-primary-light/30 transition-colors active:scale-95 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary-light/10 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-primary-light/20 transition-colors"></div>
                <div className="relative z-10">
                  <LabelText uppercase className="mb-1 tracking-widest font-semibold">{t('profile_orders')}</LabelText>
                  <MetricText size="sm" color="dark">{stats?.ordersCount || 0}</MetricText>
                </div>
                <div className="p-3 bg-primary-light/10 text-primary-light rounded-xl relative z-10">
                  <ShoppingCart size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promote Now - Products */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <SectionTitle size="sm" className="flex items-center gap-2 uppercase italic tracking-tight">
              <ShoppingBag size={18} className="text-emerald-500" />
              {t('partner_leads')}
            </SectionTitle>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/app/partner/products')}
              className="text-partner-primary"
            >
               {t('nav_home')}
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {products.slice(0, 4).map(p => (
              <ProductPartnerCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </PageContainer>
    </div>
  );
};

