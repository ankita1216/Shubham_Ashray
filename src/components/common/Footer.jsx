import React from 'react';
import { COLORS } from '../../constants/colors';
import { DecorativeShape } from './DecorativeShape';
import logoImg from '../../assets/images/logo.png';

export function Footer() {
  const cols = [
    { title: "Project",  links: ["Overview","Amenities","Gallery","Floor Plans","Location"] },
    { title: "Company",  links: ["About Us","Our Projects","Careers","Media","CSR"] },
    { title: "Contact",  links: ["+91-98540 43000","Book Site Visit","WhatsApp","Corporate Office"] },
  ];
  return (
    <footer className="sa-sans" style={{ background: COLORS.darkNavy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "100px 0 48px", position: "relative", overflow: "hidden" }}>
      {/* Decorative Background Shapes */}
      <DecorativeShape size={600} opacity={0.14} rotate={-15} className="-bottom-40 -left-20" />
      <div className="sa-container">
        <div className="grid gap-12 lg:gap-16 mb-20" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <div style={{ gridColumn: "span 2" }}>
            <div className="flex items-center mb-6">
              <img 
                src={logoImg} 
                alt="Subham Ashray" 
                style={{ height: "80px", width: "auto" }} 
              />
            </div>
            <p style={{ fontSize: 15, color: COLORS.mutedDark, lineHeight: 1.8, marginBottom: 16, maxWidth: 360 }}>A luxury residential township in Guwahati's Aerocity corridor. Where everyday life becomes an extraordinary experience.</p>
            <p style={{ fontSize: 13, color: COLORS.hintDark, marginBottom: 24 }}>A Unit of <strong style={{ color: COLORS.mutedDark }}>Lohia Group</strong></p>
            <div className="flex gap-4">
              {["f","▶","◉"].map((s,i) => (
                <div key={i} className="sa-social-btn" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: COLORS.mutedDark }}>{s}</div>
              ))}
            </div>
          </div>
          {cols.map(({ title, links }) => (
            <div key={title} style={{ gridColumn: "span 1" }}>
              <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#fff", marginBottom: 20 }}>{title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((l) => <li key={l}><a href="#" className="sa-footer-link">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="flex flex-wrap gap-8 lg:gap-12 pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", alignItems: "flex-start" }}>
          <div style={{ fontSize: 13, color: COLORS.hintDark, lineHeight: 1.7, flexShrink: 0, minWidth: 200 }}>
            <strong style={{ color: COLORS.primary, textTransform: "uppercase", fontSize: 10, letterSpacing: 1, display: "block", marginBottom: 4 }}>RERA Registration</strong>
            RERAA KM 113 of 2022-2023<br />
            RERA KM 162 of 2023-2024
          </div>
          <p style={{ fontSize: 11, color: COLORS.hintDark, lineHeight: 1.8, flex: 1, minWidth: 280 }}>
            This is not a legal document. Plans and photographs are conceptual and subject to change. The actual product may vary at the developer's sole discretion. No claims shall be entertained based solely on this material.
          </p>
          <div className="w-full lg:w-auto" style={{ fontSize: 12, color: COLORS.hintDark, textAlign: "right", whiteSpace: "nowrap", flexShrink: 0 }}>
            <span style={{ opacity: 0.6 }}>© 2024 Subham Group</span><br />
            <span style={{ fontWeight: 600 }}>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
