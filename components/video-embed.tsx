import { PlayIcon } from "lucide-react";
import { Window } from "@/components/window";

// Turns a pasted YouTube / Vimeo link into its embeddable address.
function toEmbed(url: string): { kind: "iframe" | "file"; src: string } {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}?rel=0` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  return { kind: "file", src: url }; // a .mp4/.webm in /public, or any direct file URL
}

/**
 * A 16:9 window for a video. Pass a YouTube/Vimeo link or a direct file URL.
 * With no video yet it shows a "coming soon" frame so the spot is visible.
 */
export function VideoEmbed({ title, url, poster }: { title: string; url?: string; poster?: string }) {
  const media = url ? toEmbed(url) : null;
  return (
    <Window title={title} bodyClassName="p-0">
      <div className="relative aspect-video bg-muted/50">
        {media?.kind === "iframe" ? (
          <iframe
            src={media.src}
            title={title}
            className="absolute inset-0 size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        ) : media?.kind === "file" ? (
          <video src={media.src} poster={poster} controls playsInline preload="metadata" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <span className="flex size-12 items-center justify-center rounded-full border bg-background">
              <PlayIcon className="size-5" />
            </span>
            <p className="text-sm">Video coming soon</p>
          </div>
        )}
      </div>
    </Window>
  );
}
