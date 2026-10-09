import katex from "katex";
import "katex/dist/katex.min.css";

/** TeX is always left-to-right, even inside Persian text. */
export function Tex({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    output: "html",
  });
  const Tag = display ? "div" : "span";
  return (
    <Tag
      className={display ? "eq my-5" : undefined}
      dir="ltr"
      style={display ? undefined : { unicodeBidi: "isolate", display: "inline-block" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
