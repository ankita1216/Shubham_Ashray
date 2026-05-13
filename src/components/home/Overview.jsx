import { Fragment, useState } from 'react';
import { COLORS } from '../../constants/colors';
import { ShieldCheck, Zap, Lock, Leaf } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { DecorativeShape } from '../common/DecorativeShape';

export function Overview() {
  const [hoveredFeature, setHoveredFeature] = useState(null);


  const features = [
    { icon: <ShieldCheck size={18} />, name: "Earthquake Resistant", sub: "RCC frame engineered", accent: COLORS.textDark },
    { icon: <Zap size={18} />, name: "24×7 Power Backup", sub: "Uninterrupted living", accent: COLORS.textDark },
    { icon: <Lock size={18} />, name: "Smart Security", sub: "CCTV + manned guards", accent: COLORS.textDark },
    { icon: <Leaf size={18} />, name: "Rainwater Harvesting", sub: "Eco-conscious design", accent: COLORS.textDark },
  ];

  const highlights = [
    ["9", "Towers"],
    ["525", "Spacious Flats"],
    ["70%", "Open Space"],
    ["800-1255", "Sq. Ft Homes"],
  ];

  return (
    <>
      <section
        id="overview-section"
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
            .ov-highlights { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>

        <div className="sa-container relative z-10">

          {/* ── Top eyebrow row ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 52 }}>
            <SectionLabel onDark={false}>Project Overview</SectionLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 1, background: `${COLORS.pink}60` }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: `${COLORS.mutedLight}`, opacity: 0.6 }}>
                Guwahati · Aerocity Corridor
              </span>
            </div>
          </div>


          {/* ── Main body: two columns ── */}
          <div
            className="ov-shell"
            style={{ display: "grid", gridTemplateColumns: "1.06fr 0.94fr", gap: "0 64px", alignItems: "start" }}
          >

            {/* LEFT: headline + body + features */}
            <div>
              <h2
                className="sa-serif"
                style={{
                  fontSize: "clamp(46px, 6vw, 82px)",
                  fontWeight: 600,
                  lineHeight: 0.94,
                  letterSpacing: 0,
                  color: COLORS.textDark,
                  margin: "0 0 26px",
                }}
              >
                The <em style={{ fontStyle: "italic", color: COLORS.pink }}>Aha</em> Homes<br />You Deserve.
              </h2>

              <p style={{ fontSize: 17, color: COLORS.mutedLight, lineHeight: 1.85, margin: "0 0 34px", maxWidth: 590 }}>
                A luxury abode awaits to make your moments memorable. Everyday starts with the promise of joy, open space, and thoughtfully planned 2 and 3 BHK homes at Guwahati's Aerocity corridor.
              </p>

              <div className="ov-highlights" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, marginBottom: 34 }}>
                {highlights.map(([value, label]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.78)", border: "1px solid rgba(26,28,20,0.08)", borderRadius: 12, padding: "18px 16px" }}>
                    <div style={{ color: COLORS.textDark, fontSize: 26, fontWeight: 800, lineHeight: 1 }}>{value}</div>
                    <div style={{ color: COLORS.mutedLight, fontSize: 10, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", marginTop: 8 }}>{label}</div>
                  </div>
                ))}
              </div>

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
                padding: "38px 34px 34px",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Yellow top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${COLORS.yellow}, transparent)` }} />

                {/* Big quote mark */}
                <div className="sa-serif" style={{ fontSize: 72, lineHeight: 0.65, color: COLORS.yellow, opacity: 0.18, marginBottom: 18, userSelect: "none" }}>
                  "
                </div>

                <p className="sa-serif" style={{
                  fontSize: "clamp(22px, 2vw, 30px)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.35,
                  color: COLORS.textDark,
                  margin: "0 0 24px",
                }}>
                  Come, live the Aha Life, where children grow, parents rejoice, and every moment becomes a cherished memory.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: `${COLORS.yellow}20`,
                    border: `1.5px solid ${COLORS.yellow}45`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, color: COLORS.yellow, flexShrink: 0,
                  }}>
                    K
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDark, letterSpacing: "0.01em" }}>Kailash Chandra Lohia</div>
                    <div style={{ fontSize: 10.5, color: COLORS.mutedLight, marginTop: 1 }}>Chairman, Subham Group</div>
                  </div>
                </div>
              </div>

              {/* Project details pill strip */}
              <div style={{
                borderRadius: 14,
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(26,26,46,0.06)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                flexWrap: "wrap",
              }}>
                {[
                  { label: "Type", value: "2 and 3 BHK" },
                  { label: "Location", value: "Aerocity, Guwahati" },
                  { label: "Status", value: "Booking Open" },
                ].map(({ label, value }, i, arr) => (
                  <Fragment key={label}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.mutedLight, opacity: 0.6, marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDark, letterSpacing: "-0.01em" }}>{value}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: 1, height: 28, background: "rgba(26,26,46,0.08)", flexShrink: 0 }} />
                    )}
                  </Fragment>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
