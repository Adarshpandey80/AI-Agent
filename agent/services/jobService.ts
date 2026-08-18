import JobModel from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job } from "@/type/job";

export async function saveJobs(jobs: Job[]) {
  await connectDB();

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return [];
  }

  // Remove invalid jobs
  const validJobs = jobs.filter(
    (job) =>
      job &&
      job.url &&
      job.title &&
      job.company
  );

  // Remove duplicate URLs before MongoDB
  const uniqueJobs = Array.from(
    new Map(
      validJobs.map((job) => [job.url, job])
    ).values()
  );

  for (const job of uniqueJobs) {
    await JobModel.findOneAndUpdate(
      { url: job.url },
      {
        $set: {
          company: job.company,
          title: job.title,
          location: job.location || "Remote",
          platform: job.platform || "Unknown",
          url: job.url,
          salary: job.salary || "",
          description: job.description || "",
          score:
            typeof job.score === "number"
              ? job.score
              : 0,
          reason: job.reason || "",
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  return uniqueJobs;
}


/**
 * Get jobs already stored in MongoDB
 */
export async function getJobs(): Promise<Job[]> {
  await connectDB();

  const jobs = await JobModel.find({})
    .sort({
      score: -1,
      createdAt: -1,
    })
    .lean();

  // Extra protection against duplicate URLs
  const uniqueJobs = Array.from(
    new Map(
      jobs.map((job: any) => [
        job.url,
        {
          ...job,
          _id: job._id.toString(),
        },
      ])
    ).values()
  );

  return uniqueJobs as Job[];
}


/**
 * Dashboard statistics
 */
export async function getDashboardStats() {
  await connectDB();

  const jobsFound = await JobModel.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newToday = await JobModel.countDocuments({
    createdAt: {
      $gte: today,
    },
  });

  const applied = await JobModel.countDocuments({
    applied: true,
  });

  const interviews = await JobModel.countDocuments({
    status: "Interview",
  });

  return {
    jobsFound,
    newToday,
    applied,
    interviews,
  };
}