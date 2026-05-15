import { useState, useRef, useCallback, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { floorPlansData } from '../../data/floorPlansData';
import { motion, AnimatePresence } from 'framer-motion';
import { DecorativeShape } from '../common/DecorativeShape';

/* ─── Premium Image Lightbox Modal ─────────────────────────────────────────── */
function PremiumLightbox({ image, title, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef(null);
  const stageRef = useRef(null);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 4;

  const clampScale = (s) => Math.min(Math.max(s, MIN_SCALE), MAX_SCALE);

  const zoomIn = () =>
    setScale((s) => clampScale(s + 0.4));

  const zoomOut = () =>
    setScale((s) => {
      const next = clampScale(s - 0.4);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  /* ── Wheel zoom ── */
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((s) => {
      const next = clampScale(s + delta);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  /* ── Keyboard close ── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  /* ── Drag / pan ── */
  const handleMouseDown = (e) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragStartRef.current) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const stopDrag = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  /* ── Touch drag ── */
  const handleTouchStart = (e) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    const t = e.touches[0];
    dragStartRef.current = { x: t.clientX - position.x, y: t.clientY - position.y };
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !dragStartRef.current || e.touches.length !== 1) return;
    e.preventDefault();
    const t = e.touches[0];
    setPosition({
      x: t.clientX - dragStartRef.current.x,
      y: t.clientY - dragStartRef.current.y,
    });
  };

  const scalePercent = Math.round(scale * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="lb-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* ── Header Bar ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="lb-header"
      >
        <div className="lb-title-wrap">
          <span className="lb-eyebrow">Unit Blueprint</span>
          <span className="lb-title-name">{title}</span>
        </div>
        <div className="lb-controls">
          <button
            onClick={zoomOut}
            disabled={scale <= MIN_SCALE}
            className="lb-btn"
            title="Zoom out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          <button onClick={resetZoom} className="lb-scale-pill">
            {scalePercent}%
          </button>

          <button
            onClick={zoomIn}
            disabled={scale >= MAX_SCALE}
            className="lb-btn"
            title="Zoom in"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>

          <div className="lb-divider" />

          <button onClick={onClose} className="lb-btn lb-close-btn" title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </motion.div>

      {/* ── Image Stage ── */}
      {/*
        FIX: The entrance spring animation is now on a wrapper <motion.div> that only
        animates opacity + scale for the entry effect, then stays at scale(1) forever.
        The actual zoom/pan transform lives on the inner plain <div>, so Framer Motion
        never races against the manual transform state.
      */}
      <div
        ref={stageRef}
        className="lb-stage"
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDrag}
        onClick={(e) => {
          if (!isDragging && scale <= 1 && e.target === e.currentTarget) zoomIn();
        }}
      >
        {/* Entrance-only motion wrapper — never changes after mount */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        >
          {/* Zoom / pan wrapper — plain div, no Framer Motion transforms */}
          <div
            className="lb-image-frame"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.15s ease',
            }}
          >
            <div className="lb-corner lb-corner--tl" />
            <div className="lb-corner lb-corner--tr" />
            <div className="lb-corner lb-corner--bl" />
            <div className="lb-corner lb-corner--br" />
            <img src={image} alt={title} className="lb-image" draggable={false} />
          </div>
        </motion.div>
      </div>

      {/* ── Footer hint ── */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="lb-footer"
      >
        <span>Scroll or pinch to zoom · Click to zoom in · Drag to pan at higher zoom</span>
      </motion.div>

      <style>{`
        .lb-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(5, 6, 4, 0.93);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .lb-header {
          position: absolute; top: 0; left: 0; right: 0;
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 28px;
          background: linear-gradient(to bottom, rgba(5,6,4,0.85) 0%, transparent 100%);
          z-index: 10;
        }
        .lb-title-wrap { display: flex; flex-direction: column; gap: 3px; }
        .lb-eyebrow {
          color: rgba(180,163,100,0.7);
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.2em; text-transform: uppercase;
        }
        .lb-title-name {
          color: rgba(255,255,255,0.9);
          font-size: 15px; font-weight: 600;
        }
        .lb-controls { display: flex; align-items: center; gap: 8px; }
        .lb-btn {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.75);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s, color .2s, border-color .2s;
        }
        .lb-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.14); color: #fff;
          border-color: rgba(255,255,255,0.3);
        }
        .lb-btn:disabled { opacity: 0.28; cursor: not-allowed; }
        .lb-close-btn:hover:not(:disabled) {
          background: rgba(255,80,80,0.18);
          border-color: rgba(255,80,80,0.35);
          color: #ff7070;
        }
        .lb-scale-pill {
          padding: 0 14px; height: 38px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.75);
          font-size: 11px; font-weight: 800; letter-spacing: 0.08em;
          cursor: pointer; transition: background .2s;
        }
        .lb-scale-pill:hover { background: rgba(255,255,255,0.12); color: #fff; }
        .lb-divider {
          width: 1px; height: 28px;
          background: rgba(255,255,255,0.14); margin: 0 4px;
        }
        .lb-stage {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 88px 48px 60px;
          user-select: none; -webkit-user-select: none;
        }
        .lb-image-frame {
          position: relative;
          will-change: transform;
        }
        .lb-image {
          max-width: min(860px, 90vw);
          max-height: min(620px, 72vh);
          width: auto; height: auto;
          object-fit: contain;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08);
          display: block;
          padding: 28px;
        }
        .lb-corner {
          position: absolute; width: 18px; height: 18px;
          border-color: rgba(180,163,100,0.55); border-style: solid;
          z-index: 2; pointer-events: none;
        }
        .lb-corner--tl { top: -8px; left: -8px; border-width: 2px 0 0 2px; border-radius: 3px 0 0 0; }
        .lb-corner--tr { top: -8px; right: -8px; border-width: 2px 2px 0 0; border-radius: 0 3px 0 0; }
        .lb-corner--bl { bottom: -8px; left: -8px; border-width: 0 0 2px 2px; border-radius: 0 0 0 3px; }
        .lb-corner--br { bottom: -8px; right: -8px; border-width: 0 2px 2px 0; border-radius: 0 0 3px 0; }
        .lb-footer {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
          padding: 10px 22px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          border-radius: 999px;
          color: rgba(255,255,255,0.42);
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          white-space: nowrap; pointer-events: none;
        }
        @media (max-width: 640px) {
          .lb-image { max-width: 92vw; max-height: 58vh; padding: 16px; }
          .lb-stage { padding: 80px 16px 52px; }
          .lb-footer { display: none; }
          .lb-scale-pill, .lb-divider { display: none; }
        }
      `}</style>
    </motion.div>
  );
}

/* ─── Shared Plan Card (used by both Unit Plan and Block Plan) ─────────────── */
function PlanCard({ plan, index, onOpen, coordPrefix }) {
  const [hovered, setHovered] = useState(false);

  const primaryRGB = (() => {
    const hex = COLORS.primary.replace('#', '');
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ].join(',');
  })();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.055 }}
      className="upc-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(plan)}
    >
      {/* Blueprint coordinate label */}
      <div className="upc-coord">
        <span>{coordPrefix || 'REF'}</span>
        <span>{String.fromCharCode(65 + index)}{String(index + 1).padStart(2, '0')}</span>
      </div>

      {/* Thumbnail */}
      <div className="upc-thumb-wrap">
        <div className="upc-thumb-inner">
          <motion.img
            src={plan.image}
            alt={plan.title || plan.name}
            className="upc-thumb-img"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Scan-line overlay on hover */}
        <motion.div
          className="upc-scan-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* View plan CTA */}
        <motion.div
          className="upc-cta-wrap"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
        >
          <span className="upc-cta-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            View Plan
          </span>
        </motion.div>
      </div>

      {/* Info Row */}
      <div className="upc-info">
        <div className="upc-info-left">
          <span className="upc-index">{String(index + 1).padStart(2, '0')}</span>
          <h4 className="upc-title">{plan.title || plan.name}</h4>
          {plan.area && <p className="upc-area">{plan.area}</p>}
        </div>
        <motion.div
          className="upc-arrow"
          animate={{ x: hovered ? 3 : 0, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.22 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom glow bar on hover */}
      <motion.div
        className="upc-glow-bar"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/* ─── Shared Premium Gallery Shell (used by both Unit Plan and Block Plan) ─── */
function PlanGallery({ plans, onOpen, metaLabel, coordPrefix }) {
  return (
    <div className="upc-shell">
      {/* Decorative blueprint rulers */}
      <div className="upc-ruler upc-ruler--h" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="upc-ruler-mark">
            <span>{(i + 1) * 5}m</span>
          </div>
        ))}
      </div>
      <div className="upc-ruler upc-ruler--v" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="upc-ruler-mark">
            <span>{(i + 1) * 5}m</span>
          </div>
        ))}
      </div>

      {/* Grid crosshair corner mark */}
      <div className="upc-origin-mark" aria-hidden="true">
        <div className="upc-origin-cross" />
        <span>0,0</span>
      </div>

      {/* Cards scrollable area */}
      <div className="upc-scroll custom-scrollbar">
        <div className="upc-grid">
          {plans.map((plan, idx) => (
            <PlanCard
              key={idx}
              plan={plan}
              index={idx}
              onOpen={onOpen}
              coordPrefix={coordPrefix}
            />
          ))}
        </div>
      </div>

      {/* Footer meta strip */}
      <div className="upc-meta-strip">
        <span>{plans.length} {metaLabel}</span>
        <span className="upc-meta-dot" />
        <span>Click any card to inspect</span>
        <span className="upc-meta-dot" />
        <span>All dimensions to scale</span>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
export function FloorPlans({ onOpenModal }) {
  const [activeMainTab, setActiveMainTab] = useState("master");
  const [lightbox, setLightbox] = useState(null); // { image, title }

  const mainTabs = [
    { id: "master", label: "Master Plan", sub: "01" },
    { id: "units", label: "Unit Plan", sub: "02" },
    { id: "blocks", label: "Block Plan", sub: "03" },
  ];

  const masterFeatures = [
    "Entry and exit", "Jogging track", "Drop off feature wall",
    "Open gym", "Swimming pool", "Kids' play area",
    "Raised lawn", "Multipurpose court",
  ];

  const openLightbox = (plan) =>
    setLightbox({ image: plan.image, title: plan.title || plan.name });
  const closeLightbox = () => setLightbox(null);

  /* Normalise block data so each item has a consistent shape */
  const blockPlans = floorPlansData.blocks.map((b) => ({
    image: b.image,
    title: b.name,
  }));

  return (
    <>
      <section
        id="floor-plans"
        className="relative overflow-hidden"
        style={{ background: COLORS.darkMid, padding: '112px 0 118px' }}
      >
        <DecorativeShape size={600} opacity={0.12} rotate={0} className="-bottom-40 left-1/2 -translate-x-1/2" />
        {/* Architectural Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="sa-container relative z-10">
          {/* ── Head ── */}
          <div className="floor-head">
            <div>
              <SectionLabel onDark={true}>Space Anatomy</SectionLabel>
              <h2 className="floor-title">
                Plans Crafted<br />
                <span>For Daily Ease</span>
              </h2>
            </div>
            <div className="floor-head-copy">
              <p>
                Master plans, block plans, and unit layouts organized for clear comparison.
                Review the community flow, tower placement, and home formats without visual clutter.
              </p>
              <div className="floor-mini-stats">
                <span>9 Towers</span>
                <span>70% Green Area</span>
                <span>2 and 3 BHK</span>
              </div>
            </div>
          </div>

          <div className="floor-shell">
            {/* ── BLUEPRINT DISPLAY STAGE ── */}
            <div className="floor-stage">
              <div className="floor-toolbar">
                <div>
                  <span className="floor-kicker">Plan Viewer</span>
                  <strong>{mainTabs.find((t) => t.id === activeMainTab)?.label}</strong>
                </div>
                <div className="floor-tabs">
                  {mainTabs.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveMainTab(t.id)}
                      className={activeMainTab === t.id ? 'active' : ''}
                    >
                      <span>{t.sub}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMainTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="floor-plan-card group"
                >
                  {activeMainTab === 'units' && (
                    <PlanGallery
                      plans={floorPlansData.units}
                      onOpen={openLightbox}
                      metaLabel="Unit Typologies"
                      coordPrefix="REF"
                    />
                  )}

                  {activeMainTab === 'blocks' && (
                    <PlanGallery
                      plans={blockPlans}
                      onOpen={openLightbox}
                      metaLabel="Block Plans"
                      coordPrefix="BLK"
                    />
                  )}

                  {activeMainTab === 'master' && (
                    <div className="floor-image-wrap">
                      <div className="floor-axis-label">Ref_Axis: 24.089 / N</div>
                      <img
                        src={floorPlansData.master.image}
                        alt="Master Plan"
                        className="floor-plan-image"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <button
                          onClick={() =>
                            setLightbox({
                              image: floorPlansData.master.image,
                              title: 'Master Plan',
                            })
                          }
                          className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          Inspect Details
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── SIDEBAR SPECS ── */}
            <aside className="floor-side">
              <div className="floor-spec-card">
                <span className="floor-kicker">Technical Summary</span>
                <h3 className="sa-serif">Project Specs</h3>
                <div className="floor-spec-list">
                  {[
                    { l: 'Efficiency', v: '84%' },
                    { l: 'Green Area', v: '70%' },
                    { l: 'Open Side', v: '3-Side' },
                  ].map((s) => (
                    <div key={s.l}>
                      <span>{s.l}</span>
                      <strong>{s.v}</strong>
                    </div>
                  ))}
                </div>
                <button onClick={onOpenModal} className="floor-brochure-btn">
                  Request Brochure
                </button>
              </div>
              <div className="floor-feature-card">
                <div className="floor-kicker">Master Plan Features</div>
                <div>
                  {masterFeatures.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── PREMIUM LIGHTBOX ── */}
      <AnimatePresence>
        {lightbox && (
          <PremiumLightbox
            image={lightbox.image}
            title={lightbox.title}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>

      <WaveDarkToLight fromColor={COLORS.darkMid} toColor={COLORS.warmWhite} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }

        /* ── Head ── */
        #floor-plans .floor-head {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.65fr);
          gap: 56px; align-items: end; margin-bottom: 44px;
        }
        #floor-plans .floor-title {
          color: #fff;
          margin: 14px 0 0;
        }
        #floor-plans .floor-title span { color: ${COLORS.primary}; font-style: italic; }
        #floor-plans .floor-head-copy { border-left: 1px solid rgba(255,255,255,0.12); padding-left: 28px; }
        #floor-plans .floor-head-copy p { color: ${COLORS.mutedDark}; font-size: 15px; line-height: 1.75; margin: 0 0 20px; }
        #floor-plans .floor-mini-stats { display: flex; gap: 8px; flex-wrap: wrap; }
        #floor-plans .floor-mini-stats span,
        #floor-plans .floor-kicker {
          color: ${COLORS.primary}; font-size: 10px; font-weight: 800;
          letter-spacing: 0.18em; text-transform: uppercase;
        }
        #floor-plans .floor-mini-stats span {
          color: rgba(255,255,255,0.58);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px; padding: 8px 11px; letter-spacing: 0.12em;
        }

        /* ── Shell ── */
        #floor-plans .floor-shell {
          display: grid; grid-template-columns: minmax(0, 1fr) 330px;
          gap: 22px; align-items: start;
        }
        #floor-plans .floor-stage, #floor-plans .floor-side { min-width: 0; }

        /* ── Toolbar ── */
        #floor-plans .floor-toolbar {
          display: flex; justify-content: space-between; align-items: center;
          gap: 18px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px 18px 0 0; padding: 16px 18px; border-bottom: 0;
        }
        #floor-plans .floor-toolbar strong { display: block; color: #fff; font-size: 18px; margin-top: 4px; }
        #floor-plans .floor-tabs {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px; background: rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px; padding: 5px;
        }
        #floor-plans .floor-tabs button {
          border: 0; border-radius: 999px; background: transparent;
          color: rgba(255,255,255,0.5); padding: 9px 14px;
          font-size: 10px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; cursor: pointer;
          transition: background .25s, color .25s; white-space: nowrap;
        }
        #floor-plans .floor-tabs button span { opacity: 0.55; margin-right: 7px; }
        #floor-plans .floor-tabs button.active { background: ${COLORS.primary}; color: ${COLORS.darkNavy}; }

        /* ── Plan Card ── */
        #floor-plans .floor-plan-card {
          position: relative; height: 610px;
          background: linear-gradient(135deg, rgba(13,15,9,0.96), rgba(28,31,22,0.96));
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 0 0 22px 22px; overflow: hidden;
          box-shadow: 0 28px 80px rgba(0,0,0,0.2);
        }

        /* ── Master image ── */
        #floor-plans .floor-image-wrap {
          position: relative; height: 100%; display: flex;
          align-items: center; justify-content: center; padding: 42px;
        }
        #floor-plans .floor-axis-label {
          position: absolute; top: 24px; left: 28px;
          color: rgba(255,255,255,0.22); font-size: 9px; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase;
        }
        #floor-plans .floor-plan-image {
          max-width: 100%; max-height: 100%; object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.45));
        }

        /* ── Sidebar ── */
        #floor-plans .floor-side { position: sticky; top: 96px; display: grid; gap: 16px; }
        #floor-plans .floor-spec-card, #floor-plans .floor-feature-card {
          border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.045);
          border-radius: 20px; padding: 24px; box-shadow: 0 18px 60px rgba(0,0,0,0.14);
        }
        #floor-plans .floor-spec-card h3 {
          color: #fff; font-size: 34px; line-height: 1; font-weight: 600; margin: 10px 0 22px;
        }
        #floor-plans .floor-spec-list { display: grid; gap: 0; border-top: 1px solid rgba(255,255,255,0.08); }
        #floor-plans .floor-spec-list div {
          display: flex; justify-content: space-between; align-items: baseline;
          gap: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 14px 0;
        }
        #floor-plans .floor-spec-list span {
          color: rgba(255,255,255,0.42); font-size: 10px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
        }
        #floor-plans .floor-spec-list strong { color: #fff; font-size: 18px; }
        #floor-plans .floor-brochure-btn {
          width: 100%; margin-top: 22px; border: 0; border-radius: 999px;
          background: ${COLORS.primary}; color: ${COLORS.darkNavy};
          padding: 14px 18px; font-size: 10px; font-weight: 900;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          transition: opacity .2s;
        }
        #floor-plans .floor-brochure-btn:hover { opacity: 0.88; }
        #floor-plans .floor-feature-card > div:last-child { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
        #floor-plans .floor-feature-card span {
          border: 1px solid rgba(255,255,255,0.1); border-radius: 999px;
          color: rgba(255,255,255,0.62); padding: 8px 10px;
          font-size: 11px; font-weight: 700;
        }

        /* ════════════════════════════════════════════════
           PREMIUM PLAN GALLERY (Unit + Block shared)
        ════════════════════════════════════════════════ */
        .upc-shell {
          position: relative; height: 100%; overflow: hidden;
          display: flex; flex-direction: column;
        }

        /* Blueprint rulers */
        .upc-ruler {
          position: absolute; display: flex; z-index: 2; pointer-events: none;
        }
        .upc-ruler--h {
          top: 0; left: 28px; right: 0; height: 22px;
          flex-direction: row; align-items: flex-end;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .upc-ruler--v {
          top: 22px; left: 0; bottom: 40px; width: 22px;
          flex-direction: column; align-items: flex-end;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .upc-ruler-mark {
          flex: 1; position: relative;
          display: flex; align-items: center; justify-content: center;
        }
        .upc-ruler--h .upc-ruler-mark { border-left: 1px solid rgba(255,255,255,0.1); }
        .upc-ruler--v .upc-ruler-mark { border-top: 1px solid rgba(255,255,255,0.1); }
        .upc-ruler-mark span {
          font-size: 7px; font-weight: 700; letter-spacing: 0.08em;
          color: rgba(255,255,255,0.2); text-transform: uppercase;
        }
        .upc-ruler--v .upc-ruler-mark span { transform: rotate(-90deg); white-space: nowrap; }

        /* Origin mark */
        .upc-origin-mark {
          position: absolute; top: 0; left: 0; width: 28px; height: 22px;
          display: flex; align-items: center; justify-content: center;
          z-index: 3; pointer-events: none;
        }
        .upc-origin-mark > span {
          font-size: 6px; font-weight: 800; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.28); line-height: 1;
        }

        /* Scroll area */
        .upc-scroll {
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding: 30px 28px 16px 36px;
          margin-top: 22px;
        }

        /* Grid */
        .upc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 14px;
        }

        /* Unit / Block Card */
        .upc-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            transform 0.3s ease;
          display: flex; flex-direction: column;
        }
        .upc-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(${(() => {
          const hex = COLORS.primary.replace('#', '');
          return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)].join(',');
        })()}, 0.38);
          box-shadow:
            0 0 0 1px rgba(${(() => {
          const hex = COLORS.primary.replace('#', '');
          return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)].join(',');
        })()}, 0.18),
            0 16px 48px rgba(0,0,0,0.32),
            inset 0 1px 0 rgba(255,255,255,0.06);
          transform: translateY(-3px);
        }

        /* Coordinate label */
        .upc-coord {
          position: absolute; top: 10px; right: 12px;
          display: flex; flex-direction: column; align-items: flex-end;
          z-index: 4; pointer-events: none; gap: 1px;
        }
        .upc-coord span:first-child {
          font-size: 7px; font-weight: 800; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.2); text-transform: uppercase;
        }
        .upc-coord span:last-child {
          font-size: 9px; font-weight: 800; letter-spacing: 0.14em;
          color: ${COLORS.primary}; opacity: 0.7;
        }

        /* Thumbnail */
        .upc-thumb-wrap {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.96);
          height: 158px; flex-shrink: 0;
          border-radius: 12px 12px 0 0;
        }
        .upc-thumb-inner {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          padding: 18px; overflow: hidden;
        }
        .upc-thumb-img {
          width: 100%; height: 100%; object-fit: contain;
          transform-origin: center; will-change: transform;
        }

        /* Scan-line hover overlay */
        .upc-scan-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(${(() => {
          const hex = COLORS.primary.replace('#', '');
          return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)].join(',');
        })()}, 0.04) 3px,
            rgba(${(() => {
          const hex = COLORS.primary.replace('#', '');
          return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)].join(',');
        })()}, 0.04) 4px
          );
        }

        /* View plan CTA */
        .upc-cta-wrap {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .upc-cta-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 18px;
          background: rgba(10,11,8,0.82);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          color: #fff;
          font-size: 10px; font-weight: 800;
          letter-spacing: 0.16em; text-transform: uppercase;
          pointer-events: none;
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }

        /* Info row */
        .upc-info {
          padding: 14px 16px 14px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .upc-info-left { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .upc-index {
          font-size: 9px; font-weight: 800; letter-spacing: 0.18em;
          color: ${COLORS.primary}; text-transform: uppercase;
        }
        .upc-title {
          color: #fff; font-size: 13px; font-weight: 600;
          margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          line-height: 1.3;
        }
        .upc-area {
          color: rgba(255,255,255,0.4); font-size: 10px; font-weight: 700;
          margin: 0; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .upc-arrow { color: rgba(255,255,255,0.55); flex-shrink: 0; }

        /* Bottom glow bar */
        .upc-glow-bar {
          position: absolute; bottom: 0; left: 12px; right: 12px; height: 2px;
          background: linear-gradient(90deg, transparent, ${COLORS.primary}, transparent);
          border-radius: 999px; transform-origin: center;
        }

        /* Meta footer strip */
        .upc-meta-strip {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; padding: 11px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.18);
          flex-shrink: 0;
        }
        .upc-meta-strip span {
          color: rgba(255,255,255,0.3); font-size: 9px; font-weight: 800;
          letter-spacing: 0.14em; text-transform: uppercase;
        }
        .upc-meta-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,0.15); flex-shrink: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          #floor-plans .floor-head, #floor-plans .floor-shell { grid-template-columns: 1fr; }
          #floor-plans .floor-head-copy { border-left: 0; padding-left: 0; }
          #floor-plans .floor-side { position: static; grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 640px) {
          #floor-plans { padding: 86px 0 92px !important; }
          #floor-plans .floor-title { font-size: 52px; }
          #floor-plans .floor-toolbar {
            align-items: stretch; flex-direction: column; border-radius: 16px 16px 0 0;
          }
          #floor-plans .floor-tabs { grid-template-columns: 1fr; border-radius: 14px; }
          #floor-plans .floor-tabs button { text-align: center; }
          #floor-plans .floor-plan-card { height: 560px; }
          #floor-plans .floor-image-wrap { padding: 24px; }
          #floor-plans .floor-side { grid-template-columns: 1fr; }
          .upc-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .upc-scroll { padding: 22px 14px 12px 22px; }
          .upc-thumb-wrap { height: 130px; }
          .upc-meta-strip { display: none; }
        }

        @media (max-width: 380px) {
          .upc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
