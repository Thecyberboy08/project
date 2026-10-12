import type { Verdict, RiskLevel, ContentType, ClaimStatus, EvidenceRelationship, SignalSeverity } from "@/types";

export const SCORE_RANGES = {
  HIGH_TRUST: { min: 80, max: 100, label: "High Trust" as const },
  MODERATE_TRUST: { min: 60, max: 79, label: "Moderate Trust" as const },
  UNCERTAIN: { min: 40, max: 59, label: "Uncertain" as const },
  HIGH_RISK: { min: 0, max: 39, label: "High Risk" as const },
} as const;

export function getScoreVerdict(score: number): Verdict {
  if (score >= 80) return "High Trust";
  if (score >= 60) return "Moderate Trust";
  if (score >= 40) return "Uncertain";
  return "High Risk";
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "Low";
  if (score >= 60) return "Medium";
  if (score >= 40) return "High";
  return "Critical";
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-cyan-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
  if (score >= 60) return "bg-cyan-500/10 border-cyan-500/20";
  if (score >= 40) return "bg-orange-500/10 border-orange-500/20";
  return "bg-red-500/10 border-red-500/20";
}

export function getVerdictColor(verdict: Verdict): string {
  switch (verdict) {
    case "High Trust":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "Moderate Trust":
      return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    case "Uncertain":
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "High Risk":
      return "text-red-400 bg-red-500/10 border-red-500/20";
  }
}

export function getRiskLevelColor(level: RiskLevel): string {
  switch (level) {
    case "Low":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "Medium":
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "High":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    case "Critical":
      return "text-red-400 bg-red-500/10 border-red-500/20";
  }
}

export function getClaimStatusColor(status: ClaimStatus): string {
  switch (status) {
    case "Supported":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "Partially Supported":
      return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
    case "Unverified":
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "Contradicted":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    case "Misleading":
      return "text-red-400 bg-red-500/10 border-red-500/20";
  }
}

export function getEvidenceColor(
  relationship: EvidenceRelationship
): string {
  switch (relationship) {
    case "Supporting":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "Contradicting":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    case "Neutral":
      return "text-muted-foreground bg-muted/50 border-border";
    case "Related":
      return "text-cyan-400 bg-cyan-500/10 border-cyan-500/20";
  }
}

export function getSeverityColor(severity: SignalSeverity): string {
  switch (severity) {
    case "None":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "Low":
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "Medium":
      return "text-orange-400 bg-orange-500/10 border-orange-500/20";
    case "High":
      return "text-red-400 bg-red-500/10 border-red-500/20";
  }
}

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  text: "Text",
  url: "URL",
  image: "Image",
  video: "Video",
  audio: "Audio",
};

export const CONTENT_TYPE_ICONS: Record<ContentType, string> = {
  text: "FileText",
  url: "Globe",
  image: "Image",
  video: "Video",
  audio: "Headphones",
};

export const ANALYSIS_STAGES = [
  "Processing input",
  "Extracting claims",
  "Analyzing content",
  "Verifying sources",
  "Checking manipulation",
  "Calculating risk",
  "Preparing evidence",
] as const;
