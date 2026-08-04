import Job from "@/models/Job";
import connectDB from "@/lib/db";

export async function getDashboardStats() {
  await connectDB();

  const jobsFound = await Job.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newToday = await Job.countDocuments({
    createdAt: { $gte: today },
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