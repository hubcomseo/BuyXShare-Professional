import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { getRoleColors } from '../theme/roleColors';
import confetti from 'canvas-confetti';

export const useAppMode = () => {
  const { appMode, setAppMode, setIsLoading } = useStore();
  const navigate = useNavigate();
  const colors = getRoleColors(appMode);

  const handleSetMode = (mode: 'customer' | 'partner' | 'supplier' | 'operator' | 'admin') => {
    // 1. Show Loading
    setIsLoading(true);

    // 2. Small delay to ensure UI updates before navigation
    setTimeout(() => {
      // Update store
      setAppMode(mode);
      
      // Trigger confetti if switching to partner
      if (mode === 'partner') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#ffffff']
        });
      }
      
      // Redirect without full reload
      const targetPath = mode === 'partner' ? '/app/partner/dashboard' : '/app/home';
      navigate(targetPath);
      
      // Hide loading after a bit more time to mask component mounting
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 800);
  };

  return {
    mode: appMode,
    isPartner: appMode === 'partner',
    isCustomer: appMode === 'customer',
    setMode: handleSetMode,
    colors
  };
};
