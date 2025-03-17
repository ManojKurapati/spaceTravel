import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface HolographicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export const HolographicButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  ...props
}: HolographicButtonProps) => {
  const baseClasses = "relative overflow-hidden font-orbitron font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-cosmic-purple to-neon-cyan text-white shadow-neon hover:scale-105 active:scale-95",
    secondary: "bg-space-black border border-neon-cyan text-neon-cyan hover:shadow-neon-glow hover:scale-105 active:scale-95",
    outline: "bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 hover:scale-105 active:scale-95"
  };
  
  const sizeClasses = {
    sm: "text-xs px-4 py-1",
    md: "text-sm px-6 py-2",
    lg: "text-base px-8 py-3"
  };
  
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );
  
  return (
    <button
      className={classes}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      <span className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/20 to-neon-cyan/20 opacity-0 hover:opacity-30 transition-opacity duration-300"></span>
    </button>
  );
};

export default HolographicButton;