import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
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
    primary: "bg-gradient-to-r from-cosmic-purple to-neon-cyan text-white shadow-neon",
    secondary: "bg-space-black border border-neon-cyan text-neon-cyan hover:shadow-neon-glow",
    outline: "bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10"
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
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      onClick={props.onClick}
      type={props.type}
      disabled={props.disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      <span className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/20 to-neon-cyan/20 opacity-0 hover:opacity-30 transition-opacity duration-300"></span>
    </motion.button>
  );
};

export default HolographicButton;