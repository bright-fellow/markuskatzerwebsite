"use client"

import { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

const NAV_BG = "#244233"
const NAV_TEXT = "#f6f6f6"
const NAV_TEXT_MUTED = "rgba(246,246,246,0.65)"
const NAV_BORDER = "rgba(246,246,246,0.1)"
const NAV_GREEN_ACCENT = "#298e68"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("")
  const [menuKey, setMenuKey] = useState(0)
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { labelKey: "nav.start", href: "#" },
    { labelKey: "nav.biography", href: "#biography" },
    { labelKey: "nav.career", href: "#career" },
    { labelKey: "nav.achievements", href: "#achievements" },
    { labelKey: "nav.media", href: "#media" },
    { labelKey: "nav.contact", href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openMenu = () => {
    setMenuKey(k => k + 1)
    setMobileMenuOpen(true)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en")
  }

  return (
    <>
      <style>{`
        .rapid-nav-link {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${NAV_TEXT_MUTED};
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s ease;
        }
        .rapid-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${NAV_GREEN_ACCENT};
          transition: width 0.25s ease;
        }
        .rapid-nav-link:hover { color: ${NAV_TEXT}; }
        .rapid-nav-link:hover::after { width: 100%; }
        .rapid-nav-link.active { color: ${NAV_TEXT}; }
        .rapid-nav-link.active::after { width: 100%; }

        .rapid-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
          overflow: hidden;
        }
        .rapid-header.scrolled {
          background: ${NAV_BG};
          border-bottom-color: ${NAV_BORDER};
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }

        /* Shimmer sweeps across bottom border on scroll-solidify */
        @keyframes nav-shimmer {
          0%   { left: -30%; opacity: 1; }
          100% { left: 110%; opacity: 0; }
        }
        .rapid-header.scrolled::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: -30%;
          width: 30%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${NAV_GREEN_ACCENT}, transparent);
          animation: nav-shimmer 0.9s cubic-bezier(0.4,0,0.2,1) both;
          pointer-events: none;
        }

        .rapid-lang-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${NAV_TEXT_MUTED};
          background: none;
          border: 1px solid ${NAV_BORDER};
          padding: 6px 12px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .rapid-lang-btn:hover {
          color: ${NAV_TEXT};
          border-color: rgba(246,246,246,0.35);
        }

        /* Desktop nav — shown lg+ */
        .rapid-desktop-nav { display: none; }
        @media (min-width: 1024px) {
          .rapid-desktop-nav { display: flex; }
          .rapid-lang-desktop { display: flex; }
          .rapid-lang-mobile { display: none; }
          .rapid-hamburger { display: none; }
        }
        .rapid-lang-desktop { display: none; }
        .rapid-lang-mobile { display: flex; }
        .rapid-hamburger {
          display: flex;
          align-items: center;
          background: none;
          border: 1px solid ${NAV_BORDER};
          color: ${NAV_TEXT};
          padding: 6px 8px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .rapid-hamburger:hover { border-color: rgba(246,246,246,0.4); }

        .rapid-mobile-link {
          display: block;
          padding: 14px 0;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: ${NAV_TEXT_MUTED};
          text-decoration: none;
          border-bottom: 1px solid ${NAV_BORDER};
          transition: color 0.2s ease;
        }
        .rapid-mobile-link:hover { color: ${NAV_TEXT}; }

        /* Mobile menu animations */
        @keyframes menu-slide-in {
          0%   { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes menu-stripe {
          0%   { transform: translateX(-100%) skewX(-18deg); opacity: 0.22; }
          100% { transform: translateX(500%) skewX(-18deg); opacity: 0; }
        }
        @keyframes item-fade-in {
          0%   { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        .rapid-mobile-menu {
          position: relative;
          overflow: hidden;
          animation: menu-slide-in 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .rapid-mobile-menu::before {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          left: 0;
          width: 55%;
          background: ${NAV_GREEN_ACCENT};
          animation: menu-stripe 0.6s cubic-bezier(0.4,0,0.2,1) both;
          pointer-events: none;
          z-index: 0;
        }
        .rapid-mobile-item {
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: item-fade-in 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      <header className={`rapid-header${scrolled ? " scrolled" : ""}`}>
        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  fontWeight: 900,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: NAV_TEXT,
                }}
              >
                MARKUS <span style={{ color: "#298e68" }}>KATZER</span>
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 8,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: NAV_TEXT_MUTED,
                  marginTop: 2,
                }}
              >
                CEO SPORTS · SK RAPID WIEN
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul
            className="rapid-desktop-nav"
            style={{ listStyle: "none", margin: 0, padding: 0, alignItems: "center", gap: 28 }}
          >
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`rapid-nav-link${activeItem === item.href ? " active" : ""}`}
                  onClick={() => setActiveItem(item.href)}
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>

          {/* Right: Language + Mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <button
              onClick={toggleLanguage}
              className="rapid-lang-btn rapid-lang-desktop"
              aria-label={language === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
            >
              <Globe size={13} />
              <span>{language === "en" ? "DE" : "EN"}</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="rapid-lang-btn rapid-lang-mobile"
              style={{ padding: "6px 8px" }}
              aria-label={language === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
            >
              <Globe size={14} />
            </button>

            <button
              className="rapid-hamburger"
              onClick={mobileMenuOpen ? () => setMobileMenuOpen(false) : openMenu}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div
            key={menuKey}
            className="rapid-mobile-menu"
            style={{
              background: NAV_BG,
              borderTop: `1px solid ${NAV_BORDER}`,
              padding: "0 32px 20px",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navItems.map((item, i) => (
                <li
                  key={item.href}
                  className="rapid-mobile-item"
                  style={{ animationDelay: `${80 + i * 55}ms` }}
                >
                  <a
                    href={item.href}
                    className="rapid-mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  )
}
