import { linkedinAgent } from "@/agents/linkedinAgent";
import { indeedAgent } from "@/agents/indeedAgent";
import { wellfoundAgent } from "@/agents/wellfoundAgent";
import { remoteokAgent } from "@/agents/remoteokAgent";

import { getProfile } from "./profileService";
import { scoreJobs } from "./geminiService";
import { saveJobs } from "./jobService";
import { Job } from "@/type/job"; 

export async function searchJobs() {
  const profile = await getProfile();

  if (!profile) {
    return [];
  }

  const linkedinJobs = await linkedinAgent(profile);

  const indeedJobs = await indeedAgent(profile);

  const wellfoundJobs = await wellfoundAgent(profile);

  const remoteJobs = await remoteokAgent(profile);

  const jobs: Job[] = [
    ...linkedinJobs,
    ...indeedJobs,
    ...wellfoundJobs,
    ...remoteJobs,
  ];

  const filtered = await scoreJobs(profile, jobs);

  await saveJobs(filtered);

  return filtered;
}