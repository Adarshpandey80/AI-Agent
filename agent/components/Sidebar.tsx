import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden min-h-[calc(100vh-4rem)] w-72 border-r border-slate-200 bg-white/80 p-6 backdrop-blur md:block">

      <div className="mb-8 rounded-2xl bg-slate-950 px-4 py-5 text-white shadow-lg shadow-slate-950/10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
          Workspace
        </p>
        <p className="mt-3 text-lg font-semibold">
          AI Job Agent
        </p>
        <p className="mt-2 text-sm text-slate-400">
          Search and track roles with clarity.
        </p>
      </div>

      <nav className="space-y-2">

        <Link href="/dashboard" className="block rounded-xl px-4 py-3 font-medium text-white shadow-sm transition hover:bg-slate-300  hover:text-white ">
          Dashboard
        </Link>

        <Link href="#" className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          Search Jobs
        </Link>

        <Link href="#" className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          Saved Jobs
        </Link>

        <Link href="#" className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          Applied Jobs
        </Link>

        <Link href="#" className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          Profile
        </Link>

        <Link href="#" className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          Settings
        </Link>

      </nav>

    </aside>
  );
}