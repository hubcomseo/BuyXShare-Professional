import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Filter, ArrowLeft, Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { MobileLargeHeader } from '../../components/header/MobileLargeHeader';
import { productService } from '../../services/product.service';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductPartnerCard } from '../../components/product/ProductPartnerCard';
import { CustomerProductListItem } from '../../components/product/CustomerProductListItem';
import { PartnerProductListItem } from '../../components/product/PartnerProductListItem';
import { ProductSkeleton } from '../../components/ui/Skeleton';
import { PageContainer } from '../../components/layout';
import { Text, Heading, CaptionText } from '../../components/ui/Typography';
import { IconButton, Input } from '../../components/ui';
import { cn } from '../../lib/utils';
import { useAppMode } from '../../hooks/useAppMode';

import { useTranslation } from '../../lib/i18n';

export const CategoryDetailView = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useTranslation();
  const { mode: appMode } = useAppMode();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const searchParams = new URLSearchParams(location.search);
  const sort = searchParams.get('sort');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const categoryProducts = React.useMemo(() => {
    let result = category === 'all' ? [...products] : products.filter(p => p.category === category);
    
    // Search filtering
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(term) || 
        (p.brand && p.brand.toLowerCase().includes(term))
      );
    }
    
    if (sort === 'commission') {
      result.sort((a, b) => (b.commissionRate || 0) - (a.commissionRate || 0));
    } else if (sort === 'new') {
      result = [...result].reverse();
    } else if (sort === 'popular') {
      // Logic for popular can be added here
    }
    
    return result;
  }, [products, category, sort]);

  const displayTitle = category === 'all' 
    ? (language === 'vi' ? 'Tất cả sản phẩm' : 'All Products')
    : (category || (language === 'vi' ? 'Danh mục' : 'Category'));

  return (
    <PageContainer
      variant="mobile"
      headerVariant="large"
      withHeaderOffset
      withBottomTabs
      className="space-y-0 pt-0"
    >
      <MobileLargeHeader 
        title={displayTitle}
        subtitle={`${categoryProducts.length} ${language === 'vi' ? 'sản phẩm' : 'items'}`}
        mode={appMode === 'partner' ? 'partner' : 'customer'}
        isScrolled={isScrolled}
        leftSlot={
          <IconButton 
            icon={<ArrowLeft size={isScrolled ? 18 : 22} />} 
            variant="ghost" 
            onClick={() => navigate(-1)}
            label={language === 'vi' ? 'Quay lại' : 'Back'}
            className={cn(
              "transition-all",
              isScrolled ? "p-1" : "p-2"
            )}
          />
        }
      />

      {/* Search Bar - Matching Homepage/Marketplace design */}
      <div className="px-5 mb-4">
        <Input 
          placeholder={language === 'vi' ? 'Tìm kiếm sản phẩm...' : 'Search products...'}
          leftIcon={<Search size={18} strokeWidth={2.5} className="text-text-disabled" />}
          className="bg-surface rounded-2xl border-border-subtle group-focus-within:shadow-md transition-shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="px-1">
        {isLoading ? (
          <ProductGrid className="pt-4">
            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
          </ProductGrid>
        ) : categoryProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <ProductGrid className="pt-4">
              {categoryProducts.map(p => (
                appMode === 'partner' ? (
                  <ProductPartnerCard key={p.id} product={p} />
                ) : (
                  <ProductCard key={p.id} product={p} />
                )
              ))}
            </ProductGrid>
          ) : (
            <div className="flex flex-col pt-4">
              {categoryProducts.map(p => (
                appMode === 'partner' ? (
                  <PartnerProductListItem key={p.id} product={p} />
                ) : (
                  <CustomerProductListItem key={p.id} product={p} />
                )
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-bg-soft rounded-full flex items-center justify-center mb-4 text-text-disabled">
               <Search size={32} />
            </div>
            <Heading variant="h3" className="text-lg font-bold">{language === 'vi' ? 'Không tìm thấy sản phẩm' : 'No products found'}</Heading>
            <CaptionText>{language === 'vi' ? 'Thử chọn danh mục khác nhé' : 'Try another category'}</CaptionText>
          </div>
        )}
      </div>
    </PageContainer>
  );
};
