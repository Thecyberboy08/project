import { Shield, AlertTriangle, FileText, BarChart3 } from "lucide-react";
import { CONTENT_TYPE_LABELS } from "@/lib/constants";
import { getRiskLevelColor } from "@/lib/constants";
import type { Analysis } from "@/types";

interface AnalysisSummaryProps {
  analysis: Analysis;
}

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  const items = [
    {
      icon: Shield,
      label: "Verdict",
      value: analysis.verdict,
    },
    {
      icon: BarChart3,
      label: "Risk Level",
      value: analysis.riskLevel,
      colorClass: getRiskLevelColor(analysis.riskLevel),
    },
    {
      icon: FileText,
      label: "Analysis Type",
      value: CONTENT_TYPE_LABELS[analysis.type],
    },
    {
      icon: AlertTriangle,
      label: "Claims Found",
      value: `${analysis.claims.length}`,
    },
  ];

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 p-5">
      <h4 className="text-sm font-medium mb-3">Analysis Summary</h4>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 rounded-lg bg-background/50 p-2.5"
          >
            <item.icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {item.label}
              </p>
              <p
                className={`text-xs font-medium truncate ${
                  item.colorClass || "text-foreground"
                }`}
              >
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
