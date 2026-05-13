import React from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';

export function Overview() {
  const stats = [
    { target: 70, suffix: "%", label: "Open Space", color: COLORS.pink },
    { target: 525, suffix: "", label: "Spacious Flats", color: "#1A1A2E" },
    { target: 9, suffix: "", label: "Towers", color: COLORS.yellow },
    { target: 1255, suffix: "", label: "Max Sq.Ft", color: COLORS.lime },
  ];

  const features = [
    { icon: "🏛️", name: "Earthquake Resistant", sub: "RCC frame engineered", accent: COLORS.pink },
    { icon: "⚡", name: "24×7 Power Backup", sub: "Uninterrupted living", accent: COLORS.cyan },
    { icon: "🛡️", name: "Smart Security", sub: "CCTV + manned guards", accent: COLORS.yellow },
    { icon: "🌿", name: "Rainwater Harvesting", sub: "Eco-conscious design", accent: COLORS.lime },
  ];

  return (
    <>
      <section
        id="overview-section"
        className="sa-sans sa-noise sa-section py-20 lg:py-32"
        style={{ background: COLORS.warmWhite, position: "relative", overflow: "hidden" }}
      >
        {/* Subtle Background Glow */}
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{ width: "60vw", height: "60vh", background: `radial-gradient(circle, rgba(0,207,255,0.03) 0%, transparent 70%)` }}
        />

        {/* Decorative Shapes */}
        <DecorativeShape
          size={600}
          opacity={0.14}
          rotate={15}
          className="absolute -bottom-40 -right-20 pointer-events-none"
        />

        <div className="sa-container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">

          {/* Left Column: Content & Features */}
          <div className="flex flex-col">
            <div className="sa-reveal mb-4">
              <SectionLabel onDark={false}>Project Overview</SectionLabel>
            </div>

            <h2 className="sa-reveal sa-d1 sa-serif text-4xl lg:text-5xl xl:text-6xl font-black leading-tight tracking-tight mb-6" style={{ color: COLORS.textDark }}>
              The <em style={{ fontStyle: "italic", color: COLORS.pink }}>Aha</em> Homes<br />You Deserve
            </h2>

            <p className="sa-reveal sa-d2 text-lg leading-relaxed mb-10 max-w-lg" style={{ color: COLORS.mutedLight }}>
              Subham Ashray is not just a residence — it's a promise of everyday joy. Sprawling across generous open grounds in Guwahati's Aerocity corridor, it offers 9 towers of artfully designed 2 & 3 BHK homes where architecture meets lifestyle.
            </p>

            {/* Features changed to a 2x2 grid for better use of space */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sa-reveal sa-d3">
              {features.map(({ icon, name, sub, accent }) => (
                <div
                  key={name}
                  className="group flex flex-col p-5 rounded-2xl transition-transform hover:-translate-y-1 duration-300"
                  style={{
                    background: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-xl text-2xl mb-4 h-12 w-12"
                    style={{ background: `${accent}15`, color: accent }}
                  >
                    {icon}
                  </div>
                  <h4 className="text-[15px] font-bold mb-1" style={{ color: COLORS.textDark }}>{name}</h4>
                  <p className="text-sm leading-snug" style={{ color: COLORS.mutedLight }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats & Quote */}
          <div className="flex flex-col gap-10">

            {/* Stats Grid */}
            <div className="sa-reveal sa-d2 grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map(({ target, suffix, label, color }) => (
                <div
                  key={label}
                  className="flex flex-col justify-center p-8 rounded-3xl text-center"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(26,26,46,0.04)",
                    boxShadow: "0 10px 40px rgba(26,26,46,0.05)"
                  }}
                >
                  <span className="sa-serif block mb-2" style={{ fontSize: "clamp(40px, 4vw, 56px)", fontWeight: 900, lineHeight: 1, color }}>
                    <span data-counter data-target={target}>0</span>
                    <span className="text-2xl font-medium">{suffix}</span>
                  </span>
                  <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: COLORS.mutedLight }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Redesigned Quote Block */}
            <div
              className="sa-reveal sa-d4 p-8 rounded-3xl relative overflow-hidden"
              style={{ background: COLORS.warmWhite }}
            >
              {/* Subtle accent line instead of heavy borders */}
              <div className="absolute top-0 left-0 w-1.5 h-full" style={{ background: COLORS.yellow }} />

              <div className="text-4xl opacity-20 mb-2 sa-serif" style={{ color: COLORS.yellow }}>"</div>
              <p className="sa-serif text-lg lg:text-xl italic leading-relaxed mb-6" style={{ color: COLORS.textDark }}>
                Come, live the Aha Life — where children grow, parents rejoice, and every moment becomes a cherished memory.
              </p>

              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8" style={{ background: COLORS.mutedLight }} />
                <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: COLORS.mutedLight }}>
                  Kailash Chandra Lohia <span className="font-normal normal-case block text-xs mt-0.5">Chairman, Subham Group</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <WaveLightToDark fromColor={COLORS.warmWhite} toColor={COLORS.darkBlue} />
    </>
  );
}