import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface LoadingSkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<LoadingSkeletonProps> = ({ className }) => {
  return (
    <div className={cn("animate-pulse bg-surface-soft rounded-md", className)} />
  );
};

export const CardSkeleton: React.FC = () => (
   <div className="bg-surface rounded-2xl p-4 border border-border-subtle space-y-4">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="space-y-2">
         <Skeleton className="h-4 w-3/4" />
         <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-2">
         <Skeleton className="h-6 w-1/3" />
         <Skeleton className="h-8 w-1/4 rounded-lg" />
      </div>
   </div>
);

export const ListSkeleton: React.FC<{ items?: number }> = ({ items = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex gap-4 items-center">
         <Skeleton className="h-16 w-16 rounded-xl shrink-0" />
         <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
         </div>
      </div>
    ))}
  </div>
);

export const PageLoading: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen flex items-center justify-center p-6 bg-bg-base"
  >
     <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-surface-soft rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-text-muted text-sm font-medium animate-pulse tracking-widest uppercase">Đang tải...</p>
     </div>
  </motion.div>
);
