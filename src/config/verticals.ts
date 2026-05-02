export interface SignalData {
  source: string;
  type: string;
  event: string;
  implication: string;
}

export interface TerrainItem {
  id: string;
  name: string;
  description: string;
}

export interface VerticalConfig {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  
  hero: {
    classification: string;
    tension: string;
    subtext: string;
  };
  
  marketMap: {
    totalDMCount: string;
    statesCovered: string[];
    titlesTargeted: string[];
  };
  
  signals: {
    intro: string;
    feed: SignalData[];
  };
  
  system: {
    intro: string;
    stages: {
      name: string;
      description: string;
      channel: string;
    }[];
  };
  
  terrain: {
    intro: string;
    description: string;
    items: TerrainItem[];
  };
  
  outcome: {
    intro: string;
    dashboardMock: {
      metric: string;
      value: string;
      status?: "nominal" | "warning" | "alert";
    }[];
  };
  
  gate: {
    scarcityText: string;
  };
}

// ------------------------------------------
// 1. WINE & SPIRITS
// ------------------------------------------
export const wineAndSpiritsConfig: VerticalConfig = {
  slug: "wine-and-spirits",
  metaTitle: "Engineered Demand | Target: Wine & Spirits",
  metaDescription: "Proprietary pipeline infrastructure configured for the US Wine & Spirits wholesale distribution market.",
  
  hero: {
    classification: "TARGET: WINE & SPIRITS",
    tension: "The brand is built.\nThe distribution isn't.",
    subtext: "Competing for market attention is structural warfare. Founders burn cycles acting as the sole sales team, making expansion decisions based on gut feel, and sending expensive sample runs to portfolio managers who never asked for them. We bypass the noise by treating distribution acquisition as an engineering problem."
  },
  
  marketMap: {
    totalDMCount: "1,847",
    statesCovered: ["New York", "New Jersey", "Florida", "Texas", "California", "Illinois", "Georgia"],
    titlesTargeted: [
      "Category Manager (Spirits)",
      "Portfolio Manager",
      "Supplier Relations Director",
      "VP of Purchasing",
      "Director of New Brand Development"
    ]
  },
  
  signals: {
    intro: "These are the structural conditions where outreach converts.\nNot random emails. Timed to exact inflection points in the market.",
    feed: [
      {
        source: "PORTFOLIO_CHANGE",
        type: "COMPETITOR_DROPPED",
        event: "Market drops competing tequila brand from portfolio",
        implication: "Open slot for new agave brand"
      },
      {
        source: "NEW_HIRE",
        type: "BEVERAGE_DIRECTOR",
        event: "Beverage director hired at 40-location restaurant group",
        implication: "New decision maker conducting vendor review"
      },
      {
        source: "LICENSE_FILED",
        type: "WHOLESALE_APPROVAL",
        event: "State liquor board approves new wholesale distribution license",
        implication: "New market actively building portfolio"
      },
      {
        source: "MENU_SIGNAL",
        type: "PROGRAM_OVERHAUL",
        event: "Craft cocktail bar chain announces spirits menu overhaul",
        implication: "Immediate restocking window open"
      },
      {
        source: "EXPANSION",
        type: "REGIONAL_GROWTH",
        event: "Regional market files to operate in 2 additional states",
        implication: "Growing footprint prioritizing new brands"
      },
      {
        source: "EVENT_TRIGGER",
        type: "COMPETITION_NO_SHOW",
        event: "Brand pulled from major spirits competition entry list",
        implication: "Possible operations or distribution gap"
      }
    ]
  },
  
  system: {
    intro: "Strictly timed communications from highly authenticated infrastructure, followed by direct manual dials from an operator who understands tier-3 dynamics.",
    stages: [
      {
        name: "01 // Signal Ingestion",
        description: "Scraping state liquor boards, hiring boards, and portfolio changes continuously.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // Isolated Sequence",
        description: "Deploying high-deliverability email specifically referencing their active portfolio gaps.",
        channel: "EMAIL_INFRASTRUCTURE"
      },
      {
        name: "03 // Direct Intervention",
        description: "In-house phone reps mapping the organization to locate the exact category decision maker.",
        channel: "HUMAN_DIALERS"
      },
      {
        name: "04 // Physical Trigger",
        description: "Programmatic direct mail carrying QR-tracked brand collateral shipped to non-responsive tier-1 targets.",
        channel: "DIRECT_MAIL"
      }
    ]
  },
  
  terrain: {
    intro: "We operate strictly inside the US Three-Tier System.",
    description: "Cold outreach fails when it ignores regulatory structure. We map precisely which states a client is actively licensed to sell in and saturate those territories. Concurrently, we run light reconnaissance into target expansion states to pre-warm markets, ensuring pipeline waits the moment state permits clear.",
    items: [
      { id: "SYS_01", name: "Three-Tier Compliance", description: "Mapping market relationships directly to supplier licenses." },
      { id: "SYS_02", name: "State-by-State Control", description: "Navigating franchise state laws versus open markets." },
      { id: "SYS_03", name: "Control State Routing", description: "Isolating broker models required for state-run jurisdictions." }
    ]
  },
  
  outcome: {
    intro: "A single regional market actively pushing a brand can generate $240K to $1M in annual wholesale revenue. It places a product in 50 to 200 immediate accounts. We engineer the meetings. You close the distribution.",
    dashboardMock: [
      { metric: "ACTIVE_PIPELINE_VALUE", value: "$1.4M", status: "nominal" },
      { metric: "TIER_1_MEETINGS_BOOKED", value: "14", status: "nominal" },
      { metric: "CPA_VARIANCE", value: "-12.4%", status: "nominal" },
      { metric: "SAMPLES_REQUESTED", value: "32", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We take on one spirits brand per quarter. Apply."
  }
};

// ------------------------------------------
// 2. INSURANCE
// ------------------------------------------
export const insuranceConfig: VerticalConfig = {
  slug: "insurance",
  metaTitle: "Engineered Demand | Target: Insurance",
  metaDescription: "Proprietary pipeline infrastructure configured for the commercial insurance agency market.",
  
  hero: {
    classification: "TARGET: INSURANCE",
    tension: "The carrier needs coverage.\nThe agency doesn't know yet.",
    subtext: "Every day, motor carriers lose insurance coverage, file new authority, or expand their fleets. The agencies that should be writing those policies find out weeks too late — or never. We detect these moments in real time and route them to agencies before the competition knows they exist."
  },
  
  marketMap: {
    totalDMCount: "4,212",
    statesCovered: ["Texas", "Florida", "California", "Georgia", "Ohio", "Illinois", "Pennsylvania"],
    titlesTargeted: [
      "Agency Owner",
      "Commercial Lines Producer",
      "Underwriter",
      "VP of Business Development",
      "Account Executive"
    ]
  },
  
  signals: {
    intro: "These are the structural conditions where outreach converts.\nNot random emails. Timed to exact inflection points in the market.",
    feed: [
      {
        source: "INSURANCE_LAPSE",
        type: "COVERAGE_GAP",
        event: "Carrier BIPD coverage lapsed 14 days ago, no replacement filing on record",
        implication: "Authority revocation risk, needs new policy immediately"
      },
      {
        source: "NEW_AUTHORITY",
        type: "GREENFIELD_CARRIER",
        event: "New MC authority granted last week, zero inspections",
        implication: "Brand new carrier needs 13 vendors on day one including insurance"
      },
      {
        source: "FLEET_EXPANSION",
        type: "POWER_UNIT_INCREASE",
        event: "Fleet grew from 12 to 38 power units in 90 days",
        implication: "More trucks means higher premiums and new policy requirements"
      },
      {
        source: "SAFETY_SCORE",
        type: "BASIC_DETERIORATION",
        event: "Unsafe Driving BASIC jumped from 42% to 71% in 6 months",
        implication: "Current insurer likely to non-renew, carrier shopping for coverage"
      },
      {
        source: "DRIVER_ATTRITION",
        type: "WORKFORCE_SIGNAL",
        event: "Driver count down 18% in 90 days, no fleet reduction filed",
        implication: "Staffing instability signals insurance gaps incoming"
      },
      {
        source: "AUTHORITY_EXPANSION",
        type: "INTERSTATE_FILING",
        event: "Carrier files operating authority in 3 new states",
        implication: "Expanding operations require new coverage territories"
      }
    ]
  },
  
  system: {
    intro: "Insurance agencies don't find carriers by scrolling LinkedIn. They find them through data — FMCSA filings, DOT registrations, and coverage lapse records. We ingest those feeds daily, detect the carriers who need coverage now, and route them through direct mail, inbound IVR, and live transfer to the agencies positioned to write the policy.",
    stages: [
      {
        name: "01 // DATA INGESTION: FMCSA_FEED",
        description: "Ingesting DOT registrations, authority filings, insurance coverage records, and safety scores daily.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // DIRECT MAIL TRIGGER: PHYSICAL_OUTREACH",
        description: "Programmatic mailers sent to carriers showing coverage gaps or new authority, carrying agency-branded collateral with tracking.",
        channel: "PHYSICAL_INFRASTRUCTURE"
      },
      {
        name: "03 // INBOUND IVR: CALL_CAPTURE",
        description: "AI-powered inbound phone system qualifying carriers who respond to mail and routing to the right agent.",
        channel: "VOICE_RECON"
      },
      {
        name: "04 // LIVE TRANSFER: WARM_HANDOFF",
        description: "Qualified carriers transferred directly to agency producers in real time during business hours.",
        channel: "HUMAN_DIALERS"
      }
    ]
  },
  
  terrain: {
    intro: "We operate inside federal motor carrier regulatory infrastructure.",
    description: "Commercial trucking insurance is governed by FMCSA requirements, state-level filing obligations, and carrier safety scoring systems. We map which carriers are required to maintain coverage, which are at risk of losing it, and which just entered the market needing it for the first time. Outreach is timed to regulatory deadlines — not arbitrary cadences.",
    items: [
      { id: "SYS_01", name: "FMCSA COMPLIANCE", description: "Mapping coverage requirements directly to carrier authority type and fleet size." },
      { id: "SYS_02", name: "FILING DEADLINE TRIGGERS", description: "Timing outreach to the 30-day coverage replacement window before authority revocation." },
      { id: "SYS_03", name: "STATE FILING VARIATION", description: "Navigating per-state insurance filing requirements and minimum coverage thresholds." }
    ]
  },
  
  outcome: {
    intro: "A single commercial trucking policy generates $8,000 to $40,000 in annual premium for the writing agency. Fleet accounts with 20+ power units can exceed $200,000. We generate the leads. You write the policies.",
    dashboardMock: [
      { metric: "ACTIVE_PIPELINE_VALUE", value: "$2.1M", status: "nominal" },
      { metric: "LIVE_TRANSFERS_COMPLETED", value: "47", status: "nominal" },
      { metric: "COST_PER_TRANSFER", value: "-8.2%", status: "nominal" },
      { metric: "POLICIES_QUOTED", value: "112", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We partner with two agencies per state. If you have binding authority and the capacity to quote same-day, apply."
  }
};

// ------------------------------------------
// 3. FACTORING
// ------------------------------------------
export const factoringConfig: VerticalConfig = {
  slug: "factoring",
  metaTitle: "Engineered Demand | Target: Factoring",
  metaDescription: "Proprietary pipeline infrastructure configured for the commercial factoring and alternative lending market.",
  
  hero: {
    classification: "TARGET: FACTORING",
    tension: "The contract is awarded Tuesday.\nBy Friday, it's too late.",
    subtext: "When a company wins a government contract or files new business formation documents, they need working capital within weeks. The factoring companies, DCAA CPA firms, and lenders who reach them first win the relationship. We detect these moments the day they happen."
  },
  
  marketMap: {
    totalDMCount: "2,634",
    statesCovered: ["Nationwide", "Federal", "DOD", "GSA", "SBA", "SAM.gov", "USASpending"],
    titlesTargeted: [
      "CFO",
      "Controller",
      "VP of Finance",
      "Owner",
      "Director of Operations",
      "Accounts Receivable Manager"
    ]
  },
  
  signals: {
    intro: "These are the structural conditions where outreach converts.\nNot random emails. Timed to exact inflection points in the market.",
    feed: [
      {
        source: "SAM_GOV",
        type: "CONTRACT_AWARD",
        event: "New DOD logistics contract awarded, $2.4M value",
        implication: "Immediate cash flow gap, needs factoring or line of credit"
      },
      {
        source: "USASPENDING",
        type: "FIRST_TIME_AWARDEE",
        event: "Company receives first federal contract, no prior government revenue",
        implication: "No infrastructure for government AR cycles, prime factoring candidate"
      },
      {
        source: "STATE_SOS",
        type: "NEW_ENTITY_FORMATION",
        event: "New LLC filed in Delaware with government contracting NAICS codes",
        implication: "Early-stage company likely undercapitalized"
      },
      {
        source: "SBA",
        type: "LOAN_DISBURSEMENT",
        event: "SBA 7(a) loan disbursed, $890K",
        implication: "Growth capital deployed, may need additional working capital for operations"
      },
      {
        source: "UCC",
        type: "FILING_DETECTED",
        event: "UCC-1 filed against $180K equipment purchase",
        implication: "Capital expenditure signals growing operations and potential cash flow strain"
      },
      {
        source: "LINKEDIN",
        type: "EXECUTIVE_HIRE",
        event: "VP of Operations hired at 60-person government services firm",
        implication: "Scaling operations, likely expanding contract portfolio"
      }
    ]
  },
  
  system: {
    intro: "Factoring prospects don't respond to generic financial services outreach. They respond when you reference the specific contract they just won or the filing they just made. We time every communication to a concrete business event the recipient recognizes.",
    stages: [
      {
        name: "01 // DATA INGESTION: GOV_FEED",
        description: "Ingesting SAM.gov, USASpending, SBA, UCC filings, and state SOS records daily.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // ISOLATED SEQUENCE: EMAIL_INFRASTRUCTURE",
        description: "High-deliverability email referencing the specific contract, filing, or event detected.",
        channel: "EMAIL_INFRASTRUCTURE"
      },
      {
        name: "03 // DIRECT INTERVENTION: HUMAN_DIALERS",
        description: "Phone team calling within 48 hours of signal detection to reach decision maker while the need is acute.",
        channel: "HUMAN_DIALERS"
      },
      {
        name: "04 // PHYSICAL TRIGGER: DIRECT_MAIL",
        description: "Programmatic direct mail to non-responsive tier-1 targets carrying personalized collateral.",
        channel: "DIRECT_MAIL"
      }
    ]
  },
  
  terrain: {
    intro: "We operate inside federal procurement and commercial lending infrastructure.",
    description: "Government contracting follows structured procurement cycles with predictable cash flow gaps. We map the entire pipeline — from contract award to first invoice — and identify the exact window where working capital becomes critical. Outreach is anchored to federal spending data, not purchased lists.",
    items: [
      { id: "SYS_01", name: "FEDERAL PROCUREMENT MAPPING", description: "Tracking contract awards from obligation through disbursement to identify cash flow gaps." },
      { id: "SYS_02", name: "NAICS-BASED TARGETING", description: "Isolating industries with the highest factoring propensity based on contract type and payment terms." },
      { id: "SYS_03", name: "MULTI-BUYER ROUTING", description: "The same signal can route to factoring companies, DCAA CPAs, cybersecurity/CMMC firms, staffing agencies, and insurance brokers depending on the buyer type." }
    ]
  },
  
  outcome: {
    intro: "A single factoring client with a $2M government contract generates $40,000 to $120,000 in annual factoring fees. First-time awardees with no existing banking relationships convert at the highest rates. We surface them on day one.",
    dashboardMock: [
      { metric: "ACTIVE_PIPELINE_VALUE", value: "$3.8M", status: "nominal" },
      { metric: "QUALIFIED_MEETINGS_BOOKED", value: "23", status: "nominal" },
      { metric: "COST_PER_MEETING", value: "-15.1%", status: "nominal" },
      { metric: "CONTRACTS_DETECTED_THIS_MONTH", value: "847", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We deploy one factoring partner per NAICS cluster. If you have the capital to fund within 72 hours of approval, apply."
  }
};

// ------------------------------------------
// 4. SOFTWARE
// ------------------------------------------
export const softwareConfig: VerticalConfig = {
  slug: "software",
  metaTitle: "Engineered Demand | Target: Software",
  metaDescription: "Proprietary pipeline infrastructure configured for high-velocity Software outbound sales.",
  
  hero: {
    classification: "TARGET: SOFTWARE",
    tension: "Your ICP just changed their stack.\nThe window is 90 days.",
    subtext: "When a company hires a new VP of Ops, rips out their CRM, closes a funding round, or crosses a headcount threshold, they enter a buying window. Most sales teams find out six months later. We detect these shifts the week they happen and deploy outbound before the window closes."
  },
  
  marketMap: {
    totalDMCount: "8,419",
    statesCovered: ["United States", "United Kingdom", "Canada"],
    titlesTargeted: [
      "VP of Operations",
      "Head of Engineering",
      "CTO",
      "Director of IT",
      "VP of Sales",
      "Chief Revenue Officer"
    ]
  },
  
  signals: {
    intro: "These are the structural conditions where outreach converts.\nNot random emails. Timed to exact inflection points in the market.",
    feed: [
      {
        source: "LINKEDIN",
        type: "EXECUTIVE_HIRE",
        event: "New VP of Engineering hired at Series B fintech",
        implication: "New leadership initiates vendor review within first 90 days"
      },
      {
        source: "TECH_STACK",
        type: "PLATFORM_REMOVAL",
        event: "Company removes Salesforce from DNS headers",
        implication: "Stack transition underway, evaluating replacements"
      },
      {
        source: "FUNDING",
        type: "SERIES_B_CLOSE",
        event: "$18M Series B closed, announced on Crunchbase",
        implication: "Capital deployed, hiring and tooling decisions accelerating"
      },
      {
        source: "HEADCOUNT",
        type: "THRESHOLD_CROSSED",
        event: "Company crosses 50 employees per LinkedIn data",
        implication: "Compliance, HR, and infrastructure tools become mandatory"
      },
      {
        source: "JOB_POSTING",
        type: "ROLE_SIGNAL",
        event: "Company posts for first-ever Data Engineer role",
        implication: "Building data infrastructure from scratch, evaluating tooling"
      },
      {
        source: "G2",
        type: "CATEGORY_SEARCH_SPIKE",
        event: "Spike in G2 category research activity from target account",
        implication: "Active evaluation phase, decision timeline compressed"
      }
    ]
  },
  
  system: {
    intro: "Software buyers are overwhelmed with outbound. Generic sequences get archived. Signal-timed outreach that references a specific change in their business gets read. We deploy email and LinkedIn in precise sequence, timed to structural shifts detected in real time.",
    stages: [
      {
        name: "01 // DATA INGESTION: SIGNAL_LAYER",
        description: "Monitoring LinkedIn, job boards, DNS records, funding databases, and review platforms continuously.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // ISOLATED SEQUENCE: EMAIL_INFRASTRUCTURE",
        description: "High-deliverability email referencing the specific hiring, funding, or tech stack change detected.",
        channel: "EMAIL_INFRASTRUCTURE"
      },
      {
        name: "03 // LINKEDIN SEQUENCE: SOCIAL_LAYER",
        description: "Automated connection requests and messages sequenced with conditional logic based on response behavior.",
        channel: "SOCIAL_LAYER"
      },
      {
        name: "04 // DIRECT INTERVENTION: HUMAN_DIALERS",
        description: "Phone team engaging non-responsive tier-1 accounts to map org chart and locate the actual decision maker.",
        channel: "HUMAN_DIALERS"
      }
    ]
  },
  
  terrain: {
    intro: "We operate inside the modern B2B buying cycle.",
    description: "Software purchasing has shifted from top-down mandates to committee-based evaluation. The average B2B deal now involves 6-10 stakeholders. We map the buying committee at each target account, identify the champion and the economic buyer, and sequence outreach to both. Timing is anchored to structural change signals — not calendar-based cadences.",
    items: [
      { id: "SYS_01", name: "BUYING COMMITTEE MAPPING", description: "Identifying champions, economic buyers, and technical evaluators within each account." },
      { id: "SYS_02", name: "TECH STACK INTELLIGENCE", description: "Monitoring DNS, script tags, and job postings to detect platform changes before they're announced." },
      { id: "SYS_03", name: "MULTI-THREAD SEQUENCING", description: "Running parallel outreach to multiple stakeholders within the same account, coordinated to avoid collision." }
    ]
  },
  
  outcome: {
    intro: "The average Software contract value for mid-market accounts ranges from $30,000 to $150,000 annually. One booked meeting with a qualified account in active evaluation can generate pipeline worth 50-100x the cost of the meeting. We engineer the timing. You run the demo.",
    dashboardMock: [
      { metric: "ACTIVE_PIPELINE_VALUE", value: "$4.2M", status: "nominal" },
      { metric: "QUALIFIED_MEETINGS_BOOKED", value: "31", status: "nominal" },
      { metric: "COST_PER_MEETING", value: "-11.7%", status: "nominal" },
      { metric: "SIGNAL_EVENTS_PROCESSED_THIS_MONTH", value: "2,847", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We onboard one software company per ICP cluster per quarter. If you have product-market fit and a sales team ready to close, apply."
  }
};

// ------------------------------------------
// 5. PRIVATE EQUITY
// ------------------------------------------
export const privateEquityConfig: VerticalConfig = {
  slug: "private-equity",
  metaTitle: "Engineered Demand | Target: Private Equity",
  metaDescription: "Proprietary pipeline infrastructure configured for Private Equity deal sourcing.",
  
  hero: {
    classification: "TARGET: PRIVATE EQUITY",
    tension: "The deal is sourced before the banker calls.",
    subtext: "Private equity firms spend millions on deal sourcing. Bankers send the same decks to the same buyers. Proprietary deal flow means reaching business owners directly — at the exact moment their circumstances signal readiness to transact. We build the infrastructure that finds them first."
  },
  
  marketMap: {
    totalDMCount: "14,209",
    statesCovered: ["Nationwide", "Dental", "Veterinary", "Behavioral Health", "Home Services", "Construction", "Staffing", "Trucking", "HVAC", "Plumbing", "Electrical", "Waste Management", "Auto Body", "Dermatology", "Med Spa"],
    titlesTargeted: [
      "Founder",
      "Owner",
      "CEO",
      "President",
      "Managing Partner",
      "CFO",
      "Director of Operations"
    ]
  },
  
  signals: {
    intro: "These are the structural conditions where outreach converts.\nNot random emails. Timed to exact inflection points in the market.",
    feed: [
      {
        source: "STATE_SOS",
        type: "ENTITY_AGE_THRESHOLD",
        event: "Business incorporated 20+ years ago, owner aged 58-67",
        implication: "Prime succession planning window, likely no formal exit strategy"
      },
      {
        source: "UCC",
        type: "EQUIPMENT_LOAN_PAYOFF",
        event: "UCC filing terminated on $400K equipment loan",
        implication: "Debt-free balance sheet, attractive acquisition target"
      },
      {
        source: "LINKEDIN",
        type: "FOUNDER_ACTIVITY_DROP",
        event: "Owner posting frequency dropped 80% over 6 months",
        implication: "Possible burnout or quiet preparation to exit"
      },
      {
        source: "SBA",
        type: "LOAN_MATURITY",
        event: "SBA 7(a) loan maturing in next 90 days",
        implication: "Refinancing decision point, open to conversations about liquidity"
      },
      {
        source: "LICENSE",
        type: "NEW_LOCATION_FILING",
        event: "Competitor in same DMA files second location permit",
        implication: "Market consolidation accelerating, owners feeling competitive pressure"
      },
      {
        source: "INDEED",
        type: "KEY_ROLE_POSTED",
        event: "Owner-operator posts for first-ever GM or operations manager",
        implication: "Attempting to step back from day-to-day, early exit signal"
      }
    ]
  },
  
  system: {
    intro: "Business owners who are ready to sell don't announce it. They don't list on BizBuySell. The best deals are sourced through direct outreach timed to life and business signals that indicate readiness. We deploy multi-channel campaigns that reach owners with the right message at the right moment — before a banker or broker enters the picture.",
    stages: [
      {
        name: "01 // SIGNAL INGESTION: OWNER_INTELLIGENCE",
        description: "Monitoring state filings, UCC records, SBA loan data, LinkedIn activity patterns, and hiring signals to identify owners approaching transition.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // ISOLATED SEQUENCE: EMAIL_INFRASTRUCTURE",
        description: "High-deliverability email referencing the specific business, its market position, and the PE firm's thesis. Personalized at the individual level, not templated.",
        channel: "EMAIL_INFRASTRUCTURE"
      },
      {
        name: "03 // DIRECT INTERVENTION: HUMAN_DIALERS",
        description: "Trained callers having real conversations with business owners. Not scripted SDR calls — consultative outreach from people who understand the owner's world.",
        channel: "HUMAN_DIALERS"
      },
      {
        name: "04 // PHYSICAL TRIGGER: DIRECT_MAIL",
        description: "Personalized letters and branded collateral mailed to business owners. Physical mail carries authority that email cannot. QR-tracked to custom landing pages.",
        channel: "DIRECT_MAIL"
      }
    ]
  },
  
  terrain: {
    intro: "We operate inside the private equity deal sourcing lifecycle.",
    description: "Proprietary deal flow is the single highest-value capability in private equity. We map entire verticals — every owner, every location, every signal of transition readiness — and deploy outreach that positions our clients as the first credible conversation an owner has about their future. This is not lead generation. This is market coverage at the thesis level.",
    items: [
      { id: "SYS_01", name: "THESIS-LEVEL TARGETING", description: "Building total addressable universes mapped to specific rollup theses across 14+ verticals." },
      { id: "SYS_02", name: "OWNER LIFECYCLE MAPPING", description: "Tracking business age, owner tenure, debt maturity, hiring patterns, and competitive pressure to score exit readiness." },
      { id: "SYS_03", name: "MULTI-FIRM ISOLATION", description: "Each PE client's outreach runs on completely isolated infrastructure. No shared domains, no signal leakage between competing firms." }
    ]
  },
  
  outcome: {
    intro: "A single proprietary deal sourced through direct outreach can represent $5M to $50M in enterprise value. Platform add-ons sourced through the same system compound portfolio value over the life of the hold. The system generates owner conversations. Your deal team closes them.",
    dashboardMock: [
      { metric: "ACTIVE_PIPELINE_VALUE", value: "$84M", status: "nominal" },
      { metric: "OWNER_CONVERSATIONS_BOOKED", value: "31", status: "nominal" },
      { metric: "VERTICALS_COVERED", value: "6", status: "nominal" },
      { metric: "PROPRIETARY_DEAL_RATE", value: "94%", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We deploy one PE firm per rollup vertical. If you have a defined thesis and a deal team ready to move, apply."
  }
};

export const realEstateConfig: VerticalConfig = {
  slug: "real-estate",
  metaTitle: "Engineered Demand | Target: Real Estate Development",
  metaDescription: "Proprietary pipeline infrastructure configured for the US Real Estate Development market.",
  
  hero: {
    classification: "TARGET: REAL ESTATE DEVELOPMENT",
    tension: "The best properties never hit the market.",
    subtext: "Off-market acquisitions define portfolio returns. But most developers find deals the same way — waiting for brokers to send listings that every other buyer has already seen. We monitor public records for signals that an owner is ready to sell before they've made a single phone call."
  },
  
  marketMap: {
    totalDMCount: "11,847",
    statesCovered: ["New York City (Brooklyn, Queens, Bronx, Manhattan)", "Nassau County", "Westchester County", "Jersey City", "Newark"],
    titlesTargeted: [
      "Property Owner", 
      "LLC Managing Member", 
      "Registered Agent", 
      "Executor", 
      "Trustee", 
      "Building Owner"
    ]
  },
  
  signals: {
    intro: "We monitor public records for signals that an owner is ready to sell before they've made a single phone call.",
    feed: [
      {
        source: "ACRIS",
        type: "LONG_HOLD_NO_TRANSFER",
        event: "Property deeded to current owner 19 years ago, no subsequent transfer recorded, single-entity LLC",
        implication: "Long-term holder likely sitting on significant equity, no succession plan visible"
      },
      {
        source: "DOB",
        type: "EXPIRED_PERMIT",
        event: "Alteration permit pulled in 2023, no subsequent inspection, no C of O issued",
        implication: "Owner started a project and ran out of capital or abandoned it"
      },
      {
        source: "DOB",
        type: "VIOLATION_STACKING",
        event: "6 open DOB violations accumulated over 14 months, no corrections filed",
        implication: "Owner has disengaged from maintaining the property"
      },
      {
        source: "DOF",
        type: "TAX_ARREARS",
        event: "24 months of property tax arrears on R6-zoned parcel, no payment plan filed",
        implication: "Distressed owner, likely motivated to sell"
      },
      {
        source: "ACRIS",
        type: "LIS_PENDENS_FILED",
        event: "Lis pendens recorded 18 days ago, no satisfaction filed",
        implication: "Pre-foreclosure, owner has a closing window before bank action"
      },
      {
        source: "ACRIS",
        type: "UCC_TERMINATION",
        event: "UCC-1 filing on $400K equipment loan terminated last month",
        implication: "Debt cleared, clean balance sheet, owner may be preparing to exit"
      },
      {
        source: "NYDOS",
        type: "LLC_DISSOLUTION",
        event: "LLC holding title to 4-unit multifamily filed dissolution with Secretary of State",
        implication: "Entity winding down, property must be transferred or sold"
      },
      {
        source: "DOB",
        type: "ADJACENT_DEMO_PERMIT",
        event: "Demolition permit issued for parcel directly adjacent to target lot",
        implication: "Block is turning over, neighboring owners likely receiving unsolicited interest"
      }
    ]
  },
  
  system: {
    intro: "Property owners who are ready to sell don't list with a broker first. They get a letter in the mail from someone who already knows about their building. We monitor city records daily, identify the owners showing exit signals, and put your offer in their hands before any broker enters the picture.",
    stages: [
      {
        name: "01 // DATA INGESTION: PUBLIC_RECORDS",
        description: "Ingesting ACRIS deed transfers, DOB permits and violations, DOF tax rolls and arrears, lis pendens filings, UCC records, and Secretary of State entity filings. Updated daily.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // SIGNAL SCORING: DISTRESS_ANALYSIS",
        description: "Each property is scored against multiple distress and exit indicators. Long hold period, violation count, tax arrears depth, permit status, lien activity, entity dissolution — weighted and ranked by likelihood of seller motivation.",
        channel: "SCORING_ENGINE"
      },
      {
        name: "03 // OWNER ENRICHMENT: CONTACT_LAYER",
        description: "Resolving property ownership through LLC records, registered agent filings, and deed party names. Enriching with mailing addresses, phone numbers, and entity relationships to reach the actual decision maker.",
        channel: "ENRICHMENT_API"
      },
      {
        name: "04 // DIRECT OUTREACH: PHYSICAL_TRIGGER",
        description: "Personalized direct mail to property owners referencing their specific building, its condition signals, and a clear offer to have a conversation. Followed by phone outreach for non-responsive high-priority targets.",
        channel: "MULTI_CHANNEL"
      }
    ]
  },
  
  terrain: {
    intro: "We operate inside New York City's property record infrastructure.",
    description: "New York City publishes more structured property data than almost any other market in the country. ACRIS records every deed, mortgage, and lien. DOB tracks every permit, violation, and complaint. DOF publishes tax assessments, market values, and arrears. Most developers never look at this data systematically. We ingest all of it, cross-reference it against target acquisition criteria, and surface the properties where multiple signals converge — creating a ranked pipeline of off-market opportunities that no broker is showing anyone.",
    items: [
      {
        id: "SYS_01",
        name: "ZONING & LOT ANALYSIS",
        description: "Filtering the entire city by zoning designation, lot size, FAR utilization, and buildable square footage to match your specific development criteria."
      },
      {
        id: "SYS_02",
        name: "OWNERSHIP CHAIN RESOLUTION",
        description: "Tracing property ownership through layers of LLCs, trusts, and estate filings to identify the actual human decision maker behind the entity."
      },
      {
        id: "SYS_03",
        name: "NEIGHBORHOOD VELOCITY TRACKING",
        description: "Monitoring demolition permits, new building permits, and deed transfer frequency block by block to identify areas where turnover is accelerating."
      }
    ]
  },
  
  outcome: {
    intro: "One off-market acquisition at a better basis saves $200K to $500K in avoided broker fees alone on a mid-size deal. A $5M site acquired without competition closes at a materially lower price than the same site run through a marketed process. The system generates owner conversations. Your deal team structures the acquisition.",
    dashboardMock: [
      { metric: "ACTIVE_PIPELINE_VALUE", value: "$42M", status: "nominal" },
      { metric: "OWNER_CONVERSATIONS_BOOKED", value: "18", status: "nominal" },
      { metric: "PARCELS_MONITORED", value: "4,847", status: "nominal" },
      { metric: "OFF-MARKET_ACQ_RATE", value: "91%", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We deploy one developer per target submarket. If you have a defined buy box and the capital to close, apply."
  }
};

// ------------------------------------------
// 7. VERTICAL SAAS
// ------------------------------------------
export const verticalSaasConfig: VerticalConfig = {
  slug: "vertical-saas",
  metaTitle: "Engineered Demand | Target: Vertical SaaS",
  metaDescription: "Proprietary pipeline infrastructure configured for Vertical SaaS companies selling to SMBs.",
  
  hero: {
    classification: "TARGET: VERTICAL SAAS",
    tension: "The SMB market is massive.\nIt's also deaf to cold email.",
    subtext: "Selling software to HVAC contractors, dentists, and salon owners requires more than just generic outreach. SMB owners are drowning in operations, not checking their inbox. We bypass the digital noise by leveraging dynamic transaction signals to trigger precision direct mail and targeted cold calls exactly when they are growing, taking on debt, or hitting operational breaking points."
  },
  
  marketMap: {
    totalDMCount: "1.2M+",
    statesCovered: ["Nationwide", "Metro Hubs", "Suburban Commercial Zones"],
    titlesTargeted: [
      "Owner/Operator",
      "Managing Partner",
      "Practice Owner",
      "General Manager",
      "President"
    ]
  },
  
  signals: {
    intro: "We don't target NAICS codes. We target financial states. We identify precisely when an SMB is experiencing growth friction or cash flow anxiety.",
    feed: [
      {
        source: "TRANSACTION_VELOCITY",
        type: "GROWTH_FRICTION",
        event: "Card transaction volume increased 20%+ YoY",
        implication: "Scaling faster than current operational headcount can handle; desperate for automation"
      },
      {
        source: "UCC_FILING",
        type: "DEBT_TRIGGER",
        event: "New UCC filing for equipment financing detected within last 14 days",
        implication: "New fixed monthly overhead created; immediate need to improve cash flow and efficiency"
      },
      {
        source: "REVENUE_QUALITY",
        type: "CASH_FLOW_VOLATILITY",
        event: "Revenue consistency score drops, indicating highly lumpy cash flow",
        implication: "Stress over billing cycles; prime target for streamlined payment and invoicing software"
      },
      {
        source: "TICKET_SIZE",
        type: "COMPLEXITY_SHIFT",
        event: "Average ticket size crossed from $500 to $2000+",
        implication: "Moving from service calls to large projects/installations; existing systems breaking under complexity"
      },
      {
        source: "EXPANSION",
        type: "MULTI_LOCATION_TRIGGER",
        event: "Business registers 3rd physical location",
        implication: "Centralized management required; manual processes no longer viable"
      },
      {
        source: "HIRING_VELOCITY",
        type: "STAFFING_STRAIN",
        event: "Significant spike in job postings for administrative and front-desk roles",
        implication: "Customer intake is overwhelming current staff; software intervention needed"
      }
    ]
  },
  
  system: {
    intro: "Vertical SaaS sales fail when reps act like they are selling to the Fortune 500. SMB owners don't want a platform; they want a problem solved. We deploy physical triggers and direct conversations timed exactly to their pain points.",
    stages: [
      {
        name: "01 // DATA INGESTION: TRANSACTIONAL SIGNALS",
        description: "Monitoring actual card revenue data, transaction velocity, UCC filings, and location expansions.",
        channel: "DATA_LAYER"
      },
      {
        name: "02 // PHYSICAL TRIGGER: DIRECT_MAIL",
        description: "Programmatic, high-production direct mail sent to the physical location referencing their specific inflection point.",
        channel: "PHYSICAL_INFRASTRUCTURE"
      },
      {
        name: "03 // DIRECT INTERVENTION: HUMAN_DIALERS",
        description: "In-house phone reps calling the local branch or HQ, armed with specific hooks about their recent growth or equipment purchases.",
        channel: "HUMAN_DIALERS"
      },
      {
        name: "04 // WARM HANDOFF: LIVE TRANSFER",
        description: "Qualified SMB owners transferred directly to your Account Executives while the urgency is high.",
        channel: "VOICE_RECON"
      }
    ]
  },
  
  terrain: {
    intro: "We operate at the intersection of SMB operations and transaction signaling.",
    description: "Vertical SaaS champions like meetdandy.com, mura.co, phorest.com, and joinmoxie.com know that local businesses don't buy software the way enterprises do. We map the physical entities, tie DBAs to parent companies for accurate targeting, and prioritize accounts based on the 'Perfect Storm' of high transaction velocity and recent debt, ensuring your reps only speak to owners who need help now.",
    items: [
      { id: "SYS_01", name: "Dynamic Financial States", description: "Moving beyond static firmographics to target businesses based on real-time financial distress or hyper-growth." },
      { id: "SYS_02", name: "Entity Mapping", description: "Linking DBA names to Parent Legal Entities and physical branch locations for precise mail routing." },
      { id: "SYS_03", name: "Prioritization Heuristics", description: "Tiering outreach targets to ensure Tier 1 leads (High Velocity + Recent Debt + High Ticket) get white-glove treatment." }
    ]
  },
  
  outcome: {
    intro: "Selling SaaS to SMBs is a volume game, but the volume must be qualified. One signed contractor or multi-location salon scales your ARR efficiently with low churn. We pinpoint the ready buyers. Your team closes them.",
    dashboardMock: [
      { metric: "TIER_1_ACCOUNTS_IDENTIFIED", value: "847", status: "nominal" },
      { metric: "LIVE_TRANSFERS_COMPLETED", value: "42", status: "nominal" },
      { metric: "DIRECT_MAIL_CONVERSION", value: "+14.5%", status: "nominal" },
      { metric: "CAC_REDUCTION", value: "-22.1%", status: "nominal" }
    ]
  },
  
  gate: {
    scarcityText: "We partner with one Vertical SaaS firm per sub-industry (e.g., one for HVAC, one for Salons). Apply for exclusivity."
  }
};
