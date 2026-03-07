"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Language = "en" | "de"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.start": { en: "START", de: "START" },
  "nav.biography": { en: "BIOGRAPHY", de: "BIOGRAFIE" },
  "nav.career": { en: "CAREER", de: "KARRIERE" },
  "nav.achievements": { en: "ACHIEVEMENTS", de: "ERFOLGE" },
  "nav.media": { en: "MEDIA", de: "MEDIEN" },
  "nav.contact": { en: "CONTACT", de: "KONTAKT" },
  
  // Hero
  "hero.role": { en: "CEO SPORTS", de: "CEO SPORTS" },
  "hero.club": { en: "SK RAPID WIEN", de: "SK RAPID WIEN" },
  "hero.tagline": { 
    en: "Strategic sports leader with a high-performance playing career fueling modern, forward-thinking leadership.", 
    de: "Strategische Führungspersönlichkeit mit Hochleistungs-Spielerkarriere als Fundament für moderne, zukunftsorientierte Führung." 
  },
  "hero.scroll": { en: "Scroll to explore", de: "Scrollen zum Entdecken" },
  
  // About
  "about.subtitle": { en: "Profile", de: "Profil" },
  "about.title": { en: "BIOGRAPHY", de: "BIOGRAFIE" },
  "about.description": { 
    en: "A strategic sports leader who translates his high-performance playing career into modern, forward-thinking management. His deep understanding of professional football culture enables authentic leadership with sustainable vision.", 
    de: "Eine strategische Führungspersönlichkeit, die ihre Hochleistungs-Spielerkarriere in modernes, zukunftsorientiertes Management übersetzt. Sein tiefes Verständnis der professionellen Fußballkultur ermöglicht authentische Führung mit nachhaltiger Vision." 
  },
  "about.birthdate": { en: "Born", de: "Geburtsdatum" },
  "about.nationality": { en: "Nationality", de: "Nationalität" },
  "about.license": { en: "License", de: "Lizenz" },
  "about.austrian": { en: "Austrian", de: "Österreichisch" },
  "about.competences": { en: "Core Competences", de: "Kernkompetenzen" },
  "about.tools": { en: "Tools & Systems", de: "Tools & Systeme" },
  "about.languages": { en: "Languages", de: "Sprachen" },
  "about.german": { en: "German (native)", de: "Deutsch (Muttersprache)" },
  "about.english": { en: "English (fluent)", de: "Englisch (fließend)" },
  
  // Competences
  "comp.strategy": { en: "Sports Strategy & Leadership", de: "Sportstrategie & Führung" },
  "comp.recruitment": { en: "Recruitment & Scouting", de: "Rekrutierung & Scouting" },
  "comp.contracts": { en: "Contract Negotiation", de: "Vertragsverhandlungen" },
  "comp.youth": { en: "Youth Development", de: "Nachwuchsentwicklung" },
  "comp.stakeholder": { en: "Stakeholder Management", de: "Stakeholder-Management" },
  "comp.media": { en: "Media & Public Relations", de: "Medien & Öffentlichkeitsarbeit" },
  
  // Career
  "career.subtitle": { en: "Professional Path", de: "Beruflicher Werdegang" },
  "career.title": { en: "CAREER", de: "KARRIERE" },
  "career.management": { en: "MANAGEMENT", de: "MANAGEMENT" },
  "career.football": { en: "FOOTBALL CAREER", de: "FUSSBALL-KARRIERE" },
  "career.present": { en: "Present", de: "Heute" },
  
  // Achievements
  "achievements.subtitle": { en: "Milestones", de: "Meilensteine" },
  "achievements.title": { en: "ACHIEVEMENTS", de: "ERFOLGE" },
  "achievements.sporting": { en: "Sporting Success", de: "Sportlicher Erfolg" },
  "achievements.talent": { en: "Talent Exposure", de: "Talentförderung" },
  "achievements.structure": { en: "Structural Integrity", de: "Strukturelle Integrität" },
  "achievements.youth": { en: "Youth Development", de: "Nachwuchsentwicklung" },
  
  // Media
  "media.subtitle": { en: "Press & Videos", de: "Presse & Videos" },
  "media.title": { en: "MEDIA", de: "MEDIEN" },
  "media.description": { 
    en: "Selected interviews, podcasts and media appearances about sporting strategy and development at SK Rapid Wien.", 
    de: "Ausgewählte Interviews, Podcasts und Medienauftritte über sportliche Strategie und die Entwicklung bei SK Rapid Wien." 
  },
  "media.gallery": { en: "Gallery", de: "Galerie" },
  "media.video": { en: "Video", de: "Video" },
  "media.podcast": { en: "Podcast", de: "Podcast" },
  "media.article": { en: "Article", de: "Artikel" },
  "media.interview": { en: "Interview", de: "Interview" },
  
  // Philosophy
  "philosophy.subtitle": { en: "Vision", de: "Vision" },
  "philosophy.title": { en: "PHILOSOPHY", de: "PHILOSOPHIE" },
  "philosophy.style": { en: "Preferred Style of Play", de: "Bevorzugter Spielstil" },
  
  // Contact
  "contact.subtitle": { en: "Get in Touch", de: "Kontakt aufnehmen" },
  "contact.title": { en: "CONTACT", de: "KONTAKT" },
  "contact.email": { en: "Email", de: "E-Mail" },
  "contact.location": { en: "Location", de: "Standort" },
  
  // Footer
  "footer.rights": { en: "All rights reserved.", de: "Alle Rechte vorbehalten." },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "de" : "en")
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
