import { NextRequest, NextResponse } from "next/server";
import { generateCampaignWithAI } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, dataSources, channels } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await generateCampaignWithAI({
      prompt,
      dataSources: dataSources || [],
      channels: channels || [],
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate campaign" },
      { status: 500 }
    );
  }
}
