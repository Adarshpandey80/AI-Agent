import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function scoreJobs(profile: any, jobs: any[]) {

  const prompt = `
You are an AI Job Matching Assistant.

Candidate Profile:
${JSON.stringify(profile, null, 2)}

Jobs:
${JSON.stringify(jobs)}

Task:
1. Remove irrelevant jobs.
2. Give each remaining job a score (0-100).
3. Explain the score briefly.
4. Return ONLY valid JSON.

Format:
[
  {
    "company": "",
    "title": "",
    "location": "",
    "platform": "",
    "url": "",
    "score": 95,
    "reason": ""
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text ?? "[]";

  return JSON.parse(
    text.replace(/```json/g, "").replace(/```/g, "").trim()
  );
}