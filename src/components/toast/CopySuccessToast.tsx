import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Toast, ToastProps } from './Toast';
import { AppIcon } from '../icon';

export interface CopySuccessToastProps extends Omit<ToastProps, 'variant' | 'icon'> {
  contentType?: 'link' | 'account' | 'content' | 'general';
}

export const CopySuccessToast: React.FC<CopySuccessToastProps> = ({ 
  contentType = 'general', 
  title, 
  ...props 
}) => {
  const getDefaultTitle = () => {
    switch (contentType) {
      case 'link': return 'Đã sao chép link liên kết';
      case 'account': return 'Đã sao chép số tài khoản';
      case 'content': return 'Đã sao chép nội dung chuyển khoản';
      default: return 'Đã sao chép thành công';
    }
  };

  return (
    <Toast 
      variant="success" 
      title={title || getDefaultTitle()} 
      icon={<AppIcon icon={CheckCircle2} size="md" color="success" />}
      {...props} 
    />
  );
};
