import { NextRequest } from "next/server";
import { demoProvider } from "@/lib/ai/demo-provider";
import { analyzeRequestSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = analyzeRequestSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { type, content } = result.data;

    let analysis;
    switch (type) {
      case "text":
        analysis = await demoProvider.analyzeText(content);
        break;
      case "url":
        analysis = await demoProvider.analyzeUrl(content);
        break;
      case "image":
        analysis = await demoProvider.analyzeImage(content);
        break;
      case "video":
        analysis = await demoProvider.analyzeVideo(content);
        break;
      case "audio":
        analysis = await demoProvider.analyzeAudio(content);
        break;
      default:
        return Response.json(
          { error: "Unsupported content type" },
          { status: 400 }
        );
    }

    return Response.json({
      analysisId: analysis.id,
      status: analysis.status,
      score: analysis.score,
      verdict: analysis.verdict,
      confidence: analysis.confidence,
    });
  } catch {
    return Response.json(
      { error: "Analysis failed" },
      { status: 500 }
    );
  }
}
