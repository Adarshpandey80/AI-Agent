import jobModel from "@/models/job";
import  connectDB  from "@/lib/mongodb";
import { Job } from "@/type/job"; 
import job from "@/models/job";

export  async function saveJobs(jobs: Job[]) {
  await connectDB();

  const jobsFound = await jobModel.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newToday = await jobModel.countDocuments({
    createdAt: { $gte: today },
  });

  const applied = await jobModel.countDocuments({
    applied: true,
  });

  const interviews = await jobModel.countDocuments({
    status: "Interview",
  });

  return {
    jobsFound,
    newToday,
    applied,
    interviews,
  };
}