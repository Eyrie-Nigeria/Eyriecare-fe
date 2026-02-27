import { NextRequest } from "next/server";

const OPENAI_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  if (!OPENAI_KEY) {
    return new Response(
      JSON.stringify({ error: "OPENAI_API_KEY is not set" }),
      { status: 500 }
    );
  }

  const { question } = await req.json();
  if (!question) {
    return new Response(JSON.stringify({ error: "Missing question" }), {
      status: 400,
    });
  }

  // Prepare upstream messages
  const messages = [
    {
      role: "system",
      content:
        "You are a helpful assistant that summarizes lecture content and cites professors and topics accurately.",
    },
    { role: "user", content: question },
  ];

  // Connect to OpenAI (streaming)
  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      stream: true,
      max_tokens: 800,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const errorText = await upstream.text();
    return new Response(
      JSON.stringify({
        error: "OpenAI upstream error",
        details: errorText,
      }),
      { status: 502 }
    );
  }

  // Create a TransformStream for streaming to the client
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  async function forwardStream() {
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Split into lines
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line.trim()) continue;

        const payload = line.replace(/^data:\s*/, "");

        if (payload === "[DONE]") {
          await writer.write(
            new TextEncoder().encode(JSON.stringify({ done: true }) + "\n")
          );
          await writer.close();
          return;
        }

        try {
          const json = JSON.parse(payload);
          const delta = json.choices?.[0]?.delta?.content;

          if (delta) {
            // Send NDJSON token
            await writer.write(
              new TextEncoder().encode(JSON.stringify({ text: delta }) + "\n")
            );
          }
        } catch {
          // Not JSON, send raw text
          await writer.write(
            new TextEncoder().encode(
              JSON.stringify({ text: payload }) + "\n"
            )
          );
        }
      }
    }

    // Final end marker
    await writer.write(
      new TextEncoder().encode(JSON.stringify({ done: true }) + "\n")
    );
    await writer.close();
  }

  forwardStream();

  // Return streaming response to client
  return new Response(stream.readable, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
