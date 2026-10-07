"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { Window } from "@/components/window";

/** Fired on window whenever a video on the page starts playing, so other media (the music player) can pause. */
export const VIDEO_PLAY_EVENT = "site:video-play";
const announcePlay = () => window.dispatchEvent(new Event(VIDEO_PLAY_EVENT));

// Turns a pasted YouTube / Vimeo link into its embeddable address.
function toEmbed(url: string, ambient: boolean): { kind: "iframe" | "file"; src: string } {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    const id = yt[1];
    // Ambient: muted autoplay loop with no player chrome (autoplay only works muted).
    const params = ambient
      ? `autoplay=1&mute=1&loop=1&playlist=${id}&enablejsapi=1&controls=0&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3&playsinline=1&rel=0`
      : "rel=0&enablejsapi=1";
    return { kind: "iframe", src: `https://www.youtube.com/embed/${id}?${params}` };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  return { kind: "file", src: url }; // a .mp4/.webm in /public, or any direct file URL
}

/**
 * A 16:9 window for a video. Pass a YouTube/Vimeo link or a direct file URL.
 * With no video yet it shows a "coming soon" frame so the spot is visible.
 */
export function VideoEmbed({ title, url, poster, ambient = false, fill = false }: { title: string; url?: string; poster?: string; ambient?: boolean; fill?: boolean }) {
  const media = url ? toEmbed(url, ambient) : null;
  const frame = useRef<HTMLIFrameElement>(null);
  const file = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState({ current: 0, duration: 0 });

  // Progress: YouTube reports currentTime/duration to us once we say we're listening; files fire timeupdate.
  useEffect(() => {
    if (media?.kind !== "iframe") return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://www.youtube.com" || e.source !== frame.current?.contentWindow) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        const info = data?.info;
        if (data?.event === "infoDelivery" && info?.playerState === 1) announcePlay(); // 1 = playing
        if (ambient && data?.event === "infoDelivery" && info && (info.currentTime !== undefined || info.duration !== undefined)) {
          setTime((t) => ({ current: info.currentTime ?? t.current, duration: info.duration || t.duration }));
        }
      } catch {}
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [ambient, media?.kind]);

  // Browsers refuse autoplay with sound, so the video starts muted and unmutes on the visitor's first
  // click, tap or key press anywhere on the page. (The speaker button still works and wins if used first.)
  const unmuted = useRef(false);
  useEffect(() => {
    if (!ambient || !media) return;
    const unmute = (e: Event) => {
      if (unmuted.current || (e.target instanceof Element && e.target.closest("[data-sound-toggle]"))) return;
      unmuted.current = true;
      if (media.kind === "file" && file.current) file.current.muted = false;
      else command("unMute");
      setMuted(false);
    };
    const events = ["pointerdown", "keydown"] as const;
    events.forEach((ev) => window.addEventListener(ev, unmute, { once: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, unmute));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ambient, media?.kind]);

  function listen() {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1 }), "https://www.youtube.com");
  }
  function seek(to: number) {
    if (media?.kind === "file" && file.current) file.current.currentTime = to;
    else frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "seekTo", args: [to, true] }), "https://www.youtube.com");
    setTime((t) => ({ ...t, current: to }));
  }

  // Ambient videos start muted and playing (autoplay rule). The buttons below are user gestures,
  // so they can turn sound on and pause/resume. YouTube is driven through its postMessage API.
  function command(func: string) {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "https://www.youtube.com");
  }
  function toggleSound() {
    unmuted.current = true;
    if (media?.kind === "file" && file.current) file.current.muted = !muted;
    else command(muted ? "unMute" : "mute");
    setMuted(!muted);
  }
  function togglePlay() {
    if (media?.kind === "file" && file.current) void (playing ? file.current.pause() : file.current.play());
    else command(playing ? "pauseVideo" : "playVideo");
    setPlaying(!playing);
  }
  const btn = "flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80";

  return (
    <Window title={title} className={fill ? "xl:h-full" : undefined} bodyClassName={fill ? "p-0 xl:relative xl:min-h-0 xl:flex-1" : "p-0"}>
      {/* fill: from xl up, stretch to the parent's height instead of keeping 16:9 */}
      <div className={fill ? "relative aspect-video bg-muted/50 xl:absolute xl:inset-0 xl:aspect-auto" : "relative aspect-video bg-muted/50"}>
        {media?.kind === "iframe" ? (
          <iframe
            ref={frame}
            src={media.src}
            title={title}
            className={ambient ? "pointer-events-none absolute inset-0 size-full" : "absolute inset-0 size-full"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            onLoad={listen}
          />
        ) : null}
        {media?.kind === "file" ? (
          <video ref={file} onPlay={announcePlay} src={media.src} poster={poster} controls={!ambient} autoPlay={ambient} muted={ambient} loop={ambient} onTimeUpdate={(e) => setTime({ current: e.currentTarget.currentTime, duration: e.currentTarget.duration || 0 })} playsInline preload="metadata" className="absolute inset-0 size-full object-cover" />
        ) : null}
        {media && ambient ? (
          <>
            <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className="absolute inset-0 cursor-pointer" />
            <input
              type="range"
              aria-label="Seek"
              min={0}
              max={time.duration || 0}
              step={0.1}
              value={Math.min(time.current, time.duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!time.duration}
              className="absolute inset-x-3 bottom-12 h-1 cursor-pointer accent-white"
            />
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button type="button" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className={btn}>
                {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
              </button>
              <button type="button" data-sound-toggle onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"} className={btn}>
                {muted ? <VolumeXIcon className="size-4" /> : <Volume2Icon className="size-4" />}
              </button>
            </div>
          </>
        ) : null}
        {!media ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <span className="flex size-12 items-center justify-center rounded-full border bg-background">
              <PlayIcon className="size-5" />
            </span>
            <p className="text-sm">Video coming soon</p>
          </div>
        ) : null}
      </div>
    </Window>
  );
}
