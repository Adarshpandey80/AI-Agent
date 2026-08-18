import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function scoreJobs(
  profile: any,
  jobs: any[]
) {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return [];
  }

  const prompt = `
You are an AI Job Matching Assistant.

You MUST score ONLY the jobs provided below.

CANDIDATE PROFILE:
${JSON.stringify(profile, null, 2)}

JOBS:
${JSON.stringify(jobs, null, 2)}

IMPORTANT RULES:

1. NEVER create a job.
2. NEVER invent a company.
3. NEVER invent a title.
4. NEVER invent a URL.
5. NEVER modify a URL.
6. Every returned job MUST exist in the input jobs.
7. Return EXACTLY one result for every input job.
8. Keep the original URL exactly unchanged.
9. Keep company exactly from the input.
10. Keep title exactly from the input.
11. Keep platform exactly from the input.
12. Score every job from 0 to 100.
13. NEVER leave score empty.
14. Give a short reason for the score.
15. Return ONLY valid JSON.
16. Do not use markdown.
17. Do not add explanations outside JSON.

SCORING:

90-100 = Excellent match
75-89 = Very good match
60-74 = Good match
40-59 = Partial match
20-39 = Weak match
0-19 = Very poor match

RETURN EXACTLY THIS FORMAT:

[
  {
    "company": "original company",
    "title": "original title",
    "location": "original location",
    "platform": "original platform",
    "url": "EXACT ORIGINAL URL",
    "salary": "original salary",
    "description": "original description",
    "score": 0,
    "reason": "short reason"
  }
]
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0,
      },
    });

    const text = response.text?.trim();

    if (!text) {
      return jobs.map((job) => ({
        ...job,
        score: 0,
        reason: "Unable to calculate AI match score.",
      }));
    }

    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      throw new Error("Gemini did not return an array.");
    }


    // Match Gemini results back to ORIGINAL jobs using URL.
    // This prevents Gemini from inventing/replacing jobs.
    const scoredMap = new Map();

    for (const result of parsed) {
      if (!result?.url) continue;

      scoredMap.set(result.url, result);
    }

    // Return EVERY original job. If Gemini missed a job, give it score 0.
     
    return jobs.map((originalJob) => {
      const aiJob = scoredMap.get(originalJob.url);

      if (!aiJob) {
        return {
          ...originalJob,
          score: 0,
          reason:
            "AI did not return a score for this job.",
        };
      }

      return {
        ...originalJob,

        // Original data is always trusted
        company: originalJob.company,
        title: originalJob.title,
        location: originalJob.location,
        platform: originalJob.platform,
        url: originalJob.url,
        salary: originalJob.salary,
        description: originalJob.description,

        score:
          typeof aiJob.score === "number"
            ? Math.max(
                0,
                Math.min(100, aiJob.score)
              )
            : 0,

        reason:
          typeof aiJob.reason === "string"
            ? aiJob.reason
            : "No reason provided.",
      };
    });
  } catch (error) {
    console.error(
      "Gemini scoring error:",
      error
    );

    // Never lose real jobs because AI failed.
     
    return jobs.map((job) => ({
      ...job,
      score: 0,
      reason:
        "AI scoring failed. Job was still fetched successfully.",
    }));
  }
}