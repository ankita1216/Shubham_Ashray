import { useState, useRef, useEffect } from 'react';
import { COLORS } from '../../constants/colors';
import { WaveLightToDark } from '../common/Dividers';
import { SectionLabel } from '../common/SectionLabel';
import { galleryData } from '../../data/galleryData';

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
  .gal-ghost-num {
    font-size: 58px;
  }
}

@media (max-width: 430px) {
  .gal-grid {
    gap: 8px;
  }
  .gal-item-cell {
    height: 190px;
  }
  .gal-item-cell:first-child {
    height: 240px;
  }
}
`;

export function Gallery() {
  const total = galleryData.length;
  const cursorRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const onMove = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* ── mosaic layout definition ──
     Each cell: { col: start (1-based), span, rowSpan?, h }
     Two rows of different heights, 12-column grid */
  const layout = [
    // Row A — tall | medium | tall
    { idx: 0, cols: '1 / span 5', h: 440 },
    { idx: 1, cols: '6 / span 4', h: 440 },
    { idx: 2, cols: '10 / span 3', h: 440 },
    // Row B — small | big | small
    { idx: 3, cols: '1 / span 3', h: 300 },
    { idx: 4, cols: '4 / span 6', h: 300 },
    { idx: 5, cols: '10 / span 3', h: 300 },
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* ── Custom blob cursor ── */}
      <div
        ref={cursorRef}
        className={`gal-cursor${cursorVisible ? ' show' : ''}`}
        style={{ background: COLORS.primary }}
      >
        View
      </div>

      <section id="gallery" className="sa-sans" style={{ background: COLORS.luxBeige, overflow: 'hidden' }}>

        {/* ── Header ── */}
        <div className="sa-container" style={{ paddingTop: 92, position: 'relative' }}>
          {/* watermark behind */}
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

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <SectionLabel onDark={false}>Selected Portfolio</SectionLabel>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(46px, 6vw, 82px)',
                fontWeight: 600, margin: 0,
                lineHeight: 0.94, letterSpacing: 0,
                color: COLORS.textDark,
              }}>
                Visual<br />
                <em style={{ color: COLORS.primary, fontStyle: 'italic' }}>Excellence.</em>
              </h2>
            </div>

            <div style={{ paddingBottom: 6, textAlign: 'right' }}>
              <p style={{
                fontSize: 34, fontWeight: 800,
                color: `${COLORS.textDark}15`,
                margin: 0, lineHeight: 1,
                letterSpacing: '-0.01em',
              }}>
                {total.toString().padStart(2, '0')}
              </p>
              <p style={{
                fontSize: 9, letterSpacing: '0.22em',
                fontWeight: 700,
                color: `${COLORS.textDark}35`,
                textTransform: 'uppercase', margin: '4px 0 0',
              }}>
                Projects
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
            return (
              <div
                key={cell.idx}
                className="gal-item gal-item-cell"
                style={{ '--desktop-col': cell.cols, '--cell-height': `${cell.h}px` }}
                onMouseEnter={() => setCursorVisible(true)}
                onMouseLeave={() => setCursorVisible(false)}
              >
                <img src={item.image} alt={item.label} />
                <div className="gal-overlay" />

                {/* ghost number */}
                <div className="gal-ghost-num">{num.toString().padStart(2, '0')}</div>

                {/* corner accents */}
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

                {/* label */}
                <div className="gal-label">
                  <p style={{
                    fontSize: 9, letterSpacing: '0.22em',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.5)',
                    textTransform: 'uppercase', margin: '0 0 5px',
                  }}>
                    Design — {num.toString().padStart(2, '0')}
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(15px, 1.8vw, 22px)',
                    fontStyle: 'italic', fontWeight: 600, color: '#fff',
                    margin: 0, lineHeight: 1.2,
                  }}>
                    {item.label}
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
          margin: '44px 0 0',
          padding: '13px 0',
        }}>
          <div className="gal-ticker-track">
            {[...galleryData, ...galleryData].map((item, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center',
                gap: 44, padding: '0 44px',
                fontSize: 12, letterSpacing: '0.18em',
                fontWeight: 700,
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
            fontSize: 9, letterSpacing: '0.22em',
            fontWeight: 700,
            color: `${COLORS.textDark}28`,
            textTransform: 'uppercase', margin: 0,
          }}>
            Hover to Explore · Crafted with Precision
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {galleryData.slice(0, 6).map((_, i) => (
              <div key={i} style={{
                width: i === 0 ? 20 : 5, height: 1.5, borderRadius: 2,
                background: i === 0 ? COLORS.primary : `${COLORS.textDark}20`,
                transition: 'width 0.3s',
              }} />
            ))}
          </div>
        </div>
      </section>

      <WaveLightToDark fromColor={COLORS.luxBeige} toColor={COLORS.darkMid} />
    </>
  );
}
