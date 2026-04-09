"use client";

import { useRef, useState, useEffect } from "react";

/*
  Animation timeline (starts after scroll-reveal):
  0.0s  – form visible, fields empty
  0.8s  – First Name types in
  1.4s  – Last Name types in
  2.0s  – Email types in
  2.8s  – Phone types in
  3.6s  – button pulses / "pressed"
  4.2s  – screen transitions to confirmation page
*/

const FIELDS = [
  { label: "First Name", value: "Maria" },
  { label: "Last Name", value: "Gonzalez" },
  { label: "Work Email", value: "maria@yourvenue.com" },
  { label: "Phone", value: "(312) 847-2190" },
];

const FIELD_DELAYS = [800, 1400, 2000, 2800];
const BUTTON_PRESS_AT = 3600;
const TRANSITION_AT = 4200;

export function LandingPagePreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
      }}
    >
      <PhoneMockup animate={visible} />
    </div>
  );
}

/* ─── Phone mockup with animated form ─── */

function PhoneMockup({ animate }: { animate: boolean }) {
  // Track which fields have been "typed"
  const [filledCount, setFilledCount] = useState(0);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!animate) return;

    // Schedule each field fill
    FIELD_DELAYS.forEach((delay, i) => {
      timersRef.current.push(
        setTimeout(() => setFilledCount(i + 1), delay),
      );
    });

    // Button press
    timersRef.current.push(
      setTimeout(() => setButtonPressed(true), BUTTON_PRESS_AT),
    );

    // Transition to confirmation
    timersRef.current.push(
      setTimeout(() => setShowConfirmation(true), TRANSITION_AT),
    );

    return () => timersRef.current.forEach(clearTimeout);
  }, [animate]);

  return (
    <div className="flex justify-center">
      <div className="relative w-[360px] rounded-[44px] bg-[#1a1a1a] p-3.5 shadow-[0_0_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[130px] h-[30px] bg-[#1a1a1a] rounded-b-2xl z-20" />

        {/* Screen */}
        <div className="relative rounded-[32px] overflow-hidden bg-black">
          <StatusBar />

          {/* Page content area — crossfade between form and confirmation */}
          <div className="relative" style={{ minHeight: 520 }}>
            {/* Form page */}
            <div
              className="transition-all duration-500 ease-in-out"
              style={{
                opacity: showConfirmation ? 0 : 1,
                transform: showConfirmation ? "translateY(-12px)" : "translateY(0)",
                pointerEvents: showConfirmation ? "none" : "auto",
                position: showConfirmation ? "absolute" : "relative",
                inset: showConfirmation ? 0 : undefined,
              }}
            >
              <FormPage filledCount={filledCount} buttonPressed={buttonPressed} />
            </div>

            {/* Confirmation page */}
            {showConfirmation && (
              <div
                className="transition-all duration-500 ease-out"
                style={{
                  animation: "lp-confirm-in 500ms ease-out",
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
        @keyframes lp-confirm-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
  filledCount,
  buttonPressed,
}: {
  filledCount: number;
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
          {/* First / Last name row */}
          <div className="grid grid-cols-2 gap-2.5">
            <AnimatedField
              label={FIELDS[0].label}
              value={FIELDS[0].value}
              filled={filledCount >= 1}
              active={filledCount === 0}
            />
            <AnimatedField
              label={FIELDS[1].label}
              value={FIELDS[1].value}
              filled={filledCount >= 2}
              active={filledCount === 1}
            />
          </div>
          <AnimatedField
            label={FIELDS[2].label}
            value={FIELDS[2].value}
            filled={filledCount >= 3}
            active={filledCount === 2}
          />
          <AnimatedField
            label={FIELDS[3].label}
            value={FIELDS[3].value}
            filled={filledCount >= 4}
            active={filledCount === 3}
          />
        </div>

        {/* CTA */}
        <button
          type="button"
          className="w-full mt-5 py-3 rounded text-[10px] font-bold tracking-[0.15em] uppercase cursor-default transition-all duration-150"
          style={{
            background: buttonPressed
              ? "linear-gradient(135deg, #b8922e 0%, #9a7a22 100%)"
              : "linear-gradient(135deg, #d4a843 0%, #b8922e 100%)",
            color: "#000",
            transform: buttonPressed ? "scale(0.97)" : "scale(1)",
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
            background: "linear-gradient(135deg, rgba(212,168,67,0.15) 0%, rgba(212,168,67,0.05) 100%)",
            border: "1.5px solid rgba(212,168,67,0.3)",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a843" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
          Your free sample of Chica Chida is on its way. We&rsquo;ll reach
          out within 48 hours to confirm shipping details.
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

        {/* Timestamp */}
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

/* ─── Animated form field ─── */

function AnimatedField({
  label,
  value,
  filled,
  active,
}: {
  label: string;
  value: string;
  filled: boolean;
  active: boolean;
}) {
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!filled) {
      setDisplayText("");
      return;
    }

    // Type out the value character by character
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setDisplayText(value.slice(0, i));
      if (i >= value.length && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 35);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [filled, value]);

  return (
    <div>
      <label
        className="block text-[8px] font-bold tracking-[0.12em] uppercase mb-1"
        style={{ color: "#d4a843" }}
      >
        {label}
      </label>
      <div
        className="w-full rounded px-3 py-2 text-[10px] transition-all duration-200"
        style={{
          backgroundColor: active
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.04)",
          border: active
            ? "1px solid rgba(212,168,67,0.4)"
            : "1px solid rgba(255,255,255,0.1)",
          color: filled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.15)",
          minHeight: "28px",
        }}
      >
        {displayText || "\u00A0"}
        {/* Blinking cursor while typing */}
        {filled && displayText.length < value.length && (
          <span
            className="inline-block w-[1px] h-[10px] ml-px align-middle"
            style={{
              backgroundColor: "#d4a843",
              animation: "lp-cursor-blink 600ms step-end infinite",
            }}
          />
        )}
        {/* Cursor on active empty field */}
        {active && !filled && (
          <span
            className="inline-block w-[1px] h-[10px] align-middle"
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
