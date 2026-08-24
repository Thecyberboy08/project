import type { TrendingClaim } from "@/types";

const DEMO_TRENDS: TrendingClaim[] = [
  {
    id: "1",
    claim: "New study reveals benefits of a specific dietary supplement",
    riskLevel: "High",
    reports: 1247,
    firstDetected: "2026-08-20",
    direction: "rising",
    relatedSources: ["healthblog.com", "supplementreviews.net", "reddit.com"],
  },
  {
    id: "2",
    claim: "Government announces changes to education policy",
    riskLevel: "Medium",
    reports: 892,
    firstDetected: "2026-08-22",
    direction: "stable",
    relatedSources: ["reuters.com", "bbc.com", "ed.gov"],
  },
  {
    id: "3",
    claim: "Viral video shows celebrity endorsing political candidate",
    riskLevel: "High",
    reports: 3421,
    firstDetected: "2026-08-18",
    direction: "rising",
    relatedSources: ["twitter.com", "facebook.com", "factcheck.org"],
  },
  {
    id: "4",
    claim: "Economic report claims unemployment reached historic lows",
    riskLevel: "Low",
    reports: 456,
    firstDetected: "2026-08-24",
    direction: "declining",
    relatedSources: ["bls.gov", "wsj.com", "nytimes.com"],
  },
  {
    id: "5",
    claim: "Weather modification technology causing regional storms",
    riskLevel: "High",
    reports: 2103,
    firstDetected: "2026-08-15",
    direction: "stable",
    relatedSources: ["conspiracyblog.net", "alternativenews.org"],
  },
  {
    id: "6",
    claim: "Major tech company discontinuing popular product line",
    riskLevel: "Medium",
    reports: 789,
    firstDetected: "2026-08-23",
    direction: "declining",
    relatedSources: ["theverge.com", "techcrunch.com", "bloomberg.com"],
  },
];

export async function GET() {
  return Response.json({
    trends: DEMO_TRENDS,
    total: DEMO_TRENDS.length,
    isDemo: true,
  });
}
