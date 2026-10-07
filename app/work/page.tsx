import type { Metadata } from "next";
import { projects } from "@/app/data/projects";
import { WorkList } from "@/components/work-list";

export const metadata: Metadata = {
  title: "Work",
  description: "Product management, marketing and program case studies by Eton Yao.",
};

export default function WorkPage() {
  return (
    <div className="w-full px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">Work</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Case studies from product management, marketing and program work.
      </p>
      <div className="mt-8">
        <WorkList projects={projects} />
      </div>
    </div>
  );
}
