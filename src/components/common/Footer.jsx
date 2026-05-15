import React from 'react';
import { COLORS } from '../../constants/colors';
import { DecorativeShape } from './DecorativeShape';
import logoImg from '../../assets/images/logo.png';

export function Footer() {
  const cols = [
    { title: "Project",  links: ["Overview","Amenities","Gallery","Floor Plans","Location"] },
    { title: "Company",  links: ["About Us","Our Projects","Careers","Media","CSR"] },
  ];
  return (
    <footer className="sa-sans" style={{ background: COLORS.darkNavy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 0 40px", position: "relative", overflow: "hidden" }}>
      {/* Decorative Background Shapes */}
      <DecorativeShape size={600} opacity={0.14} rotate={-15} className="-bottom-40 -left-20" />
      <div className="sa-container">
        <div className="grid gap-12 lg:gap-8 mb-12" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
          <div style={{ gridColumn: "span 2" }}>
            <div className="flex items-center mb-5">
              <img 
                src={logoImg} 
                alt="Subham Ashray" 
                style={{ height: "70px", width: "auto" }} 
              />
            </div>
            <p style={{ fontSize: 14, color: COLORS.mutedDark, lineHeight: 1.7, marginBottom: 14, maxWidth: 320 }}>A luxury residential township in Guwahati's Aerocity corridor. Where everyday life becomes an extraordinary experience.</p>
            <p style={{ fontSize: 12, color: COLORS.hintDark, marginBottom: 20 }}>A Unit of <strong style={{ color: COLORS.mutedDark }}>Subham Group</strong></p>
            <div className="flex gap-3">
              {["f","▶","◉"].map((s,i) => (
                <div key={i} className="sa-social-btn" style={{ width: 34, height: 34, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: COLORS.mutedDark }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map(({ title, links }) => (
            <div key={title} style={{ gridColumn: "span 1" }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff", marginBottom: 16 }}>{title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => <li key={l}><a href="#" className="sa-footer-link" style={{ fontSize: 13 }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>Corporate Address</h4>
                <div style={{ fontSize: 13, color: COLORS.mutedDark, lineHeight: 1.6 }}>
                  Subham Velocity, 5th Floor<br />
                  Honuram Boro Path, Opp. Wallford<br />
                  Guwahati, Pin – 781005, Assam
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>Site Address</h4>
                <div style={{ fontSize: 13, color: COLORS.mutedDark, lineHeight: 1.6 }}>
                  Subham Ashray, Aerocity<br />
                  Dharapur-Palash Bari Road<br />
                  Guwahati-781017, Assam
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-wrap gap-8 lg:gap-12 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", alignItems: "flex-start" }}>
          <div style={{ fontSize: 12, color: COLORS.hintDark, lineHeight: 1.6, flexShrink: 0, minWidth: 200 }}>
            <strong style={{ color: COLORS.primary, textTransform: "uppercase", fontSize: 10, letterSpacing: 1, display: "block", marginBottom: 4 }}>Rera Registration No</strong>
            RERAA KM 113 of 2022-2023
          </div>
          <p style={{ fontSize: 11, color: COLORS.hintDark, lineHeight: 1.7, flex: 1, minWidth: 280 }}>
            This is not a legal document. Plans and photographs are conceptual and subject to change. The actual product may vary at the developer's sole discretion.
          </p>
          <div className="w-full lg:w-auto" style={{ fontSize: 11, color: COLORS.hintDark, textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
            <span style={{ opacity: 0.6 }}>© 2024 Subham Group</span><br />
            <span style={{ fontWeight: 600 }}>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
