import { useRef, useState } from 'react';
import { COLORS } from '../../constants/colors';
import { WaveDarkToLight } from '../common/Dividers';
import { SectionLabel } from '../common/SectionLabel';

export function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const moments = [
    { label: '01', title: 'Leave the phone behind', copy: 'Tune in with your child and let the day slow down.' },
    { label: '02', title: 'Walk without hurry', copy: 'Long landscaped paths make everyday time feel softer.' },
    { label: '03', title: 'Let space open up', copy: 'Beauty, air, and green pauses lead you toward a joyous life.' },
  ];

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <section className="sa-sans" style={{ background: COLORS.darkBlue, position: 'relative', padding: '112px 0' }}>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `linear-gradient(${COLORS.primary} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.primary} 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />
        <div className="absolute inset-x-0 top-0 h-32" style={{ background: `linear-gradient(180deg, ${COLORS.darkNavy}55, transparent)` }} />
        <div className="sa-container relative z-10">
          <div className="aha-life-shell">
            <div className="aha-life-copy">
              <SectionLabel onDark={true}>Aha Life Message</SectionLabel>
              <h2 className="sa-serif aha-life-title">
                A Life Made<br />
                <span>Of Aha Moments.</span>
              </h2>
              <p className="aha-life-lead">
                The Aha moment begins when you leave behind your phone and tune in with your child. It grows through long walks, open space, and a home that makes everyday life feel more present.
              </p>
              <div className="aha-moment-grid">
                {moments.map((item) => (
                  <div key={item.label} className="aha-moment-card">
                    <span>{item.label}</span>
                    <strong>{item.title}</strong>
                    <p>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="sa-reveal aha-cinema-card group"
              onClick={handleTogglePlay}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600"
                loop
                muted
                playsInline
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-architecture-23133-large.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? 'opacity-25' : 'opacity-65'}`}
                style={{ background: 'linear-gradient(160deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.82) 100%)' }} />

              <div className={`aha-cinema-overlay ${isPlaying ? 'is-playing' : ''}`}>
                <div className="aha-play">
                  <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14V19.14L19 12.14L8 5.14Z" />
                    </svg>
                  </div>
                </div>
                <span>Virtual Walkthrough</span>
                <h3 className="sa-serif">See The Community Mood</h3>
                <p>Click to {isPlaying ? 'pause' : 'play'} the cinematic preview.</p>
              </div>

              <div className="aha-cinema-footer">
                <span>Subham Ashray</span>
                <strong>Aerocity Living</strong>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .aha-life-shell {
            display: grid;
            grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.72fr);
            gap: 42px;
            align-items: stretch;
          }

          .aha-life-copy {
            position: relative;
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 24px;
            background: linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018));
            padding: 44px;
            overflow: hidden;
          }

          .aha-life-copy::after {
            content: "AHA";
            position: absolute;
            right: -18px;
            bottom: -48px;
            font-family: 'Cormorant Garamond', Georgia, serif;
            font-size: 180px;
            line-height: 1;
            color: rgba(255,255,255,0.035);
            pointer-events: none;
          }

          .aha-life-title {
            color: #fff;
            font-size: clamp(48px, 6.2vw, 92px);
            line-height: 0.9;
            font-weight: 600;
            letter-spacing: 0;
            margin: 18px 0 24px;
            position: relative;
            z-index: 1;
          }

          .aha-life-title span {
            color: ${COLORS.primary};
            font-style: italic;
          }

          .aha-life-lead {
            color: ${COLORS.mutedDark};
            font-size: 18px;
            line-height: 1.8;
            max-width: 660px;
            margin: 0 0 30px;
            position: relative;
            z-index: 1;
          }

          .aha-moment-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
            position: relative;
            z-index: 1;
          }

          .aha-moment-card {
            min-height: 168px;
            border: 1px solid rgba(255,255,255,0.09);
            border-radius: 16px;
            background: rgba(0,0,0,0.13);
            padding: 20px;
          }

          .aha-moment-card span {
            display: inline-flex;
            color: ${COLORS.primary};
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.18em;
            margin-bottom: 28px;
          }

          .aha-moment-card strong {
            display: block;
            color: #fff;
            font-size: 15px;
            margin-bottom: 8px;
          }

          .aha-moment-card p {
            color: rgba(253,251,247,0.56);
            font-size: 13px;
            line-height: 1.55;
            margin: 0;
          }

          .aha-cinema-card {
            position: relative;
            min-height: 100%;
            border-radius: 24px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid rgba(255,255,255,0.12);
            box-shadow: 0 28px 80px rgba(0,0,0,0.2);
            background: #000;
          }

          .aha-cinema-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 36px;
            text-align: center;
            transition: opacity .35s, transform .35s;
          }

          .aha-cinema-overlay.is-playing {
            opacity: 0;
            transform: scale(0.97);
            pointer-events: none;
          }

          .aha-play {
            width: 84px;
            height: 84px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(12px);
            margin-bottom: 26px;
          }

          .aha-play > div {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            color: ${COLORS.darkNavy};
            background: ${COLORS.primary};
          }

          .aha-cinema-overlay span,
          .aha-cinema-footer span {
            color: ${COLORS.primary};
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 0.2em;
            text-transform: uppercase;
          }

          .aha-cinema-overlay h3 {
            color: #fff;
            font-size: 38px;
            line-height: 1;
            font-weight: 600;
            margin: 12px 0 8px;
          }

          .aha-cinema-overlay p {
            color: ${COLORS.mutedDark};
            margin: 0;
            font-size: 14px;
          }

          .aha-cinema-footer {
            position: absolute;
            left: 24px;
            right: 24px;
            bottom: 22px;
            display: flex;
            justify-content: space-between;
            gap: 18px;
            align-items: center;
          }

          .aha-cinema-footer strong {
            color: #fff;
            font-size: 13px;
          }

          @media (max-width: 1024px) {
            .aha-life-shell {
              grid-template-columns: 1fr;
            }

            .aha-cinema-card {
              min-height: 420px;
            }
          }

          @media (max-width: 640px) {
            .aha-life-copy {
              padding: 30px 24px;
            }

            .aha-moment-grid {
              grid-template-columns: 1fr;
            }

            .aha-cinema-card {
              min-height: 360px;
            }
          }
        `}</style>
      </section>

      <WaveDarkToLight fromColor={COLORS.darkBlue} toColor={COLORS.softCream} />
    </>
  );
}
