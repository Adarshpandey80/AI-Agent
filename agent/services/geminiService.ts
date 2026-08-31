import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function getLocalMatchScore(profile: any, job: any): number {
  const text = [
    job.title || "",
    job.company || "",
    job.description || "",
    job.location || "",
    job.platform || "",
    job.salary || "",
  ]
    .join(" ")
    .toLowerCase();

  const roles = (profile?.roles || [])
    .map((role: string) => String(role).toLowerCase().trim())
    .filter(Boolean);

  const skills = (profile?.skills || [])
    .map((skill: string) => String(skill).toLowerCase().trim())
    .filter(Boolean);

  const countries = (profile?.countries || [])
    .map((country: string) => String(country).toLowerCase().trim())
    .filter(Boolean);

  let score = 24;

  if (roles.length > 0) {
    const roleMatches = roles.filter((role: string) => text.includes(role));
    score += Math.min(44, roleMatches.length * 18);
  }

  if (skills.length > 0) {
    const skillMatches = skills.filter((skill: string) => text.includes(skill));
    score += Math.min(20, skillMatches.length * 5);
  }

  if (countries.length > 0) {
    const countryMatches = countries.filter((country: string) => text.includes(country));
    score += Math.min(12, countryMatches.length * 6);
  }

  if (/(remote|hybrid|distributed|online)/i.test(job.location || "") || /remote|hybrid/i.test(text)) {
    score += 10;
  }

  if (job.salary) score += 5;
  if (job.description) score += 5;

  if (score > 100) score = 100;

  return Math.max(0, Math.round(score));
}

export async function scoreJobs(profile: any, jobs: any[]) {
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
      return jobs.map((job) => {
        const localScore = getLocalMatchScore(profile, job);
        return {
          ...job,
          score: localScore,
          reason: localScore >= 80 ? "Strong profile alignment." : "Profile-based match assessment.",
        };
      });
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

    const scoredMap = new Map();

    for (const result of parsed) {
      if (!result?.url) continue;
      scoredMap.set(result.url, result);
    }

    return jobs.map((originalJob) => {
      const aiJob = scoredMap.get(originalJob.url);
      const localScore = getLocalMatchScore(profile, originalJob);

      if (!aiJob) {
        return {
          ...originalJob,
          score: localScore,
          reason: localScore >= 80 ? "Strong profile alignment." : "Profile-based match assessment.",
        };
      }

      const aiScore = typeof aiJob.score === "number" ? aiJob.score : localScore;
      const finalScore = Math.max(
        0,
        Math.min(100, Math.round((aiScore * 0.55) + (localScore * 0.45)))
      );

      return {
        ...originalJob,
        company: originalJob.company,
        title: originalJob.title,
        location: originalJob.location,
        platform: originalJob.platform,
        url: originalJob.url,
        salary: originalJob.salary,
        description: originalJob.description,
        score: finalScore,
        reason:
          typeof aiJob.reason === "string" && aiJob.reason.trim()
            ? aiJob.reason
            : finalScore >= 80
              ? "Strong match to your profile."
              : "Relevant opportunity with a good profile fit.",
      };
    });
  } catch (error) {
    console.error("Gemini scoring error:", error);

    return jobs.map((job) => {
      const localScore = getLocalMatchScore(profile, job);
      return {
        ...job,
        score: localScore,
        reason: localScore >= 80 ? "Strong profile alignment." : "Profile-based match assessment.",
      };
    });
  }
}