import * as React from "react";
import { attachPlayer } from "@/lib/music";

const ARTIST = { name: "Mac Quayle", url: "https://soundcloud.com/macquayle-music" };
const TRACK = { name: "2.7_1-init_5.fve", url: "https://soundcloud.com/macquayle-music/2-7_1-init_5-fve" };

const SRC =
  "https://w.soundcloud.com/player/?" +
  new URLSearchParams({
    url: "https://api.soundcloud.com/tracks/soundcloud%3Atracks%3A1254243223",
    color: "#000000",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "true",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });

// Facade: SoundCloud iframe + Widget API load only on click, not at page
// open. The placeholder is the same 20px height as the real player so
// there is zero layout shift when loaded.
export function MusicPlayer() {
  const frame = React.useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => { if (loaded) attachPlayer(frame.current!); }, [loaded]);

  return (
    <div id="music" className="scroll-mt-6">
      {loaded ? (
        <iframe
          ref={frame}
          title={`SoundCloud · ${ARTIST.name} · ${TRACK.name}`}
          src={SRC}
          height={20}
          scrolling="no"
          allow="autoplay; encrypted-media"
          className="block w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="flex h-5 w-full items-center gap-2 rounded text-start text-xs text-muted-foreground hover:text-foreground"
        >
          <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
          <span dir="ltr" className="truncate">
            {ARTIST.name} · <span className="font-mono">{TRACK.name}</span>
          </span>
        </button>
      )}
      <p className="mt-1.5 truncate text-xs">
        <span dir="ltr">
          <a href={ARTIST.url} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-foreground">
            {ARTIST.name}
          </a>
          {" · "}
          <a href={TRACK.url} target="_blank" rel="noopener noreferrer" className="no-underline hover:text-foreground">
            {TRACK.name}
          </a>
        </span>
      </p>
    </div>
  );
}