import React from 'react';
import { COLORS } from '../../constants/colors';
import { DecorativeShape } from './DecorativeShape';
import logoImg from '../../assets/images/logo.png';

export function Footer() {
  const projectLinks = ["Overview", "Amenities", "Gallery", "Floor Plans", "Location"];

  return (
    <footer className="sa-sans" style={{ background: COLORS.darkNavy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 0 40px", position: "relative", overflow: "hidden" }}>
      {/* Decorative Background Shapes */}
      <DecorativeShape size={600} opacity={0.14} rotate={-15} className="-bottom-40 -left-20" />
      <DecorativeShape size={400} opacity={0.06} rotate={45} className="-top-20 right-10" />

      <div className="sa-container">
        {/* ── Tier 1: Brand & Slogan ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px 60px", marginBottom: 72 }}>
          <div style={{ flex: "1 1 320px" }}>
            <img 
              src={logoImg} 
              alt="Subham Ashray" 
              style={{ height: "82px", width: "auto", marginBottom: 26, filter: "brightness(1.05)" }} 
            />
            <p style={{ fontSize: 15, color: COLORS.mutedDark, lineHeight: 1.75, maxWidth: 420, margin: 0 }}>
              A landmark residential township in Guwahati's Aerocity corridor. Crafting an extraordinary life through thoughtful design and curated amenities.
            </p>
          </div>
          <div style={{ flex: "1 1 320px", textAlign: "right" }}>
            <div className="sa-serif" style={{ fontSize: "clamp(34px, 5vw, 52px)", fontStyle: "italic", color: COLORS.primary, lineHeight: 1, marginBottom: 14 }}>
              Live the Aha Life.
            </div>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.hintDark, margin: 0, fontWeight: 700 }}>
              A Unit of Subham Group
            </p>
          </div>
        </div>

        {/* ── Tier 2: Information Grid ── */}
        <div className="grid gap-12 lg:gap-8 mb-16" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          
          {/* Column 1: Explore */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 14, height: 1, background: COLORS.primary }} />
              Explore
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
              {projectLinks.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(' ', '-')}`} className="sa-footer-link" style={{ fontSize: 13.5 }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Corporate Office */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 14, height: 1, background: COLORS.primary }} />
              Corporate Office
            </h4>
            <div style={{ fontSize: 14, color: COLORS.mutedDark, lineHeight: 1.65 }}>
              Subham Velocity, 5th Floor<br />
              Honuram Boro Path, Opp. Wallford<br />
              Guwahati, Pin – 781005, Assam
            </div>
          </div>

          {/* Column 3: Site Location */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 14, height: 1, background: COLORS.primary }} />
              Site Location
            </h4>
            <div style={{ fontSize: 14, color: COLORS.mutedDark, lineHeight: 1.65 }}>
              Subham Ashray, Aerocity<br />
              Dharapur-Palash Bari Road<br />
              Guwahati-781017, Assam
            </div>
          </div>

          {/* Column 4: Social Connect */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#fff", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 14, height: 1, background: COLORS.primary }} />
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              {["f","▶","◉"].map((s,i) => (
                <div key={i} className="sa-social-btn" style={{ 
                  width: 36, height: 36, borderRadius: "50%", 
                  background: "rgba(255,255,255,0.04)", 
                  border: "1px solid rgba(255,255,255,0.08)", 
                  color: COLORS.mutedDark,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.3s"
                }}>{s}</div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: COLORS.hintDark, fontWeight: 500, marginTop: 14, letterSpacing: "0.05em" }}>
              ESTD. 2007
            </div>
          </div>
        </div>

        {/* ── Tier 3: Compliance & Copyright ── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 36 }}>
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              <div style={{ fontSize: 12.5, color: COLORS.hintDark }}>
                <span style={{ color: COLORS.primary, fontWeight: 800, textTransform: "uppercase", fontSize: 10, letterSpacing: "0.12em", display: "block", marginBottom: 5 }}>Rera Reg. No.</span>
                RERAA KM 113 of 2022-2023
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: COLORS.hintDark, margin: 0, fontWeight: 500 }}>
                © 2024 Subham Group. <span style={{ color: "rgba(255,255,255,0.35)" }}>All rights reserved.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
