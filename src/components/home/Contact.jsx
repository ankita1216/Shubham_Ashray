import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { SectionLabel } from '../common/SectionLabel';
import { WaveDarkToLight } from '../common/Dividers';
import { DecorativeShape } from '../common/DecorativeShape';
import { submitFormData } from "../../services/formService";

export function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    location: ""
  });

  const [utms, setUtms] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: ""
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtms({
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_term: params.get("utm_term") || "",
      utm_content: params.get("utm_content") || ""
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, ...utms };
    console.log("Contact form captured:", finalData);
    await submitFormData(finalData);
    navigate('/thank-you');
  };

  return (
    <>
      <section id="contact" className="sa-sans sa-noise" style={{ background: COLORS.darkNavy, position: "relative", overflow: "hidden", padding: "112px 0", color: '#fff' }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 60% at 80% 50%, ${COLORS.primary}0D 0%, transparent 60%)`, pointerEvents: "none" }} />

        {/* Decorative Background Shapes */}
        <DecorativeShape size={600} opacity={0.14} rotate={0} className="-bottom-40 left-1/2 -translate-x-1/2" />

        <div className="sa-container sa-contact-layout relative z-10">
          <div className="max-w-xl sa-contact-copy">
            <div className="sa-reveal"><SectionLabel onDark={true}>Get In Touch</SectionLabel></div>
            <h2 className="sa-reveal sa-d1" style={{ marginBottom: 28, color: '#fff' }}>
              Your Dream Home<br /><span style={{ color: COLORS.primary }}>Awaits You</span>
            </h2>
            <p className="sa-reveal sa-d2" style={{ color: COLORS.mutedDark, maxWidth: 500 }}>
              Explore thoughtfully planned 2 and 3 BHK apartments at Subham Ashray. Our team can help with availability, floor plans, pricing, and a guided site visit.
            </p>

            <div className="sa-reveal sa-d3 sa-contact-price-grid">
              <div className="sa-contact-price-card">
                <span>2 BHK Apartments</span>
                <strong>₹36–38 Lakhs</strong>
                <small>Indicative starting range</small>
              </div>
              <div className="sa-contact-price-card">
                <span>3 BHK Apartments</span>
                <strong>₹46–59 Lakhs</strong>
                <small>Indicative price range</small>
              </div>
            </div>

            <div className="sa-reveal sa-d3 sa-contact-location">
              <MapPin size={16} aria-hidden="true" />
              <span>Dharapur / Azara, Guwahati</span>
            </div>

            <div className="sa-reveal sa-d3 flex flex-col gap-5">
              <a href="https://wa.me/919854043000" target="_blank" rel="noreferrer" className="sa-channel-btn sa-sans sa-contact-whatsapp">
                <div style={{ width: 44, height: 44, borderRadius: 4, background: `${COLORS.primary}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MessageCircle size={21} strokeWidth={2.2} color={COLORS.primary} />
                </div>
                <div>
                  <span style={{ display: "block", fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: COLORS.mutedDark, marginBottom: 2 }}>WhatsApp</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Chat With Our Sales Team</span>
                </div>
                <ArrowUpRight size={18} className="sa-contact-whatsapp-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="sa-reveal sa-d2 sa-contact-card">
            <div className="sa-contact-card-accent" />
            <div className="sa-contact-form-heading">
              <span>Private Appointment</span>
              <h3 className="sa-serif">Book a Site Visit</h3>
              <p>Share your preferences and our property advisor will call you within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="sa-contact-form">
              <input type="hidden" name="utm_source" value={utms.utm_source} />
              <input type="hidden" name="utm_medium" value={utms.utm_medium} />
              <input type="hidden" name="utm_campaign" value={utms.utm_campaign} />
              <input type="hidden" name="utm_term" value={utms.utm_term} />
              <input type="hidden" name="utm_content" value={utms.utm_content} />
              <div className="sa-contact-form-grid">
                <div>
                  <label className="sa-contact-label">Full Name</label>
                  <input required type="text" autoComplete="name" placeholder="Your full name" className="sa-contact-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="sa-contact-label">Phone Number</label>
                  <input required type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 00000 00000" className="sa-contact-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="sa-contact-label">Email Address</label>
                <input required type="email" autoComplete="email" placeholder="you@example.com" className="sa-contact-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="sa-contact-form-grid">
                <div>
                  <label className="sa-contact-label">Preferred Home</label>
                  <select className="sa-contact-input" required value={formData.requirement} onChange={(e) => setFormData({...formData, requirement: e.target.value})}>
                    <option value="" disabled>Select configuration</option>
                    <option value="2bhk">2 BHK · ₹36–38 Lakhs</option>
                    <option value="3bhk">3 BHK · ₹46–59 Lakhs</option>
                  </select>
                </div>
                <div>
                  <label className="sa-contact-label">Your Pincode</label>
                  <input required type="text" autoComplete="postal-code" inputMode="numeric" placeholder="Enter pincode" className="sa-contact-input" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="sa-contact-submit sa-sans">
                Book a Site Visit <ArrowUpRight size={17} aria-hidden="true" />
              </button>
              <p className="sa-contact-privacy">Your information is secure and never shared.</p>
            </form>
          </div>
        </div>
      </section>
      <WaveDarkToLight fromColor={COLORS.darkNavy} toColor={COLORS.luxBeige} />
    </>
  );
}
