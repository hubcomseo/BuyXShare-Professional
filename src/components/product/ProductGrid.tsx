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
  const childrenArray = React.Children.toArray(children);
  
  if (columns === 2) {
    const leftCol = childrenArray.filter((_, i) => i % 2 === 0);
    const rightCol = childrenArray.filter((_, i) => i % 2 !== 0);

    return (
      <div className={cn("flex gap-3", className)}>
        <div className="flex-1 flex flex-col gap-3">
          {leftCol}
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {rightCol}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid gap-x-3 gap-y-4",
      columns === 3 && "grid-cols-2 sm:grid-cols-3",
      columns === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
      className
    )}>
      {children}
    </div>
  );
};
  