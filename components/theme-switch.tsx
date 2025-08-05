"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const checked = theme === "dark";

  const handleChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <Sun className="w-4 h-4" />
      <Switch checked={checked} onCheckedChange={handleChange} />
      <Moon className="w-4 h-4" />
    </label>
  );
}
