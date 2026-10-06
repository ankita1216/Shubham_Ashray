import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveLightToDark } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';

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
      <iframe
        title="Subham Ashray location on Google Maps"
        src="https://maps.google.com/maps?q=SUBHAM%20ASHRAY%2C%20Dharapur%20Palash%20Bari%20Road%2C%20Guwahati&z=17&t=m&output=embed"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          border: 0,
          width: '100%',
          height: '100%',
          minHeight: 500,
          display: 'block',
        }}
      />

      <div className="map-overlay-card">
        <div className="map-overlay-copy">
          <h3 className="sa-serif">Subham Ashray</h3>
          <p>Near Gau Airport, Dharapur Palash Bari Road, Guwahati - 781017</p>
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=SUBHAM%20ASHRAY%2C%20Near%20Gau%20Airport%2C%20Dharapur%20Palash%20Bari%20Road%2C%20Guwahati%20781017"
          target="_blank"
          rel="noreferrer"
          className="map-directions-btn sa-sans"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
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
          #location .map-overlay-card {
            position: absolute;
            right: 24px;
            bottom: 24px;
            left: 24px;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 20px 24px;
            border: 1px solid rgba(26,28,20,0.08);
            border-radius: 20px;
            background: rgba(255,255,255,0.94);
            box-shadow: 0 16px 40px rgba(26,28,20,0.14);
            backdrop-filter: blur(20px);
          }

          #location .map-overlay-copy {
            flex: 1;
            min-width: 0;
          }

          #location .map-overlay-copy h3 {
            margin: 0 0 4px;
            color: ${COLORS.textDark};
            font-size: 20px;
            font-weight: 700;
            text-align: left;
          }

          #location .map-overlay-copy p {
            margin: 0;
            color: ${COLORS.mutedLight};
            font-size: 13px !important;
            line-height: 1.5;
            text-align: left;
          }

          #location .map-directions-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 20px;
            border-radius: 8px;
            background: ${COLORS.primary};
            color: ${COLORS.darkNavy};
            box-shadow: 0 4px 14px ${COLORS.primary}30;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.05em;
            text-decoration: none;
            text-transform: uppercase;
            white-space: nowrap;
            transition: background .3s ease, color .3s ease, box-shadow .3s ease;
          }

          #location .map-directions-btn:hover {
            background: ${COLORS.darkNavy};
            color: #fff;
            box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          }

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
            #location .map-overlay-card {
              right: 14px;
              bottom: 14px;
              left: 14px;
              flex-direction: column;
              align-items: stretch;
              padding: 16px 18px;
            }

            #location .map-directions-btn {
              justify-content: center;
            }

            #location .loc-category-grid {
              grid-template-columns: 1fr;
            }

            #location .loc-footnote {
              align-items: flex-start;
              flex-direction: column;
            }
          }

        `}</style>
      </section>

    </>
  );
}

