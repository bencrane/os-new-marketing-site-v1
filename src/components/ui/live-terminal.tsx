"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FEED_ITEMS = [
  "FMCSA → NEW_CARRIER_AUTHORITY_GRANTED → USDOT_39... → 12S AGO",
  "SAM_GOV → SBA_LOAN_DISBURSED_$890K → ID_92... → 24S AGO",
  "LIQUOR_BOARD → DISTRIBUTION_LICENSE_RENEWAL_CA → LIC_CA_... → 34S AGO",
  "LINKEDIN → VP_PROCUREMENT_HIRED → 400_500_EMP_BAND → 45S AGO",
  "STATE_SOS → NEW_LLC_FORMATION_DE → DELAWARE_CORP_... → 52S AGO",
  "TTB → COLA_APPROVED_AGAVE_SPIRIT → TX_REGION... → 59S AGO",
  "FMCSA → FLEET_SIZE_12_TO_38_IN_90D → USDOT_41... → 1M 02S AGO",
  "LINKEDIN → BEVERAGE_DIRECTOR_APPOINTED → HOSPITALITY_GRP... → 1M 15S AGO",
  "STATE_SOS → ENTITY_DISSOLUTION_COMPETITOR → NY_REGION... → 1M 28S AGO"
];

export function LiveTerminal() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Add first item immediately
    setItems([FEED_ITEMS[0]]);

    let currentIndex = 1;
    const interval = setInterval(() => {
      if (currentIndex < FEED_ITEMS.length) {
        setItems((prev) => [FEED_ITEMS[currentIndex], ...prev].slice(0, 6));
        currentIndex++;
      } else {
        // Loop randomly for endless feel
        const randomItem = FEED_ITEMS[Math.floor(Math.random() * FEED_ITEMS.length)];
        // Modify the timestamp to look fresh
        const parts = randomItem.split(" → ");
        parts[parts.length - 1] = "JUST NOW";
        setItems((prev) => [parts.join(" → "), ...prev].slice(0, 6));
      }
    }, 2500); // New item every 2.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] border border-border/50 rounded-lg overflow-hidden font-mono text-xs sm:text-sm flex flex-col h-[320px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-[#111]">
        <div className="flex items-center gap-2 text-muted-foreground uppercase tracking-wider text-[10px] sm:text-xs">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>Live Ingestion Stream</span>
        </div>
        <div className="text-primary uppercase tracking-wider text-[10px]">
          TX_RATE: 2.14GB/S <span className="opacity-50 mx-1">|</span> NODE: V-04
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 overflow-hidden relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10 pointer-events-none mt-32" />
        {items.map((item, i) => {
          if (!item) return null;
          const parts = item.split(" → ");
          return (
            <div 
              key={`${item}-${i}`} 
              className={cn(
                "flex items-start gap-2 break-all sm:break-normal transition-all duration-500",
                i === 0 ? "text-foreground opacity-100" : "text-muted-foreground opacity-60"
              )}
            >
              <span className="text-primary shrink-0">{parts[0]}</span>
              <span className="shrink-0 text-muted-foreground">→</span>
              <span className="text-foreground">{parts[1]}</span>
              <span className="shrink-0 text-muted-foreground">→</span>
              <span className="truncate">{parts[2]}</span>
              <span className="shrink-0 text-muted-foreground">→</span>
              <span className="shrink-0 text-muted-foreground ml-auto">{parts[3]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
