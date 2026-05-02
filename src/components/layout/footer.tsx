import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-border grid grid-cols-1 lg:grid-cols-3 gap-6 items-center font-mono text-xs text-muted-foreground uppercase tracking-widest bg-[#050505] mt-auto">
      <div className="flex items-center justify-center lg:justify-start gap-3">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span>© {new Date().getFullYear()} ENGINEERED DEMAND</span>
      </div>
      
      <div className="hidden lg:block text-center text-primary/80">
        ALL PROCESSES ENGINEERED INTERNALLY.
      </div>

      <div className="hidden lg:flex justify-center lg:justify-end gap-8">
        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy</Link>
        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms of Service</Link>
      </div>
    </footer>
  );
}
