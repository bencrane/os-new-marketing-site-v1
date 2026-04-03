import { VerticalConfig } from "@/config/verticals";

export function VerticalHero({ data }: { data: VerticalConfig["hero"] }) {
  return (
    <section className="px-6 md:px-12 lg:px-24 pt-32 pb-24 border-b border-border/50">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase">
            {data.classification}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.1] text-foreground mb-8 whitespace-pre-line">
          {data.tension}
        </h1>
        <p className="font-mono text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
          {data.subtext}
        </p>
      </div>
    </section>
  );
}
