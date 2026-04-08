"use client";

import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { TamPreview } from "@/components/ui/tam-preview";

// ─── Static data ──────────────────────────────────────

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
          "Every domain’s reply rate is tracked individually and compared against the campaign’s overall average. If a domain underperforms on sufficient volume, it is flagged, retired, and replaced with a pre-warmed backup. A relay forwards any replies from the retired inbox to its replacement so no conversations are lost. All replacement costs are included.",
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
  {
    name: "Build",
    price: "$5,000",
    frequency: "One-time",
    description:
      "Data sourcing, list building, email validation, campaign copy, landing page, warmup, inbox rotation, deliverability monitoring, and technical setup.",
  },
  {
    name: "Launch & Optimize",
    price: "$7,500",
    frequency: "Per month × 3",
    description:
      "Campaign execution, reply management, lead handoff, deliverability management, infrastructure rotation and replacement, copy iteration, pipeline reporting.",
  },
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
        a: "Sending volume degrades domain reputation over time. By alternating between two sets — Group A sends month one, Group B sends month two — each set gets a full month of rest and warmup recovery before it sends again. This keeps deliverability consistent month over month instead of decaying.",
      },
      {
        q: "Why no open tracking?",
        a: "Open tracking works by embedding an invisible pixel in the email. That pixel is an image, and images in cold email are a spam signal. The data is also unreliable — privacy features in Apple Mail and Outlook inflate open rates with false positives. It hurts deliverability and the data it returns is not trustworthy. We measure what matters: replies.",
      },
      {
        q: "What happens when a domain underperforms?",
        a: "Each domain’s reply rate is compared against the campaign average. If a domain is performing significantly below average on sufficient send volume, it gets flagged and retired. A pre-warmed backup is swapped in. A relay forwards any replies from the old inbox to the new one so no conversations are lost. There is no gap in volume and no cost to you.",
      },
    ],
  },
  {
    title: "Email Validation",
    faqs: [
      {
        q: "Why not trust the data provider’s accuracy claims?",
        a: "Every data provider claims 90–95% email accuracy. In practice, real-world bounce rates on unvalidated lists run 10–20%. Across industries, roughly 1 in 5 email addresses in a typical database will not reach anyone. Email lists decay at 20–25% per year driven by job changes, company closures, and deactivated mailboxes. We validate independently, right before launch, every time.",
      },
      {
        q: "What is a catch-all email?",
        a: "A catch-all domain is configured to accept mail sent to any address, whether the specific mailbox exists or not. This makes standard verification useless for these domains because the server says “valid” for everything. An estimated 30–40% of B2B email addresses sit on catch-all domains. We separate catch-all emails into their own campaigns so they can be monitored and paused independently without affecting verified sends.",
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

// ─── Page component ───────────────────────────────────

export default function ProposalPage() {
  const params = useParams<{ proposalId: string }>();
  const proposalId = params?.proposalId;
  const [account, setAccount] = useState("Client");
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [introPhase, setIntroPhase] = useState<
    "loading" | "visible" | "fading" | "done"
  >("loading");
  const router = useRouter();

  /* Fetch account name from API, then start splash */
  useEffect(() => {
    if (!proposalId) return;
    fetch(
      `https://api.serviceengine.xyz/api/public/proposals/${proposalId}`,
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.account_name) setAccount(data.account_name);
      })
      .catch(() => {})
      .finally(() => {
        setIntroPhase("visible");
      });
  }, [proposalId]);

  /* Intro splash timing — fade after visible, done after fading */
  useEffect(() => {
    if (introPhase !== "visible") return;
    const t = setTimeout(() => setIntroPhase("fading"), 1800);
    return () => clearTimeout(t);
  }, [introPhase]);

  useEffect(() => {
    if (introPhase !== "fading") return;
    const t = setTimeout(() => setIntroPhase("done"), 800);
    return () => clearTimeout(t);
  }, [introPhase]);

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

  const handleSubmit = async () => {
    if (!canSubmit || !proposalId) return;
    setIsSubmitting(true);

    const signature = canvasRef.current?.toDataURL("image/png") ?? "";
    const signed_html = contentRef.current?.innerHTML ?? "";

    try {
      const res = await fetch(
        `https://api.serviceengine.xyz/api/public/proposals/${proposalId}/sign`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            signed_html,
            signature,
            signer_name: signerName.trim(),
            signer_email: signerEmail.trim(),
          }),
        },
      );
      if (!res.ok) {
        console.error("Sign failed:", res.status, await res.text().catch(() => ""));
      }
    } catch (err) {
      console.error("Sign request error:", err);
    }

    router.push(`/p/${proposalId}/payment`);
  };

  return (
    <>
      {/* ─── Intro splash ─── */}
      {introPhase !== "done" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700"
          style={{ opacity: introPhase === "fading" ? 0 : 1 }}
        >
          {introPhase !== "loading" && (
            <div className="flex flex-col items-center gap-3 px-6">
              <span className="font-heading text-2xl md:text-4xl font-semibold tracking-tight">
                Outbound Solutions
              </span>
              <span className="text-primary font-mono text-base md:text-lg">
                x
              </span>
              <span className="font-heading text-2xl md:text-4xl font-semibold tracking-tight">
                {account}
              </span>
            </div>
          )}
        </div>
      )}

      <div
        ref={contentRef}
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
              <span className="text-foreground font-medium">{account}</span>
            </span>
            <span className="text-border">|</span>
            <span>April 2026</span>
          </div>
        </header>

        {/* ─── 01 Executive Summary ─── */}
        <Section number="01" title="Executive Summary">
          <p>
            This proposal outlines the GTM strategy to put Chica Chida in front
            of thousands of on-premise decision makers each month, growing the
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
            Hiring a full-time sales representative runs $8&ndash;10K per
            month fully loaded. That person still needs to source their own
            leads, set up their own email infrastructure, manage their own
            deliverability, and at best sends a few dozen emails a day manually.
            Whether they generate a single meeting or not, you pay the same.
            Paid advertising to generate booked B2B meetings runs $2&ndash;3K
            per meeting. Both are viable paths.
          </p>
          <p>
            Our outbound infrastructure is engineered to send up to 50,000
            emails per month, including followups, to a client&apos;s ideal
            target market with full performance visibility. We generate more
            booked meetings, at lower cost per meeting than hiring in-house and
            at greater efficacy than alternative agency options.
          </p>
        </Section>

        {/* ─── 04 Our Approach ─── */}
        <Section number="04" title="Our Approach">
          <p>
            We are an engineering firm. We build dedicated sending infrastructure,
            proprietary data pipelines, and campaign systems designed to test
            offers and iterate at speed. Every variable &mdash; copy, audience
            segment, send timing, domain health &mdash; is measurable and tunable.
            The firms that win at outbound are the ones that can launch, test,
            and adapt faster than anyone else. That is what we built.
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

          <p>
            During the Build phase, we align on the exact titles and account
            types that fit your market. Below is a preview of what that list
            looks like &mdash; filtered to on-premise decision makers in roles
            like Beverage Director, Beverage Manager, SVP Marketing, Director
            of Food and Beverage, VP Culinary &amp; Beverage, Director of
            Restaurant Operations, VP Menu Operations, and VP Procurement.
          </p>

          <div className="mt-10">
            <TamPreview />
          </div>
        </Section>

        {/* ─── 06 The Offer ─── */}
        <Section number="06" title="The Offer">
          <p>
            The single highest-leverage variable in any outbound campaign is the
            offer &mdash; what you are actually putting in front of the recipient.
            The best offers give something of value with no friction. The worst
            ones ask for time, commitment, or a decision the recipient is not
            ready to make. A free sample of a product that has gone viral, sent
            directly to someone whose job is to evaluate new spirits &mdash;
            that is one of the strongest offers you can put in an outbound
            campaign. Most campaigns do not have an offer this good. We expect
            strong performance.
          </p>
          <p>
            The system accommodates multiple campaign types running in parallel
            &mdash; different offers, different segments, different asks. The best
            version of this is one where every conversation ends with a new
            account eager to carry Chica Chida on premise. Getting the product
            into their hands before that conversation happens makes that outcome
            more likely. Our job is to make that possible at scale and at a cost
            that makes sense. Over time, as we develop greater insight into which
            accounts convert at the highest rate, we refine targeting further to
            reduce cost per placement and increase yield.
          </p>
          <p>
            At{" "}
            <span className="font-mono font-medium">$30 per box</span>
            , it is the most economical way to get the brand tasted by the people
            who decide what goes on the bar. No one knows in advance which
            accounts will order the most. The sample removes the guesswork.
          </p>
        </Section>

        {/* ─── 07 The Math ─── */}
        <Section number="07" title="The Math">
          <RoiCalculator />
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
                        <AccordionTrigger className="text-base font-medium text-foreground">
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

        {/* ─── 09 Your Role ─── */}
        <Section number="09" title="Your Role">
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
            and timestamp. Your team can filter by leads who have been sent
            samples and follow up accordingly &mdash; whether that is a check-in
            email, a call, or looping in your distributor. We can also automate
            a follow-up sequence after a sample ships, checking in with the
            prospect at a cadence you define.
          </p>
          <div className="mt-6 border border-border rounded-lg p-5 bg-secondary/20 text-[15px] text-foreground/70 leading-relaxed">
            In the event volume exceeds your capacity or budget for samples, we
            can pause campaigns and tighten segmentation to narrow the funnel.
            If campaigns are paused at your request, the monthly retainer
            remains in effect.
          </div>
        </Section>

        {/* ─── 10 Pricing & Terms ─── */}
        <Section number="10" title="Pricing & Terms">
          <div className="border border-border rounded-lg overflow-hidden mb-6">
            {PRICING.map((item, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 px-6 py-5 border-b border-border"
              >
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.name}</div>
                  <div className="text-[15px] text-foreground/70 mt-0.5">
                    {item.description}
                  </div>
                </div>
                <div className="flex items-baseline gap-3 shrink-0">
                  <span className="font-mono text-lg text-primary font-medium">
                    {item.price}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {item.frequency}
                  </span>
                </div>
              </div>
            ))}
            {/* Total */}
            <div className="flex items-center justify-between px-6 py-5 bg-primary/5">
              <span className="font-heading text-lg font-semibold">Total</span>
              <span className="font-mono text-2xl text-primary font-medium">
                $27,500
              </span>
            </div>
            {/* Footnotes */}
            <div className="border-t border-border/50 px-6 py-4 space-y-1.5">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                All infrastructure costs &mdash; inboxes, domains, replacements,
                data providers &mdash; are included. No additional charges.
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                The full amount is due at kickoff.
              </p>
            </div>
          </div>
        </Section>

        {/* ─── Signature ─── */}
        <section className="pb-16 mb-16 border-b border-border/50">
          <span className="block text-[10px] font-mono text-primary tracking-[0.2em] uppercase mb-4">
            Agreement
          </span>
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-8">Signature</h2>

          {/* Terms */}
          <div className="mb-6 px-5 py-4 border-l-2 border-border bg-secondary/10 rounded-r-md">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Terms
            </span>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              Renewal is confirmed no later than 2 weeks before the end of the
              current term. If renewal is not confirmed by that date,
              infrastructure is sunset and campaigns wind down. Restarting after
              a lapse requires a new Build phase.
            </p>
          </div>

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

        {/* ─── Appendix (hidden — set false to show) ─── */}
        {false && <section className="pb-16">
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
        </section>}
      </div>
    </>
  );
}

// ─── ROI Calculator ──────────────────────────────────

const ENGAGEMENT_COST = 27_500;
const PILOT_MONTHS = 3;
const DEFAULT_RESPONSE_RATE = 0.02;
const DEFAULT_CLOSE_RATE = 0.15;
const DEFAULT_REVENUE_PER_ACCOUNT = 2_000;

function RoiCalculator() {
  const [emailVolume, setEmailVolume] = useState(30_000);

  const responseRate = DEFAULT_RESPONSE_RATE;
  const closeRate = DEFAULT_CLOSE_RATE;
  const revenuePerAccount = DEFAULT_REVENUE_PER_ACCOUNT;

  const warmLeadsPerMonth = Math.round(emailVolume * responseRate);
  const newAccountsPerMonth = Math.round(warmLeadsPerMonth * closeRate);
  const firstYearRevenue = newAccountsPerMonth * PILOT_MONTHS * revenuePerAccount;
  const costPerAccount =
    newAccountsPerMonth > 0
      ? ENGAGEMENT_COST / (newAccountsPerMonth * PILOT_MONTHS)
      : 0;
  const roiMultiple =
    firstYearRevenue > 0 ? firstYearRevenue / ENGAGEMENT_COST : 0;

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-0">
      {/* ── Slider: the single lever ── */}
      <div className="pb-8">
        <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Monthly Email Volume
        </label>
        <div className="flex items-center gap-5">
          <input
            type="range"
            min={5000}
            max={50000}
            step={1000}
            value={emailVolume}
            onChange={(e) => setEmailVolume(Number(e.target.value))}
            className="flex-1 h-2 bg-border rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(16,185,129,0.4)]"
          />
          <span className="font-mono text-2xl text-primary font-semibold w-28 text-right tabular-nums">
            {emailVolume.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground/50 mt-1.5 px-0.5">
          <span>5,000</span>
          <span>50,000</span>
        </div>
      </div>

      {/* ── Fixed assumptions ── */}
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] font-mono text-muted-foreground/60 pb-8">
        <span>Response rate: 1&ndash;3% (est. 2%)</span>
        <span>Close rate: {(closeRate * 100).toFixed(0)}%</span>
        <span>Revenue/account: {fmt(revenuePerAccount)}/yr</span>
        <span>Pilot: {PILOT_MONTHS} months</span>
      </div>

      {/* ── Vertical funnel ── */}
      <div className="relative pl-6 border-l-2 border-primary/20 space-y-0">
        {[
          {
            label: "Emails Sent / Month",
            value: emailVolume.toLocaleString(),
          },
          {
            label: "Warm Leads / Month",
            value: warmLeadsPerMonth.toLocaleString(),
          },
          {
            label: "New Accounts / Month",
            value: newAccountsPerMonth.toLocaleString(),
          },
          {
            label: "First-Year Revenue",
            value: fmt(firstYearRevenue),
            highlight: true,
          },
        ].map((step, i) => (
          <div key={step.label} className="relative pb-8 last:pb-0">
            {/* dot on the line */}
            <div
              className={`absolute -left-[calc(0.75rem+1px)] top-1 w-3 h-3 rounded-full border-2 ${
                step.highlight
                  ? "bg-primary border-primary shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  : "bg-background border-primary/40"
              }`}
            />
            {/* arrow between steps */}
            {i < 3 && (
              <div className="absolute -left-[calc(0.375rem+1px)] top-5 text-primary/30 text-[10px] leading-none">
                ▼
              </div>
            )}
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1">
              {step.label}
            </div>
            <div
              className={`font-heading font-semibold tabular-nums ${
                step.highlight ? "text-3xl text-primary" : "text-xl text-foreground"
              }`}
            >
              {step.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom line ── */}
      <div className="mt-10 border border-primary/20 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 divide-x divide-primary/10">
          <div className="p-5 text-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
              Engagement Cost
            </div>
            <div className="font-mono text-lg text-foreground font-medium">
              {fmt(ENGAGEMENT_COST)}
            </div>
          </div>
          <div className="p-5 text-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
              Cost / Account
            </div>
            <div className="font-mono text-lg text-foreground font-medium">
              {costPerAccount > 0 ? fmt(Math.round(costPerAccount)) : "—"}
            </div>
          </div>
          <div className="p-5 text-center bg-primary/5">
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-1.5">
              ROI Multiple
            </div>
            <div className="font-mono text-2xl text-primary font-bold">
              {roiMultiple > 0 ? roiMultiple.toFixed(1) + "×" : "—"}
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic !mt-4">
        These projections are illustrative. Actual results depend on follow-up
        speed, sample fulfillment, and market conditions. The engagement cost is
        fixed regardless of campaign performance.
      </p>
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
