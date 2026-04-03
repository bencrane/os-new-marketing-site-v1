import Link from "next/link";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <Link href="/" className="flex items-center gap-2 group z-10">
        <div className="w-3 h-3 bg-primary" />
        <span className="font-heading font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
          Outbound Solutions
        </span>
      </Link>
      
      <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 font-mono text-[10px] uppercase tracking-wider">
        <Link href="/verticals/wine-and-spirits" className="text-muted-foreground hover:text-primary transition-colors">
          [WINE&SPIRITS]
        </Link>
        <Link href="/verticals/insurance" className="text-muted-foreground hover:text-primary transition-colors">
          [INSURANCE]
        </Link>
        <Link href="/verticals/factoring" className="text-muted-foreground hover:text-primary transition-colors">
          [FACTORING]
        </Link>
        <Link href="/verticals/saas" className="text-muted-foreground hover:text-primary transition-colors">
          [SAAS]
        </Link>
      </div>
      
      <div className="flex items-center z-10">
        <div className="hidden sm:flex items-center gap-2 border border-border bg-background/50 px-3 h-8 rounded text-muted-foreground font-mono uppercase text-[10px] tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>SYSTEM STATUS: LIVE</span>
        </div>
      </div>
    </header>
  );
}
