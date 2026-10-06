"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/app/data/projects";

const FILTERS = ["All", "Product", "Marketing", "Program"] as const;

function Grid({ items }: { items: Project[] }) {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {items.map((p) => (
        <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
          <Card className="h-full transition-shadow group-hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{p.type}</Badge>
                <span className="text-xs text-muted-foreground">{p.kicker}</span>
              </div>
              <CardTitle className="font-heading">{p.title}</CardTitle>
              <CardDescription>{p.tagline}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export function WorkList({ projects }: { projects: Project[] }) {
  return (
    <Tabs defaultValue="All">
      <TabsList>
        {FILTERS.map((f) => (
          <TabsTrigger key={f} value={f}>{f}</TabsTrigger>
        ))}
      </TabsList>
      {FILTERS.map((f) => (
        <TabsContent key={f} value={f}>
          <Grid items={f === "All" ? projects : projects.filter((p) => p.type === f)} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
