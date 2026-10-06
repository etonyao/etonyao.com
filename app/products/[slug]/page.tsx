import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/app/data/products";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.tagline } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <article className="mx-auto max-w-5xl px-5 pt-12 pb-4 sm:pt-16">
      <Link href="/#products" className="text-sm text-muted-foreground hover:text-foreground">← Projects</Link>

      <header className="mt-6 grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{product.status}</Badge>
            {product.platforms.map((p) => <Badge key={p} variant="secondary">{p}</Badge>)}
          </div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-xl text-muted-foreground">{product.tagline}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {product.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(buttonVariants({ size: "lg", variant: l.primary ? "default" : "outline" }))}
              >
                {l.label} {l.href.startsWith("http") ? <ArrowUpRightIcon data-icon="inline-end" /> : null}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 400px, 100vw"
            className={product.image.endsWith(".png") ? "object-contain p-10" : "object-cover"}
          />
        </div>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {product.highlights.map((h) => (
          <Card key={h.label}>
            <CardContent>
              <p className="font-heading text-3xl font-semibold tracking-tight">{h.n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{h.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-12" />

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="font-heading text-xl font-semibold tracking-tight">The problem</h2>
          <p className="mt-3 text-muted-foreground">{product.problem}</p>
          <h2 className="mt-8 font-heading text-xl font-semibold tracking-tight">My approach</h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            {product.approach.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="font-heading text-xl font-semibold tracking-tight">What it does</h2>
          <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
            {product.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
          <h2 className="mt-8 font-heading text-xl font-semibold tracking-tight">My role</h2>
          <p className="mt-3 text-muted-foreground">{product.role}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.stack.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
          </div>
        </section>
      </div>
    </article>
  );
}
