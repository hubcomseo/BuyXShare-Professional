export type UserRole = 'customer' | 'partner' | 'supplier' | 'operator' | 'admin';

export interface Address {
  id: string;
  recipientName: string;
  phone: string;
  fullAddress: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
  avatar?: string;
  partnerType?: 'registered' | 'public';
  addresses?: Address[];
}
