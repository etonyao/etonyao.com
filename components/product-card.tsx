import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Window } from "@/components/window";
import type { Product } from "@/app/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <Window title={`${product.slug}.app`} className="h-full transition-shadow group-hover:shadow-md" bodyClassName="flex h-full flex-col gap-4 p-0">
        <div className="relative aspect-[16/9] border-b bg-muted/50">
          <Image
            src={product.cardImage ?? product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className={(product.cardImage ?? product.image).endsWith(".png") ? "object-contain p-8" : "object-cover"}
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 px-4 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{product.status}</Badge>
            {product.platforms.map((p) => (
              <Badge key={p} variant="secondary">{p}</Badge>
            ))}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-tight">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
            </div>
            <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {product.stack.slice(0, 4).map((s) => (
              <Badge key={s} variant="outline">{s}</Badge>
            ))}
          </div>
        </div>
      </Window>
    </Link>
  );
}
