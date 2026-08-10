import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function scoreJobs(
  profile: any,
  jobs: any[]
) {
  if (!jobs.length) {
    return [];
  }

  const prompt = `
You are an AI Job Matching Assistant.

Candidate Profile:
${JSON.stringify(profile, null, 2)}

Jobs:
${JSON.stringify(jobs, null, 2)}

IMPORTANT RULES:

1. Only return jobs that exist in the provided Jobs list.
2. NEVER create or invent a job.
3. NEVER modify a job URL.
4. The URL must be copied EXACTLY from the input job.
5. Remove irrelevant jobs.
6. Score each remaining job from 0-100.
7. Explain the score briefly.
8. Return ONLY valid JSON.

Format:
[
  {
    "company": "",
    "title": "",
    "location": "",
    "platform": "",
    "url": "",
    "salary": "",
    "score": 0,
    "reason": ""
  }
]
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text?.trim() || "[]";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Gemini scoring error:", error);

    return [];
  }
}