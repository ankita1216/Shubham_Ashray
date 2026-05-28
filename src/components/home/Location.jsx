import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';
import locationImg from '../../assets/images/location.jpg';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const categories = [
  {
    id: 'connectivity',
    label: 'Connectivity',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'Lokpriya Gopinath Bordoloi International Airport Terminal 2', dist: '3.9 km', km: 3.9 },
      { name: 'Jalukbari Flyover', dist: '10.0 km', km: 10.0 },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'Dharapur Higher Secondary School', dist: '2.2 km', km: 2.2 },
      { name: 'Girijananda Chowdhury University', dist: '2.9 km', km: 2.9 },
      { name: 'Assam Don Bosco University', dist: '3.2 km', km: 3.2 },
      { name: 'Gauhati University', dist: '5.4 km', km: 5.4 },
      { name: 'Assamese School', dist: '5.6 km', km: 5.6 },
    ],
  },
  {
    id: 'healthcare',
    label: 'Hospitals',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'Garal PHC', dist: '950 m', m: 950 },
      { name: 'Azara PHC', dist: '3.8 km', km: 3.8 },
      { name: 'Gauhati University Hospital', dist: '10.7 km', km: 10.7 },
      { name: 'Apollo Excelcare Hospital', dist: '13.2 km', km: 13.2 },
    ],
  },
  {
    id: 'leisure',
    label: 'Malls',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'University Shopping Complex', dist: '6.6 km', km: 6.6 },
      { name: 'Decathlon Azara', dist: '6.7 km', km: 6.7 },
      { name: 'NCS Square Mall', dist: '9.0 km', km: 9.0 },
      { name: 'Westside', dist: '9.0 km', km: 9.0 },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'BCPL Petrol Pump Station', dist: '650 m', km: 0.65 },
      { name: 'Dharapur Chariali', dist: '2.2 km', km: 2.2 },
      { name: 'IOCL Ramani Service Station', dist: '3.7 km', km: 3.7 },
      { name: 'Kiranshree Grand Hotel', dist: '3.7 km', km: 3.7 },
      { name: 'Azara Police Station', dist: '4.8 km', km: 4.8 },
    ],
  },
];

/* Max km used for bar scaling (cap at 15 km) */
const MAX_KM = 15;

function getTier(km) {
  if (km <= 3) return 'near';
  if (km <= 7) return 'mid';
  return 'far';
}
const tierLabel = { near: 'Nearby', mid: 'Close', far: 'Accessible' };
const tierColor = {
  near: { text: COLORS.primary, bg: `${COLORS.primary}1A` },
  mid: { text: COLORS.primary, bg: `${COLORS.primary}12` },
  far: { text: COLORS.primary, bg: `${COLORS.primary}0D` },
};

function DistanceBar({ km, accent }) {
  const pct = Math.min((km / MAX_KM) * 100, 100);
  return (
    <div style={{ height: 4, background: 'rgba(26,28,20,0.08)', borderRadius: 99, overflow: 'hidden', flex: 1 }}>
      <div
        className="sa-dist-bar"
        style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${accent}, ${accent}99)`,
          borderRadius: 99,
          transition: 'width .7s cubic-bezier(.16,1,.3,1)',
        }}
      />
    </div>
  );
}

function LocationItem({ item, accent, index }) {
  const tier = getTier(item.km);
  return (
    <div
      className="loc-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '32px minmax(0,1fr) auto',
        alignItems: 'center',
        gap: 12,
        padding: '12px 0',
        border: '1px solid rgba(26,28,20,0.07)',
        borderLeft: 0,
        borderRight: 0,
        borderTop: index === 0 ? '1px solid rgba(26,28,20,0.07)' : 0,
        background: 'transparent',
        animationDelay: `${index * 60}ms`,
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: `${accent}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accent,
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: '.08em',
        flexShrink: 0,
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Name + bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: COLORS.textDark,
          whiteSpace: 'normal',
          lineHeight: 1.35,
          wordBreak: 'break-word',
        }}>
          {item.name}
        </span>
        <DistanceBar km={item.km} accent={accent} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: COLORS.textDark }}>{item.dist}</span>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '.8px', textTransform: 'uppercase',
          padding: '3px 9px', borderRadius: 99,
          color: tierColor[tier].text, background: tierColor[tier].bg,
        }}>
          {tierLabel[tier]}
        </span>
      </div>
    </div>
  );
}

function CategoryCard({ cat }) {
  return (
    <div className="loc-category-card" style={{ '--accent': cat.accent }}>
      <div className="loc-card-head">
        <div className="loc-card-icon">{cat.icon}</div>
        <div>
          <span>{cat.items.length} nearby points</span>
          <h3>{cat.label}</h3>
        </div>
      </div>
      <div className="loc-card-list">
        {cat.items.map((item, i) => (
          <LocationItem key={item.name} item={item} accent={cat.accent} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─── Map Card ───────────────────────────────────────────────────────────── */
function MapCard() {
  return (
    <div
      className="sa-reveal-l rounded-[24px] relative overflow-hidden"
      style={{
        background: '#0B0C10',
        minHeight: 500,
        height: '100%',
        boxShadow: '0 28px 80px rgba(26,26,46,0.18)',
        border: '1px solid rgba(26,28,20,0.06)',
      }}
    >
      {/* High-quality map image as background */}
      <img
        src={locationImg}
        alt="Subham Ashray Location Map"
        style={{
          width: '100%',
          height: '100%',
          minHeight: 500,
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Elegant dark radial overlay to blend image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,28,20,0.05) 0%, rgba(26,28,20,0.3) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Airport Distance Badge */}
      <div style={{
        position: 'absolute', top: 24, left: 24,
        background: COLORS.primary, color: COLORS.darkNavy,
        fontSize: 11, fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase',
        borderRadius: 99, padding: '7px 16px', zIndex: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        3.9 km to Airport
      </div>

      {/* Dynamic luxury compass overlay in top right */}
      <div style={{
        position: 'absolute', top: 24, right: 24, zIndex: 2,
        width: 36, height: 36, opacity: 0.6,
      }}>
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M20 4 L22 18 L20 20 L18 18 Z" fill={COLORS.primary} />
          <path d="M20 36 L22 22 L20 20 L18 22 Z" fill={COLORS.primary} opacity=".5" />
          <path d="M4 20 L18 18 L20 20 L18 22 Z" fill={COLORS.primary} opacity=".5" />
          <path d="M36 20 L22 18 L20 20 L22 22 Z" fill={COLORS.primary} />
          <circle cx="20" cy="20" r="2.5" fill={COLORS.primary} />
          <text x="19" y="10" fill={COLORS.primary} fontSize="6" fontWeight="bold" textAnchor="middle">N</text>
        </svg>
      </div>

      {/* Premium Glassmorphic Overlay Panel */}
      <div
        className="map-overlay-card"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          right: '24px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(26, 28, 20, 0.08)',
          borderRadius: '20px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: '0 16px 40px rgba(26, 28, 20, 0.08)',
          zIndex: 10,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="sa-serif" style={{ color: COLORS.textDark, fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', textAlign: 'left' }}>
            Subham Ashray
          </h3>
          <p style={{ color: COLORS.mutedLight, fontSize: '13px', margin: 0, lineHeight: 1.5, textAlign: 'left' }}>
            Aerocity Dharapur, Palash Bari Road, Guwahati 781017
          </p>
        </div>

        <a
          href="https://www.google.com/maps/search/Subham+Ashray+Guwahati"
          target="_blank"
          rel="noopener noreferrer"
          className="sa-sans"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: COLORS.primary,
            color: COLORS.darkNavy,
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: '8px',
            boxShadow: `0 4px 14px ${COLORS.primary}30`,
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = COLORS.darkNavy;
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.boxShadow = `0 4px 14px rgba(0,0,0,0.15)`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = COLORS.primary;
            e.currentTarget.style.color = COLORS.darkNavy;
            e.currentTarget.style.boxShadow = `0 4px 14px ${COLORS.primary}30`;
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export function Location() {
  return (
    <>
      <section
        id="location"
        className="sa-sans sa-noise"
        style={{ background: COLORS.warmWhite, position: 'relative', overflow: 'hidden', padding: '108px 0' }}
      >
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '50%', right: -120, transform: 'translateY(-50%)',
          width: 500, height: 500,
          background: `radial-gradient(circle, ${COLORS.primary}0A 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <DecorativeShape size={600} opacity={0.14} rotate={-15} className="-bottom-40 -left-20" />

        <div className="sa-container">
          {/* Header */}
          <div className="sa-reveal">
            <SectionLabel onDark={false}>Location</SectionLabel>
          </div>
          <h2
            className="sa-reveal sa-d1"
            style={{ marginBottom: 20, color: COLORS.textDark }}
          >
            Well-connected and <span style={{ color: COLORS.primary }}>Well-developed</span>
          </h2>
          <p
            className="sa-reveal sa-d2"
            style={{ color: COLORS.mutedLight, maxWidth: 580 }}
          >
            Strategically placed in Guwahati's fastest-growing corridor, connected to the airport, universities, hospitals, daily needs, and leisure destinations.
          </p>

          <div
            className="grid gap-10 lg:gap-16 items-start"
            style={{ gridTemplateColumns: 'minmax(320px, 0.82fr) minmax(0, 1.18fr)' }}
          >
            <div className="sa-reveal-l" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <MapCard />
              {categories.filter(c => c.id === 'connectivity').map(cat => (
                <CategoryCard key={cat.id} cat={cat} />
              ))}
            </div>

            <div className="sa-reveal-r loc-category-grid">
              {categories.filter(c => c.id !== 'connectivity').map(cat => (
                <CategoryCard key={cat.id} cat={cat} />
              ))}
            </div>
          </div>

          <div className="loc-footnote">
            <strong>Prime Location</strong>
            <span>All distances are approximate road distances from Subham Ashray, Aerocity Dharapur, Guwahati.</span>
          </div>
        </div>

        <style>{`
          #location .loc-category-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }

          #location .loc-category-card {
            position: relative;
            min-height: 330px;
            border-radius: 20px;
            border: 1px solid rgba(26,28,20,0.08);
            background: rgba(255,255,255,0.82);
            box-shadow: 0 18px 60px rgba(26,28,20,0.055);
            padding: 22px;
            overflow: hidden;
          }

          #location .loc-category-card::before {
            content: "";
            position: absolute;
            inset: 0 0 auto 0;
            height: 3px;
            background: var(--accent);
          }

          #location .loc-category-card::after {
            content: "";
            position: absolute;
            width: 150px;
            height: 150px;
            right: -70px;
            top: -70px;
            border-radius: 50%;
            background: color-mix(in srgb, var(--accent) 18%, transparent);
            pointer-events: none;
          }

          #location .loc-card-head {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 20px;
            position: relative;
            z-index: 1;
          }

          #location .loc-card-icon {
            width: 44px;
            height: 44px;
            border-radius: 14px;
            display: grid;
            place-items: center;
            color: var(--accent);
            background: color-mix(in srgb, var(--accent) 12%, white);
            border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
            flex-shrink: 0;
          }

          #location .loc-card-head span {
            display: block;
            color: ${COLORS.mutedLight};
            font-size: 10px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            margin-bottom: 4px;
          }

          #location .loc-card-head h3 {
            margin: 0;
            color: ${COLORS.textDark};
            font-size: 22px;
            line-height: 1;
            font-weight: 800;
          }

          #location .loc-card-list {
            position: relative;
            z-index: 1;
          }

          #location .loc-row {
            border-color: rgba(26,28,20,0.07) !important;
          }

          #location .loc-footnote {
            display: flex;
            gap: 12px;
            align-items: center;
            margin-top: 22px;
            padding: 16px 18px;
            border-radius: 16px;
            background: rgba(255,255,255,0.72);
            border: 1px solid rgba(26,28,20,0.07);
            color: ${COLORS.mutedLight};
            font-size: 13px;
          }

          #location .loc-footnote strong {
            color: ${COLORS.primary};
            font-size: 10px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            white-space: nowrap;
          }

          @media (max-width: 1024px) {
            #location .grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 720px) {
            #location .loc-category-grid {
              grid-template-columns: 1fr;
            }

            #location .loc-footnote {
              align-items: flex-start;
              flex-direction: column;
            }
          }

          @media (max-width: 500px) {
            .map-overlay-card {
              flex-direction: column !important;
              align-items: stretch !important;
              padding: 16px 20px !important;
              gap: 12px !important;
            }
            .map-overlay-card a {
              justify-content: center;
            }
          }
        `}</style>
      </section>

    </>
  );
}

