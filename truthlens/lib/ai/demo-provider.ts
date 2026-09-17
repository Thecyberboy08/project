import type {
  Analysis,
  AnalysisMetrics,
  Claim,
  ClaimStatus,
  ContentType,
  ManipulationSignal,
  SignalSeverity,
  SignalType,
  TimelineEvent,
} from "@/types";
import type { AnalysisProvider } from "./provider";
import { simpleHash, seededRandom, generateId } from "./utils";
import { calculateTrustScore, scoreToVerdict, scoreToRiskLevel, scoreToConfidence } from "./scoring";
import { generateEvidence, generateTimeline } from "./evidence";

function extractClaims(text: string): string[] {
  const sentences = text
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 15);

  if (sentences.length === 0) return [text.slice(0, 200)];
  if (sentences.length <= 3) return sentences;
  return sentences.slice(0, 5);
}

function generateClaimStatus(
  rand: () => number,
  overallScore: number
): ClaimStatus {
  const r = rand();
  if (overallScore >= 75) {
    if (r < 0.7) return "Supported";
    if (r < 0.85) return "Partially Supported";
    return "Unverified";
  }
  if (overallScore >= 50) {
    if (r < 0.4) return "Supported";
    if (r < 0.7) return "Partially Supported";
    if (r < 0.9) return "Unverified";
    return "Contradicted";
  }
  if (r < 0.2) return "Supported";
  if (r < 0.4) return "Partially Supported";
  if (r < 0.6) return "Unverified";
  if (r < 0.85) return "Contradicted";
  return "Misleading";
}

function generateManipulationSignals(
  type: ContentType,
  seed: number
): ManipulationSignal[] {
  if (type === "text" || type === "url") return [];

  const rand = seededRandom(seed + 999);
  const signals: ManipulationSignal[] = [];

  const possibleSignals: Array<{
    type: SignalType;
    explanation: string;
    baseSeverity: SignalSeverity;
  }> =
    type === "image"
      ? [
          {
            type: "metadata_anomaly",
            explanation: "EXIF data shows inconsistent camera metadata patterns.",
            baseSeverity: "Low",
          },
          {
            type: "compression_inconsistency",
            explanation: "Multiple compression artifacts detected across regions.",
            baseSeverity: "Low",
          },
          {
            type: "visual_artifact",
            explanation: "Edge inconsistencies detected around key visual elements.",
            baseSeverity: "Medium",
          },
          {
            type: "synthetic_indicator",
            explanation: "Potential synthetic-generation indicators detected.",
            baseSeverity: "Medium",
          },
        ]
      : type === "video"
      ? [
          {
            type: "frame_anomaly",
            explanation: "Frame-to-frame inconsistencies detected in facial regions.",
            baseSeverity: "Medium",
          },
          {
            type: "compression_inconsistency",
            explanation: "Variable compression patterns across video segments.",
            baseSeverity: "Low",
          },
          {
            type: "synthetic_indicator",
            explanation: "Potential deepfake indicators in lip-sync regions.",
            baseSeverity: "High",
          },
          {
            type: "metadata_anomaly",
            explanation: "Video metadata shows signs of post-processing.",
            baseSeverity: "Low",
          },
        ]
      : [
          {
            type: "audio_inconsistency",
            explanation: "Spectral analysis shows potential voice synthesis artifacts.",
            baseSeverity: "Medium",
          },
          {
            type: "synthetic_indicator",
            explanation: "Unnatural speech patterns detected in audio segments.",
            baseSeverity: "Medium",
          },
          {
            type: "metadata_anomaly",
            explanation: "Audio metadata indicates possible digital manipulation.",
            baseSeverity: "Low",
          },
        ];

  const signalCount = Math.floor(rand() * 3) + 1;
  const selected = [...possibleSignals]
    .sort(() => rand() - 0.5)
    .slice(0, signalCount);

  for (const s of selected) {
    const severity: SignalSeverity =
      rand() > 0.6
        ? s.baseSeverity === "Low"
          ? "Medium"
          : "High"
        : s.baseSeverity;

    signals.push({
      id: generateId(),
      analysisId: "",
      signalType: s.type,
      severity,
      confidence: Math.round(55 + rand() * 35),
      explanation: s.explanation,
    });
  }

  return signals;
}

function generateMetrics(
  seed: number,
  manipulationSignals: ManipulationSignal[]
): AnalysisMetrics {
  const rand = seededRandom(seed + 500);

  const manipulationScore =
    manipulationSignals.length === 0
      ? 0
      : manipulationSignals.reduce((acc, s) => {
          const sev = s.severity === "High" ? 30 : s.severity === "Medium" ? 18 : 8;
          return acc + sev * (s.confidence / 100);
        }, 0) / manipulationSignals.length;

  return {
    id: generateId(),
    analysisId: "",
    sourceScore: Math.round(60 + rand() * 35),
    evidenceScore: Math.round(55 + rand() * 40),
    consistencyScore: Math.round(50 + rand() * 45),
    manipulationScore: Math.round(manipulationScore),
    verificationConfidence: Math.round(60 + rand() * 35),
  };
}

function buildAnalysis(
  type: ContentType,
  input: string,
  seed: number
): Analysis {
  const claims = extractClaims(input);
  const manipulationSignals = generateManipulationSignals(type, seed);
  const metrics = generateMetrics(seed, manipulationSignals);
  const score = calculateTrustScore(metrics);
  const verdict = scoreToVerdict(score);
  const riskLevel = scoreToRiskLevel(score);
  const confidence = scoreToConfidence(score);

  const claimObjects: Claim[] = claims.map((claimText, i) => {
    const claimSeed = seed + i * 100;
    const claimRand = seededRandom(claimSeed);
    const claimScore = Math.max(
      0,
      Math.min(100, score + Math.round((claimRand() - 0.5) * 30))
    );
    const status = generateClaimStatus(claimRand, claimScore);
    const claimConfidence = Math.round(50 + claimRand() * 45);

    const supportingEvidence = generateEvidence(
      claimText,
      claimSeed + 1,
      "Supporting",
      Math.floor(claimRand() * 3) + 1
    );
    const contradictingEvidence = generateEvidence(
      claimText,
      claimSeed + 2,
      "Contradicting",
      Math.floor(claimRand() * 2)
    );

    return {
      id: generateId(),
      analysisId: "",
      claim: claimText,
      status,
      confidence: claimConfidence,
      evidence: [...supportingEvidence, ...contradictingEvidence],
    };
  });

  const supportingEvidence = generateEvidence(input, seed + 10, "Supporting", 3);
  const contradictingEvidence = generateEvidence(input, seed + 20, "Contradicting", 2);
  const neutralEvidence = generateEvidence(input, seed + 30, "Neutral", 2);

  const timeline: TimelineEvent[] | undefined =
    type === "url" ? generateTimeline(seed) : undefined;

  return {
    id: generateId(),
    type,
    input,
    status: "completed",
    score,
    verdict,
    confidence,
    riskLevel,
    claims: claimObjects,
    evidence: [...supportingEvidence, ...contradictingEvidence, ...neutralEvidence],
    manipulationSignals,
    metrics,
    timeline,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
}

const analysisStore = new Map<string, Analysis>();

export const demoProvider: AnalysisProvider = {
  async analyzeText(input: string): Promise<Analysis> {
    const seed = simpleHash(input);
    const analysis = buildAnalysis("text", input, seed);
    analysisStore.set(analysis.id, analysis);
    return analysis;
  },

  async analyzeUrl(url: string): Promise<Analysis> {
    const seed = simpleHash(url);
    const analysis = buildAnalysis("url", url, seed);
    analysisStore.set(analysis.id, analysis);
    return analysis;
  },

  async analyzeImage(input: string): Promise<Analysis> {
    const seed = simpleHash(input);
    const analysis = buildAnalysis("image", input, seed);
    analysisStore.set(analysis.id, analysis);
    return analysis;
  },

  async analyzeVideo(input: string): Promise<Analysis> {
    const seed = simpleHash(input);
    const analysis = buildAnalysis("video", input, seed);
    analysisStore.set(analysis.id, analysis);
    return analysis;
  },

  async analyzeAudio(input: string): Promise<Analysis> {
    const seed = simpleHash(input);
    const analysis = buildAnalysis("audio", input, seed);
    analysisStore.set(analysis.id, analysis);
    return analysis;
  },
};

export function getAnalysis(id: string): Analysis | undefined {
  return analysisStore.get(id);
}

export function getAllAnalyses(): Analysis[] {
  return Array.from(analysisStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
