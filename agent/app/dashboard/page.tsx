import { getJobs } from "@/services/jobService";
import JobCard from "@/components/Jobcard";
import DashboardStats from "@/components/DashboardStats";
import Link from "next/link";
import { Job } from "@/type/job";

export default async function Dashboard() {

  // Dashboard only reads saved jobs from MongoDB.
  // It does NOT call searchJobs().
  const jobs = await getJobs();

  console.log("Jobs from MongoDB:", jobs);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-6 lg:px-8">

      {/* Hero */}
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
              Search pulls listings from multiple sources, filters them with
              your profile, and keeps the best opportunities in one place.
            </p>

          </div>

          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-2xl bg-gray-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Update Profile
          </Link>

        </div>

      </section>

      {/* Real MongoDB statistics */}
      <DashboardStats />

      {/* Jobs from MongoDB */}
      {jobs.length > 0 ? (

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {jobs.map((job: Job, index: number) => (

            <JobCard
              key={
                job._id ||
                `${job.platform}-${job.company}-${job.title}-${index}`
              }
              job={job}
            />

          ))}

        </section>

      ) : (

        <section className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-sm">

          <div className="max-w-2xl space-y-3">

            <h2 className="text-2xl font-semibold text-slate-950">
              No jobs matched yet
            </h2>

            <p className="text-slate-600">
              Create or update your profile, then click Search Jobs in the
              navbar. Once results are saved, they will appear here.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}