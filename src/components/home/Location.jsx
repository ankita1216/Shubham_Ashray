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
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'Lokpriya Gopinath Bordoloi Int. Airport', dist: '5.7 km', km: 5.7 },
      { name: 'Jalukbari Flyover', dist: '10.0 km', km: 10.0 },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
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
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'Garal PHC', dist: '0.95 km', km: 0.95 },
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
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    accent: COLORS.primary,
    items: [
      { name: 'University Shopping Complex', dist: '6.6 km', km: 6.6 },
      { name: 'Decathlon Azara', dist: '6.7 km', km: 6.7 },
      { name: 'NCS Square Mall', dist: '9 km', km: 9 },
      { name: 'Westside', dist: '9 km', km: 9 },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
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
  mid:  { text: COLORS.primary, bg: `${COLORS.primary}12` },
  far:  { text: COLORS.primary, bg: `${COLORS.primary}0D` },
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, minWidth: 0 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textDark, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
        background: COLORS.darkBlue,
        minHeight: 500,
        boxShadow: '0 28px 80px rgba(26,26,46,0.28)',
        border: `1px solid ${COLORS.borderDark}`,
      }}
    >
      {/* Grid overlay */}
      <svg width="100%" height="100%" viewBox="0 0 400 500" fill="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.055 }}>
        {[50,100,150,200,250,300,350,400,450].map(y =>
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="white" strokeWidth="0.6" />)}
        {[40,80,120,160,200,240,280,320,360,400].map(x =>
          <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="white" strokeWidth="0.6" />)}
        {/* Roads */}
        <path d="M 0 260 Q 120 240 200 250 Q 280 258 400 230" stroke="white" strokeWidth="2.5" fill="none" opacity="2"/>
        <path d="M 195 0 Q 198 120 200 250 Q 202 370 205 500" stroke="white" strokeWidth="2.5" fill="none" opacity="2"/>
        <path d="M 0 340 L 150 310 L 400 350" stroke="white" strokeWidth="1.2" fill="none"/>
        <path d="M 60 0 L 100 200 L 80 500" stroke="white" strokeWidth="1.2" fill="none"/>
      </svg>

      {/* Glow at center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 200, height: 200,
        background: `radial-gradient(circle, ${COLORS.primary}25 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Top badge */}
      <div style={{
        position: 'absolute', top: 20, left: 20,
        background: COLORS.primary, color: COLORS.darkNavy,
        fontSize: 11, fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase',
        borderRadius: 99, padding: '7px 16px', zIndex: 2,
      }}>
        5.7 km to Airport
      </div>

      {/* Center content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 16, zIndex: 2,
      }}>
        {/* Pulse ring */}
        <div style={{ position: 'relative', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `2px solid ${COLORS.primary}`,
            animation: 'saMapPulse 2.4s ease-out infinite',
          }} />
          <div style={{
            position: 'absolute', inset: -12, borderRadius: '50%',
            border: `1.5px solid ${COLORS.primary}50`,
            animation: 'saMapPulse 2.4s ease-out infinite .6s',
          }} />
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: COLORS.primary,
            boxShadow: `0 0 24px ${COLORS.primary}80`,
          }} />
        </div>

        <div className="sa-serif" style={{ color: '#fff', fontSize: 22, fontWeight: 700, textAlign: 'center' }}>
          Subham Ashray
        </div>
        <div style={{ color: COLORS.mutedDark, fontSize: 13, textAlign: 'center', lineHeight: 1.6, maxWidth: 220 }}>
          Aerocity Dharapur<br />
          Palash Bari Road, Guwahati 781017
        </div>

        <a
          href="https://www.google.com/maps/search/Subham+Ashray+Guwahati"
          target="_blank"
          rel="noopener noreferrer"
          className="sa-btn-primary sa-sans"
          style={{ padding: '11px 28px', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 4 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Get Directions
        </a>
      </div>

      {/* Floating mini tags */}
      <div style={{
        position: 'absolute', bottom: 20, left: 20,
        background: 'rgba(255,255,255,0.07)', border: `1px solid ${COLORS.borderDark}`,
        color: COLORS.mutedDark, backdropFilter: 'blur(10px)',
        fontSize: 11, fontWeight: 600, borderRadius: 99, padding: '6px 14px', zIndex: 2,
      }}>
        Gauhati Univ · 5.4 km
      </div>
      <div style={{
        position: 'absolute', bottom: 20, right: 20,
        background: 'rgba(255,255,255,0.07)', border: `1px solid ${COLORS.borderDark}`,
        color: COLORS.mutedDark, backdropFilter: 'blur(10px)',
        fontSize: 11, fontWeight: 600, borderRadius: 99, padding: '6px 14px', zIndex: 2,
      }}>
        Apollo · 12 km
      </div>

      {/* Side decorative compass rose */}
      <div style={{
        position: 'absolute', top: 20, right: 20, zIndex: 2,
        width: 36, height: 36, opacity: 0.35,
      }}>
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M20 4 L22 18 L20 20 L18 18 Z" fill="white"/>
          <path d="M20 36 L22 22 L20 20 L18 22 Z" fill="white" opacity=".5"/>
          <path d="M4 20 L18 18 L20 20 L18 22 Z" fill="white" opacity=".5"/>
          <path d="M36 20 L22 18 L20 20 L22 22 Z" fill="white"/>
          <circle cx="20" cy="20" r="2.5" fill="white"/>
          <text x="19" y="10" fill="white" fontSize="6" fontWeight="bold" textAnchor="middle">N</text>
        </svg>
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
            Wellborn and <span style={{ color: COLORS.primary }}>Well–Connected</span>
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
        `}</style>
      </section>

    </>
  );
}
