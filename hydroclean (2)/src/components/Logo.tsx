import React from 'react';
import { motion } from 'motion/react';
import { Droplets } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'md' }) => {
  const sizes = {
    sm: 'text-lg md:text-xl',
    md: 'text-xl md:text-2xl',
    lg: 'text-[15vw] md:text-[12vw]'
  };

  const iconSizes = {
    sm: 14,
    md: 20,
    lg: 40 // Will be overridden by responsive classes if needed
  };

  return (
    <div className={cn("flex items-center gap-2 font-black tracking-tighter uppercase", sizes[size], className)}>
      <motion.div
        initial={{ rotate: -180, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100 }}
        className="text-brand-blue"
      >
        <Droplets size={iconSizes[size]} />
      </motion.div>
      
      <div className="flex overflow-hidden">
        <motion.span
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'circOut' }}
        >
          HYDRO
        </motion.span>
        <motion.span
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: 'circOut' }}
          className="text-brand-blue"
        >
          CLEAN
        </motion.span>
      </div>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50"
      />
    </div>
  );
};
