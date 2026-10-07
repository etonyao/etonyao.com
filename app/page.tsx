import { ArrowRightIcon, GraduationCapIcon, MailIcon, MapPinIcon, TargetIcon } from "lucide-react";
import Link from "next/link";
import { products } from "@/app/data/products";
import { projects } from "@/app/data/projects";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Window } from "@/components/window";
import { cn } from "@/lib/utils";

const SELECTED = ["headliners", "pokemon-team-builder", "ai-time-entry", "netflix-mood-meter", "clouted", "the-sims-gtm"];
const SKILLS = ["Product Management", "Figma", "Python", "AI", "Data Analysis", "Airtable", "Linear", "Marketing", "Agile / Scrum"];
const INTERESTS = ["Video Games", "Sustainability", "Vibe Coding", "Cooking", "Travel", "Kung Fu", "Pickleball", "Karaoke", "Museums"];

const STATS = [
  { title: "education", n: "2", label: "degrees at USC" },
  { title: "work.count", n: String(projects.length), label: "case studies" },
  { title: "clouted", n: "5M+", label: "monthly views on Clouted" },
  { title: "potion-problems", n: "8", label: "teams coordinated on Potion Problems" },
];

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{children}</p>;
}

export default function Home() {
  const selected = SELECTED.map((s) => projects.find((p) => p.slug === s)).filter((p) => !!p);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-4">
      {/* Hero */}
      <section className="grid gap-4 pt-10 sm:pt-14 lg:grid-cols-5">
        <div className="flex flex-col justify-center lg:col-span-3 lg:pr-8">
          <Badge variant="secondary" className="w-fit">USC &rsquo;27 · Los Angeles</Badge>
          <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-7xl">Eton Yao</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            A dual-degree student at USC, in{" "}
            <strong className="font-medium text-foreground">Business Administration</strong> and a{" "}
            <strong className="font-medium text-foreground">Master of International Trade Law &amp; Economics</strong>,
            working where product meets marketing.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products/joystick" className={buttonVariants({ size: "lg" })}>
              See Joystick <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link href="/work" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Browse work
            </Link>
          </div>
        </div>

        <Window title="eton.profile" className="lg:col-span-2">
          <dl className="flex flex-col gap-4 text-sm">
            <div className="flex gap-3">
              <GraduationCapIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <dt className="text-xs text-muted-foreground">Education</dt>
                <dd className="font-medium">USC · B.S. Business Administration + MITLE</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <TargetIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <dt className="text-xs text-muted-foreground">Focus</dt>
                <dd className="font-medium">Product · Marketing</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPinIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <dt className="text-xs text-muted-foreground">Location</dt>
                <dd className="font-medium">Los Angeles, CA · Class of &rsquo;27</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MailIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div>
                <dt className="text-xs text-muted-foreground">Contact</dt>
                <dd className="font-medium"><Link href="mailto:eayao@usc.edu" className="hover:underline">eayao@usc.edu</Link></dd>
              </div>
            </div>
          </dl>
        </Window>
      </section>

      {/* Stats */}
      <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <Window key={s.label} title={s.title} bodyClassName="py-5">
            <p className="font-heading text-3xl font-semibold tracking-tight">{s.n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </Window>
        ))}
      </section>

      {/* Projects */}
      <section id="products" className="scroll-mt-20 pt-10">
        <SectionLabel>Projects</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="pt-10">
        <div className="mb-3 flex items-end justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Selected work</p>
          <Link href="/work" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")}>
            All work <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {selected.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
              <Window title={`${p.slug}.md`} className="h-full transition-shadow group-hover:shadow-md" bodyClassName="flex h-full flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{p.type}</Badge>
                  <span className="truncate text-xs text-muted-foreground">{p.kicker}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {p.tags.slice(0, 3).map((t) => <Badge key={t} variant="outline">{t}</Badge>)}
                </div>
              </Window>
            </Link>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="grid scroll-mt-20 gap-4 pt-10 lg:grid-cols-3">
        <Window title="about.md" className="lg:col-span-2" bodyClassName="flex flex-col gap-3">
          <p className="text-muted-foreground">
            I&rsquo;m pursuing two degrees at once at USC: a B.S. in Business Administration and a Master of International
            Trade Law &amp; Economics, class of &rsquo;27. I live at the intersection of product, marketing and technology,
            and I like getting hands-on with every part of a project.
          </p>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map((s) => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
          </div>
        </Window>
        <Window title="interests.txt" bodyClassName="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5">
            {INTERESTS.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
          </div>
        </Window>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 pt-4">
        <Window title="contact.sh" bodyClassName="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">Let&rsquo;s talk.</h2>
            <p className="mt-1 text-muted-foreground">Working on something, or hiring? I&rsquo;d love to hear about it.</p>
          </div>
          <div className="flex gap-3">
            <Link href="mailto:eayao@usc.edu" className={buttonVariants()}>Email me</Link>
            <Link href="https://www.linkedin.com/in/eton-yao/" className={buttonVariants({ variant: "outline" })}>LinkedIn</Link>
          </div>
        </Window>
      </section>
    </div>
  );
}
