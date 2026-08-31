import JobModel from "@/models/job";
import connectDB from "@/lib/mongodb";
import { Job } from "@/type/job";

export async function saveJobs(jobs: Job[]) {
  await connectDB();

  if (!Array.isArray(jobs) || jobs.length === 0) {
    return [];
  }

  const validJobs = jobs.filter(
    (job) => job && job.url && job.title && job.company
  );

  const uniqueJobs = Array.from(
    new Map(validJobs.map((job) => [job.url, job])).values()
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
          score: typeof job.score === "number" ? job.score : 0,
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

export async function getJobs(): Promise<Job[]> {
  await connectDB();

  const jobs = await JobModel.find({
    score: { $gte: 90 },
  })
    .sort({
      score: -1,
      createdAt: -1,
    })
    .lean();

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

export async function getJobById(jobId: string): Promise<Job | null> {
  await connectDB();

  const job = await JobModel.findById(jobId).lean();

  if (!job) {
    return null;
  }

  return {
    ...job,
    _id: job._id?.toString?.() ?? job._id,
  } as Job;
}

export async function getJob(jobId: string): Promise<Job | null> {
  return getJobById(jobId);
}

export async function updateJobStatus(jobId: string, status: string) {
  await connectDB();

  return JobModel.findByIdAndUpdate(
    jobId,
    { $set: { status } },
    { new: true }
  ).lean();
}

export async function getDashboardStats() {
  await connectDB();

  const baseMatch = { score: { $gte: 90 } };

  const jobsFound = await JobModel.countDocuments(baseMatch);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newToday = await JobModel.countDocuments({
    ...baseMatch,
    createdAt: {
      $gte: today,
    },
  });

  const applied = await JobModel.countDocuments({
    ...baseMatch,
    applied: true,
  });

  const interviews = await JobModel.countDocuments({
    ...baseMatch,
    status: "Interview",
  });

  return {
    jobsFound,
    newToday,
    applied,
    interviews,
  };
}