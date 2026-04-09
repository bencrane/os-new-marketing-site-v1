import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Outbound Solutions | Terms of Service",
};

export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background selection:bg-primary/30 py-24 px-6 md:px-12 items-center">
      <div className="w-full max-w-[720px] flex flex-col items-center text-center">
        <span className="font-mono text-primary text-xs tracking-widest uppercase mb-4 border border-primary/30 bg-primary/10 w-fit px-3 py-1 rounded inline-block">
          LEGAL // TERMS OF SERVICE
        </span>
        <h1 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">
          Terms of Service
        </h1>
        <div className="font-mono text-xs text-muted-foreground mb-16 tracking-widest uppercase">
          LAST UPDATED: APRIL 8, 2026
        </div>
      </div>

      <div className="w-full max-w-[720px] font-mono text-sm text-muted-foreground leading-relaxed space-y-10 mb-24">
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Overview</h2>
          <p>These terms govern your use of the Outbound Solutions website and any services provided through an executed engagement agreement. By accessing this site, submitting a request, or signing an engagement proposal, you agree to these terms in full. These terms apply to all services, communications, deliverables, and materials provided by Outbound Solutions.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Access and Eligibility</h2>
          <p>Submitting a request or inquiry does not constitute a guarantee of service, a binding agreement, or an obligation on the part of Outbound Solutions to proceed with any engagement. We may accept or decline any engagement at our sole discretion, for any reason, at any time. Services are provided only under a signed engagement agreement. The scope, pricing, and deliverables described in any proposal or engagement material are subject to change at Outbound Solutions&apos; discretion prior to and during the engagement.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Services Description</h2>
          <p>Outbound Solutions builds and operates outbound go-to-market infrastructure which may include but is not limited to: email sending systems, direct mail campaigns, cold calling operations, inbound call handling, LinkedIn outreach, audience targeting, signal detection, data sourcing, list building, email validation, campaign copywriting, landing pages, inbox warmup, deliverability monitoring, infrastructure rotation, reply management, lead handoff, and campaign reporting. The specific combination of services, deliverables, volume, tactics, channels, sequencing, and operational methods employed in any engagement are determined entirely at Outbound Solutions&apos; discretion. Outbound Solutions may add, remove, modify, pause, or discontinue any service, tactic, or deliverable at any time without prior notice if it determines such changes are necessary to optimize performance, maintain deliverability, protect infrastructure, or for any other reason.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Projections and Estimates</h2>
          <p>Any information presented in proposals, engagement materials, presentations, conversations, or on this website — including but not limited to market size estimates, contact volumes, total addressable market figures, response rate projections, conversion estimates, revenue modeling, ROI calculations, and sample data — is based on preliminary research, third-party data sources, and general industry benchmarks. All such figures are directional, approximate, and intended solely to illustrate a potential opportunity. They do not constitute guarantees, promises, commitments, or representations of any kind regarding specific outcomes. Actual contact volumes, deliverability rates, response rates, conversion metrics, lead quality, and revenue outcomes may vary significantly based on factors including but not limited to targeting criteria, offer positioning, recipient behavior, inbox placement, market conditions, data accuracy, client responsiveness, and variables outside the control of Outbound Solutions. Total addressable market estimates reflect the approximate universe of contacts matching described criteria across available data sources at a point in time and do not represent a guaranteed deliverable list size, a commitment to contact any specific number of individuals, or a guarantee of data accuracy or completeness. Email verification rates, contact coverage, data freshness, and data accuracy vary by source, region, and time period. All projections are illustrative and non-binding.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Campaign Operations</h2>
          <p>All campaign operations are managed at Outbound Solutions&apos; sole discretion. This includes but is not limited to: send volume, sending schedules, campaign timing, sequence design, audience segmentation, targeting criteria, copy and messaging, creative assets, landing pages, infrastructure selection, domain and inbox rotation, warmup schedules, deliverability management, reply handling, lead qualification criteria, lead handoff procedures, and reporting cadence. Outbound Solutions may adjust, pause, resume, restructure, or discontinue any aspect of campaign operations at any time, for any reason, without prior notice or approval from the client. Outbound Solutions is not obligated to achieve any specific volume of sends, contacts reached, replies generated, leads delivered, or meetings booked. Volume and output targets referenced in proposals or engagement materials are estimates and aspirational benchmarks, not commitments.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Client Obligations</h2>
          <p>Clients are responsible for providing accurate and timely business information, responding to warm leads and opportunities in a timely manner, fulfilling any offer commitments made as part of the campaign (including but not limited to sample shipments, product deliveries, and meeting attendance), and maintaining sufficient internal capacity to follow up on pipeline generated by the engagement. Failure to fulfill client obligations — including but not limited to slow response times, failure to ship samples, failure to attend meetings, lack of internal sales capacity, or failure to provide requested information — may materially impact campaign performance. Outbound Solutions bears no responsibility for diminished results attributable to client inaction, delays, or failure to meet obligations. Outbound Solutions is not obligated to pause, adjust, or modify campaigns due to client capacity constraints unless mutually agreed upon in writing.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Payment Terms</h2>
          <p>Payment terms are defined in each engagement agreement. Unless otherwise specified, the full engagement amount is due at kickoff prior to the commencement of any work including but not limited to infrastructure setup, data sourcing, list building, or campaign configuration. All fees are earned upon receipt and are non-refundable under any circumstances, including but not limited to: client dissatisfaction with results, client decision to cancel or pause the engagement, client failure to fulfill obligations, changes in client business circumstances, force majeure events, or any other reason. If campaigns are paused, delayed, or reduced in scope at the client&apos;s request or due to client inaction, all payment obligations remain in full effect for the duration of the engagement term. Late payments exceeding 15 days may result in campaign suspension at Outbound Solutions&apos; discretion. Campaign suspension due to late payment does not reduce, defer, or eliminate the client&apos;s payment obligations. Outbound Solutions may charge interest on late payments at a rate of 1.5% per month or the maximum rate permitted by applicable law, whichever is lower.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Renewal and Termination</h2>
          <p>Renewal may be confirmed no later than 2 weeks before the end of the current engagement term. If renewal is not confirmed by that date, Outbound Solutions may begin winding down infrastructure and campaigns at its discretion. Restarting after a lapse may require a new build phase at additional cost. Either party may terminate an engagement with 30 days written notice. Upon termination for any reason, all fees paid are non-refundable and any outstanding fees become immediately due. Outbound Solutions may terminate an engagement immediately and without notice if the client fails to meet payment obligations, fails to fulfill client obligations, becomes unresponsive for more than 14 consecutive days, or for any other reason at Outbound Solutions&apos; sole discretion. In the event of termination by Outbound Solutions, no refund of any kind will be issued.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">No Guaranteed Outcomes</h2>
          <p>Outbound Solutions provides go-to-market infrastructure and execution services. Outbound Solutions does not guarantee, warrant, promise, or represent any specific lead volumes, response rates, positive reply rates, meetings booked, samples requested, deals closed, revenue generated, return on investment, or any other specific outcome of any kind. All services are provided on an as-is basis. Results depend on multiple variables — many of which are outside the control of Outbound Solutions — including but not limited to market conditions, client responsiveness, sample fulfillment speed, follow-up execution, product-market fit, competitive dynamics, recipient behavior, inbox placement, email provider policies, and broader economic conditions. By signing an engagement agreement, the client acknowledges and agrees that: (a) the engagement is for services rendered, not for guaranteed outcomes; (b) fees are due regardless of campaign performance or results; (c) all projections and estimates are illustrative and non-binding; and (d) Outbound Solutions&apos; only obligation is to perform the services described in the engagement agreement at its discretion and to the standard it deems appropriate.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Intellectual Property</h2>
          <p>All systems, processes, infrastructure, sending technology, software, workflows, methodologies, templates, frameworks, and proprietary tools developed or used by Outbound Solutions remain the sole and exclusive intellectual property of Outbound Solutions. The client may not copy, reproduce, reverse-engineer, or derive any product or service from Outbound Solutions&apos; proprietary methods or technology. Client-specific campaign data, audience lists generated for the client during the engagement, and lead outcomes are the property of the client. However, Outbound Solutions retains the right to use anonymized and aggregated engagement data for internal benchmarking, product improvement, and marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Data and Compliance</h2>
          <p>Outbound Solutions operates in compliance with applicable email sending regulations including CAN-SPAM. Direct mail campaigns comply with USPS regulations. Voice campaigns comply with TCPA regulations. Outbound Solutions makes reasonable efforts to comply with applicable data protection and privacy regulations but does not warrant complete compliance with all jurisdictional requirements. Clients are solely responsible for ensuring their products, services, offers, and business practices comply with all applicable laws, regulations, and industry requirements in their jurisdiction and industry. The client indemnifies and holds harmless Outbound Solutions from any claims, damages, fines, or penalties arising from the client&apos;s products, services, offers, or business practices.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Outbound Solutions&apos; total aggregate liability under any engagement — whether arising in contract, tort, negligence, strict liability, or otherwise — shall not exceed the fees actually paid by the client under that specific engagement agreement. In no event shall Outbound Solutions be liable for any indirect, incidental, consequential, special, exemplary, or punitive damages of any kind, including but not limited to lost revenue, lost profits, loss of business opportunities, business interruption, reputational harm, or loss of data, regardless of whether such damages were foreseeable or whether Outbound Solutions was advised of the possibility of such damages. This limitation applies to all claims arising from or related to the engagement, including claims based on the performance or non-performance of campaigns, the accuracy or inaccuracy of data or projections, or the actions or inactions of third parties including email providers, data vendors, or recipients.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Indemnification</h2>
          <p>The client agrees to indemnify, defend, and hold harmless Outbound Solutions, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising from or related to: (a) the client&apos;s products, services, or business practices; (b) the client&apos;s breach of these terms or any engagement agreement; (c) the client&apos;s failure to comply with applicable laws or regulations; (d) any claim by a third party related to communications sent on behalf of the client; or (e) the client&apos;s use of leads, data, or materials provided by Outbound Solutions.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Force Majeure</h2>
          <p>Outbound Solutions shall not be liable for any delay or failure to perform its obligations under any engagement agreement due to circumstances beyond its reasonable control, including but not limited to: acts of God, natural disasters, pandemics, government actions, changes in law or regulation, email provider policy changes, third-party service outages, internet disruptions, cyberattacks, or any other event beyond Outbound Solutions&apos; reasonable control. In the event of a force majeure event, Outbound Solutions&apos; obligations are suspended for the duration of the event. Client payment obligations remain in full effect during any force majeure event.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Dispute Resolution</h2>
          <p>Any dispute arising from or related to these terms or any engagement agreement shall be resolved through binding arbitration administered in accordance with the rules of the American Arbitration Association. Arbitration shall take place in New York, New York. The arbitrator&apos;s decision shall be final and binding. Each party bears its own costs and attorneys&apos; fees unless the arbitrator determines otherwise. The client waives any right to participate in a class action lawsuit or class-wide arbitration against Outbound Solutions.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Severability</h2>
          <p>If any provision of these terms is found to be unenforceable or invalid, that provision shall be modified to the minimum extent necessary to make it enforceable, or if modification is not possible, severed from these terms. All remaining provisions shall continue in full force and effect.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Entire Agreement</h2>
          <p>These terms, together with any signed engagement agreement, constitute the entire agreement between the client and Outbound Solutions. These terms supersede all prior or contemporaneous communications, proposals, representations, and agreements, whether oral or written. No modification of these terms is effective unless made in writing and agreed to by Outbound Solutions.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Modifications</h2>
          <p>Outbound Solutions reserves the right to update, modify, or replace these terms at any time at its sole discretion. Changes take effect immediately upon posting to this page. Continued use of the site, services, or any engagement constitutes acceptance of the updated terms. It is the client&apos;s responsibility to review these terms periodically.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h2>
          <p>For questions about these terms: legal@outboundsolutions.com</p>
        </section>
      </div>
    </div>
  );
}
