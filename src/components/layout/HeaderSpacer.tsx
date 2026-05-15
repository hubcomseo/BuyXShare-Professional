import React from 'react';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';

interface HeaderSpacerProps {
  variant?: 'compact' | 'large' | 'checkout' | 'product';
}

export const HeaderSpacer: React.FC<HeaderSpacerProps> = ({ variant = 'compact' }) => {
  const height = useHeaderHeight(variant);
  return (
    <div style={{ height }} className="w-full shrink-0" />
  );
};
