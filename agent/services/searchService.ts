import { linkedinAgent } from "@/agents/linkedinAgent";
import { scoreJobs } from "@/services/geminiService";

export async function getJobs() {
  // 1. Get jobs from the platform
  const jobs = await linkedinAgent();

  // 2. Send them to Gemini AI for filtering/scoring
  const filtered = await scoreJobs(jobs);

  // 3. Return the filtered jobs
  return filtered;
}

// Backwards compatibility: keep the old name available
export const searchJobs = getJobs;