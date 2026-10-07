"use client";

import { PauseIcon, PlayIcon, ShuffleIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMusic } from "@/components/music-player";
import * as music from "@/lib/music-engine";

function MiniPlayerInner() {
  const pathname = usePathname();
  const { track, playing } = useMusic();
  // Always mounted in the layout so the engine starts on any landing page; the home page shows the full card instead.
  if (!track || pathname === "/") return null;

  const btn = "flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-muted";
  return (
    <div
      data-music-player
      className="fixed bottom-4 left-4 z-30 flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border bg-background/90 p-1.5 pr-2 shadow-md backdrop-blur"
    >
      <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-muted">
        {track.cover ? <Image src={track.cover} alt="" fill sizes="32px" className="object-cover" /> : null}
      </div>
      <p className="max-w-40 truncate text-xs font-medium">{track.title}</p>
      <button type="button" aria-label={playing ? "Pause" : "Play"} onClick={music.toggle} className={btn}>
        {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
      </button>
      <button type="button" aria-label="Shuffle" onClick={music.shuffle} className={btn}>
        <ShuffleIcon className="size-4" />
      </button>
    </div>
  );
}

export const MusicMini = dynamic(() => Promise.resolve(MiniPlayerInner), { ssr: false });
