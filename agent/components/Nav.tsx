"use client";

export default function Navbar() {

  async function handleSearch() {

    await fetch("/api/search", {
      method: "POST",
    });

    window.location.reload();
  }

  return (
    <header>

      <button onClick={handleSearch}>
        Search Jobs
      </button>

    </header>
  );
}