import JobModel from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job } from "@/type/job";

//Save searched jobs
 
export async function saveJobs(jobs: Job[]) {
  await connectDB();

  for (const job of jobs) {
    await JobModel.findOneAndUpdate(
      {
        url: job.url, // URL is unique
      },
      {
        ...job,
      },
      {
        upsert: true,
        new: true,
      }
    );
  }

  return jobs;
}


 // Get all jobs

export async function getJobs() {
  await connectDB();

  return await JobModel.find().sort({
    matchScore: -1,
    createdAt: -1,
  });
}

// Get job by ID
export async function getJobById(id: string) {
  await connectDB();

  return await JobModel.findById(id);
}

// Get dashboard stats
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
    status: "Applied",
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


//Update status

export async function updateJobStatus(
  id: string,
  status: string
) {
  await connectDB();

  return await JobModel.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
    }
  );
}


// Delete job
 
export async function deleteJob(id: string) {
  await connectDB();

  return await JobModel.findByIdAndDelete(id);
}