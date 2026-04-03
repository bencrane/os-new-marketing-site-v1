import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <Link href="/" className="flex items-center gap-2 group z-10">
        <div className="w-4 h-4 bg-primary animate-pulse-slow shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        <span className="font-heading font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
          Outbound Solutions
        </span>
      </Link>
      
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 font-mono text-[10px] uppercase tracking-wider">
        <Link href="/verticals/wine-and-spirits" className="text-muted-foreground hover:text-primary transition-colors">
          [Wine&Spirits]
        </Link>
        <Link href="/verticals/insurance" className="text-muted-foreground hover:text-primary transition-colors">
          [Insurance]
        </Link>
        <Link href="/verticals/factoring" className="text-muted-foreground hover:text-primary transition-colors">
          [Factoring]
        </Link>
        <Link href="/verticals/saas" className="text-muted-foreground hover:text-primary transition-colors">
          [SaaS]
        </Link>
      </div>
      
      <div className="flex items-center gap-6 z-10">

        <div className="hidden sm:flex items-center gap-2 border border-border bg-background/50 px-3 h-8 rounded text-muted-foreground font-mono uppercase text-[10px] tracking-wider relative group">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>LIVE</span>
        </div>
        <a 
          href="mailto:team@outboundsolutions.com"
          className="inline-flex items-center justify-center font-medium whitespace-nowrap h-8 px-3 font-mono text-xs uppercase tracking-wider bg-foreground text-background hover:bg-primary transition-all duration-300 rounded-none border border-foreground hover:border-primary shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]"
        >
          Request Access
        </a>
      </div>
    </header>
  );
}
