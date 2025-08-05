"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("HeroSection");
  return (
    <section className="py-8 md:py-16 lg:py-24 max-w-6xl mx-auto animate-fade-in-up mb-12 md:mb-24">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-start">
          <div className="space-y-6">
            <p className="text-sm font-bold text-purple-600 uppercase animate-pulse tracking-widest">
              {t("brand")}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {t("title")}
            </h1>
            <br />
            <p className="text-lg">{t("about")}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("ctaBudget")}
            </Button>
            <Link href="#models">
              <Button
                variant="outline"
                size="lg"
                className="border-primary w-full text-primary hover:bg-primary/10 hover:text-primary cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                {t("ctaModels")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Visual - Laptop Photo */}
        <div className="relative group">
          <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-3xl">
            <Image
              src="https://images.pexels.com/photos/4007744/pexels-photo-4007744.jpeg"
              alt="Modern laptop workspace"
              width={600}
              height={500}
              className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
