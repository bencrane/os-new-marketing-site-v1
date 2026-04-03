import { VerticalConfig } from "@/config/verticals";

export function VerticalTerrain({ data }: { data: VerticalConfig["terrain"] }) {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-secondary/10">
      <div className="max-w-4xl mb-16">
        <h2 className="text-3xl md:text-4xl font-heading mb-6">
          [04] The Structural Terrain
        </h2>
        <h3 className="font-mono text-primary text-base md:text-lg mb-6 tracking-wide">
          {data.intro}
        </h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-5xl">
        {data.items.map((item) => (
          <div key={item.id} className="bg-background p-8 flex flex-col relative group">
            <span className="font-mono text-primary/50 text-[10px] tracking-widest uppercase mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
              [ {item.id} ]
            </span>
            <h4 className="font-mono text-lg text-foreground uppercase tracking-wide mb-3">
              {item.name}
            </h4>
            <p className="font-mono text-xs text-muted-foreground">
              {item.description}
            </p>
            
            <div className="absolute top-4 right-4 w-1.5 h-1.5 border border-border group-hover:border-primary/50 transition-colors" />
          </div>
        ))}
      </div>
    </section>
  );
}
