"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image 
          src="/images/gallery-rapid-stadium.jpg" 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6">
          <span className="text-primary text-sm md:text-base font-bold tracking-[0.3em] uppercase">
            {t("hero.role")} | {t("hero.club")}
          </span>
        </div>
        
        <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none">
          <span className="block text-foreground">MARKUS</span>
          <span className="block text-primary">KATZER</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          {t("hero.tagline")}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-foreground">2022</p>
            <p className="text-muted-foreground uppercase tracking-widest text-xs mt-1">
              {language === "en" ? "CEO Sports since" : "CEO Sports seit"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-primary">400+</p>
            <p className="text-muted-foreground uppercase tracking-widest text-xs mt-1">
              {language === "en" ? "Pro Matches" : "Profi-Spiele"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-black text-foreground">2x</p>
            <p className="text-muted-foreground uppercase tracking-widest text-xs mt-1">
              {language === "en" ? "Champion" : "Meister"}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a 
          href="#biography" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">
            {language === "en" ? "Learn more" : "Mehr erfahren"}
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
