import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  EyeOff, 
  FileText, 
  ChevronRight,
  Server,
  KeyRound
} from 'lucide-react';
import { motion } from 'motion/react';
import { Text, Heading, ScreenTitle, SectionTitle, BodyText, LabelText, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar } from '../../components/header';
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui';

export const PrivacyView = () => {
  const navigate = useNavigate();

  const items = [
    { title: 'Quản lý quyền dữ liệu', icon: EyeOff, description: 'Kiểm soát những gì hệ thống thu thập' },
    { title: 'Chế độ ẩn danh', icon: Lock, description: 'Duyệt app không lưu lịch sử tìm kiếm' },
    { title: 'Điều khoản dịch vụ', icon: FileText, description: 'Cập nhật ngày 15/04/2024' },
    { title: 'Chính sách bảo mật', icon: Shield, description: 'Cách chúng tôi bảo vệ thông tin bạn' },
    { title: 'Xác thực hai lớp', icon: KeyRound, description: 'Tăng cường bảo mật đăng nhập' },
  ];

  return (
    <div>
      <MobileTopBar 
        title="QUYỀN RIÊNG TƯ" 
        onBack={() => navigate(-1)}
      />

      <div>
        <div>
           <div>
              <div></div>
              <Shield size={48} />
           </div>
           <div>
              <Heading variant="h2" weight={600}>PHÁO ĐÀI DỮ LIỆU</Heading>
              <BodyText color="muted" align="center">Dữ liệu của bạn được mã hóa đầu cuối (E2EE) và không bao giờ được chia sẻ cho bên thứ ba.</BodyText>
           </div>
        </div>

        <div>
           {items.map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.05 }}
             >
                <div>
                   <div>
                      <item.icon size={20} />
                   </div>
                   <div>
                      <Text weight={600} color="white">{item.title}</Text>
                      <CaptionText>{item.description}</CaptionText>
                   </div>
                </div>
                <ChevronRight size={18} />
             </motion.div>
           ))}
        </div>

        <div>
           <SectionTitle variant="h3">Tài khoản</SectionTitle>
           <Button 
             variant="ghost" 
             fullWidth
           >
              Yêu cầu xóa tài khoản
           </Button>
           <CaptionText align="center">
              Khi xóa tài khoản, tất cả lịch sử đơn hàng, điểm thưởng và phần thưởng của bạn sẽ biến mất vĩnh viễn và không thể khôi phục.
           </CaptionText>
        </div>
      </div>
    </div>
  );
};
