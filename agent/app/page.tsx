import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold">
          AI Job Agent
        </h1>

        <p className="mt-4 text-gray-600">
          Search jobs from multiple platforms in one place.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white"
        >
          Open Dashboard
        </Link>
      </div>
    </main>
  );
}