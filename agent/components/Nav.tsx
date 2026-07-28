"use client";

import { useState } from "react";
\

export default function Navbar() {
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const res = await fetch("/api/search", {
        method: "POST",
      });

      const data = await res.json();

      console.log(data);

      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <header className="flex items-center justify-between p-4 border-b">

      <h1 className="text-xl font-bold">
        AI Job Agent
      </h1>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="rounded bg-blue-600 px-5 py-2 text-white"
      >
        {loading ? "Searching..." : "Search Jobs"}
      </button>

    </header>
  );
}