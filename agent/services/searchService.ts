import { linkedinAgent } from "@/agents/linkedinAgent";
import { greenhouseAgent } from "@/agents/greenhouseAgent";
import { scoreJobs } from "./geminiService";

export async function searchJobs() {
  // Search every platform
  const linkedinJobs = await linkedinAgent();

  const greenhouseJobs = await greenhouseAgent();

  // Merge all jobs
  const jobs = [
    ...linkedinJobs,
    ...greenhouseJobs,
  ];

  // Send jobs to AI
  const filteredJobs = await scoreJobs(jobs);

  // Later
  // await saveJobs(filteredJobs);

  return filteredJobs;
}