import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Camera,
  Check,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar, HeaderActionButton } from '../../components/header';
import { Button } from '../../components/ui';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';

export const PersonalInfoView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <MobileTopBar 
        title="TÀI KHOẢN" 
        onBack={() => navigate(-1)}
        rightSlot={
          <HeaderActionButton 
            icon={isEditing ? <Check size={20} /> : <Text weight={600}>SỬA</Text>} 
            onClick={() => setIsEditing(!isEditing)} 
          />
        }
      />

      <div>
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-6 p-8">
           <div className="relative">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-surface ring-2 ring-primary/20">
                 <img 
                   src={user?.avatar || "/images/10.jpg"}
                   className="w-full h-full object-cover"
                   alt="Profile"
                 />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={24} className="text-white" />
                 </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-2xl flex items-center justify-center border-4 border-bg-base text-white shadow-lg">
                 <ShieldCheck size={20} />
              </div>
           </div>
           <div className="text-center space-y-1">
              <SectionTitle size="lg" weight={600}>{user?.name}</SectionTitle>
              <CaptionText>ID: {user?.id?.substring(0, 8)}</CaptionText>
           </div>
        </div>

        {/* Info Grid */}
        <div className="px-4 space-y-3">
           {[
             { label: 'HỌ VÀ TÊN', value: user?.name, icon: User },
             { label: 'EMAIL', value: user?.email, icon: Mail },
             { label: 'SỐ ĐIỆN THOẠI', value: user?.phone, icon: Phone },
             { label: 'NGÀY SINH', value: '12/08/1995', icon: Calendar },
           ].map((item, idx) => (
             <div key={idx} className="bg-surface rounded-3xl p-5 flex items-center gap-5 border border-border-subtle group hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                   <item.icon size={20} />
                </div>
                <div className="flex-1 space-y-1">
                   <LabelText uppercase weight={600} className="tracking-widest opacity-60">{item.label}</LabelText>
                   {isEditing ? (
                     <input 
                       className="w-full bg-surface-elevated border border-border-subtle rounded-xl px-3 py-2 outline-none focus:border-primary text-text-primary font-medium"
                       defaultValue={item.value}
                     />
                   ) : (
                     <BodyText size="lg" weight={500} color="dark">{item.value}</BodyText>
                   )}
                </div>
             </div>
           ))}
        </div>

        {isEditing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <Button fullWidth size="xl" variant="primary">
                LƯU THAY ĐỔI
             </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
