import React from 'react';
import { cn } from '../../lib/utils';

interface ContentGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  children,
  columns = 2,
  gap = 'md',
  className,
  ...props
}) => {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)} {...props}>
      {children}
    </div>
  );
};
