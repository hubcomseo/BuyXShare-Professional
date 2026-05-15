import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { 
  Cpu, 
  Shirt, 
  Home, 
  Sparkles, 
  HeartPulse, 
  Dumbbell, 
  Utensils, 
  MoreHorizontal,
  ChevronRight,
  Package,
  ShoppingBag,
  Layers,
  Zap,
  TrendingUp,
  Search
} from 'lucide-react';
import { MobileLargeHeader } from '../../components/header';
import { productService } from '../../services/product.service';
import { PageContainer, SectionHeader } from '../../components/layout';
import { Text, ScreenTitle, SectionTitle, CardTitle, LabelText, CaptionText, BodyText, Eyebrow, SectionAccent, PromoTitle } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
import { ProductList } from './ProductList';
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

import { useTranslation } from '../../lib/i18n';

export const CategoryListView = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeGroup, setActiveGroup] = React.useState(0);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const groupsRef = React.useRef<HTMLDivElement>(null);

  const handleGroupsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = e.currentTarget.clientWidth * 0.7; 
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex !== activeGroup) {
      setActiveGroup(newIndex);
    }
  };

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
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      image: CATEGORY_IMAGES[name] || DEFAULT_IMAGE,
      color: name === 'Flash Sale' ? 'text-warning' : 
             name === 'Vé thưởng' ? 'text-accent' : 
             'text-primary'
    }));
  }, [products]);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productGroups = [
    { 
      title: t('home_best_sellers'), 
      subtitle: 'Best value picked for you', 
      icon: TrendingUp, 
      gradient: 'from-[#4F46E5] to-[#6366F1]',
      shadow: 'shadow-indigo-500/20',
      path: '/app/search?group=best sellers'
    },
    { 
      title: 'New Arrivals', 
      subtitle: 'Just landed this week', 
      icon: Zap, 
      gradient: 'from-[#EC4899] to-[#F472B6]',
      shadow: 'shadow-pink-500/20',
      path: '/app/search?group=new arrivals'
    },
    { 
      title: 'Flash Deals', 
      subtitle: 'Limited time offers', 
      icon: ShoppingBag, 
      gradient: 'from-[#F59E0B] to-[#FBBF24]',
      shadow: 'shadow-amber-500/20',
      path: '/app/search?category=Flash Sale'
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
        title={t('nav_categories')}
        isScrolled={isScrolled}
      />

      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative group px-5">
          <Input 
            placeholder={t('categories_search_placeholder')}
            leftIcon={<Search size={18} strokeWidth={2.5} />}
            className="group-focus-within:shadow-md transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Product Groups - Carousel style */}
        <div className="space-y-4 relative">
          <div 
            ref={groupsRef}
            onScroll={handleGroupsScroll}
            className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 snap-x snap-mandatory"
          >
            {productGroups.map((group, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative min-w-[65%] sm:min-w-[220px] h-[120px] rounded-xl overflow-hidden p-4 flex flex-col justify-end cursor-pointer active:scale-95 transition-all bg-gradient-to-br shadow-sm snap-center",
                  group.gradient,
                  group.shadow
                )}
                onClick={() => navigate(group.path)}
              >
                <div className="absolute top-3 left-4 bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border border-white/20">
                  <group.icon size={16} className="text-white" strokeWidth={2.5} />
                </div>
                <div className="space-y-0 relative z-10">
                   <Eyebrow color="white" weight={700} className="opacity-80 leading-tight">{group.subtitle}</Eyebrow>
                   <SectionAccent color="white" className="leading-tight text-base tracking-tight">{group.title}</SectionAccent>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 px-2 py-0.5 bg-black/10 backdrop-blur-sm rounded-full border border-white/10 pointer-events-none">
            {productGroups.map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "h-0.5 rounded-full transition-all duration-300",
                  activeGroup === i ? "w-2.5 bg-white" : "w-1 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5">
        <SectionHeader 
          title={t('search_popular_categories')} 
          action={{
            label: language === 'vi' ? 'Tất cả' : 'View all',
            onClick: () => {}
          }}
          className="px-0.5"
        />

        <div className="grid grid-cols-2 gap-3">
          {filteredCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="group relative h-[120px] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all border border-border-subtle shadow-sm bg-white"
              onClick={() => navigate(`/app/categories/${encodeURIComponent(cat.name)}`)}
            >
              <img 
                src={CATEGORY_IMAGES[cat.name] || DEFAULT_IMAGE} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3.5">
                <div className="space-y-0">
                   <Text weight={700} color="white" className="group-hover:text-customer-soft transition-colors line-clamp-1 tracking-tight text-[13px] leading-tight">{cat.name}</Text>
                   <Eyebrow color="white" weight={600} className="opacity-80">{cat.count} items</Eyebrow>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Discovery Section */}
      <div className="space-y-4 px-5">
        <SectionHeader 
          title={language === 'vi' ? 'Sản phẩm thịnh hành' : 'Trending Now'} 
          action={{
            label: language === 'vi' ? 'Xem thêm' : 'View more',
            onClick: () => navigate('/app/search')
          }}
          className="px-1"
        />
        <ProductList products={products.slice(0, 4)} isLoading={isLoading} />
      </div>

      {filteredCategories.length === 0 && (
         <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
            <div className="w-24 h-24 rounded-[2rem] bg-bg-soft flex items-center justify-center text-text-disabled shadow-inner">
              <Search size={40} strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
               <PromoTitle className="px-1">{t('categories_not_found')}</PromoTitle>
               <CaptionText weight={500} className="text-text-disabled">{t('categories_try_again')}</CaptionText>
            </div>
         </div>
      )}
    </PageContainer>
  );
};
