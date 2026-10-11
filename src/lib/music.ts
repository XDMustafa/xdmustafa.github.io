import * as React from "react";

// Background music is the official SoundCloud player in the footer (visible,
// with its own credit), driven through SoundCloud's Widget API so the corner
// sound button can play and pause it. No audio file is hosted on the site.

const API = "https://w.soundcloud.com/player/api.js";

interface SCWidget {
  play(): void;
  pause(): void;
  seekTo(ms: number): void;
  setVolume(volume: number): void;
  bind(event: string, cb: () => void): void;
  unbind(event: string): void;
}

declare global {
  interface Window {
    SC?: {
      Widget: ((iframe: HTMLIFrameElement) => SCWidget) & {
        Events: Record<"READY" | "PLAY" | "PAUSE" | "FINISH", string>;
      };
    };
  }
}

let apiPromise: Promise<void> | null = null;
const loadApi = () =>
  window.SC
    ? Promise.resolve()
    : (apiPromise ??= new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = API;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
          apiPromise = null;
          reject();
        };
        document.head.appendChild(script);
      }));

type State = { ready: boolean; playing: boolean };
let state: State = { ready: false, playing: false };
let widget: SCWidget | null = null;
const listeners = new Set<() => void>();
const update = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

/** Connects the footer iframe; returns the cleanup. */
export function attachPlayer(iframe: HTMLIFrameElement) {
  let cancelled = false;
  let bound: SCWidget | null = null;
  loadApi()
    .then(() => {
      if (cancelled || !window.SC) return;
      const w = window.SC.Widget(iframe);
      const E = window.SC.Widget.Events;
      bound = w;
      w.bind(E.READY, () => {
        widget = w;
        w.setVolume(40);
        update({ ready: true });
      });
      w.bind(E.PLAY, () => update({ playing: true }));
      w.bind(E.PAUSE, () => update({ playing: false }));
      // The player has no loop option: start over when the track ends.
      w.bind(E.FINISH, () => {
        w.seekTo(0);
        w.play();
      });
    })
    // SoundCloud unreachable (blocked network, offline): the button stays a
    // shortcut to the footer player.
    .catch(() => {});

  return () => {
    cancelled = true;
    if (bound && window.SC) for (const e of Object.values(window.SC.Widget.Events)) bound.unbind(e);
    widget = null;
    update({ ready: false, playing: false });
  };
}

/** Plays or pauses; false when the player is not ready yet. */
export function toggleMusic() {
  if (!widget) return false;
  if (state.playing) widget.pause();
  else widget.play();
  return true;
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useMusic() {
  return React.useSyncExternalStore(subscribe, () => state);
}
