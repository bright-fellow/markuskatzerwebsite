"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-background/95 backdrop-blur-lg" 
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="#" className="font-black text-2xl tracking-tighter text-foreground">
          MARKUS<span className="text-primary">KATZER</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-xs font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 ml-4 border border-border hover:border-primary/50 px-3 py-1.5"
            aria-label={language === "en" ? "Switch to German" : "Switch to English"}
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-bold tracking-widest uppercase">{language === "en" ? "DE" : "EN"}</span>
          </button>
        </div>

        {/* Mobile Menu Button & Language */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300 border border-border hover:border-primary/50 p-2"
            aria-label={language === "en" ? "Switch to German" : "Switch to English"}
          >
            <Globe className="h-5 w-5" />
          </button>
          <button 
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-lg border-t border-border">
          <ul className="flex flex-col py-6 px-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 text-sm font-bold tracking-widest text-muted-foreground hover:text-foreground transition-colors border-b border-border/50"
                >
                  {t(item.labelKey)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
