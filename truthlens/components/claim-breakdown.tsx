"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getClaimStatusColor } from "@/lib/constants";
import type { Claim, ClaimStatus } from "@/types";

interface ClaimBreakdownProps {
  claims: Claim[];
}

const statusIcons: Record<ClaimStatus, typeof CheckCircle2> = {
  Supported: CheckCircle2,
  "Partially Supported": AlertCircle,
  Unverified: AlertCircle,
  Contradicted: XCircle,
  Misleading: XCircle,
};

export function ClaimBreakdown({ claims }: ClaimBreakdownProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Card className="border-border/50 bg-card/50">
      <CardContent className="p-5">
        <h3 className="text-sm font-semibold mb-1">Claim Breakdown</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Individual claims extracted and evaluated from the submitted content
        </p>

        <div className="space-y-2">
          {claims.map((claim) => {
            const Icon = statusIcons[claim.status];
            const isExpanded = expandedId === claim.id;

            return (
              <div
                key={claim.id}
                className="rounded-lg border border-border/30 bg-background/30 overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : claim.id)
                  }
                  className="w-full flex items-start gap-3 p-3 text-left hover:bg-muted/20 transition-colors"
                >
                  <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${
                    claim.status === "Supported"
                      ? "text-emerald-400"
                      : claim.status === "Contradicted" ||
                        claim.status === "Misleading"
                      ? "text-red-400"
                      : "text-orange-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium mb-1 leading-relaxed">
                      {claim.claim}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`${getClaimStatusColor(claim.status)} text-[10px] px-1.5 py-0`}
                      >
                        {claim.status}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {claim.confidence}% confidence
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        · {claim.evidence.length} sources
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  )}
                </button>

                {isExpanded && claim.evidence.length > 0 && (
                  <div className="px-3 pb-3 border-t border-border/20">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-2 mb-1.5">
                      Supporting Sources
                    </p>
                    <div className="space-y-1">
                      {claim.evidence.slice(0, 3).map((e) => (
                        <div
                          key={e.id}
                          className="flex items-center justify-between text-[11px] py-1"
                        >
                          <span className="truncate">{e.title}</span>
                          <span className="text-muted-foreground shrink-0 ml-2">
                            {e.domain}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
