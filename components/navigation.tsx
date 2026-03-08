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
        .rapid-nav-link:hover {
          color: ${NAV_TEXT};
        }
        .rapid-nav-link:hover::after {
          width: 100%;
        }
        .rapid-nav-link.active {
          color: ${NAV_TEXT};
        }
        .rapid-nav-link.active::after {
          width: 100%;
        }
        .rapid-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .rapid-header.scrolled {
          background: ${NAV_BG};
          border-bottom-color: ${NAV_BORDER};
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
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
        .rapid-mobile-link:hover {
          color: ${NAV_TEXT};
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
            {/* Shield monogram */}
            <svg width="26" height="30" viewBox="0 0 26 30" fill="none" aria-hidden="true">
              <path d="M13 0L26 4.5V17C26 23.5 20.5 28 13 30C5.5 28 0 23.5 0 17V4.5L13 0Z" fill="#298e68" />
              <text x="13" y="21" textAnchor="middle" fill="#f6f6f6" fontSize="10" fontWeight="900" fontFamily="Inter, sans-serif">MK</text>
            </svg>
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
            className="hidden lg:flex"
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
              className="rapid-lang-btn hidden lg:flex"
              aria-label={language === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
            >
              <Globe size={13} />
              <span>{language === "en" ? "DE" : "EN"}</span>
            </button>

            {/* Mobile: lang */}
            <button
              onClick={toggleLanguage}
              className="rapid-lang-btn lg:hidden"
              style={{ padding: "6px 8px" }}
              aria-label={language === "en" ? "Auf Deutsch wechseln" : "Switch to English"}
            >
              <Globe size={14} />
            </button>

            {/* Mobile: hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "none",
                border: `1px solid ${NAV_BORDER}`,
                color: NAV_TEXT,
                padding: "6px 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "border-color 0.2s",
              }}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu — always solid so it's readable over any content */}
        {mobileMenuOpen && (
          <div
            style={{
              background: NAV_BG,
              borderTop: `1px solid ${NAV_BORDER}`,
              padding: "0 32px 20px",
              backdropFilter: "blur(12px)",
            }}
          >
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item.href}>
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
