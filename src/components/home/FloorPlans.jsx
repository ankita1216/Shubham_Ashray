import { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { floorPlansData } from '../../data/floorPlansData';
import { motion, AnimatePresence } from 'framer-motion';

export function FloorPlans({ onOpenModal }) {
  const [activeMainTab, setActiveMainTab] = useState("master");
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainTabs = [
    { id: "master", label: "Master Plan", sub: "01" },
    { id: "units", label: "Unit Plan", sub: "02" },
    { id: "blocks", label: "Block Plan", sub: "03" }
  ];

  const masterFeatures = [
    "Entry and exit",
    "Jogging track",
    "Drop off feature wall",
    "Open gym",
    "Swimming pool",
    "Kids' play area",
    "Raised lawn",
    "Multipurpose court",
  ];

  // Helper to get current image
  const getActiveImage = () => {
    if (activeMainTab === 'master') return floorPlansData.master.image;
    if (activeMainTab === 'blocks') return floorPlansData.blocks[activeBlockIndex].image;
    return null; // Units uses a grid
  };

  return (
    <>
      <section id="floor-plans" className="relative overflow-hidden" style={{ background: COLORS.darkMid, padding: "112px 0 118px" }}>
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

        <div className="sa-container relative z-10">
          <div className="floor-head">
            <div>
              <SectionLabel onDark={true}>Space Anatomy</SectionLabel>
              <h2 className="sa-serif floor-title">
                Plans Crafted<br />
                <span>For Daily Ease.</span>
              </h2>
            </div>
            <div className="floor-head-copy">
              <p>
                Master plans, block plans, and unit layouts organized for clear comparison. Review the community flow, tower placement, and home formats without visual clutter.
              </p>
              <div className="floor-mini-stats">
                <span>9 Towers</span>
                <span>70% Green Area</span>
                <span>2 and 3 BHK</span>
              </div>
            </div>
          </div>

          <div className="floor-shell">
            {/* BLUEPRINT DISPLAY STAGE */}
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
                  key={activeMainTab + (activeMainTab === 'blocks' ? activeBlockIndex : '')}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="floor-plan-card group"
                >
                  {activeMainTab === 'units' ? (
                    /* UNITS GRID VIEW */
                    <div className="h-full overflow-y-auto custom-scrollbar floor-unit-scroll">
                      <div className="floor-unit-grid">
                        {floorPlansData.units.map((plan, idx) => (
                          <div key={idx} className="floor-unit-card" onClick={() => { setIsZoomed(plan.image) }}>
                            <div className="floor-unit-thumb">
                              <img src={plan.image} alt={plan.title} />
                            </div>
                            <div>
                              <span>{String(idx + 1).padStart(2, '0')}</span>
                              <h4>{plan.title}</h4>
                              <p>Tap to inspect layout</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* MASTER & BLOCK IMAGE VIEW */
                    <div className="floor-image-wrap">
                      {/* Scale / Coordinates Decor */}
                      <div className="floor-axis-label">
                        Ref_Axis: 24.089 / N
                      </div>

                      <img
                        src={getActiveImage()}
                        alt="Blueprint"
                        className={`floor-plan-image ${activeMainTab === 'blocks' ? 'is-block-plan' : ''}`}
                      />

                      {/* Hover Overlay Controls */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <button
                          onClick={() => setIsZoomed(getActiveImage())}
                          className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                          Inspect Details
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* BLOCK SELECTOR SUB-MENU */}
              {activeMainTab === 'blocks' && (
                <div className="floor-block-tabs">
                  {floorPlansData.blocks.map((block, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveBlockIndex(idx)}
                      className={activeBlockIndex === idx ? 'active' : ''}
                    >
                      {block.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* SIDEBAR SPECS */}
            <aside className="floor-side">
                <div className="floor-spec-card">
                  <span className="floor-kicker">Technical Summary</span>
                  <h3 className="sa-serif">Project Specs</h3>
                  <div className="floor-spec-list">
                    {[
                      { l: "Efficiency", v: "84%" },
                      { l: "Green Area", v: "70%" },
                      { l: "Open Side", v: "3-Side" }
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
                      <span key={feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FULLSCREEN ZOOM MODAL */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center p-4 md:p-20"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center overflow-auto custom-scrollbar"
            >
              <img src={isZoomed} alt="Zoomed View" className="max-w-none w-auto h-[120vh] md:h-[150vh] object-contain cursor-grab active:cursor-grabbing" />
            </motion.div>

            <div className="absolute bottom-10 px-8 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[10px] uppercase tracking-widest font-bold">
              Scroll to explore every corner
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WaveDarkToLight fromColor={COLORS.darkMid} toColor={COLORS.warmWhite} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

        #floor-plans .floor-head {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.65fr);
          gap: 56px;
          align-items: end;
          margin-bottom: 44px;
        }

        #floor-plans .floor-title {
          color: #fff;
          font-size: clamp(44px, 5.4vw, 74px);
          line-height: 0.96;
          font-weight: 600;
          letter-spacing: 0;
          margin: 14px 0 0;
        }

        #floor-plans .floor-title span {
          color: ${COLORS.primary};
          font-style: italic;
        }

        #floor-plans .floor-head-copy {
          border-left: 1px solid rgba(255,255,255,0.12);
          padding-left: 28px;
        }

        #floor-plans .floor-head-copy p {
          color: ${COLORS.mutedDark};
          font-size: 15px;
          line-height: 1.75;
          margin: 0 0 20px;
        }

        #floor-plans .floor-mini-stats {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        #floor-plans .floor-mini-stats span,
        #floor-plans .floor-kicker {
          color: ${COLORS.primary};
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        #floor-plans .floor-mini-stats span {
          color: rgba(255,255,255,0.58);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 8px 11px;
          letter-spacing: 0.12em;
        }

        #floor-plans .floor-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 330px;
          gap: 22px;
          align-items: start;
        }

        #floor-plans .floor-stage,
        #floor-plans .floor-side {
          min-width: 0;
        }

        #floor-plans .floor-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px 18px 0 0;
          padding: 16px 18px;
          border-bottom: 0;
        }

        #floor-plans .floor-toolbar strong {
          display: block;
          color: #fff;
          font-size: 18px;
          margin-top: 4px;
        }

        #floor-plans .floor-tabs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 6px;
          background: rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 5px;
        }

        #floor-plans .floor-tabs button {
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: rgba(255,255,255,0.5);
          padding: 9px 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background .25s, color .25s;
          white-space: nowrap;
        }

        #floor-plans .floor-tabs button span {
          opacity: 0.55;
          margin-right: 7px;
        }

        #floor-plans .floor-tabs button.active {
          background: ${COLORS.primary};
          color: ${COLORS.darkNavy};
        }

        #floor-plans .floor-plan-card {
          position: relative;
          height: 610px;
          background: linear-gradient(135deg, rgba(13,15,9,0.96), rgba(28,31,22,0.96));
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 0 0 22px 22px;
          overflow: hidden;
          box-shadow: 0 28px 80px rgba(0,0,0,0.2);
        }

        #floor-plans .floor-image-wrap {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 42px;
        }

        #floor-plans .floor-axis-label {
          position: absolute;
          top: 24px;
          left: 28px;
          color: rgba(255,255,255,0.22);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        #floor-plans .floor-plan-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.45));
        }

        #floor-plans .floor-plan-image.is-block-plan {
          background: #fff;
          padding: 24px;
          border-radius: 14px;
        }

        #floor-plans .floor-unit-scroll {
          padding: 28px;
        }

        #floor-plans .floor-unit-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        #floor-plans .floor-unit-card {
          display: grid;
          grid-template-columns: 112px 1fr;
          align-items: center;
          gap: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.045);
          border-radius: 16px;
          padding: 16px;
          cursor: pointer;
          transition: background .25s, transform .25s;
        }

        #floor-plans .floor-unit-card:hover {
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        #floor-plans .floor-unit-thumb {
          height: 112px;
          background: #fff;
          border-radius: 10px;
          padding: 10px;
        }

        #floor-plans .floor-unit-thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        #floor-plans .floor-unit-card span {
          color: ${COLORS.primary};
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        #floor-plans .floor-unit-card h4 {
          color: #fff;
          font-size: 15px;
          margin: 6px 0 4px;
        }

        #floor-plans .floor-unit-card p {
          color: rgba(255,255,255,0.42);
          font-size: 11px;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 700;
        }

        #floor-plans .floor-block-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        #floor-plans .floor-block-tabs button {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.48);
          border-radius: 999px;
          padding: 10px 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          cursor: pointer;
        }

        #floor-plans .floor-block-tabs button.active {
          background: ${COLORS.primary};
          color: ${COLORS.darkNavy};
        }

        #floor-plans .floor-side {
          position: sticky;
          top: 96px;
          display: grid;
          gap: 16px;
        }

        #floor-plans .floor-spec-card,
        #floor-plans .floor-feature-card {
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 18px 60px rgba(0,0,0,0.14);
        }

        #floor-plans .floor-spec-card h3 {
          color: #fff;
          font-size: 34px;
          line-height: 1;
          font-weight: 600;
          margin: 10px 0 22px;
        }

        #floor-plans .floor-spec-list {
          display: grid;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        #floor-plans .floor-spec-list div {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 14px 0;
        }

        #floor-plans .floor-spec-list span {
          color: rgba(255,255,255,0.42);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        #floor-plans .floor-spec-list strong {
          color: #fff;
          font-size: 18px;
        }

        #floor-plans .floor-brochure-btn {
          width: 100%;
          margin-top: 22px;
          border: 0;
          border-radius: 999px;
          background: ${COLORS.primary};
          color: ${COLORS.darkNavy};
          padding: 14px 18px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
        }

        #floor-plans .floor-feature-card > div:last-child {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
        }

        #floor-plans .floor-feature-card span {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          color: rgba(255,255,255,0.62);
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          #floor-plans .floor-head,
          #floor-plans .floor-shell {
            grid-template-columns: 1fr;
          }

          #floor-plans .floor-head-copy {
            border-left: 0;
            padding-left: 0;
          }

          #floor-plans .floor-side {
            position: static;
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          #floor-plans {
            padding: 86px 0 92px !important;
          }

          #floor-plans .floor-title {
            font-size: 52px;
          }

          #floor-plans .floor-toolbar {
            align-items: stretch;
            flex-direction: column;
            border-radius: 16px 16px 0 0;
          }

          #floor-plans .floor-tabs {
            grid-template-columns: 1fr;
            border-radius: 14px;
          }

          #floor-plans .floor-tabs button {
            text-align: center;
          }

          #floor-plans .floor-plan-card {
            height: 520px;
          }

          #floor-plans .floor-image-wrap {
            padding: 24px;
          }

          #floor-plans .floor-unit-grid,
          #floor-plans .floor-side {
            grid-template-columns: 1fr;
          }

          #floor-plans .floor-unit-card {
            grid-template-columns: 92px 1fr;
          }

          #floor-plans .floor-unit-thumb {
            height: 92px;
          }
        }
      `}</style>
    </>
  );
}
