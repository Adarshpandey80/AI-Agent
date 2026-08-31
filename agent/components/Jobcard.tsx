import { Job } from "@/type/job"; 


type Props = {
  job: Job;
};

export default function JobCard({ job }: Props) {
  const score = typeof job.score === "number" ? job.score : typeof job.matchScore === "number" ? job.matchScore : 0;
  const scoreTone =
    score >= 90
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : score >= 75
        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
        : "bg-rose-50 text-rose-700 ring-1 ring-rose-200";

  return (
    <article className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-700">
            {job.platform || "Job source"}
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            {job.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{job.company}</p>
        </div>

        <div className={`rounded-2xl px-3 py-2 text-right ${scoreTone}`}>
          <p className="text-[10px] uppercase tracking-[0.28em] opacity-80">Score</p>
          <p className="text-lg font-semibold">{score}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">{job.location || "Remote"}</span>
        {job.salary ? <span className="rounded-full bg-slate-100 px-3 py-1">{job.salary}</span> : null}
      </div>

      {job.reason ? (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          {job.reason}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={job.url || "#"}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          View Job
        </a>

        <button className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
          Apply
        </button>
      </div>
    </article>
  );
}