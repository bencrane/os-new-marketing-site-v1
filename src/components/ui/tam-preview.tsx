"use client";

import { useState, useMemo } from "react";

interface Contact {
  name: string;
  title: string;
  company: string;
  industry: string;
  location: string;
}

const CONTACTS: Contact[] = [
  { name: "Marcus Bell", title: "Beverage Director", company: "The Commodore Hotel", industry: "Restaurants & Hospitality", location: "Nashville, TN" },
  { name: "Jessica Tran", title: "Bar Manager", company: "Velvet Room Cocktail Lounge", industry: "Restaurants & Hospitality", location: "Austin, TX" },
  { name: "David Okonkwo", title: "Director of Food & Beverage", company: "Peachtree Hospitality Group", industry: "Restaurants & Hospitality", location: "Atlanta, GA" },
  { name: "Rachel Kim", title: "General Manager", company: "The Copper Still", industry: "Restaurants & Hospitality", location: "Denver, CO" },
  { name: "Brian Morales", title: "Owner / Proprietor", company: "Morales Restaurant Group", industry: "Restaurants & Hospitality", location: "Miami, FL" },
  { name: "Sarah Whitfield", title: "Beverage Director", company: "Ironside Hospitality", industry: "Restaurants & Hospitality", location: "Chicago, IL" },
  { name: "Tyler Nguyen", title: "Bar Manager", company: "The Jade Fox", industry: "Restaurants & Hospitality", location: "Portland, OR" },
  { name: "Amanda Foster", title: "Director of Food & Beverage", company: "Lakeshore Resort & Spa", industry: "Restaurants & Hospitality", location: "Scottsdale, AZ" },
  { name: "James Patel", title: "General Manager", company: "Sage & Barrel", industry: "Restaurants & Hospitality", location: "Charleston, SC" },
  { name: "Catherine Reeves", title: "Owner / Proprietor", company: "Reeves Dining Co.", industry: "Restaurants & Hospitality", location: "New Orleans, LA" },
  { name: "Michael Brandt", title: "Beverage Director", company: "The Drifter Hotel", industry: "Restaurants & Hospitality", location: "Los Angeles, CA" },
  { name: "Lauren Casey", title: "Bar Manager", company: "Union Hall", industry: "Restaurants & Hospitality", location: "Brooklyn, NY" },
  { name: "Roberto Fuentes", title: "Director of Food & Beverage", company: "Paloma Hotel Group", industry: "Restaurants & Hospitality", location: "San Antonio, TX" },
  { name: "Nicole Adams", title: "General Manager", company: "The Twisted Olive", industry: "Restaurants & Hospitality", location: "Savannah, GA" },
  { name: "Patrick Doyle", title: "Owner / Proprietor", company: "Doyle's On Main", industry: "Restaurants & Hospitality", location: "Bozeman, MT" },
  { name: "Stephanie Lowe", title: "Beverage Director", company: "Grandview Hospitality", industry: "Restaurants & Hospitality", location: "Dallas, TX" },
  { name: "Chris Nakamura", title: "Bar Manager", company: "Midnight Rambler", industry: "Restaurants & Hospitality", location: "Minneapolis, MN" },
  { name: "Monica Reyes", title: "Director of Food & Beverage", company: "Harborview Hotels", industry: "Restaurants & Hospitality", location: "San Diego, CA" },
  { name: "Andrew Simmons", title: "General Manager", company: "The Green Lantern Tavern", industry: "Restaurants & Hospitality", location: "Philadelphia, PA" },
  { name: "Danielle Park", title: "Owner / Proprietor", company: "Park Avenue Kitchen & Bar", industry: "Restaurants & Hospitality", location: "Asheville, NC" },
  { name: "Eric Johansson", title: "Beverage Director", company: "The Standard Hotel", industry: "Restaurants & Hospitality", location: "Seattle, WA" },
  { name: "Megan Burke", title: "Bar Manager", company: "Lucky Strike Lounge", industry: "Restaurants & Hospitality", location: "Las Vegas, NV" },
  { name: "Anthony Russo", title: "General Manager", company: "Russo's Italian Kitchen", industry: "Restaurants & Hospitality", location: "Boston, MA" },
  { name: "Priya Sharma", title: "Director of Food & Beverage", company: "Meridian Club & Resort", industry: "Restaurants & Hospitality", location: "Scottsdale, AZ" },
  { name: "Kevin O'Brien", title: "Owner / Proprietor", company: "O'Brien's Public House", industry: "Restaurants & Hospitality", location: "Kansas City, MO" },
  { name: "Tiffany Huang", title: "Beverage Director", company: "Citrine Restaurant Group", industry: "Restaurants & Hospitality", location: "Houston, TX" },
  { name: "Derek Washington", title: "Bar Manager", company: "The Whiskey Jar", industry: "Restaurants & Hospitality", location: "Memphis, TN" },
  { name: "Julia Sandoval", title: "General Manager", company: "Sandoval Family Restaurants", industry: "Restaurants & Hospitality", location: "Phoenix, AZ" },
];

const INDUSTRY_OPTIONS = [
  { label: "All Industries", value: "" },
  { label: "Restaurants & Hospitality", value: "Restaurants & Hospitality" },
];

export function TamPreview() {
  const [titleSearch, setTitleSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const filtered = useMemo(() => {
    return CONTACTS.filter((c) => {
      if (titleSearch && !c.title.toLowerCase().includes(titleSearch.toLowerCase())) return false;
      if (industryFilter && c.industry !== industryFilter) return false;
      if (locationSearch && !c.location.toLowerCase().includes(locationSearch.toLowerCase())) return false;
      return true;
    });
  }, [titleSearch, industryFilter, locationSearch]);

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
        {filtered.length} record{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left px-5 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Name</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Title</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Company</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Location</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Industry</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((contact, i) => (
              <tr
                key={contact.name}
                className="border-b border-border/20 hover:bg-primary/[0.03] transition-colors"
              >
                <td className="px-5 py-2.5 text-foreground font-medium whitespace-nowrap">{contact.name}</td>
                <td className="px-4 py-2.5 text-foreground/80 whitespace-nowrap">{contact.title}</td>
                <td className="px-4 py-2.5 text-foreground/80 whitespace-nowrap">{contact.company}</td>
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.location}</td>
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.industry}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground/50">
                  No matching records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footnote */}
      <div className="px-5 py-4 border-t border-border/30">
        <p className="text-[10px] text-muted-foreground/50 italic leading-relaxed">
          This is a preview of the total addressable market configured for your engagement. Final targeting criteria are refined with your input before launch.
        </p>
      </div>
    </div>
  );
}
