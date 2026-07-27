import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              AI Job Agent
            </span>

            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                Find better roles with a cleaner, more focused workflow.
              </h1>

              <p className="max-w-lg text-base leading-7 text-slate-600 md:text-lg">
                Search, review, and track opportunities from one polished dashboard built for fast decision-making.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
              >
                Open Dashboard
              </Link>

              <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600">
                Multi-platform job tracking
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-2xl shadow-slate-900/20">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
              Snapshot
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Qualified matches</span>
                  <span>92%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-800">
                  <div className="h-2 w-[92%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Saved roles</p>
                  <p className="mt-2 text-2xl font-semibold">48</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Interviews</p>
                  <p className="mt-2 text-2xl font-semibold">7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}