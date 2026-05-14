import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Share2, 
  Copy, 
  Send, 
  Facebook, 
  MessageSquare,
  Users,
  Award,
  Smartphone,
  Check,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar } from '../../components/header';
import { Button, CopyButton, IconButton } from '../../components/ui';
import { cn } from '../../lib/utils';
import { useStore } from '../../store';

export const ShareAppView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [copied, setCopied] = useState(false);
  
  const referralCode = user?.id?.substring(0, 8).toUpperCase() || 'DEXSPACE';
  const referralLink = `https://dexspace.vn/join/${referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <MobileTopBar 
        title="CHIA SẺ ỨNG DỤNG" 
        onBack={() => navigate(-1)}
      />

      <div>
        <div>
           <div>
              <div></div>
              <div>
                 <QrCode size={48} />
              </div>
           </div>
           <div>
              <Heading variant="h1">LAN TỎA GIÁ TRỊ</Heading>
              <BodyText color="muted" align="center">Mời bạn bè tham gia DexSpace và nhận ngay 100 điểm thưởng khi họ thực hiện đơn hàng đầu tiên.</BodyText>
           </div>
        </div>

        {/* Share Card */}
        <div>
           <div>
              <div>
                 <Text variant="caption" weight={600}>Your Referral Link</Text>
              </div>
              <CopyButton
                value={referralLink}
                label={referralLink}
                variant="secondary"
                size="xl"
              />
           </div>

           <div>
              {[
                { icon: Facebook, label: 'Facebook', color: 'bg-blue-600' },
                { icon: Send, label: 'Telegram', color: 'bg-blue-400' },
                { icon: MessageSquare, label: 'SMS', color: 'bg-emerald-500' },
                { icon: Smartphone, label: 'Zalo', color: 'bg-blue-500' }
              ].map((item, i) => (
                <div key={i}>
                   <IconButton 
                     icon={<item.icon size={24} />}
                     variant="secondary"
                     size="icon-lg"
                     label={item.label}
                     className={cn("w-14 h-14 rounded-2xl text-white shadow-xl hover:-translate-y-1", item.color)}
                   />
                   <Text variant="caption" weight={600}>{item.label}</Text>
                </div>
              ))}
           </div>
        </div>

        {/* Rewards Summary */}
        <div>
           {[
             { label: 'BẠN BÈ ĐÃ MỜI', value: '12', icon: Users, color: 'text-primary' },
             { label: 'THƯỞNG CHỜ DUYỆT', value: '1.200k', icon: Award, color: 'text-accent' },
           ].map((stat, i) => (
             <div key={i}>
                <div className={cn("w-10 h-10 rounded-xl bg-surface flex items-center justify-center", stat.color)}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <Text variant="caption" weight={600}>{stat.label}</Text>
                   <Text variant="h3" weight={600} color="white">{stat.value}</Text>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
