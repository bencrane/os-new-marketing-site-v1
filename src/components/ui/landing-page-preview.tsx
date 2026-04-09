"use client";

import { useRef, useEffect, useState } from "react";

/* ─── Recreated landing page content (Chica Chida sample request page) ─── */

function LandingPageContent() {
  return (
    <div className="w-full bg-black text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* ── Hero ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 520 }}>
        {/* Background gradient to simulate hero imagery */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-black/60 to-black" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 30%, rgba(217,119,6,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Nav bar */}
        <div className="relative z-10 flex items-center justify-between px-8 py-5">
          <span className="text-lg font-bold tracking-widest uppercase text-amber-400">
            Chica Chida
          </span>
          <span className="text-[11px] tracking-widest uppercase text-white/60">
            Peanut Butter Spirit
          </span>
        </div>
        {/* Hero text */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 pt-16 pb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-6">
            Premium Peanut Butter Spirit
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.15] mb-6 max-w-xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your guests will
            <br />
            ask for it by name.
          </h1>
          <p className="text-sm text-white/60 max-w-md leading-relaxed">
            Get a free sample of the spirit that&rsquo;s transforming cocktail menus
            across the country. Find out why bartenders can&rsquo;t stop talking about it.
          </p>
        </div>
      </div>

      {/* ── Stats Bar ── */}
      <div className="w-full bg-amber-950/50 border-y border-amber-800/30">
        <div className="max-w-3xl mx-auto grid grid-cols-4 divide-x divide-amber-800/30">
          {[
            { value: "500+", label: "Venues" },
            { value: "$24.99", label: "SRP" },
            { value: "#1", label: "PB Spirit" },
            { value: "32%", label: "ABV" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-5">
              <span className="text-xl font-bold text-amber-400">{stat.value}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Your Menu Needs This ── */}
      <div className="max-w-2xl mx-auto px-8 py-16">
        <h2
          className="text-2xl font-bold text-center mb-10"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Why your menu needs this
        </h2>
        <div className="space-y-8">
          {[
            {
              title: "Guests already know it",
              desc: "Over 5M views on social. Your guests are searching for it. Put it on your menu before they ask.",
            },
            {
              title: "Versatile & profitable",
              desc: "Works in espresso martinis, old fashioneds, shots, and dessert cocktails. High margin, low waste, fast pours.",
            },
            {
              title: "Proven velocity",
              desc: "Venues report 2-3x reorder rates within 60 days. It moves fast because guests come back for it.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mt-0.5">
                <span className="text-amber-400 text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

      {/* ── Sample Request Form ── */}
      <div className="max-w-md mx-auto px-8 py-16">
        <h2
          className="text-2xl font-bold text-center mb-3"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Request a Free Sample
        </h2>
        <p className="text-sm text-white/50 text-center mb-10">
          Fill out the form below and we&rsquo;ll ship a sample directly to your venue.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
                First Name
              </label>
              <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
                John
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
                Last Name
              </label>
              <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
                Smith
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Work Email
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
              john@venue.com
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Phone
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
              (555) 000-0000
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              Venue Name
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
              The Copper Still
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
                Your Role
              </label>
              <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
                Bar Manager
              </div>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
                Venue Type
              </label>
              <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
                Restaurant & Bar
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.15em] uppercase text-white/40 mb-1.5">
              City &amp; State
            </label>
            <div className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-sm text-white/30">
              Denver, CO
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wide py-3.5 rounded transition-colors cursor-default"
          >
            Send Me A Sample
          </button>
        </div>

        <p className="text-[10px] text-white/30 text-center mt-6 leading-relaxed">
          Your information is only used to ship your sample. No spam, ever.
        </p>
      </div>

      {/* ── Footer ── */}
      <div className="w-full border-t border-white/10 py-8 text-center">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">
          © Chica Chida — Peanut Butter Spirit
        </span>
      </div>

      {/* Extra padding at the bottom so the scroll has a clean end */}
      <div className="h-16" />
    </div>
  );
}

/* ─── Scroll preview wrapper ─── */

export function LandingPagePreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastTime = 0;
    const SPEED = 30; // px per second

    function step(time: number) {
      if (!el) return;
      if (lastTime === 0) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused) {
        el.scrollTop += (SPEED * delta) / 1000;

        // Loop: when near bottom, reset to top smoothly
        const maxScroll = el.scrollHeight - el.clientHeight;
        if (el.scrollTop >= maxScroll - 1) {
          el.scrollTop = 0;
        }
      }

      animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused]);

  return (
    <div
      className="relative mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Browser chrome frame ── */}
      <div className="rounded-lg overflow-hidden border border-border/60 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-2.5 border-b border-border/40">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className="bg-[#0d0d0d] border border-border/30 rounded px-4 py-1 text-[10px] font-mono text-muted-foreground/60 max-w-sm w-full text-center truncate">
              drinkchicachida.com/sample
            </div>
          </div>
          <div className="w-[52px]" /> {/* spacer to balance traffic lights */}
        </div>

        {/* Scrolling viewport */}
        <div
          ref={scrollRef}
          className="overflow-hidden"
          style={{ height: 520 }}
        >
          <LandingPageContent />
        </div>
      </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute bottom-4 right-4 bg-black/80 border border-border/40 rounded px-3 py-1.5 text-[10px] font-mono text-muted-foreground/60 pointer-events-none">
          Hover to pause · scroll paused
        </div>
      )}
    </div>
  );
}
