"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/*
  Scroll-driven animation. Progress 0→1 maps to:
  0.00–0.10  mockup pops in (scale + opacity)
  0.10–0.25  First Name fills
  0.25–0.40  Last Name fills
  0.40–0.60  Email fills
  0.60–0.75  Phone fills
  0.75–0.85  button press
  0.85–1.00  crossfade to confirmation

  Scrolling back up reverses everything.
*/

const FIELDS = [
  { label: "First Name", value: "Maria" },
  { label: "Last Name", value: "Gonzalez" },
  { label: "Work Email", value: "maria@yourvenue.com" },
  { label: "Phone", value: "(312) 847-2190" },
];

// Each field's [start, end] in the 0–1 progress range
const FIELD_RANGES: [number, number][] = [
  [0.10, 0.25],
  [0.25, 0.40],
  [0.40, 0.60],
  [0.60, 0.75],
];
const BUTTON_PRESS = 0.75;
const CONFIRM_START = 0.85;

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;

    // Progress goes 0→1 as the element travels from entering the
    // bottom of the viewport to its top edge reaching ~30% from top.
    // This gives a generous scroll range to scrub through the animation.
    const start = vh;          // element top enters bottom of viewport
    const end = vh * 0.15;     // element top reaches 15% from top
    const raw = (start - rect.top) / (start - end);
    setProgress(Math.max(0, Math.min(1, raw)));
  }, [ref]);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return progress;
}

export function LandingPagePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);

  // Pop-in: progress 0–0.10
  const popIn = Math.min(progress / 0.10, 1);

  return (
    <div
      ref={ref}
      style={{
        opacity: popIn,
        transform: `translateY(${(1 - popIn) * 40}px) scale(${0.97 + popIn * 0.03})`,
        transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
      }}
    >
      <PhoneMockup progress={progress} />
    </div>
  );
}

/* ─── Phone mockup ─── */

function PhoneMockup({ progress }: { progress: number }) {
  const buttonPressed = progress >= BUTTON_PRESS;
  const confirmProgress = progress >= CONFIRM_START
    ? Math.min((progress - CONFIRM_START) / (1 - CONFIRM_START), 1)
    : 0;
  const showConfirmation = confirmProgress > 0;

  return (
    <div className="flex justify-center">
      <div className="relative w-[360px] rounded-[44px] bg-[#1a1a1a] p-3.5 shadow-[0_0_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130px] h-[30px] bg-[#1a1a1a] rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="relative rounded-[32px] overflow-hidden bg-black">
          <StatusBar />

          <div className="relative" style={{ minHeight: 520 }}>
            {/* Form page */}
            <div
              style={{
                opacity: 1 - confirmProgress,
                transform: `translateY(${-confirmProgress * 12}px)`,
                transition: "opacity 0.15s, transform 0.15s",
                position: showConfirmation ? "absolute" : "relative",
                inset: showConfirmation ? 0 : undefined,
                pointerEvents: showConfirmation ? "none" : "auto",
              }}
            >
              <FormPage progress={progress} buttonPressed={buttonPressed} />
            </div>

            {/* Confirmation page */}
            {showConfirmation && (
              <div
                style={{
                  opacity: confirmProgress,
                  transform: `translateY(${(1 - confirmProgress) * 12}px)`,
                  transition: "opacity 0.15s, transform 0.15s",
                }}
              >
                <ConfirmationPage />
              </div>
            )}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2.5">
            <div className="w-[110px] h-[4px] rounded-full bg-white/20" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lp-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── Status bar ─── */

function StatusBar() {
  return (
    <div className="relative z-10 flex items-center justify-between px-7 pt-4 pb-1">
      <span className="text-[10px] text-white/50 font-medium">9:41</span>
      <div className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 20h2V8H2v12zm4 0h2V4H6v16zm4 0h2v-8h-2v8zm4 0h2V8h-2v12zm4 0h2V2h-2v18z" />
        </svg>
        <svg className="w-4 h-4 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        <svg className="w-4.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 24 24">
          <rect x="2" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="4" y="8" width="12" height="8" rx="0.5" />
          <rect x="21" y="10" width="2" height="4" rx="0.5" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Form page ─── */

function FormPage({
  progress,
  buttonPressed,
}: {
  progress: number;
  buttonPressed: boolean;
}) {
  return (
    <div className="px-0 pb-2" style={{ fontSize: "11px" }}>
      {/* Hero */}
      <div className="relative px-6 pt-7 pb-8 text-center">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 50% 20%, rgba(217,119,6,0.5) 0%, transparent 70%)",
          }}
        />
        <p
          className="relative text-[8px] tracking-[0.25em] uppercase mb-3"
          style={{ color: "#d4a843" }}
        >
          Premium Peanut Butter Spirit
        </p>
        <h1
          className="relative text-[24px] font-bold leading-[1.15] mb-3 text-white"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          YOUR GUESTS WILL
          <br />
          ASK FOR IT{" "}
          <span style={{ color: "#d4a843" }}>BY NAME.</span>
        </h1>
        <p className="relative text-[9px] text-white/50 leading-relaxed max-w-[250px] mx-auto">
          The peanut butter agave spirit that&rsquo;s turning heads and
          moving bottles. Try it free &mdash; on us.
        </p>
      </div>

      {/* Stats bar */}
      <div
        className="flex border-y"
        style={{
          borderColor: "rgba(212,168,67,0.2)",
          backgroundColor: "rgba(212,168,67,0.06)",
        }}
      >
        {[
          { value: "500+", label: "Venues" },
          { value: "#1", label: "PB Spirit" },
          { value: "32%", label: "ABV" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="flex-1 flex flex-col items-center py-3"
            style={{
              borderRight:
                i < 2 ? "1px solid rgba(212,168,67,0.2)" : "none",
            }}
          >
            <span
              className="text-[14px] font-bold"
              style={{ color: "#d4a843" }}
            >
              {stat.value}
            </span>
            <span className="text-[7px] tracking-[0.15em] uppercase text-white/40 mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form section */}
      <div className="px-6 pt-6 pb-4">
        <p
          className="text-[8px] tracking-[0.2em] uppercase mb-1"
          style={{ color: "#d4a843" }}
        >
          Free Sample
        </p>
        <h2
          className="text-[17px] font-bold leading-tight text-white mb-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          GET A BOTTLE
          <br />
          ON THE HOUSE
        </h2>
        <p className="text-[8.5px] text-white/45 leading-relaxed mb-5">
          Fill this out and we&rsquo;ll ship a complimentary sample to your
          venue. No obligations, no strings.
        </p>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2.5">
            <ScrollField
              label={FIELDS[0].label}
              value={FIELDS[0].value}
              progress={progress}
              range={FIELD_RANGES[0]}
              nextRange={FIELD_RANGES[1]}
            />
            <ScrollField
              label={FIELDS[1].label}
              value={FIELDS[1].value}
              progress={progress}
              range={FIELD_RANGES[1]}
              nextRange={FIELD_RANGES[2]}
            />
          </div>
          <ScrollField
            label={FIELDS[2].label}
            value={FIELDS[2].value}
            progress={progress}
            range={FIELD_RANGES[2]}
            nextRange={FIELD_RANGES[3]}
          />
          <ScrollField
            label={FIELDS[3].label}
            value={FIELDS[3].value}
            progress={progress}
            range={FIELD_RANGES[3]}
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          className="w-full mt-5 py-3 rounded text-[10px] font-bold tracking-[0.15em] uppercase cursor-default"
          style={{
            background: buttonPressed
              ? "linear-gradient(135deg, #b8922e 0%, #9a7a22 100%)"
              : "linear-gradient(135deg, #d4a843 0%, #b8922e 100%)",
            color: "#000",
            transform: buttonPressed ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.15s, background 0.15s",
          }}
        >
          Send Me A Free Sample &rarr;
        </button>

        <p className="text-[7px] text-white/25 text-center mt-3 leading-relaxed">
          We&rsquo;ll reach out within 48 hours. Must be 21+ with a valid
          liquor license.
        </p>
      </div>

      {/* Footer */}
      <div
        className="border-t px-6 py-3 text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="text-[7px] text-white/20 leading-relaxed">
          &copy; 2026 Chica Chida LLC, Englewood Cliffs, NJ
          <br />
          drinkchicachida.com
        </p>
      </div>
    </div>
  );
}

/* ─── Confirmation page ─── */

function ConfirmationPage() {
  return (
    <div className="px-0 pb-2" style={{ fontSize: "11px" }}>
      <div className="flex flex-col items-center justify-center px-8 pt-16 pb-12 text-center">
        {/* Checkmark */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(212,168,67,0.15) 0%, rgba(212,168,67,0.05) 100%)",
            border: "1.5px solid rgba(212,168,67,0.3)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d4a843"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p
          className="text-[8px] tracking-[0.25em] uppercase mb-3"
          style={{ color: "#d4a843" }}
        >
          Sample Requested
        </p>
        <h1
          className="text-[22px] font-bold leading-[1.2] mb-4 text-white"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          YOU&rsquo;RE ALL SET,
          <br />
          MARIA.
        </h1>
        <p className="text-[9px] text-white/50 leading-relaxed max-w-[240px] mx-auto mb-8">
          Your free sample of Chica Chida is on its way. We&rsquo;ll reach out
          within 48 hours to confirm shipping details.
        </p>

        {/* Summary card */}
        <div
          className="w-full rounded-lg px-5 py-4 text-left"
          style={{
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p className="text-[7px] tracking-[0.15em] uppercase text-white/30 mb-3">
            Submission Details
          </p>
          <div className="space-y-2">
            <SummaryRow label="Name" value="Maria Gonzalez" />
            <SummaryRow label="Email" value="maria@yourvenue.com" />
            <SummaryRow label="Phone" value="(312) 847-2190" />
          </div>
        </div>

        <p className="text-[7px] text-white/20 mt-5">
          Submitted April 8, 2026 at 2:14 PM
        </p>
      </div>

      {/* Footer */}
      <div
        className="border-t px-6 py-3 text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="text-[7px] text-white/20 leading-relaxed">
          &copy; 2026 Chica Chida LLC, Englewood Cliffs, NJ
          <br />
          drinkchicachida.com
        </p>
      </div>
    </div>
  );
}

/* ─── Scroll-driven form field ─── */

function ScrollField({
  label,
  value,
  progress,
  range,
  nextRange,
}: {
  label: string;
  value: string;
  progress: number;
  range: [number, number];
  nextRange?: [number, number];
}) {
  const [start, end] = range;
  const fieldProgress = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const charsToShow = Math.round(fieldProgress * value.length);
  const displayText = value.slice(0, charsToShow);
  const isFilling = fieldProgress > 0 && fieldProgress < 1;
  const isFilled = fieldProgress >= 1;

  // Active = we're in range for this field, or we're between previous end
  // and this field's start (cursor waiting)
  const isActive = isFilling || (progress >= start && progress < (nextRange ? nextRange[0] : BUTTON_PRESS) && !isFilled)
    || (progress < start && progress >= start - 0.02);

  // Show cursor if actively being filled OR waiting to be filled and is next
  const showCursor = isFilling || (progress >= start - 0.02 && progress < start);

  return (
    <div>
      <label
        className="block text-[8px] font-bold tracking-[0.12em] uppercase mb-1"
        style={{ color: "#d4a843" }}
      >
        {label}
      </label>
      <div
        className="w-full rounded px-3 py-2 text-[10px]"
        style={{
          backgroundColor: isActive || isFilling
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.04)",
          border: isActive || isFilling
            ? "1px solid rgba(212,168,67,0.4)"
            : "1px solid rgba(255,255,255,0.1)",
          color: charsToShow > 0
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.15)",
          minHeight: "28px",
          transition: "background-color 0.2s, border-color 0.2s, color 0.15s",
        }}
      >
        {displayText || "\u00A0"}
        {showCursor && (
          <span
            className="inline-block w-[1px] h-[10px] ml-px align-middle"
            style={{
              backgroundColor: "#d4a843",
              animation: "lp-cursor-blink 600ms step-end infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Confirmation summary row ─── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-[8px] text-white/30">{label}</span>
      <span className="text-[9px] text-white/70">{value}</span>
    </div>
  );
}
