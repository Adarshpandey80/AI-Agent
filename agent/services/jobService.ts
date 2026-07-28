import { connectDB } from "@/lib/mongodb";
import Job from "@/models/job";

export async function searchJobs() {
  await connectDB();

  await Job.deleteMany({});

  const jobs = [
    {
      company: "Google",
      title: "Frontend Engineer",
      location: "Munich, Germany",
      platform: "LinkedIn",
      salary: "€60k",
      url: "https://example.com/google",
      matchScore: 95,
      status: "Not Applied",
    },
    {
      company: "Spotify",
      title: "React Developer",
      location: "Stockholm",
      platform: "Greenhouse",
      salary: "€55k",
      url: "https://example.com/spotify",
      matchScore: 91,
      status: "Not Applied",
    },
  ];

  await Job.insertMany(jobs);

  return jobs;
}

export async function getJobs() {
  await connectDB();

  return Job.find().sort({ createdAt: -1 });
}