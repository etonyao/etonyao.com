import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/app/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-shadow group-hover:shadow-md">
        <div className="relative aspect-[16/9] bg-muted">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 768px) 448px, 100vw"
            className={product.image.endsWith(".png") ? "object-contain p-8" : "object-cover"}
          />
        </div>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Badge>{product.status}</Badge>
            {product.platforms.map((p) => (
              <Badge key={p} variant="secondary">{p}</Badge>
            ))}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-xl font-semibold tracking-tight">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.tagline}</p>
            </div>
            <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
