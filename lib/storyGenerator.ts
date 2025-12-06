import { groqClient } from "./groq";
import {
  PEDIATRICS_TEMPLATE,
  OBGYN_TEMPLATE,
  GENERAL_TEMPLATE,
} from "./storyTemplates";

export async function generateStory(structured: any, specialty: string) {
  let template = GENERAL_TEMPLATE;

  if (specialty === "pediatrics") template = PEDIATRICS_TEMPLATE;
  if (specialty === "obgyn") template = OBGYN_TEMPLATE;

  const prompt = template.replace("{data}", JSON.stringify(structured, null, 2));

  const completion = await groqClient.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    max_tokens: 900,
    messages: [
      {
        role: "system",
        content: "You are an expert medical doctor writing polished clinical narratives.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
}
