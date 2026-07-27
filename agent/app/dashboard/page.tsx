import Navbar from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import JobCard from "@/components/Jobcard";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 bg-slate-100 p-8">

          <h1 className="mb-8 text-3xl font-bold">
            Dashboard
          </h1>

          <DashboardStats />

          <div className="mt-10 grid gap-5">

            <JobCard />

            <JobCard />

            <JobCard />

          </div>

        </main>

      </div>
    </>
  );
}