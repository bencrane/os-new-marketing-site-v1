"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const rawSignals = [
  { source: "LIQUOR_BOARD", type: "NEW_DISTRIBUTION_LICENSE", data: "FL_WHOLESALE_SPIRITS", time: "12s ago" },
  { source: "FMCSA", type: "NEW_CARRIER_AUTHORITY", data: "14_POWER_UNITS", time: "34s ago" },
  { source: "SAM_GOV", type: "CONTRACT_AWARD", data: "DOD_LOGISTICS_$2.4M", time: "1m ago" },
  { source: "STATE_SOS", type: "NEW_ENTITY_FILING", data: "DE_LLC_FORMATION", time: "2m ago" },
  { source: "LINKEDIN", type: "NEW_HIRE_SIGNAL", data: "VP_PROCUREMENT_APPOINTED", time: "4m ago" },
  { source: "TTB", type: "COLA_APPROVED", data: "AGAVE_SPIRIT_BLANCO", time: "6m ago" }
];

interface SignalData {
  id: number;
  source: string;
  type: string;
  data: string;
  time: string;
  isNew: boolean;
}

export function SignalFeed() {
  const [signals, setSignals] = useState<SignalData[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Initial population (empty or partial)
    // We'll let them flow in one by one to simulate live ingestion immediately.
    let currentCount = 0;
    
    const interval = setInterval(() => {
      const nextSignal = rawSignals[currentCount % rawSignals.length];
      
      setSignals(prev => {
        // Mark all existing as not new
        const aged = prev.map(p => ({ ...p, isNew: false }));
        // Add new one at the top, limit to 8
        return [
          { ...nextSignal, id: Date.now(), isNew: true },
          ...aged
        ].slice(0, 8);
      });
      
      currentCount++;
      setCounter(currentCount);
    }, 2500); // New signal every 2.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] border border-border/60 p-5 rounded-sm font-mono text-[11px] sm:text-xs shadow-[0_0_30px_rgba(16,185,129,0.03)] h-[280px] overflow-hidden relative">
      {/* Terminal Header */}
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-border/40">
        <div className="flex items-center gap-3 text-muted-foreground uppercase tracking-[0.2em] text-[10px]">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
          Live Ingestion Stream
        </div>
        <div className="text-primary/70 uppercase tracking-[0.2em] text-[10px] flex gap-2">
          <span>TX_RATE: 2.14GB/S</span>
          <span className="hidden sm:inline-block">|</span>
          <span className="hidden sm:inline-block text-foreground/50">NODE: V-04</span>
        </div>
      </div>

      {/* Feed Container */}
      <div className="flex flex-col gap-3 relative z-10 font-mono">
        {signals.length === 0 && (
          <div className="text-muted-foreground/40 animate-pulse mt-4">
            Awaiting socket connection...
          </div>
        )}
        
        {signals.map((signal, idx) => (
          <div
            key={signal.id}
            className={cn(
              "flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 transition-all duration-500",
              signal.isNew ? "opacity-100 translate-x-0" : "opacity-80 translate-x-0",
              idx > 4 ? "opacity-30" : "",
              idx > 6 ? "opacity-10" : ""
            )}
          >
            {/* Source */}
            <div className={cn(
              "w-28 shrink-0 uppercase tracking-wider transition-colors duration-500",
              signal.isNew ? "text-primary" : "text-muted-foreground"
            )}>
              {signal.source}
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block text-border/50 shrink-0">→</div>
            
            {/* Type */}
            <div className={cn(
              "w-56 shrink-0 uppercase transition-colors duration-500",
              signal.isNew ? "text-foreground" : "text-foreground/70"
            )}>
              {signal.type}
            </div>
            
            {/* Divider */}
            <div className="hidden sm:block text-border/50 shrink-0">→</div>
            
            {/* Data Point */}
            <div className="flex-1 truncate uppercase text-muted-foreground">
              {signal.data}
            </div>
            
            {/* Timestamp */}
            <div className={cn(
              "w-20 text-right shrink-0 uppercase transition-colors duration-500",
              signal.isNew ? "text-primary shadow-primary/20 drop-shadow-md" : "text-primary/60"
            )}>
              {signal.time}
            </div>
          </div>
        ))}
      </div>
      
      {/* Scanline / CRT effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      
      {/* Edge fading to hide bottom overflow cleanly */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
