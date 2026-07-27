export default function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">Jobs Found</h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">125</p>
        <p className="mt-2 text-sm text-emerald-600">+18 this week</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">New Today</h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">18</p>
        <p className="mt-2 text-sm text-slate-500">Updated within 24 hours</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">Applied</h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">12</p>
        <p className="mt-2 text-sm text-slate-500">Applications in progress</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">Interviews</h2>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">2</p>
        <p className="mt-2 text-sm text-slate-500">Upcoming this month</p>
      </div>

    </section>
  );
}