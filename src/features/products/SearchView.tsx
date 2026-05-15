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
import { PageContainer, SectionHeader } from '../../components/layout';
import { CustomerProductListItem } from '../../components/product/CustomerProductListItem';
import { PartnerProductListItem } from '../../components/product/PartnerProductListItem';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductPartnerCard } from '../../components/product/ProductPartnerCard';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductSkeleton, ProductEmptyState, ProductHorizontalSkeleton } from '../../components/product/ProductStates';
import { Logo } from '../../components/Logo';
import { useAppMode } from '../../hooks/useAppMode';
import { cn } from '../../lib/utils';
import { getRoleColors } from '../../theme/roleColors';
import { useTranslation, TranslationKey } from '../../lib/i18n';
import { HeaderSpacer } from '../../components/layout';

import { useSearchParams } from 'react-router-dom';

import { ListingToolbar } from '../../components/product/ListingToolbar';

export const SearchView = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialGroup = searchParams.get('group');
  const { t, language } = useTranslation();

  const [query, setQuery] = React.useState(initialCategory || initialGroup || '');
  const [isFocused, setIsFocused] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isScrolled, setIsScrolled] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mode: appMode } = useAppMode();
  const isPartner = appMode === 'partner';
  
  const accentColor = isPartner ? 'text-partner-primary' : 'text-customer-primary';

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      return products.slice(0, 10);
    }
    if (query.toLowerCase() === 'new arrivals') {
      return [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return base;
  }, [query, products]);

  const recentSearches = ['iPhone 15', 'AirPods Pro', 'MacBook Air', 'S24 Ultra'];

  const handleCancel = () => {
    setQuery('');
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <PageContainer
      variant="mobile"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="pb-0"
    >
      <MobileLargeHeader 
        title={t('search_title')}
        subtitle={query ? `${filtered.length} ${language === 'vi' ? 'kết quả' : 'results'}` : (language === 'vi' ? 'Tìm bộ sưu tập mới' : 'Find new collections')}
        isScrolled={isScrolled}
      />

      {/* Search Input Area */}
      <div className={cn(
        "sticky top-[56px] pt-[env(safe-area-inset-top)] z-40 transition-all duration-300",
        isScrolled ? "bg-white/78 backdrop-blur-[18px]" : "bg-transparent"
      )}>
        <div className="px-5 py-3">
          <Input
            ref={inputRef}
            type="text" 
            placeholder={isPartner ? t('search_placeholder_partner') : t('search_placeholder_customer')}
            className="group-focus-within:shadow-md transition-shadow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            leftIcon={<Search size={18} strokeWidth={2.5} className={cn(isFocused ? accentColor : "text-text-disabled", "transition-colors")} />}
            rightIcon={
              <IconButton 
                icon={<X size={16} strokeWidth={3} />} 
                onClick={handleCancel} 
                variant="ghost" 
                size="sm"
                className={cn("text-text-disabled hover:text-text-primary bg-bg-soft rounded-xl w-8 h-8 transition-opacity", !query && "opacity-0 pointer-events-none")} 
                label="Clear search"
              />
            }
          />
        </div>
        
        {query && (
          <ListingToolbar 
            resultCount={filtered.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSortClick={() => {}}
            className="border-b border-border-subtle/30"
          />
        )}
      </div>

      <div className="px-5 mt-4">
        {/* Initial View: Trends & Recents */}
        {!query && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Recent Searches */}
            <div className="space-y-4">
              <SectionHeader 
                title={t('search_recent')} 
                action={{
                  label: t('search_clear'),
                  onClick: () => {}
                }}
                className="px-1"
              />
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={item}
                    onClick={() => setQuery(item)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 border border-border-subtle bg-white cursor-pointer shadow-sm active:scale-95 transition-all hover:border-customer-primary/30 hover:bg-customer-soft"
                  >
                    <History size={14} className="text-text-disabled" />
                    <Text weight={600} className="text-text-secondary text-[13px] tracking-tight">{item}</Text>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending */}
            <div className="space-y-4">
               <SectionHeader 
                 title={t('search_trending')} 
                 className="px-1"
               />
               <div className="space-y-1">
                 {products.slice(0, 3).map((p, i) => (
                   <div key={p.id} className="relative group">
                     <div className="absolute top-1/2 -translate-y-1/2 left-2 font-black italic text-4xl text-border-strong/10 group-hover:text-customer-primary/20 transition-all pointer-events-none z-10 w-8 text-center">
                        {i + 1}
                     </div>
                     <ProductCard key={p.id} product={p} className="border-none bg-transparent hover:bg-bg-soft transition-colors rounded-2xl" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="pb-24">
            {isLoading ? (
              <div className="space-y-4 mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-28 bg-white/50 animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="mt-4">
                {viewMode === 'grid' ? (
                  <ProductGrid>
                    {filtered.map(p => (
                      isPartner ? (
                        <ProductPartnerCard key={p.id} product={p} />
                      ) : (
                        <ProductCard key={p.id} product={p} />
                      )
                    ))}
                  </ProductGrid>
                ) : (
                  <div className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-border-subtle">
                    {filtered.map(p => (
                      isPartner ? (
                        <PartnerProductListItem key={p.id} product={p} />
                      ) : (
                        <CustomerProductListItem key={p.id} product={p} />
                      )
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-bg-soft rounded-[2rem] border border-dashed border-border-strong/30 p-10 flex flex-col items-center justify-center text-center space-y-4 mt-8">
                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center shadow-sm">
                  <Search size={32} className="text-text-disabled" strokeWidth={1.5} />
                </div>
                <div>
                  <Text variant="body-lg" weight={800} className="text-text-primary tracking-tight">{t('search_no_results')}</Text>
                  <CaptionText className="text-text-disabled mt-1 font-medium">{t('search_try_again')}</CaptionText>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
};

