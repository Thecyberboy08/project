import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { AnalysisMetrics } from "@/types";

interface ExplainableAIProps {
  metrics: AnalysisMetrics;
  score: number;
}

function getSignal(score: number) {
  if (score >= 75) return { icon: CheckCircle2, color: "text-emerald-400", label: "High" };
  if (score >= 50) return { icon: AlertCircle, color: "text-orange-400", label: "Moderate" };
  return { icon: XCircle, color: "text-red-400", label: "Low" };
}

function getExplanation(key: string, score: number): string {
  const explanations: Record<string, { high: string; moderate: string; low: string }> = {
    sourceScore: {
      high: "Sources have strong credibility and established track records.",
      moderate: "Sources have moderate credibility with some established history.",
      low: "Source credibility could not be firmly established.",
    },
    evidenceScore: {
      high: "Multiple independent sources corroborate the central claims.",
      moderate: "Some evidence supports the claims, but gaps remain.",
      low: "Limited or weak evidence available to support the claims.",
    },
    consistencyScore: {
      high: "Claims are consistent across multiple sources and contexts.",
      moderate: "Some inconsistencies detected between sources.",
      low: "Significant inconsistencies found across sources.",
    },
    manipulationScore: {
      high: "No manipulation indicators detected.",
      moderate: "Minor anomalies detected, but not conclusive.",
      low: "Multiple manipulation indicators detected.",
    },
    verificationConfidence: {
      high: "High confidence in the verification process and results.",
      moderate: "Moderate confidence; some uncertainty remains.",
      low: "Low confidence due to limited data or conflicting signals.",
    },
  };

  const level = score >= 75 ? "high" : score >= 50 ? "moderate" : "low";
  return explanations[key]?.[level] || "Analysis completed.";
}

export function ExplainableAI({ metrics }: ExplainableAIProps) {
  const signals = [
    { key: "sourceScore", label: "Source Credibility", score: metrics.sourceScore },
    { key: "evidenceScore", label: "Supporting Evidence", score: metrics.evidenceScore },
    {
      key: "consistencyScore",
      label: "Claim Consistency",
      score: metrics.consistencyScore,
    },
    {
      key: "manipulationScore",
      label: "Manipulation Indicators",
      score: metrics.manipulationScore,
      inverted: true,
    },
    {
      key: "verificationConfidence",
      label: "Cross-Source Agreement",
      score: metrics.verificationConfidence,
    },
  ];

  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-5">
        <h3 className="text-sm font-semibold mb-1">
          Why did TruthLens give this score?
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Individual signals that contributed to the trust assessment
        </p>

        <div className="space-y-3">
          {signals.map((s) => {
            const signal = s.inverted
              ? s.score < 20
                ? { icon: CheckCircle2, color: "text-emerald-400", label: "None" }
                : s.score < 40
                ? { icon: AlertCircle, color: "text-orange-400", label: "Some" }
                : { icon: XCircle, color: "text-red-400", label: "Detected" }
              : getSignal(s.score);

            return (
              <div
                key={s.key}
                className="flex items-start gap-3 rounded-lg bg-background/50 p-3"
              >
                <signal.icon className={`h-4 w-4 mt-0.5 shrink-0 ${signal.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium">{s.label}</span>
                    <span className={`text-xs ${signal.color}`}>
                      — {s.inverted ? signal.label : `${s.score}/100`}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {getExplanation(s.key, s.score)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
