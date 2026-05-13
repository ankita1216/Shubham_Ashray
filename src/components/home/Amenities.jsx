import React, { useState } from 'react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { amenitiesData } from '../../data/amenitiesData';
import { DecorativeShape } from '../common/DecorativeShape';

// ── Compact card sizes for the bento grid ──────────────────────────────────
const LAYOUTS = [
  { col: "span 2", row: "span 2", featured: true },  // 0 — hero double
  { col: "span 1", row: "span 1", featured: false },  // 1
  { col: "span 1", row: "span 1", featured: false },  // 2
  { col: "span 1", row: "span 2", featured: false },  // 3 — tall
  { col: "span 1", row: "span 1", featured: false },  // 4
  { col: "span 2", row: "span 1", featured: false },  // 5 — wide
  { col: "span 1", row: "span 1", featured: false },  // 6
  { col: "span 1", row: "span 1", featured: false },  // 7
  { col: "span 1", row: "span 1", featured: false },  // 8
  { col: "span 2", row: "span 1", featured: false },  // 9 — wide
  { col: "span 1", row: "span 1", featured: false },  // 10
  { col: "span 1", row: "span 2", featured: false },  // 11 — tall
  { col: "span 1", row: "span 1", featured: false },  // 12
  { col: "span 2", row: "span 1", featured: false },  // 13 — wide
  { col: "span 1", row: "span 1", featured: false },  // 14
];

function AmenityCard({ icon, name, desc, color, layout, index }) {
  const [hovered, setHovered] = useState(false);
  const isFeatured = layout?.featured;
  const isWide = layout?.col === "span 2" && layout?.row === "span 1";
  const isTall = layout?.col === "span 1" && layout?.row === "span 2";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: layout?.col || "span 1",
        gridRow: layout?.row || "span 1",
        position: "relative",
        borderRadius: isFeatured ? 20 : 14,
        overflow: "hidden",
        cursor: "pointer",
        background: hovered
          ? `linear-gradient(135deg, ${COLORS.darkMid} 0%, ${color}14 100%)`
          : COLORS.darkMid,
        border: hovered
          ? `1px solid ${color}45`
          : "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-3px) scale(1.005)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px ${color}25, inset 0 1px 0 rgba(255,255,255,0.06)`
          : "0 2px 12px rgba(0,0,0,0.2)",
        padding: isFeatured ? "36px" : isWide ? "26px 28px" : "24px",
        display: "flex",
        flexDirection: isFeatured ? "column" : isWide ? "row" : "column",
        alignItems: isFeatured ? "flex-start" : isWide ? "center" : "flex-start",
        gap: isWide ? 20 : 0,
      }}
    >
      {/* Ambient glow blob */}
      <div style={{
        position: "absolute",
        top: isFeatured ? -60 : -40,
        right: isFeatured ? -60 : -40,
        width: isFeatured ? 200 : 120,
        height: isFeatured ? 200 : 120,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}${hovered ? "22" : "0d"} 0%, transparent 70%)`,
        transition: "all 0.5s ease",
        pointerEvents: "none",
      }} />

      {/* Corner number */}
      <div style={{
        position: "absolute",
        top: 14,
        right: 18,
        fontFamily: "monospace",
        fontSize: 10,
        color: hovered ? `${color}90` : "rgba(255,255,255,0.12)",
        letterSpacing: "0.08em",
        fontWeight: 700,
        transition: "color 0.4s ease",
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon container */}
      <div style={{
        width: isFeatured ? 56 : 42,
        height: isFeatured ? 56 : 42,
        borderRadius: isFeatured ? 16 : 12,
        background: hovered ? `${color}28` : `${color}14`,
        border: `1px solid ${color}${hovered ? "40" : "20"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isFeatured ? 26 : 20,
        flexShrink: 0,
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1) rotate(0deg)",
        marginBottom: isWide ? 0 : isFeatured ? 28 : 18,
      }}>
        {icon}
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: isFeatured ? 20 : isWide ? 16 : 15,
          fontWeight: 700,
          color: "#fff",
          marginBottom: isFeatured ? 10 : 6,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          whiteSpace: isWide ? "nowrap" : "normal",
          overflow: isWide ? "hidden" : "visible",
          textOverflow: isWide ? "ellipsis" : "unset",
        }}>
          {name}
        </div>

        {/* Show desc only for featured + tall + non-wide */}
        {(isFeatured || isTall || !isWide) && (
          <div style={{
            fontSize: isFeatured ? 14 : 12,
            color: COLORS.mutedDark,
            lineHeight: 1.65,
            maxWidth: isFeatured ? 280 : "none",
            opacity: hovered ? 1 : 0.75,
            transition: "opacity 0.3s ease",
            display: isWide ? "none" : "block",
          }}>
            {desc}
          </div>
        )}
      </div>

      {/* Animated accent line */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 2,
        width: hovered ? "100%" : "0%",
        background: `linear-gradient(90deg, ${color}, ${color}40)`,
        borderRadius: "0 0 0 14px",
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* Featured: extra decorative pill tag */}
      {isFeatured && (
        <div style={{
          marginTop: "auto",
          paddingTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 99,
            background: `${color}18`,
            border: `1px solid ${color}30`,
            fontSize: 10,
            color: color,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
            Premium Amenity
          </div>
        </div>
      )}
    </div>
  );
}

export function Amenities() {
  return (
    <section
      id="amenities"
      className="sa-sans sa-section"
      style={{ background: COLORS.darkBlue, position: "relative", overflow: "hidden", padding: "80px 0 88px" }}
    >
      {/* Decorative glows */}
      <div className="absolute -bottom-12 -left-12" style={{ width: 450, height: 450, background: `radial-gradient(circle,rgba(233,30,140,0.09) 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div className="absolute top-0 right-0" style={{ width: 350, height: 350, background: `radial-gradient(circle,rgba(0,207,255,0.06) 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div className="absolute top-0 right-0" style={{ width: 350, height: 350, background: `radial-gradient(circle,rgba(0,207,255,0.06) 0%,transparent 70%)`, pointerEvents: "none" }} />

      <DecorativeShape size={550} opacity={0.16} rotate={-30} className="-top-24 -left-24" />

      <div className="sa-container">

        {/* ── Header ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>

          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div className="sa-reveal" style={{ marginBottom: 14 }}>
                <SectionLabel onDark={true}>World-Class Amenities</SectionLabel>
              </div>
              <h2
                className="sa-serif"
                style={{
                  fontSize: "clamp(34px,4.5vw,58px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: -1.5,
                  color: "#fff",
                  margin: 0,
                }}
              >
                Every Joy,<br />
                <span style={{ color: COLORS.cyan }}>Right Here.</span>
              </h2>
            </div>

            {/* Right: stats + desc */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, paddingTop: 4 }}>
              {/* Big stat */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "monospace", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: "#fff", lineHeight: 1, letterSpacing: "-2px" }}>
                  30<span style={{ color: COLORS.cyan }}>+</span>
                </div>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.mutedDark, marginTop: 4 }}>Curated Amenities</div>
              </div>
              {/* Divider */}
              <div style={{ width: 40, height: 1, background: `rgba(255,255,255,0.12)` }} />
              <p
                style={{
                  fontSize: 14,
                  color: COLORS.mutedDark,
                  maxWidth: 280,
                  lineHeight: 1.7,
                  textAlign: "right",
                  margin: 0,
                }}
              >
                Designed for your every mood and moment — from serene to social.
              </p>
            </div>
          </div>

          {/* Thin divider line */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginTop: 32 }} />
        </div>

        {/* ── Bento Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "130px",
            gap: 10,
          }}
        >
          {amenitiesData.map((amenity, i) => (
            <AmenityCard
              key={amenity.name}
              {...amenity}
              layout={LAYOUTS[i] || { col: "span 1", row: "span 1", featured: false }}
              index={i}
            />
          ))}
        </div>

        {/* ── Footer tag line ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.mutedDark, whiteSpace: "nowrap" }}>
            Subham Ashray · Premium Living
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #amenities .sa-container > div:nth-child(3) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          #amenities .sa-container > div:nth-child(3) {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 110px !important;
          }
        }
      `}</style>
    </section>
  );
}