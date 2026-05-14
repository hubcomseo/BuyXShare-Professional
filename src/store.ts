import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from './types/user';

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  appMode: 'customer' | 'partner' | 'supplier' | 'operator' | 'admin';
  setAppMode: (mode: 'customer' | 'partner' | 'supplier' | 'operator' | 'admin') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: { 
        id: "u1", 
        role: "customer" as const, 
        name: "Lê Hoàng An", 
        email: "an@example.com",
        phone: "0901234567",
        status: "active",
        createdAt: new Date().toISOString(),
        addresses: [
          {
            id: 'addr1',
            recipientName: 'Lê Hoàng An',
            phone: '0901234567',
            fullAddress: '123 Đường Song Hành, Phường An Phú, Quận 2, TP. Hồ Chí Minh',
            isDefault: true
          },
          {
            id: 'addr2',
            recipientName: 'Hoàng An (Văn phòng)',
            phone: '0907654321',
            fullAddress: 'Tòa nhà Landmark 81, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
            isDefault: false
          }
        ]
      }, // Default mock
      setUser: (user) => set({ user }),
      appMode: 'customer',
      setAppMode: (mode) => set({ appMode: mode }),
      isLoading: false,
      setIsLoading: (loading) => set({ isLoading: loading }),
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'buyxshare-storage',
      partialize: (state) => ({ 
        appMode: state.appMode,
        language: state.language 
      }),
    }
  )
);
