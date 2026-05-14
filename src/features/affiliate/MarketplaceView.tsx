import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Copy, Filter, Search, ChevronRight, TrendingUp, DollarSign, ArrowUpRight } from 'lucide-react';
import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { useStore } from '../../store';
import { productService } from '../../services/product.service';
import { Badge, ProductCommissionBadge } from '../../components/ui';
import { Card } from '../../components/ui/Card';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText } from '../../components/ui/Typography';
import { Logo } from '../../components/Logo';
import { getAffiliateLink } from '../../utils/affiliate';
import { formatMoney } from '../../utils/money';
import { Button, IconButton, Input } from '../../components/ui';
import { getRoleColors } from '../../theme/roleColors';
import { cn } from '../../lib/utils';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductPartnerCard } from '../../components/product/ProductPartnerCard';
import { useTranslation } from '../../lib/i18n';

import { CategoryMenu } from '../../components/product/CategoryMenu';

export const MarketplaceView = () => {
  const { user, appMode } = useStore();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const roleColors = getRoleColors(appMode);

  const { data: products = [] } = useQuery({ 
    queryKey: ['products'], 
    queryFn: productService.getProducts 
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (pslug: string, pid: string) => {
    const link = getAffiliateLink(pslug, user?.id || '');
    navigator.clipboard.writeText(link);
    setCopiedId(pid);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-32 min-h-screen">
      <MobileLargeHeader
        title={t('partner_marketplace')}
      />

      <div className="px-4 space-y-6">
        <CategoryMenu />
        <div className="space-y-6">
         {/* Search & Filter */}
         <div className="relative z-10 flex gap-2">
            <div className="flex-1">
               <Input 
                 type="text" 
                 placeholder={t('marketplace_search_placeholder')} 
                 leftIcon={<Search size={20} />}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="h-12 w-full rounded-2xl bg-surface border ring-neutral-border shadow-sm focus:ring-accent/20 focus:border-accent/20 text-[15px]"
               />
            </div>
            <IconButton 
              icon={<Filter size={18} />} 
              variant="secondary" 
              className="rounded-2xl w-12 h-12 shrink-0 border border-border-subtle bg-surface shadow-sm hover:shadow-md"
              label={t('marketplace_filter')}
            />
         </div>
         {/* Commission Highlight Section */}
         <div className="relative group overflow-hidden mb-8 mt-4">
            <div className="absolute inset-0 bg-partner-primary/10 blur-3xl -z-10 group-hover:bg-partner-primary/20 transition-all duration-700"></div>
            <div className="bg-surface p-6 rounded-3xl border border-border-subtle shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-partner-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150"></div>
               
               <div className="relative z-10 flex items-center justify-between gap-6">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-partner-primary rounded-xl flex items-center justify-center text-bg-base shadow-sm -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                           <TrendingUp size={24} />
                        </div>
                        <div className="space-y-0.5">
                           <CaptionText className="text-partner-primary uppercase tracking-widest text-[10px]" weight={600}>{t('marketplace_partner_rewards')}</CaptionText>
                           <SectionTitle variant="h3" color="white" className="leading-tight text-lg">
                             {language === 'vi' ? <>Hoa hồng lên đến <br/>18%</> : <>Earn up to 18% <br/>Commission</>}
                           </SectionTitle>
                        </div>
                     </div>
                  </div>
                  <div className="hidden sm:block shrink-0 -rotate-12 group-hover:rotate-0 transition-all duration-700 opacity-20 group-hover:opacity-100">
                     <div className="w-16 h-16 bg-partner-primary/10 rounded-2xl flex items-center justify-center border border-partner-primary/20">
                        <DollarSign size={32} className="text-partner-primary" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 pr-4 -mx-1">
            <Button 
               variant={!selectedCategory ? "primary" : "secondary"}
               size="sm"
               onClick={() => {
                 setSelectedCategory(null);
                 window.scrollTo({ top: 0, behavior: 'smooth' });
               }}
               className="rounded-xl whitespace-nowrap min-w-fit px-6"
            >
               {t('marketplace_all_categories')}
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={selectedCategory === cat ? "primary" : "secondary"}
                size="sm"
                onClick={() => {
                  setSelectedCategory(cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-xl whitespace-nowrap min-w-fit px-6"
              >
                {cat}
              </Button>
            ))}
         </div>
       </div>

       <ProductGrid>
         {filteredProducts.map(p => (
           <ProductPartnerCard key={p.id} product={p} />
         ))}
       </ProductGrid>

       {filteredProducts.length === 0 && (
         <div className="p-24 text-center space-y-4 opacity-30">
            <div className="w-20 h-20 bg-bg-base rounded-full flex items-center justify-center mx-auto text-muted">
               <Search size={40} />
            </div>
            <BodyText align="center" weight={600} color="muted">{t('marketplace_no_products')}</BodyText>
         </div>
       )}
      </div>
    </div>
  );
};
