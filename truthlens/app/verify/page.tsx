"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Globe, Image, Video, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextInput } from "@/components/verification-inputs/text-input";
import { UrlInput } from "@/components/verification-inputs/url-input";
import { UploadZone } from "@/components/verification-inputs/upload-zone";
import { AnalysisProgress } from "@/components/analysis-progress";
import type { ContentType } from "@/types";

export default function VerifyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ContentType>("text");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (type: ContentType, content: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content }),
      });
      if (!response.ok) throw new Error("Analysis failed");
      const data = await response.json();
      router.push(`/results/${data.analysisId}`);
    } catch {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return <AnalysisProgress />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Verify Content
        </h1>
        <p className="text-muted-foreground">
          Submit content for AI-powered analysis. TruthLens will extract claims,
          check sources, and provide evidence-backed assessments.
        </p>
      </div>

      <Card className="border-border/50 bg-card/50">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ContentType)}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="text" className="gap-1.5 text-xs sm:text-sm">
                <FileText className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="gap-1.5 text-xs sm:text-sm">
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">URL</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="gap-1.5 text-xs sm:text-sm">
                <Image className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Image</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="gap-1.5 text-xs sm:text-sm">
                <Video className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Video</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="gap-1.5 text-xs sm:text-sm">
                <Headphones className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Audio</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <TextInput onAnalyze={(content) => handleAnalyze("text", content)} />
            </TabsContent>

            <TabsContent value="url">
              <UrlInput onAnalyze={(content) => handleAnalyze("url", content)} />
            </TabsContent>

            <TabsContent value="image">
              <UploadZone
                type="image"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onAnalyze={(content) => handleAnalyze("image", content)}
              />
            </TabsContent>

            <TabsContent value="video">
              <UploadZone
                type="video"
                accept="video/mp4,video/webm,video/quicktime"
                onAnalyze={(content) => handleAnalyze("video", content)}
              />
            </TabsContent>

            <TabsContent value="audio">
              <UploadZone
                type="audio"
                accept="audio/mpeg,audio/wav,audio/ogg,audio/flac"
                onAnalyze={(content) => handleAnalyze("audio", content)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Analysis runs in demo mode. Results are simulated assessments for
        demonstration purposes.
      </p>
    </div>
  );
}
