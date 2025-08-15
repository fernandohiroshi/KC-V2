"use client";

import type React from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback } from "react";

import { useTranslations } from "next-intl";

import { useLocale } from "next-intl";

const Models = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const t = useTranslations("ModelsSection");
  const locale = useLocale();
  const modelTitles = t.raw("models") as Array<{ title: string }>;

  // Conversion rates from BRL
  const conversionRates: Record<string, { rate: number; currency: string }> = {
    pt: { rate: 1, currency: "BRL" },
    en: { rate: 0.2, currency: "USD" },
    es: { rate: 0.18, currency: "EUR" },
    ja: { rate: 33, currency: "JPY" },
  };

  // Fallback to BRL if locale not found
  const { rate, currency } = conversionRates[locale] || conversionRates["pt"];

  function formatPrice(price: number) {
    // Aumenta 40% se não for pt
    const increase = locale === "pt" ? 1 : 1.2;
    const converted = Math.round(price * rate * increase * 100) / 100;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "JPY" ? 0 : 2,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(converted);
  }

  const models = [
    {
      id: 1,
      price: 320,
      image: "/models/petshop.webp",
      url: "https://konbinicode-petshop-demo.vercel.app/",
    },
    {
      id: 2,
      price: 270,
      image: "/models/academia.webp",
      url: "https://konbinicode-academia-demo.vercel.app/",
    },
    {
      id: 3,
      price: 310,
      image: "/models/beleza.webp",
      url: "https://konbinicode-beleza-demo.vercel.app/",
    },
    {
      id: 4,
      price: 250,
      image: "/models/lavacar.webp",
      url: "https://konbinicode-lavacar-demo.vercel.app/",
    },
    {
      id: 5,
      price: 390,
      image: "/models/psicologa.webp",
      url: "https://konbinicode-psicologa-demo.vercel.app/",
    },
    {
      id: 6,
      price: 350,
      image: "/models/nutricao.webp",
      url: "https://konbinicode-nutricao-demo.vercel.app/",
    },
    {
      id: 7,
      price: 380,
      image: "/models/evento.webp",
      url: "https://konbinicode-evento-demo.vercel.app/",
    },
    {
      id: 8,
      price: 295,
      image: "/models/lanchonete.webp",
      url: "https://konbinicode-lanchonete-demo.vercel.app/",
    },
    {
      id: 9,
      price: 265,
      image: "/models/jornalismo.webp",
      url: "https://konbinicode-jornalismo-demo.vercel.app/",
    },
    {
      id: 10,
      price: 375,
      image: "/models/barbearia.webp",
      url: "https://konbinicode-barbearia-demo.vercel.app/",
    },
    {
      id: 11,
      price: 499,
      image: "/models/tattoo.webp",
      url: "https://konbinicode-tattoo-demo.vercel.app/",
    },
  ];

  const scrollLeftButton = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  const scrollRightButton = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  // Mouse drag functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);

    // Change cursor to grabbing
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.style.userSelect = "none";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;

      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "auto";
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);

    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
      scrollRef.current.style.userSelect = "auto";
    }
  }, []);

  return (
    <section
      className="py-8 md:py-16 lg:py-24 max-w-6xl mx-auto animate-fade-in-up mb-12 md:mb-24"
      id="models"
    >
      <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-2">
        MODELOS
      </p>
      <div className="space-y-12">
        {/* Header */}
        <div className="text-start space-y-4">
          <h2
            className="text-3xl lg:text-4xl font-bold"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
        </div>

        {/* Horizontal Scroll Container with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-transform duration-200 hover:scale-110"
            onClick={scrollLeftButton}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Right Arrow */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-transform duration-200 hover:scale-110"
            onClick={scrollRightButton}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide px-4 md:px-12 scroll-smooth cursor-grab select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
          >
            {models.map((model, i) => (
              <Card
                key={model.id}
                className="flex-none w-full md:w-80 group transition-all duration-300 pointer-events-auto py-0 hover:shadow-xl hover:-translate-y-2 hover:bg-muted/80"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={model.image || "/placeholder.svg"}
                      alt={modelTitles[i]?.title || ""}
                      width={320}
                      height={240}
                      className="w-full h-60 object-contain transition-transform duration-300 group-hover:scale-105 group-hover:brightness-105"
                      draggable={false}
                    />
                    {locale === "pt" && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-purple-500/80 backdrop-blur-2xl text-white px-3 py-1 rounded-full text-sm font-medium">
                          {formatPrice(model.price)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">
                      {modelTitles[i]?.title}
                    </h3>
                    <Button
                      className="w-full bg-transparent pointer-events-auto cursor-pointer transition-all duration-300"
                      variant="outline"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={() => window.open(model.url, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("button")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gradient fades */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        {/* Scroll indicator */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{t("scrollTip")}</p>
        </div>
      </div>
    </section>
  );
};

export default Models;
