import type { AnalysisMetrics, Verdict, RiskLevel } from "@/types";

export function calculateTrustScore(metrics: AnalysisMetrics): number {
  const sourceWeight = 0.25;
  const evidenceWeight = 0.25;
  const consistencyWeight = 0.2;
  const verificationWeight = 0.15;
  const manipulationPenalty = 0.15;

  const raw =
    metrics.sourceScore * sourceWeight +
    metrics.evidenceScore * evidenceWeight +
    metrics.consistencyScore * consistencyWeight +
    metrics.verificationConfidence * verificationWeight -
    metrics.manipulationScore * manipulationPenalty;

  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function scoreToVerdict(score: number): Verdict {
  if (score >= 80) return "High Trust";
  if (score >= 60) return "Moderate Trust";
  if (score >= 40) return "Uncertain";
  return "High Risk";
}

export function scoreToRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "Low";
  if (score >= 60) return "Medium";
  if (score >= 40) return "High";
  return "Critical";
}

export function scoreToConfidence(score: number): number {
  const base = 70;
  const variation = 25;
  const confidence = base + (score / 100) * variation;
  return Math.min(98, Math.round(confidence));
}
