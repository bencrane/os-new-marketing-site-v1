import { VerticalConfig } from "@/config/verticals";

export function VerticalSystem({ data }: { data: VerticalConfig["system"] }) {
  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
      <div className="max-w-4xl mb-16">
        <h2 className="text-3xl md:text-4xl font-heading mb-6">
          [03] The Phased System
        </h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          {data.intro}
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-[23px] md:left-1/2 w-px bg-border/50 md:-translate-x-1/2 hidden sm:block" />
        
        <div className="space-y-12">
          {data.stages.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-16">
                
                {/* Left side empty or content depending on index */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'}`}>
                  <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                    <span className="font-mono text-xs text-primary mb-2 tracking-widest uppercase">
                      {stage.channel}
                    </span>
                    <h3 className="font-mono text-lg text-foreground uppercase tracking-wide mb-3">
                      {stage.name}
                    </h3>
                    <p className="font-mono text-sm text-muted-foreground">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-background border-2 border-primary rounded-full md:-translate-x-1/2 order-2 z-10 shadow-[0_0_10px_rgba(16,185,129,0.3)] hidden sm:block" />

                {/* Spacer for the other side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:order-3' : 'md:order-1'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
