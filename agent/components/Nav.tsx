export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-zinc-900 px-8">

      <h1 className="text-2xl font-bold text-white">
        AI Job Agent
      </h1>

      <button className="rounded-lg bg-zinc-700 px-4 py-2 text-white">
        Search Jobs
      </button>

    </header>
  );
}