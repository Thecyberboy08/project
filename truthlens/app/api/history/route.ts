import { NextRequest } from "next/server";
import { getAllAnalyses } from "@/lib/ai/demo-provider";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const risk = url.searchParams.get("risk");
    const search = url.searchParams.get("search");
    const sort = url.searchParams.get("sort") || "date";

    let analyses = getAllAnalyses();

    if (type && type !== "all") {
      analyses = analyses.filter((a) => a.type === type);
    }

    if (risk && risk !== "all") {
      analyses = analyses.filter((a) => a.riskLevel.toLowerCase() === risk);
    }

    if (search) {
      const q = search.toLowerCase();
      analyses = analyses.filter((a) => a.input.toLowerCase().includes(q));
    }

    if (sort === "score") {
      analyses.sort((a, b) => b.score - a.score);
    } else {
      analyses.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return Response.json({
      items: analyses.map((a) => ({
        id: a.id,
        type: a.type,
        input: a.input,
        score: a.score,
        verdict: a.verdict,
        confidence: a.confidence,
        riskLevel: a.riskLevel,
        createdAt: a.createdAt,
      })),
      total: analyses.length,
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
