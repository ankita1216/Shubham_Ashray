import React, { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { ShieldCheck, Zap, Lock, Leaf } from 'lucide-react';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';

export function Overview() {
  const [hoveredFeature, setHoveredFeature] = useState(null);


  const features = [
    { icon: <ShieldCheck size={18} />, name: "Earthquake Resistant", sub: "RCC frame engineered", accent: COLORS.textDark },
    { icon: <Zap size={18} />, name: "24×7 Power Backup", sub: "Uninterrupted living", accent: COLORS.textDark },
    { icon: <Lock size={18} />, name: "Smart Security", sub: "CCTV + manned guards", accent: COLORS.textDark },
    { icon: <Leaf size={18} />, name: "Rainwater Harvesting", sub: "Eco-conscious design", accent: COLORS.textDark },
  ];

  return (
    <>
      <section
        id="overview-section"
        className="sa-sans sa-noise sa-section"
        style={{ background: COLORS.warmWhite, position: "relative", overflow: "hidden", padding: "76px 0 84px" }}
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
        `}</style>

        <div className="sa-container relative z-10">

          {/* ── Top eyebrow row ── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 44 }}>
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
            style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "0 52px", alignItems: "start" }}
          >

            {/* LEFT: headline + body + features */}
            <div>
              <h2
                className="sa-serif"
                style={{
                  fontSize: "clamp(32px, 3.8vw, 54px)",
                  fontWeight: 900,
                  lineHeight: 1.07,
                  letterSpacing: "-1.5px",
                  color: COLORS.textDark,
                  margin: "0 0 20px",
                }}
              >
                The <em style={{ fontStyle: "italic", color: COLORS.pink }}>Aha</em> Homes<br />You Deserve
              </h2>

              <p style={{ fontSize: 15, color: COLORS.mutedLight, lineHeight: 1.85, margin: "0 0 32px", maxWidth: 480 }}>
                Subham Ashray is not just a residence — it's a promise of everyday joy. Sprawling across generous open grounds in Guwahati's Aerocity corridor, it offers 9 towers of artfully designed 2 & 3 BHK homes where architecture meets lifestyle.
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
                      padding: "14px 16px",
                      borderRadius: 14,
                      background: hoveredFeature === i ? "#fff" : "rgba(255,255,255,0.45)",
                      border: `1px solid ${hoveredFeature === i ? accent + "30" : "rgba(26,26,46,0.06)"}`,
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      transform: hoveredFeature === i ? "translateY(-2px)" : "none",
                      boxShadow: hoveredFeature === i ? `0 6px 20px ${accent}12` : "none",
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
                borderRadius: 20,
                background: "#fff",
                border: "1px solid rgba(26,26,46,0.06)",
                boxShadow: "0 8px 40px rgba(26,26,46,0.06)",
                padding: "32px 28px 28px",
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
                  fontSize: "clamp(16px, 1.6vw, 19px)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: COLORS.textDark,
                  margin: "0 0 24px",
                }}>
                  Come, live the Aha Life — where children grow, parents rejoice, and every moment becomes a cherished memory.
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
                  { label: "Type", value: "2 & 3 BHK" },
                  { label: "Location", value: "Aerocity, Guwahati" },
                  { label: "Status", value: "Booking Open" },
                ].map(({ label, value }, i, arr) => (
                  <React.Fragment key={label}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: COLORS.mutedLight, opacity: 0.6, marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textDark, letterSpacing: "-0.01em" }}>{value}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: 1, height: 28, background: "rgba(26,26,46,0.08)", flexShrink: 0 }} />
                    )}
                  </React.Fragment>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      <WaveLightToDark fromColor={COLORS.warmWhite} toColor={COLORS.darkBlue} />
    </>
  );
}