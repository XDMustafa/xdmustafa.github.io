import type { ComponentType } from "react";
import type { Lang } from "@/lib/app";
import { BlackbodyEn, BlackbodyFa } from "./blackbody";

type L<T> = Record<Lang, T>;

export interface Post {
  slug: string;
  title: L<string>;
  summary: L<string>;
  date: L<string>;
  tags: L<string[]>;
  Body: L<ComponentType>;
}

export const POSTS: Post[] = [
  {
    slug: "blackbody",
    title: {
      fa: "پژوهش دقیق بر روی نظریه تابش حرارتی جسم سیاه",
      en: "Exact research on the theory of blackbody thermal radiation",
    },
    summary: {
      fa: "بازنویسی مقاله‌ی Yang و Wei به فارسی، همراه با تأیید عددی جدول‌ها و معادله‌ها با پایتون.",
      en: "A numerical-analysis exercise on Yang & Wei (2016): Wien's constant four ways, inflection points, and the normalized spectrum.",
    },
    date: { fa: "مهر ۱۴۰۴", en: "Oct 2025" },
    tags: { fa: ["فیزیک محاسباتی", "پایتون"], en: ["Computational physics", "Python"] },
    Body: { fa: BlackbodyFa, en: BlackbodyEn },
  },
];

export const PROJECTS = [
  {
    name: "Electromagnetic-Milford-Solution",
    url: "https://github.com/XDMustafa/Electromagnetic-Milford-Solution",
    desc: {
      fa: "حل مسائل و مدل‌سازی مفاهیم کتاب الکترومغناطیس میلفورد با برنامه‌نویسی.",
      en: "Problems and concepts from Milford's electromagnetics text, solved and modelled in code.",
    },
  },
  {
    name: "Simulation-Solved-Physics-Halliday",
    url: "https://github.com/XDMustafa/Simulation-Solved-Physics-Halliday",
    desc: {
      fa: "حل مسائل فیزیک هالیدی با شبیه‌سازی.",
      en: "Halliday physics problems solved with simulation.",
    },
  },
  {
    name: "simulation-physics-exercises",
    url: "https://github.com/XDMustafa/simulation-physics-exercises",
    desc: {
      fa: "تمرین‌های فیزیک با شبیه‌سازی.",
      en: "Physics exercises done through simulation.",
    },
  },
  {
    name: "bbb-downloader-GUI",
    url: "https://github.com/XDMustafa/bbb-downloader-GUI",
    desc: {
      fa: "ابزار رابط گرافیکی برای دانلود جلسه‌های BigBlueButton.",
      en: "A GUI tool for downloading BigBlueButton sessions.",
    },
  },
];

export const LINKS = [
  { label: "GitHub", url: "https://github.com/XDMustafa" },
  { label: "Dribbble", url: "https://dribbble.com/SMustafa12" },
  { label: "Telegram", url: "https://t.me/mathphypy" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/mustafa-m-5b73991a3/" },
];
