import { useEffect } from "react";
import type { ReactNode } from "react";
import { IconClose } from "./icons";

/**
 * Lightweight toast: fixed to the bottom-right, auto-dismisses,
 * closes on click of the × button.
 */
export function Toast({
  show,
  onClose,
  duration = 8000,
  tone = "info",
  children,
}: {
  show: boolean;
  onClose: () => void;
  duration?: number;
  tone?: "info" | "warning" | "success";
  children: ReactNode;
}) {
  useEffect(() => {
    if (!show) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [show, onClose, duration]);

  if (!show) return null;

  const tones = {
    info: "border-line bg-surface text-body",
    warning: "border-amber-500/40 bg-amber-500/10 text-body",
    success: "border-green-500/40 bg-green-500/10 text-body",
  } as const;

  return (
    <div
      role="status"
      className="fixed bottom-4 right-4 left-4 z-50 sm:left-auto sm:max-w-sm"
    >
      <div
        className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)] backdrop-blur ${tones[tone]}`}
      >
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="shrink-0 rounded-md p-0.5 text-muted transition-colors hover:text-heading"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
