"use client";

export function LandingPagePreview() {
  return (
    <div className="flex justify-center">
      {/* ── iPhone frame ── */}
      <div className="relative w-[320px] rounded-[40px] bg-[#1a1a1a] p-3 shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-[#1a1a1a] rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="relative rounded-[28px] overflow-hidden bg-black">
          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-4 pb-1">
            <span className="text-[9px] text-white/50 font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 20h2V8H2v12zm4 0h2V4H6v16zm4 0h2v-8h-2v8zm4 0h2V8h-2v12zm4 0h2V2h-2v18z" />
              </svg>
              <svg className="w-3.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg className="w-4 h-3 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="4" y="8" width="12" height="8" rx="0.5" />
                <rect x="21" y="10" width="2" height="4" rx="0.5" />
              </svg>
            </div>
          </div>

          {/* ── Page content (scaled to fit full page in view) ── */}
          <div className="px-0 pb-2" style={{ fontSize: "10px" }}>
            {/* Hero */}
            <div className="relative px-5 pt-6 pb-7 text-center">
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 50% 20%, rgba(217,119,6,0.5) 0%, transparent 70%)",
                }}
              />
              <p
                className="relative text-[7px] tracking-[0.25em] uppercase mb-3"
                style={{ color: "#d4a843" }}
              >
                Premium Peanut Butter Spirit
              </p>
              <h1
                className="relative text-[22px] font-bold leading-[1.15] mb-3 text-white"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                YOUR GUESTS WILL
                <br />
                ASK FOR IT{" "}
                <span style={{ color: "#d4a843" }}>BY NAME.</span>
              </h1>
              <p className="relative text-[8px] text-white/50 leading-relaxed max-w-[220px] mx-auto">
                The peanut butter agave spirit that&rsquo;s turning heads and
                moving bottles. Try it free &mdash; on us.
              </p>
            </div>

            {/* Stats bar */}
            <div className="flex border-y" style={{ borderColor: "rgba(212,168,67,0.2)", backgroundColor: "rgba(212,168,67,0.06)" }}>
              {[
                { value: "500+", label: "Venues" },
                { value: "#1", label: "PB Spirit" },
                { value: "32%", label: "ABV" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex-1 flex flex-col items-center py-2.5"
                  style={{ borderRight: i < 2 ? "1px solid rgba(212,168,67,0.2)" : "none" }}
                >
                  <span className="text-[13px] font-bold" style={{ color: "#d4a843" }}>
                    {stat.value}
                  </span>
                  <span className="text-[6px] tracking-[0.15em] uppercase text-white/40 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Form section */}
            <div className="px-5 pt-5 pb-3">
              <p
                className="text-[7px] tracking-[0.2em] uppercase mb-1"
                style={{ color: "#d4a843" }}
              >
                Free Sample
              </p>
              <h2
                className="text-[15px] font-bold leading-tight text-white mb-1.5"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                GET A BOTTLE
                <br />
                ON THE HOUSE
              </h2>
              <p className="text-[7.5px] text-white/45 leading-relaxed mb-4">
                Fill this out and we&rsquo;ll ship a complimentary sample to your
                venue. No obligations, no strings.
              </p>

              <div className="space-y-2.5">
                {/* First / Last name row */}
                <div className="grid grid-cols-2 gap-2">
                  <FormField label="First Name" value="Maria" />
                  <FormField label="Last Name" value="Gonzalez" />
                </div>
                <FormField label="Work Email" value="maria@yourvenue.com" />
                <FormField label="Phone" value="(555) 000-0000" />
              </div>

              {/* CTA */}
              <button
                type="button"
                className="w-full mt-4 py-2.5 rounded text-[9px] font-bold tracking-[0.15em] uppercase cursor-default"
                style={{
                  background: "linear-gradient(135deg, #d4a843 0%, #b8922e 100%)",
                  color: "#000",
                }}
              >
                Send Me A Free Sample &rarr;
              </button>

              <p className="text-[6px] text-white/25 text-center mt-2.5 leading-relaxed">
                We&rsquo;ll reach out within 48 hours. Must be 21+ with a valid liquor license.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t px-5 py-3 text-center" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-[6px] text-white/20 leading-relaxed">
                &copy; 2026 Chica Chida LLC, Englewood Cliffs, NJ
                <br />
                drinkchicachida.com
              </p>
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-[100px] h-[4px] rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label
        className="block text-[7px] font-bold tracking-[0.12em] uppercase mb-1"
        style={{ color: "#d4a843" }}
      >
        {label}
      </label>
      <div
        className="w-full rounded px-2.5 py-[7px] text-[9px] text-white/35"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
