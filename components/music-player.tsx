"use client";

import { MusicIcon, PauseIcon, PlayIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, Volume2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { tracks } from "@/app/data/music";
import { Button } from "@/components/ui/button";
import { Window } from "@/components/window";
import * as music from "@/lib/music-engine";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/** Reads (and, on first use, starts) the site-wide music engine. Only used by client-only components. */
export function useMusic() {
  // Lazy initializer so the engine exists (and has picked its random track) before the first paint.
  useState(() => music.initMusic(tracks));
  const state = useSyncExternalStore(music.subscribe, music.getSnapshot, music.getServerSnapshot);
  return { ...state, track: tracks[state.index] };
}

/** The full player card on the home page. Controls the same engine as the mini player on other pages. */
function MusicPlayerInner() {
  const { track, playing, current, duration, volume } = useMusic();
  if (!track) return null;

  return (
    <div data-music-player>
      <Window title="now-playing.mp3" bodyClassName="p-0">
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
              <span className="w-9 text-xs tabular-nums text-muted-foreground">{fmt(current)}</span>
              <input
                type="range"
                aria-label="Seek"
                min={0}
                max={duration || 0}
                step={0.1}
                value={Math.min(current, duration || 0)}
                disabled={!duration}
                onChange={(e) => music.seek(Number(e.target.value))}
                className="h-1 flex-1 cursor-pointer accent-primary"
              />
              <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{fmt(duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Previous track" onClick={music.prev}>
                <SkipBackIcon />
              </Button>
              <Button size="icon" aria-label={playing ? "Pause" : "Play"} onClick={music.toggle}>
                {playing ? <PauseIcon /> : <PlayIcon />}
              </Button>
              <Button variant="outline" size="icon" aria-label="Next track" onClick={music.next}>
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
                  onChange={(e) => music.setVolume(Number(e.target.value))}
                  className="h-1 w-24 cursor-pointer accent-primary"
                />
              </div>
              <Button variant="secondary" onClick={music.shuffle} disabled={tracks.length < 2} className="ml-auto">
                <ShuffleIcon data-icon="inline-start" /> Shuffle
              </Button>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}

// Client-only: the random starting track can't be known on the server.
export const MusicPlayer = dynamic(() => Promise.resolve(MusicPlayerInner), {
  ssr: false,
  loading: () => <div className="h-[195px] rounded-xl border bg-muted/30" />,
});
