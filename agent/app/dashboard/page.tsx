import { searchJobs } from "@/services/searchService";
import JobCard from "@/components/Jobcard";

export default async function Dashboard() {
  const jobs = await searchJobs();
  console.log("Jobs fetched from database:", jobs);

  if (!jobs.length) {
    return (
      <div className="p-6 text-slate-600">
        No profile or matching jobs found yet. Create your profile and run a search to populate this dashboard.
      </div>
    );
  }

  return (
    <div>
      {jobs.map((job: any) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}  