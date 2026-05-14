import { useRef, useState } from 'react';
import walkthroughVideo from '../../assets/videos/walkthrough.mp4';
import { COLORS } from '../../constants/colors';
import { WaveDarkToLight } from '../common/Dividers';
import { SectionLabel } from '../common/SectionLabel';

/* ── helpers ── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ].join(',');
}

export function VideoSection() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const moments = [
    { num: '01', title: 'Leave the phone behind', copy: 'Tune in with your child and let the day slow down.' },
    { num: '02', title: 'Walk without hurry', copy: 'Long landscaped paths make everyday time feel softer.' },
    { num: '03', title: 'Let space open up', copy: 'Beauty, air, and green pauses lead you toward a joyous life.' },
  ];

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(p => !p);
  };

  const pr = hexToRgb(COLORS.primary);   // primary RGB for rgba()
  const dn = hexToRgb(COLORS.darkNavy);  // dark navy RGB

  return (
    <>
      <section
        className="sa-sans vs-section"
        style={{ background: COLORS.darkBlue, position: 'relative', padding: '112px 0 128px' }}
      >
        {/* ── architectural grid texture ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${COLORS.primary} 1px, transparent 1px),
                              linear-gradient(90deg, ${COLORS.primary} 1px, transparent 1px)`,
            backgroundSize: '44px 44px',
            opacity: 0.055,
          }}
        />
        {/* top fade */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${COLORS.darkNavy}66 0%, transparent 100%)` }}
        />

        <div className="sa-container relative z-10">

          {/* ════════════════════════════════════════════
              01 · CENTERED SECTION HEADER
          ════════════════════════════════════════════ */}
          <div className="vs-header">
            <SectionLabel onDark={true}>Aha Life Message</SectionLabel>

            <h2 className="sa-serif vs-h2">
              A Life Made<br />
              <em>Of Aha Moments.</em>
            </h2>

            <p className="vs-lead-top">
              The Aha moment begins when you leave behind your phone<br className="vs-br-hide" />
              and tune in with your child — one walk at a time.
            </p>
          </div>

          {/* ════════════════════════════════════════════
              02 · CINEMATIC VIDEO HERO
          ════════════════════════════════════════════ */}
          <div className="vs-cinema-wrap">

            {/* ambient glow ring behind the card */}
            <div
              className="vs-glow-halo"
              style={{
                background: `radial-gradient(ellipse at 50% 60%, rgba(${pr},0.14) 0%, transparent 68%)`,
              }}
            />

            <div
              className={`vs-cinema${playing ? ' vs-playing' : ''}${hovered ? ' vs-hovered' : ''}`}
              onClick={toggle}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              role="button"
              aria-label={playing ? 'Pause video' : 'Play video'}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') toggle(); }}
            >
              {/* blueprint reference tag */}
              <div className="vs-ref-tag">REF — AHA.CINEMA.01</div>

              {/* blueprint corner marks */}
              <span className="vs-c vs-c--tl" />
              <span className="vs-c vs-c--tr" />
              <span className="vs-c vs-c--bl" />
              <span className="vs-c vs-c--br" />

              {/* ── video ── */}
              <video
                ref={videoRef}
                className="vs-video"
                poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920"
                loop
                muted
                playsInline
              >
                <source src={walkthroughVideo} type="video/mp4" />
              </video>

              {/* ── cinematic overlay ── */}
              <div className="vs-overlay">
                {/* radial darkening behind play button */}
                <div
                  className="vs-overlay-bg"
                  style={{
                    background: `radial-gradient(ellipse at 50% 46%, rgba(0,0,0,0.58) 0%, transparent 68%),
                                 linear-gradient(160deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.78) 100%)`,
                  }}
                />

                {/* play / pause button cluster */}
                <div className="vs-play-cluster">
                  {!playing && <span className="vs-pulse-ring" />}
                  <span className="vs-pulse-ring vs-pulse-ring--delay" />

                  <div className="vs-play-outer">
                    <div className="vs-play-inner" style={{ background: COLORS.primary }}>
                      <div
                        className="vs-play-icon"
                        style={{ color: COLORS.darkNavy }}
                      >
                        {playing ? (
                          /* pause bars */
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" rx="1.2" />
                            <rect x="14" y="4" width="4" height="16" rx="1.2" />
                          </svg>
                        ) : (
                          /* play triangle */
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5.14V19.14L19 12.14L8 5.14Z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* text block */}
                <div className="vs-overlay-text">
                  <span className="vs-ot-eyebrow" style={{ color: COLORS.primary }}>
                    Virtual Walkthrough
                  </span>
                  <h3 className="sa-serif vs-ot-title">See The Community Mood</h3>
                  <p className="vs-ot-hint">
                    Click to {playing ? 'pause' : 'play'} the cinematic preview
                  </p>
                </div>
              </div>

              {/* permanent edge vignette (survives overlay fade) */}
              <div className="vs-vignette" />

              {/* bottom cinema footer */}
              <div className="vs-cinema-footer">
                <div className="vs-cf-brand">
                  <span className="vs-cf-eyebrow" style={{ color: COLORS.primary }}>
                    Subham Ashray
                  </span>
                  <strong className="vs-cf-name sa-serif">Aerocity Living</strong>
                </div>

                <div className="vs-cf-badge">
                  <span
                    className="vs-cf-dot"
                    style={{ background: COLORS.primary }}
                  />
                  <span>WALKTHROUGH</span>
                  <span className="vs-cf-sep">·</span>
                  <span>3:42</span>
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════
              03 · BOTTOM CONTENT ROW
          ════════════════════════════════════════════ */}
          <div className="vs-bottom">

            {/* lead copy + stats */}
            <div className="vs-copy-card">
              <div
                className="vs-copy-accent"
                style={{ background: COLORS.primary }}
              />
              <p className="vs-copy-body">
                The Aha moment grows through long walks, open space, and a
                home that makes everyday life feel more present. It starts
                with community. It stays with memory.
              </p>
              <div className="vs-stats">
                {[
                  { v: '70%', l: 'Green Area' },
                  { v: '9', l: 'Towers' },
                  { v: '3km', l: 'Walk Paths' },
                ].map((s, i) => (
                  <div key={i} className="vs-stat">
                    <strong className="sa-serif vs-stat-val">{s.v}</strong>
                    <span className="vs-stat-lbl">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* moment cards */}
            <div className="vs-moments">
              {moments.map((m, i) => (
                <div key={i} className="vs-moment" style={{ '--pr': pr }}>
                  {/* ghost number */}
                  <span className="vs-moment-ghost sa-serif">{m.num}</span>
                  <span
                    className="vs-moment-num"
                    style={{ color: COLORS.primary }}
                  >
                    {m.num}
                  </span>
                  <strong className="vs-moment-title">{m.title}</strong>
                  <p className="vs-moment-copy">{m.copy}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ══ STYLES ════════════════════════════════════════════ */}
        <style>{`
          /* ── header ── */
          .vs-header {
            text-align: center;
            margin: 0 auto 58px;
            max-width: 760px;
          }
          .vs-h2 {
            color: #fff;
            font-size: clamp(52px, 6.4vw, 96px);
            line-height: 0.9; font-weight: 600; letter-spacing: 0;
            margin: 18px 0 22px;
          }
          .vs-h2 em { color: ${COLORS.primary}; font-style: italic; }
          .vs-lead-top {
            color: ${COLORS.mutedDark};
            font-size: 16px; line-height: 1.78; margin: 0;
          }

          /* ── cinema wrapper ── */
          .vs-cinema-wrap {
            position: relative;
            margin-bottom: 22px;
          }
          .vs-glow-halo {
            position: absolute;
            inset: -56px;
            pointer-events: none;
            z-index: 0;
          }

          /* ── cinema card ── */
          .vs-cinema {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 7;
            min-height: 300px;
            border-radius: 22px;
            overflow: hidden;
            cursor: pointer;
            background: #000;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow:
              0 0 0 1px rgba(${pr},0.12),
              0 48px 130px rgba(0,0,0,0.62),
              0 0 90px -20px rgba(${pr},0.18);
            outline: none;
            z-index: 1;
          }
          .vs-cinema:focus-visible {
            box-shadow:
              0 0 0 3px rgba(${pr},0.55),
              0 48px 130px rgba(0,0,0,0.62);
          }

          /* reference tag */
          .vs-ref-tag {
            position: absolute; top: 20px; left: 24px; z-index: 8;
            pointer-events: none;
            color: rgba(255,255,255,0.18);
            font-size: 8px; font-weight: 900;
            letter-spacing: 0.22em; text-transform: uppercase;
          }

          /* blueprint corners */
          .vs-c {
            position: absolute;
            width: 26px; height: 26px;
            border-color: rgba(${pr},0.55); border-style: solid;
            z-index: 8; pointer-events: none;
            transition: width 0.35s ease, height 0.35s ease, border-color 0.35s ease;
          }
          .vs-cinema:hover .vs-c {
            width: 40px; height: 40px;
            border-color: rgba(${pr},0.85);
          }
          .vs-c--tl { top: 14px;    left: 14px;    border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
          .vs-c--tr { top: 14px;    right: 14px;   border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
          .vs-c--bl { bottom: 14px; left: 14px;    border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
          .vs-c--br { bottom: 14px; right: 14px;   border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

          /* ── video ── */
          .vs-video {
            position: absolute; inset: 0;
            width: 100%; height: 100%; object-fit: cover;
            transition: transform 1.1s cubic-bezier(0.16,1,0.3,1),
                        filter 0.6s ease;
            filter: brightness(0.88) saturate(0.9);
          }
          .vs-cinema:hover:not(.vs-playing) .vs-video {
            transform: scale(1.04);
            filter: brightness(0.82) saturate(0.95);
          }
          .vs-cinema.vs-playing .vs-video {
            filter: brightness(1) saturate(1);
          }

          /* ── overlay (fades when playing) ── */
          .vs-overlay {
            position: absolute; inset: 0; z-index: 4;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            text-align: center; gap: 28px;
            padding: 36px;
            transition: opacity 0.55s ease;
          }
          /* playing + not hovered → invisible */
          .vs-cinema.vs-playing:not(.vs-hovered) .vs-overlay { opacity: 0; }
          /* playing + hovered → faint (just enough for pause icon) */
          .vs-cinema.vs-playing.vs-hovered .vs-overlay { opacity: 0.72; }

          .vs-overlay-bg {
            position: absolute; inset: 0; pointer-events: none;
          }

          /* ── play button cluster ── */
          .vs-play-cluster {
            position: relative; z-index: 2;
            display: flex; align-items: center; justify-content: center;
          }

          /* pulse rings */
          .vs-pulse-ring {
            position: absolute;
            width: 108px; height: 108px; border-radius: 50%;
            border: 1.5px solid rgba(${pr},0.4);
            pointer-events: none;
            animation: vsPulse 2.6s ease-out infinite;
          }
          .vs-pulse-ring--delay { animation-delay: 1.3s; }
          /* hide pulse when playing */
          .vs-cinema.vs-playing .vs-pulse-ring { display: none; }
          @keyframes vsPulse {
            0%   { transform: scale(1);   opacity: 0.65; }
            100% { transform: scale(1.95); opacity: 0; }
          }

          /* outer ring */
          .vs-play-outer {
            width: 96px; height: 96px; border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.16);
            background: rgba(255,255,255,0.07);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            display: grid; place-items: center;
            transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                        border-color 0.3s;
          }
          .vs-cinema:hover .vs-play-outer {
            transform: scale(1.1);
            border-color: rgba(255,255,255,0.3);
          }
          .vs-cinema.vs-playing.vs-hovered .vs-play-outer {
            transform: scale(1.0);
          }

          /* inner filled circle */
          .vs-play-inner {
            width: 68px; height: 68px; border-radius: 50%;
            display: grid; place-items: center;
            box-shadow: 0 8px 36px rgba(${pr},0.5);
            transition: box-shadow 0.3s, transform 0.3s;
          }
          .vs-cinema:hover .vs-play-inner {
            box-shadow: 0 12px 56px rgba(${pr},0.7);
          }

          /* play icon optical shift */
          .vs-play-icon {
            display: flex; align-items: center; justify-content: center;
          }
          /* shift play triangle right for optical centering */
          .vs-cinema:not(.vs-playing) .vs-play-icon { padding-left: 3px; }

          /* ── overlay text ── */
          .vs-overlay-text {
            position: relative; z-index: 2;
            display: flex; flex-direction: column; gap: 9px;
          }
          .vs-ot-eyebrow {
            font-size: 9px; font-weight: 900;
            letter-spacing: 0.24em; text-transform: uppercase;
          }
          .vs-ot-title {
            color: #fff;
            font-size: clamp(24px, 3.4vw, 46px);
            line-height: 0.96; font-weight: 600; margin: 0;
          }
          .vs-ot-hint {
            color: ${COLORS.mutedDark};
            font-size: 13px; margin: 0;
          }

          /* ── permanent edge vignette ── */
          .vs-vignette {
            position: absolute; inset: 0; pointer-events: none; z-index: 3;
            background:
              linear-gradient(to right,  rgba(0,0,0,0.28) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.28) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.2)  0%, transparent 32%, transparent 68%, rgba(0,0,0,0.55) 100%);
          }

          /* ── cinema footer bar ── */
          .vs-cinema-footer {
            position: absolute; inset: auto 24px 22px;
            display: flex; justify-content: space-between; align-items: flex-end;
            z-index: 6; pointer-events: none;
          }
          .vs-cf-brand { display: flex; flex-direction: column; gap: 3px; }
          .vs-cf-eyebrow {
            font-size: 8.5px; font-weight: 900;
            letter-spacing: 0.22em; text-transform: uppercase;
          }
          .vs-cf-name {
            color: #fff; font-size: 15px; font-style: italic;
          }
          .vs-cf-badge {
            display: flex; align-items: center; gap: 8px;
            background: rgba(0,0,0,0.42);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 999px; padding: 7px 15px;
            color: rgba(255,255,255,0.62);
            font-size: 9.5px; font-weight: 800;
            letter-spacing: 0.13em; text-transform: uppercase;
          }
          .vs-cf-dot {
            width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
            animation: dotBlink 2s ease infinite;
          }
          .vs-cinema.vs-playing .vs-cf-dot {
            animation: dotBlink 0.9s ease infinite;
          }
          @keyframes dotBlink {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.28; }
          }
          .vs-cf-sep { opacity: 0.35; }

          /* ════════════════════════════════
             BOTTOM CONTENT ROW
          ════════════════════════════════ */
          .vs-bottom {
            display: grid;
            grid-template-columns: minmax(260px, 0.78fr) 2fr;
            gap: 20px;
            align-items: start;
          }

          /* copy + stats card */
          .vs-copy-card {
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 20px;
            background: rgba(255,255,255,0.04);
            padding: 30px 28px;
            height: 100%;
            box-sizing: border-box;
          }
          .vs-copy-accent {
            width: 30px; height: 2px;
            border-radius: 999px; margin-bottom: 18px;
          }
          .vs-copy-body {
            color: ${COLORS.mutedDark};
            font-size: 14.5px; line-height: 1.82;
            margin: 0 0 26px;
          }
          .vs-stats {
            display: flex; gap: 0;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 20px;
          }
          .vs-stat {
            flex: 1;
            display: flex; flex-direction: column; gap: 5px;
            border-right: 1px solid rgba(255,255,255,0.07);
            padding: 0 14px 0 0; margin: 0 14px 0 0;
          }
          .vs-stat:last-child { border-right: 0; margin-right: 0; padding-right: 0; }
          .vs-stat-val {
            color: #fff;
            font-size: 30px; line-height: 1; font-weight: 700;
          }
          .vs-stat-lbl {
            color: rgba(255,255,255,0.36);
            font-size: 9px; font-weight: 800;
            letter-spacing: 0.16em; text-transform: uppercase;
          }

          /* moment cards grid */
          .vs-moments {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .vs-moment {
            position: relative; overflow: hidden;
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 18px;
            background: rgba(0,0,0,0.16);
            padding: 26px 22px 24px;
            transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
          }
          .vs-moment:hover {
            border-color: rgba(${pr},0.32);
            background: rgba(255,255,255,0.04);
            transform: translateY(-3px);
          }

          /* ghost numeral watermark */
          .vs-moment-ghost {
            position: absolute; right: -4px; bottom: -18px;
            font-size: 90px; font-weight: 700; line-height: 1;
            color: rgba(255,255,255,0.04);
            pointer-events: none; user-select: none;
          }

          /* bottom glow line on hover */
          .vs-moment::after {
            content: '';
            position: absolute; bottom: 0; left: 14px; right: 14px; height: 1.5px;
            background: linear-gradient(90deg, transparent, rgba(${pr},0.7), transparent);
            border-radius: 999px;
            transform: scaleX(0);
            transform-origin: center;
            transition: transform 0.35s ease;
          }
          .vs-moment:hover::after { transform: scaleX(1); }

          .vs-moment-num {
            display: block;
            font-size: 9.5px; font-weight: 900;
            letter-spacing: 0.18em; text-transform: uppercase;
            margin-bottom: 22px; position: relative;
          }
          .vs-moment-title {
            display: block;
            color: #fff; font-size: 15px; font-weight: 600;
            line-height: 1.32; margin-bottom: 10px; position: relative;
          }
          .vs-moment-copy {
            color: rgba(253,251,247,0.48);
            font-size: 13px; line-height: 1.62;
            margin: 0; position: relative;
          }

          /* ── Responsive ── */
          @media (max-width: 1100px) {
            .vs-bottom { grid-template-columns: 1fr; }
            .vs-moments { grid-template-columns: repeat(3, 1fr); }
          }

          @media (max-width: 820px) {
            .vs-cinema { aspect-ratio: 16 / 9; }
            .vs-play-outer { width: 80px; height: 80px; }
            .vs-play-inner { width: 56px; height: 56px; }
            .vs-pulse-ring { width: 90px; height: 90px; }
          }

          @media (max-width: 640px) {
            .vs-cinema { aspect-ratio: auto; height: 62vw; min-height: 280px; }
            .vs-header { text-align: left; }
            .vs-br-hide { display: none; }
            .vs-ot-title { font-size: 22px; }
            .vs-moments { grid-template-columns: 1fr; gap: 10px; }
            .vs-play-outer { width: 72px; height: 72px; }
            .vs-play-inner { width: 50px; height: 50px; }
            .vs-pulse-ring { width: 80px; height: 80px; }
          }
        `}</style>
      </section>

      <WaveDarkToLight fromColor={COLORS.darkBlue} toColor={COLORS.softCream} />
    </>
  );
}