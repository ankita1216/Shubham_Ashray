import { useState } from 'react';
import {
  Waves,
  Dumbbell,
  Gamepad2,
  Sparkles,
  Tent,
  Trees,
  Theater,
  Users,
  Baby,
  Building2,
  Flower2
} from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { amenitiesData } from '../../data/amenitiesData';
import { DecorativeShape } from '../common/DecorativeShape';
import { WaveLightToDark } from '../common/Dividers';

const IconMap = {
  Waves,
  Dumbbell,
  Gamepad2,
  Sparkles,
  Tent,
  Trees,
  Theater,
  Users,
  Baby,
  Building2,
  Flower2
};

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

function AmenityCard({ name, desc, color, icon, index }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = IconMap[icon] || Sparkles;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minHeight: 218,
        position: "relative",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        background: hovered
          ? "#fff"
          : "rgba(255, 255, 255, 0.56)",
        border: hovered
          ? `1px solid ${color}45`
          : "1px solid rgba(26, 28, 20, 0.08)",
        transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "translateY(-3px) scale(1.005)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 18px 50px rgba(26, 28, 20, 0.10), 0 0 0 1px ${color}22`
          : "0 1px 0 rgba(26,28,20,0.04)",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {/* Ambient glow blob */}
      <div style={{
        position: "absolute",
        top: -40,
        right: -40,
        width: 120,
        height: 120,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}${hovered ? "22" : "0d"} 0%, transparent 70%)`,
        transition: "all 0.5s ease",
        pointerEvents: "none",
      }} />

      {/* Corner number */}
      <div style={{
        position: "absolute",
        top: 18,
        right: 18,
        color: hovered ? `${color}90` : "rgba(255,255,255,0.15)",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <IconComponent size={14} strokeWidth={2.2} />
      </div>

      {/* Icon container */}
      <div style={{
        width: 46,
        height: 46,
        borderRadius: 12,
        background: hovered ? `${color}28` : `${color}14`,
        border: `1px solid ${color}${hovered ? "40" : "20"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? color : COLORS.textDark,
        flexShrink: 0,
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
        transform: hovered ? "scale(1.08) rotate(-3deg)" : "scale(1) rotate(0deg)",
        marginBottom: 22,
      }}>
        <IconComponent size={22} strokeWidth={2.2} />
      </div>

      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 17,
          fontWeight: 700,
          color: COLORS.textDark,
          marginBottom: 8,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          whiteSpace: "normal",
        }}>
          {name}
        </div>

        <div style={{
          fontSize: 13,
          color: COLORS.mutedLight,
          lineHeight: 1.65,
          opacity: hovered ? 1 : 0.88,
          transition: "opacity 0.3s ease",
        }}>
          {desc}
        </div>
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

    </div>
  );
}

export function Amenities() {
  const landscapeFeatures = [
    "Stepped planter",
    "Open gym",
    "Adda corner",
    "Senior citizens' area",
    "Shaded sitting corner",
    "Forest orchard",
    "Stepped amphitheatre",
    "Raised lawn",
    "Stepping stone walkway",
  ];

  return (
    <>
      <section
        id="amenities"
        className="sa-sans sa-section"
        style={{ background: COLORS.warmWhite, position: "relative", overflow: "hidden", padding: "108px 0 112px" }}
      >
        {/* Decorative glows */}
        <div className="absolute -bottom-12 -left-12" style={{ width: 450, height: 450, background: `radial-gradient(circle, ${COLORS.primary}12 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div className="absolute top-0 right-0" style={{ width: 350, height: 350, background: `radial-gradient(circle, ${COLORS.primary}0D 0%, transparent 70%)`, pointerEvents: "none" }} />

        <DecorativeShape size={600} opacity={0.14} rotate={0} className="-bottom-40 left-1/2 -translate-x-1/2" />

        <div className="sa-container">

          {/* ── Header ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 48 }}>

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
              <div>
                <div className="sa-reveal" style={{ marginBottom: 14 }}>
                  <SectionLabel onDark={false}>World-Class Amenities</SectionLabel>
                </div>
                <h2 style={{ color: COLORS.textDark, margin: 0 }}>
                  Every Joy,<br />
                  <span style={{ color: COLORS.primary }}>Right Here</span>
                </h2>
              </div>

              {/* Right: stats + desc */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, paddingTop: 4 }}>
                {/* Big stat */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: COLORS.textDark, lineHeight: 1, letterSpacing: "-0.03em" }}>
                    30<span style={{ color: COLORS.primary }}>+</span>
                  </div>
                  <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.mutedLight, marginTop: 4 }}>Curated Amenities</div>
                </div>
                {/* Divider */}
                <div style={{ width: 40, height: 1, background: `rgba(26,28,20,0.12)` }} />
                <p
                  style={{
                    fontSize: 14,
                    color: COLORS.mutedLight,
                    maxWidth: 320,
                    lineHeight: 1.7,
                    textAlign: "right",
                    margin: 0,
                  }}
                >
                  Landscaped greens, club amenities, play zones, and community spaces planned as one connected everyday experience.
                </p>
              </div>
            </div>

            {/* Thin divider line */}
            <div style={{ height: 1, background: "rgba(26,28,20,0.06)", marginTop: 32 }} />
          </div>

          {/* ── Bento Grid ── */}
          <div
            className="amenity-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 34,
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

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.35fr) minmax(0, 0.65fr)", gap: 18, alignItems: "stretch" }} className="amenity-feature-strip">
            <div style={{ background: COLORS.darkBlue, color: "#fff", borderRadius: 16, padding: "26px 28px", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.primary, marginBottom: 14 }}>Landscape Features</div>
              <p className="sa-serif" style={{ fontSize: 29, lineHeight: 1.05, margin: 0 }}>Outdoor spaces made for slow walks, play, and gathering.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignContent: "center", background: "rgba(255,255,255,0.62)", border: "1px solid rgba(26,28,20,0.07)", borderRadius: 16, padding: 22 }}>
              {landscapeFeatures.map((item) => (
                <span key={item} style={{ border: "1px solid rgba(26,28,20,0.09)", borderRadius: 999, padding: "9px 13px", fontSize: 12, fontWeight: 700, color: COLORS.textMid, background: "rgba(255,255,255,0.7)" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── Footer tag line ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 32 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(26,28,20,0.06)" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.mutedLight, whiteSpace: "nowrap" }}>
              Subham Ashray · Premium Living
            </span>
            <div style={{ flex: 1, height: 1, background: "rgba(26,28,20,0.06)" }} />
          </div>
        </div>

        <style>{`
        @media (max-width: 768px) {
          .amenity-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .amenity-feature-strip {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .amenity-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: 110px !important;
          }
        }
      `}</style>
      </section>

      <WaveLightToDark fromColor={COLORS.warmWhite} toColor={COLORS.darkBlue} />
    </>
  );
}
