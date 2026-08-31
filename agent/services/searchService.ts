import { adzunaAgent } from "@/agents/adzunaAgent";
import { remoteokAgent } from "@/agents/remoteokAgent";

import { getProfile } from "./profileService";
import { scoreJobs } from "./geminiService";
import { saveJobs } from "./jobService";
import type { Job } from "@/type/job";

export async function searchJobs(): Promise<Job[]> {
  const profile = await getProfile();

  if (!profile) {
    return [];
  }

  console.log("Starting real job search...");

  const adzunaJobs = await adzunaAgent(profile);
  const remoteJobs = await remoteokAgent(profile);

  const sourceJobs = [
    ...(Array.isArray(adzunaJobs) ? adzunaJobs : Array.isArray((adzunaJobs as any)?.jobs) ? (adzunaJobs as any).jobs : []),
    ...(Array.isArray(remoteJobs) ? remoteJobs : []),
  ];

  const allJobs = Array.from(
    new Map(
      sourceJobs
        .filter((job) => job && job.url && job.title && job.company)
        .map((job) => [job.url, job])
    ).values()
  ) as Job[];

  console.log("Total jobs fetched:", allJobs.length);

  if (allJobs.length === 0) {
    return [];
  }

  const uniqueJobs = allJobs;

  console.log("Unique jobs:", uniqueJobs.length);

  const scoredJobs = await scoreJobs(profile, uniqueJobs);
  const qualifiedJobs = scoredJobs.filter(
    (job) => Number(job.score ?? 0) >= 90
  );

  console.log(
    "Scored jobs:",
    qualifiedJobs.map((job: Job) => ({
      title: job.title,
      company: job.company,
      platform: job.platform,
      score: job.score,
      url: job.url,
    }))
  );

  await saveJobs(qualifiedJobs);

  return qualifiedJobs;
}

export async function searchJobsDetailed(): Promise<{
  jobs: Job[];
  warnings: string[];
}> {
  const jobs = await searchJobs();

  if (!jobs.length) {
    return {
      jobs: [],
      warnings: ["No jobs matched your current profile. Update your profile and try again."],
    };
  }

  return {
    jobs,
    warnings: [],
  };
}