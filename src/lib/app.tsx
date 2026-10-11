import * as React from "react";

export type Lang = "fa" | "en";
export type Theme = "light" | "dark";

interface AppState {
  lang: Lang;
  theme: Theme;
  setLang: (l: Lang) => void;
  setTheme: (t: Theme) => void;
}

const Ctx = React.createContext<AppState | null>(null);

/** Reads what the inline script in index.html already put on <html>. */
const initial = () => {
  const d = document.documentElement;
  return {
    lang: (d.lang === "en" ? "en" : "fa") as Lang,
    theme: (d.dataset.theme === "dark" ? "dark" : "light") as Theme,
  };
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, set] = React.useState(initial);

  const setLang = React.useCallback((lang: Lang) => {
    const d = document.documentElement;
    d.lang = lang;
    d.dir = lang === "fa" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
    document.title = lang === "fa" ? "مصطفی" : "S. Mustafa";
    set((s) => ({ ...s, lang }));
  }, []);

  const setTheme = React.useCallback((theme: Theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    set((s) => ({ ...s, theme }));
  }, []);

  const value = React.useMemo(
    () => ({ ...state, setLang, setTheme }),
    [state, setLang, setTheme],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const v = React.useContext(Ctx);
  if (!v) throw new Error("useApp outside AppProvider");
  return v;
}

/** Picks the string for the current language. */
export function useT() {
  const { lang } = useApp();
  return <T,>(pair: { fa: T; en: T }) => pair[lang];
}

/** Hash routing: works on GitHub Pages without a 404 fallback. */
export function useRoute(): string[] {
  const read = () => location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const [route, setRoute] = React.useState(read);
  React.useEffect(() => {
    const on = () => setRoute(read());
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return route;
}

export const fmt = (n: number | string, lang: Lang) =>
  lang === "fa"
    ? String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]).replace(".", "٫")
    : String(n);
