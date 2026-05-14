import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Toast, ToastProps } from './Toast';
import { SuccessToast } from './SuccessToast';
import { ErrorToast } from './ErrorToast';
import { CopySuccessToast } from './CopySuccessToast';

type ToastOptions = Omit<ToastProps, 'id' | 'onClose'> & {
  type?: 'default' | 'success' | 'error' | 'copy';
  duration?: number;
  contentType?: 'link' | 'account' | 'content' | 'general';
};

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...options, id }]);

    const duration = options.duration || 3000;
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const renderToast = (toast: ToastOptions & { id: string }) => {
    switch (toast.type) {
      case 'success':
        return <SuccessToast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />;
      case 'error':
        return <ErrorToast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />;
      case 'copy':
        return <CopySuccessToast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} contentType={toast.contentType} />;
      default:
        return <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <div className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 pointer-events-none px-4">
          {toasts.map(renderToast)}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};
