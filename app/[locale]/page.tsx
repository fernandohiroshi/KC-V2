import Hero from "@/components/custom/hero";
import About from "@/components/custom/about";
import Services from "@/components/custom/services";
import Models from "@/components/custom/models";
import FAQ from "@/components/custom/faq";
import ContactForm from "@/components/custom/contact-form";
import BrandingSection from "@/components/custom/branding-section";

export default function Home() {
  return (
    <main className="container mx-auto min-h-screen px-4">
      <Hero />
      <About />
      <Services />
      <Models />
      <BrandingSection />
      <FAQ />
      <ContactForm />
    </main>
  );
}
