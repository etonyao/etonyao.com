import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://etonyao.com"),
  title: { default: "Eton Yao — Product builder", template: "%s · Eton Yao" },
  description: "I build products. Joystick, a social app for video games, and Potion Problems, a game on Steam. USC '27, Los Angeles.",
  openGraph: {
    title: "Eton Yao — Product builder",
    description: "I build products. Joystick and Potion Problems, plus product and marketing case studies.",
    url: "https://etonyao.com",
    siteName: "Eton Yao",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Eton Yao — Product builder" },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full antialiased font-sans", inter.variable, geistMono.variable)}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
