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

  // Fetch real jobs
  const adzunaJobs = await adzunaAgent(profile);
  const remoteJobs = await remoteokAgent(profile);

  // Combine jobs
  const jobs = [
    ...adzunaJobs,
    ...remoteJobs,
  ];

  // AI matching
  const filteredJobs = await scoreJobs(
    profile,
    jobs
  );

  // Save to MongoDB
  await saveJobs(filteredJobs);

  return filteredJobs;
}