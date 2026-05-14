import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import { MainLayout } from './app/layout/MainLayout';
import { AppRouter } from './app/routes/Router';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { ToastProvider, useToast } from './components/toast';
import { useEffect } from 'react';
import { useTranslation } from './lib/i18n';

import { ErrorBoundary } from './app/utils/ErrorBoundary';

// Wrapper to use the hook inside Provider
const GlobalErrorWatcher = () => {
  const { showToast } = useToast();
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
       showToast({
         title: t('error_network_title'),
         message: t('error_network_message'),
         variant: 'error'
       });
    };
    window.addEventListener('unhandledrejection', handleRejection);
    return () => window.removeEventListener('unhandledrejection', handleRejection);
  }, [showToast, t]);
  
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <GlobalErrorWatcher />
        <ErrorBoundary>
          <Router>
            <LoadingOverlay />
            <ScrollToTop />
            <MainLayout>
              <AppRouter />
            </MainLayout>
          </Router>
        </ErrorBoundary>
      </ToastProvider>
    </QueryClientProvider>
  );
}

