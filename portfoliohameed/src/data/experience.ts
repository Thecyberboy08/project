export interface Experience {
  id: string;
  role: string;
  category: string;
  summary: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    id: "startup-sales",
    role: "Startup Sales Exposure",
    category: "BUSINESS OPERATIONS • CUSTOMER DISCOVERY",
    summary: "Gained practical exposure to early-stage startup operations, outreach strategies, and value communication through direct customer-facing sales activities.",
    highlights: [
      "Approaching potential customers & initiating conversations",
      "Presenting technology products & communicating core value propositions",
      "Customer follow-ups & lead nurturing",
      "Promotions & outreach campaign execution",
      "Understanding customer pain points & gathering feedback",
      "Communication & direct sales negotiation",
      "Hands-on exposure to early-stage business operations",
    ],
  },
];
