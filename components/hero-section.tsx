"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <>
      <style>{`
        .rapid-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background: #0d1f18;
        }
        .rapid-hero-badge {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #298e68;
          border: 1px solid rgba(41,142,104,0.4);
          padding: 5px 14px;
          margin-bottom: 20px;
        }
        .rapid-hero-h1 {
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 900;
          line-height: 0.88;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: #f6f6f6;
          margin: 0 0 8px;
        }
        .rapid-hero-h1 .accent {
          color: #298e68;
        }
        .rapid-hero-body {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.65;
          color: rgba(246,246,246,0.65);
          max-width: 52ch;
          margin: 20px 0 36px;
        }
        .rapid-hero-stat-value {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .rapid-hero-stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(246,246,246,0.45);
          margin-top: 6px;
        }
        .rapid-btn-primary {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: #298e68;
          color: #f6f6f6;
          border: 1px solid #298e68;
          padding: 14px 32px;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        .rapid-btn-primary:hover {
          background: #f6f6f6;
          color: #244233;
        }
        .rapid-btn-secondary {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: transparent;
          color: #f6f6f6;
          border: 1px solid rgba(246,246,246,0.3);
          padding: 14px 32px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease;
        }
        .rapid-btn-secondary:hover {
          border-color: #f6f6f6;
          color: #f6f6f6;
        }
        .rapid-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: rgba(246,246,246,0.4);
          transition: color 0.2s ease;
        }
        .rapid-scroll-indicator:hover {
          color: #298e68;
        }
        .rapid-scroll-indicator span {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        /* Diagonal stripe overlay */
        @keyframes hero-1899-pulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.07; }
        }
        .hero-watermark {
          position: absolute;
          right: -2%;
          bottom: 5%;
          font-family: 'Inter', sans-serif;
          font-size: clamp(8rem, 22vw, 18rem);
          font-weight: 900;
          line-height: 1;
          color: #244233;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          animation: hero-1899-pulse 10s ease-in-out infinite;
          letter-spacing: -0.06em;
        }
      `}</style>

      <section className="rapid-hero">
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/gallery-rapid-stadium.jpg"
            alt="Allianz Stadion – SK Rapid Wien"
            fill
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
            priority
          />
          {/* Dark green tint overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(13,31,24,0.92) 0%, rgba(36,66,51,0.78) 45%, rgba(0,0,0,0.55) 100%)",
          }} />
          {/* Diagonal stripe texture */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(36,66,51,0.18) 40px, rgba(36,66,51,0.18) 42px)",
          }} />
          {/* Bottom fade to page bg */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "50%",
            background: "linear-gradient(to bottom, transparent 0%, rgba(13,31,24,0.6) 40%, rgba(36,66,51,0.85) 70%, #244233 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }} />
        </div>

        {/* Year watermark */}
        <div className="hero-watermark" aria-hidden="true">1899</div>

        {/* Content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px 72px",
        }}>
          <div style={{ maxWidth: 720 }}>
            <div className="rapid-hero-badge hero-badge-animate">
              CEO SPORTS · SK RAPID WIEN · EST. 1899
            </div>

            <h1 className="rapid-hero-h1" style={{ overflow: "hidden" }}>
              <span className="hero-h1-line-1">MARKUS</span>
              <span className="hero-h1-line-2 accent">KATZER</span>
            </h1>

            <p className="rapid-hero-body hero-body-animate">
              {language === "en"
                ? "Strategic leadership with a high-performance playing career as foundation. CEO Sports at SK Rapid Wien — Austria's most storied football club."
                : "Strategische Führungspersönlichkeit mit Hochleistungs-Spielerkarriere als Fundament. CEO Sports bei SK Rapid Wien — Österreichs traditionsreichstem Fußballverein."}
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
              {[
                { value: "2022", label: language === "en" ? "CEO Sports Since" : "CEO Sports Seit", color: "#f6f6f6", cls: "hero-stat-1" },
                { value: "400+", label: language === "en" ? "Pro Matches" : "Profi-Spiele", color: "#f6f6f6", cls: "hero-stat-2" },
                { value: "2×", label: language === "en" ? "Austrian Champion" : "Österr. Meister", color: "#fcda5f", cls: "hero-stat-3" },
              ].map((s, i) => (
                <div key={i} className={s.cls} style={{ display: "flex", flexDirection: "column" }}>
                  <span className="rapid-hero-stat-value" style={{ color: s.color }}>{s.value}</span>
                  <span className="rapid-hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="hero-cta-animate" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#biography" className="rapid-btn-primary">
                {language === "en" ? "Learn More" : "Mehr Erfahren"}
              </a>
              <a href="#contact" className="rapid-btn-secondary">
                {language === "en" ? "Contact" : "Kontakt"}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-animate" style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}>
          <a href="#biography" className="rapid-scroll-indicator">
            <span>{language === "en" ? "Discover" : "Entdecken"}</span>
            <ChevronDown size={18} style={{ animation: "bounce 2s 2s infinite" }} />
          </a>
        </div>
      </section>
    </>
  )
}
