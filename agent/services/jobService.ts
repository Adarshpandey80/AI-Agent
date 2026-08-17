import Job from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job as JobType } from "@/type/job";

export async function saveJobs(jobs: JobType[]) {
  await connectDB();

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return [];
  }

  const results = [];

  for (const job of jobs) {
    if (!job.url) {
      continue;
    }

    const savedJob = await Job.findOneAndUpdate(
      {
        url: job.url,
      },
      {
        $set: {
          externalId: job.externalId,
          company: job.company,
          title: job.title,
          location: job.location,
          platform: job.platform,
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
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    results.push(savedJob);
  }

  console.log(
    `Saved/updated ${results.length} jobs`
  );

  return results;
}


// Get all jobs for dashboard
export async function getJobs() {
  await connectDB();

  const jobs = await Job.find({})
    .sort({
      score: -1,
      createdAt: -1,
    })
    .lean();

  return jobs;
}


// Dashboard statistics
export async function getDashboardStats() {
  await connectDB();

  const jobsFound = await Job.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newToday = await Job.countDocuments({
    createdAt: {
      $gte: today,
    },
  });

  const applied = await Job.countDocuments({
    applied: true,
  });

  const interviews = await Job.countDocuments({
    status: "Interview",
  });

  return {
    jobsFound,
    newToday,
    applied,
    interviews,
  };
}