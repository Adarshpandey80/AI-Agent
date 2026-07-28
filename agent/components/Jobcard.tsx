type Props = {
  job: any;
};

export default function JobCard({ job }: Props) {
  return (
    <div className="rounded-xl border bg-white p-5">

      <h2 className="text-xl font-bold">
        {job.title}
      </h2>

      <p>{job.company}</p>

      <p>{job.location}</p>

      <p>{job.platform}</p>

      <p>{job.salary}</p>

      <p>⭐ {job.matchScore}%</p>

      <div className="mt-4 flex gap-2">

        <a
          href={job.url}
          target="_blank"
          className="rounded bg-gray-200 px-4 py-2"
        >
          View Job
        </a>

        <button className="rounded bg-blue-600 px-4 py-2 text-white">
          Apply
        </button>

      </div>

    </div>
  );
}