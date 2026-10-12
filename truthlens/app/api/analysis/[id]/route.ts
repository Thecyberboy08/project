import { NextRequest } from "next/server";
import { getAnalysis } from "@/lib/ai/demo-provider";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const analysis = getAnalysis(id);

    if (!analysis) {
      return Response.json(
        { error: "Analysis not found" },
        { status: 404 }
      );
    }

    return Response.json({
      ...analysis,
      isDemo: true,
    });
  } catch {
    return Response.json(
      { error: "Failed to fetch analysis" },
      { status: 500 }
    );
  }
}
