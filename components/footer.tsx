"use client"

import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { language } = useLanguage()
  
  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="font-black text-xl tracking-tighter">
            MARKUS<span className="text-primary">KATZER</span>
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Markus Katzer. {language === "en" ? "All rights reserved." : "Alle Rechte vorbehalten."}
        </p>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>{language === "en" ? "Vienna, Austria" : "Wien, Österreich"}</span>
          <span>•</span>
          <a 
            href="mailto:katzer14@gmail.com" 
            className="hover:text-primary transition-colors"
          >
            katzer14@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
