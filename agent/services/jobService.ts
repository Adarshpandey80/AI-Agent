import Job from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job as JobType } from "@/type/job";

export async function saveJobs(jobs: JobType[]) {
  await connectDB();

  if (!jobs || jobs.length === 0) {
    return [];
  }

  const operations = jobs
    .filter((job) => job.url && job.url.trim() !== "")
    .map((job) => ({
      updateOne: {
        filter: {
          url: job.url,
        },

        update: {
          $set: {
            company: job.company,
            title: job.title,
            location: job.location,
            platform: job.platform,
            url: job.url,
            salary: job.salary || "",
            description: job.description || "",
            score: Number(job.score ?? job.matchScore ?? 0),
            reason: job.reason || "",
          },

          $setOnInsert: {
            applied: false,
            status: "Not Applied",
          },
        },

        upsert: true,
      },
    }));

  await Job.bulkWrite(operations);

  return jobs;
}