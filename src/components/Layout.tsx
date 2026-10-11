import * as React from "react";
import { IconFolder, IconHome, IconPen, IconUser } from "@devigner-ui/icons";
import { MenuDock } from "@/components/ui/menu-dock";
import { GooSwitch } from "@/components/ui/goo-switch";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SoundToggle } from "@/components/SoundToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useApp, useRoute } from "@/lib/app";
import { ui } from "@/lib/strings";

export const SECTIONS = ["home", "writing", "projects", "about"] as const;

const ICONS = {
  home: <IconHome />,
  writing: <IconPen />,
  projects: <IconFolder />,
  about: <IconUser />,
};

export function goTo(id: string) {
  const scroll = () =>
    id === "home"
      ? window.scrollTo({ top: 0, behavior: "smooth" })
      : document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  if (location.hash.replace(/^#\/?/, "") !== "") {
    location.hash = "#/";
    setTimeout(scroll, 60);
  } else scroll();
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang } = useApp();
  const route = useRoute();
  const s = ui[lang];
  const [active, setActive] = React.useState("home");
  const onPost = route[0] === "post";

  // The dock stays on screen while scrolling, so it follows the section in view.
  React.useEffect(() => {
    if (onPost) return;
    const spy = () => {
      const line = window.innerHeight * 0.4;
      let current: string = "home";
      for (const id of SECTIONS.slice(1)) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2)
        current = SECTIONS[SECTIONS.length - 1];
      setActive(current);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [onPost]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-5 pb-20">
      <header className="ui flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-5">
        <a href="#/" className="text-lg font-semibold no-underline">
          {s.brand}
        </a>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <label dir="ltr" className="flex items-center gap-2">
            <span>FA</span>
            <GooSwitch
              size="sm"
              aria-label={s.langLabel}
              checked={lang === "en"}
              onCheckedChange={(on) => setLang(on ? "en" : "fa")}
            />
            <span>EN</span>
          </label>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 pb-16">{children}</main>

      <footer className="ui border-t border-border py-6 text-sm text-muted-foreground">
        <MusicPlayer />
        <div className="mt-5 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} S. Mustafa</span>
          <span>{s.footer}</span>
        </div>
      </footer>

      <MenuDock
        floating
        label={s.nav}
        active={onPost ? undefined : active}
        classNames={{ shell: "glass" }}
        items={SECTIONS.map((id) => ({
          id,
          label: s.sections[id],
          icon: ICONS[id],
          showLabel: !onPost && id === active,
          onSelect: () => {
            setActive(id);
            goTo(id);
          },
        }))}
      />
      <SoundToggle />
    </div>
  );
}
