import type {
  Analysis,
  ContentType,
} from "@/types";

export interface AnalysisProvider {
  analyzeText(input: string): Promise<Analysis>;
  analyzeUrl(url: string): Promise<Analysis>;
  analyzeImage(input: string): Promise<Analysis>;
  analyzeVideo(input: string): Promise<Analysis>;
  analyzeAudio(input: string): Promise<Analysis>;
}

export type { Analysis, ContentType };
