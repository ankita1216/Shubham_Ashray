import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { COLORS } from '../../constants/colors';
import { WaveDarkToLight } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';
import aerialImage from "../../assets/images/Aerial view .webp";

// ── Architectural Corner Brackets ────────────────────────────────────────────
function CornerBrackets({ size = 32, thickness = 2, color = "#C9A44D", opacity = 1 }) {
  const s = `${size}px`;
  const corners = [
    { top: 0, left: 0, borderTop: thickness, borderLeft: thickness, borderBottom: 0, borderRight: 0 },
    { top: 0, right: 0, borderTop: thickness, borderRight: thickness, borderBottom: 0, borderLeft: 0 },
    { bottom: 0, left: 0, borderBottom: thickness, borderLeft: thickness, borderTop: 0, borderRight: 0 },
    { bottom: 0, right: 0, borderBottom: thickness, borderRight: thickness, borderTop: 0, borderLeft: 0 },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: s,
            height: s,
            opacity,
            borderColor: color,
            borderStyle: 'solid',
            borderTopWidth: c.borderTop ? `${c.borderTop}px` : 0,
            borderLeftWidth: c.borderLeft ? `${c.borderLeft}px` : 0,
            borderRightWidth: c.borderRight ? `${c.borderRight}px` : 0,
            borderBottomWidth: c.borderBottom ? `${c.borderBottom}px` : 0,
            ...(c.top !== undefined ? { top: -1 } : { bottom: -1 }),
            ...(c.left !== undefined ? { left: -1 } : { right: -1 }),
          }}
        />
      ))}
    </>
  );
}

// ── Rotating Text Badge ───────────────────────────────────────────────────────
function RotatingBadge() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '7.5rem',
        right: '2.5rem',
        width: 112,
        height: 112,
        zIndex: 50,
      }}
      className="hidden md:block"
    >
      <motion.div
        style={{ width: '100%', height: '100%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <defs>
            <path id="badgeCircle" d="M 56,56 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
          </defs>
          <text
            fontSize="9"
            fill="#C9A44D"
            letterSpacing="3.2"
            fontFamily="'Cormorant Garamond', serif"
            opacity="0.8"
          >
            <textPath href="#badgeCircle">LUXURY RESIDENTIAL • GUWAHATI • PHASE II •</textPath>
          </text>
        </svg>
      </motion.div>
      {/* Center crosshair */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 10, height: 10,
        borderRadius: '50%',
        border: '1px solid rgba(201,164,77,0.5)',
        background: 'rgba(201,164,77,0.15)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        width: 20, height: 1,
        background: 'rgba(201,164,77,0.3)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        width: 20, height: 1,
        background: 'rgba(201,164,77,0.3)',
      }} />
    </div>
  );
}

// ── Thin floating grid lines ──────────────────────────────────────────────────
function GridLines() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5, overflow: 'hidden' }}>
      {/* Vertical accent line — far left */}
      <div style={{
        position: 'absolute', left: 32, top: 0, bottom: 0,
        width: 1,
        background: 'linear-gradient(to bottom, transparent, rgba(201,164,77,0.18) 20%, rgba(201,164,77,0.18) 80%, transparent)',
      }} className="hidden md:block" />
      {/* Horizontal top rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 110, left: '8%', right: '8%',
          height: 1,
          background: 'linear-gradient(to right, rgba(201,164,77,0.15), rgba(201,164,77,0.06) 60%, transparent)',
          transformOrigin: 'left',
        }}
        className="hidden md:block"
      />
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef(null);

  const stats = [
    { value: "70%", label: "Open Space" },
    { value: "525", label: "Residences" },
    { value: "9", label: "Towers" },
    { value: "2 & 3", label: "BHK Options" },
  ];

  return (
    <>
      <section
        ref={containerRef}
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: COLORS.darkNavy,
        }}
      >
        {/* ── Ghost "AHA" watermark ─────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: '-2%',
            pointerEvents: 'none',
            zIndex: 1,
            userSelect: 'none',
            overflow: 'hidden',
            lineHeight: 0.8,
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(16rem, 30vw, 42rem)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: '#C9A44D',
            opacity: 0.03,
            display: 'block',
          }}>
            AHA
          </span>
        </div>

        {/* ── Subtle grid lines ────────────────────────────────────── */}
        <GridLines />

        {/* ── Decorative Background Shapes ──────────────────────────── */}
        <DecorativeShape 
          size={500} 
          opacity={0.15} 
          rotate={-15} 
          className="-top-20 -left-20" 
        />
        <DecorativeShape 
          size={400} 
          opacity={0.12} 
          rotate={165} 
          className="top-[40%] -right-40" 
        />

        {/* ── The Architectural Image Frame ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '120px', 
            right: '2%', // Bring it more into the screen
            width: 'clamp(300px, 50%, 700px)',
            height: 'calc(85% - 120px)',
            zIndex: 10,
            transform: 'rotate(-0.4deg)',
          }}
          className="hidden md:block"
        >
          {/* Outer golden border */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(201,164,77,0.28)',
            padding: 6,
          }}>
            {/* Inner image */}
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <img
                src={aerialImage}
                alt="Aerial view of AHA Life township"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.72) saturate(0.8) sepia(0.08)',
                  display: 'block',
                }}
              />
              {/* Left gradient bleed into dark bg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, rgba(7,17,31,0.72) 0%, rgba(7,17,31,0.25) 35%, transparent 60%)',
              }} />
              {/* Bottom fade */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(7,17,31,0.85) 0%, transparent 40%)',
              }} />

              {/* Phase label inside image */}
              <div style={{
                position: 'absolute', bottom: 20, right: 20,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 16, height: 1, background: 'rgba(201,164,77,0.5)' }} />
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 10,
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,164,77,0.65)',
                  fontWeight: 400,
                }}>
                  Phase II
                </span>
              </div>

              {/* Frame number — top left inside image */}
              <div style={{
                position: 'absolute', top: 16, left: 20,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 10,
                  letterSpacing: '0.3em',
                  color: 'rgba(201,164,77,0.45)',
                  textTransform: 'uppercase',
                }}>
                  01 / 09
                </span>
              </div>
            </div>

            {/* Corner brackets */}
            <CornerBrackets size={32} thickness={2} color="#C9A44D" opacity={1} />

            {/* Secondary inner brackets — slightly inset */}
            <div style={{ position: 'absolute', inset: 10 }}>
              <CornerBrackets size={16} thickness={1} color="#C9A44D" opacity={0.4} />
            </div>
          </div>
        </motion.div>

        {/* Mobile image — full bleed behind content */}
        <div
          className="md:hidden absolute inset-0 z-10"
          style={{ opacity: 1 }}
        >
          <img
            src={aerialImage}
            alt="Aerial view of AHA Life township"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'brightness(0.55) saturate(0.8)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,17,31,0.95) 0%, rgba(7,17,31,0.4) 60%, rgba(7,17,31,0.2) 100%)',
          }} />
        </div>

        {/* ── Dark bleed from left — desktop ──────────────────────── */}
        <div
          className="hidden md:block"
          style={{
            position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none',
            background: 'linear-gradient(to right, #07111F 0%, #07111F 32%, rgba(7,17,31,0.85) 42%, rgba(7,17,31,0.3) 55%, transparent 65%)',
          }}
        />

        {/* ── Main Text Content ─────────────────────────────────────── */}
        <div
          className="sa-container"
          style={{
            position: 'relative',
            zIndex: 30,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: '40px', // Minimal clearance
            paddingBottom: '0px', 
          }}
        >
          <div style={{ maxWidth: 640 }}>

            {/* Location tag */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}
            >
              <div style={{ width: 40, height: 1, background: '#C9A44D' }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#C9A44D',
                fontSize: 11,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                Guwahati, Assam
              </span>
            </motion.div>

            {/* AHA — line 1 */}
            <div style={{ overflow: 'hidden', marginBottom: 4 }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 0.86,
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                AHA
              </motion.h1>
            </div>

            {/* LIFE. — line 2 */}
            <div style={{ overflow: 'hidden', marginBottom: 8 }}>
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.05, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  fontWeight: 300,
                  letterSpacing: '-0.025em',
                  lineHeight: 0.86,
                  color: '#C9A44D',
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                LIFE.
              </motion.h1>
            </div>

            {/* Thin rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 56,
                height: 1,
                background: 'rgba(201,164,77,0.55)',
                marginBottom: 12,
                transformOrigin: 'left',
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 0.62, y: 0 }}
              transition={{ duration: 1, delay: 1.15 }}
              style={{
                color: '#ffffff',
                fontSize: 12,
                lineHeight: 1.5,
                letterSpacing: '0.02em',
                fontWeight: 300,
                maxWidth: 480,
                marginBottom: 20,
              }}
            >
              Experience the pinnacle of luxury residential living. A township designed for those who seek tranquility amidst the vibrant energy of Guwahati.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.35 }}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 28 }}
            >
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  padding: '15px 40px',
                  background: '#C9A44D',
                  color: '#07111F',
                  fontSize: 10,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 0 rgba(201,164,77,0)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#B38F3D';
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(201,164,77,0.32)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C9A44D';
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(201,164,77,0)';
                }}
              >
                Book a Site Visit
              </a>

              <a
                href="#overview"
                className="group"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 10,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.18)',
                  paddingBottom: 4,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#C9A44D';
                  e.currentTarget.style.borderBottomColor = '#C9A44D';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.72)';
                  e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.18)';
                }}
              >
                Explore Phase II
                <ArrowRight size={13} />
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Rotating Badge ───────────────────────────────────────── */}
        <RotatingBadge />

        {/* ── Vertical Scroll Indicator ────────────────────────────── */}
        <motion.div
          className="hidden md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          style={{
            position: 'absolute',
            bottom: 112,
            right: 32,
            zIndex: 40,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{
            color: 'rgba(201,164,77,0.38)',
            fontSize: 8,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            fontFamily: "'Cormorant Garamond', serif",
          }}>
            Scroll
          </span>
          <motion.div
            style={{
              width: 1,
              height: 52,
              background: 'linear-gradient(to bottom, rgba(201,164,77,0.45), transparent)',
              transformOrigin: 'top',
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* ── Stats Bar ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.65 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 50,
            borderTop: '1px solid rgba(201,164,77,0.14)',
            background: 'rgba(7,17,31,0.88)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div
            className="sa-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              padding: '20px 0',
            }}
          >
            {stats.map((s, i) => (
              <React.Fragment key={i}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '0 16px',
                  flex: 1,
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                    fontWeight: 300,
                    color: '#C9A44D',
                    lineHeight: 1,
                    marginBottom: 6,
                    letterSpacing: '-0.01em',
                  }}>
                    {s.value}
                  </span>
                  <span style={{
                    fontSize: 9,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.35)',
                    fontWeight: 400,
                  }}>
                    {s.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div style={{
                    width: 1,
                    background: 'rgba(201,164,77,0.14)',
                    alignSelf: 'stretch',
                    margin: '4px 0',
                  }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Wave Divider ─────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 60, marginTop: -1 }}>
        <WaveDarkToLight fromColor={COLORS.darkNavy} toColor={COLORS.warmWhite} />
      </div>
    </>
  );
}