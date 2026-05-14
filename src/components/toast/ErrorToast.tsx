import React from 'react';
import { Toast, ToastProps } from './Toast';

export const ErrorToast: React.FC<Omit<ToastProps, 'variant'>> = (props) => {
  return <Toast variant="error" {...props} />;
};
