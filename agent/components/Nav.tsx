export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur md:px-8">

      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-2xl">
          AI Job Agent
        </h1>
        <p className="hidden text-sm text-slate-500 md:block">
          Professional job search workspace
        </p>
      </div>

      <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
        Search Jobs
      </button>

    </header>
  );
}