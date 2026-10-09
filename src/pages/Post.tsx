import { Badge } from "@/components/ui/badge";
import { useApp, useT } from "@/lib/app";
import { ui } from "@/lib/strings";
import { POSTS } from "@/content/posts";

export function PostPage({ slug }: { slug: string }) {
  const { lang } = useApp();
  const t = useT();
  const s = ui[lang];
  const post = POSTS.find((p) => p.slug === slug);

  if (!post)
    return (
      <p className="py-10">
        <a href="#/">{s.back}</a>
      </p>
    );

  const Body = post.Body[lang];
  return (
    <article className="pt-4">
      <a href="#/" className="ui text-sm text-muted-foreground">
        {lang === "fa" ? "→" : "←"} {s.back}
      </a>
      <div className="ui mt-6 mb-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{t(post.date)}</span>
        {t(post.tags).map((tag) => (
          <Badge key={tag} size="sm">{tag}</Badge>
        ))}
      </div>
      <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{t(post.title)}</h1>
      <div className="mt-6">
        <Body />
      </div>
    </article>
  );
}
