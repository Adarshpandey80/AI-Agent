import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r bg-zinc-800 p-6">

      <nav className="space-y-4">

        <Link href="/dashboard" className="block font-medium">
          Dashboard
        </Link>

        <Link href="#" className="block">
          Search Jobs
        </Link>

        <Link href="#" className="block">
          Saved Jobs
        </Link>

        <Link href="#" className="block">
          Applied Jobs
        </Link>

        <Link href="#" className="block">
          Profile
        </Link>

        <Link href="#" className="block">
          Settings
        </Link>

      </nav>

    </aside>
  );
}