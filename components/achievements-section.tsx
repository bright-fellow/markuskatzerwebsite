"use client"

import { Trophy, TrendingUp, Users, Target } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { AnimateIn } from "@/components/animate-in"

export function AchievementsSection() {
  const { language } = useLanguage()
  
  const achievements = [
    {
      icon: Trophy,
      category: { en: "Sporting Success", de: "Sportlicher Erfolg" },
      items: language === "en" ? [
        "Promotion with First Vienna FC from 5th to 2nd division",
        "2x Austrian Cup Finalist",
        "UEFA Conference League Quarter-Final",
      ] : [
        "Aufstieg mit First Vienna FC von der 5. Liga in die 2. Liga",
        "2x Österreichischer Cup-Finalist",
        "UEFA Conference League Viertelfinale",
      ],
    },
    {
      icon: TrendingUp,
      category: { en: "Talent Development & Transfers", de: "Talententwicklung & Transfers" },
      items: language === "en" ? [
        "Record outgoing transfers in a period (€18.8M)",
        "Record individual transfers (Isak Jansson €10M, Mamadou Sangare €8M)",
        "Implementation of data-driven recruitment structure",
        "Doubling of squad value at SK Rapid",
      ] : [
        "Rekord-Abgangstransfers in einer Periode (€18,8 Mio.)",
        "Rekord-Einzeltransfers (Isak Jansson €10 Mio., Mamadou Sangare €8 Mio.)",
        "Implementierung einer datengestützten Rekrutierungsstruktur",
        "Verdopplung des Kaderwerts bei SK Rapid",
      ],
    },
    {
      icon: Target,
      category: { en: "Structural Integrity", de: "Strukturelle Integrität" },
      items: language === "en" ? [
        "Sustainable operational structure implemented club-wide",
        "Sustainable operations & expansion of scouting network (Europe, Africa & Asia)",
      ] : [
        "Nachhaltige Betriebsstruktur vereinsweit implementiert",
        "Nachhaltige Operationen & Erweiterung des Scouting-Netzwerks (Europa, Afrika & Asien)",
      ],
    },
    {
      icon: Users,
      category: { en: "Youth Development", de: "Nachwuchsförderung" },
      items: language === "en" ? [
        "Reserve team promotions (2023/24)",
        "UEFA Youth League (2024/25)",
        "Regular promotion of homegrown talents to professional and national team",
        "Developed talents: Sattlberger, Querfeld, Wurmbrand, Oswald, Demir, Hedl",
      ] : [
        "Reserve-Mannschaft Aufstiege (2023/24)",
        "UEFA Youth League (2024/25)",
        "Regelmäßige Beförderung von Eigengewächsen ins Profi- und Nationalteam",
        "Geförderte Talente: Sattlberger, Querfeld, Wurmbrand, Oswald, Demir, Hedl",
      ],
    },
  ]

  return (
    <section id="achievements" className="section-gap px-0" style={{background:"#1a2e24"}}>
      <div className="page-container">
        <AnimateIn direction="left">
          <div className="mb-16">
            <span className="section-label">
              {language === "en" ? "Key Achievements" : "Schlüsselerfolge"}
            </span>
            <h2 className="section-heading">
              {language === "en" ? "ACHIEVEMENTS" : "ERFOLGE"}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-3xl text-lg">
              {language === "en"
                ? "Successful promotion with First Vienna FC from the fifth division to the second division. Doubling of squad value at SK Rapid with record outgoing transfers and reaching the UEFA Conference League quarter-finals."
                : "Erfolgreicher Aufstieg mit First Vienna FC von der fünften Liga in die zweite Liga. Verdopplung des Kaderwerts bei SK Rapid mit Rekord-Abgangstransfers und Erreichen des UEFA Conference League Viertelfinales."
              }
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <AnimateIn key={index} direction="up" delay={index * 100}>
            <div
              className="group p-8 bg-background border border-border hover:border-primary/50 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 bg-primary flex items-center justify-center">
                  <achievement.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-black text-foreground uppercase tracking-tight">
                  {achievement.category[language]}
                </h3>
              </div>
              <ul className="space-y-4">
                {achievement.items.map((item, i) => (
                  <li 
                    key={i} 
                    className="text-muted-foreground flex items-start gap-3"
                  >
                    <span className="text-primary font-bold text-lg leading-none">—</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
