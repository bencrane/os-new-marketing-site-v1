import { VerticalConfig } from "@/config/verticals";

export function VerticalMarketMap({ data }: { data: VerticalConfig["marketMap"] }) {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-secondary/10">
      <div className="max-w-6xl">
        <div className="mb-12">
          <h2 className="font-mono text-primary text-xs tracking-widest uppercase mb-4">
            [01] Total Addressable Market Map
          </h2>
          <p className="text-3xl md:text-4xl font-heading text-foreground max-w-3xl">
            The complete distributor landscape—defined, enriched and segmented.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-border/50 border border-border/50 p-px">
          <div className="bg-background p-8 flex flex-col justify-between">
            <span className="font-mono text-muted-foreground text-[10px] uppercase tracking-widest mb-4 block">
              Active Targets Detected
            </span>
            <span className="font-mono text-5xl md:text-6xl text-foreground">
              {data.totalDMCount}
            </span>
          </div>

          <div className="bg-background p-8">
            <span className="font-mono text-muted-foreground text-[10px] uppercase tracking-widest mb-6 block">
              Target Titles Isolated
            </span>
            <ul className="space-y-3 font-mono text-xs text-foreground uppercase tracking-wide">
              {data.titlesTargeted.map((title, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                  {title}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background p-8">
            <span className="font-mono text-muted-foreground text-[10px] uppercase tracking-widest mb-6 block">
              Geographic Deployment
            </span>
            <ul className="grid grid-cols-2 gap-3 font-mono text-xs text-muted-foreground uppercase tracking-wide">
              {data.statesCovered.map((state, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-border">›</span> {state}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
