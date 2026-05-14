import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonProps } from './Button';
import { cn } from '../../lib/utils';

interface LinkButtonProps extends ButtonProps {
  to: string;
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  className,
  ...props
}) => {
  return (
    // @ts-ignore
    <Button
      as={Link}
      to={to}
      className={className}
      {...props}
    />
  );
};
