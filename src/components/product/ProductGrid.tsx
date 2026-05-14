import React from 'react';
import { cn } from '../../lib/utils';

interface ProductGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  children, 
  className,
  columns = 2
}) => {
  return (
    <div className={cn(
      "grid gap-x-3 gap-y-6",
      columns === 2 && "grid-cols-2",
      columns === 3 && "grid-cols-2 sm:grid-cols-3",
      columns === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
      className
    )}>
      {children}
    </div>
  );
};
