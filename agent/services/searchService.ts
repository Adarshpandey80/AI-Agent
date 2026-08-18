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

  // Fetch real jobs
  const adzunaJobs = await adzunaAgent(profile);
  const remoteJobs = await remoteokAgent(profile);

  const allJobs = [
    ...(Array.isArray(adzunaJobs)
      ? adzunaJobs
      : []),

    ...(Array.isArray(remoteJobs)
      ? remoteJobs
      : []),
  ];

  console.log(
    "Total jobs fetched:",
    allJobs.length
  );

  if (allJobs.length === 0) {
    return [];
  }

// Remove duplicate URLs
  
  const uniqueJobs = Array.from(
    new Map(
      allJobs
        .filter(
          (job) =>
            job &&
            job.url &&
            job.title &&
            job.company
        )
        .map((job) => [
          job.url,
          job,
        ])
    ).values()
  );

  console.log(
    "Unique jobs:",
    uniqueJobs.length
  );

  // AI scoring
  
  const scoredJobs = await scoreJobs(
    profile,
    uniqueJobs
  );

  console.log(
    "Scored jobs:",
    scoredJobs.map((job: any) => ({
      title: job.title,
      company: job.company,
      platform: job.platform,
      score: job.score,
      url: job.url,
    }))
  );

  // Save/update MongoDB
  
  await saveJobs(scoredJobs);

  return scoredJobs;
}