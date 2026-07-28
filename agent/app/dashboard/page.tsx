import { getJobs } from "@/services/jobService";
import JobCard from "@/components/Jobcard";

export default async function Dashboard() {
  const jobs = await getJobs();

  return (
    <div>
      {jobs.map((job: any) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}