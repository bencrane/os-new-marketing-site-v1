import { VerticalConfig } from "@/config/verticals";

export function VerticalOutcome({ data }: { data: VerticalConfig["outcome"] }) {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl">
        <div>
          <h2 className="text-3xl md:text-4xl font-heading mb-6">
            [05] Revenue that Compounds
          </h2>
          <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
            {data.intro}
          </p>
        </div>
        
        <div className="w-full bg-[#0a0a0a] border border-border/60 p-8 rounded-sm font-mono shadow-[0_0_30px_rgba(16,185,129,0.03)] relative">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border/40">
            <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Telemetry Live State</span>
            <span className="text-primary text-[10px] uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Connected
            </span>
          </div>
          
          <div className="space-y-6">
            {data.dashboardMock.map((metric, i) => (
              <div key={i} className="flex justify-between items-end border-b border-border/20 pb-2">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">{metric.metric.replace(/_/g, " ")}</span>
                <span className={`text-xl ${metric.status === "alert" ? "text-destructive" : metric.status === "warning" ? "text-yellow-500" : "text-foreground"}`}>
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-border/60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-border/60" />
        </div>
      </div>
    </section>
  );
}
