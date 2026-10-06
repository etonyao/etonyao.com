import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { products } from "@/app/data/products";
import { projects } from "@/app/data/projects";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SELECTED = ["headliners", "pokemon-team-builder", "ai-time-entry", "netflix-mood-meter"];
const SKILLS = ["Product Management", "Figma", "Python", "AI", "Data Analysis", "Airtable", "Linear", "Marketing", "Agile / Scrum"];
const INTERESTS = ["Video Games", "Sustainability", "Vibe Coding", "Cooking", "Travel", "Kung Fu", "Pickleball", "Karaoke", "Museums"];

export default function Home() {
  const selected = SELECTED.map((s) => projects.find((p) => p.slug === s)).filter((p) => !!p);

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-24">
        <Badge variant="secondary">USC &rsquo;27 · Los Angeles</Badge>
        <h1 className="mt-5 font-heading text-5xl font-semibold tracking-tight sm:text-7xl">Eton Yao</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          A dual-degree student at USC, in{" "}
          <strong className="font-medium text-foreground">Business Administration</strong> and a{" "}
          <strong className="font-medium text-foreground">Master of International Trade Law &amp; Economics</strong>,
          working where product meets marketing.
        </p>
        <dl className="mt-6 grid max-w-xl grid-cols-3 gap-4 text-sm">
          {[["Location", "Los Angeles, CA"], ["Focus", "Product · Marketing"], ["Graduating", "USC \u201927"]].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/products/joystick" className={buttonVariants({ size: "lg" })}>
            See Joystick <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <Link href="/products/potion-problems" className={buttonVariants({ size: "lg", variant: "outline" })}>
            Potion Problems
          </Link>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-20 py-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">Projects</h2>
        <p className="mt-1 text-muted-foreground">Joystick and Potion Problems.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Selected work</h2>
            <p className="mt-1 text-muted-foreground">Product and marketing case studies.</p>
          </div>
          <Link href="/work" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}>
            All work <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {selected.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
              <Card className="h-full transition-shadow group-hover:shadow-md">
                <CardHeader>
                  <Badge variant="secondary" className="mb-2 w-fit">{p.type}</Badge>
                  <CardTitle className="font-heading">{p.title}</CardTitle>
                  <CardDescription>{p.tagline}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 py-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">About</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-[3fr_2fr]">
          <p className="text-muted-foreground">
            I&rsquo;m pursuing two degrees at once at USC: a B.S. in Business Administration and a Master of International
            Trade Law &amp; Economics, class of &rsquo;27. I live at the intersection of product, marketing and technology,
            and I like getting hands-on with every part of a project.
          </p>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {INTERESTS.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 py-12">
        <Card>
          <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">Let&rsquo;s talk.</h2>
              <p className="mt-1 text-muted-foreground">Working on something, or hiring? I&rsquo;d love to hear about it.</p>
            </div>
            <div className="flex gap-3">
              <Link href="mailto:eayao@usc.edu" className={buttonVariants()}>Email me</Link>
              <Link href="https://www.linkedin.com/in/eton-yao/" className={buttonVariants({ variant: "outline" })}>LinkedIn</Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
