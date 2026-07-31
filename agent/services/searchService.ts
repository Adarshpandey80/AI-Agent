import { linkedinAgent } from "@/agents/linkedinAgent";
import { greenhouseAgent } from "@/agents/greenhouseAgent";

import { scoreJobs } from "./geminiService";
import { getProfile } from "./profileService";
import { saveJobs } from "./jobService";

export async function searchJobs() {
  try {
    // 1. Load user profile
    const profile = await getProfile();

    if (!profile) {
      throw new Error("Profile not found. Please complete your profile first.");
    }

    // 2. Search all job platforms
    const linkedinJobs = await linkedinAgent(profile);

    const greenhouseJobs = await greenhouseAgent(profile);

    // 3. Merge all jobs
    const allJobs = [
      ...linkedinJobs,
      ...greenhouseJobs,
    ];

    // 4. Remove duplicate jobs
    const uniqueJobs = allJobs.filter(
      (job, index, self) =>
        index ===
        self.findIndex(
          (j) =>
            j.title === job.title &&
            j.company === job.company &&
            j.location === job.location
        )
    );

    // 5. AI filters and scores jobs
    const filteredJobs = await scoreJobs(profile, uniqueJobs);

    // 6. Save jobs to MongoDB
    await saveJobs(filteredJobs);

    // 7. Return jobs
    return filteredJobs;
  } catch (error) {
    console.error("Search Service Error:", error);
    throw error;
  }
}