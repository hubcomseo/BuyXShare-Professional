import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Copy, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Zap,
  ShoppingBag,
  Package,
  ArrowUpRight
} from 'lucide-react';
import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { useStore } from '../../store';
import { productService } from '../../services/product.service';
import { Text, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText, PriceText, Eyebrow, SectionAccent } from '../../components/ui/Typography';
import { Input, Button } from '../../components/ui';
import { PageContainer, SectionHeader } from '../../components/layout';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductSkeleton } from '../../components/product/ProductStates';
import { useTranslation } from '../../lib/i18n';
import { cn } from '../../lib/utils';

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

export const MarketplaceView = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isScrolled, setIsScrolled] = React.useState(false);

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

  const partnerGroups = [
    { 
      title: t('partner_products_top_commission') || 'Top Commission', 
      subtitle: t('partner_products_top_commission_sub') || 'Highest earning rates', 
      icon: TrendingUp, 
      gradient: 'from-partner-primary to-[#10B981]',
      shadow: 'shadow-partner-primary/20',
      path: '/app/partner/marketplace/all?sort=commission'
    },
    { 
      title: t('partner_products_new_collections') || 'New Trends', 
      subtitle: t('partner_products_new_collections_sub') || 'Fresh for your audience', 
      icon: ShoppingBag, 
      gradient: 'from-[#8B5CF6] to-[#A78BFA]',
      shadow: 'shadow-violet-500/20',
      path: '/app/partner/marketplace/all?sort=new'
    },
    { 
      title: t('partner_products_best_sellers') || 'Viral Hot', 
      subtitle: t('partner_products_best_sellers_sub') || 'Proven to convert', 
      icon: Zap, 
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      shadow: 'shadow-amber-500/20',
      path: '/app/partner/marketplace/all?sort=popular'
    },
  ];

  return (
    <PageContainer
      variant="mobile"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="space-y-6 pt-0 pb-20"
    >
      <MobileLargeHeader 
        title={t('partner_marketplace') || (language === 'vi' ? 'Tiếp thị' : 'Marketplace')}
        subtitle={`${categories.length} ${language === 'vi' ? 'danh mục' : 'categories'}`}
        mode="partner"
        isScrolled={isScrolled}
      />

      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative group px-5">
          <Input 
            placeholder={t('partner_products_search_categories') || 'Search categories...'}
            leftIcon={<Search size={18} strokeWidth={2.5} className="text-text-disabled" />}
            className="group-focus-within:shadow-md transition-shadow bg-surface rounded-2xl border-border-subtle"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Feature Groups */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 snap-x snap-mandatory">
          {partnerGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative min-w-[70%] sm:min-w-[240px] h-[130px] rounded-[2rem] overflow-hidden p-5 flex flex-col justify-end cursor-pointer active:scale-95 transition-all bg-gradient-to-br shadow-sm snap-center",
                group.gradient,
                group.shadow
              )}
              onClick={() => navigate(group.path)}
            >
              <div className="absolute top-4 left-5 bg-white/20 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                <group.icon size={18} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="space-y-0 relative z-10">
                 <Eyebrow color="white" weight={700} className="opacity-80 leading-tight text-[10px] uppercase tracking-wider">{group.subtitle}</Eyebrow>
                 <Text color="white" weight={800} className="leading-tight text-base tracking-tight">{group.title}</Text>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-5">
        <SectionHeader 
          title={t('search_popular_categories') || 'Categories Listing'} 
          action={{
            label: language === 'vi' ? 'Tất cả' : 'View all',
            onClick: () => {}
          }}
          className="px-0.5"
        />

        <div className="grid grid-cols-2 gap-3 pb-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[120px] bg-surface animate-pulse rounded-2xl border border-border-subtle" />
            ))
          ) : filteredCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="group relative h-[130px] rounded-[2rem] overflow-hidden cursor-pointer active:scale-[0.98] transition-all border border-border-subtle shadow-sm bg-white"
              onClick={() => navigate(`/app/partner/marketplace/${encodeURIComponent(cat.name)}`)}
            >
              <img 
                src={cat.image} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                <div className="space-y-0.5">
                   <Text weight={800} color="white" className="group-hover:text-partner-primary transition-colors line-clamp-1 tracking-tight text-[13px] leading-tight">{cat.name}</Text>
                   <div className="flex items-center justify-between">
                     <Eyebrow color="white" weight={600} className="opacity-70 text-[9px]">{cat.count} items</Eyebrow>
                     <div className="flex items-center gap-0.5 bg-partner-primary/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-partner-primary/20">
                        <ArrowUpRight size={8} className="text-partner-primary" strokeWidth={3} />
                        <span className="text-partner-primary text-[8px] font-black">{cat.avgCommission}%</span>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {filteredCategories.length === 0 && !isLoading && (
         <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
            <div className="w-24 h-24 rounded-[2rem] bg-bg-soft flex items-center justify-center text-text-disabled shadow-inner">
              <Search size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
               <SectionTitle className="px-1">{t('categories_not_found')}</SectionTitle>
               <CaptionText weight={500} className="text-text-disabled">{t('categories_try_again')}</CaptionText>
            </div>
         </div>
      )}
    </PageContainer>
  );
};
