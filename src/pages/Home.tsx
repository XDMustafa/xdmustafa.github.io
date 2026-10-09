import { Badge } from "@/components/ui/badge";
import { useApp, useT } from "@/lib/app";
import { ui } from "@/lib/strings";
import { LINKS, POSTS, PROJECTS } from "@/content/posts";

const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-6 pt-14">
    <h2 className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>
    {children}
  </section>
);

export function Home() {
  const { lang } = useApp();
  const t = useT();
  const s = ui[lang];

  return (
    <>
      <section className="pt-10">
        <h1 className="text-5xl font-bold tracking-tight">{s.hello}</h1>
        <p className="ui mt-3 text-muted-foreground">{s.role}</p>
        <p className="mt-6 max-w-prose">{s.bio}</p>
      </section>

      <Section id="writing" title={s.writing}>
        <ul className="divide-y divide-border border-y border-border">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <a href={`#/post/${p.slug}`} className="group block py-5 no-underline">
                <div className="ui mb-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>{t(p.date)}</span>
                  {t(p.tags).map((tag) => (
                    <Badge key={tag} size="sm">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold group-hover:underline">{t(p.title)}</h3>
                <p className="mt-1 text-muted-foreground">{t(p.summary)}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="projects" title={s.projects}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <li key={p.name}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-xl border border-border bg-card p-4 no-underline transition-colors hover:border-foreground"
              >
                <div dir="ltr" className="ui text-start font-semibold break-all">{p.name}</div>
                <p className="mt-1 text-[0.95em] text-muted-foreground">{t(p.desc)}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="about" title={s.about}>
        <p className="max-w-prose">{s.aboutBody}</p>
        <div className="ui mt-6 flex flex-wrap gap-2">
          {LINKS.map((l) => (
            <Badge key={l.label} size="lg" href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label}
            </Badge>
          ))}
        </div>
      </Section>
    </>
  );
}
