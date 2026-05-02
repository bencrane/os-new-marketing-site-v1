import { VerticalConfig } from "@/config/verticals";

export function VerticalGate({ data }: { data: VerticalConfig["gate"] }) {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-32 bg-black flex flex-col items-center justify-center text-center">
      <div className="w-4 h-4 bg-primary mb-8 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
      <span className="font-mono text-primary text-xs uppercase tracking-widest mb-4 block">[06] The Gate</span>
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading mb-8">
        Own Your Market.
      </h2>
      <p className="font-mono text-muted-foreground text-sm max-w-lg mx-auto mb-10 leading-relaxed">
        {data.scarcityText}
      </p>
      <a 
        href="mailto:team@engineereddemand.com"
        className="inline-flex items-center justify-center font-medium whitespace-nowrap h-14 px-8 font-mono text-sm uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-black transition-all duration-300 rounded-none shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
      >
        Request Access
      </a>
    </section>
  );
}
