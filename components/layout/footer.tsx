import Link from "next/link";
import { Linkedin, Instagram, ArrowUp } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Footer = () => {
  const t = useTranslations("FooterSection");
  return (
    <footer className="bg-muted/30 border-t py-8">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 text-start lg:text-left">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-1">
              <div className="w-8 h-8 bg-transparent rounded-lg flex items-center justify-center">
                <Image src="/favicon.png" width={30} height={30} alt="Logo" />
              </div>
              <span className="text-xl font-bold">Konbini Code</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t("brandDescription")}
            </p>

            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.linkedin.com/company/konbini-code"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center  hover:text-purple-500 focus:text-purple-500-foreground transition-colors transform hover:scale-110"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/konbini_code/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center  hover:text-purple-500 focus:text-purple-500-foreground transition-colors transform hover:scale-110"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61579275967882"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center  hover:text-purple-500 focus:text-purple-500-foreground transition-colors transform hover:scale-110"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {t("navigationTitle")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-purple-500 focus:text-purple-500 transition-colors underline-offset-4 hover:underline duration-200"
                >
                  {t("navigation.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm hover:text-purple-500 focus:text-purple-500 transition-colors underline-offset-4 hover:underline duration-200"
                >
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#models"
                  className="text-sm hover:text-purple-500 focus:text-purple-500 transition-colors underline-offset-4 hover:underline duration-200"
                >
                  {t("navigation.models")}
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-sm hover:text-purple-500 focus:text-purple-500 transition-colors underline-offset-4 hover:underline duration-200"
                >
                  {t("navigation.services")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              {t("supportTitle")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/5545988085765"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-purple-500 focus:text-purple-500 transition-colors underline-offset-4 hover:underline duration-200"
                >
                  {t("support.phone")}
                </a>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-sm hover:text-purple-500 focus:text-purple-500 transition-colors underline-offset-4 hover:underline duration-200"
                >
                  {t("support.faq")}
                </Link>
              </li>

              <li className="flex justify-end">
                <Link href="#" title={t("backToTop")}>
                  <Button size="icon" className="cursor-pointer">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
