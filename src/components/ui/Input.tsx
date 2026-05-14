import React from 'react';
import { cn } from '../../lib/utils';
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
    return (
      <div className="space-y-2 w-full">
        {label && <LabelText>{label}</LabelText>}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full bg-surface border border-border-subtle rounded-2xl p-4 text-sm font-medium text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none",
              leftIcon && "pl-12",
              rightIcon && "pr-12",
              error && "border-error focus:border-error focus:ring-error/20",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted">
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
