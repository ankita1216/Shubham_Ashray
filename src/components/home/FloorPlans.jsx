import React, { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { floorPlansData } from '../../data/floorPlansData';
import { DecorativeShape } from '../common/DecorativeShape';

export function FloorPlans({ onOpenModal }) {
  const [tab, setTab] = useState("2bhk");
  return (
    <>
      <section id="floor-plans" className="sa-sans sa-noise sa-section" style={{ background: COLORS.darkMid, position: "relative", overflow: "hidden" }}>
        <div className="absolute -top-24 right-0" style={{ width: 450, height: 450, background: `radial-gradient(circle,rgba(255,184,0,0.06) 0%,transparent 70%)`, pointerEvents: "none" }} />
        
        {/* Decorative Background Shapes */}
        <DecorativeShape 
          size={500} 
          opacity={0.14} 
          rotate={160} 
          className="-bottom-32 -right-32" 
        />

        <div className="sa-container">
          <div className="sa-reveal"><SectionLabel onDark={true}>Floor Plans</SectionLabel></div>
          <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20, color: "#fff" }}>
            Designed For <span style={{ color: COLORS.yellow }}>Living</span>
          </h2>
          <p className="sa-reveal sa-d2" style={{ fontSize: 16, color: COLORS.mutedDark, lineHeight: 1.8, maxWidth: 520, marginBottom: 48 }}>
            Thoughtfully planned layouts that maximise natural light, ventilation, and space utilisation.
          </p>
          <div className="sa-reveal sa-d3 flex gap-2 p-1.5 rounded-full w-fit mb-16"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
            {["2bhk", "3bhk"].map((t) => (
              <button key={t} className={`sa-tab-btn sa-sans ${tab === t ? "active" : ""}`}
                style={{ color: tab === t ? "#fff" : COLORS.mutedDark }}
                onClick={() => setTab(t)}>
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {floorPlansData[tab].map(({ type, block, sbua, bua, carpet, balcony }) => (
              <div key={type} className="sa-plan-card rounded-2xl overflow-hidden"
                style={{ background: COLORS.darkCard, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center justify-center p-10 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(0,207,255,0.03))" }}>
                  <div className="relative" style={{ width: 200, height: 160, border: "1px solid rgba(0,207,255,0.18)", borderRadius: 4, background: "rgba(0,207,255,0.02)" }}>
                    <div className="absolute" style={{ inset: 16, border: "1px dashed rgba(0,207,255,0.13)", borderRadius: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 1 }}>
                      <div style={{ gridColumn: "span 2", border: "1px solid rgba(0,207,255,0.13)", display: "flex", alignItems: "center", justifyCenter: "center", fontSize: 9, color: "rgba(0,207,255,0.45)", background: "rgba(0,207,255,0.03)", fontWeight: 500, letterSpacing: 0.5 }}>LIVING / DINING</div>
                      {tab === "3bhk"
                        ? ["BED 1", "BED 2", "BED 3"].map((r) => <div key={r} style={{ border: "1px solid rgba(0,207,255,0.13)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "rgba(0,207,255,0.4)" }}>{r}</div>)
                        : ["MASTER BED", "BED 2"].map((r) => <div key={r} style={{ border: "1px solid rgba(0,207,255,0.13)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "rgba(0,207,255,0.4)" }}>{r}</div>)
                      }
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="sa-serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#fff" }}>{type}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: .5, color: COLORS.pink, marginBottom: 20 }}>{block}</div>
                  <div className="grid grid-cols-4 gap-4 mb-8">
                    {[["SBU Area", sbua], ["BU Area", bua], ["Carpet", carpet], ["Balcony", balcony]].map(([l, v]) => (
                      <div key={l}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{v}</div>
                        <div style={{ fontSize: 11, color: COLORS.mutedDark, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={onOpenModal}
                    className="w-full sa-btn-primary sa-sans" 
                    style={{ borderRadius: 12, padding: "14px", fontSize: 13 }}
                  >
                    Download Detailed Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveDarkToLight fromColor={COLORS.darkMid} toColor={COLORS.warmWhite} />
    </>
  );
}
