import React from 'react';
import { cn } from '../../lib/utils';
import { SectionHeader } from './SectionHeader';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  headerClassName?: string;
  noPadding?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  action,
  headerClassName,
  noPadding = false,
  className,
  ...props
}) => {
  return (
    <section className={cn(noPadding ? "" : "py-6", className)} {...props}>
      {(title || description || action) && (
        <SectionHeader 
          title={title!} 
          description={description} 
          action={action} 
          className={headerClassName} 
        />
      )}
      {children}
    </section>
  );
};
