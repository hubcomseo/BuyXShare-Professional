import React from 'react';
import { Toast, ToastProps } from './Toast';

export const SuccessToast: React.FC<Omit<ToastProps, 'variant'>> = (props) => {
  return <Toast variant="success" {...props} />;
};
