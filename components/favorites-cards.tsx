import { PlayIcon } from "lucide-react";
import Image from "next/image";
import type { Favorite } from "@/app/data/interests";
import { Window } from "@/components/window";
import { cn } from "@/lib/utils";

const ASPECT: Record<Favorite["shape"], string> = {
  wide: "aspect-video",
  poster: "aspect-[3/4]",
  square: "aspect-square",
};

function Card({ f }: { f: Favorite }) {
  const window = (
    <Window
      title=""
      className={cn(f.href && "transition-shadow group-hover:shadow-md")}
      bodyClassName="p-0"
    >
      {/* The picture fills the whole window body, edge to edge. */}
      <div
        className={cn("relative bg-muted", ASPECT[f.shape])}
        style={f.gradient ? { backgroundImage: f.gradient } : undefined}
      >
        {f.image ? (
          <Image
            src={f.image}
            alt={`${f.title}${f.by ? ` by ${f.by}` : ""}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center p-3 text-center font-heading text-lg font-semibold text-white drop-shadow">
            {f.title}
          </p>
        )}
        {f.href ? (
          <span className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur">
            <PlayIcon className="size-3.5" />
          </span>
        ) : null}
      </div>
      <div className="border-t px-3 py-2">
        <p className="truncate text-sm font-medium leading-tight">{f.title}</p>
        <p className="truncate text-xs text-muted-foreground">{[f.category, f.by].filter(Boolean).join(" · ")}</p>
      </div>
    </Window>
  );

  return f.href ? (
    <a href={f.href} target="_blank" rel="noopener noreferrer" className="group block break-inside-avoid">
      {window}
    </a>
  ) : (
    <div className="group break-inside-avoid">{window}</div>
  );
}

/** Every favorite in its own small window. Wide screens get 4 hand-placed columns; smaller ones flow into 2-3. */
export function FavoritesCards({ items }: { items: Favorite[] }) {
  return (
    <>
      <div className="hidden items-start gap-3 lg:flex">
        {([1, 2, 3, 4] as const).map((n) => items.filter((f) => f.column === n)).map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-3">
            {col.map((f) => (
              <Card key={f.title} f={f} />
            ))}
          </div>
        ))}
      </div>
      <div className="columns-2 gap-3 space-y-3 md:columns-3 lg:hidden">
        {items.map((f) => (
          <Card key={f.title} f={f} />
        ))}
      </div>
    </>
  );
}
