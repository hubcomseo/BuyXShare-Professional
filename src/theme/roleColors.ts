export type AppMode = 'customer' | 'partner' | 'supplier' | 'operator' | 'admin';

export const customerRoleColors = {
  primary: 'var(--color-customer-primary)',
  strong: 'var(--color-customer-strong)',
  soft: 'var(--color-customer-soft)',
  subtle: 'var(--color-customer-subtle)',
  badgeText: 'var(--color-customer-badge-text)',
  
  // Tailwind class version
  primaryText: 'text-customer-primary',
  primaryBg: 'bg-customer-primary',
  strongText: 'text-customer-strong',
  strongBg: 'bg-customer-strong',
  softBg: 'bg-customer-soft',
  subtleBg: 'bg-customer-subtle',
  badgeBg: 'bg-customer-primary/14',
  badgeTextClass: 'text-customer-badge-text',
  badgeBorder: 'border-customer-primary/20',
};

export const partnerRoleColors = {
  primary: 'var(--color-partner-primary)',
  strong: 'var(--color-partner-strong)',
  soft: 'var(--color-partner-soft)',
  subtle: 'var(--color-partner-subtle)',
  badgeText: 'var(--color-partner-badge-text)',
  
  // Tailwind class version
  primaryText: 'text-partner-primary',
  primaryBg: 'bg-partner-primary',
  strongText: 'text-partner-strong',
  strongBg: 'bg-partner-strong',
  softBg: 'bg-partner-soft',
  subtleBg: 'bg-partner-subtle',
  badgeBg: 'bg-partner-primary/14',
  badgeTextClass: 'text-partner-badge-text',
  badgeBorder: 'border-partner-primary/20',
};

export const supplierRoleColors = {
  primary: 'var(--color-primary)',
  strong: 'var(--color-primary-strong)',
  soft: 'var(--color-primary-soft)',
  subtle: 'var(--color-primary-subtle)',
  badgeText: 'var(--color-primary)',
  
  primaryText: 'text-primary',
  primaryBg: 'bg-primary',
  strongText: 'text-primary-strong',
  strongBg: 'bg-primary-strong',
  softBg: 'bg-primary-soft',
  subtleBg: 'bg-primary-subtle',
  badgeBg: 'bg-primary/14',
  badgeTextClass: 'text-primary',
  badgeBorder: 'border-primary/20',
};

export const operatorRoleColors = {
  primary: 'var(--color-accent)',
  strong: 'var(--color-accent-strong)',
  soft: 'var(--color-accent-soft)',
  subtle: 'var(--color-accent-subtle)',
  badgeText: 'var(--color-accent)',
  
  primaryText: 'text-accent',
  primaryBg: 'bg-accent',
  strongText: 'text-accent-strong',
  strongBg: 'bg-accent-strong',
  softBg: 'bg-accent-soft',
  subtleBg: 'bg-accent-subtle',
  badgeBg: 'bg-accent/14',
  badgeTextClass: 'text-accent',
  badgeBorder: 'border-accent/20',
};

export const getRoleColors = (mode: AppMode) => {
  if (mode === 'partner') return partnerRoleColors;
  if (mode === 'supplier') return supplierRoleColors;
  if (mode === 'operator') return operatorRoleColors;
  return customerRoleColors;
};

