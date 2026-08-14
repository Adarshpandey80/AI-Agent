import Job from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job as JobType } from "@/type/job";

export async function saveJobs(jobs: JobType[]) {
  await connectDB();

  if (!jobs.length) {
    return [];
  }

  const operations = jobs
    .filter((job) => job.url)
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
            score: Number(job.score ?? 0),
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


export async function getJobs() {
  await connectDB();

  return await Job.find({})
    .sort({
      score: -1,
      createdAt: -1,
    })
    .lean();
}


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