import React from 'react';

/**
 * BuyXShare Typography System
 * Standardized tokens and components to ensure visual consistency.
 */

export type TypographyVariant = 
  | 'h1'
  | 'h2'
  | 'h3'
  | 'title-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label'
  | 'caption'
  | 'button'
  | 'metric'
  | 'metric-sm'
  | 'price'
  | 'price-sm'
  | 'code'
  | 'eyebrow'
  | 'section-accent'
  | 'promo-title';

export type TypographyColor = 
  | 'dark'
  | 'medium'
  | 'muted'
  | 'disabled'
  | 'primary'
  | 'customer'
  | 'partner'
  | 'buy'
  | 'sale'
  | 'reward'
  | 'error'
  | 'warning'
  | 'success'
  | 'white'
  | 'inherit';

export interface TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  level?: number;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  numberOfLines?: number;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  uppercase?: boolean;
  italic?: boolean;
}

const variantStyles: Record<TypographyVariant, string> = {
  'h1': 'font-heading text-[23px] leading-[29px]',
  'h2': 'font-heading text-[20px] leading-[26px]',
  'h3': 'font-heading text-[17px] leading-[23px]',

  'title-sm': 'font-sans text-[15px] leading-[20px]',
  'body-lg': 'font-sans text-[14.5px] leading-[21px]',
  'body-md': 'font-sans text-[13.5px] leading-[20px]',
  'body-sm': 'font-sans text-[12px] leading-[17px]',

  'label': 'font-sans text-[11.5px] leading-[15px]',
  'caption': 'font-sans text-[10.5px] leading-[14px]',

  'button': 'font-sans text-[13.5px] leading-[19px]',

  'metric': 'font-heading text-[23px] leading-[29px] font-black italic tracking-tighter',
  'metric-sm': 'font-heading text-[19px] leading-[25px] font-black italic tracking-tighter',

  'price': 'font-heading text-[18px] leading-[22px] font-black italic tracking-tighter',
  'price-sm': 'font-heading text-[15px] leading-[20px] font-black italic tracking-tighter',
  'price-xs': 'font-heading text-[13px] leading-[18px] font-black italic tracking-tighter',

  'code': 'font-heading text-[13px] leading-[18px]',

  'eyebrow': 'font-heading text-[11px] leading-[14px] uppercase italic tracking-[0.08em]',
  'section-accent': 'font-heading text-[15px] leading-[20px] uppercase italic tracking-[0.04em]',
  'promo-title': 'font-heading text-[18px] leading-[23px] uppercase italic tracking-[0.03em]',
};

const colorStyles: Record<TypographyColor, string> = {
  dark: 'text-text-primary',
  medium: 'text-text-secondary',
  muted: 'text-text-muted',
  disabled: 'text-text-disabled',
  primary: 'text-customer-primary',
  customer: 'text-customer-text',
  partner: 'text-partner-text',
  buy: 'text-buy-primary',
  sale: 'text-sale-text',
  reward: 'text-reward-text',
  error: 'text-error',
  warning: 'text-warning',
  success: 'text-success',
  white: 'text-text-inverse',
  inherit: '',
};

const weightStyles = {
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold',
  800: 'font-extrabold',
  900: 'font-black',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body-md',
  color = 'inherit',
  weight,
  align = 'left',
  truncate = false,
  numberOfLines,
  className = '',
  children,
  as: Component = 'p',
  uppercase = false,
  italic = false,
}) => {
  const styles = [
    variantStyles[variant],
    color !== 'inherit' ? colorStyles[color] : '',
    weight ? weightStyles[weight] : '',
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : '',
    truncate ? 'truncate' : '',
    uppercase ? 'uppercase' : '',
    italic ? 'italic' : '',
    className,
  ].filter(Boolean).join(' ');

  const inlineStyle: React.CSSProperties = numberOfLines ? {
    display: '-webkit-box',
    WebkitLineClamp: numberOfLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } : {};

  return (
    <Component className={styles} style={inlineStyle}>
      {children}
    </Component>
  );
};

// Specialized Components
export const ScreenTitle: React.FC<TextProps> = (props) => (
  <Text as="h1" variant="h1" weight={600} color="dark" {...props} />
);

export const SectionTitle: React.FC<TextProps & { size?: 'lg' | 'md' | 'sm' }> = ({ size = 'lg', ...props }) => {
  const variant = size === 'lg' ? 'h2' : size === 'md' ? 'h3' : 'title-sm';
  return <Text as="h2" variant={variant} weight={600} color="dark" {...props} />;
};

export const CardTitle: React.FC<TextProps & { size?: 'md' | 'sm' }> = ({ size = 'md', ...props }) => {
  const variant = size === 'md' ? 'h3' : 'title-sm';
  return <Text as="h3" variant={variant} weight={600} color="dark" {...props} />;
};

export const Heading: React.FC<TextProps> = (props) => (
  <Text as="h2" variant="h2" weight={600} uppercase {...props} />
);

export const BodyText: React.FC<TextProps & { size?: 'lg' | 'md' | 'sm' }> = ({ size = 'md', ...props }) => (
  <Text variant={size === 'lg' ? 'body-lg' : size === 'md' ? 'body-md' : 'body-sm'} color="medium" {...props} />
);

export const HelperText: React.FC<TextProps> = (props) => (
  <Text variant="body-sm" color="muted" {...props} />
);

export const LabelText: React.FC<TextProps> = (props) => (
  <Text variant="label" weight={500} color="muted" {...props} />
);

export const CaptionText: React.FC<TextProps> = (props) => (
  <Text variant="caption" weight={400} color="muted" {...props} />
);

export const MetricText: React.FC<TextProps & { size?: 'lg' | 'md' | 'sm' }> = ({ size = 'lg', ...props }) => {
  const variant = size === 'lg' ? 'metric' : size === 'md' ? 'metric-sm' : 'metric-sm'; // Use metric-sm for both md and sm for now
  return <Text variant={variant} weight={600} color="dark" {...props} />;
};

export const PriceText: React.FC<TextProps & { size?: 'lg' | 'md' | 'sm' | 'xs' }> = ({ size = 'md', ...props }) => (
  <Text 
    variant={size === 'lg' ? 'price' : size === 'md' ? 'price' : size === 'sm' ? 'price-sm' : 'price-xs'} 
    color="primary" 
    {...props} 
  />
);

export const CodeText: React.FC<TextProps> = (props) => (
  <Text variant="code" weight={500} color="muted" {...props} />
);

export const Eyebrow: React.FC<TextProps> = (props) => (
  <Text variant="eyebrow" weight={500} color="muted" {...props} />
);

export const SectionAccent: React.FC<TextProps> = (props) => (
  <Text variant="section-accent" weight={500} color="dark" {...props} />
);

export const PromoTitle: React.FC<TextProps> = (props) => (
  <Text variant="promo-title" weight={600} color="dark" {...props} />
);
