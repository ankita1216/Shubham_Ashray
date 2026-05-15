import { useState, useRef, useEffect, useCallback } from 'react';
import { COLORS } from '../../constants/colors';
import { WaveLightToDark } from '../common/Dividers';
import { SectionLabel } from '../common/SectionLabel';
import { galleryData } from '../../data/galleryData';
import { DecorativeShape } from '../common/DecorativeShape';

/* ─── injected styles ─── */
const CSS = `
.gal-item { cursor: none; position: relative; overflow: hidden; }
.gal-item img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 0.85s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease;
  filter: saturate(0.75) brightness(0.9);
}
.gal-item:hover img {
  transform: scale(1.08);
  filter: saturate(1.05) brightness(1.0);
}
.gal-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, transparent 40%, rgba(0,0,0,0.65) 100%);
  transition: opacity 0.4s;
}
.gal-item:hover .gal-overlay { opacity: 1; }
.gal-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 18px 20px;
  transform: translateY(10px); opacity: 0;
  transition: transform 0.38s ease, opacity 0.38s ease;
}
.gal-item:hover .gal-label { transform: translateY(0); opacity: 1; }
.gal-ghost-num {
  position: absolute; top: -10px; right: 12px;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  font-size: 88px; line-height: 1;
  color: rgba(255,255,255,0.08);
  pointer-events: none; user-select: none;
  transition: color 0.4s;
}
.gal-item:hover .gal-ghost-num { color: rgba(255,255,255,0.14); }
.gal-corner {
  position: absolute; width: 22px; height: 22px;
  transition: width 0.3s, height 0.3s;
}
.gal-item:hover .gal-corner { width: 34px; height: 34px; }

.gal-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto;
  gap: 10px;
  padding: 10px 44px 0;
}

.gal-item-cell {
  grid-column: var(--desktop-col);
  height: var(--cell-height);
}

/* custom cursor */
.gal-cursor {
  position: fixed; pointer-events: none; z-index: 9999;
  width: 72px; height: 72px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Outfit', sans-serif; font-size: 8.5px;
  letter-spacing: 0.12em; color: #fff; text-transform: uppercase;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform, left, top;
}
.gal-cursor.show { transform: translate(-50%, -50%) scale(1); }

/* ticker marquee */
.gal-ticker-track {
  display: flex; gap: 0; width: max-content;
  animation: ticker 28s linear infinite;
}
.gal-ticker-track:hover { animation-play-state: paused; }
@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

@media (max-width: 768px) {
  .gal-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 10px 18px 0;
  }
  .gal-item-cell {
    grid-column: auto;
    height: 220px;
  }
  .gal-item-cell:first-child {
    grid-column: 1 / -1;
    height: 280px;
  }
  .gal-ghost-num { font-size: 58px; }
}

@media (max-width: 430px) {
  .gal-grid { gap: 8px; }
  .gal-item-cell { height: 190px; }
  .gal-item-cell:first-child { height: 240px; }
}

/* ─────────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────────── */
.glb-backdrop {
  position: fixed; inset: 0; z-index: 10000;
  background: rgba(4, 4, 3, 0.94);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;

  /* fade-in */
  opacity: 0;
  animation: glbFadeIn 0.32s ease forwards;
}
.glb-backdrop.closing {
  animation: glbFadeOut 0.26s ease forwards;
}
@keyframes glbFadeIn  { to { opacity: 1; } }
@keyframes glbFadeOut { to { opacity: 0; } }

/* Header */
.glb-header {
  position: absolute; top: 0; left: 0; right: 0; z-index: 5;
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 26px;
  background: linear-gradient(to bottom, rgba(4,4,3,0.9) 0%, transparent 100%);

  opacity: 0; transform: translateY(-14px);
  animation: glbSlideDown 0.36s 0.08s ease forwards;
}
@keyframes glbSlideDown { to { opacity: 1; transform: translateY(0); } }

.glb-title-group { display: flex; flex-direction: column; gap: 3px; }
.glb-eyebrow {
  font-size: 8.5px; font-weight: 800; letter-spacing: 0.22em;
  text-transform: uppercase; color: rgba(180,163,100,0.65);
}
.glb-title {
  font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.88);
  font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic;
}

.glb-controls { display: flex; align-items: center; gap: 8px; }

.glb-btn {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.13);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.72);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.glb-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.13); color: #fff;
  border-color: rgba(255,255,255,0.28);
}
.glb-btn:disabled { opacity: 0.26; cursor: not-allowed; }
.glb-btn-close:hover:not(:disabled) {
  background: rgba(255,72,72,0.16);
  border-color: rgba(255,72,72,0.32);
  color: #ff7575;
}

.glb-scale-pill {
  padding: 0 13px; height: 38px; border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.13);
  background: rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.7);
  font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em;
  cursor: pointer; transition: background 0.2s, color 0.2s;
}
.glb-scale-pill:hover { background: rgba(255,255,255,0.11); color: #fff; }

.glb-sep { width: 1px; height: 26px; background: rgba(255,255,255,0.12); margin: 0 4px; }

/* Stage */
.glb-stage {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  padding: 86px 52px 58px;
  user-select: none; -webkit-user-select: none;
}

/* Entrance wrapper — spring pop-in only, no ongoing transforms */
.glb-enter {
  opacity: 0; transform: scale(0.87);
  animation: glbPopIn 0.42s cubic-bezier(0.34, 1.38, 0.64, 1) 0.05s forwards;
}
@keyframes glbPopIn { to { opacity: 1; transform: scale(1); } }

/* Zoom/pan wrapper — plain div so nothing fights our manual transform */
.glb-zoom-layer {
  position: relative;
  will-change: transform;
}

/* Image */
.glb-image {
  display: block;
  max-width:  min(860px, 88vw);
  max-height: min(600px, 72vh);
  width: auto; height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow:
    0 2px 0 rgba(255,255,255,0.06) inset,
    0 36px 100px rgba(0,0,0,0.65),
    0 0 0 1px rgba(255,255,255,0.07);
}

/* Corner marks */
.glb-corner {
  position: absolute; width: 18px; height: 18px;
  border-color: rgba(180,163,100,0.5); border-style: solid;
  pointer-events: none;
}
.glb-corner--tl { top: -8px; left: -8px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
.glb-corner--tr { top: -8px; right: -8px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
.glb-corner--bl { bottom: -8px; left: -8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
.glb-corner--br { bottom: -8px; right: -8px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }

/* Footer hint */
.glb-footer {
  position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
  padding: 9px 20px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.09);
  backdrop-filter: blur(10px);
  border-radius: 999px;
  white-space: nowrap; pointer-events: none;

  font-size: 9.5px; font-weight: 700;
  letter-spacing: 0.11em; text-transform: uppercase;
  color: rgba(255,255,255,0.35);

  opacity: 0; transform: translateX(-50%) translateY(12px);
  animation: glbSlideUp 0.36s 0.14s ease forwards;
}
@keyframes glbSlideUp { to { opacity: 1; transform: translateX(-50%) translateY(0); } }

@media (max-width: 640px) {
  .glb-image { max-width: 92vw; max-height: 56vh; }
  .glb-stage  { padding: 78px 14px 50px; }
  .glb-footer { display: none; }
  .glb-scale-pill, .glb-sep { display: none; }
}
`;

/* ─── Lightbox ─────────────────────────────────────────────────────────────── */
function GalleryLightbox({ item, label, onClose }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [closing, setClosing] = useState(false);
  const dragOrigin = useRef(null);
  const stageRef = useRef(null);

  const MIN = 0.5, MAX = 4;
  const clamp = (v) => Math.min(Math.max(v, MIN), MAX);

  /* ── close with exit animation ── */
  const close = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 240);
  }, [onClose]);

  /* ── keyboard ── */
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [close]);

  /* ── wheel zoom ── */
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.14 : 0.14;
    setScale((s) => {
      const next = clamp(s + delta);
      if (next <= 1) setPos({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  /* ── zoom buttons ── */
  const zoomIn = () => setScale((s) => clamp(s + 0.4));
  const zoomOut = () => {
    setScale((s) => {
      const next = clamp(s - 0.4);
      if (next <= 1) setPos({ x: 0, y: 0 });
      return next;
    });
  };
  const resetZoom = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  /* ── mouse drag ── */
  const startDrag = (e) => {
    if (scale <= 1) return;
    e.preventDefault();
    setDragging(true);
    dragOrigin.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const onDrag = (e) => {
    if (!dragging || !dragOrigin.current) return;
    setPos({ x: e.clientX - dragOrigin.current.x, y: e.clientY - dragOrigin.current.y });
  };
  const endDrag = () => { setDragging(false); dragOrigin.current = null; };

  /* ── touch drag ── */
  const startTouch = (e) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    const t = e.touches[0];
    dragOrigin.current = { x: t.clientX - pos.x, y: t.clientY - pos.y };
    setDragging(true);
  };
  const onTouch = (e) => {
    if (!dragging || !dragOrigin.current || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    setPos({ x: t.clientX - dragOrigin.current.x, y: t.clientY - dragOrigin.current.y });
  };

  const scaleLabel = `${Math.round(scale * 100)}%`;

  return (
    <div
      className={`glb-backdrop${closing ? ' closing' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      {/* ── Header ── */}
      <div className="glb-header">
        <div className="glb-title-group">
          <span className="glb-eyebrow">Selected Portfolio</span>
          <span className="glb-title">{label}</span>
        </div>

        <div className="glb-controls">
          <button className="glb-btn" onClick={zoomOut} disabled={scale <= MIN} title="Zoom out">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          <button className="glb-scale-pill" onClick={resetZoom} title="Reset zoom">
            {scaleLabel}
          </button>

          <button className="glb-btn" onClick={zoomIn} disabled={scale >= MAX} title="Zoom in">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          <div className="glb-sep" />

          <button className="glb-btn glb-btn-close" onClick={close} title="Close (Esc)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Stage ── */}
      <div
        ref={stageRef}
        className="glb-stage"
        style={{ cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in' }}
        onMouseDown={startDrag}
        onMouseMove={onDrag}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={startTouch}
        onTouchMove={onTouch}
        onTouchEnd={endDrag}
        onClick={(e) => {
          /* click on empty stage area while at base zoom → zoom in */
          if (e.target === e.currentTarget && !dragging && scale <= 1) zoomIn();
        }}
      >
        {/*
          Two-layer pattern (same fix as FloorPlans):
          · glb-enter  → CSS spring pop-in, fires once, never changes again
          · glb-zoom-layer → plain div, owns the manual zoom/pan transform
          This prevents the entrance animation from fighting the zoom state.
        */}
        <div className="glb-enter">
          <div
            className="glb-zoom-layer"
            style={{
              transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
              transformOrigin: 'center center',
              transition: dragging ? 'none' : 'transform 0.14s ease',
            }}
          >
            {/* luxury corner marks */}
            <div className="glb-corner glb-corner--tl" />
            <div className="glb-corner glb-corner--tr" />
            <div className="glb-corner glb-corner--bl" />
            <div className="glb-corner glb-corner--br" />

            <img
              src={item.image}
              alt={label}
              className="glb-image"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="glb-footer">
        Scroll to zoom · Click stage to zoom in · Drag to pan
      </div>
    </div>
  );
}

/* ─── Main Gallery Component ─────────────────────────────────────────────────── */
export function Gallery() {
  const total = galleryData.length;
  const cursorRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [lightbox, setLightbox] = useState(null); // { item, label }

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Lock body scroll while lightbox is open */
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const layout = [
    { idx: 0, cols: '1 / span 5', h: 440 },
    { idx: 1, cols: '6 / span 4', h: 440 },
    { idx: 2, cols: '10 / span 3', h: 440 },
    { idx: 3, cols: '1 / span 3', h: 300 },
    { idx: 4, cols: '4 / span 6', h: 300 },
    { idx: 5, cols: '10 / span 3', h: 300 },
  ];

  const openLightbox = (item, label) => setLightbox({ item, label });
  const closeLightbox = () => setLightbox(null);

  return (
    <>
      <style>{CSS}</style>

      {/* ── Custom blob cursor (hidden when lightbox is open) ── */}
      {!lightbox && (
        <div
          ref={cursorRef}
          className={`gal-cursor${cursorVisible ? ' show' : ''}`}
          style={{ background: COLORS.primary }}
        >
          View
        </div>
      )}

      <section id="gallery" className="sa-sans" style={{ background: COLORS.luxBeige, overflow: 'hidden', position: 'relative' }}>
        <DecorativeShape size={600} opacity={0.14} rotate={15} className="-bottom-40 -right-20" />

        {/* ── Header ── */}
        <div className="sa-container" style={{ paddingTop: 92, position: 'relative' }}>
          <div aria-hidden style={{
            position: 'absolute', top: 30, right: 64, zIndex: 0,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: 'clamp(86px, 12vw, 170px)',
            lineHeight: 1, letterSpacing: '0',
            color: `${COLORS.textDark}05`,
            pointerEvents: 'none', userSelect: 'none',
          }}>
            WORKS
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <SectionLabel onDark={false}>Selected Portfolio</SectionLabel>
              </div>
              <h2 style={{ color: COLORS.textDark, margin: 0 }}>
                Visual <em style={{ color: COLORS.primary, fontStyle: 'italic' }}>Excellence</em>
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, paddingTop: 4 }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800,
                  color: COLORS.textDark,
                  margin: 0, lineHeight: 1, letterSpacing: '-0.03em',
                }}>
                  {total.toString().padStart(2, '0')}<span style={{ color: COLORS.primary }}>+</span>
                </p>
                <p style={{
                  fontSize: 11, letterSpacing: '0.16em', fontWeight: 700,
                  color: COLORS.mutedLight, textTransform: 'uppercase', margin: '4px 0 0',
                }}>
                  Showcase Projects
                </p>
              </div>

              {/* Divider */}
              <div style={{ width: 40, height: 1, background: `rgba(26,28,20,0.12)` }} />

              <p style={{
                fontSize: 14,
                color: COLORS.mutedLight,
                maxWidth: 320,
                lineHeight: 1.7,
                textAlign: "right",
                margin: 0,
              }}>
                An immersive visual journey through our meticulously designed spaces, where modern architecture meets timeless luxury in every detail.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: `${COLORS.textDark}10`, marginTop: 36 }} />
        </div>

        {/* ── Mosaic ── */}
        <div className="gal-grid sa-container">
          {layout.map((cell) => {
            const item = galleryData[cell.idx % total];
            const num = cell.idx + 1;
            const label = item.label;

            return (
              <div
                key={cell.idx}
                className="gal-item gal-item-cell"
                style={{ '--desktop-col': cell.cols, '--cell-height': `${cell.h}px` }}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
                onClick={() => openLightbox(item, label)}
              >
                <img src={item.image} alt={label} />
                <div className="gal-overlay" />

                <div className="gal-ghost-num">{num.toString().padStart(2, '0')}</div>

                <div className="gal-corner" style={{
                  top: 0, left: 0,
                  borderTop: `1.5px solid ${COLORS.primary}`,
                  borderLeft: `1.5px solid ${COLORS.primary}`,
                }} />
                <div className="gal-corner" style={{
                  bottom: 0, right: 0,
                  borderBottom: `1.5px solid ${COLORS.primary}`,
                  borderRight: `1.5px solid ${COLORS.primary}`,
                }} />

                <div className="gal-label">
                  <p style={{
                    fontSize: 9, letterSpacing: '0.22em', fontWeight: 700,
                    color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', margin: '0 0 5px',
                  }}>
                    Design — {num.toString().padStart(2, '0')}
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(15px, 1.8vw, 22px)',
                    fontStyle: 'italic', fontWeight: 600,
                    color: '#fff', margin: 0, lineHeight: 1.2,
                  }}>
                    {label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Marquee ticker ── */}
        <div style={{
          overflow: 'hidden',
          borderTop: `1px solid ${COLORS.textDark}10`,
          borderBottom: `1px solid ${COLORS.textDark}10`,
          margin: '44px 0 0', padding: '13px 0',
        }}>
          <div className="gal-ticker-track">
            {[...galleryData, ...galleryData].map((item, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center',
                gap: 44, padding: '0 44px',
                fontSize: 12, letterSpacing: '0.18em', fontWeight: 700,
                color: `${COLORS.textDark}30`,
                textTransform: 'uppercase', whiteSpace: 'nowrap',
              }}>
                {item.label}
                <span style={{
                  display: 'inline-block', width: 5, height: 5,
                  borderRadius: '50%', background: COLORS.primary, flexShrink: 0,
                }} />
              </span>
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 44px 60px',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{
            fontSize: 9, letterSpacing: '0.22em', fontWeight: 700,
            color: `${COLORS.textDark}28`, textTransform: 'uppercase', margin: 0,
          }}>
            Click to Explore · Crafted with Precision
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {galleryData.slice(0, 6).map((_, i) => (
              <div key={i} style={{
                width: i === 0 ? 20 : 5, height: 1.5, borderRadius: 2,
                background: i === 0 ? COLORS.primary : `${COLORS.textDark}20`,
              }} />
            ))}
          </div>
        </div>
      </section>

      <WaveLightToDark fromColor={COLORS.luxBeige} toColor={COLORS.darkMid} />

      {/* ── Lightbox (portal-like, rendered at end of tree) ── */}
      {lightbox && (
        <GalleryLightbox
          item={lightbox.item}
          label={lightbox.label}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}