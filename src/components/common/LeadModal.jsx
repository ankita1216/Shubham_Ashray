import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../constants/colors";

export default function LeadModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    location: "",
    message: ""
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lead captured:", formData);
    onClose();
    navigate("/thank-you");
  };

  const THEME_DARK = COLORS.darkNavy;
  const THEME_GOLD = COLORS.primary;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 460,
              maxHeight: "92vh",
              overflowY: "auto",
              borderRadius: 32,
              background: COLORS.darkNavy,
              boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
              scrollbarWidth: "none",
            }}
          >
            <style>{`
              .lead-modal-inner::-webkit-scrollbar { display: none; }
              .lead-input {
                width: 100%;
                height: 56px;
                border-radius: 14px;
                border: 1.5px solid rgba(255,255,255,0.08);
                background: rgba(255,255,255,0.03);
                padding: 0 20px;
                font-size: 14px;
                color: #fff;
                outline: none;
                transition: border-color 0.2s ease, box-shadow 0.2s ease;
                box-shadow: 0 1px 4px rgba(0,0,0,0.04);
                -webkit-tap-highlight-color: transparent;
                appearance: none;
                -webkit-appearance: none;
              }
              .lead-input::placeholder { color: rgba(255,255,255,0.22); }
              .lead-input:focus {
                border-color: ${COLORS.primary};
                box-shadow: 0 0 0 3px ${COLORS.primary}1A, 0 1px 4px rgba(0,0,0,0.04);
                background: rgba(255,255,255,0.05);
              }
              .lead-label {
                display: block;
                font-size: 9.5px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.22em;
                color: rgba(255,255,255,0.4);
                margin-bottom: 9px;
                padding-left: 2px;
              }
              .lead-submit {
                width: 100%;
                height: 56px;
                border-radius: 14px;
                background: ${COLORS.primary};
                color: ${COLORS.darkNavy};
                font-size: 10.5px;
                font-weight: 800;
                letter-spacing: 0.45em;
                text-transform: uppercase;
                border: none;
                cursor: pointer;
                outline: none;
                -webkit-tap-highlight-color: transparent;
                -webkit-appearance: none;
                transition: background 0.22s ease, box-shadow 0.22s ease, transform 0.15s ease;
                box-shadow: 0 8px 24px rgba(201,164,77,0.18);
                user-select: none;
              }
              .lead-submit:hover {
                background: ${COLORS.goldDark};
                box-shadow: 0 12px 32px rgba(201,164,77,0.24);
              }
              .lead-submit:active { transform: scale(0.99); }
              .lead-submit:focus-visible {
                box-shadow: 0 0 0 3px ${COLORS.primary}59, 0 8px 24px rgba(201,164,77,0.18);
              }
            `}</style>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                right: 20,
                top: 20,
                zIndex: 20,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.35)",
                transition: "all 0.22s ease",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = COLORS.primary; e.currentTarget.style.color = COLORS.darkNavy; e.currentTarget.style.borderColor = COLORS.primary; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <X size={15} />
            </button>

            {/* Inner content */}
            <div style={{ padding: "44px 36px 40px" }} className="lead-modal-inner">

              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h3
                  style={{
                    color: "#fff",
                    margin: "0 0 14px",
                  }}
                >
                  Enquire Now
                </h3>
                <div style={{ width: 40, height: 1.5, background: THEME_GOLD, margin: "0 auto 14px", opacity: 0.5 }} />
                <p style={{
                  color: THEME_GOLD,
                  opacity: 0.8,
                  margin: 0,
                  fontSize: 13,
                  fontWeight: 500,
                }}>
                  Your private sanctuary awaits
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Full Name */}
                <div>
                  <label className="lead-label">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="lead-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Phone + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label className="lead-label">Phone</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 00000 00000"
                      className="lead-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="lead-label">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      className="lead-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Requirement + Location */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ position: "relative" }}>
                    <label className="lead-label">Requirement</label>
                    <select
                      required
                      className="lead-input"
                      style={{ paddingRight: 40, cursor: "pointer" }}
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    >
                      <option value="" disabled style={{ background: COLORS.darkNavy, color: "#fff" }}>Select BHK</option>
                      <option value="2bhk" style={{ background: COLORS.darkNavy, color: "#fff" }}>2 BHK</option>
                      <option value="3bhk" style={{ background: COLORS.darkNavy, color: "#fff" }}>3 BHK</option>
                    </select>
                    <div style={{ position: "absolute", right: 16, bottom: 20, pointerEvents: "none", opacity: 0.4 }}>
                      <svg width="11" height="7" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                  <div style={{ position: "relative" }}>
                    <label className="lead-label">Location</label>
                    <select
                      required
                      className="lead-input"
                      style={{ paddingRight: 40, cursor: "pointer" }}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    >
                      <option value="" disabled style={{ background: COLORS.darkNavy, color: "#fff" }}>Select City</option>
                      <option value="dharapur" style={{ background: COLORS.darkNavy, color: "#fff" }}>Dharapur</option>
                      <option value="guwahati" style={{ background: COLORS.darkNavy, color: "#fff" }}>Guwahati</option>
                    </select>
                    <div style={{ position: "absolute", right: 16, bottom: 20, pointerEvents: "none", opacity: 0.4 }}>
                      <svg width="11" height="7" viewBox="0 0 12 8" fill="none"><path d="M1 1L6 6L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div style={{ paddingTop: 8 }}>
                  <button type="submit" className="lead-submit">
                    Confirm Interest
                  </button>
                  <p style={{ textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 14, letterSpacing: "0.04em" }}>
                    Your information is kept strictly private
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
