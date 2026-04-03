import { SignalFeed } from "@/components/ui/signal-feed";
import { ArchitectureDiagram } from "@/components/ui/architecture-diagram";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background selection:bg-primary/30">
      {/* 1. HERO */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-24 border-b border-border/50">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary" />
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              Outbound Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading leading-[1.1] text-foreground mb-8">
            Engineering applied to pipeline generation.
          </h1>
          <p className="font-mono text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
            Infrastructure-as-a-service for reaching strict target markets. We build proprietary data pipelines, signal detection engines, and isolated sending infrastructure. Pure execution. No retainers for effort.
          </p>
        </div>
      </section>

      {/* 2. THE REALITY */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-secondary/20">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-heading mb-12">
            Off-the-shelf tools fail in complex markets.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 font-mono text-sm text-muted-foreground">
            <div>
              <span className="text-primary block mb-2 font-bold">[01] The Data Problem</span>
              Standard databases do not capture niche inflection points. They sell stale lists. We ingest unformatted public, private, and governmental records to map relationships dynamically.
            </div>
            <div>
              <span className="text-primary block mb-2 font-bold">[02] The Reach Problem</span>
              Shared IP pools and generic sequences burn domain reputation. We build single-tenant, cryptographically authenticated sending nodes isolated from negative network effects.
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES / ARCHITECTURE */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-heading mb-6 max-w-2xl">
            A pipeline engine built like a trading desk.
          </h2>
          <p className="font-mono text-sm text-muted-foreground mb-16 max-w-xl">
            This is not a marketing agency. This is a technical system deployed to capture market share.
          </p>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* 4. VERTICALS */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-secondary/10">
        <h2 className="text-3xl md:text-4xl font-heading mb-16">
          Operational deployment zones.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border max-w-5xl">
          {/* V1 */}
          <div className="bg-background p-8 lg:p-12">
            <div className="font-mono text-primary text-xs tracking-widest uppercase mb-4">Target: Wine & Spirits</div>
            <p className="font-heading text-xl text-foreground mb-6">Reaching distributors and category managers across heavily regulated states.</p>
            <ul className="space-y-3 font-mono text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-foreground">›</span> Cross-referencing tier-3 licensing databases.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Mapping portfolio manager jurisdictions.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Signal detection on wholesale allocation updates.</li>
            </ul>
          </div>
          {/* V2 */}
          <div className="bg-background p-8 lg:p-12">
            <div className="font-mono text-primary text-xs tracking-widest uppercase mb-4">Target: Insurance</div>
            <p className="font-heading text-xl text-foreground mb-6">Routing carriers with immediate coverage needs to independent agencies.</p>
            <ul className="space-y-3 font-mono text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-foreground">›</span> Continuous monitoring of DOT and fleet registrations.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Live inbound transfers from proprietary web assets.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Programmatic direct mail triggered by renewals.</li>
            </ul>
          </div>
          {/* V3 */}
          <div className="bg-background p-8 lg:p-12">
            <div className="font-mono text-primary text-xs tracking-widest uppercase mb-4">Target: Factoring</div>
            <p className="font-heading text-xl text-foreground mb-6">Detecting capital requirements at the exact moment of contract award.</p>
            <ul className="space-y-3 font-mono text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-foreground">›</span> Instant ingestion of governmental award feeds (SAM.gov).</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> UCC lien tracking and corporate entity formation alerts.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Sub-second routing to human dialing teams.</li>
            </ul>
          </div>
          {/* V4 */}
          <div className="bg-background p-8 lg:p-12">
            <div className="font-mono text-primary text-xs tracking-widest uppercase mb-4">Target: SaaS</div>
            <p className="font-heading text-xl text-foreground mb-6">Timing outbound communications to strict ICP accounts undergoing structural change.</p>
            <ul className="space-y-3 font-mono text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-foreground">›</span> Monitoring tech stack delta via DNS/header analysis.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Executive hiring pattern detection.</li>
              <li className="flex gap-2"><span className="text-foreground">›</span> Funding event ingestion mapped to operational decay.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TELEMETRY / OUTPUT */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading mb-6">
              Total system visibility.
            </h2>
            <p className="font-mono text-sm text-muted-foreground mb-8 leading-relaxed">
              We do not provide aesthetic reports or vanity metrics. Client dashboards display strict operational telemetry: total signal yield, message delivery rates, localized conversion metrics, and hard pipeline booked. You buy a terminal that displays compounding revenue.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-border/50 pb-2 font-mono text-sm">
                <span className="text-muted-foreground">Cost per meeting</span>
                <span className="text-foreground">Tracked Live</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2 font-mono text-sm">
                <span className="text-muted-foreground">Pipeline generated</span>
                <span className="text-foreground">Attributed M/M</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2 font-mono text-sm">
                <span className="text-muted-foreground">Active delivery nodes</span>
                <span className="text-primary">100% HEALTH</span>
              </div>
            </div>
          </div>
          <div className="w-full">
            <SignalFeed />
          </div>
        </div>
      </section>

      {/* 6. THE GATE / CTA */}
      <section className="px-6 md:px-12 lg:px-24 py-32 bg-black flex flex-col items-center justify-center text-center">
        <div className="w-4 h-4 bg-primary mb-8 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading mb-8">
          Access the infrastructure.
        </h2>
        <p className="font-mono text-muted-foreground text-sm max-w-md mx-auto mb-10">
          This system is not for every company. It is expensive. It requires commitment. If you have the operational capacity to close qualified pipeline, apply for access.
        </p>
        <Button size="lg" className="h-14 px-8 font-mono text-sm uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-black transition-all duration-300 rounded-none shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
          Request Access
        </Button>
      </section>

      <footer className="px-6 md:px-12 py-8 border-t border-border flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
        <div>© {new Date().getFullYear()} Outbound Solutions. All processes engineered internally.</div>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </footer>
    </div>
  );
}
