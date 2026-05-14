import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Copy, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  FilterX,
  Package,
  ShoppingBag,
  Zap,
  ArrowLeft,
  LayoutGrid,
  List
} from 'lucide-react';
import { MobileLargeHeader } from '../../components/header';
import { useStore } from '../../store';
import { productService } from '../../services/product.service';
import { formatMoney } from '../../utils/money';
import { Button, IconButton, Input, Badge } from '../../components/ui';
import { motion, AnimatePresence } from 'motion/react';
import { Text, Heading, SectionTitle, BodyText, CaptionText, PriceText } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import { cn } from '../../lib/utils';
import { PageContainer } from '../../components/layout';
import { useTranslation } from '../../lib/i18n';
import { ProductPartnerCard } from '../../components/product/ProductPartnerCard';
import { ProductHorizontalItem } from '../../components/product/ProductHorizontalItem';

const CATEGORY_IMAGES: Record<string, string> = {
  'Fashion': '/images/1.jpg',
  'Electronics': '/images/2.jpg',
  'Home': '/images/3.jpg',
  'Beauty': '/images/4.jpg',
  'Sports': '/images/5.jpg',
  'Food': '/images/6.jpg',
  'Gia dụng': '/images/7.jpg',
  'Thời trang': '/images/8.jpg',
  'Sức khỏe': '/images/9.jpg',
  'Làm đẹp': '/images/10.jpg',
  'Beverage': '/images/1.jpg',
  'Footwear': '/images/2.jpg',
  'Outdoor': '/images/3.jpg',
  'Apparel': '/images/4.jpg',
  'Accessories': '/images/5.jpg',
  'Kitchen': '/images/6.jpg',
  'Health': '/images/7.jpg',
  'Toys': '/images/8.jpg'
};

const DEFAULT_IMAGE = '/images/5.jpg';

export const PartnerProductsView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStore();
  const { t } = useTranslation();
  
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');
  const selectedSort = searchParams.get('sort');
  
  const [searchTerm, setSearchTerm] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const categories = React.useMemo(() => {
    const counts: Record<string, number> = {};
    const commissions: Record<string, number[]> = {};
    
    products.forEach(p => {
      if (!p.category) return;
      counts[p.category] = (counts[p.category] || 0) + 1;
      
      if (!commissions[p.category]) commissions[p.category] = [];
      commissions[p.category].push(p.commissionRate || 0);
    });

    return Object.entries(counts).map(([name, count]) => {
      const categoryComms = commissions[name] || [0];
      const avgComm = categoryComms.reduce((a, b) => a + b, 0) / categoryComms.length;
      
      return {
        name,
        count,
        avgCommission: Math.round(avgComm * 10) / 10,
        image: CATEGORY_IMAGES[name] || DEFAULT_IMAGE,
      };
    });
  }, [products]);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = React.useMemo(() => {
    let result = [...products];
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSort === 'commission') {
      result.sort((a, b) => (b.commissionRate || 0) - (a.commissionRate || 0));
    } else if (selectedSort === 'new') {
      result.reverse();
    }
    return result;
  }, [products, selectedCategory, searchTerm, selectedSort]);

  const productGroups = [
    { 
      title: t('partner_products_top_commission'), 
      subtitle: t('partner_products_top_commission_sub'), 
      icon: TrendingUp, 
      color: 'from-partner-primary to-primary-light',
      path: '/app/partner/products?sort=commission'
    },
    { 
      title: t('partner_products_new_collections'), 
      subtitle: t('partner_products_new_collections_sub'), 
      icon: ShoppingBag, 
      color: 'from-accent to-primary',
      path: '/app/partner/products?sort=new'
    },
    { 
      title: t('partner_products_best_sellers'), 
      subtitle: t('partner_products_best_sellers_sub'), 
      icon: Zap, 
      color: 'from-warning to-error',
      path: '/app/partner/products?sort=popular'
    },
  ];

  const isListView = selectedCategory || selectedSort;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen pb-32">
      <MobileLargeHeader 
        title={isListView ? (selectedCategory || t('checkout_product')) : t('partner_products_categories')}
      />

      <PageContainer variant="mobile" className="space-y-8 pt-2">
        {!isListView ? (
          <>
            {/* Search Input for Categories */}
            <div className="relative">
              <Input 
                placeholder={t('partner_products_search_categories')} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search size={18} className="text-text-muted" />}
                className="bg-surface rounded-2xl border-border-subtle"
              />
            </div>

            {/* Highlight Groups */}
            <div className="space-y-4">
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 mx-[-1.25rem] px-5 snap-x snap-mandatory py-1">
                {productGroups.map((group, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "relative min-w-[90%] sm:min-w-[320px] h-[130px] rounded-[2rem] overflow-hidden p-6 flex flex-col justify-between cursor-pointer active:scale-95 transition-all bg-gradient-to-br shadow-md snap-center",
                      group.color
                    )}
                    onClick={() => navigate(group.path)}
                  >
                    <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                      <group.icon size={22} className="text-white" />
                    </div>
                    <div>
                      <Text color="white" weight={600} className="text-base leading-tight">{group.title}</Text>
                      <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{group.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Categories Directory */}
            <div className="space-y-5">
              {isLoading ? (
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 4, 5, 6, 7].map(i => (
                    <div key={i} className="h-[140px] bg-surface animate-pulse rounded-[1.5rem] border border-border-subtle" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {filteredCategories.map((cat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="group relative h-[140px] rounded-[1.5rem] overflow-hidden cursor-pointer active:scale-[0.98] transition-all border border-border-subtle shadow-sm bg-surface"
                      onClick={() => navigate(`/app/partner/products?category=${encodeURIComponent(cat.name)}`)}
                    >
                      <img 
                        src={CATEGORY_IMAGES[cat.name] || DEFAULT_IMAGE} 
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-2.5">
                        <div className="space-y-1">
                          <Text color="white" weight={600} className="text-[10px] leading-tight group-hover:text-partner-primary transition-colors line-clamp-1">{cat.name}</Text>
                          <div className="flex items-center gap-1">
                             <span className="text-white/50 text-[8px] font-bold">{cat.count} {t('partner_products_items')}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Product List View - Styled like CategoryDetail */
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="sticky top-[calc(env(safe-area-inset-top)+12px)] z-40 py-2.5 bg-bg-base/80 backdrop-blur-xl border-b border-border-subtle/50 flex items-center justify-between">
               <div className="flex bg-surface-elevated p-1 rounded-xl border border-border-subtle shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                      viewMode === 'grid' ? "bg-partner-primary text-white shadow-sm" : "text-text-muted hover:text-text-primary"
                    )}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                      viewMode === 'list' ? "bg-partner-primary text-white shadow-sm" : "text-text-muted hover:text-text-primary"
                    )}
                  >
                    <List size={18} />
                  </button>
               </div>
               
               <div className="flex items-center gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    leftIcon={<Filter size={16} />}
                    className="rounded-xl border-border-subtle bg-surface text-text-secondary font-semibold"
                  >
                    {t('partner_products_sort')}
                  </Button>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <SectionTitle>{selectedCategory || t('checkout_product')}</SectionTitle>
               <CaptionText weight={600} color="muted">{filteredProducts.length} {t('partner_products_results')}</CaptionText>
            </div>
            
            <div className={cn(
              "grid",
              viewMode === 'grid' ? "grid-cols-2 gap-4" : "grid-cols-1 gap-0"
            )}>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={cn(
                    "bg-surface animate-pulse border border-border-subtle",
                    viewMode === 'grid' ? "h-64 rounded-[2rem]" : "h-28 rounded-3xl"
                  )} />
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  viewMode === 'grid' ? (
                    <motion.div
                       key={p.id}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                    >
                      <ProductPartnerCard product={p} />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={p.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ProductHorizontalItem 
                        product={p} 
                        variant="partner"
                        className="active:bg-surface-soft"
                      />
                    </motion.div>
                  )
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-surface-soft rounded-full flex items-center justify-center text-text-disabled">
                    <Package size={40} />
                  </div>
                  <div className="space-y-1">
                    <Heading variant="h3" color="muted">{t('partner_products_no_results')}</Heading>
                    <BodyText color="muted">{t('categories_try_again')}</BodyText>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSearchTerm('')}
                    className="text-partner-primary"
                    leftIcon={<FilterX size={16} />}
                  >
                    {t('partner_products_clear_filter')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {filteredCategories.length === 0 && !isListView && !isLoading && (
          <div className="flex flex-col items-center justify-center p-20 text-center opacity-30">
            <div className="w-20 h-20 bg-surface-soft rounded-full flex items-center justify-center mb-4 text-text-disabled">
              <Package size={40} />
            </div>
            <BodyText weight={600}>{t('categories_not_found')}</BodyText>
            <CaptionText>{t('categories_try_again')}</CaptionText>
          </div>
        )}
      </PageContainer>
    </div>
  );
};


