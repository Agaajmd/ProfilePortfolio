"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="inline-flex items-center rounded-full border border-border/70 bg-background/60 p-1 backdrop-blur">
      <Button
        type="button"
        size="sm"
        variant={language === "en" ? "default" : "ghost"}
        className="h-7 rounded-full px-2 text-xs"
        onClick={() => setLanguage("en")}
        aria-label="Switch to English"
      >
        EN
      </Button>
      <Button
        type="button"
        size="sm"
        variant={language === "id" ? "default" : "ghost"}
        className="h-7 rounded-full px-2 text-xs"
        onClick={() => setLanguage("id")}
        aria-label="Ganti ke Bahasa Indonesia"
      >
        ID
      </Button>
    </div>
  )
}
