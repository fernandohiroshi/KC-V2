"use client";
import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import { Menu, Linkedin, Instagram } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

import React from "react";
import LanguageToggle from "../LanguageToggle";

import { useTranslations } from "next-intl";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("HeaderSection");
  return (
    <header className="flex flex-col lg:flex-row items-start justify-between py-4 sticky top-0 z-50 bg-background/60 px-4 backdrop-blur-2xl">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">{t("brand")}</Link>
        </div>

        <div className="hidden lg:flex gap-4 text-sm font-medium text-muted-foreground">
          <Link
            href="#"
            className="hover:text-purple-500 focus:text-purple-500 transition-colors"
          >
            {t("navigation.home")}
          </Link>
          <Link
            href="#services"
            className="hover:text-purple-500 focus:text-purple-500 transition-colors"
          >
            {t("navigation.services")}
          </Link>
          <Link
            href="#contact"
            className="hover:text-purple-500 focus:text-purple-500 transition-colors"
          >
            {t("navigation.contact")}
          </Link>
        </div>

        <div className="flex items-start gap-2">
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-background hover:bg-accent hover:text-purple-500 focus:text-purple-500"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background text-foreground"
            >
              <SheetHeader>
                <SheetTitle>{t("menuTitle")}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4 p-4 space-y-2">
                <Link
                  href="#"
                  className="text-sm font-medium text-muted-foreground hover:text-purple-500 focus:text-purple-500"
                  onClick={() => setOpen(false)}
                >
                  {t("navigation.home")}
                </Link>
                <Link
                  href="#services"
                  className="text-sm font-medium text-muted-foreground hover:text-purple-500 focus:text-purple-500"
                  onClick={() => setOpen(false)}
                >
                  {t("navigation.services")}
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium text-muted-foreground hover:text-purple-500 focus:text-purple-500"
                  onClick={() => setOpen(false)}
                >
                  {t("navigation.faq")}
                </Link>
                <Link
                  href="#contact"
                  className="text-sm font-medium text-muted-foreground hover:text-purple-500 focus:text-purple-500"
                  onClick={() => setOpen(false)}
                >
                  {t("navigation.contact")}
                </Link>
              </div>
              <div className="flex justify-center mt-8">
                <ThemeSwitch />
              </div>
              <div className="absolute bottom-0 left-0 w-full pb-6">
                <div className="flex justify-center gap-3">
                  <a
                    href="https:www.linkedin.com/company/konbini-code"
                    className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https:www.instagram.com/konbini_code/"
                    className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https:www.facebook.com/profile.php?id=61579275967882"
                    className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
