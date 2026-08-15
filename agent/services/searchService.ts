import { adzunaAgent } from "@/agents/adzunaAgent";
import { remoteokAgent } from "@/agents/remoteokAgent";

import { getProfile } from "./profileService";
import { scoreJobs } from "./geminiService";
import { saveJobs } from "./jobService";

export async function searchJobsDetailed() {
  const jobs = await searchJobs();

  return {
    jobs,
    warnings: [],
  };
}

export async function searchJobs() {
  try {
    // 1. Get candidate profile
    const profile = await getProfile();

    if (!profile) {
      console.log("No profile found");
      return [];
    }

    // 2. Fetch real jobs from APIs
    const [adzunaJobs, remoteJobs] = await Promise.all([
      adzunaAgent(profile),
      remoteokAgent(profile),
    ]);

    // 3. Make sure both are arrays
    const jobs = [
      ...(Array.isArray(adzunaJobs) ? adzunaJobs : []),
      ...(Array.isArray(remoteJobs) ? remoteJobs : []),
    ];

    console.log("REAL JOBS FOUND:", jobs.length);

    if (jobs.length === 0) {
      console.log("No jobs found from any source");
      return [];
    }

    // 4. Remove jobs without URLs
    const validJobs = jobs.filter(
      (job) =>
        job &&
        typeof job.url === "string" &&
        job.url.trim() !== ""
    );

    console.log("JOBS WITH VALID URLS:", validJobs.length);

    // 5. Remove duplicate jobs using URL
    const uniqueJobs = Array.from(
      new Map(
        validJobs.map((job) => [job.url, job])
      ).values()
    );

    console.log("UNIQUE JOBS:", uniqueJobs.length);

    if (uniqueJobs.length === 0) {
      return [];
    }

    // 6. Send real jobs to Gemini for scoring
    const scoredJobs = await scoreJobs(
      profile,
      uniqueJobs
    );

    console.log(
      "SCORED JOBS:",
      scoredJobs.map(
        (job: {
          title?: string;
          company?: string;
          score?: number;
          url?: string;
        }) => ({
          title: job.title,
          company: job.company,
          score: job.score,
          url: job.url,
        })
      )
    );

    // 7. Save/update jobs in MongoDB
    await saveJobs(scoredJobs);

    console.log(
      `Saved ${scoredJobs.length} jobs to MongoDB`
    );

    // 8. Return scored jobs
    return scoredJobs;

  } catch (error) {
    console.error(
      "Search Jobs Error:",
      error
    );

    return [];
  }
}