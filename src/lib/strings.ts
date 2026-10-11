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
    readMore: string; soundOn: string; soundOff: string; zoom: string; close: string;
  }
> = {
  fa: {
    brand: "مصطفی",
    nav: "ناوبری",
    langLabel: "زبان",
    themeLabel: "تم",
    light: "روشن",
    dark: "تاریک",
    footer: "ساخته‌شده با React · میزبانی روی GitHub Pages. تولید شده با Claude",
    sections: { home: "خانه", writing: "نوشته‌ها", projects: "پروژه‌ها", about: "درباره" },
    hello: "مصطفی",
    role: "دانشجوی فیزیک مهندسی",
    bio: "سلام من مصطفی نامی هستم که فعلا دانشجوی فیزیک مهندسی کارشناسی هستم. از حل عددی مسائل کتاب‌های درسی تا بازتولید مقاله‌ها با کد. تمرکزم روی مدل‌سازی مفاهیم فیزیک، شبیه‌سازی و شبکه‌های عصبی مبتنی بر فیزیک (PINNs) است. سعی میکنم تعامل بین فیزیک و AI رو بیشتر کنم برای خودم.",
    writing: "نوشته‌ها",
    projects: "پروژه‌ها",
    about: "درباره",
    aboutBody:
      "در کنار کار اصلیم یک طراح UI/UX تازه به دوران رسیده هستم. در طراحی پوستر نیز کمی دستی دارم.",
    links: "پیوندها",
    back: "بازگشت",
    read: "خواندن",
    copy: "کپی",
    copied: "کپی شد",
    cite: "ارجاع به مقاله‌ی اصلی",
    refTitle: "مرجع",
    readMore: "ادامه‌ی مطلب",
    soundOn: "پخش موسیقی",
    soundOff: "قطع موسیقی",
    zoom: "بزرگ‌نمایی تصویر",
    close: "بستن",
  },
  en: {
    brand: "Mustafa",
    nav: "Navigation",
    langLabel: "Language",
    themeLabel: "Theme",
    light: "Light",
    dark: "Dark",
    footer: "Built with React · hosted on GitHub Pages. Generated with Claude",
    sections: { home: "Home", writing: "Writing", projects: "Projects", about: "About" },
    hello: "S. Mustafa",
    role: "Engineering physics student",
    bio: "Hi, I'm Mustafa, currently an undergraduate engineering physics student. From solving textbook problems numerically to reproducing papers in code. My focus is on modelling physics concepts, simulation, and physics-informed neural networks (PINNs). I'm trying to bring physics and AI closer together in my own work.",
    writing: "Writing",
    projects: "Projects",
    about: "About",
    aboutBody:
      "Alongside my main work, I'm a newly minted UI/UX designer. I also have some skill in poster design.",
    links: "Links",
    back: "Back",
    read: "Read",
    copy: "Copy",
    copied: "Copied",
    cite: "Cite the original paper",
    refTitle: "Reference",
    readMore: "READ MORE",
    soundOn: "Play music",
    soundOff: "Mute music",
    zoom: "Zoom image",
    close: "Close",
  },
};
