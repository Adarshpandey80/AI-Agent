export default function JobCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Frontend Engineer
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Google
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          Match 95%
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
        <p>
          Munich, Germany
        </p>

        <p>
          Platform: LinkedIn
        </p>

        <p>
          Full-time
        </p>
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">
        Strong alignment with frontend architecture, design systems, and product-focused delivery.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">

        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
          View Job
        </button>

        <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
          Apply
        </button>

      </div>

    </div>
  );
}