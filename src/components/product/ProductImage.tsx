import React from 'react';
import { cn } from '../../lib/utils';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  overlay?: React.ReactNode;
}

export const ProductImage: React.FC<ProductImageProps> = ({ 
  src, 
  alt, 
  className,
  aspectRatio = 'square',
  overlay
}) => {
  return (
    <div className={cn(
      "relative overflow-hidden bg-surface/50",
      aspectRatio === 'square' && "aspect-square",
      aspectRatio === 'video' && "aspect-video",
      aspectRatio === 'portrait' && "aspect-[3/4]",
      className
    )}>
      <img 
        src={src} 
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      {overlay && (
        <div className="absolute inset-0 z-10">
          {overlay}
        </div>
      )}
    </div>
  );
};
