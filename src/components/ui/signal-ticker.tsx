import React from "react";

const ITEMS = [
  "LIQUOR_BOARD → NEW_WHOLESALE_LICENSE_FILED_FL",
  "FMCSA → CARRIER_AUTHORITY_GRANTED_14PU",
  "SAM_GOV → CONTRACT_AWARD_DOD_$2.4M",
  "TTB → COLA_APPROVED_AGAVE_SPIRIT",
  "LINKEDIN → VP_PROCUREMENT_HIRED",
  "STATE_SOS → NEW_LLC_FORMATION_DE",
  "FMCSA → INSURANCE_LAPSE_NO_REPLACEMENT",
  "LIQUOR_BOARD → DISTRIBUTION_LICENSE_RENEWAL_CA",
  "SAM_GOV → SBA_LOAN_DISBURSED_$890K",
  "LINKEDIN → BEVERAGE_DIRECTOR_APPOINTED",
  "FMCSA → FLEET_SIZE_12_TO_38_IN_90D",
  "TTB → LABEL_REGISTRATION_TEQUILA_REPOSADO",
  "STATE_SOS → ENTITY_DISSOLUTION_COMPETITOR"
];

export function SignalTicker() {
  return (
    <div className="w-full overflow-hidden bg-secondary/40 border-b border-border/50 py-3 flex">
      <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center">
        {ITEMS.map((item, i) => {
          const [source, rest] = item.split(" → ");
          return (
            <div key={i} className="flex items-center mx-8 font-mono text-[11px] md:text-xs">
              <span className="text-primary font-bold tracking-wider">{source}</span>
              <span className="text-muted-foreground mx-2">→</span>
              <span className="text-foreground tracking-wide">{rest}</span>
              <span className="text-border mx-8">·</span>
            </div>
          );
        })}
      </div>
      <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center" aria-hidden="true">
        {ITEMS.map((item, i) => {
          const [source, rest] = item.split(" → ");
          return (
            <div key={`dup-${i}`} className="flex items-center mx-8 font-mono text-[11px] md:text-xs">
              <span className="text-primary font-bold tracking-wider">{source}</span>
              <span className="text-muted-foreground mx-2">→</span>
              <span className="text-foreground tracking-wide">{rest}</span>
              <span className="text-border mx-8">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
