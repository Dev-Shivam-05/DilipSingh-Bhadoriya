"use client";

import { useEffect, useState } from "react";

/** Thin gold reading-progress bar pinned under the header on guide pages. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - innerHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-50 h-1 w-full bg-transparent" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-gold-500 to-saffron-500 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
