import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { CareerSection } from "@/components/career-section"
import { AchievementsSection } from "@/components/achievements-section"
import { MediaSection } from "@/components/media-section"
import { PhilosophySection } from "@/components/philosophy-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ProtectedContent } from "@/components/protected-content"

export default function Home() {
  return (
    <ProtectedContent>
      <main className="min-h-screen bg-background text-foreground">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <CareerSection />
        <AchievementsSection />
        <MediaSection />
        <PhilosophySection />
        <ContactSection />
        <Footer />
      </main>
    </ProtectedContent>
  )
}
