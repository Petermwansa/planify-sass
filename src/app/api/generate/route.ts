import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic, category, description, platform } = await req.json();

    const prompt = `
      You are a social media content strategist.
      Generate 12 engaging content ideas for the topic "${topic}" in the category "${category}".
      Description: ${description}.
      Target platform: ${platform}.

      Return the result as a JSON array of objects.
      Each object should have:
      {
        "id": number,
        "hook": string,
        "idea": string,
        "hashtags": string[],
        "platform": string,
        "goal": string,
        "type": string
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(response.choices[0].message?.content || "{}");

    return NextResponse.json({ ideas: data });
  } catch (error: unknown) {
    console.error("API error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to generate ideas due to an unknown error";

    return NextResponse.json(
      { error: "Failed to generate ideas", details: errorMessage },
      { status: 500 }
    );
  }
}
