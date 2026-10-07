import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="mt-12">
      <Separator />
      <div className="flex w-full flex-col gap-2 px-5 sm:px-8 lg:px-12 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Eton Yao · USC &rsquo;27 · Los Angeles</p>
        <div className="flex gap-4">
          <Link href="mailto:eayao@usc.edu" className="hover:text-foreground">Email</Link>
          <Link href="https://www.linkedin.com/in/eton-yao/" className="hover:text-foreground">LinkedIn</Link>
          <Link href="https://github.com/etonyao" className="hover:text-foreground">GitHub</Link>
        </div>
      </div>
    </footer>
  );
}
