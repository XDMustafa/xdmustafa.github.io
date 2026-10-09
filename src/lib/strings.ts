import type { Lang } from "./app";

type Sec = "home" | "writing" | "projects" | "about";

export const ui: Record<
  Lang,
  {
    brand: string; nav: string; langLabel: string; themeLabel: string;
    light: string; dark: string; footer: string; sections: Record<Sec, string>;
    hello: string; role: string; bio: string; writing: string; projects: string;
    about: string; aboutBody: string; links: string; back: string; read: string;
    copy: string; copied: string; cite: string; refTitle: string;
  }
> = {
  fa: {
    brand: "س. مصطفی",
    nav: "ناوبری",
    langLabel: "زبان",
    themeLabel: "تم",
    light: "روشن",
    dark: "تاریک",
    footer: "ساخته‌شده با React · میزبانی روی GitHub Pages",
    sections: { home: "خانه", writing: "نوشته‌ها", projects: "پروژه‌ها", about: "درباره" },
    hello: "س. مصطفی",
    role: "دانشجوی فیزیک · فیزیک محاسباتی",
    bio: "یادداشت‌ها و پروژه‌های فیزیک محاسباتی‌ام را اینجا می‌نویسم: از حل عددی مسائل کتاب‌های درسی تا بازتولید مقاله‌ها با کد. تمرکزم روی مدل‌سازی مفاهیم فیزیک، شبیه‌سازی و شبکه‌های عصبی مبتنی بر فیزیک (PINNs) است.",
    writing: "نوشته‌ها",
    projects: "پروژه‌ها",
    about: "درباره",
    aboutBody:
      "دانشجوی کارشناسی فیزیک. با پایتون و ژوپیتر مسائل فیزیک را شبیه‌سازی می‌کنم و کنار آن طراحی می‌کنم: پوستر و لوگوی فیزیکی و رابط کاربری در Dribbble.",
    links: "پیوندها",
    back: "بازگشت",
    read: "خواندن",
    copy: "کپی",
    copied: "کپی شد",
    cite: "ارجاع به مقاله‌ی اصلی",
    refTitle: "مرجع",
  },
  en: {
    brand: "S. Mustafa",
    nav: "Navigation",
    langLabel: "Language",
    themeLabel: "Theme",
    light: "Light",
    dark: "Dark",
    footer: "Built with React · hosted on GitHub Pages",
    sections: { home: "Home", writing: "Writing", projects: "Projects", about: "About" },
    hello: "S. Mustafa",
    role: "Physics student · computational physics",
    bio: "Notes and projects in computational physics: numerical solutions to textbook problems, and papers reproduced in code. I care about modelling physical ideas, simulation, and physics-informed neural networks (PINNs).",
    writing: "Writing",
    projects: "Projects",
    about: "About",
    aboutBody:
      "Undergraduate physics student. I simulate physics problems in Python and Jupyter, and I design on the side: physics-themed posters, logos and UI on Dribbble.",
    links: "Links",
    back: "Back",
    read: "Read",
    copy: "Copy",
    copied: "Copied",
    cite: "Cite the original paper",
    refTitle: "Reference",
  },
};
