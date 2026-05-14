import React from 'react';
import { cn } from '../../lib/utils';
import { motion, MotionProps } from 'motion/react';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'mobile' | 'dashboard' | 'product';
  className?: string;
  withAnimation?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  variant = 'mobile',
  className,
  withAnimation = true,
  ...props
}) => {
  const variantClasses = {
    mobile: "max-w-2xl mx-auto px-5 pb-32",
    dashboard: "max-w-7xl mx-auto px-4 pb-24", // Wider for dashboard (Supplier/Admin)
    product: "max-w-2xl mx-auto p-0 pb-40",
  };

  const containerProps = {
    className: cn("w-full", variantClasses[variant], className),
    ...props
  };

  if (withAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...(containerProps as any)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div {...containerProps}>
      {children}
    </div>
  );
};
