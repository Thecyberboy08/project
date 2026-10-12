"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustScore } from "@/components/trust-score";
import { ConfidenceMeter } from "@/components/confidence-meter";
import { AnalysisSummary } from "@/components/analysis-summary";
import { ExplainableAI } from "@/components/explainable-ai";
import { EvidenceExplorer } from "@/components/evidence-explorer";
import { ClaimBreakdown } from "@/components/claim-breakdown";
import { ManipulationPanel } from "@/components/manipulation-panel";
import { EvidenceTimeline } from "@/components/evidence-timeline";
import { DemoBadge } from "@/components/demo-badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Analysis } from "@/types";

function ResultsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const res = await fetch(`/api/analysis/${id}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setAnalysis(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalysis();
  }, [id]);

  if (loading) return <ResultsLoading />;

  if (error || !analysis) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-xl font-semibold mb-2">Analysis Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The analysis you&apos;re looking for doesn&apos;t exist or has expired.
        </p>
        <Button onClick={() => router.push("/verify")}>New Analysis</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/verify")}
          className="gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          New Analysis
        </Button>
        <Badge variant="secondary" className="border-border/50">
          {analysis.type.toUpperCase()}
        </Badge>
      </div>

      <DemoBadge />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column: Trust Score + Summary */}
        <div className="lg:col-span-1 space-y-6">
          <TrustScore score={analysis.score} verdict={analysis.verdict} />
          <AnalysisSummary analysis={analysis} />
          <ConfidenceMeter confidence={analysis.confidence} />
        </div>

        {/* Right Column: Detailed Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <ExplainableAI metrics={analysis.metrics} score={analysis.score} />
          <ClaimBreakdown claims={analysis.claims} />
          <EvidenceExplorer evidence={analysis.evidence} />
          {analysis.manipulationSignals.length > 0 && (
            <ManipulationPanel signals={analysis.manipulationSignals} />
          )}
          {analysis.timeline && (
            <EvidenceTimeline timeline={analysis.timeline} />
          )}
        </div>
      </div>
    </div>
  );
}
