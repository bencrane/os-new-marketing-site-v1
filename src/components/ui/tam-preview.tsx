"use client";

import { useState, useMemo } from "react";
import { CONTACTS, INDUSTRY_OPTIONS } from "@/data/piermont-leads";

const PAGE_SIZE = 25;

export function TamPreview() {
  const [titleSearch, setTitleSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    return CONTACTS.filter((c) => {
      if (titleSearch && !c.title.toLowerCase().includes(titleSearch.toLowerCase())) return false;
      if (industryFilter && c.industry !== industryFilter) return false;
      if (locationSearch && !c.location.toLowerCase().includes(locationSearch.toLowerCase())) return false;
      return true;
    });
  }, [titleSearch, industryFilter, locationSearch]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="w-full bg-[#0a0a0a] border border-border/60 rounded-sm font-mono text-xs shadow-[0_0_30px_rgba(16,185,129,0.03)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>TAM Preview</span>
          <span className="text-border/50">|</span>
          <span>Piermont Brands — On-Premise</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-medium">Live</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 px-5 py-4 border-b border-border/30">
        <div className="flex-1 min-w-0">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 mb-1.5">Title / Role</label>
          <input
            type="text"
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
            placeholder="e.g. beverage, bar manager"
            className="w-full bg-transparent border border-border/50 rounded-sm px-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 mb-1.5">Location</label>
          <input
            type="text"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            placeholder="e.g. nashville, TX"
            className="w-full bg-transparent border border-border/50 rounded-sm px-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="sm:w-52">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 mb-1.5">Industry</label>
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-border/50 rounded-sm px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
          >
            {INDUSTRY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="px-5 py-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
        {hasMore ? `Showing ${visibleCount} of ${filtered.length} records` : `${filtered.length} record${filtered.length !== 1 ? "s" : ""}`}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Name</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Title</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Company</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Company Size</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Location</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Industry</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((contact, i) => (
              <tr
                key={`${contact.name}-${contact.company}-${i}`}
                className="border-b border-border/20 hover:bg-primary/[0.03] transition-colors"
              >
                <td className="px-5 py-2.5 text-foreground font-medium whitespace-nowrap">{contact.name}</td>
                <td className="px-4 py-2.5 text-foreground/80 whitespace-nowrap">{contact.title}</td>
                <td className="px-4 py-2.5 text-foreground/80 whitespace-nowrap">{contact.company}</td>
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.companySize}</td>
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.location}</td>
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.industry}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted-foreground/50">
                  No matching records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show more */}
      {hasMore && (
        <div className="px-5 py-3 border-t border-border/20">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="text-[10px] uppercase tracking-[0.15em] text-primary hover:text-primary/80 font-medium transition-colors cursor-pointer"
          >
            Show more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Footnote */}
      <div className="px-5 py-4 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground/50 italic leading-relaxed">
          This is a preview of the total addressable market configured for your engagement. Final targeting criteria are refined with your input before launch.
        </p>
      </div>
    </div>
  );
}
