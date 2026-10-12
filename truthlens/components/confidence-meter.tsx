import { Progress } from "@/components/ui/progress";

interface ConfidenceMeterProps {
  confidence: number;
}

export function ConfidenceMeter({ confidence }: ConfidenceMeterProps) {
  const color =
    confidence >= 80
      ? "text-emerald-400"
      : confidence >= 60
      ? "text-cyan-400"
      : confidence >= 40
      ? "text-orange-400"
      : "text-red-400";

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium">Confidence</h4>
        <span className={`text-lg font-bold ${color}`}>{confidence}%</span>
      </div>
      <Progress value={confidence} className="h-1.5" />
      <p className="text-xs text-muted-foreground mt-2">
        How confident TruthLens is in this assessment
      </p>
    </div>
  );
}
