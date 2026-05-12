import React from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';

export function Overview() {
  const stats = [
    { target: 70,   suffix: "%", label: "Open Space",    color: COLORS.pink },
    { target: 525,  suffix: "",  label: "Spacious Flats", color: "#1A1A2E" },
    { target: 9,    suffix: "",  label: "Towers",         color: COLORS.yellow },
    { target: 1255, suffix: "",  label: "Max Sq.Ft",      color: COLORS.lime },
  ];
  const features = [
    { icon: "🏛️", name: "Earthquake Resistant", sub: "RCC frame, engineered for safety", accent: COLORS.pink },
    { icon: "⚡", name: "24×7 Power Backup",     sub: "Uninterrupted living, always",      accent: COLORS.cyan },
    { icon: "🛡️", name: "Smart Security",         sub: "CCTV surveillance + manned guards", accent: COLORS.yellow },
    { icon: "🌿", name: "Rainwater Harvesting",   sub: "Sustainable, eco-conscious design", accent: COLORS.lime },
  ];
  return (
    <>
      <section id="overview-section" className="sa-sans sa-noise sa-section" style={{ background: COLORS.warmWhite, position: "relative", overflow: "hidden" }}>
        <div className="absolute bottom-0 left-0" style={{ width: 400, height: 300, background: `radial-gradient(circle, rgba(0,207,255,0.05) 0%, transparent 65%)`, pointerEvents: "none" }} />
        
        {/* Decorative Shapes */}
        <DecorativeShape 
          size={600} 
          opacity={0.14} 
          rotate={15} 
          className="-bottom-40 -right-20" 
        />

        <div className="sa-container grid gap-16 lg:gap-24 items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div className="max-w-xl">
            <div className="sa-reveal mb-3"><SectionLabel onDark={false}>Project Overview</SectionLabel></div>
            <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20, color: COLORS.textDark }}>
              The <em style={{ fontStyle: "italic", color: COLORS.pink }}>Aha</em> Homes<br />You Deserve
            </h2>
            <p className="sa-reveal sa-d2" style={{ fontSize: 16, color: COLORS.mutedLight, lineHeight: 1.85, marginBottom: 40, maxWidth: 480 }}>
              Subham Ashray is not just a residence — it's a promise of everyday joy. Sprawling across generous open grounds in Guwahati's Aerocity corridor, it offers 9 towers of artfully designed 2 & 3 BHK homes where architecture meets lifestyle.
            </p>
            <div className="flex flex-col gap-4 sa-reveal sa-d3">
              {features.map(({ icon, name, sub, accent }) => (
                <div key={name} className="sa-feature-row flex items-center gap-5 px-5 py-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(26,26,46,0.09)", backdropFilter: "blur(8px)", boxShadow: "0 2px 16px rgba(26,26,46,0.06)" }}>
                  <div className="flex items-center justify-center rounded-xl flex-shrink-0 text-xl"
                    style={{ width: 44, height: 44, background: `${accent}14`, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2, color: COLORS.textDark }}>{name}</div>
                    <div style={{ fontSize: 13, color: COLORS.mutedLight }}>{sub}</div>
                  </div>
                  <div style={{ marginLeft: "auto", width: 4, height: 28, background: accent, borderRadius: 2, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sa-reveal sa-d2 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {stats.map(({ target, suffix, label, color }) => (
                <div key={label} className="sa-metric-card-light p-8 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(26,26,46,0.08)", boxShadow: "0 4px 20px rgba(26,26,46,0.06)", backdropFilter: "blur(12px)" }}>
                  <span className="sa-serif block" style={{ fontSize: 50, fontWeight: 900, lineHeight: 1, color, marginBottom: 8 }}>
                    <span data-counter data-target={target}>0</span><span style={{ fontSize: 22, fontWeight: 400 }}>{suffix}</span>
                  </span>
                  <div style={{ fontSize: 12, color: COLORS.mutedLight, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
            <div className="sa-reveal sa-d4 p-7 rounded-2xl" style={{ background: "linear-gradient(135deg,rgba(255,184,0,0.08),rgba(255,184,0,0.03))", borderLeft: `3px solid ${COLORS.yellow}`, border: `1px solid rgba(255,184,0,0.2)`, boxShadow: "0 4px 20px rgba(255,184,0,0.08)" }}>
              <p className="sa-serif" style={{ fontSize: 17, fontStyle: "italic", lineHeight: 1.6, color: COLORS.textDark, marginBottom: 12 }}>
                "Come, live the Aha Life — where children grow, parents rejoice, and every moment becomes a cherished memory."
              </p>
              <p style={{ fontSize: 13, color: COLORS.mutedLight }}>Mr. Kailash Chandra Lohia, Chairman — Subham Group</p>
            </div>
          </div>
        </div>
      </section>
      <WaveLightToDark fromColor={COLORS.warmWhite} toColor={COLORS.darkBlue} />
    </>
  );
}
