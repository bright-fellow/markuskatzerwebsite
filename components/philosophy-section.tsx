"use client"

import { useLanguage } from "@/lib/language-context"

export function PhilosophySection() {
  const { language } = useLanguage()
  
  const philosophyItems = [
    {
      label: { en: "In Possession", de: "Ballbesitz" },
      description: { en: "Dominant & Structured", de: "Dominant und strukturiert" },
    },
    {
      label: { en: "Out of Possession", de: "Gegen den Ball" },
      description: { en: "Aggressive Pressing", de: "Aggressives Pressing" },
    },
    {
      label: { en: "Offensive Transition", de: "Offensive Umschaltung" },
      description: { en: "Fast & Vertical", de: "Schnell und vertikal" },
    },
    {
      label: { en: "Defensive Transition", de: "Defensive Umschaltung" },
      description: { en: "Counter-Pressing", de: "Gegenpressing" },
    },
  ]

  return (
    <section id="philosophy" className="py-24 lg:py-32 px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">
              {language === "en" ? "Philosophy" : "Philosophie"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 tracking-tight">
              {language === "en" ? "STYLE OF PLAY" : "SPIELSTIL"}
            </h2>
            
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              {language === "en" 
                ? "Flexible collaboration with different coaches and styles, but preferably a dominant and structured football in possession with aggressive counter-pressing after losing the ball, combined with aggressive pressing and fast transitions after winning the ball."
                : "Flexible Zusammenarbeit mit verschiedenen Trainern und Stilen, aber vorzugsweise ein dominanter und strukturierter Fußball im Ballbesitz mit aggressivem Gegenpressing nach Ballverlust, kombiniert mit aggressivem Pressing und schnellen Umschaltmomenten nach Ballgewinn."
              }
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {philosophyItems.map((item, index) => (
              <div 
                key={index} 
                className="group p-6 bg-background border border-border hover:border-primary transition-colors"
              >
                <div className="h-1 w-12 bg-primary mb-4 group-hover:w-full transition-all duration-300" />
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {item.label[language]}
                </h3>
                <p className="text-xl font-black text-foreground">
                  {item.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
