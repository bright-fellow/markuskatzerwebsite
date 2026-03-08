"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { AnimateIn } from "@/components/animate-in"

export function AboutSection() {
  const { language } = useLanguage()
  
  const competences = language === "en" ? [
    "Sports Strategy & Long-term Planning",
    "Data-driven Recruitment Structures",
    "International Scouting Networks",
    "Budget-conscious Squad Building",
    "Contract Negotiations",
    "Club Structure & Process Development",
  ] : [
    "Sportstrategie & langfristige Planung",
    "Datengestützte Rekrutierungsstrukturen",
    "Internationale Scouting-Netzwerke",
    "Budgetbewusster Kaderaufbau",
    "Vertragsverhandlungen",
    "Vereinsstruktur & Prozessentwicklung",
  ]

  const tools = ["Wyscout", "TransferRoom", "MS Office", "Impect"]
  
  const languages = language === "en" 
    ? ["German (native)", "English (fluent)"] 
    : ["Deutsch (Muttersprache)", "Englisch (Fließend)"]

  return (
    <section id="biography" className="section-gap" style={{ background: "#1a2e24", borderTop: "2px solid #244233" }}>
      <div className="page-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimateIn direction="right" delay={100} className="relative lg:order-last">
            <div className="relative w-full min-h-[500px] lg:min-h-[700px]">
              <Image
                src="/images/markus-katzer-portrait.png"
                alt="Markus Katzer"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 bg-primary text-primary-foreground p-6">
              <p className="text-5xl font-black">11.12</p>
              <p className="text-sm uppercase tracking-widest">1979</p>
            </div>
          </AnimateIn>

          {/* Content */}
          <div>
            <AnimateIn direction="left" delay={0}>
              <span className="section-label">
                {language === "en" ? "Profile" : "Profil"}
              </span>
              <h2 className="section-heading">
                {language === "en" ? "BIOGRAPHY" : "BIOGRAFIE"}
              </h2>
            </AnimateIn>
            
            <AnimateIn direction="up" delay={120}>
              <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
                {language === "en"
                  ? "A modern, forward-thinking strategic leader committed to continuous development, innovation, and long-term structural improvement that enables sustainable sporting success."
                  : "Ein moderner, zukunftsorientierter strategischer Leiter, der sich der kontinuierlichen Entwicklung, Innovation und langfristigen strukturellen Verbesserung verschrieben hat, die nachhaltigen sportlichen Erfolg ermöglicht."
                }
              </p>
            </AnimateIn>

            <AnimateIn direction="up" delay={200}>
              <div className="mt-10 grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                  {language === "en" ? "Personal Details" : "Persönliche Daten"}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span className="text-foreground font-medium">
                      {language === "en" ? "Born:" : "Geburtsdatum:"}
                    </span> 11.12.1979
                  </li>
                  <li>
                    <span className="text-foreground font-medium">
                      {language === "en" ? "Nationality:" : "Nationalität:"}
                    </span> {language === "en" ? "Austrian" : "Österreich"}
                  </li>
                  <li>
                    <span className="text-foreground font-medium">
                      {language === "en" ? "License:" : "Lizenz:"}
                    </span> B-{language === "en" ? "License" : "Lizenz"}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                  {language === "en" ? "Languages" : "Sprachen"}
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={300}>
              <div className="mt-10">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                  {language === "en" ? "Core Competences" : "Kernkompetenzen"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {competences.map((competence) => (
                    <span
                      key={competence}
                      className="px-4 py-2 text-sm bg-secondary text-secondary-foreground"
                    >
                      {competence}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-4 py-2 text-sm border border-border text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  )
}
