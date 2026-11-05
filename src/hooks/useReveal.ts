import { useEffect, type RefObject } from "react";
import { useLocation } from "react-router-dom";

const PENDING = ".lines:not(.is-in), .rise:not(.is-in)";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Brings in every .lines title and .rise block as it enters the screen, once.
 * Mounted once in App: it scans again after each page change and whenever new
 * content arrives (CMS data, a filter, a form state), at most once a frame.
 */
export function useRevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduce = reducedMotion();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    let frame = 0;
    const scan = () => {
      frame = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      document.querySelectorAll(PENDING).forEach((el) => {
        if (reduce) {
          el.classList.add("is-in");
          return;
        }
        // already on screen, down to its lowest strip (the hero's last line):
        // it comes in now instead of waiting for a scroll
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.top < vh && r.bottom > 0 && r.left < vw && r.right > 0) el.classList.add("is-in");
        else io.observe(el);
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(scan);
    };

    scan();
    const mo = new MutationObserver(queue);
    mo.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);
}

type Progress = "leave" | "pass" | "sticky";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * Writes the element's scroll progress into its --p custom property, once a
 * frame while it is on screen, for the CSS to move things with the scroll.
 *  - "leave":  0 while the element's top is at the screen's top, 1 once it has scrolled out
 *  - "pass":   0 as it enters from below, 1 as it leaves at the top
 *  - "sticky": 0 when its top reaches the screen's top, 1 when its bottom reaches the bottom
 */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T>, mode: Progress = "pass") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.setProperty("--p", mode === "pass" ? "0.5" : "0");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh * 0.25 || r.top > vh * 1.25) return; // off screen: nothing to move
      const p =
        mode === "leave"
          ? -r.top / Math.max(1, r.height)
          : mode === "sticky"
            ? -r.top / Math.max(1, r.height - vh)
            : (vh - r.top) / (vh + r.height);
      el.style.setProperty("--p", clamp01(p).toFixed(4));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      cancelAnimationFrame(frame);
    };
  }, [ref, mode]);
}
