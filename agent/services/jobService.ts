import JobModel from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job } from "@/type/job";

//Save AI-filtered jobs into MongoDB
 
export async function saveJobs(jobs: Job[]) {
  await connectDB();

  if (!jobs || jobs.length === 0) {
    return [];
  }

  const jobsToSave = jobs.map((job) => ({
    company: job.company,
    title: job.title,
    location: job.location,
    platform: job.platform,
    url: job.url,
    salary: job.salary || "",
    matchScore: job.score ?? job.matchScore ?? 0,
    reason: job.reason || "",
    status: "New",
    applied: false,
  }));

  const savedJobs = await JobModel.insertMany(jobsToSave);

  return savedJobs;
}

// Get ALL jobs from MongoDB

export async function getJobs() {
  await connectDB();

  const jobs = await JobModel.find()
    .sort({ createdAt: -1 })
    .lean();

  return jobs.map((job: any) => ({
    ...job,
    _id: job._id.toString(),
    createdAt: job.createdAt?.toISOString(),
    updatedAt: job.updatedAt?.toISOString(),
  }));
}

// Dashboard statistics
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