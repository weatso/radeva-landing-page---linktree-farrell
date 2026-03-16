'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number; // Durasi dalam detik (makin besar makin lambat)
  className?: string;
}

export default function Marquee({ 
  children, 
  direction = 'left', 
  speed = 20, 
  className 
}: MarqueeProps) {
  
  // Logic: Kita duplikasi konten agar looping terlihat seamless (tanpa putus)
  return (
    <div className={cn("flex w-full overflow-hidden whitespace-nowrap", className)}>
      <motion.div
        className="flex min-w-full shrink-0 items-center justify-around gap-8 py-4"
        initial={{ x: 0 }}
        animate={{ x: direction === 'left' ? '-100%' : '100%' }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {children}
        {children} {/* Duplikasi 1 */}
      </motion.div>

      <motion.div
        className="flex min-w-full shrink-0 items-center justify-around gap-8 py-4"
        initial={{ x: 0 }}
        animate={{ x: direction === 'left' ? '-100%' : '100%' }}
        transition={{ 
          duration: speed, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        {children}
        {children} {/* Duplikasi 2 untuk layar ultra-wide */}
      </motion.div>
    </div>
  );
}