import React from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { amenitiesData } from '../../data/amenitiesData';
import { DecorativeShape } from '../common/DecorativeShape';

export function Amenities() {
  return (
    <section id="amenities" className="sa-sans sa-section" style={{ background: COLORS.darkBlue, position: "relative", overflow: "hidden" }}>
      <div className="absolute -bottom-12 -left-12" style={{ width: 450, height: 450, background: `radial-gradient(circle,rgba(233,30,140,0.09) 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div className="absolute top-0 right-0" style={{ width: 350, height: 350, background: `radial-gradient(circle,rgba(0,207,255,0.06) 0%,transparent 70%)`, pointerEvents: "none" }} />

      <div className="absolute top-0 right-0" style={{ width: 350, height: 350, background: `radial-gradient(circle,rgba(0,207,255,0.06) 0%,transparent 70%)`, pointerEvents: "none" }} />
      
      {/* Decorative Background Shapes */}
      <DecorativeShape 
        size={550} 
        opacity={0.16} 
        rotate={-30} 
        className="-top-24 -left-24" 
      />

      <div className="sa-container">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="sa-reveal"><SectionLabel onDark={true}>World-Class Amenities</SectionLabel></div>
            <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, color: "#fff" }}>
              Every Joy,<br /><span style={{ color: COLORS.cyan }}>Right Here.</span>
            </h2>
          </div>
          <p className="sa-reveal sa-d2 text-left lg:text-right" style={{ fontSize: 15, color: COLORS.mutedDark, maxWidth: 320, lineHeight: 1.7 }}>
            30+ curated amenities designed for your every mood and moment
          </p>
        </div>
        <div className="grid gap-6 sm:gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {amenitiesData.map(({ icon, name, desc, color }, i) => (
            <div key={name} className={`sa-amenity-card sa-reveal sa-d${Math.min(i % 4 + 1, 4)} rounded-2xl p-8 relative overflow-hidden`}
              style={{ background: COLORS.darkMid, border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>{icon}</div>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, color: "#fff" }}>{name}</div>
              <div style={{ fontSize: 13, color: COLORS.mutedDark, lineHeight: 1.65 }}>{desc}</div>
              <div style={{ width: 32, height: 2, background: color, borderRadius: 2, marginTop: 20 }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
