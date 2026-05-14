import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const hasBg = className.includes('bg-');
  return (
    <div 
      onClick={onClick}
      className={`${!hasBg ? 'bg-surface' : ''} rounded-xl border border-border-subtle shadow-sm ${className}`}
    >
      {children}
    </div>
  );
};
