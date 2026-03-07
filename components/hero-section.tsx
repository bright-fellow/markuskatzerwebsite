"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden jugendstil-pattern rapidviertelstunde-bg shield-pattern">
      {/* 1899 Keyvisual Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="keyvisual-1899 select-none">
          1899
        </div>
      </div>

      {/* Background Image with 45° Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery-rapid-stadium.jpg"
          alt="Allianz Stadion - SK Rapid Wien"
          fill
          className="object-cover rapid-filter"
          priority
        />
        <div className="absolute inset-0 overlay-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-transparent via-60% to-black/30 to-100%" />
        <div className="image-fade-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <span className="text-rapid-green text-sm md:text-base font-sohne-condensed font-black tracking-[0.3em] uppercase">
            {language === "en" ? "CEO SPORTS" : "CEO SPORTS"} | SK RAPID WIEN
          </span>
        </div>

        <h1 className="text-rapid-h1 mb-4">
          <span className="block text-rapid-white">MARKUS</span>
          <span className="block text-rapid-green">KATZER</span>
        </h1>

        <p className="text-rapid-body text-rapid-white/90 font-light max-w-2xl mx-auto leading-relaxed mb-12">
          {language === "en"
            ? "Strategic leadership with high-performance playing career as foundation for modern, future-oriented leadership. CEO Sports at SK Rapid Wien."
            : "Strategische Führungspersönlichkeit mit Hochleistungs-Spielerkarriere als Fundament für moderne, zukunftsorientierte Führung. CEO Sports bei SK Rapid Wien."
          }
        </p>

        {/* Stats with SK Rapid Wien styling */}
        <div className="flex flex-wrap justify-center gap-12 text-rapid-white">
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-sohne-condensed font-black text-rapid-green">2022</p>
            <p className="text-rapid-white/70 uppercase tracking-widest text-xs mt-2 font-sohne">
              {language === "en" ? "CEO SPORTS SINCE" : "CEO SPORTS SEIT"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-sohne-condensed font-black text-rapid-white">400+</p>
            <p className="text-rapid-white/70 uppercase tracking-widest text-xs mt-2 font-sohne">
              {language === "en" ? "PRO MATCHES" : "PROFI-SPIELE"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-sohne-condensed font-black text-rapid-gold">2x</p>
            <p className="text-rapid-white/70 uppercase tracking-widest text-xs mt-2 font-sohne">
              {language === "en" ? "CHAMPION" : "MEISTER"}
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center">
          <button className="btn-rapid-primary focus-rapid">
            {language === "en" ? "LEARN MORE" : "MEHR ERFAHREN"}
          </button>
          <button className="btn-rapid-secondary focus-rapid">
            {language === "en" ? "CONTACT" : "KONTAKT"}
          </button>
        </div>
      </div>

      {/* Scroll Indicator with Viertelstunde motif */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-rapid-white/60 hover:text-rapid-green transition-colors group"
        >
          <span className="text-xs uppercase tracking-widest font-sohne">
            {language === "en" ? "Discover More" : "Mehr Entdecken"}
          </span>
          <div className="relative">
            <ChevronDown className="h-5 w-5 animate-bounce" />
            <div className="absolute inset-0 border-2 border-rapid-green rounded-full w-8 h-8 -m-1.5 opacity-20 group-hover:opacity-40 transition-opacity viertelstunde-loader"></div>
          </div>
        </a>
      </div>
    </section>
  )
}
