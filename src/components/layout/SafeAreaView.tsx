import React from 'react';
import { cn } from '../../lib/utils';

interface SafeAreaViewProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  className?: string;
}

export const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  edges = ['top', 'bottom', 'left', 'right'],
  className,
  ...props
}) => {
  const safeAreaClasses = [
    edges.includes('top') ? 'pt-[env(safe-area-inset-top)]' : '',
    edges.includes('bottom') ? 'pb-[env(safe-area-inset-bottom)]' : '',
    edges.includes('left') ? 'pl-[env(safe-area-inset-left)]' : '',
    edges.includes('right') ? 'pr-[env(safe-area-inset-right)]' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cn("w-full h-full", safeAreaClasses, className)} {...props}>
      {children}
    </div>
  );
};
