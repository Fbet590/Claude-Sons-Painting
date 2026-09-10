import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustBadges } from "@/components/trust-badges"

import { GallerySection } from "@/components/gallery-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Header />
      <div id="estimate">
        <HeroSection />
      </div>
      <TrustBadges />
      <div id="gallery">
        <GallerySection />
      </div>
      <CtaSection />
      <Footer />
    </main>
  )
}
