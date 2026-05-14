import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonGroupProps {
  children: React.ReactNode;
  vertical?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  vertical = false,
  fullWidth = false,
  className = '',
}) => {
  return (
    <div className={cn(
      'inline-flex overflow-hidden rounded-[12px] border border-border-subtle',
      vertical ? 'flex-col' : 'flex-row',
      fullWidth ? 'w-full' : '',
      className
    )}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const isLast = index === React.Children.count(children) - 1;

        return React.cloneElement(child, {
          // @ts-ignore
          className: cn(
            (child.props as any).className,
            'rounded-none border-none shadow-none',
            fullWidth && 'flex-1',
            !vertical && !isLast && 'border-r border-border-subtle',
            vertical && !isLast && 'border-b border-border-subtle'
          )
        });
      })}
    </div>
  );
};
