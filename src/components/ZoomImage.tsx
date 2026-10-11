import * as React from "react";
import { cn } from "cn";
import { IconClose, IconSearchZoomIn } from "@devigner-ui/icons";
import { useApp } from "@/lib/app";
import { ui } from "@/lib/strings";

// A post image that opens full size in a modal <dialog>: the browser handles
// Escape, focus and the top layer; the blur lives on ::backdrop (index.css).
export function ZoomImage({ src, alt = "", className }: { src: string; alt?: string; className?: string }) {
  const { lang } = useApp();
  const s = ui[lang];
  const dialog = React.useRef<HTMLDialogElement>(null);

  const open = () => {
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={s.zoom}
        className={cn(
          "group relative mx-auto block cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
          className,
        )}
      >
        <img src={src} alt={alt} loading="lazy" className="w-full rounded-lg border border-border bg-white" />
        <span className="glass absolute end-2 top-2 grid size-8 place-items-center rounded-full text-foreground opacity-80 transition-opacity group-hover:opacity-100">
          <IconSearchZoomIn className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialog}
        onClose={() => (document.documentElement.style.overflow = "")}
        onClick={close}
        aria-label={s.zoom}
        className="zoom-dialog m-0 size-full max-h-none max-w-none cursor-zoom-out bg-transparent p-0"
      >
        <div className="grid size-full place-items-center p-4">
          <img src={src} alt={alt} className="zoom-image max-h-[90dvh] max-w-full rounded-lg bg-white object-contain" />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label={s.close}
          className="glass fixed end-4 top-4 grid size-10 cursor-pointer place-items-center rounded-full text-foreground"
        >
          <IconClose className="size-5" />
        </button>
      </dialog>
    </>
  );
}
