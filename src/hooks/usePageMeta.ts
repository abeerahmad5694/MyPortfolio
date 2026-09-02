import { useEffect } from "react";

/**
 * Sets the document title and meta description for the current page.
 * The defaults in index.html are used as a fallback for routes that
 * don't call this hook.
 */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;

    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }

    return () => {
      document.title = "Abeer Ahmad | Full-Stack Developer";
    };
  }, [title, description]);
}
