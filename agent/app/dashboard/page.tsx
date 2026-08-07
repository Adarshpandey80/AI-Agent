import { searchJobs } from "@/services/searchService";
import JobCard from "@/components/Jobcard";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";
import { Job } from "@/type/job"; 

export default async function Dashboard() {
  const jobs = await searchJobs();
  console.log("Jobs fetched from database:", jobs);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              Dashboard
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Smart job matches, scored and ready to review.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Search pulls listings from multiple sources, filters them with your profile, and keeps the best opportunities in one place.
            </p>
          </div>

          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-2xl bg-gray-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-200"
          >
            Update Profile
          </Link>
        </div>
      </section>

      <DashboardStats />

      {jobs.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job: Job) => (
            <JobCard key={job._id ?? `${job.company}-${job.title}`} job={job} />
          ))}
        </section>
      ) : (
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-semibold text-slate-950">No jobs matched yet</h2>
            <p className="text-slate-600">
              Create or update your profile, then use Search Jobs in the navbar. Once results come in, they’ll appear here automatically.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}