import React from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { pastProjects, developerMetrics } from '../../data/projectsData';

export function About() {
  return (
    <>
      <section id="about" className="sa-sans sa-section" style={{ background: COLORS.darkNavy, position: "relative", overflow: "hidden" }}>
        <div className="absolute -top-12 -right-12" style={{ width: 450, height: 450, background: `radial-gradient(circle,rgba(255,184,0,0.07) 0%,transparent 70%)`, pointerEvents: "none" }} />
        <div className="absolute bottom-0 left-0" style={{ width: 350, height: 350, background: `radial-gradient(circle,rgba(233,30,140,0.07) 0%,transparent 70%)`, pointerEvents: "none" }} />

        <div className="sa-container grid gap-16 lg:gap-24 items-center" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <div>
            <div className="sa-reveal"><SectionLabel onDark={true}>Developer Profile</SectionLabel></div>
            <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 44, color: "#fff" }}>
              Timebound Projects,<br /><span style={{ color: COLORS.yellow }}>Timeless</span> Relationships.
            </h2>
            <blockquote className="sa-reveal sa-d2 sa-serif" style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.5, color: "rgba(255,255,255,0.9)", paddingLeft: 28, borderLeft: `3px solid ${COLORS.yellow}`, marginBottom: 32 }}>
              "Growing up, we all had the opportunity to enjoy nature at its best. We wanted to gift families a present enjoyed for years to come."
            </blockquote>
            <div className="sa-reveal sa-d3" style={{ paddingLeft: 28, marginBottom: 60 }}>
              <strong style={{ display: "block", fontSize: 15, fontWeight: 600, marginBottom: 3, color: "#fff" }}>Mr. Kailash Chandra Lohia</strong>
              <span style={{ fontSize: 13, color: COLORS.mutedDark }}>Chairman, Subham Group · A Unit of Lohia Group</span>
            </div>
            <div className="sa-reveal sa-d4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {developerMetrics.map(({ target, suffix, label, color }) => (
                <div key={label} className="text-center p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="sa-serif" style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, color, marginBottom: 6 }}>
                    <span data-counter data-target={target}>0</span>{suffix}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.mutedDark, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="sa-reveal" style={{ fontSize: 16, color: COLORS.mutedDark, lineHeight: 1.9, marginBottom: 40 }}>
              Since 2007, Subham Group has been Guwahati's premier real estate developer — known for innovations, time-bound delivery, and exceptional after-sale service. Every project is a testament to the promise of quality living for thousands of families across Northeast India.
            </p>
            <div className="sa-reveal sa-d2 grid grid-cols-2 gap-4">
              {pastProjects.map(([name, sub]) => (
                <div key={name} className="p-5 rounded-2xl" style={{ background: COLORS.darkMid, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "#fff" }}>{name}</div>
                  <div style={{ fontSize: 12, color: COLORS.yellow }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WaveDarkToLight fromColor={COLORS.darkNavy} toColor={COLORS.luxBeige} />
    </>
  );
}
