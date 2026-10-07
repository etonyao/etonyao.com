"use client";

import { MusicIcon, PauseIcon, Volume2Icon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Track } from "@/app/data/music";
import { VIDEO_PLAY_EVENT } from "@/components/video-embed";
import { Button } from "@/components/ui/button";
import { Window } from "@/components/window";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

const LAST_KEY = "music:last-track";

/** A shuffle-able player for a short list of favorite tracks. Opens on a random track and tries to autoplay it. */
function MusicPlayerInner({ tracks }: { tracks: Track[] }) {
  const audio = useRef<HTMLAudioElement>(null);
  // Opens on a random track, never the one from the last visit. (Client-only render, so no hydration mismatch.)
  const [index, setIndex] = useState(() => {
    if (tracks.length < 2) return 0;
    let last = -1;
    try {
      last = Number(localStorage.getItem(LAST_KEY) ?? -1);
    } catch {}
    let n = last;
    while (n === last) n = Math.floor(Math.random() * tracks.length);
    try {
      localStorage.setItem(LAST_KEY, String(n));
    } catch {}
    return n;
  });
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ current: 0, duration: 0 });
  const [volume, setVolume] = useState(1);
  // Try to autoplay on load. Browsers usually block sound before the visitor interacts, so if that fails
  // the track starts on their first click, tap or key press anywhere on the page instead.
  const playAfterSwitch = useRef(true);

  const armedCleanup = useRef<(() => void) | null>(null);
  function armFirstGesture() {
    if (armedCleanup.current) return;
    const events = ["pointerdown", "pointerup", "keydown"] as const;
    const start = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("[data-music-player]")) return; // the player's own buttons act on their own
      const el = audio.current;
      if (el?.paused) void el.play().catch(() => {});
      disarm();
    };
    const disarm = () => {
      events.forEach((ev) => window.removeEventListener(ev, start));
      armedCleanup.current = null;
    };
    events.forEach((ev) => window.addEventListener(ev, start));
    armedCleanup.current = disarm;
  }
  useEffect(() => () => armedCleanup.current?.(), []);

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
  }, [volume]);

  // Pause the music whenever a video on the page starts playing.
  useEffect(() => {
    const pause = () => audio.current?.pause();
    window.addEventListener(VIDEO_PLAY_EVENT, pause);
    return () => window.removeEventListener(VIDEO_PLAY_EVENT, pause);
  }, []);
  const track = tracks[index];

  // React swaps the <audio> src on re-render, which would cancel a play() started before it. So `go` only
  // records the intent, and this effect starts playback once the new src is in place.
  useEffect(() => {
    if (!playAfterSwitch.current) return;
    playAfterSwitch.current = false;
    void audio.current?.play().catch(() => {
      setPlaying(false);
      armFirstGesture();
    });
  }, [index]);

  if (!track) return null;

  // Switching track: play the new one if we were already playing (or the visitor hit Shuffle).
  function go(next: number, autoplay = true) {
    playAfterSwitch.current = autoplay;
    setIndex(next);
    setTime({ current: 0, duration: 0 });
  }
  function randomOther() {
    if (tracks.length < 2) return index;
    let n = index;
    while (n === index) n = Math.floor(Math.random() * tracks.length);
    return n;
  }
  function toggle() {
    const el = audio.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setPlaying(false));
    else el.pause();
  }

  return (
    <div data-music-player>
    <Window title="now-playing.mp3" bodyClassName="p-0">
      <audio
        ref={audio}
        src={track.src}
        preload="none"
        onPlay={() => {
          setPlaying(true);
          armedCleanup.current?.();
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => go(randomOther())}
        onTimeUpdate={(e) => setTime({ current: e.currentTarget.currentTime, duration: e.currentTarget.duration || 0 })}
        onLoadedMetadata={(e) => {
          const duration = e.currentTarget.duration || 0;
          setTime((t) => ({ ...t, duration }));
        }}
      />
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
        <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted/50 sm:size-28">
          {track.cover ? (
            <Image src={track.cover} alt={`${track.title} cover art`} fill sizes="112px" className="object-cover" />
          ) : (
            <MusicIcon className="size-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="min-w-0">
            <p className="truncate font-heading text-lg font-semibold tracking-tight">{track.title}</p>
            <p className="truncate text-sm text-muted-foreground">{track.artist}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-9 text-xs tabular-nums text-muted-foreground">{fmt(time.current)}</span>
            <input
              type="range"
              aria-label="Seek"
              min={0}
              max={time.duration || 0}
              step={0.1}
              value={Math.min(time.current, time.duration || 0)}
              disabled={!time.duration}
              onChange={(e) => {
                if (audio.current) audio.current.currentTime = Number(e.target.value);
              }}
              className="h-1 flex-1 cursor-pointer accent-primary"
            />
            <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{fmt(time.duration)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Previous track" onClick={() => go((index - 1 + tracks.length) % tracks.length, playing)}>
              <SkipBackIcon />
            </Button>
            <Button size="icon" aria-label={playing ? "Pause" : "Play"} onClick={toggle}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </Button>
            <Button variant="outline" size="icon" aria-label="Next track" onClick={() => go((index + 1) % tracks.length, playing)}>
              <SkipForwardIcon />
            </Button>
            <div className="ml-2 hidden items-center gap-2 sm:flex">
              <Volume2Icon className="size-4 text-muted-foreground" />
              <input
                type="range"
                aria-label="Volume"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="h-1 w-24 cursor-pointer accent-primary"
              />
            </div>
            <Button variant="secondary" onClick={() => go(randomOther())} disabled={tracks.length < 2} className="ml-auto">
              <ShuffleIcon data-icon="inline-start" /> Shuffle
            </Button>
          </div>
        </div>
      </div>
    </Window>
    </div>
  );
}

export const MusicPlayer = dynamic(() => Promise.resolve(MusicPlayerInner), {
  ssr: false,
  loading: () => <div className="h-[195px] rounded-xl border bg-muted/30" />,
});
