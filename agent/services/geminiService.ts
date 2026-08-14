import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function scoreJobs(profile: any, jobs: any[]) {
  if (!jobs || jobs.length === 0) {
    return [];
  }

  const prompt = `
You are an expert job matching system.

Your task is to score jobs against the candidate profile.

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOBS:
${JSON.stringify(jobs, null, 2)}

SCORING RULES:

1. Score every job from 0 to 100.

2. Skills are the most important factor.
   - Exact skill match = strong positive.
   - Related skills = moderate positive.

3. Role/title match is important.
   - If candidate wants "Full Stack Developer" and job is
     "Full Stack Developer", give strong points.
   - Frontend, Backend, MERN, React, Node.js etc. should be
     considered related where appropriate.

4. Location:
   - If the job is Remote and candidate accepts Remote,
     this should NOT reduce the score.
   - If the job location matches the candidate's preferred
     country/location, give positive points.
   - If location clearly conflicts with the candidate preference,
     reduce the score moderately.

5. Experience:
   - Do NOT heavily penalize an entry-level candidate simply because
     the job does not explicitly specify experience.
   - If a job explicitly requires many years of experience,
     reduce the score.

6. Salary:
   - Consider salary only when candidate salary preferences exist.

7. Education:
   - Consider education requirements if explicitly provided.

8. A good skill and role match should normally score 60-90.

9. Excellent matches can score 90-100.

10. Do not automatically give low scores just because the job is remote.

11. NEVER invent jobs.

12. NEVER modify the job URL.

13. Copy the URL EXACTLY from the input.

14. Return ONLY valid JSON.

RETURN FORMAT:

[
  {
    "company": "",
    "title": "",
    "location": "",
    "platform": "",
    "url": "",
    "salary": "",
    "description": "",
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

    const text = response.text || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const scoredJobs = JSON.parse(cleaned);

    return scoredJobs.map((job: any) => ({
      ...job,
      score: Math.max(
        0,
        Math.min(100, Number(job.score) || 0)
      ),
    }));
  } catch (error) {
    console.error("Gemini scoring error:", error);

    // If Gemini fails, don't destroy the jobs.
    return jobs.map((job) => ({
      ...job,
      score: 0,
      reason: "Unable to calculate match score.",
    }));
  }
}