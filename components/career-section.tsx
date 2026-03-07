"use client"

import { useLanguage } from "@/lib/language-context"

interface CareerItem {
  period: { en: string; de: string }
  role: { en: string; de: string }
  organization: string
  description: { en: string; de: string }
  highlights?: { en: string; de: string }[]
  type: "management" | "playing" | "agent"
}

const careerHistory: CareerItem[] = [
  {
    period: { en: "2022 — Present", de: "2022 — Heute" },
    role: { en: "CEO Sports", de: "CEO Sports" },
    organization: "SK Rapid Wien",
    description: {
      en: "Leading the sporting strategy and operational management of Austria's most successful football club with focus on sustainable success, talent development and international competitiveness.",
      de: "Leitung der sportlichen Strategie und des operativen Betriebs von Österreichs erfolgreichstem Fußballverein mit Fokus auf nachhaltigem Erfolg, Talententwicklung und internationaler Wettbewerbsfähigkeit.",
    },
    highlights: [
      { en: "UEFA Conference League Quarter-Final", de: "UEFA Conference League Viertelfinale" },
      { en: "2x Austrian Cup Finalist", de: "2x Österreichischer Cup-Finalist" },
      { en: "Record outgoing transfers in a period (€18.8M)", de: "Rekord-Abgangstransfers in einer Periode (€18,8 Mio.)" },
      { en: "Record individual transfers (Isak Jansson €10M, Mamadou Sangare €8M)", de: "Rekord-Einzeltransfers (Isak Jansson €10 Mio., Mamadou Sangare €8 Mio.)" },
      { en: "Implementation of data-driven recruitment structure", de: "Implementierung einer datengestützten Rekrutierungsstruktur" },
      { en: "Expansion of scouting network (Europe, Africa & Asia)", de: "Erweiterung des Scouting-Netzwerks (Europa, Afrika & Asien)" },
      { en: "Reserve team promotions (2023/24)", de: "Reserve-Mannschaft Aufstiege (2023/24)" },
      { en: "UEFA Youth League participation (2024/25)", de: "UEFA Youth League Teilnahme (2024/25)" },
      { en: "Regular promotion of homegrown talents to professional and national team", de: "Regelmäßige Beförderung von Eigengewächsen ins Profi- und Nationalteam" },
    ],
    type: "management",
  },
  {
    period: { en: "2018 — 2022", de: "2018 — 2022" },
    role: { en: "Sporting Director", de: "Sportdirektor" },
    organization: "First Vienna FC",
    description: {
      en: "Led the sports department through a remarkable transformation with four consecutive promotions from the fifth division to the second division.",
      de: "Leitung der Sportabteilung durch eine bemerkenswerte Transformation mit vier aufeinanderfolgenden Aufstiegen von der fünften Liga in die zweite Liga.",
    },
    highlights: [
      { en: "Promotion from 5th to 2nd division", de: "Aufstieg von der 5. Liga in die 2. Liga" },
      { en: "Building a sustainable club structure", de: "Aufbau einer nachhaltigen Vereinsstruktur" },
      { en: "Development of scouting and recruitment processes", de: "Entwicklung von Scouting- und Rekrutierungsprozessen" },
    ],
    type: "management",
  },
  {
    period: { en: "2015 — 2020", de: "2015 — 2020" },
    role: { en: "Football Agent", de: "Fußball-Agent" },
    organization: "Stars & Friends / Independent",
    description: {
      en: "Management of a portfolio of over 25 professional players, facilitating transfers in Europe, Africa, Australia and Asia.",
      de: "Verwaltung eines Portfolios von über 25 Profispielern, Vermittlung von Transfers in Europa, Afrika, Australien und Asien.",
    },
    highlights: [
      { en: "Represented 25+ professional players", de: "Vertretung von 25+ Profispielern" },
      { en: "Transfers on 4 continents", de: "Transfers auf 4 Kontinenten" },
    ],
    type: "agent",
  },
  {
    period: { en: "Professional Career", de: "Profikarriere" },
    role: { en: "Professional Footballer", de: "Profifußballer" },
    organization: "SK Rapid Wien, Admira Wacker, First Vienna FC",
    description: {
      en: "An outstanding playing career with over 400 professional matches, including appearances for the Austrian national team.",
      de: "Eine herausragende Spielerkarriere mit über 400 Profispielen, inklusive Einsätzen für die österreichische Nationalmannschaft.",
    },
    highlights: [
      { en: "400+ professional matches", de: "400+ Profispiele" },
      { en: "11 caps for Austria", de: "11 Länderspiele für Österreich" },
      { en: "Austrian Champion 2005 (SK Rapid Wien)", de: "Österreichischer Meister 2005 (SK Rapid Wien)" },
      { en: "Austrian Champion 2008 (SK Rapid Wien)", de: "Österreichischer Meister 2008 (SK Rapid Wien)" },
    ],
    type: "playing",
  },
]

export function CareerSection() {
  const { language } = useLanguage()
  
  const getTypeLabel = (type: string) => {
    if (type === "management") return language === "en" ? "Leadership" : "Führung"
    if (type === "playing") return language === "en" ? "Player" : "Spieler"
    return "Agent"
  }
  
  return (
    <section id="career" className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">
            {language === "en" ? "Experience" : "Erfahrung"}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 tracking-tight">
            {language === "en" ? "CAREER" : "KARRIERE"}
          </h2>
        </div>

        <div className="space-y-0">
          {careerHistory.map((item, index) => (
            <div 
              key={index} 
              className="group border-t border-border py-8 lg:py-12 hover:bg-card/50 transition-colors px-4 -mx-4"
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-2">
                  <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                    {item.period[language]}
                  </span>
                </div>
                
                <div className="lg:col-span-3">
                  <h3 className="text-2xl lg:text-3xl font-black text-foreground group-hover:text-primary transition-colors">
                    {item.role[language]}
                  </h3>
                  <p className="text-primary font-medium mt-1">
                    {item.organization}
                  </p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-bold tracking-wider uppercase bg-secondary text-secondary-foreground">
                    {getTypeLabel(item.type)}
                  </span>
                </div>
                
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description[language]}
                  </p>

                  {item.highlights && (
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {item.highlights.map((highlight, i) => (
                        <li 
                          key={i} 
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary font-bold">—</span>
                          {highlight[language]}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
