import { Fragment, useState } from 'react';
import { COLORS } from '../../constants/colors';
import { ShieldCheck, Zap, Lock, Leaf } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { DecorativeShape } from '../common/DecorativeShape';
import chairmanImg from '../../assets/images/Chairman.jpg';

export function Overview() {
  const [hoveredFeature, setHoveredFeature] = useState(null);


  const features = [
    { icon: <ShieldCheck size={18} />, name: "Earthquake Resistant", sub: "RCC frame engineered", accent: COLORS.textDark },
    { icon: <Zap size={18} />, name: "24×7 Power Backup", sub: "Common Area", accent: COLORS.textDark },
    { icon: <Lock size={18} />, name: "Smart Security", sub: "CCTV + manned guards", accent: COLORS.textDark },
    { icon: <Leaf size={18} />, name: "Rainwater Harvesting", sub: "Eco-conscious design", accent: COLORS.textDark },
  ];


  return (
    <>
      <section
        id="overview"
        className="sa-sans sa-noise sa-section"
        style={{ background: COLORS.warmWhite, position: "relative", overflow: "hidden", padding: "104px 0 108px" }}
      >
        {/* Original decorative elements */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{ width: "60vw", height: "60vh", background: `radial-gradient(circle, ${COLORS.primary}08 0%, transparent 70%)` }}
        />
        <DecorativeShape size={600} opacity={0.14} rotate={15} className="absolute -bottom-40 -right-20 pointer-events-none" />

        <style>{`
          @media (max-width: 900px) {
            .ov-shell { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 500px) {
            .ov-features { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 420px) {
            .ov-features { grid-template-columns: 1fr !important; }
          }
          .about-canvas-quote {
            position: relative;
            padding-left: 20px;
            border-left: 1px solid ${COLORS.primary}4D;
            text-align: left;
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
        `}</style>

        <div className="sa-container relative z-10">

          {/* ── Top eyebrow row ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 52 }}>
            <SectionLabel onDark={false}>Project Overview</SectionLabel>
          </div>


          {/* ── Main body: two columns ── */}
          <div
            className="ov-shell"
            style={{ display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: "0 64px", alignItems: "start" }}
          >

            {/* LEFT: headline + body + features */}
            <div>
              <h2 style={{ color: COLORS.textDark, margin: "0 0 var(--sa-spacing-heading-to-p)" }}>
                The <em style={{ fontStyle: "italic", color: COLORS.pink }}>Aha</em> Homes<br />You Deserve
              </h2>

              <p style={{ color: COLORS.mutedLight, maxWidth: 590 }}>
                A luxury abode awaits to make your moments memorable. Everyday starts with the promise of joy, open space, and thoughtfully planned 2 and 3 BHK homes at Guwahati's Aerocity corridor.
              </p>


              {/* Features — horizontal list style */}
              <div
                className="ov-features"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
              >
                {features.map(({ icon, name, sub, accent }, i) => (
                  <div
                    key={name}
                    onMouseEnter={() => setHoveredFeature(i)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "16px 18px",
                      borderRadius: 12,
                      background: hoveredFeature === i ? "#fff" : "rgba(255,255,255,0.62)",
                      border: `1px solid ${hoveredFeature === i ? accent + "30" : "rgba(26,26,46,0.06)"}`,
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      transform: hoveredFeature === i ? "translateY(-2px)" : "none",
                      boxShadow: hoveredFeature === i ? `0 14px 34px ${accent}10` : "0 1px 0 rgba(26,28,20,0.03)",
                      cursor: "default",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: `rgba(0,0,0,0.05)`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 17,
                      transition: "transform 0.3s ease",
                      color: COLORS.textDark,
                      transform: hoveredFeature === i ? "scale(1.1) rotate(-4deg)" : "none",
                    }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textDark, marginBottom: 2, lineHeight: 1.3 }}>{name}</div>
                      <div style={{ fontSize: 11, color: COLORS.mutedLight, lineHeight: 1.4 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: quote block + location tag */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 4 }}>

              {/* Quote card */}
              <div style={{
                borderRadius: 16,
                background: "#fff",
                border: "1px solid rgba(26,26,46,0.06)",
                boxShadow: "0 18px 60px rgba(26,26,46,0.08)",
                padding: "28px 24px 24px",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Yellow top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${COLORS.yellow}, transparent)` }} />

                {/* Chairman's Portrait Image (rendered fully without cropping and compact) */}
                <div style={{
                  width: "100%",
                  height: "180px",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 16,
                  border: "1px solid rgba(26,26,46,0.06)",
                  background: "rgba(26,26,46,0.02)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <img 
                    src={chairmanImg} 
                    alt="Kailash Chandra Lohia" 
                    style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                  />
                </div>

                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textDark, letterSpacing: "0.01em" }}>Kailash Chandra Lohia</div>
                  <div style={{ fontSize: 11, color: COLORS.mutedLight, marginTop: 3 }}>Chairman, Subham Group</div>
                </div>

                {/* Chairman's Message Content (Chairman's Voice) */}
                <div className="about-canvas-quote" style={{ marginTop: 20 }}>
                  <svg className="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1.5.5 1.5 1.5L5 21z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.5c0 1.5-.5 3-3 5"></path>
                  </svg>
                  <p style={{ margin: 0 }}>Growing up, we all had the opportunity to enjoy nature at its best. We wanted to gift families a present enjoyed for years to come.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}

