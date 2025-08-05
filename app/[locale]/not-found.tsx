import Link from "next/link";
import { Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";  

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <div className="h-[calc(100vh-16rem)] flex items-center justify-center">
        <main className="w-full flex flex-col items-center justify-center px-4 py-8">
          <Skull className="w-24 h-24 mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-semibold mb-2">{t("title")}</h2>
          <p className="mb-8 text-center max-w-md text-neutral-600">
            {t("description")}
          </p>
          <Link href="/">
            <Button size="lg" className="cursor-pointer">
              {t("backToHome")}
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}
