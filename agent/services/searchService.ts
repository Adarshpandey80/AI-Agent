import { adzunaAgent } from "@/agents/adzunaAgent";
import { remoteokAgent } from "@/agents/remoteokAgent";

import { getProfile } from "./profileService";
import { scoreJobs } from "./geminiService";
import { saveJobs } from "./jobService";

export async function searchJobs() {
  const profile = await getProfile();

  if (!profile) {
    return [];
  }

  console.log("Starting real job search...");

  // Fetch from real sources
  const [adzunaJobs, remoteJobs] = await Promise.all([
    adzunaAgent(profile),
    remoteokAgent(profile),
  ]);

  const jobs = [
    ...(Array.isArray(adzunaJobs) ? adzunaJobs : []),
    ...(Array.isArray(remoteJobs) ? remoteJobs : []),
  ];

  console.log("TOTAL RAW JOBS:", jobs.length);

  if (jobs.length === 0) {
    return [];
  }

  // Remove invalid jobs
  const validJobs = jobs.filter(
    (job: any) =>
      job?.url &&
      job?.title &&
      job?.company
  );

  // Remove duplicate URLs
  const uniqueJobs = Array.from(
    new Map(
      validJobs.map((job: any) => [
        job.url,
        job,
      ])
    ).values()
  );

  console.log(
    "UNIQUE REAL JOBS:",
    uniqueJobs.length
  );

  // AI scoring
  const scoredJobs = await scoreJobs(
    profile,
    uniqueJobs
  );

  console.log(
    "AI SCORED JOBS:",
    scoredJobs.length
  );

  // Save/update MongoDB
  await saveJobs(scoredJobs);

  return scoredJobs;
}