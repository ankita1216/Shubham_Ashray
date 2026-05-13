import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { DecorativeShape } from '../common/DecorativeShape';

export function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send data to an API here
    navigate('/thank-you');
  };

  return (
    <section id="contact" className="sa-sans sa-noise sa-section" style={{ background: COLORS.luxBeige, position: "relative", overflow: "hidden" }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 60% at 80% 50%, ${COLORS.primary}0D 0%, transparent 60%)`, pointerEvents: "none" }} />
      
      {/* Decorative Background Shapes */}
      <DecorativeShape 
        size={450} 
        opacity={0.15} 
        rotate={10} 
        className="-top-20 -left-20" 
      />
      <DecorativeShape 
        size={350} 
        opacity={0.12} 
        rotate={170} 
        className="bottom-[20%] -right-20 hidden lg:block" 
      />

      <div className="sa-container grid gap-16 lg:gap-20 items-start relative z-10" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
        {/* Left — on light */}
        <div className="max-w-xl">
          <div className="sa-reveal"><SectionLabel onDark={false}>Get In Touch</SectionLabel></div>
          <h2 className="sa-reveal sa-d1 sa-serif" style={{ fontSize: "clamp(34px,4.5vw,58px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 24, color: COLORS.textDark }}>
            Your Dream Home<br /><span style={{ color: COLORS.primary }}>Awaits You.</span>
          </h2>
          <p className="sa-reveal sa-d2" style={{ fontSize: 16, color: COLORS.mutedLight, lineHeight: 1.85, maxWidth: 440, marginBottom: 48 }}>
            Talk to our team today. We'll walk you through every detail — unit selection, pricing, site visits, and everything in between.
          </p>
          <div className="sa-reveal sa-d3 flex flex-col gap-5 mb-12">
            <a href="tel:+919854043000" className="sa-channel-btn sa-sans" style={{ background: `${COLORS.primary}12`, border: `1px solid ${COLORS.primary}26`, color: COLORS.textDark, padding: "20px 24px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${COLORS.primary}1A`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📞</div>
              <div>
                <span style={{ display: "block", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: COLORS.mutedLight, marginBottom: 2 }}>Call Us</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.textDark }}>+91-98540 43000</span>
              </div>
            </a>
            <a href="https://wa.me/919854043000" target="_blank" className="sa-channel-btn sa-sans" style={{ background: `${COLORS.primary}0D`, border: `1px solid ${COLORS.primary}1A`, color: COLORS.textDark, padding: "20px 24px" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${COLORS.primary}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>💬</div>
              <div>
                <span style={{ display: "block", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: COLORS.mutedLight, marginBottom: 2 }}>WhatsApp</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.textDark }}>Chat With Us Now</span>
              </div>
            </a>
          </div>
          <div className="sa-reveal sa-d4 p-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.65)", border: "1px solid rgba(26,26,46,0.1)", backdropFilter: "blur(12px)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: COLORS.primary, marginBottom: 12 }}>Site Address</div>
            <div style={{ fontSize: 14, color: COLORS.mutedLight, lineHeight: 1.8 }}>
              Subham Ashray, Aerocity Dharapur<br />
              Palash Bari Road, Guwahati – 781017, Assam<br /><br />
              <strong style={{ color: COLORS.textDark }}>RERA:</strong> RERAA KM 113 of 2022-2023<br />
              RERA KM 162 of 2023-2024
            </div>
          </div>
        </div>

        {/* Right — dark glass form */}
        <div className="sa-reveal sa-d2 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          style={{ background: COLORS.darkBlue, boxShadow: "0 24px 80px rgba(26,26,46,0.25)" }}>
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.goldDark})` }} />
          <h3 className="sa-serif text-white mb-2" style={{ fontSize: 28, fontWeight: 700 }}>Book Your Free Site Visit</h3>
          <p style={{ fontSize: 14, color: COLORS.mutedDark, marginBottom: 36 }}>Our team will reach out within 24 hours</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {[["Full Name", "text", "Your full name"], ["Phone Number", "tel", "+91 00000 00000"], ["Email Address", "email", "your@email.com"]].map(([label, type, ph]) => (
              <div key={label}>
                <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.mutedDark }}>{label}</label>
                <input required type={type} placeholder={ph} className="sa-form-input-dark" />
              </div>
            ))}
            <div>
              <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.mutedDark }}>Preferred Unit Type</label>
              <select className="sa-form-input-dark">
                <option>2 BHK Smart — 800 sq.ft</option>
                <option>3 BHK Smart — 992 sq.ft</option>
                <option>2 BHK Premium — 875 sq.ft</option>
                <option>3 BHK Premium — 1197–1255 sq.ft</option>
              </select>
            </div>
            <div>
              <label className="block mb-2" style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.mutedDark }}>Preferred Visit Date</label>
              <input required type="date" className="sa-form-input-dark" />
            </div>
            <button type="submit" className="sa-hero-cta sa-sans">
              Book Site Visit →
            </button>
            <p className="text-center" style={{ fontSize: 11, color: COLORS.hintDark }}>Your information is secure. We never share your data.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
