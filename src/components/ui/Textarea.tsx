import React from 'react';
import { cn } from '../../lib/utils';
import { LabelText, HelperText } from './Typography';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && <LabelText>{label}</LabelText>}
        <textarea
          ref={ref}
          className={cn(
            "w-full bg-surface border border-border-subtle rounded-2xl p-4 text-sm font-medium text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none shadow-sm min-h-[100px]",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          {...props}
        />
        {error ? (
          <HelperText variant="caption" color="error">{error}</HelperText>
        ) : helperText ? (
          <HelperText>{helperText}</HelperText>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
