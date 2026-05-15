import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button, ButtonProps } from './Button';
import { useToast } from '../toast';
import { useStore } from '../../store';

interface CopyButtonProps extends Omit<ButtonProps, 'children'> {
  value: string;
  label?: string;
  successLabel?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label = 'Copy',
  successLabel = 'Copied!',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();
  const { appMode } = useStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      showToast({
        title: successLabel,
        type: 'copy',
        contentType: 'general'
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      showToast({
        title: 'Lỗi sao chép',
        variant: 'error'
      });
    }
  };

  const softVariant = appMode === 'customer' ? 'soft-customer' : 'soft-partner';

  return (
    <Button
      variant={copied ? softVariant : variant}
      size={size}
      onClick={handleCopy}
      leftIcon={copied ? <Check size={18} /> : <Copy size={18} />}
      important
      {...props}
    >
      {copied ? successLabel : label}
    </Button>
  );
};
