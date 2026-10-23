import { useTheme } from "../theme";
import { IconMoon, IconSun } from "./icons";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-heading transition-opacity hover:opacity-65 ${className}`}
    >
      {theme === "dark" ? (
        <IconSun className="h-[16px] w-[16px]" />
      ) : (
        <IconMoon className="h-[16px] w-[16px]" />
      )}
    </button>
  );
}
