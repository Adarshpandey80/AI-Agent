import Navbar from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import JobCard from "@/components/Jobcard";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-4rem)]">

        <Sidebar />

        <main className="flex-1 px-6 py-8 md:px-10">

          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
                Overview
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                Dashboard
              </h1>
            </div>

            <p className="max-w-xl text-sm text-slate-600 md:text-right md:text-base">
              Review the latest matches, pipeline progress, and action items from a clean professional workspace.
            </p>
          </div>

          <DashboardStats />

          <div className="mt-10 grid gap-5 xl:grid-cols-2">

            <JobCard />

            <JobCard />

            <JobCard />

            <JobCard />

          </div>

        </main>

      </div>
    </>
  );
}