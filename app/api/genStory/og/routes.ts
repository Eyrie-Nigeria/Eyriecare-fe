import { NextResponse } from "next/server";
import { generateStory } from "@/lib/storyGenerator";

export async function POST(req: Request) {
  const { structured } = await req.json();

  const story = await generateStory(structured, "obgyn");

  return NextResponse.json({ story });
}
