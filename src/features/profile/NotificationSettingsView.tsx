import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  MessageSquare,
  Gift,
  Zap,
  Smartphone,
  Mail,
  ShieldAlert
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar } from '../../components/header';
import { cn } from '../../lib/utils';

export const NotificationSettingsView = () => {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    orders: true,
    promotions: true,
    chat: false,
    security: true,
    vibration: true,
    sound: false
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: 'Hoạt động & Giao dịch',
      items: [
        { id: 'orders', label: 'Cập nhật đơn hàng', description: 'Trạng thái chuẩn bị, vận chuyển & hoàn tất', icon: Zap },
        { id: 'promotions', label: 'Khuyến mãi & Ưu đãi', description: 'Mã giảm giá, sự kiện đặc biệt từ đối tác', icon: Gift },
        { id: 'chat', label: 'Tin nhắn hỗ trợ', description: 'Thông báo từ trung tâm chăm sóc khách hàng', icon: MessageSquare },
      ]
    },
    {
      title: 'Hệ thống',
      items: [
        { id: 'security', label: 'Cảnh báo bảo mật', description: 'Đăng nhập lạ, thay đổi mật khẩu đột xuất', icon: ShieldAlert },
        { id: 'vibration', label: 'Rung phản hồi', description: 'Phản hồi xúc giác khi có thông báo mới', icon: Smartphone },
        { id: 'sound', label: 'Âm thanh thông báo', description: 'Phát âm thanh riêng biệt của DexSpace', icon: Bell },
      ]
    }
  ];

  return (
    <div>
      <MobileTopBar 
        title="THÔNG BÁO" 
        onBack={() => navigate(-1)}
      />

      <div>
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
             <SectionTitle variant="h3">{section.title}</SectionTitle>
             <div>
                {section.items.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggle(item.id as any)}
                  >
                     <div>
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg",
                          settings[item.id as keyof typeof settings] ? "bg-primary text-dark" : "bg-surface text-white/20"
                        )}>
                           <item.icon size={20} />
                        </div>
                        <div>
                           <Text weight={600} color="white">{item.label}</Text>
                           <CaptionText>{item.description}</CaptionText>
                        </div>
                     </div>

                     <div className={cn(
                       "w-14 h-8 rounded-full p-1 transition-colors duration-300 relative cursor-pointer outline-none",
                       settings[item.id as keyof typeof settings] ? "bg-primary" : "bg-surface border border-border-subtle shadow-sm"
                     )}>
                        <motion.div 
                          animate={{ x: settings[item.id as keyof typeof settings] ? 24 : 0 }}
                          className={cn(
                            "w-6 h-6 rounded-full shadow-lg transition-colors",
                            settings[item.id as keyof typeof settings] ? "bg-dark" : "bg-white/20"
                          )}
                        />
                     </div>
                  </div>
                ))}
             </div>
          </div>
        ))}

        <div>
           <Heading variant="h3" color="white">Tối ưu trải nghiệm</Heading>
           <BodyText color="muted" align="center">DexSpace khuyên bạn nên bật tất cả thông báo hệ thống để đảm bảo quyền lợi và bảo mật tài khoản.</BodyText>
        </div>
      </div>
    </div>
  );
};
