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
import { PageContainer } from '../../components/layout';
import { Text, ScreenTitle, SectionTitle, CardTitle, LabelText, CaptionText, BodyText } from '../../components/ui/Typography';
import { Input } from '../../components/ui/Input';
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

  const { data: products = [] } = useQuery({
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
      subtitle: t('categories_best_seller_sub'), 
      icon: TrendingUp, 
      color: 'from-primary to-primary-light',
      path: '/app/search?group=best sellers'
    },
    { 
      title: t('home_new_arrivals'), 
      subtitle: t('categories_new_arrival_sub'), 
      icon: Zap, 
      color: 'from-warning to-accent',
      path: '/app/search?group=new arrivals'
    },
    { 
      title: t('home_flash_sale'), 
      subtitle: t('categories_flash_sale_sub'), 
      icon: ShoppingBag, 
      color: 'from-error to-warning',
      path: '/app/search?category=Flash Sale'
    },
  ];

  return (
    <div className="min-h-screen pb-32">
      <MobileLargeHeader 
        title={t('nav_categories')}
      />

      <PageContainer variant="mobile" className="space-y-8 pt-2">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
              <Search size={20} />
            </div>
            <Input 
              placeholder={t('categories_search_placeholder')}
              className="pl-12 h-14 bg-surface-elevated/50 border-border-subtle rounded-[1.25rem] shadow-sm focus:border-primary/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Product Groups - Carousel style */}
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
                <div className="bg-white/20 w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <group.icon size={22} className="text-white" />
                </div>
                <div>
                   <CardTitle color="white" className="leading-tight">{group.title}</CardTitle>
                   <LabelText uppercase color="white" className="opacity-60 tracking-widest">{group.subtitle}</LabelText>
                </div>
                
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {filteredCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="group relative h-[140px] rounded-[1.5rem] overflow-hidden cursor-pointer active:scale-[0.98] transition-all border border-border-subtle shadow-sm"
                onClick={() => navigate(`/app/categories/${encodeURIComponent(cat.name)}`)}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-2.5">
                  <div className="space-y-0.5">
                    <CaptionText weight={600} color="white" className="leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">{cat.name}</CaptionText>
                    <div className="flex items-center gap-1">
                       <LabelText color="white" className="opacity-50 text-[10px]">{cat.count} {t('categories_items_count')}</LabelText>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {filteredCategories.length === 0 && (
           <div className="flex flex-col items-center justify-center p-20 text-center">
              <div className="w-24 h-24 rounded-full bg-surface-soft flex items-center justify-center mb-4 text-text-muted/30">
                <Search size={48} />
              </div>
              <SectionTitle size="sm" uppercase className="tracking-tight opacity-40 mb-1">{t('categories_not_found')}</SectionTitle>
              <CaptionText>{t('categories_try_again')}</CaptionText>
           </div>
        )}
      </PageContainer>
    </div>
  );
};
