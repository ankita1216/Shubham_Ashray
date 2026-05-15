import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';

export function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send data to an API here
    navigate('/thank-you');
  };

  return (
    <>
    <section id="contact" className="sa-sans sa-noise" style={{ background: COLORS.darkNavy, position: "relative", overflow: "hidden", padding: "112px 0", color: '#fff' }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 60% at 80% 50%, ${COLORS.primary}0D 0%, transparent 60%)`, pointerEvents: "none" }} />
      
      {/* Decorative Background Shapes */}
      <DecorativeShape size={600} opacity={0.14} rotate={0} className="-bottom-40 left-1/2 -translate-x-1/2" />

      <div className="sa-container grid gap-16 lg:gap-20 items-start relative z-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {/* Left — on light */}
        <div className="max-w-xl">
          <div className="sa-reveal"><SectionLabel onDark={true}>Get In Touch</SectionLabel></div>
          <h2 className="sa-reveal sa-d1" style={{ marginBottom: 28, color: '#fff' }}>
            Your Dream Home<br /><span style={{ color: COLORS.primary }}>Awaits You.</span>
          </h2>
          <p className="sa-reveal sa-d2" style={{ color: COLORS.mutedDark, maxWidth: 500 }}>
            Talk to our team today. We'll walk you through every detail: unit selection, pricing, site visits, and everything in between.
          </p>
          <div className="sa-reveal sa-d3 flex flex-col gap-5 mb-12">
            <a href="https://wa.me/919854043000" target="_blank" className="sa-channel-btn sa-sans" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid rgba(255,255,255,0.1)`, color: '#fff', padding: "20px 24px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${COLORS.primary}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MessageCircle size={21} strokeWidth={2.2} color={COLORS.primary} />
              </div>
              <div>
                <span style={{ display: "block", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: COLORS.mutedDark, marginBottom: 2 }}>WhatsApp</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Chat With Us Now</span>
              </div>
            </a>
          </div>
        </div>

        {/* Right — dark glass form */}
        <div className="sa-reveal sa-d2 relative overflow-hidden"
          style={{ background: COLORS.darkMid, boxShadow: "0 24px 80px rgba(0,0,0,0.25)", padding: "32px 36px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.goldDark})` }} />
          <h3 className="sa-serif text-white mb-1" style={{ fontSize: 24, fontWeight: 700 }}>Book Site Visit</h3>
          <p style={{ fontSize: 13, color: COLORS.mutedDark, marginBottom: 28 }}>Our team will reach out within 24 hours</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label className="block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: COLORS.mutedDark }}>Full Name</label>
                <input required type="text" placeholder="Your name" className="sa-form-input-dark" />
              </div>
              <div>
                <label className="block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: COLORS.mutedDark }}>Phone Number</label>
                <input required type="tel" placeholder="+91..." className="sa-form-input-dark" />
              </div>
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase", color: COLORS.mutedDark }}>Email Address</label>
              <input required type="email" placeholder="your@email.com" className="sa-form-input-dark" />
            </div>
            <div>
              <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.mutedDark }}>Preferred Unit Type</label>
              <select className="sa-form-input-dark">
                <option>2 BHK Smart — 800 sq.ft</option>
                <option>3 BHK Smart — 992 sq.ft</option>
                <option>2 BHK Premium — 875 sq.ft</option>
                <option>3 BHK Premium — 1197–1255 sq.ft</option>
              </select>
            </div>
            <button type="submit" className="sa-hero-cta sa-sans">
              Book Site Visit
            </button>
            <p className="text-center" style={{ fontSize: 11, color: COLORS.hintDark }}>Your information is secure. We never share your data.</p>
          </form>
        </div>
      </div>
      </section>
      <WaveDarkToLight fromColor={COLORS.darkNavy} toColor={COLORS.luxBeige} />
    </>
  );
}
