"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <LucideMoon className="h-4 w-4 rotate-0 scale-100 transition-all absolute dark:-rotate-90 dark:scale-0" />
      <LucideSun className="h-4 w-4 rotate-90 scale-0 transition-all absolute dark:-rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeSwitcher;
