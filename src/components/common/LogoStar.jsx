import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants/colors';

export function LogoStar({ size = 36, colorOverride }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,4 33,18 46,11 37,24 54,27 40,32 44,42 31,37 30,52 29,37 16,42 20,32 6,27 23,24 14,11 27,18"
        fill="none" stroke={colorOverride || COLORS.pink} strokeWidth="1.5" opacity="0.6" />
      <path d="M30 4 L33 18 L27 18 Z" fill={colorOverride || COLORS.pink} opacity="0.9" />
      <path d="M46 11 L37 24 L33 18 Z" fill={colorOverride || COLORS.yellow} opacity="0.9" />
      <path d="M54 27 L40 32 L37 24 Z" fill={colorOverride || COLORS.cyan} opacity="0.9" />
      <path d="M48 46 L33 39 L40 32 Z" fill={colorOverride || COLORS.lime} opacity="0.9" />
      <path d="M30 56 L27 39 L33 39 Z" fill={colorOverride || COLORS.pink} opacity="0.9" />
      <path d="M12 46 L20 32 L27 39 Z" fill={colorOverride || COLORS.orange} opacity="0.9" />
      <path d="M6 27 L23 24 L20 32 Z" fill={colorOverride || COLORS.cyan} opacity="0.9" />
      <path d="M14 11 L27 18 L23 24 Z" fill={colorOverride || COLORS.yellow} opacity="0.9" />
    </svg>
  );
}

export function DecorativeStar({ 
  size = 180, 
  opacity = 0.15, 
  glowColor = COLORS.pink, 
  blur = 0,
  rotate = 0,
  animate = true,
  className = ""
}) {
  return (
    <motion.div 
      className={`absolute pointer-events-none ${className}`}
      initial={{ rotate, opacity: 0 }}
      animate={{ 
        opacity,
        rotate: animate ? [rotate, rotate + 5, rotate] : rotate,
        y: animate ? [0, -10, 0] : 0 
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut",
        opacity: { duration: 1 } 
      }}
      style={{ zIndex: 0 }}
    >
      {/* Background Glow */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: '-20%', 
          background: `radial-gradient(circle, ${glowColor}1A 0%, transparent 70%)`,
          filter: 'blur(40px)',
          borderRadius: '50%',
          zIndex: -1
        }} 
      />
      
      <div style={{ filter: blur > 0 ? `blur(${blur}px)` : 'none' }}>
        <LogoStar size={size} />
      </div>
    </motion.div>
  );
}
