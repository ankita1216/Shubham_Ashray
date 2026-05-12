import React from 'react';
import { COLORS } from '../../constants/colors';
import { WaveDarkToLight } from '../common/Dividers';

export function VideoSection() {
  return (
    <>
      <section className="sa-sans sa-section" style={{ background: COLORS.darkBlue }}>
        <div className="sa-container">
          <div className="sa-reveal sa-video-wrap rounded-3xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{ minHeight: 380, background: COLORS.darkMid, border: "1px solid rgba(255,255,255,0.07)" }}
            onClick={() => alert("Video walkthrough coming soon!")}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 60% at 30% 50%,rgba(233,30,140,0.08) 0%,transparent 60%), radial-gradient(ellipse 40% 60% at 70% 50%,rgba(0,207,255,0.06) 0%,transparent 60%)` }} />
            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="flex items-center justify-center rounded-full"
                style={{ width: 80, height: 80, background: COLORS.pink, animation: "saPulse 2.5s ease-in-out infinite" }}>
                <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: "20px solid white", marginLeft: 5 }} />
              </div>
              <p className="sa-serif text-white text-center" style={{ fontSize: 26, fontWeight: 600 }}>Watch the Subham Ashray Walkthrough</p>
              <p style={{ fontSize: 14, color: COLORS.mutedDark }}>Explore your future home in a cinematic 3D walkthrough</p>
            </div>
          </div>
        </div>
      </section>
      <WaveDarkToLight fromColor={COLORS.darkBlue} toColor={COLORS.softCream} />
    </>
  );
}
