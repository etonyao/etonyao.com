import { ArrowUpRightIcon, FileTextIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/app/data/case-studies";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseStudies[(await params).slug];
  return c ? { title: c.title, description: c.tagline } : {};
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = caseStudies[(await params).slug];
  if (!study) notFound();

  return (
    <article className="mx-auto max-w-4xl px-5 pt-12 sm:pt-16">
      <Link href="/work" className="text-sm text-muted-foreground hover:text-foreground">← Work</Link>

      <header className="mt-6">
        <div className="flex flex-wrap gap-2">
          <Badge>{study.category}</Badge>
          {study.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
        </div>
        <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{study.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{study.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {study.link ? (
            <Link href={study.link} className={buttonVariants({ size: "lg" })}>
              {study.linkLabel ?? "Open"} {study.link.startsWith("http") ? <ArrowUpRightIcon data-icon="inline-end" /> : null}
            </Link>
          ) : null}
          {study.document ? (
            <Link href={study.document} className={buttonVariants({ size: "lg", variant: "outline" })}>
              <FileTextIcon data-icon="inline-start" /> Read the document
            </Link>
          ) : null}
        </div>
      </header>

      {study.image ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={study.image}
            alt={study.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className={study.imageFit === "contain" ? "object-contain" : "object-cover"}
            style={study.imagePosition ? { objectPosition: study.imagePosition } : undefined}
          />
        </div>
      ) : null}

      <p className="mt-8 text-muted-foreground">{study.overview}</p>

      <div className="mt-8 flex flex-col gap-8">
        {study.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-heading text-xl font-semibold tracking-tight">{s.heading}</h2>
            <p className="mt-2 text-muted-foreground">{s.body}</p>
            {s.bullets ? (
              <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-muted-foreground">
                {s.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      {study.outcomes?.length ? (
        <>
          <Separator className="my-10" />
          <section>
            <h2 className="font-heading text-xl font-semibold tracking-tight">Outcomes</h2>
            <div className="mt-4 grid gap-3">
              {study.outcomes.map((o) => (
                <Card key={o}>
                  <CardContent className="text-sm">{o}</CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : null}
    </article>
  );
}
