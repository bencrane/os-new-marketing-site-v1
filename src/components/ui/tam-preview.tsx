"use client";

import { useState, useMemo } from "react";

interface Contact {
  name: string;
  title: string;
  company: string;
  companySize: string;
  location: string;
}

const CONTACTS: Contact[] = [
  { name: "Marcus Bell", title: "Beverage Director", company: "The Commodore Hotel", companySize: "51–200", location: "Nashville, TN" },
  { name: "Jessica Tran", title: "Bar Manager", company: "Velvet Room Cocktail Lounge", companySize: "11–50", location: "Austin, TX" },
  { name: "David Okonkwo", title: "Director of Food & Beverage", company: "Peachtree Hospitality Group", companySize: "201–500", location: "Atlanta, GA" },
  { name: "Rachel Kim", title: "General Manager", company: "The Copper Still", companySize: "11–50", location: "Denver, CO" },
  { name: "Brian Morales", title: "Owner / Proprietor", company: "Morales Restaurant Group", companySize: "51–200", location: "Miami, FL" },
  { name: "Sarah Whitfield", title: "Beverage Director", company: "Ironside Hospitality", companySize: "201–500", location: "Chicago, IL" },
  { name: "Tyler Nguyen", title: "Bar Manager", company: "The Jade Fox", companySize: "11–50", location: "Portland, OR" },
  { name: "Amanda Foster", title: "Director of Food & Beverage", company: "Lakeshore Resort & Spa", companySize: "501–1000", location: "Scottsdale, AZ" },
  { name: "James Patel", title: "General Manager", company: "Sage & Barrel", companySize: "11–50", location: "Charleston, SC" },
  { name: "Catherine Reeves", title: "Owner / Proprietor", company: "Reeves Dining Co.", companySize: "51–200", location: "New Orleans, LA" },
  { name: "Michael Brandt", title: "Beverage Director", company: "The Drifter Hotel", companySize: "51–200", location: "Los Angeles, CA" },
  { name: "Lauren Casey", title: "Bar Manager", company: "Union Hall", companySize: "11–50", location: "Brooklyn, NY" },
  { name: "Roberto Fuentes", title: "Director of Food & Beverage", company: "Paloma Hotel Group", companySize: "501–1000", location: "San Antonio, TX" },
  { name: "Nicole Adams", title: "General Manager", company: "The Twisted Olive", companySize: "11–50", location: "Savannah, GA" },
  { name: "Patrick Doyle", title: "Owner / Proprietor", company: "Doyle's On Main", companySize: "1–10", location: "Bozeman, MT" },
  { name: "Stephanie Lowe", title: "Beverage Director", company: "Grandview Hospitality", companySize: "201–500", location: "Dallas, TX" },
  { name: "Chris Nakamura", title: "Bar Manager", company: "Midnight Rambler", companySize: "11–50", location: "Minneapolis, MN" },
  { name: "Monica Reyes", title: "Director of Food & Beverage", company: "Harborview Hotels", companySize: "501–1000", location: "San Diego, CA" },
  { name: "Andrew Simmons", title: "General Manager", company: "The Green Lantern Tavern", companySize: "11–50", location: "Philadelphia, PA" },
  { name: "Danielle Park", title: "Owner / Proprietor", company: "Park Avenue Kitchen & Bar", companySize: "51–200", location: "Asheville, NC" },
  { name: "Eric Johansson", title: "Beverage Director", company: "The Standard Hotel", companySize: "201–500", location: "Seattle, WA" },
  { name: "Megan Burke", title: "Bar Manager", company: "Lucky Strike Lounge", companySize: "11–50", location: "Las Vegas, NV" },
  { name: "Anthony Russo", title: "General Manager", company: "Russo's Italian Kitchen", companySize: "51–200", location: "Boston, MA" },
  { name: "Priya Sharma", title: "Director of Food & Beverage", company: "Meridian Club & Resort", companySize: "501–1000", location: "Scottsdale, AZ" },
  { name: "Kevin O'Brien", title: "Owner / Proprietor", company: "O'Brien's Public House", companySize: "1–10", location: "Kansas City, MO" },
  { name: "Tiffany Huang", title: "Beverage Director", company: "Citrine Restaurant Group", companySize: "201–500", location: "Houston, TX" },
  { name: "Derek Washington", title: "Bar Manager", company: "The Whiskey Jar", companySize: "11–50", location: "Memphis, TN" },
  { name: "Julia Sandoval", title: "General Manager", company: "Sandoval Family Restaurants", companySize: "51–200", location: "Phoenix, AZ" },
];

const SIZE_OPTIONS = [
  { label: "All Sizes", value: "" },
  { label: "1–10", value: "1–10" },
  { label: "11–50", value: "11–50" },
  { label: "51–200", value: "51–200" },
  { label: "201–500", value: "201–500" },
  { label: "501–1000", value: "501–1000" },
];

export function TamPreview() {
  const [titleSearch, setTitleSearch] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const filtered = useMemo(() => {
    return CONTACTS.filter((c) => {
      if (titleSearch && !c.title.toLowerCase().includes(titleSearch.toLowerCase())) return false;
      if (sizeFilter && c.companySize !== sizeFilter) return false;
      if (locationSearch && !c.location.toLowerCase().includes(locationSearch.toLowerCase())) return false;
      return true;
    });
  }, [titleSearch, sizeFilter, locationSearch]);

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
        <div className="sm:w-40">
          <label className="block text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 mb-1.5">Company Size</label>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-border/50 rounded-sm px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
          >
            {SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
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
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium whitespace-nowrap">Company Size</th>
              <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70 font-medium">Location</th>
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
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.companySize}</td>
                <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">{contact.location}</td>
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
