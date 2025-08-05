"use client";
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const LANGUAGES = [
  { code: "pt", label: "🇧🇷", name: "Português" },
  { code: "en", label: "🇺🇸", name: "English" },
  { code: "es", label: "🇪🇸", name: "Español" },
  { code: "ja", label: "🇯🇵", name: "日本語" },
];

export default function LanguageToggle() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const getPathWithoutLocale = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (LANGUAGES.some(l => l.code === segments[0])) {
      segments.shift();
    }
    return "/" + segments.join("/");
  };

  const handleSelect = (selected: string) => {
    setLoading(true);
    const newPath = `/${selected}${getPathWithoutLocale()}`;
    router.push(newPath);
  };

  const current = LANGUAGES.find(l => l.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Selecionar idioma" className="cursor-pointer" disabled={loading}>
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            <span className="text-sm">{current?.label ?? ""}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map(({ code, label, name }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleSelect(code)}
            disabled={code === locale}
            className="flex items-center gap-2 min-w-[120px]"
          >
            <span className="text-base">{label}</span>
            <span className="text-xs text-muted-foreground">{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
