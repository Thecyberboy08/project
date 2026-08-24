import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { getSeverityColor } from "@/lib/constants";
import type { ManipulationSignal } from "@/types";

interface ManipulationPanelProps {
  signals: ManipulationSignal[];
}

const signalTypeLabels: Record<string, string> = {
  metadata_anomaly: "Metadata Anomaly",
  compression_inconsistency: "Compression Inconsistency",
  visual_artifact: "Visual Artifact",
  audio_inconsistency: "Audio Inconsistency",
  synthetic_indicator: "Synthetic Generation Indicator",
  frame_anomaly: "Frame Anomaly",
  deepfake_signal: "Deepfake Signal",
};

export function ManipulationPanel({ signals }: ManipulationPanelProps) {
  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="h-4 w-4 text-orange-400" />
          <h3 className="text-sm font-semibold">Manipulation Analysis</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Signals detected during media analysis. These are analytical indicators, not
          definitive conclusions.
        </p>

        <div className="space-y-2">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="flex items-start gap-3 rounded-lg bg-background/50 p-3"
            >
              {signal.severity === "None" ? (
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle
                  className={`h-4 w-4 mt-0.5 shrink-0 ${
                    signal.severity === "High"
                      ? "text-red-400"
                      : "text-orange-400"
                  }`}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium">
                    {signalTypeLabels[signal.signalType] || signal.signalType}
                  </span>
                  <Badge
                    variant="outline"
                    className={`${getSeverityColor(signal.severity)} text-[10px] px-1.5 py-0`}
                  >
                    {signal.severity}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {signal.explanation}
                </p>
                <span className="text-[10px] text-muted-foreground">
                  Confidence: {signal.confidence}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
