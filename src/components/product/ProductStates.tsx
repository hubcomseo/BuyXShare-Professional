import React from 'react';
import { cn } from '../../lib/utils';
import { EmptyState, ErrorState } from '../feedback';
import { PackageSearch } from 'lucide-react';

export const ProductSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("bg-surface rounded-3xl border border-border-subtle overflow-hidden shadow-sm animate-pulse", className)}>
    <div className="aspect-square bg-surface-soft" />
    <div className="p-4 space-y-3">
      <div className="space-y-2">
        <div className="h-2 w-1/3 bg-surface-soft rounded" />
        <div className="h-4 w-full bg-surface-soft rounded" />
      </div>
      <div className="flex justify-between items-center">
        <div className="h-5 w-1/4 bg-surface-soft rounded" />
        <div className="h-3 w-1/5 bg-surface-soft rounded" />
      </div>
    </div>
  </div>
);

export const ProductHorizontalSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("flex gap-4 p-4 bg-surface rounded-3xl border border-border-subtle animate-pulse", className)}>
    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-surface-soft flex-shrink-0" />
    <div className="flex-1 flex flex-col justify-between py-1">
      <div className="space-y-2">
        <div className="h-2 w-1/4 bg-surface-soft rounded" />
        <div className="h-4 w-3/4 bg-surface-soft rounded" />
        <div className="h-4 w-1/2 bg-surface-soft rounded" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="h-4 w-1/4 bg-surface-soft rounded" />
        <div className="h-6 w-6 bg-surface-soft rounded-full" />
      </div>
    </div>
  </div>
);

export const ProductEmptyState = ({ title = "No products found", message = "Try adjusting your filters", className }: { title?: string, message?: string, className?: string }) => (
  <EmptyState 
    title={title}
    description={message}
    icon={PackageSearch}
    className={className}
  />
);

export const ProductErrorState = ({ message = "Failed to load products", onRetry }: { message?: string, onRetry?: () => void }) => (
  <ErrorState 
    description={message}
    onRetry={onRetry}
  />
);
