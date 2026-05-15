import React from 'react';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';
import { LabelText, HelperText } from './Typography';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
    const { appMode } = useStore();
    const focusRingColor = appMode === 'customer' ? 'focus:border-customer-primary focus:ring-customer-primary/20' : 'focus:border-partner-primary focus:ring-partner-primary/20';

    return (
      <div className="space-y-1.5 w-full">
        {label && <LabelText className="text-xs ml-1 opacity-70">{label}</LabelText>}
        <div className="relative group">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted transition-colors group-focus-within:text-primary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-11 bg-white border border-[#E2E8F0] rounded-[14px] px-4 text-sm font-medium text-text-primary placeholder:text-text-disabled transition-all outline-none shadow-[0_2px_4px_rgba(0,0,0,0.02)]",
              focusRingColor,
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              error && "border-error focus:border-error focus:ring-error/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <HelperText variant="caption" color="error">{error}</HelperText>
        ) : helperText ? (
          <HelperText>{helperText}</HelperText>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
