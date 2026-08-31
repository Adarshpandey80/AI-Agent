import { getJobs } from "@/services/jobService";
import JobCard from "@/components/Jobcard";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";
import { Job } from "@/type/job";

export default async function Dashboard() {
  const jobs = await getJobs();

  console.log(
    "Jobs loaded from database:",
    jobs.length
  );

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
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <span className="text-white">Update Profile </span>
            
          </Link>

        </div>
      </section>

      <DashboardStats />

      {jobs.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {jobs.map((job: any) => (
            <JobCard
              key={job._id.toString()}
              job={job}
            />
          ))}

        </section>
      ) : (
        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm">

          <h2 className="text-2xl font-semibold text-slate-950">
            No jobs found
          </h2>

          <p className="mt-2 text-slate-600">
            Click Search Jobs to find real jobs.
          </p>

        </section>
      )}
    </div>
  );
}