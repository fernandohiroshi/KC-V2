import Image from "next/image";

export default function BrandingSection() {
  return (
    <section className="py-8 md:py-16 lg:py-24 max-w-6xl mx-auto animate-fade-in-up rounded-3xl">
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl bg-background">
        <Image
          src="/branding.webp"
          alt="Branding"
          width={1200}
          height={1200}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </section>
  );
}
