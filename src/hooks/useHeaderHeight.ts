import React from 'react';

export const useHeaderHeight = (variant: 'compact' | 'large' | 'checkout' | 'product' = 'compact') => {
  const heights = {
    compact: 56,
    large: 72,
    checkout: 56,
    product: 56,
  };
  
  const height = heights[variant];
  return `calc(env(safe-area-inset-top) + ${height}px)`;
};
