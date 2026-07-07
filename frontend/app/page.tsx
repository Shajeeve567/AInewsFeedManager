import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { SocialProof } from "@/components/landing/social-proof";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      {/* <SocialProof /> */}
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}
