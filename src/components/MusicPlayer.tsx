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

// The official SoundCloud embed, kept visible with its credit line as
// SoundCloud's terms require. The corner SoundToggle controls it.
export function MusicPlayer() {
  const frame = React.useRef<HTMLIFrameElement>(null);
  React.useEffect(() => attachPlayer(frame.current!), []);

  return (
    <div id="music" className="scroll-mt-6">
      <iframe
        ref={frame}
        title={`SoundCloud · ${ARTIST.name} · ${TRACK.name}`}
        src={SRC}
        height={20}
        scrolling="no"
        allow="autoplay; encrypted-media"
        className="block w-full border-0"
      />
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
