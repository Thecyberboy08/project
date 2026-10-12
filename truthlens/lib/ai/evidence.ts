import type { Evidence, EvidenceRelationship, TimelineEvent } from "@/types";
import { generateId } from "./utils";

const MOCK_DOMAINS = [
  { domain: "reuters.com", credibility: 95 },
  { domain: "apnews.com", credibility: 94 },
  { domain: "bbc.com", credibility: 92 },
  { domain: "nytimes.com", credibility: 90 },
  { domain: "theguardian.com", credibility: 88 },
  { domain: "washingtonpost.com", credibility: 89 },
  { domain: "nature.com", credibility: 96 },
  { domain: "sciencedirect.com", credibility: 93 },
  { domain: "who.int", credibility: 97 },
  { domain: "cdc.gov", credibility: 95 },
  { domain: "factcheck.org", credibility: 91 },
  { domain: "snopes.com", credibility: 87 },
  { domain: "politifact.com", credibility: 86 },
  { domain: "wikipedia.org", credibility: 75 },
  { domain: "medium.com", credibility: 60 },
  { domain: "substack.com", credibility: 58 },
  { domain: "reddit.com", credibility: 45 },
  { domain: "twitter.com", credibility: 40 },
  { domain: "facebook.com", credibility: 38 },
  { domain: "unknown-source.com", credibility: 25 },
];

function pickDomains(
  count: number,
  rand: () => number
): Array<{ domain: string; credibility: number }> {
  const shuffled = [...MOCK_DOMAINS].sort(() => rand() - 0.5);
  return shuffled.slice(0, count);
}

export function generateEvidence(
  claim: string,
  seed: number,
  relationship: EvidenceRelationship,
  count: number
): Evidence[] {
  const rand = seededRandom(seed);
  const domains = pickDomains(count, rand);

  return domains.map((d, i) => {
    const titles = getEvidenceTitles(claim, relationship, rand);
    return {
      id: generateId(),
      analysisId: "",
      title: titles[i % titles.length],
      url: `https://${d.domain}/article/${Math.floor(rand() * 99999)}`,
      domain: d.domain,
      relationship,
      credibilityScore: d.credibility + Math.floor(rand() * 10) - 5,
      publishedAt: generatePastDate(rand),
      description: getEvidenceDescription(relationship, rand),
    };
  });
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getEvidenceTitles(
  _claim: string,
  relationship: EvidenceRelationship,
  rand: () => number
): string[] {
  const supporting = [
    "Research Confirms Central Claim",
    "Multiple Sources Corroborate Report",
    "Expert Analysis Supports Findings",
    "Official Statement Aligns with Claim",
    "Independent Verification Confirms Details",
  ];

  const contradicting = [
    "Experts Question Key Assumptions",
    "Official Sources Dispute Claims",
    "Analysis Reveals Inconsistencies",
    "Fact-Check Raises Concerns",
    "Alternative Evidence Presented",
  ];

  const neutral = [
    "Related Context and Background",
    "Historical Precedent Analysis",
    "Expert Commentary on Topic",
    "Additional Context Worth Considering",
    "Broader Implications Explored",
  ];

  const titles =
    relationship === "Supporting"
      ? supporting
      : relationship === "Contradicting"
      ? contradicting
      : neutral;

  const idx = Math.floor(rand() * titles.length);
  return [titles[idx], titles[(idx + 1) % titles.length]];
}

function getEvidenceDescription(
  relationship: EvidenceRelationship,
  rand: () => number
): string {
  const descriptions = {
    Supporting: [
      "Multiple established sources support the central claim.",
      "Peer-reviewed research corroborates the key findings.",
      "Official data aligns with the reported information.",
    ],
    Contradicting: [
      "Challenges part of the claim with alternative data.",
      "Official sources provide conflicting information.",
      "Analysis suggests inconsistencies in the original claim.",
    ],
    Neutral: [
      "Provides additional context without directly addressing the claim.",
      "Related background information that may be relevant.",
      "Expert perspective on the broader topic.",
    ],
    Related: [
      "Covers a related topic that provides useful context.",
      "Adjacent research that may be relevant to understanding the claim.",
      "Background information from a related angle.",
    ],
  };

  const options = descriptions[relationship];
  return options[Math.floor(rand() * options.length)];
}

function generatePastDate(rand: () => number): string {
  const now = Date.now();
  const daysAgo = Math.floor(rand() * 365);
  const date = new Date(now - daysAgo * 86400000);
  return date.toISOString().split("T")[0];
}

export function generateTimeline(
  _seed: number
): TimelineEvent[] {
  const now = new Date();

  return [
    {
      date: new Date(now.getTime() - 90 * 86400000).toISOString().split("T")[0],
      event: "Content first published",
      source: "Original publication",
    },
    {
      date: new Date(now.getTime() - 60 * 86400000).toISOString().split("T")[0],
      event: "First referenced by other sources",
      source: "Secondary coverage",
    },
    {
      date: new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0],
      event: "Fact-checkers began reviewing",
      source: "Verification organizations",
    },
    {
      date: new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0],
      event: "Updates and corrections issued",
      source: "Multiple sources",
    },
    {
      date: now.toISOString().split("T")[0],
      event: "Current verification status",
      source: "TruthLens analysis",
    },
  ];
}
