import * as React from "react";
import { IconVolumeCross, IconVolumeLoud } from "@devigner-ui/icons";
import { useApp } from "@/lib/app";
import { ui } from "@/lib/strings";

const SRC = `${import.meta.env.BASE_URL}audio/ambient.mp3`;
const KEY = "sound";
const VOLUME = 0.35;
const FADE_MS = 600;

// Background music, off by default. Browsers block autoplay, so a saved "on"
// waits for the visitor's first click or key press before it starts.
export function SoundToggle() {
  const { lang } = useApp();
  const s = ui[lang];
  const audio = React.useRef<HTMLAudioElement | null>(null);
  const fade = React.useRef(0);
  const [on, setOn] = React.useState(() => localStorage.getItem(KEY) === "on");
  const [playing, setPlaying] = React.useState(false);

  const getAudio = () => {
    if (!audio.current) {
      const a = new Audio(SRC);
      a.loop = true;
      a.volume = 0;
      audio.current = a;
    }
    return audio.current;
  };

  const ramp = React.useCallback((to: number, done?: () => void) => {
    const a = getAudio();
    cancelAnimationFrame(fade.current);
    const from = a.volume;
    const start = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / FADE_MS);
      a.volume = from + (to - from) * k;
      if (k < 1) fade.current = requestAnimationFrame(step);
      else done?.();
    };
    fade.current = requestAnimationFrame(step);
  }, []);

  const play = React.useCallback(() => {
    const a = getAudio();
    a.play().then(
      () => {
        setPlaying(true);
        ramp(VOLUME);
      },
      () => setPlaying(false),
    );
  }, [ramp]);

  const pause = React.useCallback(() => {
    setPlaying(false);
    ramp(0, () => audio.current?.pause());
  }, [ramp]);

  // Saved "on": start with the first interaction anywhere on the page.
  React.useEffect(() => {
    if (!on || playing) return;
    const start = () => play();
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
  }, [on, playing, play]);

  // Quiet while the tab is hidden.
  React.useEffect(() => {
    const onVis = () => {
      if (!on) return;
      if (document.hidden) audio.current?.pause();
      else if (playing) audio.current?.play().catch(() => setPlaying(false));
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [on, playing]);

  React.useEffect(
    () => () => {
      cancelAnimationFrame(fade.current);
      audio.current?.pause();
    },
    [],
  );

  const toggle = (e: React.MouseEvent) => {
    // The page-wide "first interaction" listener must not undo this click.
    e.nativeEvent.stopImmediatePropagation();
    const next = !playing;
    setOn(next);
    localStorage.setItem(KEY, next ? "on" : "off");
    if (next) play();
    else pause();
  };

  const label = playing ? s.soundOff : s.soundOn;

  return (
    <button
      type="button"
      onPointerDown={(e) => e.nativeEvent.stopImmediatePropagation()}
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
