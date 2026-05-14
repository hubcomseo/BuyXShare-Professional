import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Filter, ArrowLeft, Search, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import { MobileLargeHeader } from '../../components/header';
import { productService } from '../../services/product.service';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductHorizontalItem } from '../../components/product/ProductHorizontalItem';
import { ProductSkeleton } from '../../components/ui/Skeleton';
import { PageContainer } from '../../components/layout';
import { Text, Heading, CaptionText } from '../../components/ui/Typography';
import { IconButton, Button } from '../../components/ui';
import { cn } from '../../lib/utils';
import { useAppMode } from '../../hooks/useAppMode';

import { useTranslation } from '../../lib/i18n';

export const CategoryDetailView = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const { mode: appMode } = useAppMode();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts
  });

  const categoryProducts = React.useMemo(() => {
    return products.filter(p => p.category === category);
  }, [products, category]);

  return (
    <div className="min-h-screen pb-32">
      <MobileLargeHeader 
        title={category || (language === 'vi' ? 'Danh mục' : 'Category')}
      />

      <PageContainer variant="mobile" className="space-y-6 pt-0">
        {/* Toolbar */}
        <div className="sticky top-[calc(env(safe-area-inset-top)+12px)] z-40 py-3 bg-bg-base/80 backdrop-blur-xl border-b border-border-subtle/50 flex items-center justify-between">
           <div className="flex bg-surface-elevated p-1 rounded-xl border border-border-subtle shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all", viewMode === 'grid' ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-text-primary")}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("w-9 h-9 rounded-lg flex items-center justify-center transition-all", viewMode === 'list' ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-text-primary")}
              >
                <List size={18} />
              </button>
           </div>

           <Button 
            variant="secondary" 
            size="sm" 
            leftIcon={<SlidersHorizontal size={16} />}
            className="rounded-xl border-border-subtle bg-surface text-text-secondary font-semibold"
           >
             {language === 'vi' ? 'Sắp xếp' : 'Sort'}
           </Button>
        </div>

        {/* Content */}
        <div>
          {isLoading ? (
            <ProductGrid>
              {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
            </ProductGrid>
          ) : categoryProducts.length > 0 ? (
            viewMode === 'grid' ? (
              <ProductGrid>
                {categoryProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </ProductGrid>
            ) : (
              <div className="space-y-3">
                {categoryProducts.map(p => (
                  <ProductHorizontalItem 
                    key={p.id} 
                    product={p} 
                    variant={appMode === 'partner' ? 'partner' : 'customer'} 
                  />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <div className="w-20 h-20 bg-surface-soft rounded-full flex items-center justify-center mb-4">
                 <Search size={40} />
              </div>
              <Heading variant="h3">{language === 'vi' ? 'Không có sản phẩm nào' : 'No products found'}</Heading>
              <CaptionText>{language === 'vi' ? 'Vui lòng quay lại sau' : 'Please come back later'}</CaptionText>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
};
