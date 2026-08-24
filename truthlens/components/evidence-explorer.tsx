"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Minus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getEvidenceColor } from "@/lib/constants";
import type { Evidence, EvidenceRelationship } from "@/types";

interface EvidenceExplorerProps {
  evidence: Evidence[];
}

const groupEvidence = (evidence: Evidence[]) => {
  const grouped: Record<EvidenceRelationship, Evidence[]> = {
    Supporting: [],
    Contradicting: [],
    Neutral: [],
    Related: [],
  };
  evidence.forEach((e) => {
    grouped[e.relationship]?.push(e);
  });
  return grouped;
};

const relationshipIcons: Record<EvidenceRelationship, typeof CheckCircle2> = {
  Supporting: CheckCircle2,
  Contradicting: XCircle,
  Neutral: Minus,
  Related: Minus,
};

export function EvidenceExplorer({ evidence }: EvidenceExplorerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const grouped = groupEvidence(evidence);

  const sections: Array<{
    key: EvidenceRelationship;
    label: string;
    count: number;
  }> = [
    {
      key: "Supporting",
      label: "Supporting Evidence",
      count: grouped.Supporting.length,
    },
    {
      key: "Contradicting",
      label: "Contradicting Evidence",
      count: grouped.Contradicting.length,
    },
    {
      key: "Neutral",
      label: "Related Evidence",
      count: grouped.Neutral.length + grouped.Related.length,
    },
  ];

  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-5">
        <h3 className="text-sm font-semibold mb-1">Evidence Explorer</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Sources found during verification analysis
        </p>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = relationshipIcons[section.key];
            const items = [
              ...grouped[section.key],
              ...(section.key === "Neutral" ? grouped.Related : []),
            ];

            if (items.length === 0) return null;

            return (
              <div key={section.key}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-3.5 w-3.5 ${
                    section.key === "Supporting"
                      ? "text-emerald-400"
                      : section.key === "Contradicting"
                      ? "text-red-400"
                      : "text-muted-foreground"
                  }`} />
                  <span className="text-xs font-medium">{section.label}</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                    {section.count}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-border/30 bg-background/30 overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === item.id ? null : item.id)
                        }
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-medium truncate">
                              {item.title}
                            </span>
                            <Badge
                              variant="outline"
                              className={`${getEvidenceColor(item.relationship)} text-[10px] px-1.5 py-0 shrink-0`}
                            >
                              {item.relationship}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>{item.domain}</span>
                            {item.publishedAt && (
                              <>
                                <span>·</span>
                                <span>{item.publishedAt}</span>
                              </>
                            )}
                          </div>
                        </div>
                        {expandedId === item.id ? (
                          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        )}
                      </button>

                      {expandedId === item.id && (
                        <div className="px-3 pb-3 border-t border-border/20">
                          <p className="text-[11px] text-muted-foreground mt-2 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">
                              Credibility:{" "}
                              <span className="text-foreground font-medium">
                                {item.credibilityScore}/100
                              </span>
                            </span>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
                            >
                              Visit source
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
