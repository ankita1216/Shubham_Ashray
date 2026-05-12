import React from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';
import { galleryData } from '../../data/galleryData';

export function Gallery() {
  return (
    <>
      <section id="gallery" className="sa-sans sa-noise sa-section" style={{ background: COLORS.softCream, position: "relative", overflow: "hidden" }}>
        <div className="absolute top-0 right-0" style={{ width: 400, height: 400, background: `radial-gradient(circle,rgba(233,30,140,0.05) 0%,transparent 65%)`, pointerEvents: "none" }} />
        
        {/* Decorative Background Shapes */}
        <DecorativeShape 
          size={550} 
          opacity={0.16} 
          rotate={140} 
          className="-top-24 -right-24" 
        />

        <div className="sa-container">
          <div className="sa-reveal"><SectionLabel onDark={false}>Gallery</SectionLabel></div>
          <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 48, color: COLORS.textDark }}>
            Architecture That <span style={{ color: COLORS.pink }}>Inspires</span>
          </h2>
          <div className="sa-reveal sa-d2 grid gap-6 sm:gap-8" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
            {galleryData.map(({ label, icon, bg, span, textColor }) => (
              <div key={label} className="sa-gallery-item relative" style={{ gridColumn: `span ${span === 2 ? 4 : 2}` }}>
                <div className="sa-gallery-img flex flex-col items-center justify-center gap-3 w-full rounded-2xl"
                  style={{ aspectRatio: span === 2 ? "16/7" : "16/9", background: bg, boxShadow: "0 8px 32px rgba(26,26,46,0.12)" }}>
                  <span style={{ fontSize: 44 }}>{icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: textColor, opacity: 0.8 }}>{label.split("—")[0]}</span>
                  <span style={{ fontSize: 11, color: textColor, opacity: 0.45, background: "rgba(255,255,255,0.4)", padding: "3px 10px", borderRadius: 20 }}>Artist's Impression</span>
                </div>
                <div className="sa-gallery-overlay rounded-2xl">
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveLightToDark fromColor={COLORS.softCream} toColor={COLORS.darkMid} />
    </>
  );
}
