"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { language } = useLanguage()

  const links = language === "en"
    ? [
        { label: "Biography", href: "#biography" },
        { label: "Career", href: "#career" },
        { label: "Achievements", href: "#achievements" },
        { label: "Media", href: "#media" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Biografie", href: "#biography" },
        { label: "Karriere", href: "#career" },
        { label: "Erfolge", href: "#achievements" },
        { label: "Medien", href: "#media" },
        { label: "Kontakt", href: "#contact" },
      ]

  return (
    <>
      <style>{`
        .rapid-footer {
          background: #1a2e24;
          border-top: 2px solid #244233;
          padding: 56px 32px 32px;
        }
        .rapid-footer-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 768px) {
          .rapid-footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 64px;
          }
        }
        .rapid-footer-heading {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #298e68;
          margin: 0 0 16px;
        }
        .rapid-footer-link {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(246,246,246,0.55);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 0.2s ease;
          letter-spacing: 0.03em;
        }
        .rapid-footer-link:hover {
          color: #f6f6f6;
        }
        .rapid-footer-divider {
          max-width: 1280px;
          margin: 40px auto 0;
          border: none;
          border-top: 1px solid rgba(246,246,246,0.08);
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-start;
        }
        @media (min-width: 640px) {
          .rapid-footer-divider {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        .rapid-footer-copy {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: rgba(246,246,246,0.3);
          letter-spacing: 0.04em;
        }
      `}</style>

      <footer className="rapid-footer">
        <div className="rapid-footer-grid">
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <svg width="24" height="28" viewBox="0 0 26 30" fill="none" aria-hidden="true">
                <path d="M13 0L26 4.5V17C26 23.5 20.5 28 13 30C5.5 28 0 23.5 0 17V4.5L13 0Z" fill="#298e68" />
                <text x="13" y="21" textAnchor="middle" fill="#f6f6f6" fontSize="10" fontWeight="900" fontFamily="Inter, sans-serif">MK</text>
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#f6f6f6",
                }}
              >
                MARKUS <span style={{ color: "#298e68" }}>KATZER</span>
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(246,246,246,0.5)", lineHeight: 1.65, maxWidth: 280, margin: 0 }}>
              {language === "en"
                ? "CEO Sports at SK Rapid Wien. Strategic leadership built on a foundation of 400+ professional appearances."
                : "CEO Sports bei SK Rapid Wien. Strategische Führung auf Basis von 400+ Profieinsätzen."}
            </p>
            <a
              href="mailto:katzer14@gmail.com"
              style={{
                display: "inline-block",
                marginTop: 20,
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: "#298e68",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              katzer14@gmail.com
            </a>
          </div>

          {/* Navigation links */}
          <div>
            <p className="rapid-footer-heading">
              {language === "en" ? "Navigation" : "Navigation"}
            </p>
            <nav>
              {links.map((l) => (
                <a key={l.href} href={l.href} className="rapid-footer-link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Info column */}
          <div>
            <p className="rapid-footer-heading">
              {language === "en" ? "Information" : "Information"}
            </p>
            <p className="rapid-footer-link" style={{ cursor: "default" }}>
              {language === "en" ? "Vienna, Austria" : "Wien, Österreich"}
            </p>
            <p className="rapid-footer-link" style={{ cursor: "default" }}>
              {language === "en" ? "CEO Sports since 2022" : "CEO Sports seit 2022"}
            </p>
            <p className="rapid-footer-link" style={{ cursor: "default" }}>
              SK Rapid Wien
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="rapid-footer-divider">
          <span className="rapid-footer-copy">
            © {new Date().getFullYear()} Markus Katzer.{" "}
            {language === "en" ? "All rights reserved." : "Alle Rechte vorbehalten."}
          </span>
          <span className="rapid-footer-copy">
            {language === "en" ? "Design System v1.0 · Beyer Görges" : "Design System v1.0 · Beyer Görges"}
          </span>
        </div>
      </footer>
    </>
  )
}
