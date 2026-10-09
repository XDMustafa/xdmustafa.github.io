import * as React from "react";
import { NavNotch } from "@/components/ui/nav-notch";
import { GooSwitch } from "@/components/ui/goo-switch";
import { useApp, useRoute } from "@/lib/app";
import { ui } from "@/lib/strings";

export const SECTIONS = ["home", "writing", "projects", "about"] as const;

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
  const { lang, setLang, theme, setTheme } = useApp();
  const route = useRoute();
  const s = ui[lang];
  const [active, setActive] = React.useState("home");
  const onPost = route[0] === "post";

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-5">
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
          <label dir="ltr" className="flex items-center gap-2">
            <span>{s.light}</span>
            <GooSwitch
              size="sm"
              aria-label={s.themeLabel}
              checked={theme === "dark"}
              onCheckedChange={(on) => setTheme(on ? "dark" : "light")}
            />
            <span>{s.dark}</span>
          </label>
        </div>
        {!onPost && (
          <div className="flex w-full justify-center overflow-x-auto" dir="ltr">
            <NavNotch
              label={s.nav}
              items={SECTIONS.map((id) => ({ id, label: s.sections[id] }))}
              value={active}
              onValueChange={(id) => {
                setActive(id);
                goTo(id);
              }}
            />
          </div>
        )}
      </header>

      <main className="flex-1 pb-16">{children}</main>

      <footer className="ui flex flex-wrap justify-between gap-2 border-t border-border py-6 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} S. Mustafa</span>
        <span>{s.footer}</span>
      </footer>
    </div>
  );
}
