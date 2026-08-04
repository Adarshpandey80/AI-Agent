"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const res = await fetch("/api/search", {
        method: "POST",
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.message || "Search failed.");
      }

      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">AI Job Agent</p>
          <p className="mt-1 text-sm text-slate-500">Search, score, and track roles from one workspace.</p>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/profile"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Profile
          </Link>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search Jobs"}
          </button>
        </div>
      </div>
    </header>
  );
}
