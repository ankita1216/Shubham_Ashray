import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';
import { galleryData } from '../../data/galleryData';

export function Gallery() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(null);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const total = galleryData.length;

  const goTo = useCallback((idx, dir = 1) => {
    if (animating || idx === active) return;
    setDirection(dir);
    setPrev(active);
    setAnimating(true);
    setActive(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
  }, [active, animating]);

  const next = useCallback(() => goTo((active + 1) % total, 1), [active, total, goTo]);
  const prev_ = useCallback(() => goTo((active - 1 + total) % total, -1), [active, total, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev_();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev_]);

  useEffect(() => {
    const t = setTimeout(next, 5000);
    return () => clearTimeout(t);
  }, [active, next]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const onPointerDown = (e) => { dragStart.current = e.clientX; setDragging(false); };
  const onPointerMove = (e) => { if (dragStart.current !== null && Math.abs(e.clientX - dragStart.current) > 8) setDragging(true); };
  const onPointerUp = (e) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev_(); }
    dragStart.current = null;
    setTimeout(() => setDragging(false), 50);
  };

  const sidePrev = (active - 1 + total) % total;
  const sideNext = (active + 1) % total;

  return (
    <>
      <section
        id="gallery"
        className="sa-sans sa-noise sa-section"
        style={{
          background: COLORS.softCream,
          position: "relative",
          overflow: "hidden",
          // ✅ FIXED: removed large top padding that was eating heading space
          paddingTop: 56,
          paddingBottom: 72,
        }}
      >
        {/* Decorative background */}
        <div className="absolute top-0 right-0" style={{ width: 400, height: 400, background: `radial-gradient(circle,rgba(233,30,140,0.05) 0%,transparent 65%)`, pointerEvents: "none" }} />
        <DecorativeShape size={550} opacity={0.16} rotate={140} className="-top-24 -right-24" />

        {/* ── Header — VISIBLE, tight, editorial ── */}
        <div className="sa-container relative z-10" style={{ marginBottom: 36 }}>

          {/* Row 1: SectionLabel + slide counter */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <SectionLabel onDark={false}>Gallery</SectionLabel>

            {/* Counter — desktop */}
            <div className="hidden md:flex items-center gap-3">
              <span style={{ fontFamily: "monospace", fontSize: 13, color: COLORS.pink, fontWeight: 700, letterSpacing: "0.06em" }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <div style={{ width: 56, height: 1, background: `${COLORS.textDark}22`, position: "relative" }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, height: "100%",
                  background: COLORS.pink,
                  width: `${((active + 1) / total) * 100}%`,
                  transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)"
                }} />
              </div>
              <span style={{ fontFamily: "monospace", fontSize: 13, color: `${COLORS.textDark}40`, letterSpacing: "0.06em" }}>
                {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Row 2: Main heading */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
            <h2
              className="sa-serif"
              style={{
                margin: 0,
                fontSize: "clamp(28px, 3.6vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.07,
                letterSpacing: "-0.5px",
                color: COLORS.textDark,
                maxWidth: 540,
              }}
            >
              Architecture That{" "}
              <span style={{ color: COLORS.pink }}>Inspires</span>
            </h2>

            {/* Vertical accent — desktop only */}
            <div
              className="hidden md:block flex-shrink-0"
              style={{
                width: 1,
                height: 48,
                marginBottom: 4,
                background: `linear-gradient(to bottom, transparent, ${COLORS.pink}50, transparent)`,
              }}
            />
          </div>
        </div>

        {/* ── Cinematic Slider Stage — UNCHANGED ── */}
        <div
          className="relative select-none"
          style={{ width: "100%", padding: "0 0 8px", perspective: "1200px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minHeight: 440, position: "relative" }}>

            {/* Side card: PREV */}
            <div
              onClick={() => !dragging && prev_()}
              style={{
                position: "absolute",
                left: "max(12px, calc(50% - 520px))",
                top: "50%",
                transform: "translateY(-50%)",
                width: "clamp(100px, 18vw, 220px)",
                height: "clamp(200px, 36vw, 380px)",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                zIndex: 2,
                filter: "blur(1.5px) brightness(0.65)",
                opacity: 0.7,
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "blur(0px) brightness(0.8)"; e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "blur(1.5px) brightness(0.65)"; e.currentTarget.style.opacity = "0.7"; }}
            >
              <img src={galleryData[sidePrev].image} alt={galleryData[sidePrev].label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }} />
            </div>

            {/* HERO active card */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "clamp(280px, 58vw, 780px)",
                height: "clamp(300px, 52vw, 520px)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 24px 72px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                transform: `perspective(1000px) rotateY(${tilt.x * 0.4}deg) rotateX(${tilt.y * 0.4}deg) scale(1)`,
                transition: animating
                  ? `transform 0.7s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s ease`
                  : `transform 0.18s ease-out, box-shadow 0.3s ease`,
                flexShrink: 0,
                cursor: dragging ? "grabbing" : "grab",
              }}
            >
              {prev !== null && (
                <div
                  key={`prev-${prev}`}
                  style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    animation: `slideOut${direction > 0 ? 'Left' : 'Right'} 0.7s cubic-bezier(0.4,0,0.2,1) forwards`,
                  }}
                >
                  <img src={galleryData[prev].image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}

              <div
                key={`active-${active}`}
                style={{
                  position: "absolute", inset: 0, zIndex: 2,
                  animation: animating
                    ? `slideIn${direction > 0 ? 'Right' : 'Left'} 0.7s cubic-bezier(0.4,0,0.2,1) forwards`
                    : "none",
                }}
              >
                <img
                  src={galleryData[active].image}
                  alt={galleryData[active].label}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transform: `scale(${animating ? 1.04 : 1})`,
                    transition: "transform 1.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                />
              </div>

              <div style={{ position: "absolute", inset: 0, zIndex: 3, background: "linear-gradient(170deg, transparent 40%, rgba(8,6,16,0.82) 100%)" }} />

              <div style={{ position: "absolute", inset: 0, zIndex: 4, padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ width: 32, height: 2, background: COLORS.pink, marginBottom: 10, borderRadius: 2 }} />
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, marginBottom: 7, display: "block" }}>
                  Artist's Impression
                </span>
                <h3 className="sa-serif" style={{ color: "#fff", margin: 0, fontSize: "clamp(18px, 2.2vw, 30px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.01em", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
                  {galleryData[active].label}
                </h3>
              </div>

              <div style={{
                position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
                background: `radial-gradient(ellipse at ${50 + tilt.x * 3}% ${50 + tilt.y * 3}%, rgba(255,255,255,0.06) 0%, transparent 65%)`,
                transition: "background 0.1s ease",
              }} />
            </div>

            {/* Side card: NEXT */}
            <div
              onClick={() => !dragging && next()}
              style={{
                position: "absolute",
                right: "max(12px, calc(50% - 520px))",
                top: "50%",
                transform: "translateY(-50%)",
                width: "clamp(100px, 18vw, 220px)",
                height: "clamp(200px, 36vw, 380px)",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                zIndex: 2,
                filter: "blur(1.5px) brightness(0.65)",
                opacity: 0.7,
                transition: "all 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "blur(0px) brightness(0.8)"; e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "blur(1.5px) brightness(0.65)"; e.currentTarget.style.opacity = "0.7"; }}
            >
              <img src={galleryData[sideNext].image} alt={galleryData[sideNext].label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(0,0,0,0.5), transparent)" }} />
            </div>
          </div>

          <style>{`
            @keyframes slideInRight {
              from { opacity: 0; transform: translateX(6%) scale(0.97); }
              to   { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes slideInLeft {
              from { opacity: 0; transform: translateX(-6%) scale(0.97); }
              to   { opacity: 1; transform: translateX(0) scale(1); }
            }
            @keyframes slideOutLeft {
              from { opacity: 1; transform: translateX(0) scale(1); }
              to   { opacity: 0; transform: translateX(-4%) scale(0.97); }
            }
            @keyframes slideOutRight {
              from { opacity: 1; transform: translateX(0) scale(1); }
              to   { opacity: 0; transform: translateX(4%) scale(0.97); }
            }
          `}</style>
        </div>

        {/* ── Controls & Thumbnails — UNCHANGED ── */}
        <div className="sa-container relative z-10 mt-8">
          <div className="flex items-center justify-between gap-4">

            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {galleryData.map(({ label, image }, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > active ? 1 : -1)}
                  style={{
                    flexShrink: 0,
                    width: i === active ? 52 : 36,
                    height: 36,
                    borderRadius: 7,
                    overflow: "hidden",
                    border: i === active ? `2px solid ${COLORS.pink}` : "2px solid transparent",
                    padding: 0,
                    cursor: "pointer",
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    opacity: i === active ? 1 : 0.45,
                    background: "none",
                  }}
                  aria-label={`Go to ${label}`}
                >
                  <img src={image} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {[{ fn: prev_, label: "←" }, { fn: next, label: "→" }].map(({ fn, label }, bi) => (
                <button
                  key={bi}
                  onClick={fn}
                  aria-label={label}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: `1.5px solid ${COLORS.textDark}22`,
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    color: COLORS.textDark,
                    fontSize: 15, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s ease",
                    fontFamily: "sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = COLORS.pink; e.currentTarget.style.color = "#fff"; e.currentTarget.style.border = `1.5px solid ${COLORS.pink}`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = COLORS.textDark; e.currentTarget.style.border = `1.5px solid ${COLORS.textDark}22`; }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile counter */}
          <div className="flex md:hidden items-center gap-3 mt-4">
            <span style={{ fontFamily: "monospace", fontSize: 12, color: COLORS.pink, fontWeight: 700 }}>{String(active + 1).padStart(2, '0')}</span>
            <div style={{ flex: 1, height: 1, background: `${COLORS.textDark}20`, position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: COLORS.pink, width: `${((active + 1) / total) * 100}%`, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
            <span style={{ fontFamily: "monospace", fontSize: 12, color: `${COLORS.textDark}40` }}>{String(total).padStart(2, '0')}</span>
          </div>
        </div>
      </section>

      <WaveLightToDark fromColor={COLORS.softCream} toColor={COLORS.darkMid} />
    </>
  );
}