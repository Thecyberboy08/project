"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ANALYSIS_STAGES,
} from "@/lib/constants";
import {
  Loader2,
  CheckCircle2,
  Cpu,
  Search,
  Globe,
  Shield,
  BarChart3,
  FileText,
} from "lucide-react";

const stageIcons = [Cpu, Search, Globe, Shield, Shield, BarChart3, FileText];

export function AnalysisProgress() {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    const stageTimings = [400, 500, 600, 400, 300, 300, 200];

    let timeout: NodeJS.Timeout;
    if (currentStage < ANALYSIS_STAGES.length) {
      timeout = setTimeout(() => {
        setCompletedStages((prev) => [...prev, currentStage]);
        if (currentStage < ANALYSIS_STAGES.length - 1) {
          setCurrentStage((prev) => prev + 1);
        }
      }, stageTimings[currentStage]);
    }

    return () => clearTimeout(timeout);
  }, [currentStage]);

  const progress =
    ((completedStages.length + (currentStage < ANALYSIS_STAGES.length ? 0.5 : 1)) /
      ANALYSIS_STAGES.length) *
    100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
      <div className="text-center mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mx-auto mb-4">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Analyzing Content</h2>
        <p className="text-sm text-muted-foreground">
          TruthLens is processing your content through multiple verification stages.
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="space-y-1">
            {ANALYSIS_STAGES.map((stage, i) => {
              const Icon = stageIcons[i];
              const isCompleted = completedStages.includes(i);
              const isCurrent = i === currentStage && !isCompleted;
              const isPending = i > currentStage;

              return (
                <div
                  key={stage}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                    isCompleted && "text-emerald-400",
                    isCurrent && "text-primary bg-primary/5",
                    isPending && "text-muted-foreground/50"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                  ) : (
                    <Icon className="h-4 w-4 shrink-0 opacity-40" />
                  )}
                  <span>{stage}</span>
                  {isCurrent && (
                    <span className="ml-auto text-xs text-primary">Processing...</span>
                  )}
                  {isCompleted && (
                    <span className="ml-auto text-xs text-emerald-400/60">Done</span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
