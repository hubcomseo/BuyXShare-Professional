import React from 'react';
import { Search, Filter, History, TrendingUp, X, ArrowLeft, Zap, Smartphone, Home as HomeIcon, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { 
  Text, 
  ScreenTitle, 
  SectionTitle, 
  CardTitle,
  LabelText,
  BodyText,
  CaptionText, 
} from '../../components/ui/Typography';
import { productService } from '../../services/product.service';
import { formatMoney } from '../../utils/money';
import { Product } from '../../types/product';
import { Button, IconButton, Input } from '../../components/ui';
import { useStore } from '../../store';
import { ProductHorizontalItem } from '../../components/product/ProductHorizontalItem';
import { ProductCompactItem } from '../../components/product/ProductCompactItem';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductSkeleton, ProductEmptyState, ProductHorizontalSkeleton } from '../../components/product/ProductStates';
import { Logo } from '../../components/Logo';
import { useAppMode } from '../../hooks/useAppMode';
import { cn } from '../../lib/utils';
import { getRoleColors } from '../../theme/roleColors';
import { useTranslation, TranslationKey } from '../../lib/i18n';

import { useSearchParams } from 'react-router-dom';

export const SearchView = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialGroup = searchParams.get('group');
  const { t } = useTranslation();

  const [query, setQuery] = React.useState(initialCategory || initialGroup || '');
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mode: appMode } = useAppMode();
  const isPartner = appMode === 'partner';
  const roleColors = getRoleColors(appMode);
  
  const accentColor = isPartner ? 'text-partner-primary' : 'text-primary';
  const accentBg = isPartner ? 'bg-partner-primary/10 hover:bg-partner-primary/20' : 'bg-primary/10 hover:bg-primary/20';

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const filtered = React.useMemo(() => {
    if (!query) return [];
    
    let base = products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.toLowerCase().includes(query.toLowerCase())
    );

    if (query.toLowerCase() === 'best sellers') {
      return products.slice(0, 10); // Mock best sellers
    }
    if (query.toLowerCase() === 'new arrivals') {
      return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return base;
  }, [query, products]);

  const recentSearches = ['iPhone 15', 'AirPods Pro', 'MacBook Air', 'S24 Ultra'];

  const categories = [
    { name: t('search_tech'), icon: Smartphone, color: 'text-info', bg: 'bg-info/10' },
    { name: t('search_promo'), icon: Zap, color: 'text-warning', bg: 'bg-warning/10' },
    { name: t('search_home_living'), icon: HomeIcon, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: t('search_featured'), icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  const handleCancel = () => {
    setQuery('');
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <div className="min-h-screen pb-32">
      <MobileLargeHeader 
        title={t('search_title')}
      />

      {/* Search Input Area */}
      <div className={cn(
        "sticky top-[calc(env(safe-area-inset-top)+12px)] z-40 px-5 py-3 transition-all duration-500",
        isFocused ? "bg-bg-base/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-b-[2rem]" : ""
      )}>
        <div className="flex items-center gap-3">
          <motion.div 
            layout
            className="flex-1"
          >
            <Input
              ref={inputRef}
              type="text" 
              placeholder={isPartner ? t('search_placeholder_partner') : t('search_placeholder_customer')}
              className={cn(
                "h-14 w-full pl-12 pr-12 rounded-[2rem] bg-surface font-semibold transition-all duration-500 text-[15px]",
                isFocused 
                  ? `ring-2 ring-primary/20 border-primary/30 shadow-lg` 
                  : "shadow-sm hover:shadow-md border-border-subtle"
              )}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              leftIcon={<Search size={22} className={cn(isFocused ? accentColor : "text-text-primary/40", "transition-colors")} />}
              rightIcon={
                <AnimatePresence mode="wait">
                  {isFocused || query ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <IconButton 
                        icon={<X size={18} />} 
                        onClick={handleCancel} 
                        variant="ghost" 
                        size="sm"
                        className="text-text-primary/50 hover:text-text-primary bg-surface-elevated rounded-full w-8 h-8" 
                        label="Clear search"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="filter"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <IconButton 
                        icon={<Filter size={20} />} 
                        variant="ghost" 
                        size="sm"
                        className="text-text-primary/60 hover:text-text-primary" 
                        label="Filter"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              }
            />
          </motion.div>
        </div>
      </div>

      <div className="px-5 space-y-8 mt-4">
        {/* Initial View: Trends & Recents */}
        {!query && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Recent Searches */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <SectionTitle size="sm" uppercase className="tracking-tight italic flex items-center gap-2">
                  {t('search_recent')}
                </SectionTitle>
                <LabelText weight={600} className="cursor-pointer hover:text-text-primary px-2 py-1 rounded-lg hover:bg-surface transition-colors">{t('search_clear')}</LabelText>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {recentSearches.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item}
                    onClick={() => setQuery(item)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-4 py-2 border border-border-subtle bg-surface cursor-pointer shadow-sm active:scale-95 transition-all",
                      "hover:border-primary/30 hover:bg-primary/5"
                    )}
                  >
                    <History size={14} className="text-text-muted" />
                    <BodyText size="md" weight={500} color="muted">{item}</BodyText>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 px-1">
                 <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center">
                    <TrendingUp size={16} className="text-rose-500" />
                 </div>
                 <SectionTitle size="sm" uppercase className="tracking-tight italic">{t('search_trending')}</SectionTitle>
               </div>
               <div className="space-y-1">
                 {products.slice(0, 3).map((p, i) => (
                   <div key={p.id} className="relative group">
                     <div className="absolute top-1/2 -translate-y-1/2 left-2 font-black italic text-3xl text-border-strong opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all pointer-events-none z-10 w-8 text-center font-heading">
                        {i + 1}
                     </div>
                     <ProductCompactItem product={p} className={cn("border-none bg-transparent hover:bg-surface-elevated transition-colors rounded-2xl p-3 pl-12", isPartner && "pl-12")} />
                   </div>
                 ))}
               </div>
            </div>

            {/* Categories or Suggestions */}
            <div className="space-y-4 pt-4">
              <SectionTitle size="sm" uppercase className="tracking-tight italic px-1 mb-4">{t('search_popular_categories')}</SectionTitle>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat, i) => (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     key={cat.name}
                     onClick={() => setQuery(cat.name)}
                     className="bg-surface rounded-3xl p-5 border border-border-subtle shadow-sm flex flex-col justify-center gap-3 cursor-pointer group transition-all relative overflow-hidden active:scale-95 hover:border-primary/30"
                  >
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform", cat.bg, cat.color)}>
                       <cat.icon size={20} />
                    </div>
                    <CardTitle size="sm" className="tracking-tight">{cat.name}</CardTitle>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {query && isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <ProductHorizontalSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Search Results */}
        {query && !isLoading && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between px-1">
              <CaptionText weight={600} className="uppercase tracking-widest text-text-muted text-[11px]">
                {t('search_title')} ({filtered.length})
              </CaptionText>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary cursor-pointer hover:text-text-primary px-2 py-1 rounded-lg hover:bg-surface transition-colors">
                {t('search_filter')}
                <Filter size={14} className="text-text-muted" />
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="space-y-3">
                {filtered.map((p, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={p.id}
                  >
                    <ProductHorizontalItem 
                      product={p} 
                      variant={isPartner ? 'partner' : 'customer'}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-surface rounded-[2rem] border border-border-subtle shadow-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-surface-elevated flex items-center justify-center">
                  <Search size={32} className="text-border-strong" />
                </div>
                <div>
                  <Text variant="body-lg" weight={600} className="text-text-primary">{t('search_no_results')}</Text>
                  <CaptionText className="text-text-muted mt-1">{t('search_try_again')}</CaptionText>
                </div>
              </div>
            )}
            
            {/* Suggested for you */}
            {filtered.length === 0 && (
              <div className="pt-8 space-y-6">
                <div className="flex items-center gap-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles size={16} className="text-primary" />
                  </div>
                  <SectionTitle variant="h3" className="m-0">{t('search_suggested')}</SectionTitle>
                </div>
                <ProductGrid>
                  {products.slice(0, 4).map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </ProductGrid>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

