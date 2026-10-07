import { ArrowRightIcon, GraduationCapIcon, MailIcon, MapPinIcon, TargetIcon } from "lucide-react";
import Link from "next/link";
import { tracks } from "@/app/data/music";
import { products } from "@/app/data/products";
import { MusicPlayer } from "@/components/music-player";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { VideoEmbed } from "@/components/video-embed";
import { Window } from "@/components/window";

const SKILLS = ["Product Management", "Figma", "Python", "AI", "Data Analysis", "Airtable", "Linear", "Marketing", "Agile / Scrum"];
const INTERESTS = ["Video Games", "Sustainability", "Vibe Coding", "Cooking", "Travel", "Kung Fu", "Pickleball", "Karaoke", "Museums"];

function SectionLabel({ children }: { children: string }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{children}</p>;
}

export default function Home() {
  return (
    <div className="w-full px-5 sm:px-8 lg:px-12 pb-4">
      {/* Hero */}
      <section className="grid gap-4 pt-10 sm:pt-14 lg:grid-cols-5 xl:grid-cols-12 xl:items-stretch">
        <div className="flex flex-col justify-center lg:col-span-3 lg:pr-8 xl:col-span-5 2xl:col-span-4">
          <Badge variant="secondary" className="w-fit">USC &rsquo;27 · Los Angeles</Badge>
          <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight sm:text-7xl xl:text-8xl">Eton Yao</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground xl:text-2xl xl:leading-snug">
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

        <div className="flex flex-col gap-4 lg:col-span-2 xl:contents">
        <div className="xl:col-span-4 2xl:col-span-5">
          <VideoEmbed title="intro.mov" fill url="https://www.youtube.com/watch?v=fEWX8UWg7u4" />
        </div>
        <Window title="eton.profile" className="xl:col-span-3">
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
        </div>
      </section>

      {/* Music */}
      {tracks.length > 0 ? (
        <section className="pt-10">
          <SectionLabel>Favorite music</SectionLabel>
          <div className="max-w-3xl">
            <MusicPlayer tracks={tracks} />
          </div>
        </section>
      ) : null}

      {/* Projects */}
      <section id="products" className="scroll-mt-20 pt-10">
        <SectionLabel>Projects</SectionLabel>
        <div className="grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
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
