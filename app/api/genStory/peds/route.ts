
import { NextRequest, NextResponse } from "next/server";
import { generateStory } from "@/lib/storyGenerator";

export async function POST(req: NextRequest) {
  const { structured } = await req.json();

  const story = await generateStory(structured, "pediatrics");

  return NextResponse.json({ story });
}
