"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VERTICALS = [
  { href: "/verticals/wine-and-spirits", label: <>[WINE&thinsp;&amp;&thinsp;SPIRITS]</>, slug: "wine-and-spirits" },
  { href: "/verticals/insurance", label: "[INSURANCE]", slug: "insurance" },
  { href: "/verticals/factoring", label: "[FACTORING]", slug: "factoring" },
  { href: "/verticals/vertical-saas", label: "[VERTICAL SAAS]", slug: "vertical-saas" },
  { href: "/verticals/private-equity", label: "[PRIVATE EQUITY]", slug: "private-equity" },
  { href: "/verticals/real-estate", label: "[REAL ESTATE]", slug: "real-estate" },
];

export function Nav() {
  const pathname = usePathname();
  const isVerticalPage = pathname?.startsWith("/verticals/");
  const currentSlug = isVerticalPage ? pathname?.split("/").pop() : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <Link href="/" className="flex items-center gap-2 group z-10">
        <div className="w-3 h-3 bg-primary" />
        <span className="font-heading font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
          Outbound Solutions
        </span>
      </Link>
      
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 font-mono text-[10px] uppercase tracking-wider">
        {isVerticalPage ? (
          VERTICALS.filter(v => v.slug === currentSlug).map((v) => (
            <span key={v.slug} className="text-primary font-semibold whitespace-nowrap">
              {v.label}
            </span>
          ))
        ) : (
          VERTICALS.map((v) => (
            <Link key={v.slug} href={v.href} className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
              {v.label}
            </Link>
          ))
        )}
      </div>
      
      <div className="flex items-center z-10">
        <div className="hidden sm:flex items-center gap-2 border border-border bg-background/50 px-3 h-8 rounded text-muted-foreground font-mono uppercase text-[10px] tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>LIVE</span>
        </div>
      </div>
    </header>
  );
}
