import { useState } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { pastProjects, developerMetrics } from '../../data/projectsData';
import { DecorativeShape } from '../common/DecorativeShape';

export function About() {
  const [activeProject, setActiveProject] = useState(0); // Default to first project expanded
  useCounter();

  return (
    <>
      <section
        id="about"
        className="sa-sans sa-section"
        style={{
          background: COLORS.luxBeige,
          position: "relative",
          overflow: "hidden",
          padding: "112px 0 112px 0",
          color: COLORS.textDark,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <DecorativeShape size={600} opacity={0.12} rotate={15} className="-top-40 -right-20" />
        {/* ── ABSTRACT SVG PATH ANIMATION (Background) ── */}
        <div className="about-svg-bg">
          <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path
              className="animated-stroke"
              d="M-100,500 C200,200 400,800 600,400 C800,0 1000,600 1200,300"
              fill="none"
              stroke={`${COLORS.primary}25`}
              strokeWidth="2"
            />
            <path
              className="animated-stroke-delayed"
              d="M-100,600 C250,900 350,100 700,500 C900,800 1100,200 1200,600"
              fill="none"
              stroke={`${COLORS.textDark}08`}
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* ── SPLIT CANVAS LAYOUT ── */}
        <div className="sa-container about-split-canvas" style={{ position: 'relative', zIndex: 2, flex: 1 }}>

          {/* LEFT PANEL: Sticky Typography & Metrics */}
          <div className="about-left-panel">
            <div className="about-sticky-content">
              <SectionLabel onDark={false}>Developer Profile</SectionLabel>

              <h2 className="about-canvas-title" style={{ color: COLORS.textDark }}>
                Timebound<br />
                <span style={{ color: COLORS.primary, fontWeight: 900 }}>Timeless.</span>
              </h2>

              <div className="about-glass-metrics">
                {developerMetrics.map(({ target, suffix, label, color }) => (
                  <div key={label} className="canvas-metric-item">
                    <div className="canvas-metric-val" style={{ color }}>
                      <span data-counter data-target={target}>0</span>{suffix}
                    </div>
                    <div className="canvas-metric-lbl">{label}</div>
                  </div>
                ))}
              </div>

              <div className="about-canvas-quote">
                <svg className="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 1.5 1.5L5 21z"></path>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.5c0 1.5-.5 3-3 5"></path>
                </svg>
                <p>Growing up, we all had the opportunity to enjoy nature at its best. We wanted to gift families a present enjoyed for years to come.</p>
                <span className="quote-author">— Founding Chairman, Subham Group</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Interactive Interactive Accordion */}
          <div className="about-right-panel">
            <div className="portfolio-header">
              <h3 style={{ color: COLORS.textDark }}>Heritage Portfolio</h3>
              <div className="portfolio-divider" style={{ background: "rgba(26,28,20,0.08)" }} />
              <span style={{ color: COLORS.primary }}>{pastProjects.length} UNITS DELIVERED</span>
            </div>

            <div className="portfolio-accordion">
              {pastProjects.map(([name, sub], i) => {
                const isActive = activeProject === i;
                return (
                  <div
                    key={name}
                    className={`accordion-pane ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveProject(i)}
                  >
                    <div className="pane-glass-bg" />

                    <div className="pane-content-wrapper">
                      <div className="pane-index">0{i + 1}</div>

                      <div className="pane-details">
                        <h4 className="pane-name">{name}</h4>
                        <p className="pane-sub">{sub}</p>
                      </div>

                      <div className="pane-indicator">
                        <div className="indicator-dot" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="about-canvas-footer">
              <p>Since 2007, Subham Group has been Guwahati's premier real estate developer — known for innovations and exceptional service. Every project is a testament to quality living across Northeast India.</p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════ STYLES ═══════════════════════════════════════ */}
        <style>{`
          /* ── LAYOUT FOUNDATION ── */
          .about-split-canvas {
            display: flex;
            gap: 76px;
            align-items: flex-start;
            padding-bottom: 80px;
          }

          .about-left-panel {
            flex: 0 0 45%;
            position: relative;
          }

          .about-right-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          .about-sticky-content {
            position: sticky;
            top: 120px; /* Adjust based on your nav height */
            display: flex;
            flex-direction: column;
            gap: 40px;
          }

          /* ── BACKGROUND ANIMATIONS ── */
          .about-svg-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
          }

          .about-svg-bg svg {
            width: 100%;
            height: 100%;
          }

          .animated-stroke {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawPath 12s linear infinite alternate;
          }

          .animated-stroke-delayed {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawPath 15s linear infinite alternate-reverse;
          }

          @keyframes drawPath {
            to { stroke-dashoffset: 0; }
          }

          /* ── LEFT PANEL TYPOGRAPHY & METRICS ── */
          .about-canvas-title {
            margin: 0;
          }

          .text-yellow {
            color: ${COLORS.primary};
            font-weight: 900;
          }

          .about-glass-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            background: rgba(255,255,255,0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(26,28,20,0.08);
            border-radius: 14px;
            padding: 30px;
          }

          .canvas-metric-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .canvas-metric-val {
            font-family: 'Outfit', sans-serif;
            font-size: 32px;
            font-weight: 800;
            line-height: 1;
          }

          .canvas-metric-lbl {
            font-size: 10px;
            color: ${COLORS.mutedLight};
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          .about-canvas-quote {
            position: relative;
            padding-left: 20px;
            border-left: 1px solid ${COLORS.primary}4D;
          }

          .quote-icon {
            margin-bottom: 16px;
            opacity: 0.5;
          }

          .about-canvas-quote p {
            font-size: var(--sa-font-size-p);
            line-height: 1.6;
            color: ${COLORS.textMid};
            font-style: italic;
            margin: 0 0 var(--sa-spacing-label-to-heading) 0;
          }

          .quote-author {
            font-size: 11px;
            color: ${COLORS.mutedLight};
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          /* ── RIGHT PANEL INTERACTIVE ACCORDION ── */
          .portfolio-header {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .portfolio-header h3 {
            font-size: 12px;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            margin: 0;
          }

          .portfolio-divider {
            flex: 1;
            height: 1px;
            background: rgba(255,255,255,0.1);
          }

          .portfolio-header span {
            font-size: 10px;
            color: ${COLORS.yellow};
            font-weight: 700;
            letter-spacing: 0.12em;
          }

          .portfolio-accordion {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .accordion-pane {
            position: relative;
            height: 70px;
            border-radius: 10px;
            overflow: hidden;
            cursor: pointer;
            transition: height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            border: 1px solid rgba(255,255,255,0.03);
          }

          .accordion-pane.is-active {
            height: 200px;
            border-color: ${COLORS.primary}33;
          }

          .pane-glass-bg {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.3);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            transition: background 0.4s ease;
          }

          .accordion-pane.is-active .pane-glass-bg {
            background: linear-gradient(to right, rgba(255,255,255,0.7), transparent);
          }

          .pane-content-wrapper {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 30px;
            gap: 30px;
          }

          .pane-index {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 700;
            color: rgba(255,255,255,0.2);
            transition: color 0.4s ease, transform 0.4s ease;
          }

          .accordion-pane.is-active .pane-index {
            color: ${COLORS.primary};
            transform: scale(1.2);
          }

          .pane-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            opacity: 0.5;
            transform: translateY(10px);
            transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .accordion-pane.is-active .pane-details {
            opacity: 1;
            transform: translateY(0);
          }

          .pane-name {
            font-size: 22px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: ${COLORS.textDark};
          }

          .pane-sub {
            font-size: 12px;
            color: ${COLORS.mutedLight};
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin: 0;
          }

          .pane-indicator {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.1);
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .indicator-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            transition: background 0.4s ease, transform 0.4s ease;
          }

          .accordion-pane.is-active .indicator-dot {
            background: ${COLORS.primary};
            transform: scale(1.5);
          }

          .about-canvas-footer {
            margin-top: 20px;
            padding-top: 40px;
            border-top: 1px solid rgba(255,255,255,0.05);
          }

          .about-canvas-footer p {
            font-size: 12px;
            line-height: 1.8;
            color: ${COLORS.mutedLight};
          }

          /* ── RESPONSIVE ── */
          @media (max-width: 1024px) {
            .about-split-canvas {
              flex-direction: column;
              gap: 60px;
            }
            .about-left-panel {
              flex: none;
              width: 100%;
            }
            .about-sticky-content {
              position: static;
            }
            .about-glass-metrics {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 640px) {
            .about-glass-metrics {
              grid-template-columns: 1fr;
            }
            .pane-content-wrapper {
              padding: 0 20px;
              gap: 16px;
            }
            .pane-name {
              font-size: 18px;
            }
            .accordion-pane.is-active {
              height: 160px;
            }
          }
        `}</style>

      </section>

      <WaveLightToDark fromColor={COLORS.luxBeige} toColor={COLORS.darkNavy} />
    </>
  );
}
