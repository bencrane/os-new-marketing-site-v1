import { VerticalConfig } from "@/config/verticals";
import { VerticalHero } from "./vertical-hero";
import { VerticalMarketMap } from "./vertical-market-map";
import { VerticalSignals } from "./vertical-signals";
import { VerticalSystem } from "./vertical-system";
import { VerticalTerrain } from "./vertical-terrain";
import { VerticalOutcome } from "./vertical-outcome";
import { VerticalGate } from "./vertical-gate";
import { Footer } from "@/components/layout/footer";

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
      <Footer />
    </div>
  );
}
