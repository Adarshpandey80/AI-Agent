import { adzunaAgent } from "@/agents/adzunaAgent";
import { remoteokAgent } from "@/agents/remoteokAgent";

import { getProfile } from "./profileService";
import { scoreJobs } from "./geminiService";
import { saveJobs } from "./jobService";

type SearchResult = {
  jobs: any[];
  warnings: string[];
};

export async function searchJobsDetailed(): Promise<SearchResult> {
  const profile = await getProfile();

  if (!profile) {
    return {
      jobs: [],
      warnings: [],
    };
  }

  // Fetch real jobs
  const adzunaResult = await adzunaAgent(profile);
  const remoteJobs = await remoteokAgent(profile);

  // Combine jobs
  const jobs = [
    ...adzunaResult.jobs,
    ...remoteJobs,
  ];

  // AI matching
  const filteredJobs = await scoreJobs(
    profile,
    jobs
  );

  // Save to MongoDB
  await saveJobs(filteredJobs);

  return {
    jobs: filteredJobs,
    warnings: adzunaResult.error ? [adzunaResult.error] : [],
  };
}

export async function searchJobs() {
  const result = await searchJobsDetailed();

  return result.jobs;
}