import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';
import { useHeaderHeight } from '../../hooks/useHeaderHeight';

type HeaderVariant = 'none' | 'compact' | 'large' | 'checkout' | 'product';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'mobile' | 'dashboard' | 'product';
  headerVariant?: HeaderVariant;
  withHeaderOffset?: boolean;
  hasTransparentHero?: boolean;
  withBottomTabs?: boolean;
  withStickyCTA?: boolean;
  className?: string;
  withAnimation?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  variant = 'mobile',
  headerVariant = 'compact',
  withHeaderOffset = false,
  hasTransparentHero = false,
  withBottomTabs = false,
  withStickyCTA = false,
  className,
  withAnimation = true,
  ...props
}) => {
  const headerHeight = useHeaderHeight(headerVariant === 'none' ? 'compact' : headerVariant);
  
  const bottomPadding = cn(
    withBottomTabs && "pb-[calc(env(safe-area-inset-bottom)+100px)]",
    withStickyCTA && !withBottomTabs && "pb-[calc(env(safe-area-inset-bottom)+110px)]",
    !withBottomTabs && !withStickyCTA && variant === 'mobile' && "pb-12",
    !withBottomTabs && !withStickyCTA && variant === 'product' && "pb-36"
  );

  const topPadding = withHeaderOffset && headerVariant !== 'none' 
    ? { paddingTop: headerVariant === 'large' ? 'calc(env(safe-area-inset-top) + 76px)' : headerHeight } 
    : {};

  const variantClasses = {
    mobile: cn("max-w-2xl mx-auto px-5", bottomPadding),
    dashboard: cn("max-w-7xl mx-auto px-4 pb-24", bottomPadding),
    product: cn("max-w-2xl mx-auto p-0", bottomPadding),
  };

  const containerProps = {
    className: cn("w-full min-h-screen", variantClasses[variant], className),
    style: topPadding,
  };

  // Filter out any custom props that shouldn't go to the DOM
  const { withHeader, ...restProps } = props as any;

  if (withAnimation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...containerProps}
        {...restProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div {...containerProps} {...restProps}>
      {children}
    </div>
  );
};
