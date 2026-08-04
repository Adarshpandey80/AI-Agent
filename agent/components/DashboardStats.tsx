"use client";

import { useEffect, useState } from "react";

interface DashboardData {
  jobsFound: number;
  newToday: number;
  applied: number;
  interviews: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardData>({
    jobsFound: 0,
    newToday: 0,
    applied: 0,
    interviews: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/dashboard");
      const data = await res.json();

      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">
          Jobs Found
        </h2>

        <p className="mt-3 text-3xl font-semibold">
          {stats.jobsFound}
        </p>

        <p className="mt-2 text-sm text-emerald-600">
          Total jobs in database
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">
          New Today
        </h2>

        <p className="mt-3 text-3xl font-semibold">
          {stats.newToday}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Added today
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">
          Applied
        </h2>

        <p className="mt-3 text-3xl font-semibold">
          {stats.applied}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Applications submitted
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-medium text-slate-500">
          Interviews
        </h2>

        <p className="mt-3 text-3xl font-semibold">
          {stats.interviews}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          Interview scheduled
        </p>
      </div>

    </section>
  );
}