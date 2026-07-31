import { connectDB } from "@/lib/mongodb";
import Job from "@/models/job";

export async function saveJobs(jobs: any[]) {
  await connectDB();

  // Remove old search results
  await Job.deleteMany({});

  // Save new jobs
  return await Job.insertMany(jobs);
}

export async function getJobs() {
  await connectDB();

  return await Job.find().sort({
    score: -1,
    createdAt: -1,
  });
}

export async function deleteJobs() {
  await connectDB();

  return await Job.deleteMany({});
}