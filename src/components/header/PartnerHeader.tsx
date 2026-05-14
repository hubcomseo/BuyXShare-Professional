import React from 'react';
import { MobileLargeHeader } from './MobileLargeHeader';

export interface PartnerHeaderProps {
  title: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const PartnerHeader: React.FC<PartnerHeaderProps> = ({
  title,
  leftSlot,
  rightSlot,
}) => {
  return (
    <MobileLargeHeader 
      title={title}
      leftSlot={leftSlot}
      rightSlot={rightSlot}
    />
  );
};
