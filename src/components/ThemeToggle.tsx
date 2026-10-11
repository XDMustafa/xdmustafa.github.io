import * as React from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionPreference } from "devignerui/hooks";
import { IconMoon, IconSun } from "@devigner-ui/icons";
import { useApp } from "@/lib/app";
import { ui } from "@/lib/strings";

// Moon in light, sun in dark. The new theme is revealed as a circle growing
// from the button (View Transitions); without support it switches at once.
export function ThemeToggle() {
  const { lang, theme, setTheme } = useApp();
  const s = ui[lang];
  const reduced = useReducedMotionPreference();
  const next = theme === "dark" ? "light" : "dark";

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !document.startViewTransition) return setTheme(next);

    // Keyboard clicks have no pointer position: grow from the button's centre.
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.detail === 0 ? r.left + r.width / 2 : e.clientX;
    const y = e.detail === 0 ? r.top + r.height / 2 : e.clientY;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(() => setTheme(next)));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.22, 1, .36, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`${s.themeLabel}: ${next === "dark" ? s.dark : s.light}`}
      title={next === "dark" ? s.dark : s.light}
      className="glass grid size-9 cursor-pointer place-items-center overflow-hidden rounded-full text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
        >
          {theme === "dark" ? <IconSun className="size-[18px]" /> : <IconMoon className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
