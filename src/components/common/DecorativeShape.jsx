import React from 'react';
import { motion } from 'framer-motion';
import shapeImage from '../../assets/images/Shape1-removebg-preview.png';

export function DecorativeShape({ 
  size = 300, 
  opacity = 0.15, 
  rotate = 0, 
  className = "",
  animate = true
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, rotate }}
      animate={{ 
        opacity,
        rotate: animate ? [rotate, rotate + 3, rotate] : rotate,
        y: animate ? [0, -15, 0] : 0
      }}
      transition={{ 
        duration: 10, 
        repeat: Infinity, 
        ease: "easeInOut",
        opacity: { duration: 1.5 }
      }}
      style={{ zIndex: 0, width: size, height: 'auto' }}
    >
      <img 
        src={shapeImage} 
        alt="" 
        style={{ 
          width: '100%', 
          height: 'auto', 
          display: 'block' 
        }} 
      />
    </motion.div>
  );
}
