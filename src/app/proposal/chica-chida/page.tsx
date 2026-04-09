"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { TamPreview } from "@/components/ui/tam-preview";

// ─── Static data ──────────────────────────────────────

const TARGET_ROLES = [
  "Beverage Director",
  "Director of Food & Beverage",
  "Bar Manager",
  "General Manager",
  "Owner / Proprietor",
];

const PHASES = [
  {
    id: "build",
    title: "Build",
    timeframe: "Weeks 1–3",
    description:
      "Everything that has to exist before a single outreach email is sent. Infrastructure, data, lists, copy, creative — all built from scratch during a 3-week onboarding period.",
    workstreams: [
      {
        title: "Infrastructure Setup",
        details:
          "We purchase and configure all email sending infrastructure. This includes [X] active inboxes hosted on Google and Microsoft, each on its own dedicated domain, with all DNS records (SPF, DKIM, DMARC) configured and manually verified. A full duplicate set of [X] backup inboxes is purchased, configured, and warmed simultaneously so they are ready to swap in immediately. Every inbox goes through a minimum two-week warmup period to build sender reputation before sending. Total domains under management: [X] across active and backup sets. All infrastructure costs are borne by us.",
      },
      {
        title: "Data Sourcing & List Building",
        details:
          "We build the complete target list from professional data providers. Contacts are sourced based on title, company type, location, venue size, and any other criteria aligned to your ideal accounts. We use a waterfall enrichment approach across multiple data providers — if the primary source returns an email that fails validation, we fall back to a second and third provider to maximize verified, deliverable addresses. Every email goes through a multi-step verification process: syntax and domain checks, SMTP-level mailbox verification, catch-all detection, disposable email filtering, spam trap screening, and role-based address flagging. Catch-all emails are separated into independent campaigns. Recipients with enterprise email security systems are identified via DNS lookup and deprioritized. All contact data is cleaned and normalized — company names formatted, titles rewritten to sound natural, junk records removed.",
      },
      {
        title: "Campaign Strategy & Copywriting",
        details:
          "We develop campaign positioning and write the email sequences. We test two campaign types: one driving toward a free sample request and one driving toward a booked meeting. Your team decides which to prioritize, or we run both and let the data determine which performs. Each campaign includes a multi-step sequence of 3 to 5 emails with all spintax variants written and reviewed by a human before launch.",
      },
      {
        title: "Creative Assets",
        details:
          "We build a branded landing page where recipients can submit their shipping details to receive a sample. Form submissions flow directly to a shared spreadsheet your team uses to manage fulfillment.",
      },
    ],
  },
  {
    id: "launch",
    title: "Launch",
    timeframe: "Ongoing",
    description:
      "Campaigns are live and generating conversations. This is the ongoing operational layer — volume, scheduling, rotation, reply triage, and lead handoff.",
    workstreams: [
      {
        title: "Campaign Execution",
        details:
          "We reach up to [X,000] contacts per month across your target market. Active infrastructure rotates on a monthly cycle — Group A sends month one, Group B sends month two. Send scheduling is matched to recipient time zones, Monday through Saturday, during business hours, with randomized daily send windows to avoid pattern detection. Campaigns are structured by lead category — verified emails and catch-all emails always run separately so each can be monitored and paused independently.",
      },
      {
        title: "Reply Management & Lead Handoff",
        details:
          "We monitor and triage every reply. Negative responses, out-of-office replies, wrong-person replies, and unsubscribe requests are filtered out and removed from future sends. Your team only sees warm leads. When a recipient responds positively, we reply and cc your team.",
      },
    ],
  },
  {
    id: "optimize",
    title: "Optimize",
    timeframe: "Continuous",
    description:
      "Continuous iteration on infrastructure health, copy performance, and targeting precision. Every week of live data makes the next week more effective.",
    workstreams: [
      {
        title: "Infrastructure Health",
        details:
          "Every domain\u2019s reply rate is tracked individually and compared against the campaign\u2019s overall average. If a domain underperforms on sufficient volume, it is flagged, retired, and replaced with a pre-warmed backup. A relay forwards any replies from the retired inbox to its replacement so no conversations are lost. All replacement costs are included.",
      },
      {
        title: "Copy Performance",
        details:
          "Reply rates and positive response rates are tracked by campaign, sequence step, and variant. If specific angles or phrasings outperform others, the sequence is adjusted accordingly. New variants are tested as the data justifies.",
      },
    ],
  },
];

const PRICING = [
  { name: "Build", price: "$5,000", frequency: "one-time" },
  { name: "Launch & Optimize", price: "$7,500/mo", frequency: "for 3 months" },
];

const APPENDIX = [
  {
    title: "Deliverability",
    faqs: [
      {
        q: "Why Google and Microsoft instead of SMTP?",
        a: "Generic SMTP providers may work for a few months, but after every major spam filter update, they burn out faster and with more variance than Google or Microsoft-hosted inboxes. We have seen this pattern repeatedly. Google and Microsoft accounts carry inherent sender reputation that SMTP does not.",
      },
      {
        q: "Why do you rotate inboxes monthly?",
        a: "Sending volume degrades domain reputation over time. By alternating between two sets \u2014 Group A sends month one, Group B sends month two \u2014 each set gets a full month of rest and warmup recovery before it sends again. This keeps deliverability consistent month over month instead of decaying.",
      },
      {
        q: "Why no open tracking?",
        a: "Open tracking works by embedding an invisible pixel in the email. That pixel is an image, and images in cold email are a spam signal. The data is also unreliable \u2014 privacy features in Apple Mail and Outlook inflate open rates with false positives. It hurts deliverability and the data it returns is not trustworthy. We measure what matters: replies.",
      },
      {
        q: "What happens when a domain underperforms?",
        a: "Each domain\u2019s reply rate is compared against the campaign average. If a domain is performing significantly below average on sufficient send volume, it gets flagged and retired. A pre-warmed backup is swapped in. A relay forwards any replies from the old inbox to the new one so no conversations are lost. There is no gap in volume and no cost to you.",
      },
    ],
  },
  {
    title: "Email Validation",
    faqs: [
      {
        q: "Why not trust the data provider\u2019s accuracy claims?",
        a: "Every data provider claims 90\u201395% email accuracy. In practice, real-world bounce rates on unvalidated lists run 10\u201320%. Across industries, roughly 1 in 5 email addresses in a typical database will not reach anyone. Email lists decay at 20\u201325% per year driven by job changes, company closures, and deactivated mailboxes. We validate independently, right before launch, every time.",
      },
      {
        q: "What is a catch-all email?",
        a: "A catch-all domain is configured to accept mail sent to any address, whether the specific mailbox exists or not. This makes standard verification useless for these domains because the server says \u201cvalid\u201d for everything. An estimated 30\u201340% of B2B email addresses sit on catch-all domains. We separate catch-all emails into their own campaigns so they can be monitored and paused independently without affecting verified sends.",
      },
      {
        q: "What is waterfall enrichment?",
        a: "No single data provider has complete or accurate coverage. We run contacts through multiple sources in sequence. If the primary provider returns an email that fails validation or comes back as catch-all, we fall back to a second and third provider. This maximizes the number of verified, deliverable addresses we extract from your target list and can sometimes resolve a catch-all address to verified status by cross-referencing across providers.",
      },
      {
        q: "What does the full verification process look like?",
        a: "Every email goes through: syntax and format check, domain and MX record validation, SMTP-level mailbox verification, greylisting retests for ambiguous responses, catch-all detection, disposable and temporary email filtering, spam trap screening, and role-based address flagging. Addresses that pass are classified as valid. Everything else is either removed or separated into monitored campaigns depending on the category.",
      },
    ],
  },
  {
    title: "Copywriting & Campaign Design",
    faqs: [
      {
        q: "Why plain text?",
        a: "HTML formatting, images, and embedded links are signals to spam filters that the email is a marketing blast. Plain text emails look like a real person typed them in Gmail. They pass spam filters at a higher rate, land in primary inboxes more often, and get more replies.",
      },
      {
        q: "What is spintax and why does it matter?",
        a: "Spintax means writing multiple variants of each sentence in an email so that no two outgoing messages are identical. If 5,000 people receive the same exact email, spam filters detect the pattern and start blocking it. With spintax, every email is unique. The catch is that AI-generated variants frequently produce awkward phrasing, so every variant is reviewed by a human before launch.",
      },
      {
        q: "Why does the offer matter more than personalization?",
        a: "Personalization can make a weak offer perform slightly better, but it will never be the reason a campaign scales. A great offer with zero personalization will outperform a mediocre offer with perfect personalization every time. The priority is always nailing what you are actually offering the recipient, not how cleverly you reference their LinkedIn bio.",
      },
    ],
  },
];

const TAM_SUMMARY = {
  total: 49_847,
  verified: 31_206,
  catchAll: 12_418,
  unverified: 6_223,
  regions: 14,
  avgCompanySize: "12–85 employees",
};

const TAM_BY_ROLE = [
  { role: "General Manager", count: 18_432, pct: 37 },
  { role: "Owner / Proprietor", count: 12_961, pct: 26 },
  { role: "Bar Manager", count: 8_472, pct: 17 },
  { role: "Beverage Director", count: 5_983, pct: 12 },
  { role: "Director of Food & Beverage", count: 3_999, pct: 8 },
];

const TAM_BY_REGION = [
  { region: "California", count: 7_284 },
  { region: "New York", count: 6_102 },
  { region: "Texas", count: 4_891 },
  { region: "Florida", count: 4_517 },
  { region: "Illinois", count: 3_208 },
  { region: "Georgia", count: 2_764 },
  { region: "Nevada", count: 2_341 },
  { region: "Arizona", count: 2_187 },
  { region: "Colorado", count: 2_011 },
  { region: "Massachusetts", count: 1_876 },
  { region: "Pennsylvania", count: 1_692 },
  { region: "Washington", count: 1_543 },
  { region: "Oregon", count: 1_284 },
  { region: "Other", count: 8_147 },
];

const TAM_SAMPLE_LEADS = [
  { name: "M. Torres", title: "Beverage Director", company: "The Rooftop Collective", city: "Austin, TX", status: "verified" as const },
  { name: "J. Whitfield", title: "General Manager", company: "Harbor House Kitchen", city: "San Diego, CA", status: "verified" as const },
  { name: "R. Nakamura", title: "Bar Manager", company: "Velvet Room Lounge", city: "Portland, OR", status: "verified" as const },
  { name: "S. Patel", title: "Owner / Proprietor", company: "Indigo Spirits & Wine", city: "Miami, FL", status: "catch-all" as const },
  { name: "K. O'Brien", title: "Director of Food & Bev", company: "The Grand Hotel", city: "Chicago, IL", status: "verified" as const },
  { name: "D. Vasquez", title: "Beverage Director", company: "Meridian Restaurant Group", city: "Denver, CO", status: "verified" as const },
  { name: "L. Chen", title: "General Manager", company: "Pacific Rim Dining", city: "San Francisco, CA", status: "verified" as const },
  { name: "A. Williams", title: "Bar Manager", company: "Copperhead Taproom", city: "Nashville, TN", status: "catch-all" as const },
  { name: "E. Rodriguez", title: "Owner / Proprietor", company: "Casa Bonita Cantina", city: "Phoenix, AZ", status: "verified" as const },
  { name: "T. Jameson", title: "General Manager", company: "Elevate Social Club", city: "Atlanta, GA", status: "verified" as const },
  { name: "N. Kowalski", title: "Beverage Director", company: "Liberty Hospitality", city: "Philadelphia, PA", status: "verified" as const },
  { name: "C. Dumont", title: "Bar Manager", company: "The Alchemist Bar", city: "Brooklyn, NY", status: "verified" as const },
];

const PROJECTION = [
  { label: "Meetings / Month", value: "30" },
  { label: "Pilot Duration", value: "3 months" },
  { label: "Total Conversations", value: "90" },
  { label: "Close Rate", value: "20\u201330%" },
  { label: "New Accounts", value: "18\u201327" },
  { label: "New Revenue", value: "$13K\u2013$39K" },
];

// ─── Page component ───────────────────────────────────

export default function ChicaChidaProposal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [introPhase, setIntroPhase] = useState<"visible" | "fading" | "done">("visible");
  const router = useRouter();

  /* Intro splash timing */
  useEffect(() => {
    const fadeTimer = setTimeout(() => setIntroPhase("fading"), 1800);
    const doneTimer = setTimeout(() => setIntroPhase("done"), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  /* Canvas resize */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = 160;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* Drawing helpers */
  const getCtx = () => canvasRef.current?.getContext("2d");

  const startDrawing = (x: number, y: number) => {
    setDrawing(true);
    setHasSigned(true);
    const ctx = getCtx();
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (x: number, y: number) => {
    if (!drawing) return;
    const ctx = getCtx();
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = "#f4f4f5";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  };

  const stopDrawing = () => setDrawing(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) startDrawing(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!drawing) return;
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) draw(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const clearSig = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasSigned(false);
    }
  };

  const canSubmit = hasSigned && signerName.trim() && signerEmail.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    // API call skipped for now
    router.push("/proposal/chica-chida/confirmed");
  };

  return (
    <>
      {/* ─── Intro splash ─── */}
      {introPhase !== "done" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700"
          style={{ opacity: introPhase === "fading" ? 0 : 1 }}
        >
          <div className="flex flex-col items-center gap-3 px-6">
            <span className="font-heading text-2xl md:text-4xl font-semibold tracking-tight">
              Outbound Solutions
            </span>
            <span className="text-primary font-mono text-base md:text-lg">
              x
            </span>
            <span className="font-heading text-2xl md:text-4xl font-semibold tracking-tight">
              Chica Chida
            </span>
          </div>
        </div>
      )}

      <div
        className="max-w-3xl mx-auto px-6 py-16 md:py-24 transition-opacity duration-700"
        style={{ opacity: introPhase === "done" ? 1 : 0 }}
      >
      {/* ─── Hero ─── */}
      <header className="text-center pb-12 border-b border-border/50 mb-16">
        <div className="inline-flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground border border-border rounded-full px-4 py-1.5 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Confidential
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight mb-3">
          Outbound Partnership Proposal
        </h1>
        <p className="font-heading text-lg md:text-xl text-muted-foreground italic mb-10">
          Dedicated Outbound Pipeline for On-Premise Growth
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-mono">
          <span>
            Prepared for{" "}
            <span className="font-semibold">Chica Chida</span>
          </span>
          <span className="text-border">|</span>
          <span>April 2026</span>
        </div>
      </header>

      {/* ─── 01 Executive Summary ─── */}
      <Section number="01" title="Executive Summary">
        <p>
          This proposal outlines the GTM strategy to put Chica Chida in front of
          thousands of on-premise decision makers each month, growing the
          brand&apos;s footprint across net-new accounts in a way that is
          scaleable, cost-efficient, and difficult for competitors to imitate.{" "}
          <strong className="font-semibold">
            The goal is to put Chica Chida on the bar in every market you enter.
          </strong>
        </p>
      </Section>

      {/* ─── 02 The Opportunity ─── */}
      <Section number="02" title="The Opportunity">
        <p>
          Chica Chida is approaching one million bottles sold this year. The
          product sells itself once someone tastes it. The tequila espresso
          martini made with Chica Chida has gone viral on TikTok and Instagram.
          Caleb Pressley gives the brand reach that most spirits companies at
          your stage do not have.{" "}
          <strong className="font-semibold">
            The constraint is not demand. It is discovery.
          </strong>
        </p>
      </Section>

      {/* ─── 03 The Assessment ─── */}
      <Section number="03" title="The Assessment">
        <p>
          Three people, including two co-founders, are responsible for the bulk
          of new business development. In practice, that means flying to a new
          city, renting a car, and driving bar to bar trying to find places
          willing to carry the product. The hard costs of a single trip are in
          the low thousands. The opportunity cost of two founders spending days
          on the road instead of running the business is harder to measure but
          significantly higher.
        </p>
        <p>
          Reps at major distributors like Southern carry hundreds of brands and
          allocate their time accordingly. Your brand competes for their
          attention alongside every other bottle in their portfolio.
        </p>
        <p>
          Hiring a full-time sales representative runs $8&ndash;10K per month
          fully loaded. That person still needs to source their own leads, set up
          their own email infrastructure, manage their own deliverability, and at
          best sends a few dozen emails a day manually. Whether they generate a
          single meeting or not, you pay the same. Paid advertising to generate
          booked B2B meetings runs $2&ndash;3K per meeting. Both are viable
          paths.
        </p>
        <p>
          Our system sends [X,000] emails per month from engineered
          infrastructure with full visibility into what is working, what is not,
          and why. More pipeline, lower cost per meeting, full performance
          visibility &mdash; and this scales without adding headcount.
        </p>
      </Section>

      {/* ─── 04 Our Approach ─── */}
      <Section number="04" title="Our Approach">
        <p>
          We are an engineering firm. We build dedicated sending infrastructure,
          proprietary data pipelines, and campaign systems designed to test
          offers and iterate at speed. Every variable &mdash; copy, audience
          segment, send timing, domain health &mdash; is measurable and tunable.
          The firms that win at outbound are the ones that can launch, test, and
          adapt faster than anyone else. That is what we built.
        </p>
      </Section>

      {/* ─── 05 The Market ─── */}
      <Section number="05" title="The Market">
        <p>
          The people who matter for Chica Chida on-premise are the ones who
          decide what goes on the bar and what goes on the menu. At regional
          chains and independent venues, that is usually the same person &mdash;
          and they are reachable by email.
        </p>
        <p>
          There are approximately{" "}
          <span className="font-mono font-medium">50,000</span>{" "}
          people working in roles with direct authority over beverage purchasing
          and menu selection at restaurants, bars, and hotel and hospitality
          establishments in the United States.
        </p>

        <div className="mt-10 w-[100vw] max-w-5xl relative left-1/2 -translate-x-1/2 px-6">
          <TamPreview />
        </div>
      </Section>

      {/* ─── TAM Dashboard ─── */}
      <div className="my-4 w-[100vw] max-w-5xl relative left-1/2 -translate-x-1/2 px-6">
        <TAMDashboard />
      </div>

      {/* ─── 06 The Offer ─── */}
      <Section number="06" title="The Offer">
        <p>
          The single highest-leverage variable in any outbound campaign is the
          offer &mdash; what you are actually putting in front of the recipient.
          The best offers give something of value with no friction. The worst
          ones ask for time, commitment, or a decision the recipient is not ready
          to make. A free sample of a product that has gone viral, sent directly
          to someone whose job is to evaluate new spirits &mdash; that is one of
          the strongest offers you can put in an outbound campaign. Most
          campaigns do not have an offer this good. We expect strong performance.
        </p>
        <p>
          The system accommodates multiple campaign types running in parallel
          &mdash; different offers, different segments, different asks. The best
          version of this is one where every conversation ends with a new account
          eager to carry Chica Chida on premise. Getting the product into their
          hands before that conversation happens makes that outcome more likely.
          Our job is to make that possible at scale and at a cost that makes
          sense. Over time, as we develop greater insight into which accounts
          convert at the highest rate, we refine targeting further to reduce cost
          per placement and increase yield.
        </p>
        <p>
          At{" "}
          <span className="font-mono font-medium">
            $30 per box
          </span>
          , it is the most economical way to get the brand tasted by the people
          who decide what goes on the bar. No one knows in advance which accounts
          will order the most. The sample removes the guesswork.
        </p>
      </Section>

      {/* ─── 07 The Math ─── */}
      <Section number="07" title="The Math">
        <p>
          We start at 30,000 contacts per month. At a 1&ndash;3% positive
          response rate, that produces approximately 300&ndash;900 warm leads per month
          &mdash; prospects who have either requested a sample or agreed to a
          meeting. Even accounting for seasonality, purchasing cycles, and the
          realities of on-premise buying decisions, that translates to meaningful
          booked meetings per month at an effective cost per meeting well below
          what any comparable channel can deliver.
        </p>
        <p>
          Our infrastructure has capacity to reach{" "}
          <span className="font-mono font-medium">50,000+</span>{" "}
          contacts per month at no additional cost to you. Whether we scale to
          that depends on one thing: your team&apos;s ability to handle the
          volume of qualified leads we generate. We start at 10,000 to calibrate.
          If your team has the bandwidth to take more meetings, we turn it up.
        </p>
        {/* Projection grid */}
        <div className="mt-8">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Pilot Projection &mdash; 3 Months
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PROJECTION.map((m) => (
              <div
                key={m.label}
                className="border border-border rounded-lg p-4"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
                  {m.label}
                </div>
                <div className="text-xl font-heading font-semibold">
                  {m.value}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            These numbers depend entirely on your team&apos;s ability to follow
            up quickly, take the calls, and close.
          </p>
        </div>
      </Section>

      {/* ─── 08 The Engagement ─── */}
      <Section number="08" title="The Engagement">
        <p className="font-heading text-lg italic text-muted-foreground !-mt-2 mb-8">
          Build. Launch. Optimize.
        </p>

        <p className="!mb-10">
          This engagement begins with a 3-week build phase, followed by a
          90-day campaign period. During the build phase, inboxes will be set
          up, campaign copy will be approved, and creative assets will be
          produced.
        </p>

        <div className="space-y-6">
          {PHASES.map((phase) => (
            <div
              key={phase.id}
              className="border border-border rounded-lg overflow-hidden"
            >
              {/* Phase header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-3">
                  <span className="text-primary font-mono text-lg font-medium uppercase tracking-wider">
                    {phase.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-widest">
                  {phase.timeframe}
                </span>
              </div>

              {/* Phase description */}
              <div className="px-6 pt-4 pb-2">
                <p className="text-[15px] text-foreground/70 leading-relaxed">
                  {phase.description}
                </p>
              </div>

              {/* Workstreams */}
              <div className="px-6 pb-4">
                <Accordion>
                  {phase.workstreams.map((ws, i) => (
                    <AccordionItem key={i} value={i}>
                      <AccordionTrigger className="text-lg font-medium text-foreground">
                        {ws.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-[15px] text-foreground/70 leading-relaxed pr-6">
                          {ws.details}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── 09 Pricing & Terms ─── */}
      <Section number="09" title="Pricing & Terms">
        <p>One flat investment. No per-lead fees. No hidden costs.</p>

        <div className="border border-border rounded-lg overflow-hidden">
          {PRICING.map((phase, i) => (
            <div key={i} className="flex items-baseline justify-between px-6 py-5 border-b border-border">
              <h3 className="font-heading text-lg font-semibold">{phase.name}</h3>
              <div className="flex items-baseline gap-2 shrink-0">
                <span className="font-mono text-lg text-primary font-medium">{phase.price}</span>
                <span className="text-xs font-mono text-muted-foreground">{phase.frequency}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between px-6 py-5 bg-primary/5">
            <span className="font-heading text-lg font-semibold">Total</span>
            <span className="font-mono text-2xl text-primary font-medium">$27,500</span>
          </div>
          <div className="px-6 py-3 border-t border-border/50">
            <p className="text-[13px] text-muted-foreground">The full amount is due at kickoff.</p>
          </div>
        </div>
      </Section>

      {/* ─── 10 Your Role ─── */}
      <Section number="10" title="Your Role">
        <p className="font-heading text-lg italic text-muted-foreground !-mt-2 mb-6">
          Take the meetings. Send the samples. Build the relationships.
        </p>
        <p>
          We handle everything upstream &mdash; infrastructure, data, list
          building, validation, copy, sending, deliverability, reply triage.
          Your team only sees warm leads. When a prospect responds positively,
          we reply, confirm interest, and direct them to a landing page to
          submit their information for a sample. Once submitted, your team is
          notified and the lead is yours.
        </p>
        <p>
          Your team needs to be ready to fulfill samples at volume. Have
          inventory allocated and a process to ship within a few days of a
          request coming in. Speed matters &mdash; a sample that arrives while
          the conversation is fresh converts better than one that shows up
          three weeks later.
        </p>
        <p>
          After a sample ships, the lead is tagged in our platform with status
          and timestamp. Your team can filter by leads who have been sent samples
          and follow up accordingly &mdash; whether that is a check-in email, a
          call, or looping in your distributor. We can also automate a follow-up
          sequence after a sample ships, checking in with the prospect at a
          cadence you define.
        </p>
        <div className="mt-6 border border-border rounded-lg p-5 bg-secondary/20 text-[15px] text-foreground/70 leading-relaxed">
          In the event volume exceeds your capacity or budget for samples, we can
          pause campaigns and tighten segmentation to narrow the funnel. If
          campaigns are paused at your request, the monthly retainer remains in
          effect.
        </div>
      </Section>

      {/* ─── Signature ─── */}
      <section className="pb-16 mb-16 border-b border-border/50">
        <span className="block text-[10px] font-mono text-primary tracking-[0.2em] uppercase mb-4">
          Agreement
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">Signature</h2>

        {/* Signer details */}
        <div className="border border-border rounded-lg p-6 mb-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Your Details
          </div>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Full name"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              className="flex-1 bg-secondary/50 border border-border rounded px-3.5 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <input
            type="email"
            placeholder="Email address"
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded px-3.5 py-2.5 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
          />
          <p className="text-xs text-muted-foreground mt-3">
            A copy of this signed agreement will be sent to the email provided.
          </p>
        </div>

        {/* Signature pad */}
        <div className="border border-border rounded-lg p-6 mb-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Sign Below
          </div>
          <div className="border border-border rounded overflow-hidden relative mb-4">
            <canvas
              ref={canvasRef}
              className="block w-full cursor-crosshair"
              style={{ height: 160 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={stopDrawing}
            />
            {!hasSigned && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40 text-sm font-mono pointer-events-none">
                Sign here
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={clearSig}
              className="text-sm text-muted-foreground hover:text-foreground font-mono transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="bg-primary text-primary-foreground font-mono text-sm font-medium px-6 py-2.5 rounded hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Submitting..." : "Submit Agreement"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Payment instructions will be presented on the next page.
        </p>
      </section>

      {/* ─── Appendix ─── */}
      <section className="pb-16">
        <span className="block text-[10px] font-mono text-primary tracking-[0.2em] uppercase mb-4">
          Appendix
        </span>
        <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">
          Technical Reference
        </h2>

        <div className="space-y-8">
          {APPENDIX.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-mono font-medium uppercase tracking-wider text-foreground mb-4">
                {category.title}
              </h3>
              <Accordion>
                {category.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={i}>
                    <AccordionTrigger className="text-sm text-foreground font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground leading-relaxed pr-6">
                        {faq.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}

// ─── TAM Dashboard ───────────────────────────────────

function TAMDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "records" | "geography">("overview");

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "records" as const, label: "Sample Records" },
    { id: "geography" as const, label: "Geography" },
  ];

  return (
    <section className="pb-16 mb-16 border-b border-border/50">
      {/* Dashboard container */}
      <div className="bg-[#0a0a0a] border border-border/60 rounded-sm overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.04)] relative">
        {/* Corner decorations */}
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-primary/20" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-primary/20" />

        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              TAM Preview
            </span>
            <span className="text-border/60">|</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary/70">
              Chica Chida — On-Premise
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-slow" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              Live
            </span>
          </div>
        </div>

        {/* Summary stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border/40">
          {[
            { label: "Total Contacts", value: TAM_SUMMARY.total.toLocaleString() },
            { label: "Verified Emails", value: TAM_SUMMARY.verified.toLocaleString(), accent: true },
            { label: "Catch-All", value: TAM_SUMMARY.catchAll.toLocaleString() },
            { label: "Regions", value: TAM_SUMMARY.regions.toString() },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-6 py-5 border-r border-b md:border-b-0 border-border/20 last:border-r-0"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                {stat.label}
              </div>
              <div className={`font-mono text-2xl font-medium ${stat.accent ? "text-primary" : "text-foreground"}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-border/40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "text-primary border-b border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "overview" && <TAMOverviewTab />}
          {activeTab === "records" && <TAMRecordsTab />}
          {activeTab === "geography" && <TAMGeographyTab />}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border/30 flex items-center justify-between">
          <span className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest">
            Data sourced from 3 providers · Waterfall enrichment · Last sync 2m ago
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/40 uppercase tracking-widest">
            v2.4.1
          </span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4 italic">
        This is a preview of the total addressable market configured for your
        engagement. Final targeting criteria are refined with your input before
        launch.
      </p>
    </section>
  );
}

function TAMOverviewTab() {
  return (
    <div className="space-y-8">
      {/* Role distribution */}
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Distribution by Role
        </div>
        <div className="space-y-3">
          {TAM_BY_ROLE.map((item) => (
            <div key={item.role} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-xs text-foreground/80">{item.role}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {item.count.toLocaleString()}
                  <span className="text-muted-foreground/50 ml-2">{item.pct}%</span>
                </span>
              </div>
              <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/60 rounded-full transition-all duration-700"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Verified", value: TAM_SUMMARY.verified.toLocaleString(), pct: "62.6%", color: "text-primary", dot: "bg-primary" },
          { label: "Catch-All", value: TAM_SUMMARY.catchAll.toLocaleString(), pct: "24.9%", color: "text-yellow-500", dot: "bg-yellow-500" },
          { label: "Pending Validation", value: TAM_SUMMARY.unverified.toLocaleString(), pct: "12.5%", color: "text-muted-foreground", dot: "bg-muted-foreground" },
        ].map((item) => (
          <div key={item.label} className="border border-border/30 rounded-sm p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </span>
            </div>
            <div className={`font-mono text-xl font-medium ${item.color}`}>
              {item.value}
            </div>
            <div className="font-mono text-[10px] text-muted-foreground/50 mt-0.5">
              {item.pct} of total
            </div>
          </div>
        ))}
      </div>

      {/* Quick filters preview */}
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Active Filters
        </div>
        <div className="flex flex-wrap gap-2">
          {["On-Premise Only", "Verified + Catch-All", "United States", "All Target Roles", "Independent & Regional"].map((filter) => (
            <span
              key={filter}
              className="font-mono text-[10px] px-3 py-1.5 border border-border/40 rounded-sm text-foreground/60 bg-secondary/30"
            >
              {filter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TAMRecordsTab() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Sample Records — showing 12 of {TAM_SUMMARY.total.toLocaleString()}
        </div>
        <div className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest">
          Names anonymized
        </div>
      </div>

      <div className="border border-border/30 rounded-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1.2fr_1.4fr_1fr_80px] gap-px bg-border/20">
          {["Contact", "Title", "Company", "Location", "Status"].map((h) => (
            <div key={h} className="bg-secondary/40 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
              {h}
            </div>
          ))}
        </div>

        {/* Table rows */}
        <div className="divide-y divide-border/20">
          {TAM_SAMPLE_LEADS.map((lead, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_1.2fr_1.4fr_1fr_80px] gap-px hover:bg-primary/[0.02] transition-colors"
            >
              <div className="px-4 py-3 font-mono text-xs text-foreground/80 truncate">
                {lead.name}
              </div>
              <div className="px-4 py-3 font-mono text-xs text-foreground/60 truncate">
                {lead.title}
              </div>
              <div className="px-4 py-3 font-mono text-xs text-foreground/60 truncate">
                {lead.company}
              </div>
              <div className="px-4 py-3 font-mono text-xs text-muted-foreground truncate">
                {lead.city}
              </div>
              <div className="px-4 py-3">
                <span className={`font-mono text-[9px] uppercase tracking-wider ${
                  lead.status === "verified" ? "text-primary" : "text-yellow-500"
                }`}>
                  {lead.status === "verified" ? "✓ Verified" : "~ Catch-All"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="font-mono text-[10px] text-muted-foreground/50">
          Full list available at engagement kickoff
        </p>
        <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground/40">
          <span className="px-2 py-1 border border-border/20 rounded-sm">1</span>
          <span className="px-2 py-1">2</span>
          <span className="px-2 py-1">3</span>
          <span className="px-2 py-1">...</span>
          <span className="px-2 py-1">4,154</span>
        </div>
      </div>
    </div>
  );
}

function TAMGeographyTab() {
  const maxCount = Math.max(...TAM_BY_REGION.map((r) => r.count));

  return (
    <div className="space-y-6">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Contacts by State
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        {TAM_BY_REGION.map((item) => (
          <div key={item.region} className="flex items-center gap-3 py-1.5">
            <span className="font-mono text-xs text-foreground/70 w-28 shrink-0 truncate">
              {item.region}
            </span>
            <div className="flex-1 h-1 bg-border/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary/50 rounded-full"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground w-12 text-right shrink-0">
              {item.count.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Coverage summary */}
      <div className="border border-border/30 rounded-sm p-5 mt-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          Coverage Summary
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "States Covered", value: "14" },
            { label: "Top-5 Concentration", value: "54%" },
            { label: "Avg Venue Size", value: TAM_SUMMARY.avgCompanySize },
            { label: "Market Density", value: "High" },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60 mb-1">
                {item.label}
              </div>
              <div className="font-mono text-sm text-foreground/80">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pb-16 mb-16 border-b border-border/50">
      <span className="block text-[10px] font-mono text-primary tracking-[0.2em] uppercase mb-4">
        {number}
      </span>
      <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6">{title}</h2>
      <div className="space-y-5 text-base text-foreground leading-[1.85]">
        {children}
      </div>
    </section>
  );
}
