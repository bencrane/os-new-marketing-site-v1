"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// ─── Config ───────────────────────────────────────────
const API_BASE = "https://api.serviceengine.xyz";

const STRIPE_APPEARANCE = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#10b981",
    colorBackground: "#18181b",
    colorText: "#f4f4f5",
    colorTextSecondary: "#a1a1aa",
    colorDanger: "#ef4444",
    fontFamily: "'JetBrains Mono', monospace",
    borderRadius: "4px",
    spacingUnit: "4px",
  },
  rules: {
    ".Input": {
      border: "1px solid #27272a",
      boxShadow: "none",
    },
    ".Input:focus": {
      border: "1px solid rgba(16, 185, 129, 0.5)",
      boxShadow: "none",
    },
    ".Label": {
      fontSize: "12px",
      textTransform: "uppercase" as const,
      letterSpacing: "0.05em",
    },
  },
};

const BANK_DETAILS = [
  { label: "Account Name", value: "Modern Full, LLC", copyable: false },
  { label: "Routing Number", value: "091311229", copyable: true },
  { label: "Account Number", value: "202314840766", copyable: true },
];

// ─── Checkout form (inside Elements provider) ─────────

function CheckoutForm({ proposalId }: { proposalId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/p/${proposalId}/payment?status=success`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message || "Payment failed.");
      setProcessing(false);
    } else {
      setSucceeded(true);
      setProcessing(false);
    }
  };

  if (succeeded) {
    return (
      <div className="text-center py-8">
        <svg
          className="text-primary mx-auto mb-3"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <div className="text-sm font-mono font-medium text-primary mb-1">
          Payment received
        </div>
        <p className="text-xs text-muted-foreground">
          A confirmation has been sent to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-xs text-destructive mt-3">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full mt-4 bg-primary text-primary-foreground font-mono text-sm font-medium py-3 rounded hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        {processing ? "Processing..." : "Pay $27,500"}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────

export default function ProposalPaymentPage() {
  const params = useParams<{ proposalId: string }>();
  const proposalId = params?.proposalId;
  const [activeMethod, setActiveMethod] = useState<"card" | "bank">("card");
  const [copied, setCopied] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [publishableKey, setPublishableKey] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(null);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  useEffect(() => {
    const init = async () => {
      if (!proposalId) {
        setStripeError("Missing proposal ID in URL.");
        return;
      }

      try {
        // Step 1: GET proposal data for the Stripe publishable key
        const proposalRes = await fetch(
          `${API_BASE}/api/public/proposals/${proposalId}`,
        );
        if (!proposalRes.ok) {
          const body = await proposalRes.text().catch(() => "(no body)");
          setStripeError(
            `GET /api/public/proposals/${proposalId} failed\nStatus: ${proposalRes.status} ${proposalRes.statusText}\nBody: ${body}`,
          );
          return;
        }
        const proposal = await proposalRes.json();

        if (!proposal.stripe_publishable_key) {
          setStripeError(
            `GET /api/public/proposals/${proposalId} succeeded but stripe_publishable_key is missing\nResponse: ${JSON.stringify(proposal, null, 2)}`,
          );
          return;
        }
        setPublishableKey(proposal.stripe_publishable_key);

        // Step 2: POST to create the PaymentIntent
        const intentRes = await fetch(
          `${API_BASE}/api/public/proposals/${proposalId}/payment-intent`,
          { method: "POST" },
        );
        if (!intentRes.ok) {
          const body = await intentRes.text().catch(() => "(no body)");
          setStripeError(
            `POST /api/public/proposals/${proposalId}/payment-intent failed\nStatus: ${intentRes.status} ${intentRes.statusText}\nBody: ${body}`,
          );
          return;
        }
        const intent = await intentRes.json();

        if (!intent.client_secret) {
          setStripeError(
            `POST /api/public/proposals/${proposalId}/payment-intent succeeded but client_secret is missing\nResponse: ${JSON.stringify(intent, null, 2)}`,
          );
          return;
        }
        setClientSecret(intent.client_secret);
      } catch (err) {
        setStripeError(
          `Network/init error: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    };
    init();
  }, [proposalId]);

  const stripePromise = useMemo(
    () =>
      publishableKey
        ? loadStripe(publishableKey).catch((err) => {
            setStripeError(
              `loadStripe("${publishableKey.slice(0, 12)}...") failed\nError: ${err instanceof Error ? err.message : String(err)}`,
            );
            return null;
          })
        : null,
    [publishableKey],
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* ─── Signed confirmation ─── */}
      <div className="flex items-center justify-center gap-2.5 mb-10">
        <svg
          className="text-primary shrink-0"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span className="text-sm font-mono text-primary font-medium uppercase tracking-wider">
          Agreement Signed
        </span>
      </div>

      {/* ─── Amount ─── */}
      <div className="text-center mb-12">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Amount Due
        </div>
        <div className="font-mono text-5xl md:text-6xl font-medium tracking-tight">
          $27,500
        </div>
      </div>

      {/* ─── Payment method selection ─── */}
      <div className="mb-10">
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
          Select Payment Method
        </div>

        {/* Option cards */}
        <div className="grid grid-cols-2 gap-3 mb-0">
          <button
            type="button"
            onClick={() => setActiveMethod("card")}
            className={`flex items-center gap-3 px-5 py-4 rounded-lg border cursor-pointer transition-all ${
              activeMethod === "card"
                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                : "border-border hover:border-muted-foreground/30 hover:bg-secondary/10"
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-all ${
              activeMethod === "card"
                ? "border-primary bg-primary shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                : "border-muted-foreground/40"
            }`} />
            <svg
              className={`shrink-0 transition-colors ${activeMethod === "card" ? "text-primary" : "text-muted-foreground"}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <span className={`text-sm font-mono font-medium uppercase tracking-wider transition-colors ${
              activeMethod === "card" ? "text-foreground" : "text-muted-foreground"
            }`}>
              Card
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMethod("bank")}
            className={`flex items-center gap-3 px-5 py-4 rounded-lg border cursor-pointer transition-all ${
              activeMethod === "bank"
                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                : "border-border hover:border-muted-foreground/30 hover:bg-secondary/10"
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 transition-all ${
              activeMethod === "bank"
                ? "border-primary bg-primary shadow-[0_0_6px_rgba(16,185,129,0.4)]"
                : "border-muted-foreground/40"
            }`} />
            <svg
              className={`shrink-0 transition-colors ${activeMethod === "bank" ? "text-primary" : "text-muted-foreground"}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
            <span className={`text-sm font-mono font-medium uppercase tracking-wider transition-colors ${
              activeMethod === "bank" ? "text-foreground" : "text-muted-foreground"
            }`}>
              Bank Transfer
            </span>
          </button>
        </div>

        {/* Content panel — always visible, fixed height */}
        <div className="mt-3">
          <div className="border border-border rounded-lg p-6 grid">
              <div className={`col-start-1 row-start-1 ${activeMethod !== "card" ? "invisible" : ""}`}>
                {stripeError ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm text-muted-foreground mb-1">
                      Card payment is temporarily unavailable.
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      Please use bank transfer or try again later.
                    </p>
                    <pre className="mt-4 w-full text-left text-xs text-destructive/80 bg-destructive/10 border border-destructive/20 rounded p-3 whitespace-pre-wrap break-all font-mono overflow-auto max-h-48">
                      {stripeError}
                    </pre>
                  </div>
                ) : clientSecret && stripePromise && proposalId ? (
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, appearance: STRIPE_APPEARANCE }}
                  >
                    <CheckoutForm proposalId={proposalId} />
                  </Elements>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />
                      Loading payment form...
                    </div>
                  </div>
                )}
              </div>

              <div className={`col-start-1 row-start-1 ${activeMethod !== "bank" ? "invisible" : ""}`}>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Send an ACH transfer using the details below. Typically arrives within
                  1&ndash;3 business days.
                </p>

                <div className="space-y-0 mb-4">
                  {BANK_DETAILS.map((row, i) => (
                    <div
                      key={row.label}
                      className={`flex items-center justify-between py-2.5 ${
                        i < BANK_DETAILS.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <span className="text-xs font-medium font-mono flex items-center gap-2">
                        {row.value}
                        {row.copyable && (
                          <button
                            type="button"
                            onClick={() => copyText(row.value, row.label)}
                            className={`text-[10px] px-2 py-0.5 rounded border transition-all cursor-pointer font-mono ${
                              copied === row.label
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-secondary/50 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {copied === row.label ? "Copied" : "Copy"}
                          </button>
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border border-border rounded bg-secondary/20 p-4">
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground mb-3">
                    Bank
                  </div>
                  <div className="text-sm font-medium mb-0.5">
                    Choice Financial Group
                  </div>
                  <div className="text-xs text-muted-foreground">
                    4501 23rd Avenue S, Fargo, ND 58104
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* ─── Contact line ─── */}
      <p className="text-center text-sm text-muted-foreground">
        Questions about payment?{" "}
        <a
          href="mailto:ben@outboundsolutions.com"
          className="text-foreground hover:text-primary transition-colors"
        >
          Reach out to Ben
        </a>
      </p>
    </div>
  );
}
