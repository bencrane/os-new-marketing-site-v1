import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-border flex flex-col lg:flex-row justify-between items-center font-mono text-xs text-muted-foreground uppercase tracking-widest bg-[#050505] mt-auto">
      <div className="flex items-center gap-3 mb-6 lg:mb-0">
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-center lg:text-left">© {new Date().getFullYear()} GTM COMMAND CENTER. ALL PROCESSES ENGINEERED INTERNALLY.</span>
      </div>
      <div className="flex gap-8">
        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy</Link>
        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms of Service</Link>
      </div>
    </footer>
  );
}
