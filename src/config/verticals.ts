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

export const wineAndSpiritsConfig: VerticalConfig = {
  slug: "wine-and-spirits",
  metaTitle: "Outbound Solutions | Target: Wine & Spirits",
  metaDescription: "Proprietary pipeline infrastructure configured for the US Wine & Spirits wholesale distribution market.",
  
  hero: {
    classification: "TARGET: WINE & SPIRITS",
    tension: "The brand is built.\nThe distribution isn't.",
    subtext: "Competing for distributor attention is structural warfare. Founders burn cycles acting as the sole sales team, making expansion decisions based on gut feel, and sending expensive sample runs to portfolio managers who never asked for them. We bypass the noise by treating distribution acquisition as an engineering problem."
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
        event: "Distributor drops competing tequila brand from portfolio",
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
        implication: "New distributor actively building portfolio"
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
        event: "Regional distributor files to operate in 2 additional states",
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
    description: "Cold outreach fails when it ignores regulatory structure. We map precisely which states a client is actively licensed to sell in and saturate those territories. Concurrently, we run light reconnaissance into target expansion states to pre-warm distributors, ensuring pipeline waits the moment state permits clear.",
    items: [
      { id: "SYS_01", name: "Three-Tier Compliance", description: "Mapping distributor relationships directly to supplier licenses." },
      { id: "SYS_02", name: "State-by-State Control", description: "Navigating franchise state laws versus open markets." },
      { id: "SYS_03", name: "Control State Routing", description: "Isolating broker models required for state-run jurisdictions." }
    ]
  },
  
  outcome: {
    intro: "A single regional distributor actively pushing a brand can generate $240K to $1M in annual wholesale revenue. It places a product in 50 to 200 immediate accounts. We engineer the meetings. You close the distribution.",
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
