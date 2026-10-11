import { IconVolumeCross, IconVolumeLoud } from "@devigner-ui/icons";
import { useApp } from "@/lib/app";
import { toggleMusic, useMusic } from "@/lib/music";
import { ui } from "@/lib/strings";

// Corner remote for the SoundCloud player in the footer. Until the player is
// ready (or if SoundCloud is unreachable) a click scrolls down to it instead.
export function SoundToggle() {
  const { lang } = useApp();
  const s = ui[lang];
  const { playing } = useMusic();

  const toggle = () => {
    if (!toggleMusic())
      document.getElementById("music")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const label = playing ? s.soundOff : s.soundOn;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={playing}
      title={label}
      className="glass fixed end-5 bottom-7 z-50 max-sm:bottom-24 grid size-10 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {playing ? (
        <IconVolumeLoud className="size-[18px]" />
      ) : (
        <IconVolumeCross className="size-[18px]" />
      )}
    </button>
  );
}
