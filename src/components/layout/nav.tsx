import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-4 h-4 bg-primary animate-pulse-slow shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        <span className="font-heading font-semibold text-lg tracking-tight group-hover:text-primary transition-colors duration-300">
          Outbound Solutions
        </span>
      </Link>
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="hidden sm:flex border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors font-mono uppercase text-xs tracking-wider">
          System Status: Nominal
        </Button>
        <Button size="sm" className="font-mono text-xs uppercase tracking-wider bg-foreground text-background hover:bg-primary transition-all duration-300 rounded-none border border-foreground hover:border-primary shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          Request Access
        </Button>
      </div>
    </header>
  );
}
