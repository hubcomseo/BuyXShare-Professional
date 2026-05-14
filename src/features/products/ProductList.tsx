import React from 'react';
import { Product } from '../../types/product';
import { useAppMode } from '../../hooks/useAppMode';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductCard } from '../../components/product/ProductCard';
import { ProductPartnerCard } from '../../components/product/ProductPartnerCard';
import { ProductSkeleton } from '../../components/ui/Skeleton';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, isLoading }) => {
  const { mode: appMode } = useAppMode();

  if (isLoading) {
    return (
      <ProductGrid>
        {[...Array(6)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </ProductGrid>
    );
  }

  return (
    <ProductGrid>
      {products.map((p) => (
        appMode === 'partner' ? (
          <ProductPartnerCard key={p.id} product={p} />
        ) : (
          <ProductCard key={p.id} product={p} />
        )
      ))}
    </ProductGrid>
  );
};
