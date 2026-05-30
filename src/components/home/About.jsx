import { useState } from 'react';
import { useCounter } from '../../hooks/useCounter';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { projectCategories, developerMetrics } from '../../data/projectsData';
import { DecorativeShape } from '../common/DecorativeShape';
import developerLogo from '../../assets/images/footer-removebg-preview.png';

export function About() {
  const [activeCategory, setActiveCategory] = useState(0);
  useCounter();

  const completedProjectsCount = projectCategories
    .filter(({ title }) => title !== "Ongoing Projects")
    .reduce((total, { projects }) => total + projects.length, 0);

  return (
    <>
      <section
        id="about"
        className="sa-sans sa-section"
        style={{
          background: COLORS.luxBeige,
          position: "relative",
          overflow: "hidden",
          padding: "80px 0",
          color: COLORS.textDark,
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="developer-profile-header-wrap">
                  <SectionLabel onDark={false}>Developer Profile</SectionLabel>
                  <img 
                    src={developerLogo} 
                    alt="Developer Logo" 
                    className="developer-profile-header-logo"
                  />
                </div>

                <h2 className="about-canvas-title" style={{ color: COLORS.textDark, margin: 0 }}>
                  <span className="line-block">
                    Time<span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 300, display: 'inline-block', verticalAlign: 'middle', transform: 'translateY(-0.06em)', margin: '0 0.05em' }}>-</span>Bound <em style={{ color: COLORS.primary, fontWeight: 300, fontStyle: 'italic' }}>Projects</em>
                  </span>
                  <span className="line-block">
                    and Timeless <em style={{ color: COLORS.primary, fontWeight: 300, fontStyle: 'italic' }}>Relationships</em>
                  </span>
                </h2>
              </div>

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

              {/* Developer description card */}
              <div style={{
                background: "rgba(255, 255, 255, 0.42)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(26, 28, 20, 0.06)",
                borderRadius: "14px",
                padding: "28px 24px",
                boxShadow: "0 10px 30px rgba(26, 28, 20, 0.03)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}>
                <p style={{
                  fontSize: "13px",
                  lineHeight: "1.7",
                  color: COLORS.textMid,
                  margin: 0,
                  fontWeight: 500,
                  fontFamily: "var(--sa-font-body), sans-serif",
                }}>
                  Since 2007, Subham Group has been the silent force behind Assam’s skyline, blending architectural bravery with the warmth of a home. Based in Guwahati, we are known for innovation, timely delivery, and dedicated customer support. Driven by passion, we create lasting value through time-bound projects and timeless relationships.
                </p>
              </div>


            </div>
          </div>

          {/* RIGHT PANEL: Enhanced Interactive Accordion */}
          <div className="about-right-panel">
            <div className="portfolio-header">
              <h3 style={{ color: COLORS.textDark }}>Heritage Portfolio</h3>
              <div className="portfolio-divider" style={{ background: "rgba(26,28,20,0.08)" }} />
              <span className="portfolio-count-badge">
                <span className="portfolio-count-dot" />
                {completedProjectsCount} DELIVERED
              </span>
            </div>

            <div className="portfolio-category-grid">
              {projectCategories.map(({ title, eyebrow, projects }, i) => {
                const isActive = activeCategory === i;
                return (
                  <div
                    key={title}
                    className={`portfolio-category-card ${isActive ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveCategory(i)}
                  >
                    {/* Subtle inner glow on active */}
                    <div className="category-glass-bg" />
                    <div className="category-accent-bar" />

                    <div className="category-head">
                      <div className="category-index-pill">
                        <span>0{i + 1}</span>
                      </div>

                      <div className="category-title-wrap">
                        {eyebrow && <span className="category-eyebrow">{eyebrow}</span>}
                        <h4 className="category-name">{title}</h4>
                      </div>

                      <div className="category-count-wrap">
                        <div className="category-count">{projects.length}</div>
                        <div className="category-count-sub">projects</div>
                      </div>
                    </div>

                    {/* Project list — refined rows instead of chips */}
                    <div className="project-list-wrap">
                      {projects.map(([name, location], pi) => (
                        <div
                          key={`${name}-${location}`}
                          className="project-row"
                          style={{ animationDelay: `${pi * 35}ms` }}
                        >
                          <span className="project-row-dot" />
                          <span className="project-row-name">{name}</span>
                          <span className="project-row-divider" />
                          <span className="project-row-loc">{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>


          </div>
        </div>

        {/* ═══════════════════════════════════════ STYLES ═══════════════════════════════════════ */}
        <style>{`
          /* ── DEVELOPER HEADER LOGO ── */
          .developer-profile-header-wrap {
            display: flex;
            align-items: center;
            gap: 36px;
            flex-wrap: wrap;
            margin-bottom: var(--sa-spacing-label-to-heading);
          }

          .developer-profile-header-wrap .sa-label {
            margin-bottom: 0 !important;
          }

          .developer-profile-header-logo {
            height: 88px;
            width: auto;
            object-fit: contain;
            display: block;
            transform: translateY(-16px);
          }

          @media (max-width: 640px) {
            .developer-profile-header-logo {
              height: 64px;
              transform: translateY(-10px);
            }
          }

          /* ── LAYOUT FOUNDATION ── */
          .about-split-canvas {
            display: flex;
            gap: 32px;
            align-items: flex-start;
            padding-bottom: 40px;
          }

          .about-left-panel {
            flex: 0 0 52%;
            position: relative;
          }

          .about-right-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .about-sticky-content {
            position: sticky;
            top: 100px;
            display: flex;
            flex-direction: column;
            gap: 24px;
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
            line-height: 1.05 !important;
            font-size: var(--sa-font-size-h2) !important;
          }

          .line-block {
            display: block;
          }

          @media (min-width: 1025px) {
            .line-block {
              white-space: nowrap;
            }
          }

          .about-glass-metrics {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
            background: rgba(255,255,255,0.5);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(26,28,20,0.07);
            border-radius: 14px;
            overflow: hidden;
          }

          .canvas-metric-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 5px;
            padding: 18px 12px;
            position: relative;
          }

          .canvas-metric-item:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 20%;
            height: 60%;
            width: 1px;
            background: rgba(26,28,20,0.07);
          }

          .canvas-metric-val {
            font-family: 'Outfit', sans-serif;
            font-size: 23px;
            font-weight: 800;
            line-height: 1;
            letter-spacing: -0.02em;
            white-space: nowrap;
          }

          .canvas-metric-lbl {
            font-size: 9.5px;
            font-weight: 500;
            color: ${COLORS.mutedLight};
            text-transform: uppercase;
            letter-spacing: 0.12em;
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

          /* ── PORTFOLIO HEADER ── */
          .portfolio-header {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .portfolio-header h3 {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            margin: 0;
            white-space: nowrap;
            font-weight: 600;
          }

          .portfolio-divider {
            flex: 1;
            height: 1px;
          }

          .portfolio-count-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 9.5px;
            color: ${COLORS.primary};
            font-weight: 700;
            letter-spacing: 0.14em;
            background: ${COLORS.primary}12;
            border: 1px solid ${COLORS.primary}28;
            border-radius: 999px;
            padding: 4px 10px 4px 8px;
            white-space: nowrap;
          }

          .portfolio-count-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: ${COLORS.primary};
            animation: pulse-dot 2s ease-in-out infinite;
            flex-shrink: 0;
          }

          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }

          /* ── CATEGORY CARDS — REFINED ── */
          .portfolio-category-grid {
            display: flex;
            flex-direction: column;
            gap: 6px;
          }

          .portfolio-category-card {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
            padding: 16px 18px 14px;
            border: 1px solid rgba(26,28,20,0.06);
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                        border-color 0.3s ease,
                        box-shadow 0.3s ease;
            will-change: transform;
          }

          .portfolio-category-card:hover,
          .portfolio-category-card.is-active {
            border-color: ${COLORS.primary}2A;
            transform: translateY(-2px);
            box-shadow:
              0 8px 32px rgba(26,28,20,0.07),
              0 1px 0 rgba(255,255,255,0.9) inset;
          }

          /* Glassmorphism base layer */
          .category-glass-bg {
            position: absolute;
            inset: 0;
            background: rgba(255,255,255,0.28);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            transition: background 0.35s ease;
            z-index: 0;
          }

          .portfolio-category-card.is-active .category-glass-bg {
            background: linear-gradient(
              108deg,
              rgba(255,255,255,0.72) 0%,
              rgba(255,255,255,0.22) 100%
            );
          }

          /* Left accent bar — the signature detail */
          .category-accent-bar {
            position: absolute;
            left: 0;
            top: 16%;
            height: 68%;
            width: 2px;
            border-radius: 0 2px 2px 0;
            background: ${COLORS.primary};
            opacity: 0;
            transform: scaleY(0.4);
            transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.2,0.64,1);
            z-index: 3;
          }

          .portfolio-category-card.is-active .category-accent-bar {
            opacity: 1;
            transform: scaleY(1);
          }

          /* ── CATEGORY HEAD ROW ── */
          .category-head {
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 12px;
          }

          /* Index pill */
          .category-index-pill {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: rgba(26,28,20,0.05);
            border: 1px solid rgba(26,28,20,0.07);
            flex-shrink: 0;
            transition: background 0.35s ease, border-color 0.35s ease;
          }

          .category-index-pill span {
            font-family: 'Outfit', sans-serif;
            font-size: 12px;
            font-weight: 700;
            color: ${COLORS.mutedLight};
            transition: color 0.35s ease;
            letter-spacing: 0.02em;
          }

          .portfolio-category-card.is-active .category-index-pill {
            background: ${COLORS.primary}18;
            border-color: ${COLORS.primary}30;
          }

          .portfolio-category-card.is-active .category-index-pill span {
            color: ${COLORS.primary};
          }

          /* Title wrap */
          .category-title-wrap {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 2px;
          }

          .category-eyebrow {
            font-size: 9px;
            color: ${COLORS.primary};
            text-transform: uppercase;
            letter-spacing: 0.16em;
            font-weight: 700;
            opacity: 0.75;
          }

          .category-name {
            font-size: 16px;
            font-weight: 600;
            margin: 0;
            color: ${COLORS.textDark};
            letter-spacing: -0.01em;
            line-height: 1.2;
          }

          /* Count badge */
          .category-count-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1px;
            flex-shrink: 0;
          }

          .category-count {
            font-family: 'Outfit', sans-serif;
            font-size: 18px;
            font-weight: 800;
            line-height: 1;
            color: ${COLORS.primary};
            letter-spacing: -0.02em;
          }

          .category-count-sub {
            font-size: 8px;
            color: ${COLORS.mutedLight};
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }

          /* ── PROJECT LIST ROWS ── */
          .project-list-wrap {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            gap: 0;
            border-radius: 8px;
            overflow: hidden;
            /* Collapsed by default, revealed on active */
            max-height: 0;
            opacity: 0;
            transform: translateY(-4px);
            transition:
              max-height 0.4s cubic-bezier(0.4,0,0.2,1),
              opacity 0.3s ease,
              transform 0.3s ease;
          }

          .portfolio-category-card.is-active .project-list-wrap {
            max-height: 600px;
            opacity: 1;
            transform: translateY(0);
          }

          .project-row {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 7px 10px;
            border-radius: 6px;
            background: transparent;
            transition: background 0.2s ease;
            animation: rowReveal 0.3s ease both;
          }

          @keyframes rowReveal {
            from { opacity: 0; transform: translateX(-6px); }
            to   { opacity: 1; transform: translateX(0); }
          }

          .project-row:hover {
            background: rgba(255,255,255,0.55);
          }

          .project-row-dot {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: ${COLORS.primary};
            opacity: 0.5;
            flex-shrink: 0;
          }

          .project-row-name {
            font-size: 12px;
            font-weight: 600;
            color: ${COLORS.textDark};
            letter-spacing: -0.01em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .project-row-divider {
            flex: 1;
            height: 1px;
            background: rgba(26,28,20,0.07);
            min-width: 12px;
          }

          .project-row-loc {
            font-size: 9.5px;
            color: ${COLORS.mutedLight};
            text-transform: uppercase;
            letter-spacing: 0.1em;
            white-space: nowrap;
            flex-shrink: 0;
          }

          /* ── FOOTER ── */
          .about-canvas-footer {
            margin-top: 4px;
            padding-top: 20px;
            border-top: 1px solid rgba(26,28,20,0.05);
          }

          .about-canvas-footer p {
            font-size: 11.5px;
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
              grid-template-columns: repeat(3, 1fr);
            }

            .canvas-metric-item {
              padding: 14px 6px;
            }

            .canvas-metric-val {
              font-size: 17px;
            }

            .portfolio-category-card {
              padding: 14px 14px 12px;
            }

            .category-head {
              gap: 12px;
            }

            .category-name {
              font-size: 14px;
            }

            .project-row-name {
              font-size: 11px;
            }

            .project-row-loc {
              font-size: 9px;
            }
          }
        `}</style>

      </section>

      <WaveLightToDark fromColor={COLORS.luxBeige} toColor={COLORS.darkNavy} />
    </>
  );
}
