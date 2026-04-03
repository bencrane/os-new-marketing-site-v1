import { VerticalConfig } from "@/config/verticals";
import { VerticalHero } from "./vertical-hero";
import { VerticalMarketMap } from "./vertical-market-map";
import { VerticalSignals } from "./vertical-signals";
import { VerticalSystem } from "./vertical-system";
import { VerticalTerrain } from "./vertical-terrain";
import { VerticalOutcome } from "./vertical-outcome";
import { VerticalGate } from "./vertical-gate";

export function VerticalTemplate({ data }: { data: VerticalConfig }) {
  return (
    <div className="flex flex-col text-foreground bg-background selection:bg-primary/30 w-full overflow-hidden">
      <VerticalHero data={data.hero} />
      <VerticalMarketMap data={data.marketMap} />
      <VerticalSignals data={data.signals} />
      <VerticalSystem data={data.system} />
      <VerticalTerrain data={data.terrain} />
      <VerticalOutcome data={data.outcome} />
      <VerticalGate data={data.gate} />
      
      <footer className="px-6 md:px-12 py-8 border-t border-border flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] text-muted-foreground tracking-widest uppercase bg-black">
        <div>© {new Date().getFullYear()} Outbound Solutions. All processes engineered internally.</div>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
