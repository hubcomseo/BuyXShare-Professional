import React, { useState } from 'react';
import { MapPin, Phone, User as UserIcon, Plus, Check, Edit2, ChevronRight } from 'lucide-react';
import { Address } from '../../../types/user';
import { Card } from '../../../components/ui/Card';
import { Text, CaptionText } from '../../../components/ui/Typography';
import { Button, IconButton } from '../../../components/ui';
import { Badge } from '../../../components/ui/Badge';

interface AddressSelectionProps {
  addresses: Address[];
  selectedId?: string;
  onSelect: (address: Address) => void;
  onAddNew: () => void;
  onEdit: (address: Address) => void;
}

export const AddressSelection: React.FC<AddressSelectionProps> = ({
  addresses,
  selectedId,
  onSelect,
  onAddNew,
  onEdit
}) => {
  if (addresses.length === 0) {
    return (
      <Card className="p-8 border-dashed border-2 flex flex-col items-center justify-center gap-4 text-center group cursor-pointer hover:border-primary/50 transition-colors" onClick={onAddNew}>
        <div className="w-12 h-12 bg-surface-soft rounded-2xl flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
          <MapPin size={24} />
        </div>
        <div className="space-y-1">
          <Text weight={600}>Chưa có địa chỉ giao hàng</Text>
          <CaptionText>Vui lòng thêm địa chỉ để tiếp tục thanh toán</CaptionText>
        </div>
        <Button variant="soft-customer" size="sm" leftIcon={<Plus size={16} />}>
          Thêm địa chỉ mới
        </Button>
      </Card>
    );
  }

  const selectedAddress = addresses.find(a => a.id === selectedId) || addresses.find(a => a.isDefault) || addresses[0];

  return (
    <div className="space-y-4">
      <div className="flex justify-end px-1 -mt-9 relative z-10">
        <Button 
          variant="outline"
          size="sm"
          onClick={onAddNew}
          leftIcon={<Plus size={14} />}
          className="h-auto py-1.5 px-3 text-[11px] font-bold bg-surface"
        >
          Thêm mới
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((addr) => {
          const isSelected = addr.id === selectedId;
          return (
            <Card 
              key={addr.id}
              onClick={() => onSelect(addr)}
              className={`p-4 transition-all duration-200 cursor-pointer border-2 ${
                isSelected 
                  ? 'border-primary shadow-lg shadow-primary/5 bg-primary/5' 
                  : 'border-border-subtle hover:border-text-muted/30 bg-surface'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-primary bg-primary' : 'border-border-strong bg-surface'
                }`}>
                  {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Text weight={600} className="truncate">{addr.recipientName}</Text>
                    {addr.isDefault && (
                      <Badge variant="success" size="xs">Mặc định</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-text-secondary mb-1">
                    <Phone size={12} className="text-text-muted" />
                    <CaptionText weight={600} color="medium">{addr.phone}</CaptionText>
                  </div>
                  
                  <div className="flex items-start gap-1.5 text-text-muted translate-y-[1px]">
                    <MapPin size={12} className="shrink-0 mt-0.5" />
                    <CaptionText className="leading-normal">{addr.fullAddress}</CaptionText>
                  </div>
                </div>

                <IconButton
                  icon={<Edit2 size={16} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(addr);
                  }}
                  variant="ghost"
                  size="sm"
                  label="Edit address"
                  className="p-2 -mr-2 text-text-muted hover:text-primary-light transition-colors"
                />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
