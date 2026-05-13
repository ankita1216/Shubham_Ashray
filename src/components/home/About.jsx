import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { pastProjects, developerMetrics } from '../../data/projectsData';

export function About() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [counters, setCounters] = useState({});
  const sectionRef = useRef(null);
  const countersStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted.current) {
          countersStarted.current = true;
          developerMetrics.forEach(({ target, label }) => {
            let start = 0;
            const duration = 1800;
            const step = Math.ceil(target / (duration / 16));
            const interval = setInterval(() => {
              start = Math.min(start + step, target);
              setCounters(prev => ({ ...prev, [label]: start }));
              if (start >= target) clearInterval(interval);
            }, 16);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="sa-sans sa-section about-reborn"
        style={{ background: COLORS.darkNavy, position: 'relative', color: '#fff', overflow: 'hidden' }}
      >

        {/* ── TOP RULE BAR ── */}
        <div className="arc-top-bar">
          <div className="arc-top-bar-inner">
            <span className="arc-top-label">DEVELOPER PROFILE</span>
            <div className="arc-top-line" />
            <span className="arc-top-label" style={{ color: COLORS.yellow }}>EST. 2007</span>
            <div className="arc-top-dot" style={{ background: COLORS.yellow }} />
          </div>
        </div>

        {/* ── HERO SPLIT ── */}
        <div className="arc-hero">

          {/* Left: Cinematic Headline */}
          <div className="arc-hero-left">
            <div className="arc-side-label">
              <span>SUBHAM GROUP</span>
            </div>

            <div className="arc-headline-block">
              <div className="arc-outline-word">BUILDING</div>
              <div className="arc-solid-word">
                LEGACIES<span className="arc-dot" style={{ color: COLORS.yellow }}>.</span>
              </div>
              <div className="arc-outline-word arc-outline-offset">SINCE 2007</div>
            </div>

            <div className="arc-hero-sub">
              <div className="arc-hero-sub-line" style={{ background: COLORS.yellow }} />
              <p>Northeast India's premier real estate developer — every project a testament to quality living.</p>
            </div>
          </div>

          {/* Right: Marquee Pull Quote */}
          <div className="arc-hero-right">
            <div className="arc-quote-wrap">
              <div className="arc-quote-number" style={{ color: COLORS.yellow }}>"</div>
              <blockquote className="arc-quote-body">
                Growing up, we all had the opportunity to enjoy nature at its best. We wanted to gift families a present enjoyed for years to come.
              </blockquote>
              <div className="arc-quote-rule" style={{ background: COLORS.yellow }} />
              <div className="arc-quote-attr">
                <div className="arc-attr-initial" style={{ borderColor: COLORS.yellow, color: COLORS.yellow }}>K</div>
                <div>
                  <p className="arc-attr-name">Mr. Kailash Chandra Lohia</p>
                  <p className="arc-attr-role">Chairman, Subham Group</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── METRICS BAND ── */}
        <div className="arc-metrics-band">
          {developerMetrics.map(({ target, suffix, label, color }, i) => (
            <div key={label} className="arc-metric-cell">
              {i > 0 && <div className="arc-metric-vline" />}
              <div className="arc-metric-num">
                {counters[label] ?? 0}{suffix}
              </div>
              <div className="arc-metric-lbl">{label}</div>
              <div className="arc-metric-accent" style={{ background: color }} />
            </div>
          ))}
        </div>

        {/* ── PROJECTS LEDGER ── */}
        <div className="arc-container">
          <div className="arc-ledger-head">
            <div className="arc-ledger-headleft">
              <div className="arc-ledger-rule" style={{ background: COLORS.yellow }} />
              <span className="arc-ledger-title">Heritage Portfolio</span>
            </div>
            <span className="arc-ledger-count">{pastProjects.length} COMPLETED</span>
          </div>

          <div className="arc-ledger">
            {pastProjects.map(([name, sub], i) => (
              <div
                key={name}
                className={`arc-ledger-row ${hoveredProject === i ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <span className="arc-row-idx">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="arc-row-body">
                  <span
                    className="arc-row-name"
                    style={{ color: hoveredProject === i ? COLORS.yellow : '#fff' }}
                  >
                    {name}
                  </span>
                  <span className="arc-row-sub">{sub}</span>
                </div>

                <div className={`arc-row-arrow ${hoveredProject === i ? 'visible' : ''}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                    stroke={COLORS.yellow} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>

                <div
                  className="arc-row-fill"
                  style={{ opacity: hoveredProject === i ? 1 : 0 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM PHILOSOPHY ── */}
        <div className="arc-philosophy">
          <div className="arc-phil-inner">
            <span className="arc-phil-label" style={{ color: COLORS.yellow }}>— VISION —</span>
            <p className="arc-phil-text">
              Since 2007, Subham Group has been Guwahati's premier real estate developer —
              known for innovation and exceptional service across Northeast India.
            </p>
          </div>
        </div>

        {/* ══════════════════════ STYLES ══════════════════════ */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap');

          .about-reborn { padding: 0 0 0; }

          /* ── TOP BAR ── */
          .arc-top-bar {
            border-bottom: 1px solid rgba(255,255,255,0.08);
            padding: 18px 60px;
          }
          .arc-top-bar-inner {
            display: flex;
            align-items: center;
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
          }
          .arc-top-label {
            font-family: 'Syne', monospace, sans-serif;
            font-size: 10px;
            letter-spacing: 0.35em;
            color: rgba(255,255,255,0.35);
            white-space: nowrap;
          }
          .arc-top-line {
            flex: 1;
            height: 1px;
            background: rgba(255,255,255,0.08);
          }
          .arc-top-dot {
            width: 6px; height: 6px;
            border-radius: 50%;
            flex-shrink: 0;
          }

          /* ── HERO ── */
          .arc-hero {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 78vh;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .arc-hero-left {
            padding: 80px 60px 80px 60px;
            border-right: 1px solid rgba(255,255,255,0.08);
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .arc-side-label {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%) rotate(-90deg);
            font-family: 'Syne', monospace, sans-serif;
            font-size: 9px;
            letter-spacing: 0.4em;
            color: rgba(255,255,255,0.15);
            white-space: nowrap;
          }
          .arc-headline-block {
            margin-bottom: 48px;
            padding-left: 16px;
          }
          .arc-outline-word {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(60px, 7.5vw, 120px);
            font-weight: 300;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,0.18);
            line-height: 0.9;
            letter-spacing: -0.01em;
          }
          .arc-solid-word {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(60px, 7.5vw, 120px);
            font-weight: 700;
            color: #fff;
            line-height: 0.9;
            letter-spacing: -0.01em;
          }
          .arc-outline-offset {
            margin-top: 8px;
            font-size: clamp(28px, 3.5vw, 52px);
          }
          .arc-dot { font-style: normal; }
          .arc-hero-sub {
            display: flex;
            align-items: flex-start;
            gap: 20px;
            padding-left: 16px;
          }
          .arc-hero-sub-line {
            width: 3px;
            height: 52px;
            flex-shrink: 0;
            margin-top: 4px;
          }
          .arc-hero-sub p {
            font-family: 'Syne', sans-serif;
            font-size: 14px;
            line-height: 1.8;
            color: rgba(255,255,255,0.5);
            margin: 0;
            max-width: 340px;
          }

          /* ── QUOTE RIGHT PANEL ── */
          .arc-hero-right {
            padding: 80px 60px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .arc-quote-wrap {
            max-width: 420px;
          }
          .arc-quote-number {
            font-family: 'Cormorant Garamond', serif;
            font-size: 140px;
            line-height: 0.7;
            font-weight: 700;
            margin-bottom: 24px;
            display: block;
          }
          .arc-quote-body {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(22px, 2.4vw, 30px);
            font-style: italic;
            font-weight: 400;
            line-height: 1.55;
            color: rgba(255,255,255,0.9);
            margin: 0 0 36px 0;
          }
          .arc-quote-rule {
            width: 48px;
            height: 2px;
            margin-bottom: 28px;
          }
          .arc-quote-attr {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .arc-attr-initial {
            width: 44px; height: 44px;
            border-radius: 50%;
            border: 1px solid;
            display: flex; align-items: center; justify-content: center;
            font-family: 'Cormorant Garamond', serif;
            font-size: 18px;
            font-weight: 700;
            flex-shrink: 0;
          }
          .arc-attr-name {
            margin: 0 0 4px;
            font-family: 'Syne', sans-serif;
            font-size: 13px;
            font-weight: 600;
            color: #fff;
          }
          .arc-attr-role {
            margin: 0;
            font-family: 'Syne', sans-serif;
            font-size: 10px;
            letter-spacing: 0.15em;
            color: rgba(255,255,255,0.35);
            text-transform: uppercase;
          }

          /* ── METRICS BAND ── */
          .arc-metrics-band {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .arc-metric-cell {
            position: relative;
            padding: 60px 48px;
            text-align: left;
            overflow: hidden;
          }
          .arc-metric-vline {
            position: absolute;
            left: 0; top: 30%; bottom: 30%;
            width: 1px;
            background: rgba(255,255,255,0.08);
          }
          .arc-metric-num {
            font-family: 'Cormorant Garamond', serif;
            font-size: clamp(52px, 5vw, 80px);
            font-weight: 700;
            line-height: 1;
            color: #fff;
            margin-bottom: 10px;
            font-variant-numeric: tabular-nums;
          }
          .arc-metric-lbl {
            font-family: 'Syne', sans-serif;
            font-size: 10px;
            letter-spacing: 0.25em;
            color: rgba(255,255,255,0.3);
            text-transform: uppercase;
          }
          .arc-metric-accent {
            position: absolute;
            bottom: 0; left: 48px;
            width: 28px; height: 2px;
          }

          /* ── LEDGER / PROJECTS ── */
          .arc-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 80px 60px;
          }
          .arc-ledger-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0;
          }
          .arc-ledger-headleft {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .arc-ledger-rule {
            width: 28px; height: 2px;
          }
          .arc-ledger-title {
            font-family: 'Syne', sans-serif;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.3em;
            color: rgba(255,255,255,0.6);
            text-transform: uppercase;
          }
          .arc-ledger-count {
            font-family: 'Syne', monospace, sans-serif;
            font-size: 10px;
            letter-spacing: 0.2em;
            color: rgba(255,255,255,0.2);
          }
          .arc-ledger {
            border-top: 1px solid rgba(255,255,255,0.1);
            margin-top: 24px;
          }
          .arc-ledger-row {
            position: relative;
            display: flex;
            align-items: center;
            gap: 32px;
            padding: 28px 0;
            border-bottom: 1px solid rgba(255,255,255,0.06);
            cursor: pointer;
            transition: border-color 0.3s;
            overflow: hidden;
          }
          .arc-ledger-row.hovered {
            border-bottom-color: rgba(255,184,0,0.25);
          }
          .arc-row-idx {
            font-family: 'Syne', monospace, sans-serif;
            font-size: 11px;
            color: rgba(255,255,255,0.2);
            letter-spacing: 0.05em;
            min-width: 28px;
            flex-shrink: 0;
            position: relative;
            z-index: 2;
          }
          .arc-row-body {
            flex: 1;
            display: flex;
            align-items: baseline;
            gap: 20px;
            position: relative;
            z-index: 2;
          }
          .arc-row-name {
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: clamp(20px, 2.2vw, 28px);
            font-weight: 600;
            transition: color 0.3s ease;
            letter-spacing: -0.01em;
          }
          .arc-row-sub {
            font-family: 'Syne', sans-serif;
            font-size: 10px;
            letter-spacing: 0.2em;
            color: rgba(255,255,255,0.25);
            text-transform: uppercase;
          }
          .arc-row-arrow {
            opacity: 0;
            transform: translateX(-12px);
            transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 2;
          }
          .arc-row-arrow.visible {
            opacity: 1;
            transform: translateX(0);
          }
          .arc-row-fill {
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, rgba(255,184,0,0.04) 0%, transparent 60%);
            transition: opacity 0.4s ease;
            pointer-events: none;
          }

          /* ── PHILOSOPHY ── */
          .arc-philosophy {
            border-top: 1px solid rgba(255,255,255,0.08);
            padding: 60px;
          }
          .arc-phil-inner {
            max-width: 560px;
            margin: 0 auto;
            text-align: center;
          }
          .arc-phil-label {
            font-family: 'Syne', monospace, sans-serif;
            font-size: 10px;
            letter-spacing: 0.35em;
            display: block;
            margin-bottom: 20px;
          }
          .arc-phil-text {
            font-family: 'Cormorant Garamond', serif;
            font-size: 18px;
            font-style: italic;
            line-height: 1.75;
            color: rgba(255,255,255,0.45);
            margin: 0;
          }

          /* ── RESPONSIVE ── */
          @media (max-width: 1024px) {
            .arc-hero {
              grid-template-columns: 1fr;
              min-height: auto;
            }
            .arc-hero-left { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); }
            .arc-metrics-band { grid-template-columns: repeat(2, 1fr); }
            .arc-metric-cell:nth-child(2) .arc-metric-vline { display: block; }
            .arc-metric-cell:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.08); }
            .arc-metric-cell:nth-child(4) { border-top: 1px solid rgba(255,255,255,0.08); }
            .arc-metric-cell:nth-child(3) .arc-metric-vline { display: none; }
          }
          @media (max-width: 640px) {
            .arc-top-bar { padding: 16px 24px; }
            .arc-hero-left { padding: 60px 24px 60px 40px; }
            .arc-hero-right { padding: 50px 24px; }
            .arc-metrics-band { grid-template-columns: 1fr 1fr; }
            .arc-metric-cell { padding: 40px 24px; }
            .arc-metric-accent { left: 24px; }
            .arc-container { padding: 60px 24px; }
            .arc-philosophy { padding: 50px 24px; }
            .arc-row-sub { display: none; }
            .arc-side-label { display: none; }
          }
        `}</style>
      </section>

      <WaveDarkToLight fromColor={COLORS.darkNavy} toColor={COLORS.luxBeige} />
    </>
  );
}