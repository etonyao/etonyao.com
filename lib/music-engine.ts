import type { Track } from "@/app/data/music";
import { VIDEO_PLAY_EVENT } from "@/lib/media-events";

/**
 * The site's single audio player, kept at module level (not inside a React component) so it keeps playing
 * while visitors click between pages. UI components read it with useSyncExternalStore.
 */
export interface MusicState {
  index: number;
  playing: boolean;
  current: number;
  duration: number;
  volume: number;
}

const LAST_KEY = "music:last-track";
const SERVER_STATE: MusicState = { index: 0, playing: false, current: 0, duration: 0, volume: 0.5 };

let state = SERVER_STATE;
let tracks: Track[] = [];
let audio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();

function set(patch: Partial<MusicState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export const getSnapshot = () => state;
export const getServerSnapshot = () => SERVER_STATE;

function pickStart(count: number) {
  if (count < 2) return 0;
  let last = -1;
  try {
    last = Number(localStorage.getItem(LAST_KEY) ?? -1);
  } catch {}
  let n = last;
  while (n === last) n = Math.floor(Math.random() * count);
  try {
    localStorage.setItem(LAST_KEY, String(n));
  } catch {}
  return n;
}

// Browsers usually block sound before the visitor interacts. If autoplay is refused, start the track on
// their first click, tap or key press anywhere on the page (except the player's own controls).
let disarm: (() => void) | null = null;
function armFirstGesture() {
  if (disarm) return;
  const events = ["pointerdown", "pointerup", "keydown"] as const;
  const start = (e: Event) => {
    if (e.target instanceof Element && e.target.closest("[data-music-player]")) return;
    if (audio?.paused) void audio.play().catch(() => {});
    disarm?.();
  };
  events.forEach((ev) => window.addEventListener(ev, start));
  disarm = () => {
    events.forEach((ev) => window.removeEventListener(ev, start));
    disarm = null;
  };
}

/** Safe to call from any number of components; only the first call sets things up. Client only. */
export function initMusic(list: Track[]) {
  if (audio || typeof window === "undefined" || list.length === 0) return;
  tracks = list;
  const el = (audio = new Audio());
  el.preload = "none";
  el.volume = state.volume;
  const start = pickStart(list.length);
  el.src = list[start].src;
  set({ index: start });

  el.addEventListener("play", () => {
    set({ playing: true });
    disarm?.();
  });
  el.addEventListener("pause", () => set({ playing: false }));
  el.addEventListener("ended", () => shuffle());
  el.addEventListener("timeupdate", () => set({ current: el.currentTime, duration: el.duration || 0 }));
  el.addEventListener("loadedmetadata", () => set({ duration: el.duration || 0 }));
  window.addEventListener(VIDEO_PLAY_EVENT, () => el.pause()); // pause whenever a video starts

  void el.play().catch(armFirstGesture);
}

function go(next: number, autoplay: boolean) {
  if (!audio) return;
  audio.src = tracks[next].src;
  set({ index: next, current: 0, duration: 0 });
  if (autoplay) void audio.play().catch(() => {});
}

export function toggle() {
  if (!audio) return;
  if (audio.paused) void audio.play().catch(() => {});
  else audio.pause();
}
export function shuffle() {
  if (tracks.length < 2) return;
  let n = state.index;
  while (n === state.index) n = Math.floor(Math.random() * tracks.length);
  go(n, true);
}
export const next = () => go((state.index + 1) % tracks.length, state.playing);
export const prev = () => go((state.index - 1 + tracks.length) % tracks.length, state.playing);
export function seek(to: number) {
  if (audio) audio.currentTime = to;
}
export function setVolume(volume: number) {
  if (audio) audio.volume = volume;
  set({ volume });
}
