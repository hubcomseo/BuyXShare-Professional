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
  | 'code';

export type TypographyColor = 
  | 'dark'
  | 'medium'
  | 'muted'
  | 'primary'
  | 'accent'
  | 'error'
  | 'warning'
  | 'success'
  | 'white'
  | 'inherit';

export interface TextProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: 400 | 500 | 600;
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
  'h1': 'font-heading text-[24px] leading-[30px]',
  'h2': 'font-heading text-[21px] leading-[28px]',
  'h3': 'font-heading text-[18px] leading-[24px]',
  'title-sm': 'font-sans text-[16px] leading-[22px]',
  'body-lg': 'font-sans text-[15px] leading-[22px]',
  'body-md': 'font-sans text-[14px] leading-[21px]',
  'body-sm': 'font-sans text-[12.5px] leading-[18px]',
  'label': 'font-sans text-[12px] leading-[16px]',
  'caption': 'font-sans text-[11px] leading-[15px]',
  'button': 'font-sans text-[14px] leading-[20px]',
  'metric': 'font-heading text-[24px] leading-[30px]',
  'metric-sm': 'font-heading text-[20px] leading-[26px]',
  'price': 'font-heading text-[18px] leading-[24px]',
  'price-sm': 'font-heading text-[16px] leading-[22px]',
  'code': 'font-heading text-[14px] leading-[20px]',
};

const colorStyles: Record<TypographyColor, string> = {
  dark: 'text-text-primary',
  medium: 'text-text-secondary',
  muted: 'text-text-muted',
  primary: 'text-primary-light',
  accent: 'text-accent',
  error: 'text-error',
  warning: 'text-warning',
  success: 'text-success',
  white: 'text-white',
  inherit: '',
};

const weightStyles = {
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
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

export const BodyText: React.FC<TextProps & { size?: 'lg' | 'md' }> = ({ size = 'md', ...props }) => (
  <Text variant={size === 'lg' ? 'body-lg' : 'body-md'} color="medium" {...props} />
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

export const MetricText: React.FC<TextProps & { size?: 'lg' | 'sm' }> = ({ size = 'lg', ...props }) => (
  <Text variant={size === 'lg' ? 'metric' : 'metric-sm'} weight={600} color="dark" {...props} />
);

export const PriceText: React.FC<TextProps & { size?: 'md' | 'sm' }> = ({ size = 'md', ...props }) => (
  <Text 
    variant={size === 'sm' ? 'price-sm' : 'price'} 
    weight={600} 
    color="primary" 
    {...props} 
  />
);

export const CodeText: React.FC<TextProps> = (props) => (
  <Text variant="code" weight={500} color="muted" {...props} />
);
