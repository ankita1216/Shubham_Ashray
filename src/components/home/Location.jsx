import React from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';
import { locationData, distanceTierConfig } from '../../data/locationData';

export function Location() {
  const { colors: distColor, backgrounds: distBg } = distanceTierConfig;

  return (
    <>
      <section id="location" className="sa-sans sa-noise sa-section" style={{ background: COLORS.warmWhite, position: "relative", overflow: "hidden" }}>
        <div className="absolute top-1/2 -right-24 -translate-y-1/2" style={{ width: 400, height: 400, background: `radial-gradient(circle, ${COLORS.primary}0D 0%, transparent 70%)`, pointerEvents: "none" }} />
        
        {/* Decorative Background Shapes */}
        <DecorativeShape 
          size={500} 
          opacity={0.16} 
          rotate={-15} 
          className="-bottom-40 -left-20" 
        />

        <div className="sa-container">
          <div className="sa-reveal"><SectionLabel onDark={false}>Location</SectionLabel></div>
          <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 20, color: COLORS.textDark }}>
            Wellborn & <span style={{ color: COLORS.primary }}>Well-Connected</span>
          </h2>
          <p className="sa-reveal sa-d2" style={{ fontSize: 16, color: COLORS.mutedLight, lineHeight: 1.8, maxWidth: 560, marginBottom: 64 }}>
            Strategically placed in Guwahati's fastest-growing corridor — connected to the airport, universities, hospitals, and everything that matters.
          </p>
          <div className="grid gap-12 lg:gap-20 items-start" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {/* Map card — dark inset */}
            <div className="sa-reveal-l rounded-3xl p-10 relative overflow-hidden" style={{ background: COLORS.darkBlue, minHeight: 480, boxShadow: "0 16px 60px rgba(26,26,46,0.2)" }}>
              <div className="absolute top-5 left-5 rounded-full px-4 py-1.5 text-xs font-bold sa-sans" style={{ background: COLORS.primary, color: COLORS.darkNavy }}>✈ 5.7 km to Airport</div>
              <div className="flex flex-col items-center justify-center h-full gap-4" style={{ minHeight: 380 }}>
                <svg width="100%" height="200" viewBox="0 0 400 200" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}>
                  {[40, 80, 120, 160].map(y => <line key={y} x1="0" y1={y * 2} x2="400" y2={y * 2} stroke="white" strokeWidth="0.5" />)}
                  {[50, 100, 150, 200, 250, 300, 350].map(x => <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="white" strokeWidth="0.5" />)}
                  <path d="M 0 180 Q 100 160 200 180 Q 300 200 400 180" stroke="white" strokeWidth="2" fill="none" />
                  <path d="M 160 0 Q 180 90 200 180 Q 220 270 200 360" stroke="white" strokeWidth="2" fill="none" />
                </svg>
                <div style={{ width: 18, height: 18, background: COLORS.primary, borderRadius: "50%", animation: "saMapPulse 2s ease-in-out infinite", position: "relative", zIndex: 1 }} />
                <div className="sa-serif text-white text-center relative z-10" style={{ fontSize: 20, fontWeight: 600 }}>Subham Ashray</div>
                <div className="text-center relative z-10" style={{ fontSize: 13, color: COLORS.mutedDark, maxWidth: 220 }}>
                  Aerocity Dharapur<br />Palash Bari Road, Guwahati 781017
                </div>
                <a href="https://www.google.com/maps/search/Subham+Ashray+Guwahati" target="_blank"
                  className="sa-btn-primary sa-sans relative z-10" style={{ padding: "10px 24px", fontSize: 13, textDecoration: "none", display: "inline-block" }}>
                  Get Directions →
                </a>
              </div>
              <div className="absolute bottom-5 right-5 rounded-full px-4 py-1.5 text-xs font-bold sa-sans" style={{ background: COLORS.primary, color: COLORS.darkNavy }}>🎓 Gauhati Univ 5.4 km</div>
            </div>

            {/* Connectivity list — on light */}
            <div className="sa-reveal-r flex flex-col gap-6">
              {locationData.map(({ title, color, items }) => (
                <div key={title}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid rgba(26,26,46,0.1)` }}>
                    {title}
                  </div>
                  <div className="flex flex-col gap-2">
                    {items.map(([name, dist, tier]) => (
                      <div key={name} className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(26,26,46,0.08)", backdropFilter: "blur(8px)" }}>
                        <span style={{ fontSize: 13, color: COLORS.mutedLight }}>{name}</span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: distBg[tier], color: distColor[tier] }}>{dist}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WaveLightToDark fromColor={COLORS.warmWhite} toColor={COLORS.darkNavy} />
    </>
  );
}
