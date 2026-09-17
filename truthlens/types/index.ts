export type ContentType = "text" | "url" | "image" | "video" | "audio";

export type AnalysisStatus = "pending" | "processing" | "completed" | "failed";

export type Verdict =
  | "High Trust"
  | "Moderate Trust"
  | "Uncertain"
  | "High Risk";

export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export type ClaimStatus =
  | "Supported"
  | "Partially Supported"
  | "Unverified"
  | "Contradicted"
  | "Misleading";

export type EvidenceRelationship =
  | "Supporting"
  | "Contradicting"
  | "Neutral"
  | "Related";

export type SignalSeverity = "None" | "Low" | "Medium" | "High";

export type SignalType =
  | "metadata_anomaly"
  | "compression_inconsistency"
  | "visual_artifact"
  | "audio_inconsistency"
  | "synthetic_indicator"
  | "frame_anomaly"
  | "deepfake_signal";

export interface Analysis {
  id: string;
  userId?: string;
  type: ContentType;
  input: string;
  status: AnalysisStatus;
  score: number;
  verdict: Verdict;
  confidence: number;
  riskLevel: RiskLevel;
  claims: Claim[];
  evidence: Evidence[];
  manipulationSignals: ManipulationSignal[];
  metrics: AnalysisMetrics;
  timeline?: TimelineEvent[];
  createdAt: string;
  completedAt?: string;
}

export interface Claim {
  id: string;
  analysisId: string;
  claim: string;
  status: ClaimStatus;
  confidence: number;
  evidence: Evidence[];
}

export interface Evidence {
  id: string;
  analysisId: string;
  claimId?: string;
  title: string;
  url: string;
  domain: string;
  relationship: EvidenceRelationship;
  credibilityScore: number;
  publishedAt?: string;
  description?: string;
}

export interface ManipulationSignal {
  id: string;
  analysisId: string;
  signalType: SignalType;
  severity: SignalSeverity;
  confidence: number;
  explanation: string;
}

export interface AnalysisMetrics {
  id: string;
  analysisId: string;
  sourceScore: number;
  evidenceScore: number;
  consistencyScore: number;
  manipulationScore: number;
  verificationConfidence: number;
}

export interface TimelineEvent {
  date: string;
  event: string;
  source?: string;
}

export interface AnalyzeRequest {
  type: ContentType;
  content: string;
}

export interface AnalyzeResponse {
  analysisId: string;
  status: AnalysisStatus;
  score: number;
  verdict: Verdict;
  confidence: number;
}

export interface AnalysisDetailResponse extends Analysis {
  isDemo: boolean;
}

export interface HistoryItem {
  id: string;
  type: ContentType;
  input: string;
  score: number;
  verdict: Verdict;
  confidence: number;
  riskLevel: RiskLevel;
  createdAt: string;
}

export interface TrendingClaim {
  id: string;
  claim: string;
  riskLevel: RiskLevel;
  reports: number;
  firstDetected: string;
  direction: "rising" | "stable" | "declining";
  relatedSources: string[];
}
