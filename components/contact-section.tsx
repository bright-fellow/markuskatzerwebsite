"use client"

import { Mail, MapPin, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { language } = useLanguage()
  
  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase">
            {language === "en" ? "Get in Touch" : "Verbindung"}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-4 tracking-tight">
            {language === "en" ? "CONTACT" : "KONTAKT"}
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg">
            {language === "en" 
              ? "Interested in discussions about sports strategy, talent development or cooperation opportunities? I am always open to meaningful conversations about the future of football."
              : "Interesse an Gesprächen über Sportstrategie, Talententwicklung oder Kooperationsmöglichkeiten? Ich bin immer offen für bedeutungsvolle Gespräche über die Zukunft des Fußballs."
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <a 
            href="mailto:katzer14@gmail.com" 
            className="group flex items-center gap-6 p-8 bg-card border border-border hover:border-primary transition-all"
          >
            <div className="h-16 w-16 bg-primary flex items-center justify-center shrink-0">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-1">
                {language === "en" ? "Email" : "E-Mail"}
              </p>
              <p className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                katzer14@gmail.com
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </a>

          <div className="flex items-center gap-6 p-8 bg-card border border-border">
            <div className="h-16 w-16 bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="h-8 w-8 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-1">
                {language === "en" ? "Location" : "Standort"}
              </p>
              <p className="text-lg font-black text-foreground">
                {language === "en" ? "Vienna, Austria" : "Wien, Österreich"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
