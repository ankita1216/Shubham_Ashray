import React from 'react';
import { motion } from 'framer-motion';
import { Download, Home, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS } from '../constants/colors';
import { DecorativeShape } from '../components/common/DecorativeShape';

export default function ThankYou() {
  const THEME_DARK = "#07111F";
  const THEME_GOLD = "#C9A44D";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" style={{ background: THEME_DARK }}>
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <DecorativeShape
          size={600}
          opacity={0.12}
          rotate={15}
          className="-bottom-40 -right-20"
        />

        {/* Cinematic Subtle Glows */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent via-[#07111F]/50 to-[#07111F]" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#C9A44D] rounded-full blur-[140px] opacity-[0.08]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-[#E91E8C] rounded-full blur-[120px] opacity-[0.04]" />
      </div>

      <div className="sa-container relative z-10 w-full px-6 py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl w-full flex flex-col items-center text-center"
        >
          {/* Success Icon Section */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="relative mb-10"
          >
            <div className="absolute inset-0 bg-[#C9A44D] rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="relative bg-gradient-to-br from-[#C9A44D] to-[#B38F3D] p-6 rounded-full shadow-[0_0_50px_rgba(201,164,77,0.3)]">
              <CheckCircle2 size={48} className="text-[#07111F]" />
            </div>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-white">
              Thank You for <br className="hidden md:block" />
              <span style={{ color: THEME_GOLD }}>Choosing Us</span>
            </h1>
          </div>

          {/* Message */}
          <p className="max-w-xl mx-auto text-white/60">
            Your enquiry has been received with priority. Our luxury consultant will reach out to you shortly to begin your journey toward finding your private sanctuary.
          </p>

          {/* Buttons Section - Fixed thickness and gaps */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full max-w-2xl">
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-[280px] group flex items-center justify-center gap-3 bg-[#C9A44D] text-[#07111F] px-8 py-4 md:py-5 rounded-full font-bold text-[13px] md:text-sm uppercase tracking-widest transition-all hover:shadow-[0_20px_40px_rgba(201,164,77,0.25)]"
            >
              <Download size={18} className="transition-transform group-hover:scale-110" />
              Download Brochure
            </motion.button>

            <Link to="/" className="w-full sm:w-[280px]">
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 md:py-5 rounded-full font-bold text-[13px] md:text-sm uppercase tracking-widest transition-all hover:bg-white hover:text-[#07111F] hover:border-white"
              >
                <Home size={18} />
                Back to Home
              </motion.button>
            </Link>
          </div>

          {/* Footer Branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-24"
          >
            <span className="sa-serif text-2xl md:text-3xl tracking-[0.5em] text-white select-none">ASHRAY</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}