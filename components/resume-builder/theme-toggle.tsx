"use client"

import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  theme: "light" | "dark"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="relative w-10 h-10 rounded-xl bg-secondary/80 hover:bg-secondary transition-colors flex items-center justify-center"
      aria-label="Toggle theme"
    >
      <div className="relative">
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-foreground" />
        ) : (
          <Sun className="h-5 w-5 text-amber-400" />
        )}
      </div>
    </button>
  )
}
