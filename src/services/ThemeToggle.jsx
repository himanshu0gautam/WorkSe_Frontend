import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const syncTheme = (event) => setTheme(event.detail);
    window.addEventListener("app-theme-change", syncTheme);
    return () => window.removeEventListener("app-theme-change", syncTheme);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    window.dispatchEvent(new CustomEvent("app-theme-change", { detail: nextTheme }));

    try {
      localStorage.setItem("theme", nextTheme);
    } catch (error) {
      console.warn("Could not save the theme preference.", error);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#D99416]"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[#D99416]" />
      ) : (
        <Moon className="h-4 w-4 text-[#D99416]" />
      )}
      {/* <span>{isDark ? "Light mode" : "Dark mode"}</span> */}
    </button>
  );
}