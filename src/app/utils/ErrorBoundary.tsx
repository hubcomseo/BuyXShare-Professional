import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '../../components/ui';
import { Text } from '../../components/ui/Typography';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/app/home';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-6 text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-full max-w-sm flex flex-col items-center space-y-6"
           >
              <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center">
                 <AlertTriangle size={36} />
              </div>
              <div>
                 <Text variant="h3" weight={600} color="dark" className="mb-2">Đã xảy ra lỗi</Text>
                 <Text variant="body-md" className="text-text-muted">Không thể tải trang này. Có thể do lỗi mạng hoặc thay đổi dữ liệu.</Text>
              </div>
              <Button onClick={this.handleReset} fullWidth size="md" className="gap-2" variant="primary">
                 <RefreshCcw size={20} />
                 Quay về trang chủ
              </Button>
           </motion.div>
        </div>
      );
    }
    return this.props.children;
  }
}
