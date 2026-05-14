import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Globe, 
  Facebook, 
  Instagram, 
  Send,
  MapPin,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar } from '../../components/header';
import { Button, IconButton } from '../../components/ui';
import { cn } from '../../lib/utils';

export const ContactView = () => {
  const navigate = useNavigate();

  const channels = [
    { label: 'Hotline 24/7', value: '1900 8899', icon: Phone, color: 'bg-emerald-500' },
    { label: 'Email Support', value: 'support@dexspace.vn', icon: Mail, color: 'bg-primary' },
    { label: 'Telegram Hub', value: '@dexspace_official', icon: Send, color: 'bg-blue-500' },
  ];

  return (
    <div>
      <MobileTopBar 
        title="LIÊN HỆ" 
        onBack={() => navigate(-1)}
      />

      <div>
        <div>
           <Heading variant="h1">KẾT NỐI VỚI CHÚNG TÔI</Heading>
           <BodyText color="muted" align="center">Mọi phản hồi của bạn đều là động lực để DexSpace cải thiện dịch vụ.</BodyText>
        </div>

        {/* Contact Channels */}
        <div>
           {channels.map((channel, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.1 }}
             >
                <div>
                   <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-dark shadow-xl group-hover:scale-110 transition-transform", channel.color)}>
                      <channel.icon size={24} />
                   </div>
                   <div>
                      <Text variant="caption" weight={600}>{channel.label}</Text>
                      <Text weight={600} color="white">{channel.value}</Text>
                   </div>
                </div>
                <IconButton icon={<Globe size={18} />} label="Action" variant="ghost" />
             </motion.div>
           ))}
        </div>

        {/* Social & Office */}
        <div>
           <div>
              <SectionTitle variant="h3">Văn phòng</SectionTitle>
              <div>
                 <div>
                    <MapPin size={20} />
                    <BodyText color="white">
                       Tòa nhà Landmark 81, Quận Bình Thạnh, TP. Hồ Chí Minh, Việt Nam
                    </BodyText>
                 </div>
                 <div>
                    <Clock size={20} />
                    <BodyText color="white">
                       Thứ 2 - Thứ 7 | 08:00 - 18:00
                    </BodyText>
                 </div>
              </div>
           </div>

           <div>
              <SectionTitle variant="h3">Theo dõi</SectionTitle>
              <div>
                 {[
                   { icon: Facebook, label: 'Facebook' },
                   { icon: Instagram, label: 'Instagram' },
                   { icon: Send, label: 'Telegram' },
                   { icon: Globe, label: 'Website' }
                 ].map((item, i) => (
                   <IconButton 
                     key={i} 
                     icon={<item.icon size={24} />} 
                     variant="secondary"
                     size="icon-lg"
                     label={item.label}
                   />
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
