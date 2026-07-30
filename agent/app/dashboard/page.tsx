import { searchJobs } from "@/services/searchService";
import JobCard from "@/components/Jobcard";

export default async function Dashboard() {
  const jobs = await searchJobs();
  console.log("Jobs fetched from database:", jobs);

  return (
    <div>
      {jobs.map((job: any) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}  