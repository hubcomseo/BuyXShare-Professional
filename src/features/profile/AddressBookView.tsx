import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Plus, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Check,
  Star,
  Map,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Text, Heading, CaptionText } from '../../components/ui/Typography';
import { MobileTopBar, HeaderActionButton } from '../../components/header';
import { Button, IconButton, Input, Textarea } from '../../components/ui';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/toast';

export const AddressBookView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const { showToast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    recipientName: '',
    phone: '',
    fullAddress: '',
    isDefault: false
  });

  const handleSaveAddress = () => {
    // Add real save logic here if needed
    setShowAddForm(false);
    showToast({
      title: 'Lưu địa chỉ thành công',
      variant: 'success'
    });
  };
  
  return (
    <div className="min-h-screen bg-bg-base flex flex-col pt-safe-top pb-safe-bottom">
      <MobileTopBar 
        title="SỔ ĐỊA CHỈ" 
        showBack={true}
        onBack={() => navigate(-1)}
        rightSlot={<HeaderActionButton icon={<Plus size={20} />} label="Action" onClick={() => setShowAddForm(true)} />}
      />

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-24 space-y-8">
        <div className="flex items-center gap-4 bg-surface border border-border-subtle rounded-3xl p-5 shadow-sm">
           <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <MapPin size={24} />
           </div>
           <div>
              <Text variant="label" weight={600} className="tracking-widest uppercase text-[11px] text-primary mb-1">Quản lý giao nhận</Text>
              <Heading variant="h3" className="text-xl font-black text-text-primary mb-0.5 tracking-tight">Vị trí giao hàng</Heading>
              <CaptionText className="text-[11px] font-medium text-text-muted">Có thể lưu tối đa 5 địa chỉ</CaptionText>
           </div>
        </div>

        <div className="space-y-4">
           {user?.addresses?.map((addr, idx) => (
             <motion.div 
               key={addr.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className={cn(
                 "bg-surface rounded-3xl p-5 border relative overflow-hidden group transition-all duration-300 flex flex-col gap-5",
                 addr.isDefault ? "border-primary/40 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.15)] bg-gradient-to-br from-primary/5 to-transparent" : "border-border-subtle shadow-sm hover:border-text-muted/30 hover:shadow-md"
               )}
             >
                {addr.isDefault && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
                )}
                
                <div className="flex justify-between items-start relative z-10">
                   <div className="flex gap-4 items-center">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-bg-base border shadow-sm",
                        addr.isDefault ? "text-primary border-primary/30" : "text-text-muted border-border-subtle"
                      )}>
                         <Map size={20} />
                      </div>
                      <div className="space-y-0.5">
                         <div className="flex items-center gap-2">
                           <Text variant="body-md" weight={600} className="text-[15px] text-text-primary tracking-wide">{addr.recipientName}</Text>
                           {addr.isDefault && <Badge className="border-0 rounded border-primary/20 bg-primary/10 py-0 px-1.5 text-[9px] font-black tracking-widest uppercase text-primary shadow-none">Mặc định</Badge>}
                         </div>
                         <Text variant="label" weight={600} className="text-[13px] text-text-secondary font-mono tracking-tight">{addr.phone}</Text>
                      </div>
                   </div>
                </div>

                <div className="relative z-10 w-full h-px bg-border-subtle/50" />

                <div className="relative z-10 flex gap-4 items-start">
                   <div className="pt-1 flex-shrink-0">
                     <Navigation size={16} className={addr.isDefault ? "text-primary" : "text-text-muted/60"} />
                   </div>
                   <Text variant="body-sm" color="medium" className="leading-snug font-medium">
                     {addr.fullAddress}
                   </Text>
                </div>

                <div className="relative z-10 flex justify-end gap-2 mt-1">
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<Edit3 size={14} />}
                    className="h-9 px-4 bg-surface-elevated border border-border-subtle hover:bg-bg-base hover:text-text-primary text-text-secondary font-semibold text-[11px] tracking-wide uppercase rounded-xl whitespace-nowrap"
                    onClick={() => {/* Edit logic */}}
                   >
                      Sửa
                   </Button>
                   {!addr.isDefault && (
                     <Button 
                      variant="ghost" 
                      size="sm" 
                      leftIcon={<Trash2 size={14} />}
                      className="h-9 px-4 bg-surface-elevated border border-border-subtle hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 text-text-secondary font-semibold text-[11px] tracking-wide uppercase rounded-xl transition-colors whitespace-nowrap"
                      onClick={() => {/* Delete logic */}}
                     >
                        Xóa
                     </Button>
                   )}
                </div>
             </motion.div>
           ))}
        </div>

        <Button 
          variant="secondary" 
          fullWidth 
          size="md" 
          onClick={() => setShowAddForm(true)}
          className="h-14 rounded-2xl border-dashed border-2 bg-surface hover:bg-surface-elevated border-border-subtle hover:border-text-muted text-text-secondary transition-all"
          leftIcon={<Plus size={20} />}
        >
           <span className="font-bold tracking-wide">THÊM ĐỊA CHỈ MỚI</span>
        </Button>
      </div>

      <div className="p-4 sm:p-6 bg-surface border-t border-border-subtle z-10 relative shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.2)]">
         <Button 
           fullWidth 
           size="lg" 
           variant="primary"
           onClick={() => navigate(-1)}
         >
           HOÀN TẤT
         </Button>
      </div>

      {/* Add Address Sheet */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 md:p-6 pb-safe-bottom">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
               onClick={() => setShowAddForm(false)}
             />
             <motion.div 
               initial={{ y: "100%", opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: "100%", opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="relative z-10 w-full max-w-md bg-surface border border-t-border-subtle md:border-border-subtle rounded-t-[2rem] md:rounded-[2rem] flex flex-col max-h-[90vh] shadow-2xl"
             >
                {/* Drag handle */}
                <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
                  <div className="w-12 h-1.5 bg-border-subtle rounded-full" />
                </div>

                {/* Header */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-border-subtle/50">
                   <div>
                      <Text variant="label" weight={600} className="tracking-[0.2em] text-[10px] uppercase text-text-muted mb-1">Giao nhận</Text>
                      <Heading variant="h3" className="text-xl sm:text-2xl font-black">THÊM ĐỊA CHỈ MỚI</Heading>
                   </div>
                   <IconButton icon={<Plus size={24} className="rotate-45" />} label="Action" onClick={() => setShowAddForm(false)} variant="ghost" className="w-10 h-10 bg-surface-elevated rounded-full border border-border-subtle hover:bg-border-subtle" />
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                   <div className="space-y-4">
                     <Input 
                       label="Họ và tên người nhận (*)"
                       type="text" 
                       placeholder="VD: NGUYỄN VĂN A"
                       value={newAddress.recipientName}
                       onChange={(e) => setNewAddress({...newAddress, recipientName: e.target.value})}
                     />
                     <Input 
                       label="Số điện thoại (*)"
                       type="tel" 
                       placeholder="09xx xxx xxx"
                       value={newAddress.phone}
                       onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                     />
                   </div>

                   <Textarea 
                     label="Địa chỉ chi tiết (*)"
                     rows={3}
                     placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện..."
                     value={newAddress.fullAddress}
                     onChange={(e) => setNewAddress({...newAddress, fullAddress: e.target.value})}
                   />
                   
                   <div
                     onClick={() => setNewAddress({...newAddress, isDefault: !newAddress.isDefault})}
                     className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border-subtle bg-surface-elevated/50 cursor-pointer hover:border-primary/50 transition-colors group"
                   >
                      <div className={cn("w-6 h-6 rounded border-2 flex items-center justify-center transition-all", newAddress.isDefault ? "bg-primary border-primary text-text-primary" : "border-text-muted/50 group-hover:border-primary/30 bg-surface")}>
                         {newAddress.isDefault && <Check size={14} className="text-bg-base" strokeWidth={3} />}
                      </div>
                      <Text weight={600} className="text-sm tracking-wide text-text-primary group-hover:text-primary transition-colors">Đặt làm địa chỉ mặc định</Text>
                   </div>
                </div>

                <div className="p-6 border-t border-border-subtle/50 bg-bg-base/50 rounded-b-[2rem] flex gap-3">
                   <Button variant="secondary" className="flex-1" onClick={() => setShowAddForm(false)}>HỦY</Button>
                   <Button variant="primary" className="flex-1" onClick={handleSaveAddress}>LƯU ĐỊA CHỈ</Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
